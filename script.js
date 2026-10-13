(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (n) => Math.round(n).toLocaleString("pt-BR");

  /* Header, progress, mobile menu */
  const header = $(".header");
  const bar = $(".progress i");
  const nav = $("#nav");
  const menu = $(".menu");
  const links = $$(".nav a");
  const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);

  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", String(open));
  });
  links.forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
  }));

  /* Ticker: duplicate for seamless loop */
  const ticker = $("#ticker");
  ticker.innerHTML += ticker.innerHTML;

  /* Reveal on scroll (with stagger in groups) */
  $$(".pillars, .cases").forEach((g) => $$(".reveal", g).forEach((el, i) => el.style.setProperty("--d", `${i * 0.09}s`)));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => (reduced ? el.classList.add("is-in") : io.observe(el)));

  /* Count-up */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target;
      const to = Number(el.dataset.count);
      const pre = el.dataset.prefix || "";
      const suf = el.dataset.suffix || "";
      if (reduced) return;
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / 1200);
        el.textContent = pre + fmt(to * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
  $$("[data-count]").forEach((el) => countIO.observe(el));

  /* Hero: pending list cycles to "ok" */
  const list = $$("#heroList li");
  const pend = $("#pendCount") || {};
  const done = $("#doneCount") || {};
  const heroBar = $("#heroBar") || { style: { setProperty() {} } };
  let pending = 12;
  const tick = () => {
    const warn = list.filter((li) => li.dataset.state === "warn");
    if (warn.length) {
      const li = warn[0];
      li.dataset.state = "ok";
      li.lastElementChild.textContent = "ok";
      pending = Math.max(0, pending - 3);
    } else {
      list.forEach((li, i) => { if (i % 2) { li.dataset.state = "warn"; li.lastElementChild.textContent = "prazo"; } });
      pending = 12;
    }
    pend.textContent = pending;
    done.textContent = 347 - pending;
    heroBar.style.setProperty("--w", `${((347 - pending) / 347) * 100}%`);
  };
  if (!reduced && list.length) setInterval(tick, 2600);

  /* Mouse parallax + spotlight */
  if (!reduced && matchMedia("(hover: hover)").matches) {
    const stage = $(".hero__stage");
    stage.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      $$("[data-parallax]", stage).forEach((el) => {
        const k = Number(el.dataset.parallax);
        el.style.transform = `translate(${x * k * 2}px, ${y * k * 2}px)`;
      });
    });
    stage.addEventListener("pointerleave", () => $$("[data-parallax]", stage).forEach((el) => (el.style.transform = "")));
  }
  $$(".spot").forEach((el) => el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }));

  /* Segmented switches with sliding thumb */
  const bindSwitch = (root, onChange) => {
    const btns = $$("button", root);
    const thumb = $(".switch__thumb", root);
    const place = () => {
      const a = btns.find((b) => b.classList.contains("is-active"));
      thumb.style.width = `${a.offsetWidth}px`;
      thumb.style.transform = `translateX(${a.offsetLeft - 4}px)`;
    };
    btns.forEach((b) => b.addEventListener("click", () => {
      btns.forEach((x) => x.classList.toggle("is-active", x === b));
      place();
      onChange(b);
    }));
    place();
    addEventListener("resize", place);
    document.fonts?.ready.then(place);
  };

  const cases = $("#cases");
  bindSwitch($(".switch"), (b) => {
    cases.classList.add("is-swapping");
    setTimeout(() => { cases.dataset.mode = b.dataset.mode; cases.classList.remove("is-swapping"); }, reduced ? 0 : 260);
  });

  /* Modules */
  const modules = [
    { t: "Gestão de clientes", d: "Ficha operacional, responsáveis por área e cliente conectado via acesso externo, WhatsApp e e-mail.", b: ["Cadastro, certificado, tags e histórico", "Fiscal, contábil e pessoal por cliente", "Cliente acompanha sem ligar o tempo todo"], m: ["Clientes", [["Tech Soluções Ltda", "ativo", ""], ["Comércio Norte ME", "ativo", ""], ["Ind. Beltrano S/A", "certificado", "w"]]] },
    { t: "Gerenciador de documentos", d: "O cliente joga os arquivos. O sistema organiza e entrega pra contabilidade.", b: ["Arrasta. Envia. Pronto.", "Arquivos classificados e ligados à entrega", "Sem pasta bagunçada, sem retrabalho"], m: ["Documentos recebidos", [["extrato_setembro.pdf", "classificado", ""], ["notas_saida.xml", "classificado", ""], ["comprovante_das.pdf", "pendente", "w"]]] },
    { img: "tela-xml", t: "Auditoria de preços por XML", d: "Importa XMLs, monta catálogo, cruza custo e venda e mostra margem e carga tributária sem planilha.", b: ["Margem bruta e líquida por item", "ICMS, PIS, COFINS e demais tributos", "Disponível para clientes"], m: ["Itens auditados", [["Produto A · margem", "bruta/líquida", "b"], ["Produto B · ICMS", "conferido", ""], ["Produto C · PIS/COFINS", "revisar", "w"]]] },
    { img: "tela-cartoes", t: "Auditoria de cartões", d: "Acordo por adquirente, conferência de taxas e laudo técnico para contestação.", b: ["Cielo, Stone, Rede e outras", "Divergência de taxa e valor", "Dashboard e ranking por adquirente"], m: ["Adquirentes", [["Cielo", "ok", ""], ["Stone", "divergência", "w"], ["Rede", "ok", ""]]] },
    { img: "tela-kanban", t: "Processos em Kanban", d: "Veja e mova as etapas. Comentários, rastreamento e centralização no mesmo card.", b: ["Avisos direto no WhatsApp", "Histórico completo de alterações", "Status, responsável e documentos juntos"], m: ["Processos", [["Baixar Notas Fiscais", "concluída", ""], ["Calcular alíquotas", "concluída", ""], ["Enviar declaração", "andamento", "b"]]] },
    { img: "tela-regras", t: "Regras fiscais unificadas", d: "Parametrize uma vez e use a mesma base no balancete e nas obrigações acessórias.", b: ["1 base de regras", "Fiscal + financeiro no fechamento", "Menos retrabalho, mais consistência"], m: ["Catálogo de tributos", [["COFINS · PIS", "regra 1", ""], ["ICMS · ICMS-ST · DIFAL", "regra 2", ""], ["IRRF · CSLL", "regra 3", ""]]] },
  ];
  const tabs = $("#modTabs");
  const panel = $("#modPanel");
  const renderModule = (i) => {
    const m = modules[i];
    $$(".tab", tabs).forEach((t, k) => { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; });
    panel.style.animation = "none"; void panel.offsetWidth; panel.style.animation = "";
    panel.innerHTML = `<div><h3>${m.t}</h3><p>${m.d}</p><ul class="checks">${m.b.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      ${m.img ? `<figure class="frame frame--sm"><div class="frame__bar"><i></i><i></i><i></i></div><img src="images/${m.img}.jpg" alt="Tela real: ${m.t}" loading="lazy" /></figure>` : `<div class="mini"><p class="mini__h">${m.m[0]}</p><ul>${m.m[1].map((r, k) => `<li style="--i:${k}"><span>${r[0]}</span><em class="${r[2]}">${r[1]}</em></li>`).join("")}</ul></div>`}`;
  };
  modules.forEach((m, i) => {
    const b = document.createElement("button");
    b.className = "tab"; b.type = "button"; b.setAttribute("role", "tab");
    b.innerHTML = `<span>0${i + 1}</span>${m.t}`;
    b.addEventListener("click", () => renderModule(i));
    b.addEventListener("keydown", (e) => {
      const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      const n = (i + dir + modules.length) % modules.length;
      renderModule(n); $$(".tab", tabs)[n].focus();
    });
    tabs.append(b);
  });
  renderModule(0);

  /* Kanban demo */
  const tasks = [["Baixar Notas Fiscais", "Ordem 1"], ["Calcular alíquotas", "Ordem 2"], ["Enviar declaração", "Ordem 3"], ["Conciliar extrato", "Ordem 4"], ["Gerar DAS", "Ordem 5"]];
  let state = [];
  const cols = $$(".col");
  const foot = $("#boardFoot");
  const renderBoard = () => {
    cols.forEach((c, ci) => {
      const wrap = $(".col__cards", c);
      wrap.innerHTML = "";
      state.forEach((s, ti) => {
        if (s !== ci) return;
        const b = document.createElement("button");
        b.type = "button"; b.className = "kcard";
        b.innerHTML = `${tasks[ti][0]}<small>${tasks[ti][1]} · clique para ${ci === 1 ? "reabrir" : ci === 0 ? "concluir" : "retomar"}</small>`;
        b.addEventListener("click", () => { state[ti] = ci === 0 ? 1 : ci === 1 ? 2 : 0; renderBoard(); });
        wrap.append(b);
      });
      $("h4 b", c).textContent = state.filter((s) => s === ci).length;
    });
    const d = state.filter((s) => s === 1).length;
    foot.innerHTML = `<b>${d} de ${tasks.length}</b> etapas concluídas · histórico registrado automaticamente`;
  };
  const resetBoard = () => { state = [0, 1, 1, 0, 0]; renderBoard(); };
  $("#kanReset").addEventListener("click", resetBoard);
  resetBoard();

  /* Notification bubble */
  $$("#chips button").forEach((b) => b.addEventListener("click", () => {
    $$("#chips button").forEach((x) => x.classList.toggle("is-active", x === b));
    const bub = $("#bubble");
    bub.style.animation = "none"; void bub.offsetWidth; bub.style.animation = "";
    bub.textContent = b.dataset.msg;
  }));

  /* Calculator */
  const rC = $("#rCompanies"), rH = $("#rHours");
  const animateTo = (el, to) => {
    const from = Number(el.dataset.v || 0);
    el.dataset.v = to;
    if (reduced) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 400);
      el.textContent = fmt(from + (to - from) * p);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const calc = () => {
    const c = Number(rC.value), h = Number(rH.value);
    [rC, rH].forEach((r) => r.style.setProperty("--fill", `${((r.value - r.min) / (r.max - r.min)) * 100}%`));
    $("#oCompanies").textContent = c; $("#oHours").textContent = h;
    const now = c * h, saved = now * 0.7;
    animateTo($("#cNow"), now); animateTo($("#cSaved"), saved); animateTo($("#cDays"), saved / 8);
  };
  rC.addEventListener("input", calc); rH.addEventListener("input", calc);
  calc();

  /* Flow (scroll-linked) + progress + active nav */
  const flow = $("#flow");
  const fill = $("#flowFill");
  const steps = $$(".flow__step");
  let raf = 0;
  const onScroll = () => {
    raf = 0;
    const y = scrollY;
    header.classList.toggle("is-scrolled", y > 10);
    bar.style.width = `${(y / (document.documentElement.scrollHeight - innerHeight)) * 100}%`;
    const r = flow.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height));
    fill.style.height = `${(reduced ? 1 : p) * 100}%`;
    steps.forEach((s, i) => s.classList.toggle("is-on", reduced || p > (i + 0.25) / steps.length));
    let cur = null;
    sections.forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s; });
    links.forEach((a) => a.classList.toggle("is-active", cur && a.getAttribute("href") === `#${cur.id}`));
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(onScroll); }, { passive: true });
  onScroll();
})();
