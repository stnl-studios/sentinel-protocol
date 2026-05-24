# Shape Canonico de Contrato de Agent Base

## File Purpose Header
- purpose: Contrato canônico de shape para base agents e specializeds Sentinel.
- read_when: `stnl_project_agent_specializer` ou reviewer precisa validar metadata, role class, leitura, handoff ou superfície de retorno.
- do_not_use_for: Criar SPEC, planejar execução, autorizar subagents, rodar comandos ou substituir base agents.
- canonical_source_for: Shape mínimo de contrato, role classes, reading scope e retorno compacto dos agents.
- canonical_source_not_for: Conteúdo completo de cada agent, fatos do projeto, quality gate pós-geração ou fluxo temporal.
- update_owner: `stnl_project_agent_specializer`.
- downstream_consumers: `stnl_project_agent_specializer`, `orchestrator`, `reviewer`, agents especializados.
- token_policy: Ler seções de shape e role class relevantes; abrir base agent específico para exatidão de papel.
- related_files: `reference/agents/*.agent.md`, `reference/docs/agents/AGENT-SPECIALIZATION-QUALITY-GATE.md`, `reference/docs/workflow/*`.

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
agent_version: 2026.5.0
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
- `executor`: `coder-backend`, `coder-frontend`, `coder-ios`
- `design-contributor`: `designer`
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

## Compact Agent Return Contract
Todo agent Sentinel deve retornar ao parent/root/orchestrator somente o minimo necessario para o proximo gate.

Formato default:
- `STATUS: DONE | BLOCKED | PARTIAL | FAILED`
- `OWNER: <agent-name>`
- `GATE: <current gate or next gate>`
- `FILES_CHANGED: <paths or none>`
- `NEXT_OWNER: <agent-name or none>`
- `VALIDATIONS: <command: pass/fail/not-run + short reason>`
- `BLOCKER: <only if real blocker>`
- `NOTES: <max 3 short bullets>`

O formato default vale quando a role class nao declara override proprio. `semantic-review` usa o shape especifico `PASS/FAIL` abaixo, sem converter o reviewer para `DONE/BLOCKED`.

Regras:
- return only the minimum needed for the parent to decide the next gate
- Do not repeat the full Sentinel contract
- Do not paste full SPEC, checklist, logs, or diffs
- return artifact path plus compact summary quando o artifact foi gravado/atualizado em arquivo
- Expand only on blocker, failure, critical validation evidence, or explicit human request
- main chat focused on routing/status deltas
- detalhes completos pertencem ao artifact owner ou ao arquivo de artifact, nao ao retorno textual por default
- evidencia critica continua obrigatoria quando ha blocker, falha, validacao critica ou fechamento

Regras por role class:
- `router`: gate atual, proximo owner, blocker real ou status terminal; sem narrar decisoes internas
- `planning`: path do `EXECUTION BRIEF` e ate 3 bullets; sem colar brief inteiro
- `proof-design`: path do `VALIDATION PACK` ou resumo curto; checks planejados em lista compacta
- `execution-package-design`: path do `EXECUTION PACKAGE`, `OWNED_PATHS` e proximo coder; sem colar package inteiro
- `design-contributor`: recomendacoes UI/UX compactas; `BLOCKED` com pergunta objetiva quando houver decisao de produto/design
- `executor`: arquivos alterados, resumo semantico curto, comandos e gaps; logs completos somente em falha e no trecho minimo
- `proof-execution`: verdict, comandos, pass/fail, gaps e blocker; sem logs completos quando passou
- `semantic-review`: `PASS/FAIL`; se `PASS`, ate 3 bullets; se `FAIL`, achados criticos com arquivo/linha e owner recomendado quando possivel
- `closure`: closure compacta com status, files changed, validations, qa coverage/manual gaps e next state
- `sync`: docs atualizadas, resumo curto e itens nao sincronizados; sem colar documentacao inteira

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
- a materializacao especializada acontece no output do `target`: `./.github/agents/` para VS Code/GitHub ou `.codex/agents/*.toml`, `.codex/config.toml` e `AGENTS.md` para Codex
- a especializacao so pode preencher os slots explicitos do contrato
- a especializacao nao pode usar contexto local para relaxar guardrails centrais de tool, leitura, budget ou anti-role-drift

