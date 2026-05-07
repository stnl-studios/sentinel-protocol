# Shape Canonico de Contrato de Agent Base

## Proposito
Definir o shape minimo e canonico que todo agent base do Sentinel precisa explicitar, inclusive quando houver especializacao por projeto.

Esse contrato inclui metadata parseavel curta e um corpo contratual auditavel. A metadata continua minima. O comportamento continua sendo governado pelo corpo contratual e pelas docs canonicas.

## Metadata canonica parseavel
Todo agent base em `templates/agents/*.agent.md` deve carregar frontmatter YAML curto, estavel e parseavel no topo do arquivo.

Campos canonicos do agent base:
- `agent_version`
- `reading_scope_class`

Regras:
- `agent_version` indica a versao canonica do Sentinel Protocol usada por aquele agent.
- `reading_scope_class` e um hint parseavel da politica de leitura do agent.
- `reading_scope_class` nao substitui `Reading contract`, `Reading order`, `Source of truth hierarchy` nem `Do not scan broadly unless`.
- se houver conflito, o source of truth continua sendo o corpo contratual do agent e as docs canonicas
- a metadata minima nao e source of truth comportamental

Exemplo conceitual:

```yaml
---
name: Orchestrator
description: ...
agent_version: 2026.4.1
reading_scope_class: routing-minimal
---
```

## Role classes canonicas
O Sentinel endurece comportamento por classe de papel, nao apenas por agent individual.

Mapeamento canonico:
- `router`: `orchestrator`
- `planning`: `planner`
- `proof-design`: `validation-eval-designer`
- `execution-package-design`: `execution-package-designer`
- `executor`: `coder-backend`, `coder-frontend`, `coder-ios`, `designer`
- `semantic-review`: `reviewer`
- `proof-execution`: `validation-runner`
- `closure`: `finalizer`
- `sync`: `resync`

Regras:
- a role class governa ferramentas, leitura, budget operacional, anti-role-drift e shape de output
- a especializacao local pode restringir mais, mas nao pode relaxar os invariantes centrais da role class
- a inteligencia executavel fica acima dos coders no `execution-package-designer`; os coders continuam especialistas por stack/projeto, mas executam pacotes explicitos
- a maior parte do custo operacional da rodada pertence ao pacote executavel e aos executors dentro de limites locais, nao a `router` nem a `planning`
- `proof-execution`, `semantic-review`, `closure` e `sync` nao podem compensar falha upstream reabrindo discovery amplo

## Campos obrigatorios
Todo agent base precisa explicitar:
- missao
- quando entra
- entrada obrigatoria
- entrada opcional
- saida obrigatoria
- status que pode emitir
- stop conditions
- proibicoes
- handoff para o proximo agent
- quando escalar para o DEV
- o que pode virar memoria duravel
- o que nunca pode tocar
- reading scope
- reading order
- source of truth hierarchy
- do not scan broadly unless
- mandatory completion gate
- evidence required before claiming completion
- area-specific senior risk checklist
- output surface contract
- chat budget quando aplicavel
- budget operacional quando o papel puder consumir custo relevante cedo demais
- specialization slots
- non-overridable protocol invariants
- parte fixa do protocolo
- parte especializavel por projeto

## Disciplina canonica de superficie
Todo contrato base deve tratar explicitamente a superficie de saida quando o agent puder poluir o chat principal, repassar artifacts ricos ou narrar execucao.

O contrato pode e deve carregar, quando aplicavel:
- `output surface contract`
- `chat budget`
- politica anti-narracao operacional
- politica `delegate-first`
- politica de paralelizacao segura

Regras:
- artifacts ricos podem existir como handoff interno sem serem republicados integralmente no chat principal
- o contrato deve distinguir artifact rico interno de superficie curta externa quando o papel possuir ambos
- `delegate-first` e politica de comportamento, nao capability garantida de runtime
- politica de paralelizacao deve ser escrita como politica de coordenacao, nunca como promessa de runtime

## Politica canonica de leitura
Classes canonicas:
- `routing-minimal`: leitura minima para entender pedido, gate ativo, owner provavel e capability gap real. So `orchestrator` pode usar.
- `bounded-context`: leitura pequena e orientada a framing para estabilizar escopo, boundary, source of truth e dependencia real. So `planner` pode usar.
- `targeted-local`: leitura restrita ao handoff, ao entorno imediato do alvo e aos edges locais estritamente necessarios. `execution-package-designer` usa esta classe com budget menor que executor; coders usam esta classe apenas para leitura local suficiente para executar o pacote autorizado.
- `review-minimal`: leitura curta e estrutural para review tecnico cut-scoped do artifact implementado, sem rediscovery amplo. So `reviewer` pode usar.
- `minimal-verification`: leitura restrita ao necessario para provar, consolidar ou sincronizar um delta ja delimitado.

Regras:
- `router` nao abre implementacao por default
- `planning` nao abre codigo, contratos ou testes por default so para "entender melhor"
- fora `planner`, nenhum papel pode usar leitura equivalente a framing amplo
- `proof-execution`, `semantic-review`, `closure` e `sync` nao podem fazer rediscovery amplo por compensacao

## Budgets operacionais canonicos
Todo contrato base deve tornar explicito quem pode consumir custo e em que momento.

