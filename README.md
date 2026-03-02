# 🛡️ Sentinel Protocol

Sentinel Protocol é um kit de skills e templates para usar agentes com previsibilidade.  
A ideia é simples: **contexto mínimo**, **evidência primeiro**, e **fechamento de fase** que vira memória útil.

---

## 🚀 Comece por aqui

### 🧱 Cenário 1: o repo existe e está sem base canônica de docs
1) Rode **Sentinel Docs Bootstrap (v3)**  
2) Resolva **TBDs** no Core Context  
3) A partir daí, rode tudo via **Sentinel Prompt Preflight**

### 🛠️ Cenário 2: o repo já tem base e você só quer executar uma demanda
1) Rode **Sentinel Prompt Preflight**  
2) Execute com o agente  
3) **DocSync** e **fechamento de fase**

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
4) Depois disso, demanda vira Preflight

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

---

## ✅ Feitos recentes
- README duplicado do Bootstrap removido

---

## 🗺️ Roadmap vivo (pendências)

| Entrega | Status | Onde entra | Como usar | Critério de pronto |
|---|---|---|---|---|
| Skill de geração de PLAN quando não existir PLAN | 🟡 Aprovado | Antes da execução quando a demanda é grande e falta PLAN | Gera PLAN canônico por fase curta, pronto para o fluxo do Preflight | PLAN compatível com gates e checklist de fechamento |
| DocSync como skill dedicada | 🟡 Aprovado | Pós execução | Entra com lista de arquivos alterados e sugere os docs mínimos para atualizar | Saída curta, repetível, no máximo 3 docs |
| Padronizar fechamento de fase | 🟡 Aprovado | Ritual fixo pós execução | Sempre terminar com DONE e ajustes mínimos em CONTEXT e STATE quando aplicável | Regra escrita, exemplo, caminho oficial definido |
| Skill Greenfield (projetos novos) | 🟣 Radar | Só em projeto novo | Bootstrap para projeto novo (parecido com o Docs Bootstrap), cobrindo stacks que o Bootstrap não cobre, incluindo Swift | Definir se usa templates mínimos ou kit completo e publicar a skill |

---

## 🔧 Como manter isso vivo
1) 🗓️ Mudou status: atualize a linha do Roadmap  
2) ➕ Nasceu skill nova: crie uma seção em Kit atual e adicione no Roadmap se ainda tiver evolução  
3) 🔁 Mudou workflow: ajuste só **Comece por aqui** e **Princípios que mandam**