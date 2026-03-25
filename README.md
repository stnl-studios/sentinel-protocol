# 🛡️ Sentinel Protocol

Sentinel Protocol é um protocolo para operar agentes em repositórios com mais previsibilidade.  
A proposta é simples: usar **contexto mínimo**, decidir com **evidência primeiro**, separar claramente **planejamento**, **execução** e **fechamento**, e transformar o que foi aprendido em memória útil.

O foco do Sentinel não é deixar o agente “livre para fazer tudo”.  
O foco é operar com papéis claros, handoff explícito entre etapas e artefatos curtos, descartáveis quando preciso e duráveis quando importa.

---

## 🔧 Instalação e atualização

### Pré-requisitos
- Node.js instalado
- Executar os comandos na raiz deste repositório

### Instalação inicial
Use `init` para copiar as skills da fonte local do repo (`.agents/skills`) para os destinos suportados no ambiente do usuário. Depois valide com `doctor`.

```bash
node sentinel.mjs init
node sentinel.mjs doctor
```

### Atualização
Use `update` quando quiser reaplicar a distribuição das skills a partir da versão atual do repo. Depois valide com `doctor`.

```bash
node sentinel.mjs update
node sentinel.mjs doctor
```

### O que cada comando faz
- `node sentinel.mjs init`: instala as skills da pasta fonte do repo nos destinos suportados do ambiente local
- `node sentinel.mjs update`: reaplica a mesma rotina de cópia para sincronizar os destinos com o estado atual do repo
- `node sentinel.mjs doctor`: mostra a raiz do repo, a fonte das skills, a quantidade encontrada e se os destinos esperados existem

### Destinos suportados
Atualmente o script sincroniza as skills para:
- `~/.agents/skills`
- `~/.github/skills`
- `~/.gemini/antigravity/skills`

---

## 🚀 Trilhas oficiais

O Sentinel tem **duas trilhas oficiais**.  
Nem toda demanda precisa do fluxo completo.

### Trilha curta
**Pedido cru → Prompt Preflight → executor (plano) → OK → executor (execução)**

Use quando:
- a demanda já é pequena, localizada ou bem delimitada;
- não faz sentido abrir um ciclo formal com `PLAN.md`;
- o objetivo principal é transformar um pedido ruim em um prompt de execução governado.

### Trilha completa
**Docs Bootstrap → Plan Blueprint (`MODE=CREATE`) → Prompt Preflight → executor (plano) → OK → executor (execução) → Phase Closure → Plan Blueprint (`MODE=RECYCLE`)**

Use quando:
- o repositório ainda não tem base canônica mínima;
- a demanda pede planejamento curto e controle de ciclo;
- você precisa de `PLAN.md`, fechamento formal e preparação explícita do próximo ciclo.

> Na prática, normalmente é o mesmo agente executor em dois momentos do ciclo: primeiro ele devolve o plano operacional, depois executa após aprovação do dev.

---

## 🧭 Como escolher a trilha

Use esta heurística prática:

### Use só Prompt Preflight quando
- o escopo já cabe em uma execução direta;
- você não precisa abrir ou reciclar `PLAN.md`;
- você quer organizar o pedido antes de mandar ao executor.

### Use Plan Blueprint quando
- a demanda já cruzou o limiar de tarefa simples;
- existe necessidade real de recorte operacional;
- você precisa de um `Escopo ativo` claro e de horizonte curto.

### Use Phase Closure quando
- já existe execução feita;
- você precisa decidir `CLOSED`, `PARTIAL` ou `BLOCKED`;
- o que aconteceu precisa virar fechamento canônico e memória durável.

### Use `MODE=RECYCLE` quando
- houve closure;
- a frente continua;
- o próximo ciclo ainda pertence ao mesmo fluxo e precisa de novo `Escopo ativo`.

---

## 🔁 Pipeline do protocolo

Fluxo canônico completo:

1. **Docs Bootstrap** prepara a base documental mínima
2. **Plan Blueprint (`MODE=CREATE`)** abre o primeiro `PLAN.md`
3. **Prompt Preflight** transforma o pedido em prompt de execução governado
4. **Executor — etapa de plano** devolve `PLAN OUTPUT`
5. O dev responde `OK`
6. **Executor — etapa de execução** devolve `EXECUTE OUTPUT`
7. **Phase Closure** fecha a execução e consolida o que é durável
8. **Plan Blueprint (`MODE=RECYCLE`)** recompõe o plano e detalha o novo `Escopo ativo`

