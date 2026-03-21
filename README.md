# 🛡️ Sentinel Protocol

Sentinel Protocol é um kit de skills e templates para usar agentes com mais previsibilidade em repositórios reais.

A proposta é simples:

- contexto mínimo
- evidência primeiro
- plano curto
- fechamento de execução que vira memória útil

---

## Por que este repo existe

Na prática, muitos fluxos com agente quebram por pelo menos um destes motivos:

- contexto demais ou de menos
- plano longo demais e sem recorte operacional
- execução misturada com documentação durável
- fechamento fraco, sem memória reaproveitável
- responsabilidade confusa entre planejamento, execução e encerramento

O Sentinel organiza isso em um fluxo curto, repetível e com papéis bem separados.

---

## 📦 O que vem neste repo

- skills do protocolo
- templates canônicos
- fluxo operacional para bootstrap, plano, execução e fechamento
- base para uso em repositórios já existentes, sem inventar regra no chute

---

## ⚙️ Instalação

### Pré-requisitos

- Git
- Node.js instalado
- um cliente ou agente que consuma as skills instaladas no seu ambiente

### Clonar o repositório

```bash
git clone git@github.com:stnl-studios/sentinel-protocol.git
cd sentinel-protocol
```

### Instalar as skills

```bash
node sentinel.mjs init
```

### Validar a instalação

```bash
node sentinel.mjs doctor
```

O `doctor` deve confirmar:

- raiz do repositório
- diretório fonte das skills
- quantidade de skills encontradas
- destinos compatíveis no seu ambiente

### Atualizar depois de mudanças no repo

```bash
git pull
node sentinel.mjs init
node sentinel.mjs doctor
```

---

## 🚀 Comece por aqui

### Cenário 1: o repo existe e está sem base canônica de docs

1. Rode **Sentinel Docs Bootstrap**.
2. Resolva os **TBDs** no Core Context.
3. Quando a demanda exigir um `PLAN.md` curto, rode **Sentinel Plan Blueprint** em `MODE=CREATE`.
4. Rode **Sentinel Prompt Preflight**.
5. Execute com o agente.
6. Rode **Sentinel Phase Closure**.
7. Antes do próximo ciclo, rode **Sentinel Plan Blueprint** em `MODE=RECYCLE`.

### Cenário 2: o repo já tem base e você só quer executar uma demanda

1. Se a demanda exigir um `PLAN.md` curto, rode **Sentinel Plan Blueprint** em `MODE=CREATE`.
2. Rode **Sentinel Prompt Preflight**.
3. Execute com o agente.
4. Rode **Sentinel Phase Closure**.
5. Rode **Sentinel Plan Blueprint** em `MODE=RECYCLE` antes do próximo ciclo.

---

## 🧭 Fluxo canônico

```text
Docs Bootstrap
→ resolver TBDs mínimos
→ Plan Blueprint (MODE=CREATE)
→ Prompt Preflight
→ executor
→ Phase Closure
→ Plan Blueprint (MODE=RECYCLE)
→ próximo ciclo
```

---

## 🧩 Kit atual

### 🧰 Sentinel Docs Bootstrap

**O que é**  
Bootstrap documental mínimo para **projeto já iniciado**, em modo **create-only absoluto**, centralizando lacunas como **TBD**.

**Status**  
✅ Ativo

**Use quando**  
O repo está sem docs canônicas do Sentinel ou muito incompleto.

**Onde usar**  
No repo alvo, como primeira organização documental.

**Como usar**

1. Rode o Bootstrap.
2. Ele cria a base mínima de docs sem sobrescrever nada.
3. Resolva TBDs no Core Context.
4. Quando a demanda exigir um `PLAN.md` curto, use **Sentinel Plan Blueprint**.
5. Depois siga com **Sentinel Prompt Preflight**.

**Importante**

- não cria nem altera `PLAN.md`
- não executa implementação
- não altera código da aplicação
- não cria `DONE`
- não inventa stack, regras, contratos ou paths sem evidência

**Nota**  
O Bootstrap não cobre Swift por decisão de escopo, porque o foco dele é projeto já existente.  
Cobertura de Swift fica reservada para a skill **Greenfield**, quando esse fluxo existir.

---

### 🗂️ Sentinel Plan Blueprint

**O que é**  
A skill dona do ciclo de vida do `PLAN.md`: cria o plano inicial, recicla o plano após fechamento, detalha apenas o `Escopo ativo` e mantém o plano curto.

**Status**  
✅ Ativo

**Use quando**  
Você precisa abrir um plano com horizonte curto ou preparar o próximo ciclo após `CLOSED`, `PARTIAL` ou `BLOCKED`.

**Onde usar**  
Antes do primeiro ciclo em `MODE=CREATE` e após `sentinel_phase_closure` em `MODE=RECYCLE`.

**Como usar**

1. Rode `MODE=CREATE` para criar o primeiro `PLAN.md`.
2. Execute o ciclo com Preflight + executor.
3. Feche a execução com **Sentinel Phase Closure**.
4. Rode `MODE=RECYCLE` para recompor o plano e detalhar o novo `Escopo ativo`.

**Regras centrais**

