# 🛡️ Sentinel Protocol

Sentinel Protocol é um kit de skills e templates para usar agentes com previsibilidade.  
A ideia é simples: **contexto mínimo**, **evidência primeiro**, e **fechamento de execução** que vira memória útil.

---

## 🚀 Comece por aqui

### 🧱 Cenário 1: o repo existe e está sem base canônica de docs
1) Rode **Sentinel Docs Bootstrap (v3)**
2) Resolva **TBDs** no Core Context
3) Quando a demanda exigir um `PLAN.md` curto, rode **Sentinel Plan Blueprint** em `MODE=CREATE`
4) Depois use **Sentinel Prompt Preflight**
5) Execute com o agente
6) Rode **Sentinel Phase Closure**
7) Antes de iniciar o proximo ciclo, rode **Sentinel Plan Blueprint** em `MODE=RECYCLE`

### 🛠️ Cenário 2: o repo já tem base e você só quer executar uma demanda
1) Se a demanda exigir um `PLAN.md` curto, rode **Sentinel Plan Blueprint** em `MODE=CREATE`
2) Rode **Sentinel Prompt Preflight**
3) Execute com o agente
4) Rode **Sentinel Phase Closure**
5) Rode **Sentinel Plan Blueprint** em `MODE=RECYCLE` antes do proximo ciclo

---

## 📦 Kit atual

### 🧭 Sentinel Prompt Preflight
**O que é**
Um Router Planner que pega sua demanda e devolve **1 prompt único**, pronto para colar no agente executor, com gates e saída curta.

**Status**
✅ Ativo

**Use quando**
Você vai pedir alteração no repo e quer evitar escopo frouxo, drift e saída verborrágica.

**Onde usar**
No chat de preparação do prompt, antes do chat do agente que vai mexer no repo.

**Como usar**
1) Envie a demanda (objetivo, escopo, arquivos alvo, fora de escopo)  
2) Copie o prompt gerado pelo Preflight  
3) Cole no agente executor  
4) Responda `OK {PlanID}` para liberar a execução  
5) Se for mudança estrutural, o gate pede **ADR** antes do OK

**Você sabe que deu certo quando**
O agente executa só o que foi planejado e o retorno vem curto com arquivos tocados e próximos passos.

**Importante**
O Preflight não cria nem recicla `PLAN.md` e não reorganiza seus blocos. Isso pertence exclusivamente ao **Sentinel Plan Blueprint**.
Ele prepara prompt para execucao sobre `Escopo ativo` ou tarefa ja definida, nao substitui o Blueprint e nao substitui a Closure.
Ele nao inclui bloco documental no prompt e nao instrui o executor a tocar artefatos duraveis.

---

### 🗂️ Sentinel Plan Blueprint
**O que é**
A skill dona do ciclo de vida do `PLAN.md`: cria o plano inicial, recicla o plano apos fechamento, detalha apenas o `Escopo ativo` e mantem o plano curto.

**Status**
✅ Ativo

**Use quando**
Voce precisa abrir um plano com horizonte curto ou preparar o proximo ciclo apos `CLOSED`, `PARTIAL` ou `BLOCKED`.

**Onde usar**
Antes do primeiro ciclo em `MODE=CREATE` e apos `sentinel_phase_closure` em `MODE=RECYCLE`.

**Como usar**
1) Rode `MODE=CREATE` para criar o primeiro `PLAN.md`
2) Execute o ciclo com Preflight + executor
3) Feche a execucao com **Sentinel Phase Closure**
4) Rode `MODE=RECYCLE` para recompor o plano e detalhar o novo `Escopo ativo`

**Regras centrais**
1) So o blueprint pode criar ou reciclar `PLAN.md`
2) So o blueprint reorganiza a ordem visivel do plano
3) So o `Escopo ativo` pode ficar detalhado
4) `Bloco seguinte` e curto e `Bloco posterior` e opcional e curto somente com base suficiente
5) Recycle e reindexacao operacional, nao replanejamento completo
6) Nem executor, nem Preflight, nem Closure podem criar, reciclar, promover, resumir ou detalhar `PLAN.md`

**Tratamento por status**
1) `CLOSED`: tira o escopo concluido do centro; `Bloco seguinte` pode subir para `Escopo ativo` quando houver base
2) `PARTIAL`: recompõe o `Escopo ativo` sem promocao automatica
3) `BLOCKED`: nao promove artificialmente o proximo bloco sem base suficiente; sem base para recycle seguro, mantem a estrutura atual e permanece `BLOCKED`