Leitura rápida do pipeline:

- **Bootstrap** prepara o chão
- **Blueprint** organiza o ciclo
- **Preflight** empacota a execução
- **Executor (plano)** propõe o recorte operacional
- **Executor (execução)** implementa e valida
- **Closure** consolida o resultado
- **Recycle** prepara a próxima rodada

---

## 🔄 Handoff entre as etapas

| Etapa | Recebe | Entrega |
|---|---|---|
| Docs Bootstrap | Repo existente sem base canônica suficiente | Base documental mínima + TBDs centralizados |
| Plan Blueprint | Demanda ou fechamento anterior | `PLAN.md` criado ou reciclado |
| Prompt Preflight | Pedido cru ou escopo já definido | 1 prompt governado em bloco `md` |
| Executor (plano) | Prompt do Preflight + contexto mínimo permitido | `PLAN OUTPUT` |
| Executor (execução) | `OK` do dev + plano aprovado | Implementação, validação e `EXECUTE OUTPUT` |
| Phase Closure | `EXECUTE OUTPUT` + evidências + docs mínimas | `PHASE CLOSURE OUTPUT`, `DONE`, snapshot no `CONTEXT` e updates duráveis |
| Blueprint RECYCLE | `PLAN.md` atual + closure | Novo `Escopo ativo` e plano recomposto a partir da base mínima do ciclo |

### O que é obrigatório vs opcional no handoff
- **Bootstrap** é obrigatório só quando faltar base documental mínima
- **Blueprint** é obrigatório quando existir ciclo com `PLAN.md`
- **Preflight** é o preparador padrão de execução
- **Closure** é obrigatória quando a execução entrou em ciclo formal
- **RECYCLE** é obrigatório apenas quando o fluxo vai continuar no mesmo ciclo canônico

---

## 📦 Kit atual

### 🧭 Sentinel Prompt Preflight
**O que é**  
Uma skill que recebe uma demanda crua e devolve **1 prompt único**, curto e governado, pronto para colar no agente executor.

**Status**  
✅ Ativo

**Use quando**  
Você quer reduzir escopo frouxo, drift, excesso de leitura e saída verborrágica antes de executar.

**Onde usar**  
No chat de preparação do prompt, antes do chat do agente que vai mexer no repo.

**Importante**  
O Preflight não cria nem recicla `PLAN.md`.  
Ele não reorganiza `Escopo ativo`, `Bloco seguinte` ou `Bloco posterior`.  
Ele não fecha execução e não toca artefatos duráveis.

---

### 🗂️ Sentinel Plan Blueprint
**O que é**  
A skill dona do ciclo de vida do `PLAN.md`.

**Status**  
✅ Ativo

**Use quando**  
Você precisa abrir o primeiro plano ou preparar o próximo ciclo após `CLOSED`, `PARTIAL` ou `BLOCKED`.

**Onde usar**  
Antes do primeiro ciclo em `MODE=CREATE` e após `sentinel_phase_closure` em `MODE=RECYCLE`.

**Importante**  
Só o Blueprint pode:
- criar `PLAN.md`
- reciclar `PLAN.md`
- reorganizar `Escopo ativo`, `Bloco seguinte` e `Bloco posterior`
- detalhar o `Escopo ativo`
- ler primeiro o snapshot de recycle do `CONTEXT.md` quando o recycle ainda precisar dessa base

---

### 🧾 Sentinel Phase Closure
**O que é**  
Skill de pós-execução que valida objetivo, DoD e evidência, cria `DONE` e atualiza a memória durável mínima.

**Status**  
✅ Ativo

**Use quando**  
Existe um `EXECUTE OUTPUT` e você precisa fechar a execução como `CLOSED`, `PARTIAL` ou `BLOCKED`.

**Importante**  
A Closure não recicla `PLAN.md`, não reorganiza seus blocos e não detalha o próximo escopo.  
Ela mantém o snapshot curto no topo do `CONTEXT.md` da feature como handoff durável para recycle.  
O passo canônico seguinte, quando houver continuidade, é `sentinel_plan_blueprint MODE=RECYCLE`.