## Shape esperado para agent especializado
Mesmo sem materializar agora, o shape esperado do arquivo especializado em `./.github/agents/*.agent.md` ja fica definido.

Campos canonicos esperados no frontmatter do agent especializado:
- `name`
- `description`
- `target`
- `tools`
- `model`
- `base_agent_version`
- `specialization_revision`
- `managed_artifact`

Regras:
- o agent especializado referencia o base via `base_agent_version`
- `specialization_revision` versiona apenas a materializacao especializada daquele projeto
- `specialization_revision` comeca em `1`
- `managed_artifact: true` identifica artifact gerenciado pela futura skill
- `model` identifica o modelo operacional materializado; texto no corpo do agent nao substitui esse campo
- `.agent.md` de VS Code/GitHub nao deve serializar `reasoning_effort`, `thinking_effort`, `model_reasoning_effort` ou equivalente no frontmatter
- `.agent.md` gerenciado para VS Code/GitHub deve respeitar o limite de 30.000 caracteres do prompt Markdown do agent
- a metadata minima do specialized tambem nao e source of truth comportamental
- o comportamento do specialized continua sendo definido pelo corpo contratual materializado, derivado do base e das docs canonicas

Exemplo conceitual:

```yaml
---
name: Orchestrator
description: ...
base_agent_version: 2026.5.0
specialization_revision: 1
managed_artifact: true
---
```

## Shape esperado para Codex
Artifacts Codex gerenciados em `.codex/agents/*.toml` usam contrato operacional proprio e nao espelham o frontmatter VS Code.

O conjunto gerenciado esperado para `target=codex` e:
- `.codex/agents/*.toml`
- `.codex/config.toml`
- `AGENTS.md`

Campos Sentinel obrigatorios no TOML Codex:
- `name`
- `description`
- `model`
- `model_reasoning_effort`
- `sandbox_mode`
- `developer_instructions`