1. Só o Blueprint pode criar ou reciclar `PLAN.md`.
2. Só o Blueprint reorganiza a ordem visível do plano.
3. Só o `Escopo ativo` pode ficar detalhado.
4. `Bloco seguinte` é curto.
5. `Bloco posterior` é opcional e curto, apenas com base suficiente.
6. Recycle é reindexação operacional, não replanejamento completo.
7. Nem executor, nem Preflight, nem Closure podem criar, reciclar, promover, resumir ou detalhar `PLAN.md`.

**Tratamento por status**

- `CLOSED`: tira o escopo concluído do centro; `Bloco seguinte` pode subir para `Escopo ativo` quando houver base.
- `PARTIAL`: recompõe o `Escopo ativo` sem promoção automática.
- `BLOCKED`: não promove artificialmente o próximo bloco sem base suficiente.

---

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

1. Envie a demanda: objetivo, escopo, arquivos alvo e fora de escopo.
2. Copie o prompt gerado pelo Preflight.
3. Cole no agente executor.
4. Responda `OK {PlanID}` para liberar a execução.
5. Se for mudança estrutural, o gate pede **ADR** antes do OK.

**Você sabe que deu certo quando**  
O agente executa só o que foi planejado e o retorno vem curto, com arquivos tocados e próximos passos.

**Importante**

- não cria nem recicla `PLAN.md`
- não reorganiza blocos do plano
- não substitui o Blueprint
- não substitui a Closure
- não inclui bloco documental no prompt
- não instrui o executor a tocar artefatos duráveis

---

### 🧾 Sentinel Phase Closure

**O que é**  
Skill de pós-execução: valida objetivo, DoD e evidência, cria `DONE` e atualiza as docs mínimas duráveis.

**Status**  
✅ Ativo

**Use quando**  
Existe um `EXECUTE OUTPUT` e você precisa decidir `CLOSED`, `PARTIAL` ou `BLOCKED`.

**Importante**

- não cria `PLAN.md`
- não recicla `PLAN.md`
- não reorganiza blocos
- não detalha o próximo escopo
- o próximo passo canônico após a Closure é `sentinel_plan_blueprint MODE=RECYCLE`
- o executor implementa e valida; a consolidação pós-execução em docs duráveis acontece aqui

---

### 🧩 Templates canônicos

**O que é**  
Templates padrão de **CONTEXT**, **RULES**, **STATE**, **CONTRACTS**, **TESTING**, **UI_KIT**, **DESIGN_SYSTEM**, **PLAN**, **DONE** e **ADR**.

**Status**  
✅ Ativo

**Use quando**  
Você precisa criar ou normalizar um doc sem inventar formato.

**Onde usar**  
No caminho oficial de docs do repo.

**Como usar**  
Copie o template e preencha. Se faltar evidência, registre como **TBD** e siga.

---

## 🏷️ Versões atuais das skills

| Skill | Version | Status |
|---|---:|---|
| Sentinel Prompt Preflight | 2026.3.0 | Active |
| Sentinel Plan Blueprint | 2026.3.0 | Active |
| Sentinel Phase Closure | 2026.3.0 | Active |
| Sentinel Docs Bootstrap | 2026.3.0 | Active |
| Templates canônicos | 2026.3.0 | Active |

---

## 🧠 Princípios que mandam

1. **Evidência primeiro**: não inventar stack, regras ou arquitetura.
2. **Contexto mínimo**: mandar só o pack que destrava.
3. **Mudança estrutural**: registrar decisão com ADR antes de executar.
4. **Ciclo do plano**: `PLAN.md` é descartável e só o Blueprint reorganiza `Escopo ativo`, `Bloco seguinte` e `Bloco posterior`.
5. **Fechamento documental**: executor não toca artefatos duráveis; Closure consolida `DONE`, `CONTEXT`, `STATE` e ADR quando aplicável.

---

## ✅ Feitos recentes

- README duplicado do Bootstrap removido.

---

## 🗺️ Roadmap vivo

| Entrega | Status | Onde entra | Como usar | Critério de pronto |
|---|---|---|---|---|
| Skill Greenfield (projetos novos) | 🟣 Radar | Só em projeto novo | Bootstrap para projeto novo, cobrindo stacks que o Bootstrap não cobre, incluindo Swift | Definir se usa templates mínimos ou kit completo e publicar a skill |
| Workflows | 🟣 Radar | Orquestração recorrente do protocolo | Definir fluxos reutilizáveis entre bootstrap, blueprint, execute e closure | Publicar workflows curtos, repetíveis e sem duplicar responsabilidade das skills |
| Subagentes / Multiagentes | 🟣 Radar | Execução coordenada em demandas maiores | Definir quando decompor leitura, execução e fechamento entre agentes sem quebrar o fluxo canônico | Ter coordenação, handoff e consolidação final claros |

---

## 🔧 Como manter isso vivo

1. Mudou status: atualize a linha do roadmap.
2. Nasceu skill nova: crie uma seção em **Kit atual** e adicione no roadmap se ainda houver evolução.
3. Mudou workflow: ajuste **Comece por aqui** e **Princípios que mandam**.
4. Mudou versão: atualize a tabela de versões.
5. Mudou responsabilidade de uma skill: ajuste primeiro o README da skill e depois este README raiz.