---

### 🧾 Sentinel Phase Closure
**O que é**
Skill de pos-execucao: valida objetivo, DoD e evidencia, cria `DONE` e atualiza as docs minimas duraveis.

**Status**
✅ Ativo

**Use quando**
Existe um `EXECUTE OUTPUT` e voce precisa decidir `CLOSED`, `PARTIAL` ou `BLOCKED`.

**Importante**
O fechamento nao recicla `PLAN.md`, nao reorganiza seus blocos e nao detalha o proximo escopo.
O proximo passo canonico apos a closure e `sentinel_plan_blueprint MODE=RECYCLE`.
O executor implementa e valida. A consolidacao pos-execucao em docs duraveis acontece aqui.

---

### 🧰 Sentinel Docs Bootstrap (v3)
**O que é**
Bootstrap documental mínimo para **projeto já iniciado**, em modo **create-only absoluto**, centralizando lacunas como **TBD**.

**Status**
✅ Ativo

**Use quando**
O repo está sem docs canônicas do Sentinel ou muito incompleto.

**Onde usar**
No repo alvo, como primeira organização documental.

**Como usar**
1) Rode o Bootstrap  
2) Ele cria a base mínima de docs sem sobrescrever nada  
3) Resolva TBDs no Core Context  
4) Quando a demanda exigir um `PLAN.md` curto, use **Sentinel Plan Blueprint**
5) Depois siga com **Sentinel Prompt Preflight**

**Nota**
O Bootstrap (v3) não cobre Swift por decisão de escopo (foco em projetos já existentes).  
Cobertura de Swift fica reservada para a skill **Greenfield** (projetos novos), quando fizer sentido.

---

### 🧩 Templates canônicos
**O que é**
Templates padrão de **CONTEXT**, **RULES**, **STATE**, **CONTRACTS**, **TESTING**, **UI_KIT**, **DESIGN_SYSTEM**, **PLAN**, **DONE**, **ADR**.

**Status**
✅ Ativo

**Use quando**
Você precisa criar ou normalizar um doc sem inventar formato.

**Onde usar**
No caminho oficial de docs do repo.

**Como usar**  
Copie o template e preencha. Se faltar evidência, registre como **TBD** e siga.

---

## 🧠 Princípios que mandam
1) 🔎 Evidência primeiro: não inventar stack, regras ou arquitetura  
2) 🎒 Contexto mínimo: mandar só o pack que destrava  
3) 🧾 Mudança estrutural: registrar decisão (ADR) antes de executar  
4) 🗂️ Ciclo do plano: `PLAN.md` e descartavel e so o Blueprint reorganiza `Escopo ativo`, `Bloco seguinte` e `Bloco posterior`
5) 🧾 Fechamento documental: executor nao toca artefatos duraveis; Closure consolida `DONE`, `CONTEXT`, `STATE` e ADR quando aplicavel

---

## ✅ Feitos recentes
- README duplicado do Bootstrap removido

---

## 🗺️ Roadmap vivo (pendências)

| Entrega | Status | Onde entra | Como usar | Critério de pronto |
|---|---|---|---|---|
| Skill Greenfield (projetos novos) | 🟣 Radar | Só em projeto novo | Bootstrap para projeto novo (parecido com o Docs Bootstrap), cobrindo stacks que o Bootstrap não cobre, incluindo Swift | Definir se usa templates mínimos ou kit completo e publicar a skill |
| Workflows | 🟣 Radar | Orquestracao recorrente do protocolo | Definir fluxos reutilizaveis entre bootstrap, blueprint, execute e closure | Publicar workflows curtos, repetiveis e sem duplicar responsabilidade das skills |
| Subagentes / Multiagentes | 🟣 Radar | Execucao coordenada em demandas maiores | Definir quando decompor leitura, execucao e fechamento entre agentes sem quebrar o fluxo canonico | Ter coordenacao, handoff e consolidacao final claros |

---

## 🔧 Como manter isso vivo
1) 🗓️ Mudou status: atualize a linha do Roadmap  
2) ➕ Nasceu skill nova: crie uma seção em Kit atual e adicione no Roadmap se ainda tiver evolução  
3) 🔁 Mudou workflow: ajuste só **Comece por aqui** e **Princípios que mandam**