Regras:
- `model` e `model_reasoning_effort` sao configuracao operacional, nao texto descritivo.
- `sandbox_mode` continua obrigatorio por politica Sentinel.
- `tools` nao deve ser serializado no TOML Codex controlado quando a politica vigente preserva tools semanticamente em `developer_instructions` e por hardening de `sandbox_mode`.
- `reasoning_effort`, `thinking_effort` ou equivalentes fora de `model_reasoning_effort` nao devem ser inventados.
- marcas gerenciadas devem preferir comentario/header TOML, nao campo runtime desconhecido.
- `.codex/config.toml` deve conter `[agents].max_depth = 1` como limite controlado para subagents diretos de root/main somente quando explicitamente autorizados pelo humano. Isso permite `root/main -> orchestrator` e owners sibling/root-level mediados por root/main apos `ROUTE_PACKET` dentro do modo explicito, enquanto bloqueia owner aninhado abaixo do `orchestrator` ou de qualquer agent nao-orchestrator.
- O contrato Codex usa native custom subagent spawn by exact custom agent name, mas full-history fork nao e requisito obrigatorio de handoff Sentinel.
- Explicit Subagent Invocation Contract: custom subagents sao disponiveis, mas nao entram automaticamente; o pedido humano precisa nomear o custom agent exato.
- `AGENTS.md` deve declarar a main/root Codex session como entrada humana/visual do workspace e proibir spawn automatico de custom subagents para trabalho Sentinel-governed.
- Skill/workflow request nao e autorizacao de custom subagent: `Use stnl_spec_manager`, `Use stnl_project_context` e `Use stnl_project_agent_specializer` rodam no root/main salvo pedido humano separado por exact custom agent name.
- Custom subagent so pode ser chamado quando o humano pedir explicitamente por nome exato, como `Use orchestrator`, `Use planner`, `Use coder-frontend` ou `Use validation-runner`.
- A root/main session deve enviar a subagents explicitamente autorizados apenas payload minimo/task-scoped; `AGENTS.md` e os TOMLs `.codex/agents/*.toml` carregam o contrato Sentinel duravel.
- `AGENTS.md` e os TOMLs Codex gerenciados devem carregar `Compact Agent Return Contract`, mantendo subagent returns compactos, gate-oriented e sem despejar contrato, SPEC, checklist, logs, diffs ou artifacts completos no chat.
- Codex Parent-Mediated Routing Contract: quando `Use orchestrator` for explicito, root/main spawna `orchestrator`; `orchestrator` decide gate/proximo owner e retorna `ROUTE_PACKET` compacto; root/main valida o pacote e spawna o owner indicado como native custom subagent sibling/root-level; owner retorna compacto ao root/main; root/main retorna ao `orchestrator` para a proxima decisao ate blocker, terminal ou finalizer.
- `orchestrator` deve existir como agent especializado, routing controller disponivel somente quando explicitamente invocado e route decision owner do fluxo Sentinel no Codex, decidindo owners canonicos por nome exato, preservando boundaries e carregando hardening contra prompt-emulated handoff, `codex exec`, shell/subprocess/script/local continuation, role absorption e runtime sem spawn nativo, com bloqueio `ROUTING_RUNTIME_BLOCKED`.
- Em Explicit Subagent Invocation Mode, `orchestrator` nao deve spawnar downstream Sentinel owners diretamente; isso preserva a camada visual primaria do Codex e evita nested owner threads abaixo do `orchestrator`.
- Root/main nao decide owner Sentinel sozinho: so pode spawnar owner a partir de `ROUTE_PACKET` valido, pedido humano explicito para custom agent especifico por nome exato, ou comportamento documentado de recovery/blocking.
- `ROUTE_PACKET` deve ser compacto: `STATUS: ROUTE_READY | BLOCKED | TERMINAL`, `CURRENT_GATE`, `NEXT_OWNER`, `REASON`, `PAYLOAD`, e `BLOCKER` apenas quando real; nao deve incluir artifact completo, contrato completo, SPEC/checklist/logs/diffs completos, e deve usar path + resumo compacto quando precisar de artifact rico.
- Se a tarefa exigir custom subagent Sentinel e o humano nao tiver autorizado um agent por nome exato, root/main deve bloquear com `SUBAGENT_AUTH_REQUIRED` em vez de spawnar automaticamente. O bloco deve indicar agent necessario, motivo curto e prompt minimo preservando objetivo/contexto para rerun com `Use <agent>`.
- `AGENTS.md` pode conter `Local Notes` compactas e estaveis do repo alvo, mas elas nao podem duplicar contrato Sentinel, SPEC, checklists, logs, diffs ou artifacts grandes.
- Recusa de full-history fork nao e falha de roteamento quando a runtime ainda cria uma agent thread nativa explicitamente solicitada; se a thread nativa nao for criada depois da autorizacao explicita, o fluxo deve bloquear com `ROUTING_RUNTIME_BLOCKED`.
- Prompt-emulated handoff e invalido: colar o contrato Sentinel completo no prompt, chamar "sem fork" com contrato completo, declarar que isso preserva handoff nativo, ou continuar localmente como outro papel Sentinel nao e handoff Codex nativo.
- Direct root-to-owner spawning nao e o caminho Sentinel padrao; fica reservado para pedido humano explicito de custom subagent especifico ou uso non-Sentinel.
- agents nao-orchestrator nao devem spawnar downstream Sentinel agents; devem retornar artifact/status/formal handoff signal ao root/main para roteamento mediado pelo `orchestrator`.
- quality guardrails continuam skills/constraints, nao agents roteaveis.

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
