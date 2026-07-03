# Canonical format, body structure, notice, placement and escaping inputs decision

## Status

`ACTIVE_CANONICAL_FORMAT_BODY_STRUCTURE_NOTICE_PLACEMENT_AND_ESCAPING_INPUTS_DECISION_DOCUMENT`

## Phase

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_CANONICAL_FORMAT_BODY_STRUCTURE_NOTICE_PLACEMENT_AND_ESCAPING_INPUTS_DECISION`

## Verdict

`EXCELLENT_PASS_WITH_CANONICAL_FORMAT_BODY_STRUCTURE_NOTICE_PLACEMENT_AND_ESCAPING_INPUTS_DEFINED_TEMPLATE_WRITE_STILL_BLOCKED`

Postura: `TEMPLATE_CANONICAL_FORMAT_BODY_STRUCTURE_NOTICE_PLACEMENT_AND_ESCAPING_INPUTS_DEFINED_TEMPLATE_WRITE_STILL_BLOCKED`.

## Objective

Definir inputs canônicos positivos, mínimos, determinísticos, auditáveis, value-free e no-copy para uma futura especificação de TOML, famílias Markdown, generated notice, placement de placeholders, escaping e estrutura de body, sem criar template, body final, rendered output ou mecanismo executável.

## Scope

Esta decisão documental cobre somente os 52 candidates conceituais já allowlisted: 24 entrypoints de agentes, 2 artifacts target-level, 26 artifacts de suporte/controle e 0 arquivos de trace. A única escrita autorizada é este documento na skill dev. As fontes foram lidas por path explícito dentro de `reference/materialization_lab/`; nenhum template, host-installed skill, skill produtiva, Target real ou GitHub foi acessado.

## Non-goals

Não criar nem alterar templates; não criar os 52 arquivos ou seus diretórios pais; não produzir body final, valores, mapping Target-dependent, rendered output, fixture, snapshot, schema, parser, renderer, validator, checker, medidor, materializer, runner, runtime, CLI, threshold numérico, branch, commit ou PR; não alterar o Aggregator.

## Inherited baseline

- Arquitetura: `PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX`.
- Matriz: 12 agentes, 24 artifacts de agente e 2 artifacts target-level.
- Allowlist documental: 52 candidates = 24 + 2 + 26 + 0 trace.
- Body-basis records: resolvidos como fontes semânticas, não como bodies.
- Placeholder inventory: 57 nomes fechados nos namespaces `shared`, `agent`, `shard`, `trace`, `platform` e `target`.
- Sintaxe nominal: `{{namespace.name}}`, lowercase dot-separated, underscore dentro de segmentos; unknown, nested, unused e multiline identifiers são fail-closed; `{{AGENT_BODY}}` é proibido.
- Support layer: bounded, conceitual e não materializado; trace: audit-only e zero template files.
- Anti-bloat: qualitativo; thresholds finais permanecem deferred.

## Relation to blocked canonical specification decision

A decisão imediatamente anterior tem status `BLOCKED_PENDING_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION` e verdict `BLOCKED_WITHOUT_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION`. Seu bloqueio foi corretamente causado pela falta de inputs positivos. Esta fase, expressamente autorizada para criá-los, fecha apenas esse gap documental. O histórico de leituras contaminadas nela registrado não foi repetido nem usado.

## Relation to canonical input authority

Esta decisão é a nova autoridade positiva de estrutura e formato para fases documentais posteriores. Ela complementa, sem substituir, allowlist, body-basis, inventário e sintaxe de placeholders. Sua autoridade não alcança values, Target, runtime ou escrita.

## Relation to exact allowlist decision retry

A allowlist exata de 52 entries permanece válida e conceitual. Este documento não enumera novamente nem cria seus paths. Os novos inputs descrevem como uma fase futura poderá especificar bodies para aquelas entries; não transformam allowlist em write permission.

## Relation to path filename body basis decision

Os records `BB-GH-*`, `BB-CX-*`, `BB-CFG`, `BB-GUIDE`, `BB-SS`, `BB-SM`, `BB-AS-*` e `BB-AM-*` fornecem purpose, sources, obligations, transformations, temperatures, dispositions e exclusions. Aqui eles são ligados a keys, headings e slots, sem copiar sources e sem transformar records em payload literal.

## Relation to placeholder final inventory

O inventário fechado de 57 nomes fornece somente identidade nominal, namespace, purpose e value status. Nenhum nome é criado, removido ou renomeado. Esta decisão fornece placement contextual; não fornece value.

## Relation to placeholder final syntax

A forma `{{namespace.name}}` é preservada. Flat legacy placeholders não são autoridade para esta decisão. Tokens unknown, nested, unused, multiline e `{{AGENT_BODY}}` permanecem proibidos. Sintaxe não é parser, regex ou schema.

## Relation to support layer finalization

`_shared`, START, MANIFEST e micro-packs continuam responsabilidades conceituais bounded. Os headings e slots definidos aqui não criam sua estrutura física nem autorizam materialização.

## Relation to support-layer template families

As famílias platform entrypoint, target-level artifact, shared support, per-agent support, activation control, temperature shard e trace support são categorias de cobertura, não agentes. Temperature support é referenciado por manifests; trace support permanece sem arquivo próprio.

## Relation to trace audit closeout

Trace continua audit-only, não default behavior, template, agente ou terceira matriz. Trace records orientam evidência de transformação; não entram como body copiado. O número de trace template files continua zero.

## Relation to anti-bloat posture

Entrypoints ficam pequenos; regras comuns ficam em `_shared`; START faz discovery/activation mínima; MANIFEST contém inventário/routing; shards e `/docs` são on-demand; nenhum source mirror ou body monolítico é permitido. Não há threshold numérico novo.

## Relation to Aggregator boundary

O Aggregator permanece fechado nos nove child checks oficiais, na ordem contratada. O wrapper não é décimo check. Esta decisão não cria, registra ou altera checker, child check, mapper, consumer, smoke, auditoria auxiliar ou Aggregator.

## Canonical invariants

- Toda estrutura positiva desta decisão é documental e value-free.
- Keys, headings, slots e notice têm ordem determinística.
- Placeholders aparecem apenas em values/slots autorizados, nunca em paths físicos, filenames, TOML keys/table names ou Markdown headings.
- Kernels, Senior Agent Profiles, `/docs`, templates e skills instaladas nunca são payload.
- Ausência, conflito, placeholder unknown/nested/multiline ou necessidade de value causa abort em fase futura.
- Target real, GitHub, skill produtiva e host-installed skills permanecem fora de escopo.

## Matrix 12/24/2 preservation

| Elemento | Quantidade | Decisão |
|---|---:|---|
| Agentes canônicos | 12 | Inalterados e em ordem canônica |
| Artifacts de agente | 24 | 12 GitHub Markdown + 12 Codex TOML |
| Artifacts target-level | 2 | Codex config + AGENTS guide; não são agentes |
| Candidates de suporte | 26 | Não são agentes nem terceira matriz |
| Trace template files | 0 | Audit-only |

Templates, famílias, `_shared`, support packs, shards, trace, notices e placeholders não contam como agentes.

## Canonical input decision posture

`TEMPLATE_CANONICAL_FORMAT_BODY_STRUCTURE_NOTICE_PLACEMENT_AND_ESCAPING_INPUTS_DEFINED_TEMPLATE_WRITE_STILL_BLOCKED`.

## Decision model

`BASIS_READY` significa base herdada suficiente; `CANONICAL_INPUT_DEFINED` significa novo input positivo fechado aqui; `DEFERRED` significa decisão legitimamente futura; `BLOCKED` significa uso ainda proibido. A classificação é humana e documental, não gate executável.

## Decision criteria

Passar exige resolver todos os inputs estruturais sem consultar fonte proibida, sem values e sem alterar invariantes. Pode haver itens `DEFERRED` apenas para values, retries, materialização e mecanismos futuros; nenhum input de formato requerido pode ficar `BLOCKED`.

## Decision result

| Criterion | Status | Evidence basis | Decision meaning | Still blocked |
|---|---|---|---|---|
| 1. Previous canonical specification blocked result understood | BASIS_READY | Decisão anterior | Gap herdado corretamente | Não |
| 2. Canonical input authority accepted | CANONICAL_INPUT_DEFINED | Missão desta fase | Autoridade positiva limitada | Escrita |
| 3. Previous host-skill deviation recorded, not repeated | BASIS_READY | Registro herdado + higiene atual | Conteúdo descartado | Não |
| 4. Previous template contamination recorded, not repeated | BASIS_READY | Registro herdado + higiene atual | Conteúdo descartado | Não |
| 5. Read hygiene preserved | BASIS_READY | Paths explícitos | Sem contaminação nova | Não |
| 6. Exact allowlist remains documented | BASIS_READY | Allowlist retry | 52 conceituais | Escrita |
| 7. 52 candidate files remain conceptual | BASIS_READY | Scope | Nenhum criado | Sim |
| 8. Body-basis records available | BASIS_READY | BB records | Semântica apenas | Body final |
| 9. Codex entrypoint inputs definíveis | CANONICAL_INPUT_DEFINED | Autoridade desta fase | Shape fechado | Values |
| 10. Codex key set | CANONICAL_INPUT_DEFINED | Seções TOML | Set mínimo | Values |
| 11. Codex key order | CANONICAL_INPUT_DEFINED | Seções TOML | Ordem fixa | Não |
| 12. Codex value types | CANONICAL_INPUT_DEFINED | Seções TOML | Tipos fixos | Values |
| 13. Codex comments | CANONICAL_INPUT_DEFINED | Notice/comments | Notice only | Não |
| 14. Codex multiline | CANONICAL_INPUT_DEFINED | Escaping | Uma key multiline | Body final |
| 15. Target config inputs definíveis | CANONICAL_INPUT_DEFINED | Autoridade desta fase | Shape fechado | Values |
| 16. Target config key set | CANONICAL_INPUT_DEFINED | Seções config | Duas keys por table | Values |
| 17. Target config tables | CANONICAL_INPUT_DEFINED | Seções config | 12 tables literais | Values |
| 18. Target config key order | CANONICAL_INPUT_DEFINED | Seções config | Ordem fixa | Não |
| 19. Target config value types | CANONICAL_INPUT_DEFINED | Seções config | Basic strings | Values |
| 20. Target config comments | CANONICAL_INPUT_DEFINED | Notice/comments | Notice only | Não |
| 21. GitHub headings | CANONICAL_INPUT_DEFINED | Markdown families | Ordem fixa | Prosa final |
| 22. Target AGENTS headings | CANONICAL_INPUT_DEFINED | Markdown families | Ordem fixa | Prosa final |
| 23. Shared START headings | CANONICAL_INPUT_DEFINED | Markdown families | Ordem fixa | Prosa final |
| 24. Shared MANIFEST headings | CANONICAL_INPUT_DEFINED | Markdown families | Ordem fixa | Prosa final |
| 25. Per-agent START headings | CANONICAL_INPUT_DEFINED | Markdown families | Ordem fixa | Prosa final |
| 26. Per-agent MANIFEST headings | CANONICAL_INPUT_DEFINED | Markdown families | Ordem fixa | Prosa final |
| 27. Markdown slots | CANONICAL_INPUT_DEFINED | Slot matrix | Slots bounded | Values/prosa |
| 28. Markdown prose boundary | CANONICAL_INPUT_DEFINED | Prose inputs | Transformação, não cópia | Body final |
| 29. Notice requirement | CANONICAL_INPUT_DEFINED | Notice inputs | Obrigatório uma vez | Não |
| 30. Notice wording class | CANONICAL_INPUT_DEFINED | Notice inputs | Wording fixo e neutro | Não |
| 31. Notice placement | CANONICAL_INPUT_DEFINED | Notice inputs | Linha 1 | Não |
| 32. Placeholder namespaces placed | CANONICAL_INPUT_DEFINED | Placement matrix | Contextos fechados | Values |
| 33. Required/optional/deferred status | CANONICAL_INPUT_DEFINED | Placement matrix | Status por namespace/família | Values |
| 34. Placeholder values remain blocked | BASIS_READY | Value boundary | Nenhum value | Sim |
| 35. Target-dependent filling blocked | BASIS_READY | Target boundary | Nenhum filling | Sim |
| 36. Placeholders excluded from physical paths | BASIS_READY | Invariante | Nenhum token em path | Não |
| 37. Placeholders excluded from filenames | BASIS_READY | Invariante | Nenhum token em filename | Não |
| 38. Placeholders excluded from TOML keys/tables | BASIS_READY | TOML policy | Values only | Não |
| 39. Placeholders excluded from Markdown headings | BASIS_READY | Markdown policy | Body slots only | Não |
| 40. Forbidden placeholders preserved | BASIS_READY | Syntax decision | Fail-closed | Não |
| 41. Markdown escaping | CANONICAL_INPUT_DEFINED | Format safety | Contextual e bounded | Mecanismo |
| 42. TOML escaping | CANONICAL_INPUT_DEFINED | Format safety | Contextual e bounded | Mecanismo |
| 43. Format safety | CANONICAL_INPUT_DEFINED | Format safety | Rejeição definida | Mecanismo |
| 44. No-copy preserved | BASIS_READY | Body source boundary | Sem source mirror | Não |
| 45. Anti-bloat preserved | BASIS_READY | Qualitative posture | Sem body monolítico | Thresholds |
| 46. Trace audit-only | BASIS_READY | Trace closeout | Não é payload | Schema final |
| 47. Trace template files zero | BASIS_READY | Allowlist | Zero mantido | Não |
| 48. Future create-only default | DEFERRED | Write criteria | Condicionado a retries | Sim |
| 49. Mutation blocked | BASIS_READY | Create-vs-mutate | Fail on preexistence | Sim |
| 50. No templates read | BASIS_READY | Higiene operacional | Nenhum | Não |
| 51. No host-installed skills read | BASIS_READY | Higiene operacional | Nenhuma | Não |
| 52. No productive skill read | BASIS_READY | Higiene operacional | Nenhuma | Não |
| 53. No templates created | BASIS_READY | Escrita única | Nenhum | Não |
| 54. No rendered outputs | BASIS_READY | Scope | Nenhum | Estratégia futura |
| 55. No fixtures | BASIS_READY | Scope | Nenhuma | Estratégia futura |
| 56. No snapshots | BASIS_READY | Scope | Nenhum | Estratégia futura |
| 57. No parser, renderer or schema | BASIS_READY | Scope | Nenhum | Decisão futura |
| 58. No validator, checker or materializer | BASIS_READY | Scope | Nenhum | Decisão futura |
| 59. Matrix 12/24/2 preserved | BASIS_READY | Matrix | Inalterada | Não |
| 60. Aggregator nine-check boundary | BASIS_READY | Contract | Inalterado | Não |
| 61. Target real blocked | BASIS_READY | Hard scope | Não acessado | Sim |
| 62. GitHub blocked | BASIS_READY | Hard scope | Não acessado | Sim |
| 63. One-document write limit | BASIS_READY | Write permission | Somente este arquivo | Não |

A tabela não é schema, checker, validator, template ou gate executável.

## Read hygiene and host-skill contamination prevention

Foram usados somente paths explícitos permitidos. Não houve busca ampla, listagem recursiva, leitura/listagem/busca em `reference/templates/**`, leitura de `.agents/skills/**`, host-installed skill, skill produtiva, Target ou GitHub. Um subagente fez um existence probe com path digitado incorretamente; recebeu apenas `ENOENT`, sem conteúdo e sem contaminação. Registros históricos contaminados foram reconhecidos e integralmente descartados.

## Canonical input authority

Esta fase está autorizada a definir inputs estruturais novos, canônicos para fases documentais posteriores expressamente autorizadas. Esses inputs não são templates, rendered outputs, body final, schema executável, parser, renderer, validator ou checker. Eles não autorizam escrita, Target real, GitHub, skill produtiva ou host-installed skills. Sua única função é impedir que retries futuros inventem formato.

## TOML Codex entrypoint inputs

Cada um dos 12 entrypoints usa um documento TOML sem tables. A linha 1 é o notice canônico; depois, keys em ordem determinística. Required: `name`, `description`, `developer_instructions`. Optional e omitidas enquanto sem value autorizado: `model`, `model_reasoning_effort`, `sandbox_mode`. Não há outras keys. Target real, capability discovery, GitHub, skill produtiva e host skills não podem fornecer values.

## TOML Codex entrypoint key inputs

| Ordem | Key | Status | Tipo | Placeholder namespaces permitidos | Proibido |
|---:|---|---|---|---|---|
| 1 | `name` | required | basic string single-line | exatamente `{{agent.display_name}}` | qualquer outro token; newline |
| 2 | `description` | required | basic string single-line | exatamente `{{agent.canonical_role}}` | qualquer alternativa; multiline |
| 3 | `model` | optional | basic string single-line | nenhum; omitir sem decisão de value | default, inference, blank |
| 4 | `model_reasoning_effort` | optional | basic string single-line | nenhum; omitir sem decisão de value | default, inference, blank |
| 5 | `sandbox_mode` | optional | basic string single-line | nenhum; omitir sem decisão de value | default, inference, blank |
| 6 | `developer_instructions` | required | multiline basic string | exatamente os sete tokens ordenados abaixo | token extra, `trace`, `target`, `shard`, `AGENT_BODY` |

Keys opcionais ausentes não deixam linha vazia nem comentário substituto. Keys são literais, nunca placeholders.

## TOML Codex entrypoint value inputs

`name` contém somente `{{agent.display_name}}`; `description`, somente `{{agent.canonical_role}}`. `developer_instructions` contém exatamente estes sete slots, um token por linha lógica e nesta ordem: `{{agent.agent_id}}`, `{{agent.canonical_role}}`, `{{agent.activation_policy_reference}}`, `{{agent.start_sequence}}`, `{{shared.routing_relation}}`, `{{shared.global_reading_boundary}}`, `{{agent.stop_conditions}}`. Não há prefixo, sufixo, linha vazia ou prosa entre tokens.

O layout serializado é fechado: `developer_instructions = """` abre a linha; o primeiro token começa na linha seguinte; os demais são separados por um LF; o sétimo token é imediatamente seguido pelo delimiter `"""` na mesma linha. O LF logo após a abertura não integra o value e não existe LF antes do fechamento. Model, effort e sandbox são representáveis apenas pelas keys opcionais e basic strings; permanecem omitidos até value decision explícita. Nenhum final value é definido aqui.

## TOML target config inputs

O config conceptual contém exatamente 12 tables `agents.<literal-agent-id>`, na ordem canônica da matriz. Não há top-level key. Cada table contém required `description` e `config_file`, nessa ordem; não há optional key. O documento representa somente registry/identity de entrypoints, não role behavior, runtime mutation ou capability discovery.

## TOML target config key and table inputs

Ordem das tables: `orchestrator`, `planner`, `validation-eval-designer`, `execution-package-designer`, `designer`, `coder-frontend`, `coder-backend`, `coder-ios`, `validation-runner`, `reviewer`, `finalizer`, `resync`. Os IDs são literais e quoted table-key segments quando contêm hífen. Em cada table:

1. `description`: required basic string single-line;
2. `config_file`: required basic string single-line.

Não há arrays, inline tables, nested subtables ou key dinâmica. Cada ocorrência tem scope documental definido pelo literal agent ID da table que a contém. Assim, o token `agent.*` ou `target.entrypoint_path` daquela table significa exclusivamente o agente nomeado pela table; não existe scope global, fallback ou carry-over. Uma futura resolução deve receber `(literal table agent ID, placeholder)` como contexto e bloquear se não houver exatamente um binding. Esta regra define placement e binding contextual, não cria schema, parser ou renderer.

## TOML target config value inputs

`description` aceita exatamente `{{agent.canonical_role}}`; `config_file` aceita exatamente `{{target.entrypoint_path}}`, com status deferred e sem filling. Cada token ocupa integralmente sua basic string e herda o scope da table literal. Nenhum outro token ou namespace é aceito. A proibição de placeholder em path refere-se ao path/filename físico do template ou artifact; o token path-valued é permitido somente como conteúdo integral de `config_file` e não cria nem altera path. Blank, default inventado, path observado, capability inferida e Target value são proibidos.

## TOML comments inputs

Somente o generated notice da linha 1 é permitido como comentário. Não há comments inline, comments entre keys/tables, comments com placeholder nem comments derivados de source. `#` dentro de string é conteúdo literal; fora de string só pode iniciar o notice canônico.

## Markdown family inputs

| Família | Required headings na ordem | Optional headings | Lista/tabela | Boundary principal |
|---|---|---|---|---|
| GitHub platform entrypoint | `# Agent`, `## Mission`, `## Activation`, `## Responsibilities`, `## Boundaries`, `## Routing and support`, `## Completion` | nenhum | listas curtas; sem tabela | `O-ENTRY + O-role`, `X-GH`, shared por referência |
| Target-level AGENTS guide | `# Agent system`, `## Purpose`, `## Canonical agents`, `## Routing`, `## Shared support`, `## Selective loading`, `## Documentation access`, `## Boundaries` | nenhum | 12 bullets literais ordenados; sem tabela | cross-cutting, sem role bodies |
| Shared START | `# Shared start`, `## Purpose`, `## Initial sequence`, `## Shared references`, `## Reading boundary`, `## Failure handling` | nenhum | lista ordenada só para sequência | discovery mínimo |
| Shared MANIFEST | `# Shared manifest`, `## Purpose`, `## Inventory`, `## Activation rules`, `## Dependencies`, `## Do not load`, `## Missing item behavior` | nenhum | inventory records rotulados; tabela proibida | inventory/routing metadata |
| Per-agent START | `# Agent start`, `## Identity`, `## Activation`, `## Initial reads`, `## Sequence`, `## Shared support`, `## Stop conditions` | nenhum | lista ordenada só para sequência | exact-role activation, sem body |
| Per-agent MANIFEST | `# Agent manifest`, `## Identity and role`, `## Inventory`, `## Activation triggers`, `## Dependencies`, `## Do not load`, `## Output and handoff`, `## Trace expectations`, `## Documentation access` | nenhum | inventory records rotulados; tabela proibida | inventory/routing, trace audit-only |

Notice aparece antes do primeiro heading. Headings são literais e não recebem placeholders.

## Markdown heading inputs

Há exatamente um H1 e os H2 listados por família, sem H3, heading opcional, heading vazio ou heading com token. A ordem é normativa. A futura canonical specification deve abortar se precisar adicionar, remover, renomear ou reordenar heading.

## Markdown slot inputs

- GitHub entrypoint: identity/role em Mission; activation policy em Activation; role obligations em Responsibilities; exclusions em Boundaries; support/shared relations em Routing; stop/handoff em Completion.
- AGENTS guide: em Canonical agents, exatamente 12 bullets `- <literal-agent-id>` na ordem da matriz, sem descrição ou token; routing/shared/selective loading/docs boundaries nos headings homônimos.
- Shared START: shared purpose, initial sequence, shared references, global reading boundary e fail-closed behavior.
- Shared MANIFEST: cada record de Inventory é um bullet single-line com labels fixos e nesta ordem: `Item:`, `Purpose:`, `Trigger:`, `Dependencies:`, `Do not load when:`; campos são separados por `; ` e o record termina com `.`. Activation, Dependencies e Do not load referenciam os mesmos IDs, sem body embutido.
- Per-agent START: agent identity/role, activation reference, initial reads, start sequence, shared paths/relations e stop conditions.
- Per-agent MANIFEST: cada record de Inventory é um bullet single-line com labels fixos e nesta ordem: `Module:`, `Temperature:`, `Purpose:`, `Trigger:`, `Dependencies:`, `Do not load when:`; campos são separados por `; ` e o record termina com `.`. Os demais headings referenciam os mesmos module IDs; trace expectation é uma frase estática no-copy, sem `trace.*`.

Cada slot contém uma frase curta ou lista de itens atômicos. Listas não são nested. Sequências usam lista ordenada `1.`; demais listas usam `-`. Nenhum slot aceita body monolítico.

## Markdown prose inputs

Prosa final ainda não é definida. A transformação futura deve parafrasear cada obligation em linguagem imperativa curta, uma responsabilidade por item; exclusions viram proibições explícitas; references permanecem references; docs são on-demand. Tabelas são proibidas nos seis bodies para evitar payload denso. Citações extensas, boilerplate, source extracts, HTML ativo e code fences são proibidos.

## Generated notice inputs

Notice é obrigatório, fixo, sem placeholder e aparece exatamente uma vez.

- Markdown, linha 1: `<!-- Generated file. Do not edit directly. -->`
- TOML, linha 1: `# Generated file. Do not edit directly.`

Após o notice há exatamente uma linha vazia. Em Markdown vem o H1; em TOML vem a primeira key ou table. O notice não é repetido por section/table, não entra em slot e não contém Target value, unknown/nested/multiline token ou source boilerplate. Esta decisão não renderiza o notice.

## Placeholder placement inputs

| Namespace | Allowed families | Allowed Markdown placement | Allowed TOML placement | Forbidden placement | Required optional or deferred | Value status | Escaping context | Target dependency handling | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `shared` | AGENTS, Shared START/MANIFEST; referência em GitHub e per-agent | Purpose/Routing/Shared support/Reading boundary/Inventory | entrypoint, exatamente `shared.routing_relation` e `shared.global_reading_boundary` | heading, notice, key/table/path físico | matriz abaixo | unfilled; nominal | plain text/list; TOML string | members target-dependent deferred | common rule por referência |
| `agent` | GitHub e per-agent START/MANIFEST | Mission/Identity/Activation/Sequence/Completion | entrypoint slots fechados; config `description` | AGENTS placeholder, heading, key/table/path físico | matriz abaixo | unfilled; nominal | plain text/list; TOML string | derived somente | AGENTS usa 12 IDs literais |
| `shard` | AGENTS Selective loading; Shared START Initial sequence; shared/per-agent MANIFEST; per-agent START Activation | Inventory/Activation/Dependencies/Do not load | nenhum | entrypoint/config/heading/notice | matriz abaixo | unfilled; nominal | list item | reads target-dependent deferred | nunca embed shard body |
| `trace` | nenhuma das 52 entries | nenhum; heading recebe prosa estática | nenhum | qualquer Markdown/TOML/template trace | deferred/audit-only | unfilled; nominal | N/A | source facts deferred | zero trace templates |
| `platform` | GitHub Mission; AGENTS Purpose | somente metadata de platform, sem capability discovery | nenhum | headings, keys/tables, support bodies | matriz abaixo | unfilled; derived only | plain text | tooling/capability proibidos | sem discovery |
| `target` | AGENTS Documentation access; target config | slot deferred de docs reference | config `config_file` somente | headings, keys/table names, notice, physical paths | deferred | unfilled; future-target-dependent | plain text; basic string | nenhuma resolução nesta fase | namespace não autoriza Target |

## Placeholder namespace placement matrix

| Família/formato | `shared` | `agent` | `shard` | `trace` | `platform` | `target` |
|---|---|---|---|---|---|---|
| GitHub entrypoint | OPTIONAL — Routing and support | REQUIRED — Mission/Activation/Completion | FORBIDDEN | FORBIDDEN | REQUIRED — Mission | FORBIDDEN |
| Target AGENTS | REQUIRED — Purpose/Routing/Shared support/Documentation access | FORBIDDEN — IDs são literais | OPTIONAL — Selective loading | FORBIDDEN | OPTIONAL — Purpose | DEFERRED — Documentation access |
| Shared START | REQUIRED — Purpose/Initial sequence/Shared references/Reading boundary/Failure handling | FORBIDDEN | OPTIONAL — Initial sequence, referência apenas | FORBIDDEN | FORBIDDEN | FORBIDDEN |
| Shared MANIFEST | REQUIRED — Purpose/Inventory/Dependencies/Missing | FORBIDDEN | OPTIONAL — Inventory/Activation/Do not load | FORBIDDEN | FORBIDDEN | FORBIDDEN |
| Per-agent START | OPTIONAL — Shared support | REQUIRED — Identity/Activation/Initial reads/Sequence/Stop | OPTIONAL — Activation, referência apenas | FORBIDDEN | FORBIDDEN | FORBIDDEN |
| Per-agent MANIFEST | OPTIONAL — Dependencies/Documentation access | REQUIRED — Identity/Output and handoff | REQUIRED — Inventory/Triggers/Dependencies/Do not load | FORBIDDEN | FORBIDDEN | DEFERRED — Documentation access |
| Codex entrypoint TOML | REQUIRED — dois slots em `developer_instructions` | REQUIRED — `name` + `description` + cinco slots em `developer_instructions` (7 ocorrências; 6 nomes únicos) | FORBIDDEN | FORBIDDEN | FORBIDDEN | FORBIDDEN |
| Codex target config TOML | FORBIDDEN | REQUIRED — `description`, scoped pela table | FORBIDDEN | FORBIDDEN | FORBIDDEN | DEFERRED — `config_file`, scoped pela table |

`REQUIRED`, `OPTIONAL`, `DEFERRED` e `FORBIDDEN` são exhaustivos. OPTIONAL permite omissão sem linha vazia; DEFERRED preserva o token sem resolution; FORBIDDEN aborta. Um namespace não concede placement automático a nomes cujo purpose nominal não corresponda ao slot.

## Markdown placeholder placement inputs

Tokens só podem ocorrer em plain prose ou list items nos slots definidos. São proibidos em headings, link destinations, image destinations, HTML tags/comments, code fences, YAML/front matter, table cells e markers de lista. Um item pode conter tokens granulares relacionados, mas nunca um token substituindo section inteira. Path-valued tokens podem aparecer como conteúdo textual, sem alterar path físico.

## TOML placeholder placement inputs

Tokens só podem ocorrer dentro de string values explicitamente allowlisted. Nunca em bare value, key, dotted key, table name, comment, delimiter ou notice. Single-line values contêm exatamente um token ocupando o conteúdo integral da string. `developer_instructions` contém exatamente os sete tokens, na ordem e no layout definidos em `TOML Codex entrypoint value inputs`, sem prosa intermediária. Tokens não podem produzir syntax TOML antes de resolução.

## Placeholder escaping inputs

Delimiters `{{` e `}}` de token reconhecido são preservados byte-for-byte e não recebem backslash/HTML encoding. Escaping aplica-se ao conteúdo ao redor, nunca ao identifier. Token partido por newline, whitespace inserido, nesting, token unknown/unused ou delimiter desequilibrado é inválido e aborta. Não há resolution, coercion ou default nesta fase.

## Forbidden placeholder contexts

Paths e filenames físicos; Markdown headings; TOML keys, dotted keys e table names; notices; comments; link/image destinations; HTML; code fences; YAML/front matter; structural list markers; raw/bare TOML values; unknown, nested, unused ou multiline identifiers; `{{AGENT_BODY}}`; placeholder monolítico; value final; unsafe raw interpolation.

## Format safety and escaping inputs

- Pipeline obrigatório para futura resolução: validar identifier/contexto e binding único; obter value autorizado; validar caracteres e cardinalidade single-line; escapar o value; inserir no slot; serializar delimiters; validar que a estrutura permaneceu inalterada. Nenhuma etapa pode ser invertida ou omitida.
- Encoding textual: UTF-8 sem BOM; newline estrutural LF. CR, NUL, controles C0 exceto TAB e trailing space/tab em value são rejeitados, nunca normalizados silenciosamente.
- Markdown plain text/list item: substituir primeiro `\\` por `\\\\`; depois, em ordem, prefixar com `\\` cada `` ` ``, `*`, `_`, `[`, `]`, `<`, `>` e `|`. Se o primeiro caractere do value for `#`, `>`, `-` ou `+`, prefixá-lo com `\\`; se começar por dígitos seguidos de `.`, escapar o ponto. Nenhum outro escaping contextual é permitido. HTML ativo, code fence e value multiline são proibidos; tokens não resolvidos permanecem intactos.
- TOML single-line basic string: substituir primeiro cada caractere backslash U+005C por dois backslashes; depois substituir cada caractere aspas dupla raw U+0022 pelo par U+005C U+0022; TAB vira backslash + `t`; demais controles abortam. `#` dentro da string permanece literal. Inserir o resultado entre as aspas duplas existentes, sem alterar delimiters.
- TOML multiline basic string: somente `developer_instructions`, no layout fixo definido acima. Cada slot resolvido é single-line. Aplicar a mesma ordem: dobrar cada backslash raw, escapar cada aspas dupla raw com um backslash e converter TAB em backslash + `t`; demais controles abortam. Os seis LFs entre slots vêm da composição, não dos values. Aspas escapadas não formam delimiter de fechamento.
- Comments: somente notice estático; nenhum conteúdo dinâmico.
- Raw unsafe interpolation, normalização silenciosa, nested token e multiline identifier são proibidos.

Esses são inputs documentais; nenhum escaper, parser, renderer, schema ou validator é criado.

## Body structure inputs

Body-basis purpose seleciona a família; obligation seleciona exatamente um heading/key/slot; transformation exige paráfrase curta; exclusion vira forbidden content; temperature define reference/activation, nunca embedded shard; trace ID sustenta auditabilidade fora do body; disposition define shared versus role-specific.

- `O-ENTRY`: identity + target surface → Mission; activation → Activation; role obligation → Responsibilities; forbidden takeover/exclusions → Boundaries; support route → Routing and support; stop/handoff → Completion. Em Codex, o mapping equivalente é o set de sete slots fechado.
- `O-CFG`: agent registry identity → literal table; role summary → `description`; entrypoint relation → `config_file`; nenhuma role behavior.
- `O-GUIDE`: scope → Purpose; 12 roles → Canonical agents; route → Routing; common rules → Shared support; temperature selection → Selective loading; docs-on-demand → Documentation access; exclusions/fail-closed → Boundaries.
- `O-SS`: responsibility → Purpose; discovery order → Initial sequence; common routes → Shared references; narrow reads → Reading boundary; required-item failure → Failure handling.
- `O-SM`: shared purpose → Purpose; items → Inventory; triggers → Activation rules; dependencies → Dependencies; non-triggers → Do not load; missing-required rule → Missing item behavior.
- `O-AS`: role identity → Identity; activation → Activation; initial categories → Initial reads; start order → Sequence; common route → Shared support; failure/termination → Stop conditions.
- `O-AM`: role/scope → Identity and role; module/shard metadata → Inventory; triggers → Activation triggers; dependencies → Dependencies; non-triggers → Do not load; output/handoff → Output and handoff; no-copy audit rule → Trace expectations; docs-on-demand → Documentation access.

`O-role` fornece somente semântica mínima da role nos slots de identity, responsibility, boundary e handoff, nunca source text. Se uma obligation não couber no mapping fechado, a fase futura aborta; não cria heading, key ou slot. Nenhum body monolítico ou `{{AGENT_BODY}}` é permitido.

## Body source boundary

Fontes permitidas: decisões documentais permitidas de allowlist, path/filename/body-basis, placeholder inventory/syntax, support layer, trace, anti-bloat, matrix e contratos do materialization lab. Uso permitido: body-basis como semântica; inventory como nomes; syntax como forma tokenizada; support decisions como responsibility boundaries; trace decisions como audit-only boundaries; anti-bloat como limite qualitativo; contracts como boundary evidence.

Fontes proibidas: templates existentes; host-installed skills; skill produtiva; conteúdo histórico contaminado; filesystem observation como body authority; Target facts; GitHub facts; cópia literal de kernels, Senior Agent Profiles, `/docs` ou source bodies.

## Template family coverage

| Family | Covered categories | TOML input status | Markdown input status | Generated notice input status | Placeholder placement input status | Escaping input status | Future write meaning | Still blocked |
|---|---|---|---|---|---|---|---|---|
| platform entrypoint templates | GitHub + Codex entrypoints | DEFINED | DEFINED | DEFINED | DEFINED | DEFINED | canonical spec retry | write |
| target-level artifact templates | Codex config + AGENTS | DEFINED | DEFINED | DEFINED | DEFINED | DEFINED | canonical spec retry | write/values |
| shared support templates | Shared START/MANIFEST | N/A | DEFINED | DEFINED | DEFINED | DEFINED | body retry after predecessors | write |
| per-agent support templates | Per-agent START/MANIFEST | N/A | DEFINED | DEFINED | DEFINED | DEFINED | body retry after predecessors | write |
| activation control templates | START + MANIFEST control | N/A | DEFINED | DEFINED | DEFINED | DEFINED | references/triggers only | write/runtime |
| temperature shard templates | manifest inventory/references | N/A | DEFINED as slots, no separate file | DEFINED | DEFINED | DEFINED | no embedded shard body | physical finalization |
| trace support templates | audit-only | N/A | zero files | N/A | N/A/FORBIDDEN — static audit prose only | DEFINED | zero trace templates | schema/materialization |

## Trace support posture

Trace permanece audit-only e zero-file. Nenhum `trace.*` aparece nos 52 bodies; o slot `Trace expectations` contém somente prosa estática no-copy/audit-only. Trace não transporta source body, path real ou report persistido e não é agente, shard default, terceira matriz ou autorização de schema.

## No-copy boundary

Kernels e Senior Agent Profiles são semantic authorities, nunca texto para inclusão. `/docs` é consultado on-demand em fase autorizada, nunca despejado. Templates existentes e bodies históricos não são fontes. Future drafting deve parafrasear obligation por obligation e manter traceability fora do payload.

## Anti-bloat boundary

Uma section contém somente seu purpose; common rules são referenciadas em `_shared`; entrypoints não reimprimem manifests/shards; START não incorpora MANIFEST; MANIFEST não incorpora shard bodies; AGENTS não concatena roles. Repo-wide read, `/docs` inteiro, load-all e source mirror são proibidos. Thresholds numéricos permanecem deferred.

## Target dependency boundary

Tokens `future-target-dependent` podem ser posicionados como slots deferred, mas não resolvidos. Nenhuma observação, capability discovery, mapping, adapter, path real, tooling, docs map, platform fact ou runtime mutation é autorizada. Slot vazio não aceita default inventado.

## Create-vs-mutate decision

Uma write phase futura poderá ser somente create-only e all-or-nothing, após todos os predecessor verdicts exigidos serem `EXCELLENT_PASS` e haver autorização explícita de parent directories. Preexistence de qualquer path aborta antes de leitura. Overwrite, append, merge, repair, rename, normalization, delete-and-recreate e mutation permanecem proibidos.

## Future canonical specification retry criteria

O retry `MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION_DECISION_RETRY_AFTER_CANONICAL_INPUTS` exige que este documento exista e tenha verdict `EXCELLENT_PASS_WITH_CANONICAL_FORMAT_BODY_STRUCTURE_NOTICE_PLACEMENT_AND_ESCAPING_INPUTS_DEFINED_TEMPLATE_WRITE_STILL_BLOCKED`; nenhuma leitura de templates, host skill ou skill produtiva; e inputs TOML entrypoint/config, Markdown families, notice, placement, escaping e body structure definidos. No-copy, anti-bloat, values bloqueados, Target filling bloqueado e zero trace files são invariantes.

## Future gap resolution retry criteria

O retry `MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_BODY_CANONICAL_SOURCE_AND_TOML_PLACEHOLDER_PLACEMENT_GAP_RESOLUTION_DECISION_RETRY_AFTER_CANONICAL_SPECIFICATION` exige `EXCELLENT_PASS` desta canonical inputs decision e `EXCELLENT_PASS` da canonical specification retry; nenhuma leitura de templates, host skills ou skill produtiva; body canonical source e estruturas TOML entrypoint/config, Markdown families, notice, placement e escaping fechados; no-copy/anti-bloat; values e Target filling bloqueados; zero trace files.

## Future body content structure retry criteria

O retry `MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_BODY_CONTENT_STRUCTURE_AND_PLACEHOLDER_POLICY_DECISION_RETRY_AFTER_GAP_RESOLUTION` exige `EXCELLENT_PASS` desta decisão, `EXCELLENT_PASS` da canonical specification retry e `EXCELLENT_PASS` da gap resolution retry; nenhuma leitura de templates, host skills ou skill produtiva; body canonical source, headings/slots/prose, TOML entrypoint/config, notice, placement e escaping fechados; no-copy/anti-bloat; values e Target filling bloqueados; zero trace files.

## Future create-only write readiness criteria

Exige `EXCELLENT_PASS` desta decisão, da canonical specification retry, da gap resolution retry e do body content structure retry; allowlist de 52 ainda válida; 52 paths comprovadamente ausentes sem ler conteúdo; parent creation autorizada; cada body derivável de body-basis + canonical inputs + canonical specification + gap resolution + body structure, sem adivinhação/cópia; nenhuma leitura de templates, host skills ou skill produtiva; nenhum placeholder value ou Target-dependent filling necessário; zero trace files; create-only/all-or-nothing possível.

## Abort criteria for future template write

Abortar se precisar inventar key/table/order/type/comment/escaping TOML; heading/slot/prosa/list/table Markdown; notice ou placement; colocar token em path físico, filename, TOML key/table ou heading; preencher value; inferir Target-dependent value/mapping; usar `{{AGENT_BODY}}`, monolithic/unknown/nested/multiline token; ler template, host skill ou skill produtiva; copiar body/source; mutar existente; criar rendered output, fixture, snapshot, parser, renderer, schema, validator, checker, medidor, materializer ou runner; alterar Aggregator/criar décimo check; acessar Target/GitHub; copiar kernel/profile/docs; alterar 12/24/2; tratar support layer como terceira matriz ou template/família como agente; criar trace file; materializar Target artifact.

## What is decided now

Autoridade positiva; TOML entrypoint e config shapes; keys/tables/order/types/comments/multiline; seis estruturas Markdown; notice fixo/placement/dedup; placement dos seis namespaces; escaping/safety; ligação body-basis→sections/keys/slots; source/no-copy/anti-bloat/trace/create-only boundaries; critérios de retries.

## What remains blocked

52 templates, parent directories, materialization, create/write/mutation, rendered outputs, fixtures, snapshots, placeholder values, Target filling/mapping/adapter, physical support finalization, final trace schema, source mirror, `/docs` dump, checker, validator, medidor, parser, renderer, schema, materializer, runner, threshold enforcement, Target, GitHub, branch, commit, PR, skill produtiva, host skills, Aggregator change e décimo check.

## What cannot be finalized yet

Prosa final e values de cada slot; token-to-value mapping; model/effort/sandbox values; Target paths/capabilities/tooling/docs maps; support physical layout; trace schema; rendered/fixture/snapshot strategy; validation/audit mechanisms; numeric thresholds; dev-only materialization e mutation strategy.

## Forbidden inferences

Não inferir de template, host skill, skill produtiva, Target, GitHub, filesystem, convenção observada, contaminação histórica, flat legacy token, ausência de value, nome de arquivo ou família. Não promover heading/slot em body final nem token em value.

## Allowed future decision paths

Em ordem: canonical specification retry; gap resolution retry; body content structure retry; eventual create-only write; post-write audit. Render/fixture/snapshot, parser/renderer/schema, validation, audit final, thresholds, support physical layout, Target mapping/adapter, trace schema e mutation exigem fases próprias.

## Recommended safe next phase

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION_DECISION_RETRY_AFTER_CANONICAL_INPUTS`

Deve ser macro, fail-closed, documentation-only ou one-document-only, com orquestração explícita, sem ler templates/host skills/skill produtiva e sem criar candidates, parents, outputs ou mecanismos.

## Explicit non-authorization

Esta decisão não autoriza implementação dos 52 templates, materialização, template creation/write/mutation, parent directories, rendered outputs, fixtures, snapshots, values, Target-dependent filling/mapping, support physical finalization, trace schema/files, source mirror, `/docs` dump, persisted report extra, checker, validator, medidor, parser, renderer, schema, materializer, runner, threshold enforcement, numeric thresholds, Target real, GitHub, branch, commit, PR, skill produtiva, host-installed skills, Aggregator change, décimo check ou qualquer retry automático.
