# Inventário de conteúdo — Impostograma Landing

Fonte: https://playercontabilidade.github.io/impostograma_site/  
Capturado em: 2026-09-17  
Arquivo máquina: `content/inventory.json`

Este arquivo é o **arquivo canônico de copy** da landing atual, para reestruturação.  
Os arquivos originais (`index.html`, `style.css`, `script.js`) permanecem intactos.

---

## Meta

- **Título:** Impostograma | Automação fiscal
- **Descrição:** Automação fiscal para escritórios contábeis.
- **Stack:** HTML + CSS + JS vanilla
- **Cores:** violet `#6c3cf0`, ink `#17162b`, lavender `#f1ecff`, mint `#baf5d6`

## Navegação

Sobre nós · Funcionalidades · Como funciona · Módulos · Contato  
CTA header: Entrar → https://impostograma.com/  
Instagram: https://www.instagram.com/impostograma

---

## Hero

**Headline:** Automação fiscal que transforma escritórios contábeis.  
**Sub:** Gerencie obrigações, documentos e clientes em uma plataforma integrada — do cadastro à entrega.

**CTAs:** Ver demonstração  
**Métricas:** +40% Produtividade · −70% Retrabalho e erros operacionais  
**Imagem:** `images/alt_image.png` (referenciada; verificar se está no Pages deploy)

## Ticker

NF-e / NFS-e · IRPJ · CSLL · PIS/COFINS · Adiantamento de salário · SPED Fiscal · EFD Contribuições · DCTF Web · PGDAS-D · DAS Mensal · DIEF · 13º Salário · eSocial

---

## Features — “Menos portal. Mais resultado.”

Tag: A OPERAÇÃO DO ESCRITÓRIO, EM UM SÓ LUGAR

| Card | Texto |
|------|--------|
| Hub operacional | Carteira organizada: cadastro, certificado, responsáveis e histórico num só lugar. |
| Processos e entregas | Obrigações do mês em Kanban: etapas, prazos, anexos e quem cuida de cada uma. |
| Automações fiscais/contábeis | O sistema baixa, calcula, declara e gera guia. Menos trabalho manual no portal. |
| BPO Financeiro (destaque) | Integração diretamente com o banco para conciliação e exportação para contábil. |

## Operação

Intro: centraliza processos, organiza etapas e automatiza atividades… produtividade, controle e previsibilidade.

- Processos Padronizados
- Automação de Etapas
- Visão da Operação

---

## 6 Módulos

1. **Gestão de Clientes** — hub com CNPJ/CNAE/regime, responsáveis, certificados, acesso externo  
2. **Processos e Entregas** — Kanban, prazos, anexos, rastreio  
3. **Automação Fiscal e Contábil** — captura, cálculo, guias  
4. **Gerenciador de Documentos** — pastas, pendências, comprovantes  
5. **Auditoria por XML e Cartões** — cruzamento e alertas  
6. **Financeiro e Conciliação** — banco, exportação contábil  

## Kanban

**Headline:** Veja e mova as etapas em Kanban.  
Benefícios: Comentários (WhatsApp) · Rastreamento · Centralização  
Imagem: `images/painel-kanban.png`

## Fiscal

**Headline:** Regras fiscais unificadas  
**Sub:** Fiscal, contábil e financeiro juntos  
Cards: 1 base · Balancete  
Catálogo: COFINS, PIS, ICMS, ICMS-ST, DIFAL, IRRF, CSLL

## Plataforma em ação (demo interativa)

Tabs: Entregas / Documentos / Financeiro  
Lista exemplo (Entregas): SPED, DAS, EFD, DCTF, PGDAS-D com status

## Automação (3 passos)

1. Captura as notas do período  
2. Calcula, declara e gera a DAS automaticamente  
3. Obrigações acessórias no mesmo fluxo, com rastreio  

## Como funciona (4 passos)

1. Cadastre suas empresas  
2. Configure as obrigações  
3. Automatize e monitore  
4. Entregue com confiança  

## Notificações

WhatsApp, e-mail e sistema — prazos, entregas e cobranças automáticas.

## Agenda de obrigações

DIEF, 13º (1ª/Integral), Adiantamento, SPED, EFD, PGDAS-D, DAS, DCTF Web  
Áreas: FISCAL / PESSOAL · Frequência: Mensal / Anual

## Depoimentos

1. Fernanda Lima — Lima & Associados — −70% tempo com obrigações  
2. Rafael Souza — Souza Contabilidade — NF-e a cada 60 min  
3. Cláudia Mendes — Grupo Mendes — 200+ CNPJs, alertas  

## Sobre

Texto institucional + pilares: Segurança · Compatibilidade · API  
Integrações citadas: Bancos, Serpro, WhatsApp, e-mail

## CTA final

Pronto para transformar seu escritório?  
Agendar demonstração  
Nota: Dados 100% no Brasil · LGPD

## Footer

Tagline: Automação fiscal inteligente para escritórios contábeis brasileiros.  
Colunas: Plataforma · Empresa · Suporte · Legal  
© 2026 Impostograma · Hospedagem no Brasil · LGPD

---

## Interações atuais (baseline)

- Header sticky
- Tabs de módulos
- Tabs do painel demo
- Ticker CSS loop
- Smooth scroll nav

## Gaps / dívida técnica notada

- IDs duplicados (`#funcionalidades`, `#como-funciona`, `#sobre`, `#modulos`)
- Seções placeholder vazias no HTML
- Imagens `alt_image.png` e `painel-kanban.png` referenciadas mas ausentes no clone local
- Footer duplicado (legado removido via JS)
- Agent do repo pede manter HTML estático — redesign interativo pode exigir mudar essa regra