---

### 🧰 Sentinel Docs Bootstrap
**O que é**  
Bootstrap documental mínimo para **projeto já iniciado**, em modo **create-only absoluto**, centralizando lacunas como **TBD**.

**Status**  
✅ Ativo

**Use quando**  
O repo está sem docs canônicas do Sentinel ou muito incompleto.

**Importante**  
O Bootstrap não é backlog manager, não abre ciclo de execução e não substitui o Blueprint.  
Quando cria `CONTEXT` de feature, ele já semeia o snapshot curto de recycle no topo.  
Ele prepara a base mínima para o protocolo operar melhor.

---

### 🧩 Templates canônicos
**O que é**  
Templates padrão de **CONTEXT**, **RULES**, **STATE**, **CONTRACTS**, **TESTING**, **UI_KIT**, **DESIGN_SYSTEM**, **PLAN**, **DONE** e **ADR**.

**Status**  
✅ Ativo

**Use quando**  
Você precisa criar ou normalizar um doc sem inventar formato.

---

## 🧠 Dois usos práticos do Prompt Preflight

O `sentinel_prompt_preflight` continua sendo a mesma skill nos dois casos.  
Ele não vira planejador de domínio, não vira executor e não lê o repo por design.

O que muda é **em que ponto do ciclo** você está usando o prompt gerado por ele.

### 1. Preflight para preparar o plano

Aqui o Preflight organiza a entrada para o executor primeiro devolver um `PLAN OUTPUT` curto.  
É o caso em que o pedido ainda está cru, vago ou mal delimitado, ou quando você quer transformar um recorte já conhecido em um plano operacional objetivo.

Exemplos:
- “quero ajustar a feature X sem quebrar Y”
- “refatora isso sem mexer em contrato externo”
- “me devolva primeiro o plano e só execute depois do OK”

Em outras palavras:  
o Preflight não faz o plano técnico por conta própria;  
ele só prepara o prompt que leva o executor até o `PLAN OUTPUT`.

### 2. Preflight para preparar a execução

Aqui o Preflight continua sendo só um normalizador/orquestrador.  
A diferença é que o ciclo já está governado pelo handoff:

`PLAN OUTPUT` → `OK {ID}` → `EXECUTE OUTPUT`

Depois do `OK`, o mesmo prompt conduz o executor para a execução aprovada.  
Isso não transforma o Preflight em executor.  
Também não transforma o Preflight em dono do `PLAN.md`.

Exemplos:
- já existe `Escopo ativo` definido no `PLAN.md`
- a tarefa já está delimitada por arquivos, regras e fora de escopo
- você quer reduzir drift antes de executar

### Regra simples para não confundir

- se a dúvida é sobre **quem organiza ou recicla o `PLAN.md`**, a resposta é: **Blueprint**
- se a dúvida é sobre **quem transforma pedido cru em prompt operacional bom**, a resposta é: **Preflight**
- se a dúvida é sobre **quem fecha o ciclo com evidência e docs duráveis**, a resposta é: **Phase Closure**
- se a dúvida é sobre **quem mantém o handoff durável no `CONTEXT.md`**, a resposta é: **Closure escreve, Blueprint consome**

### O que ele não faz
- não lê conteúdo do repo;
- não monta plano técnico com base em evidência própria;
- não substitui Blueprint;
- não substitui Closure;
- não instrui o executor a tocar `PLAN.md`, `DONE`, `CONTEXT`, `STATE` ou ADR.

---

## 🧱 Bootstrap sem cerimônia desnecessária

O Sentinel Docs Bootstrap existe para preparar o mínimo necessário, não para transformar toda adoção em um processo pesado.

Use de forma mais lean quando:
- o repo já é relativamente organizado;
- faltam só docs canônicas básicas;
- você quer começar a operar o protocolo sem reestruturar tudo.

Use de forma mais completa quando:
- o projeto é maior;
- faltam referências canônicas mínimas;
- existe risco real de o agente inferir stack, regra ou arquitetura errada.

Perfis comuns:
- repo simples
- app modular
- monorepo
- adoção lean
- adoção completa