Budgets minimos por role class:
- `router`: budget minimo antes do primeiro handoff; deve consultar pouquissimos artifacts e abortar para blocker ou DEV em vez de continuar lendo
- `planning`: budget pequeno e condicionado; pode expandir apenas para estabilizar escopo, boundary, source of truth ou shared contract dependency real
- `proof-design`: budget local para desenhar prova; nao compensa leitura que `router` ou `planning` deixaram de fazer
- `execution-package-design`: budget local e curto para compilar `EXECUTION PACKAGE` a partir de `EXECUTION BRIEF` e `VALIDATION PACK`; nao coordena coders, nao implementa e nao replaneja o cut
- `executor`: executa o pacote autorizado com leitura local suficiente para seguranca; nao recompila pacote, nao redefine cut e nao usa broad discovery como custo normal
- `semantic-review`: budget curto, estrutural e cut-scoped; nao substitui proof nem closure
- `proof-execution`, `closure` e `sync`: budgets curtos e focados no delta ja delimitado

## Parte fixa do protocolo
E a parte canonica que define o contrato do agent base no ecossistema Sentinel. Inclui papel, limites, statuses, gatilhos de entrada e saida, classe de leitura, budget operacional, ownership de artifacts e posicao no workflow.

Artefatos efemeros canonicos do fluxo de execucao:
- `EXECUTION BRIEF`: owned by `planner`; define cut, boundary e constraints em nivel de planejamento.
- `VALIDATION PACK`: owned by `validation-eval-designer`; define prova, harness e checks deterministicos.
- `EXECUTION PACKAGE`: owned by `execution-package-designer`; compila 1..N work packages executaveis para coders especialistas-executores.

Contrato minimo do `EXECUTION PACKAGE`:
- `WORK_PACKAGE_ID`
- `GOAL`
- `OWNED_PATHS`
- `SEARCH_ANCHORS`
- `EDIT_ANCHORS`
- `DEPENDS_ON`
- `DO_NOT_TOUCH`
- `CHANGE_RULES`
- `RUN_COMMANDS`
- `ACCEPTANCE_CHECKS`
- `BLOCK_IF`

O `EXECUTION PACKAGE` nao substitui o orchestrator. Ele nao decide routing, sequencing, paralelizacao, retry, stop/go ou handoff; essas decisoes permanecem no `orchestrator`.

## Parte especializavel por projeto
E a parte que adapta contexto, heuristicas, exemplos, criterios locais, detalhes operacionais e pontos de leitura local ao projeto sem quebrar o contrato canonico do agent base.

Ela preenche slots previstos. Ela nao redefine papel, status, gates, ownership, reading scope class ou budget canonico central.

## Slots de especializacao
Os slots de especializacao podem preencher, quando fizer sentido:
- docs e caminhos locais prioritarios
- heuristicas e exemplos do projeto
- comandos, scripts e ferramentas locais
- convencoes, riscos recorrentes e criterios de evidencia do projeto
- refinamentos locais de `output surface contract`, `chat budget` e politica anti-narracao
- politica local de paralelizacao segura para executors quando o projeto precisar disso
- refinamentos locais de `Reading order` e `Source of truth hierarchy`, desde que nao ampliem a classe canonica de leitura

## Invariantes de protocolo nao sobrescreviveis
A especializacao por projeto nunca pode alterar:
- papel central do agent base
- role class canonica do agent
- nome fisico do arquivo correspondente
- statuses canonicos que o agent pode emitir
- ownership canonico dos statuses
- ordem canonica dos gates do workflow
- ownership de artifacts, memoria duravel e handoffs do protocolo
- classe canonica de leitura do agent
- budget operacional canonico do papel
- a distincao entre artifact rico interno e superficie curta externa quando ela fizer parte do contrato base

## Regras de especializacao por projeto
- a futura especializacao sempre roda ja dentro do projeto atual
- a especializacao nao recebe parametro `<PROJECT_ROOT>`
- a materializacao especializada acontece em `./.github/agents/` do projeto atual
- a especializacao so pode preencher os slots explicitos do contrato
- a especializacao nao pode usar contexto local para relaxar guardrails centrais de tool, leitura, budget ou anti-role-drift

## Shape esperado para agent especializado
Mesmo sem materializar agora, o shape esperado do arquivo especializado em `./.github/agents/*.agent.md` ja fica definido.

Campos canonicos esperados no frontmatter do agent especializado:
- `base_agent_version`
- `specialization_revision`
- `managed_artifact`

Regras:
- o agent especializado referencia o base via `base_agent_version`
- `specialization_revision` versiona apenas a materializacao especializada daquele projeto
- `specialization_revision` comeca em `1`
- `managed_artifact: true` identifica artifact gerenciado pela futura skill
- a metadata minima do specialized tambem nao e source of truth comportamental
- o comportamento do specialized continua sendo definido pelo corpo contratual materializado, derivado do base e das docs canonicas

Exemplo conceitual:

```yaml
---
name: Orchestrator
description: ...
base_agent_version: 2026.4.1
specialization_revision: 1
managed_artifact: true
---
```

## Finalidade auditavel desses metadados
Esses metadados existem para:
- saber de qual base o specialized nasceu
- controlar overwrite seguro de artifacts gerenciados
- manter uma revisao local simples do materializado

Eles nao substituem o corpo contratual dos agents ou as docs canonicas.

## Regras de preservacao
- a especializacao por projeto muda conteudo, nao muda o nome fisico do arquivo
- todo agent especializado preserva o contrato canonico do agent base correspondente
- todo agent do Sentinel e um agent base que pode ser especializado por projeto sem renomeacao fisica