O coração da skill não muda.  
O que muda é a profundidade com que você vai completar os TBDs e amadurecer a base documental depois.

---

## ✅ Exemplos ponta a ponta

### Exemplo A — demanda pequena com trilha curta

**Input inicial**  
“Quero ajustar a validação do formulário de cadastro. Não pode mudar contrato externo. Arquivos alvo já estão definidos.”

**Skill acionada**  
Prompt Preflight

**Fluxo**  
Prompt Preflight → executor (plano) → OK → executor (execução)

**Artefato final**  
Mudança executada sem necessidade de `PLAN.md`

---

### Exemplo B — demanda com ciclo formal

**Input inicial**  
“Precisamos implementar uma parte nova da feature e há risco de escopo espalhar.”

**Skill acionada**
1. Docs Bootstrap, se faltar base
2. Plan Blueprint (`MODE=CREATE`)
3. Prompt Preflight
4. executor (plano)
5. OK
6. executor (execução)
7. Phase Closure

**Artefatos gerados**
- `PLAN.md` inicial
- prompt governado
- `PLAN OUTPUT`
- `EXECUTE OUTPUT`
- `PHASE CLOSURE OUTPUT`
- `DONE` e updates duráveis

**Artefato final**  
Ciclo formal executado e fechado com memória útil

---

### Exemplo C — continuidade com recycle

**Input inicial**  
A execução anterior terminou como `CLOSED` ou `PARTIAL`, e a frente continua.

**Skill acionada**
1. Phase Closure
2. Plan Blueprint (`MODE=RECYCLE`)
3. Prompt Preflight
4. executor (plano)
5. OK
6. executor (execução)

**Artefatos gerados**
- fechamento canônico
- novo `Escopo ativo`
- novo prompt de execução

**Artefato final**  
Próximo ciclo preparado sem replanejar a feature inteira

---

## ❓Guia rápido para zonas cinzentas

### Quando algo ainda é só Preflight?
Quando o problema ainda cabe como pedido de execução direta e não exige controle de ciclo com `PLAN.md`.

### Quando já pede Blueprint?
Quando a demanda precisa de recorte operacional, horizonte curto e separação explícita entre o que é agora e o que fica depois.

### Quando registrar no plano vs memória durável?
- **Plano**: recorte operacional temporário do ciclo
- **Memória durável**: o que precisa sobreviver ao ciclo em `DONE`, `CONTEXT`, `STATE` e ADR quando aplicável
- o topo do `CONTEXT.md` da feature carrega um snapshot curto de recycle; ele não substitui `DONE` nem vira mini-`PLAN.md`

### Quando uma execução incompleta deve virar `PARTIAL`?
Quando houve avanço real, mas o objetivo do ciclo não foi concluído integralmente e o fechamento ainda precisa consolidar evidência e preparar continuidade.

### Quando o próximo passo é recycle vs nova demanda?
- **Recycle**: quando a frente continua no mesmo fluxo
- **Nova demanda**: quando muda o objetivo, muda o recorte principal ou o próximo trabalho já não pertence ao mesmo ciclo

### Quem pode mexer no `PLAN.md`?
Somente o **Sentinel Plan Blueprint**.

---

## 🧠 Princípios que mandam

1. 🔎 **Evidência primeiro**  
   Não inventar stack, regra, contrato ou arquitetura.

2. 🎒 **Contexto mínimo**  
   Mandar só o pack que destrava a próxima etapa.

3. 🧾 **Mudança estrutural exige decisão**  
   Quando houver impacto estrutural, registrar ADR antes de executar.

4. 🗂️ **`PLAN.md` é descartável**  
   O plano existe para o ciclo. Conhecimento durável não mora nele.

5. 🧭 **Blueprint é o único dono do plano**  
   Só o Blueprint cria, recicla e reorganiza `Escopo ativo`, `Bloco seguinte` e `Bloco posterior`.

6. 🧾 **Executor não fecha documentação durável**  
   O executor implementa e valida.  
   A consolidação durável acontece na Closure.

---

## 🔁 Saídas canônicas do ciclo

No Sentinel, o ciclo curto não termina em “executar”.  
O handoff esperado entre as etapas é:

`PLAN OUTPUT` → `OK {ID}` → `EXECUTE OUTPUT` → `PHASE CLOSURE OUTPUT`

A ideia não é gerar relatório longo em cada passo.  
A ideia é produzir saídas curtas, objetivas e úteis para o próximo handoff.

Os exemplos abaixo são **genéricos e ilustrativos**.  
Eles existem para mostrar o formato e o nível de detalhe esperado, não para representar um projeto específico.

### Exemplo curto de `PLAN OUTPUT`

```md
## PLAN OUTPUT

ID: F1-YYYYMMDD-EXEMPLO

OBJETIVO: ajustar o escopo ativo sem alterar contratos externos nem ampliar a frente atual

ARQUIVOS ALVO:
- caminho/do/arquivo-a
- caminho/do/arquivo-b

O QUE VOU FAZER
1. aplicar o ajuste mínimo necessário no escopo ativo
2. preservar comportamento existente fora do recorte
3. validar que não houve expansão indevida do trabalho

RISCOS / GATES
- parar se exigir mudança fora do escopo ativo
- parar se depender de contrato ou base não disponível

VALIDAÇÃO
- build / checagem equivalente sem erro
- validação objetiva do comportamento alterado

AGUARDANDO: `OK F1-YYYYMMDD-EXEMPLO`
```

### Exemplo curto de `EXECUTE OUTPUT`

```md
## EXECUTE OUTPUT

ARQUIVOS TOCADOS:
- caminho/do/arquivo-a
- caminho/do/arquivo-b

O QUE FOI FEITO
1. apliquei o ajuste previsto no plano
2. preservei o comportamento existente fora do escopo
3. mantive os contratos externos inalterados

VALIDAÇÃO
- build / checagem equivalente OK
- validação objetiva do recorte OK

OBSERVAÇÕES
- sem expansão de escopo
- próximo passo canônico: `sentinel_phase_closure`
```

### Exemplo curto de `PHASE CLOSURE OUTPUT`

```md
## PHASE CLOSURE OUTPUT

STATUS: CLOSED

FEATURE: example/feature
ENTREGA: ajuste concluído no escopo ativo
DOD: atingido
EVIDENCE SUMMARY: validações previstas executadas com resultado satisfatório e sem regressão observada no recorte alterado
DOCS UPDATED: CONTEXT.md, DONE-YYYYMMDD-ajuste-concluido.md
TBDS / OBSERVATIONS: none
NEXT STEP: sentinel_plan_blueprint MODE=RECYCLE
```

---

## 🔢 Versões atuais

| Skill | Version | Status |
|---|---:|---|
| Sentinel Prompt Preflight | 2026.3.1 | Active |
| Sentinel Plan Blueprint | 2026.3.1 | Active |
| Sentinel Phase Closure | 2026.3.1 | Active |
| Sentinel Docs Bootstrap | 2026.3.1 | Active |
| Templates canônicos | 2026.3.0 | Active |

---

## 🗺️ Roadmap vivo

| Entrega | Status | Onde entra | Como usar | Critério de pronto |
|---|---|---|---|---|
| Skill Greenfield (projetos novos) | 🟣 Radar | Só em projeto novo | Bootstrap para projeto novo, cobrindo stacks fora do foco atual | Definir escopo e publicar a skill |
| Workflows | 🟣 Radar | Orquestração recorrente do protocolo | Fluxos reutilizáveis entre bootstrap, blueprint, execute e closure | Publicar workflows curtos e repetíveis |
| Subagentes / Multiagentes | 🟣 Radar | Execução coordenada em demandas maiores | Definir quando decompor leitura, execução e fechamento sem quebrar o fluxo | Ter coordenação e handoff claros |

---

## 🔧 Como manter isso vivo

1. Mudou status de skill ou entrega? Atualize a linha correspondente.
2. Nasceu skill nova? Adicione em **Kit atual** e, se necessário, no **Roadmap**.
3. Mudou o fluxo canônico? Atualize primeiro:
   - **Trilhas oficiais**
   - **Como escolher a trilha**
   - **Pipeline do protocolo**
   - **Handoff entre as etapas**
4. Mudou a fronteira entre skills? Atualize também o **Guia rápido para zonas cinzentas**.
