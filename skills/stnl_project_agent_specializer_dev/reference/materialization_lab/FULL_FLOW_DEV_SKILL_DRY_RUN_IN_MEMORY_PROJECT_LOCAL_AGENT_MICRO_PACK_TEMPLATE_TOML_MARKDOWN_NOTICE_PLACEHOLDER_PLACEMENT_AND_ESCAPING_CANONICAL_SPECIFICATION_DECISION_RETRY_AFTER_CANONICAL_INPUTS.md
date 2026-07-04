# Canonical specification decision retry after canonical inputs

## Status

`ACTIVE_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION_RETRY_AFTER_CANONICAL_INPUTS_DECISION_DOCUMENT`

## Phase

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION_DECISION_RETRY_AFTER_CANONICAL_INPUTS`

## Verdict

`EXCELLENT_PASS_WITH_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION_DEFINED_AFTER_CANONICAL_INPUTS_TEMPLATE_WRITE_STILL_BLOCKED`

Postura: `TEMPLATE_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION_DEFINED_AFTER_CANONICAL_INPUTS_TEMPLATE_WRITE_STILL_BLOCKED`.

## Objective

Formalizar, de forma documental, fail-closed, determinística, value-free e no-copy, a canonical specification de TOML, das seis famílias Markdown, do generated notice, do placement e escaping de placeholders e da estrutura de body. A autoridade positiva é a canonical inputs decision aprovada; esta fase não cria novos inputs, templates, bodies finais, rendered outputs ou mecanismos executáveis.

## Scope

O escopo cobre os 52 candidates conceituais já allowlisted: 24 platform entrypoints, 2 artifacts target-level, 26 artifacts de suporte/controle/temperatura e 0 trace template files. A única escrita é este documento na skill dev. A especificação disciplina formatos e boundaries para fases documentais posteriores explicitamente autorizadas; não materializa nenhum candidate e não cria seus diretórios pais.

## Non-goals

Não criar, ler, alterar ou validar templates existentes; não criar os 52 arquivos; não produzir prosa final, values, mapping ou filling Target-dependent; não criar rendered outputs, fixtures, snapshots, schema, parser, renderer, validator, checker, medidor, materializer, runner ou framework; não definir runtime/CLI behavior ou thresholds numéricos; não acessar Target real, GitHub, skill produtiva ou host-installed skills; não alterar o Aggregator.

## Inherited baseline

- Arquitetura: `PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX`.
- Matriz: 12 agentes, 24 artifacts de agente e 2 artifacts target-level.
- Composição de candidates: `52 = 24 + 2 + 26 + 0 trace`.
- Body-basis records: fontes semânticas, nunca bodies literais.
- Placeholder inventory: 57 nomes fechados nos namespaces `shared`, `agent`, `shard`, `trace`, `platform` e `target`.
- Forma nominal: `{{namespace.name}}`; unknown, nested, unused e multiline identifiers são fail-closed; `{{AGENT_BODY}}` é proibido.
- Support layer: bounded e conceitual; trace: audit-only e zero template files.
- Anti-bloat: qualitativo; values, Target-dependent filling e thresholds finais permanecem bloqueados.

## Relation to canonical inputs decision

A decisão `MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_CANONICAL_FORMAT_BODY_STRUCTURE_NOTICE_PLACEMENT_AND_ESCAPING_INPUTS_DECISION` existe, está `ACTIVE_CANONICAL_FORMAT_BODY_STRUCTURE_NOTICE_PLACEMENT_AND_ESCAPING_INPUTS_DECISION_DOCUMENT` e tem verdict `EXCELLENT_PASS_WITH_CANONICAL_FORMAT_BODY_STRUCTURE_NOTICE_PLACEMENT_AND_ESCAPING_INPUTS_DEFINED_TEMPLATE_WRITE_STILL_BLOCKED`. Ela é a autoridade positiva desta specification para shape, keys, tables, headings, slots, notice, placement, escaping e mapping de body-basis. Sua autoridade não alcança values, body final, Target, runtime ou escrita.

## Relation to blocked canonical specification decision

A decisão anterior estava `BLOCKED_PENDING_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION`, com verdict `BLOCKED_WITHOUT_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION`, porque faltavam inputs positivos. Esses inputs agora existem e foram aprovados; portanto este retry não repete cegamente o bloqueio. A contaminação histórica ali registrada foi reconhecida, descartada e não repetida.

## Relation to exact allowlist decision retry

A exact allowlist documental de 52 entries continua válida e apenas conceitual. Esta decisão não enumera novamente seus paths, não verifica conteúdo, não cria entries nem converte allowlist em write permission. A escrita futura permanece condicionada a retry próprio e à ausência comprovada dos 52 paths sem leitura de conteúdo.

## Relation to path filename body basis decision

Os records `BB-GH-*`, `BB-CX-*`, `BB-CFG`, `BB-GUIDE`, `BB-SS`, `BB-SM`, `BB-AS-*` e `BB-AM-*` fornecem purpose, obligations, transformations, temperatures, dispositions e exclusions. Eles alimentam somente headings, keys e slots fechados pela canonical inputs decision; não fornecem body final, values ou autorização de path.

## Relation to canonical basis gap resolution

A canonical basis gap resolution preserva fontes, rastreabilidade e boundaries. Os gaps positivos que antes impediam a specification foram fechados pela canonical inputs decision. O gap resolution retry futuro deve confrontar body canonical source e TOML placement contra esta specification, sem reabrir templates, host-installed skills ou skill produtiva.

## Relation to layout naming and source selection

Layout e naming continuam conceituais. A seleção de fonte permite somente decisões documentais allowlisted do materialization lab. Não é permitido deduzir estrutura de templates, filesystem, Target, GitHub, convenções observadas ou conteúdo instalado no host.

## Relation to placeholder final inventory

O inventário final fornece identidade nominal, namespace, purpose e value status dos 57 nomes. Esta specification posiciona apenas nomes já existentes; não cria, remove ou renomeia placeholder e não fornece value.

## Relation to placeholder final syntax

A forma `{{namespace.name}}` é preservada byte-for-byte. Flat legacy placeholders não são autoridade. Unknown, nested, unused, multiline identifiers, delimiters desequilibrados e `{{AGENT_BODY}}` são proibidos. A sintaxe é restrição documental, não parser, regex ou schema.

## Relation to support layer finalization

`_shared`, START, MANIFEST e micro-packs permanecem responsabilidades bounded. A specification de headings, inventory records e slots não cria estrutura física, não autoriza diretórios e não finaliza o support layer.

## Relation to support-layer template families

Platform entrypoint, target-level artifact, shared support, per-agent support, activation control, temperature shard e trace support são famílias de cobertura, não agentes. Temperature support aparece por referências e activation metadata; trace support permanece audit-only e sem arquivo próprio.

## Relation to trace audit closeout

Trace permanece evidência de transformação fora do payload. Nenhum `trace.*` é permitido nos 52 bodies, nenhum trace body ou schema é definido e o total de trace template files continua zero.

## Relation to anti-bloat posture

Entrypoints ficam pequenos; regras comuns são referenciadas em `_shared`; START faz discovery/activation mínima; MANIFEST mantém inventory/routing; shards e `/docs` são on-demand. Repo-wide read, `/docs` inteiro, source mirror, load-all e body monolítico são proibidos. Nenhum threshold numérico é criado.

## Relation to Aggregator boundary

O Aggregator permanece fechado em exatamente 9 child checks oficiais, na ordem herdada: `check-static.mjs`, `check-source-inventory.mjs`, `check-template-coverage.mjs`, `check-fixture-boundary.mjs`, `check-lazy-load-fixtures.mjs`, `check-project-scenarios.mjs`, `check-render-context.mjs`, `check-dry-run-plan.mjs` e `check-fixture-render-dry-run-integration.mjs`, todos sob `scripts/materialization_lab/`. O wrapper não é décimo check. Esta decisão não cria, registra ou altera checker, mapper, consumer, smoke, auditoria auxiliar ou check oficial.

## Canonical invariants

- Toda specification positiva é documental, determinística, value-free e derivada dos canonical inputs.
- Keys, tables, headings, slots, notice e ordering são fechados; ausência ou conflito aborta fases futuras.
- Placeholders só aparecem em values/slots allowlisted; nunca em paths físicos, filenames, TOML keys/table names ou Markdown headings.
- Kernels, Senior Agent Profiles, `/docs`, templates e skills instaladas nunca viram payload.
- Target real, GitHub, skill produtiva e host-installed skills permanecem fora de escopo.
- Templates, famílias, support packs, `_shared`, shards, trace, notices e placeholders não contam como agentes.
- Nenhuma decisão deste documento é write permission.

## Matrix 12/24/2 preservation

| Elemento | Quantidade | Decisão |
|---|---:|---|
| Agentes canônicos | 12 | Inalterados e na ordem canônica |
| Artifacts de agente | 24 | 12 GitHub Markdown + 12 Codex TOML |
| Artifacts target-level | 2 | Codex config + AGENTS guide; não são agentes |
| Candidates de suporte/controle/temperatura | 26 | Não são agentes nem terceira matriz |
| Trace template files | 0 | Audit-only |

A composição permanece exatamente `52 = 24 + 2 + 26 + 0 trace`. `.sentinel/agents/**` não é terceira matriz e não substitui os 24 entrypoints.

## Canonical specification retry posture

`TEMPLATE_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION_DEFINED_AFTER_CANONICAL_INPUTS_TEMPLATE_WRITE_STILL_BLOCKED`.

A specification está definida para decisões documentais posteriores, mas template creation, template write, materialization, body final, values e Target-dependent filling continuam bloqueados.

## Decision model

`BASIS_READY` indica boundary ou base herdada suficiente; `SPECIFICATION_DEFINED` indica componente positivo fechado por esta decisão; `DEFERRED` indica decisão legitimamente futura; `BLOCKED` indica uso proibido. As classificações são humanas e documentais, não gates executáveis.

## Decision criteria

O pass exige: canonical inputs aprovados; entendimento do bloqueio anterior; higiene sem nova contaminação; definição completa de TOML entrypoint/config, seis famílias Markdown, notice, placement, escaping, format safety e body structure; preservação de no-copy, anti-bloat, trace zero-file, matriz `12/24/2`, composição `52 = 24 + 2 + 26 + 0 trace` e Aggregator de 9 checks; e escrita limitada a este documento. Values, Target filling e write podem permanecer bloqueados porque não são outputs desta fase.

## Decision result

| Criterion | Status | Evidence basis | Decision meaning | Still blocked |
|---|---|---|---|---|
| 1. Canonical inputs decision exists | BASIS_READY | Documento allowlisted verificado | Autoridade positiva disponível | Não |
| 2. Canonical inputs decision has EXCELLENT_PASS verdict | BASIS_READY | Verdict canônico verificado | Inputs aprovados | Não |
| 3. Previous canonical specification blocked result understood | BASIS_READY | Decisão anterior allowlisted | Bloqueio era ausência de inputs | Não |
| 4. Canonical inputs used as positive authority | SPECIFICATION_DEFINED | Relação de autoridade | Specification derivada, sem novos inputs | Escrita |
| 5. Read hygiene preserved | BASIS_READY | Paths explícitos somente | Sem contaminação nova | Não |
| 6. Previous host-installed skill read deviation recorded but not repeated | BASIS_READY | Histórico descartado | Nenhuma host skill lida | Não |
| 7. Previous template contamination history recorded but not repeated | BASIS_READY | Histórico descartado | Nenhum template lido | Não |
| 8. Exact allowlist remains documented | BASIS_READY | Baseline herdado | 52 entries conceituais | Escrita |
| 9. 52 candidate files remain conceptual | BASIS_READY | Scope | Nenhum candidate criado | Sim |
| 10. Body-basis records available | BASIS_READY | Baseline canônico | Semântica, não payload | Body final |
| 11. TOML Codex entrypoint specification defined | SPECIFICATION_DEFINED | Canonical inputs TOML | Shape completo | Values |
| 12. TOML Codex entrypoint document shape defined | SPECIFICATION_DEFINED | Documento sem tables | Shape fechado | Não |
| 13. TOML Codex entrypoint key set defined | SPECIFICATION_DEFINED | Seis keys fechadas | Required/optional fixos | Values opcionais |
| 14. TOML Codex entrypoint key order defined | SPECIFICATION_DEFINED | Ordem 1–6 | Ordem normativa | Não |
| 15. TOML Codex entrypoint value types defined | SPECIFICATION_DEFINED | Basic/multiline basic strings | Tipos normativos | Values |
| 16. TOML Codex entrypoint placeholder placement defined | SPECIFICATION_DEFINED | Slots exatos | Tokens bounded | Filling |
| 17. TOML Codex entrypoint comments policy defined | SPECIFICATION_DEFINED | Notice only | Sem outros comments | Não |
| 18. TOML Codex entrypoint multiline policy defined | SPECIFICATION_DEFINED | `developer_instructions` apenas | Layout fechado | Body final |
| 19. TOML target config specification defined | SPECIFICATION_DEFINED | Canonical inputs config | Registry de 12 tables | Values |
| 20. TOML target config table set defined | SPECIFICATION_DEFINED | 12 IDs literais | Cardinalidade fixa | Não |
| 21. TOML target config table order defined | SPECIFICATION_DEFINED | Ordem da matriz | Ordering normativo | Não |
| 22. TOML target config key set defined | SPECIFICATION_DEFINED | `description`, `config_file` | Duas keys required | Values |
| 23. TOML target config key order defined | SPECIFICATION_DEFINED | Ordem por table | Ordering normativo | Não |
| 24. TOML target config value types defined | SPECIFICATION_DEFINED | Basic strings single-line | Tipos normativos | Values |
| 25. TOML target config placeholder placement defined | SPECIFICATION_DEFINED | Tokens integrais por value | Binding table-scoped | Filling |
| 26. TOML target config comments policy defined | SPECIFICATION_DEFINED | Notice only | Sem comments adicionais | Não |
| 27. Markdown GitHub entrypoint specification defined | SPECIFICATION_DEFINED | Heading/slot mapping fechado | Família definida | Prosa final |
| 28. Markdown Target AGENTS guide specification defined | SPECIFICATION_DEFINED | Heading/slot mapping fechado | Família definida | Prosa final |
| 29. Markdown Shared START specification defined | SPECIFICATION_DEFINED | Heading/slot mapping fechado | Família definida | Prosa final |
| 30. Markdown Shared MANIFEST specification defined | SPECIFICATION_DEFINED | Heading/record mapping fechado | Família definida | Prosa final |
| 31. Markdown Per-agent START specification defined | SPECIFICATION_DEFINED | Heading/slot mapping fechado | Família definida | Prosa final |
| 32. Markdown Per-agent MANIFEST specification defined | SPECIFICATION_DEFINED | Heading/record mapping fechado | Família definida | Prosa final |
| 33. Markdown headings defined | SPECIFICATION_DEFINED | Um H1 + H2 literais | Ordem normativa | Não |
| 34. Markdown slots defined | SPECIFICATION_DEFINED | Slot matrix canônica | Slots granulares | Values/prosa |
| 35. Markdown prose boundary defined | SPECIFICATION_DEFINED | Paráfrase curta/no-copy | Sem body monolítico | Body final |
| 36. Generated notice requirement defined | SPECIFICATION_DEFINED | Notice obrigatório | Exatamente uma vez | Não |
| 37. Generated notice wording defined | SPECIFICATION_DEFINED | Wording literal por formato | Texto fechado | Não |
| 38. Generated notice placement defined | SPECIFICATION_DEFINED | Linha 1 + uma linha vazia | Placement fechado | Não |
| 39. Placeholder namespaces placed | SPECIFICATION_DEFINED | Matriz de seis namespaces | Contextos fechados | Values |
| 40. Placeholder required/optional/deferred/forbidden status defined | SPECIFICATION_DEFINED | Matriz exhaustiva | Status por família | Values |
| 41. Markdown placeholder placement defined | SPECIFICATION_DEFINED | Prosa/list items allowlisted | Estrutura protegida | Filling |
| 42. TOML placeholder placement defined | SPECIFICATION_DEFINED | String values allowlisted | Estrutura protegida | Filling |
| 43. Placeholder values remain blocked | BASIS_READY | Value boundary | Nenhum value preenchido | Sim |
| 44. Target-dependent filling remains blocked | BASIS_READY | Target boundary | Nenhuma resolução | Sim |
| 45. Placeholders excluded from physical paths | BASIS_READY | Invariante de placement | Nenhum token em path | Não |
| 46. Placeholders excluded from filenames | BASIS_READY | Invariante de placement | Nenhum token em filename | Não |
| 47. Placeholders excluded from TOML keys and table names | BASIS_READY | TOML policy | Values only | Não |
| 48. Placeholders excluded from Markdown headings | BASIS_READY | Heading policy | Body slots only | Não |
| 49. Forbidden placeholders preserved | BASIS_READY | Syntax + forbidden contexts | Fail-closed | Não |
| 50. Markdown escaping policy defined | SPECIFICATION_DEFINED | Regras contextuais canônicas | Escaping fechado | Mecanismo |
| 51. TOML escaping policy defined | SPECIFICATION_DEFINED | Basic string rules | Escaping fechado | Mecanismo |
| 52. Format safety policy defined | SPECIFICATION_DEFINED | Pipeline + encoding | Rejeição fechada | Mecanismo |
| 53. Body structure specification defined | SPECIFICATION_DEFINED | `O-*` mappings | Body derivável sem cópia | Body final |
| 54. No-copy policy preserved | BASIS_READY | Source boundary | Sem source mirror | Não |
| 55. Anti-bloat posture preserved | BASIS_READY | Limites qualitativos | Sem body pesado | Thresholds |
| 56. Trace audit-only posture preserved | BASIS_READY | Trace closeout | Não é payload | Schema final |
| 57. Trace template files remain zero | BASIS_READY | Allowlist + coverage | Zero mantido | Não |
| 58. Create-only can remain future default | DEFERRED | Write readiness | Condicionado aos retries | Sim |
| 59. Mutation remains blocked | BASIS_READY | Create-vs-mutate boundary | Sem mutation | Sim |
| 60. No templates read | BASIS_READY | Higiene operacional | Nenhum | Não |
| 61. No host-installed skills read | BASIS_READY | Higiene operacional | Nenhuma | Não |
| 62. No productive skill read | BASIS_READY | Higiene operacional | Nenhuma | Não |
| 63. No templates created | BASIS_READY | Escrita única documental | Nenhum | Não |
| 64. No rendered outputs | BASIS_READY | Scope | Nenhum | Estratégia futura |
| 65. No fixtures | BASIS_READY | Scope | Nenhuma | Estratégia futura |
| 66. No snapshots | BASIS_READY | Scope | Nenhum | Estratégia futura |
| 67. No parser renderer schema | BASIS_READY | Non-goals | Nenhum mecanismo | Decisão futura |
| 68. No validator checker materializer | BASIS_READY | Non-goals | Nenhum mecanismo | Decisão futura |
| 69. Matrix 12/24/2 preserved | BASIS_READY | Matriz canônica | Inalterada | Não |
| 70. Aggregator 9-check boundary preserved | BASIS_READY | Boundary herdado | Sem décimo check | Não |
| 71. Target real remains blocked | BASIS_READY | Hard scope | Não acessado | Sim |
| 72. GitHub remains blocked | BASIS_READY | Hard scope | Não acessado | Sim |
| 73. Current phase writes limited to one document | BASIS_READY | Write permission | Somente este arquivo | Não |

Esta tabela não é schema, checker, validator, template ou gate executável e não autoriza template write.

## Read hygiene and host-skill contamination prevention

O prompt anexado foi lido integralmente. A inspeção inicial de existência e tamanho usou somente paths explícitos e abrangeu 21 documentos allowlisted: canonical inputs decision; canonical specification bloqueada anterior; body canonical source and TOML placement gap resolution; body content structure and placeholder policy; exact allowlist decision retry; path/filename/body-basis decision retry after gap resolution; canonical basis gap resolution; layout/naming/source selection; path/filename/body-basis retry; path/filename/body-basis decision; placeholder final inventory; placeholder final syntax; support-layer finalization; support-layer template families; trace audit closeout; anti-bloat thresholds deferred plan; matrix decision; Targets contract; Rendering and Composition contract; Aggregator contract; e Static Checks. A leitura semântica necessária à decisão ficou restrita ao subconjunto pertinente desses documentos; após a escrita, somente este documento novo também foi lido para validação. Não houve busca ampla, listagem recursiva, leitura/listagem/busca em `reference/templates/**`, leitura de `.agents/skills/**`, `/Users/ajfiumanee/.agents/skills/**`, host-installed skill, skill produtiva, Target ou GitHub. Nenhum `SKILL.md` foi aberto. O histórico de contaminação anterior foi tratado apenas como fato documental; seu conteúdo permanece descartado.

## Specification authority

Esta fase usa canonical inputs como autoridade positiva e não cria novos inputs. Ela formaliza uma specification documental canônica para fases documentais posteriores explicitamente autorizadas. A specification não é template, rendered output, body final, schema executável, parser, renderer, validator ou checker. Ela não autoriza escrita, Target real, GitHub, skill produtiva ou host-installed skills.

## TOML Codex entrypoint canonical specification

Cada um dos 12 Codex agent entrypoints é um documento TOML sem tables. Linha 1: notice TOML canônico; linha 2: vazia; em seguida, keys em ordem canônica. Required: `name`, `description`, `developer_instructions`. Optional: `model`, `model_reasoning_effort`, `sandbox_mode`, omitidas integralmente enquanto não houver value decision explícita. Não há outras keys, arrays, inline tables, dotted keys ou comments além do notice.

`name` e `description` são basic strings single-line. `developer_instructions` é a única multiline basic string e contém exatamente sete tokens: `{{agent.agent_id}}`, `{{agent.canonical_role}}`, `{{agent.activation_policy_reference}}`, `{{agent.start_sequence}}`, `{{shared.routing_relation}}`, `{{shared.global_reading_boundary}}`, `{{agent.stop_conditions}}`, nessa ordem, um por linha lógica, sem prosa, prefixo, sufixo ou linha vazia. A abertura `developer_instructions = """` ocupa uma linha; o primeiro token começa na seguinte; o sétimo é imediatamente seguido pelo delimiter de fechamento na mesma linha. O LF após a abertura não integra o value e não existe LF antes do fechamento.

Nenhum value pode vir de Target real, capability discovery, GitHub, skill produtiva ou host-installed skill. Esta seção não cria `.codex/agents/*.toml`.

## TOML Codex entrypoint key policy

| Ordem | Key | Status | Tipo | Placeholder permitido | Proibido |
|---:|---|---|---|---|---|
| 1 | `name` | required | basic string single-line | somente `{{agent.display_name}}` | outro token; newline |
| 2 | `description` | required | basic string single-line | somente `{{agent.canonical_role}}` | outro token; multiline |
| 3 | `model` | optional | basic string single-line | nenhum; omitir sem value decision | default, blank, inference |
| 4 | `model_reasoning_effort` | optional | basic string single-line | nenhum; omitir sem value decision | default, blank, inference |
| 5 | `sandbox_mode` | optional | basic string single-line | nenhum; omitir sem value decision | default, blank, inference |
| 6 | `developer_instructions` | required | multiline basic string | sete tokens fechados de `agent`/`shared` | token extra; `trace`, `target`, `shard`, `platform`, `AGENT_BODY` |

Keys são literais e nunca placeholders. Omissão de optional key não deixa comentário ou linha substituta.

## TOML Codex entrypoint value policy

`name` contém integralmente `{{agent.display_name}}`; `description`, integralmente `{{agent.canonical_role}}`. Cada single-line string tem exatamente um token e nenhum texto adjacente. `developer_instructions` usa exatamente os sete slots e layout definidos na seção 29. Model, effort e sandbox não aceitam placeholder e permanecem omitidos até decisão de value separada. Blank, default inventado, path observado, capability inferida, Target value e GitHub value são proibidos. Values são escapados conforme a seção 47 apenas em futura resolução autorizada.

## TOML target config canonical specification

O target-level config conceptual candidate contém notice TOML na linha 1, linha 2 vazia, nenhuma top-level key e exatamente 12 tables `agents.<literal-agent-id>` na ordem canônica. Cada table representa registry/identity, não behavior, capability discovery ou runtime mutation. Cada table contém somente `description` e `config_file`, ambas required basic strings single-line, nessa ordem. Não há optional keys, arrays, inline tables, nested subtables ou key dinâmica. Esta seção não cria `.codex/config.toml`.

## TOML target config key and table policy

Ordem literal das tables:

1. `agents.orchestrator`
2. `agents.planner`
3. `agents."validation-eval-designer"`
4. `agents."execution-package-designer"`
5. `agents.designer`
6. `agents."coder-frontend"`
7. `agents."coder-backend"`
8. `agents."coder-ios"`
9. `agents."validation-runner"`
10. `agents.reviewer`
11. `agents.finalizer`
12. `agents.resync`

Segments com hífen são quoted; os demais permanecem literais conforme listado. Em cada table, key 1 é `description`; key 2 é `config_file`. Cada ocorrência é scoped pelo literal agent ID da própria table. Uma futura resolução deve receber o par `(literal table agent ID, placeholder)` e abortar se não houver binding único; não existe fallback, carry-over ou scope global.

## TOML target config value policy

`description` aceita integralmente e somente `{{agent.canonical_role}}`. `config_file` aceita integralmente e somente `{{target.entrypoint_path}}`, deferred e sem filling. O token path-valued é conteúdo textual da string, não path físico do template/artifact. Nenhum outro token ou namespace é permitido. Blank, default inventado, filesystem observation, capability inference e Target value são proibidos.

## TOML comments policy

Somente o generated notice na linha 1 é permitido como comentário. Não há comments inline, entre keys/tables, com placeholders ou derivados de sources. `#` dentro de string é conteúdo literal; fora de string só pode iniciar o notice canônico. Comments nunca transportam body, binding, Target fact ou instrução dinâmica.

## Markdown family canonical specification

| Família | Required headings na ordem | Optional headings | Lista/tabela | Purpose e boundary |
|---|---|---|---|---|
| GitHub platform entrypoint | `# Agent`; `## Mission`; `## Activation`; `## Responsibilities`; `## Boundaries`; `## Routing and support`; `## Completion` | nenhum | listas curtas; tabela proibida | `O-ENTRY + O-role`; shared por referência; sem takeover |
| Target-level AGENTS guide | `# Agent system`; `## Purpose`; `## Canonical agents`; `## Routing`; `## Shared support`; `## Selective loading`; `## Documentation access`; `## Boundaries` | nenhum | 12 bullets literais ordenados; tabela proibida | cross-cutting; sem role bodies |
| Shared START | `# Shared start`; `## Purpose`; `## Initial sequence`; `## Shared references`; `## Reading boundary`; `## Failure handling` | nenhum | ordered list só na sequência; tabela proibida | discovery mínimo e fail-closed |
| Shared MANIFEST | `# Shared manifest`; `## Purpose`; `## Inventory`; `## Activation rules`; `## Dependencies`; `## Do not load`; `## Missing item behavior` | nenhum | records rotulados; tabela proibida | inventory/routing metadata |
| Per-agent START | `# Agent start`; `## Identity`; `## Activation`; `## Initial reads`; `## Sequence`; `## Shared support`; `## Stop conditions` | nenhum | ordered list só na sequência; tabela proibida | exact-role activation; sem body |
| Per-agent MANIFEST | `# Agent manifest`; `## Identity and role`; `## Inventory`; `## Activation triggers`; `## Dependencies`; `## Do not load`; `## Output and handoff`; `## Trace expectations`; `## Documentation access` | nenhum | records rotulados; tabela proibida | inventory/routing; trace audit-only |

Em todas as famílias, notice Markdown ocupa a linha 1, há exatamente uma linha vazia e então o H1. Listas não são nested. Prosa final e rendered output não são criados.

## Markdown heading policy

Cada família contém exatamente um H1 e os H2 listados na seção 36, na ordem normativa. Não há H3, heading opcional, heading vazio, heading dinâmico ou heading com placeholder. Uma fase futura aborta se precisar adicionar, remover, renomear ou reordenar heading.

## Markdown slot policy

- GitHub entrypoint: identity/role em Mission; activation policy em Activation; obligations em Responsibilities; exclusions em Boundaries; support/shared relations em Routing and support; stop/handoff em Completion.
- Target AGENTS: em Canonical agents, exatamente 12 bullets `- <literal-agent-id>` na ordem canônica, sem descrição ou token; routing, shared support, selective loading, docs-on-demand e boundaries nos headings homônimos.
- Shared START: shared purpose, initial sequence, shared references, global reading boundary e fail-closed behavior.
- Shared MANIFEST: Inventory usa bullet single-line com labels `Item:`, `Purpose:`, `Trigger:`, `Dependencies:`, `Do not load when:`, nessa ordem, separados por `; ` e terminado por `.`; as demais seções referenciam os mesmos IDs.
- Per-agent START: agent identity/role, activation reference, initial reads, start sequence, shared relations e stop conditions.
- Per-agent MANIFEST: Inventory usa bullet single-line com labels `Module:`, `Temperature:`, `Purpose:`, `Trigger:`, `Dependencies:`, `Do not load when:`, nessa ordem, separados por `; ` e terminado por `.`; demais seções referenciam os mesmos module IDs; Trace expectations usa frase estática no-copy, sem `trace.*`.

Cada slot contém frase curta ou itens atômicos. Sequências usam `1.`; demais listas usam `-`. Nenhum slot aceita body monolítico.

## Markdown prose boundary

Prosa final permanece bloqueada. A transformação futura deve parafrasear cada obligation em imperativo curto, uma responsabilidade por item; exclusions viram proibições explícitas; references continuam references; `/docs` é on-demand. Tabelas nos seis bodies, nested lists, citações extensas, boilerplate, source extracts, HTML ativo, code fences, source mirror e body monolítico são proibidos.

## Generated notice policy

O notice é obrigatório, estático, aparece exatamente uma vez e não é renderizado nesta fase.

- Markdown, linha 1: `<!-- Generated file. Do not edit directly. -->`
- TOML, linha 1: `# Generated file. Do not edit directly.`
- Após o notice há exatamente uma linha vazia.
- Em Markdown, o próximo conteúdo é o H1; em TOML, a primeira key ou table.
- O notice não se repete por section/table, não ocupa slot e não contém placeholder, Target value ou source boilerplate.
- O notice não autoriza leitura de template ou host-installed skill e não é rendered output.

## Placeholder placement policy

| Namespace | Allowed families | Allowed Markdown placement | Allowed TOML placement | Forbidden placement | Required optional deferred or forbidden | Value status | Escaping context | Target dependency handling | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `shared` | AGENTS, Shared START/MANIFEST; referência em GitHub/per-agent | Purpose, Routing, Shared support, Reading boundary, Inventory | entrypoint: `shared.routing_relation`, `shared.global_reading_boundary` | heading, notice, key/table/path físico | conforme matriz | unfilled; nominal | plain text/list; TOML string | members target-dependent deferred | common rule por referência |
| `agent` | GitHub e per-agent START/MANIFEST | Mission, Identity, Activation, Sequence, Completion | entrypoint slots fechados; config `description` | AGENTS placeholder, heading, key/table/path físico | conforme matriz | unfilled; nominal | plain text/list; TOML string | derived somente | AGENTS usa IDs literais |
| `shard` | AGENTS Selective loading; Shared START; manifests; Per-agent START | Inventory, Activation, Dependencies, Do not load | nenhum | entrypoint/config/heading/notice | conforme matriz | unfilled; nominal | list item | reads target-dependent deferred | nunca embed shard body |
| `trace` | nenhuma das 52 entries | nenhum; Trace expectations usa prosa estática | nenhum | qualquer Markdown/TOML/template trace | DEFERRED audit-only; placement FORBIDDEN | unfilled; nominal | N/A | source facts deferred | zero trace files |
| `platform` | GitHub Mission; AGENTS Purpose | metadata de platform sem discovery | nenhum | headings, keys/tables, support bodies | conforme matriz | unfilled; derived only | plain text | tooling/capability proibidos | sem discovery |
| `target` | AGENTS Documentation access; target config | docs reference deferred | config `config_file` somente | headings, keys/table names, notice, physical paths | DEFERRED | unfilled; future-target-dependent | plain text; basic string | nenhuma resolução | namespace não autoriza Target |

Não se preenchem values, não se criam/removem/renomeiam placeholders e `{{AGENT_BODY}}` permanece proibido.

## Placeholder namespace placement matrix

| Family or format | shared | agent | shard | trace | platform | target |
|---|---|---|---|---|---|---|
| GitHub entrypoint | OPTIONAL — Routing and support | REQUIRED — Mission/Activation/Completion | FORBIDDEN — sem shard | FORBIDDEN — audit-only | REQUIRED — Mission | FORBIDDEN — sem Target |
| Target AGENTS | REQUIRED — Purpose/Routing/Shared support/Documentation access | FORBIDDEN — IDs literais | OPTIONAL — Selective loading | FORBIDDEN — audit-only | OPTIONAL — Purpose | DEFERRED — Documentation access |
| Shared START | REQUIRED — Purpose/Sequence/References/Boundary/Failure | FORBIDDEN — shared only | OPTIONAL — referência em Initial sequence | FORBIDDEN — audit-only | FORBIDDEN — sem platform | FORBIDDEN — sem Target |
| Shared MANIFEST | REQUIRED — Purpose/Inventory/Dependencies/Missing | FORBIDDEN — shared only | OPTIONAL — Inventory/Activation/Do not load | FORBIDDEN — audit-only | FORBIDDEN — sem platform | FORBIDDEN — sem Target |
| Per-agent START | OPTIONAL — Shared support | REQUIRED — Identity/Activation/Reads/Sequence/Stop | OPTIONAL — referência em Activation | FORBIDDEN — audit-only | FORBIDDEN — sem platform | FORBIDDEN — sem Target |
| Per-agent MANIFEST | OPTIONAL — Dependencies/Documentation access | REQUIRED — Identity/Output and handoff | REQUIRED — Inventory/Triggers/Dependencies/Do not load | FORBIDDEN — frase estática | FORBIDDEN — sem platform | DEFERRED — Documentation access |
| Codex entrypoint TOML | REQUIRED — 2 slots em developer instructions | REQUIRED — name/description + 5 slots; 7 ocorrências, 6 nomes únicos | FORBIDDEN — sem shard | FORBIDDEN — sem trace | FORBIDDEN — sem platform | FORBIDDEN — sem Target |
| Codex target config TOML | FORBIDDEN — sem shared | REQUIRED — description scoped pela table | FORBIDDEN — sem shard | FORBIDDEN — sem trace | FORBIDDEN — sem platform | DEFERRED — config_file scoped pela table |

`REQUIRED`, `OPTIONAL`, `DEFERRED` e `FORBIDDEN` são exhaustivos. OPTIONAL pode ser omitido sem linha vazia; DEFERRED preserva token sem resolution; FORBIDDEN aborta. Namespace não concede placement automático a nome incompatível com o slot.

## Markdown placeholder placement

Tokens só podem ocorrer em plain prose ou list items nos slots definidos. São proibidos em headings, link destinations, image destinations, HTML tags/comments, code fences, YAML/front matter, table cells e structural list markers. Token não substitui section inteira. Um item pode conter tokens granulares relacionados. Path-valued token pode aparecer como conteúdo textual, nunca como path ou filename físico.

## TOML placeholder placement

Tokens só podem ocorrer dentro de string values explicitamente allowlisted. São proibidos em bare values, keys, dotted keys, table names, comments, delimiters e notice. Single-line value com token contém exatamente um token ocupando integralmente a string. `developer_instructions` contém exatamente os sete tokens, na ordem e layout da seção 29. Tokens não podem produzir syntax TOML antes da resolução.

## Placeholder escaping policy

Delimiters `{{` e `}}` de token reconhecido são preservados byte-for-byte; não recebem backslash ou HTML encoding. Escaping aplica-se somente ao value autorizado ao redor/na resolução, nunca ao identifier. Token partido por newline, com whitespace inserido, nested, unknown, unused, delimiter desequilibrado ou identifier multiline aborta. Não existe coercion, default ou resolution nesta fase.

## Forbidden placeholder contexts

São proibidos: paths e filenames físicos; Markdown headings; TOML keys, dotted keys e table names; notices; comments; link/image destinations; HTML; code fences; YAML/front matter; table cells; structural list markers; raw/bare TOML values; unknown, nested, unused ou multiline identifiers; `{{AGENT_BODY}}`; placeholder monolítico; value final; unsafe raw interpolation.

## Format safety and escaping policy

- Pipeline futuro obrigatório: validar identifier, contexto e binding único; obter value autorizado; validar caracteres e cardinalidade single-line; escapar o value; inserir no slot; serializar delimiters; validar estrutura inalterada. Nenhuma etapa pode ser omitida ou reordenada.
- Encoding: UTF-8 sem BOM; newline estrutural LF. CR, NUL, controles C0 exceto TAB e trailing space/tab em value são rejeitados, nunca normalizados silenciosamente.
- Markdown plain text/list item: primeiro, cada backslash raw vira dois; depois, prefixar com backslash cada backtick, `*`, `_`, `[`, `]`, `<`, `>` e `|`. Se o primeiro caractere for `#`, `>`, `-` ou `+`, prefixá-lo com backslash; se começar por dígitos seguidos de `.`, escapar o ponto. HTML ativo, code fence e value multiline são proibidos.
- TOML single-line basic string: primeiro, cada backslash U+005C vira dois; depois, cada aspas dupla raw U+0022 vira backslash + aspas dupla; TAB vira backslash + `t`; demais controles abortam. `#` dentro da string permanece literal. Delimiters existentes não são alterados.
- TOML multiline basic string: somente `developer_instructions`; cada slot resolvido é single-line e recebe a mesma ordem de escaping de backslash, aspas e TAB. Os seis LFs vêm da composição, não dos values; aspas escapadas não fecham delimiter.
- Comments são somente notices estáticos. Tokens não resolvidos permanecem intactos. Nested placeholder, multiline identifier, raw unsafe interpolation e normalização silenciosa são proibidos.

Esta policy é specification documental; nenhum escaper, renderer, parser, schema ou validator é criado.

## Body structure specification

Body-basis purpose seleciona família; obligation seleciona exatamente um heading/key/slot; transformation exige paráfrase curta; exclusion vira forbidden content; temperature define reference/activation, nunca embedded shard body; trace ID mantém auditabilidade fora do body; disposition decide shared versus role-specific.

| Record | Mapping canônico |
|---|---|
| `O-ENTRY` | GitHub: identity/target surface → Mission; activation → Activation; obligations → Responsibilities; exclusions → Boundaries; support route → Routing and support; stop/handoff → Completion. Codex: sete slots fechados. |
| `O-CFG` | registry identity → table literal; role summary → `description`; entrypoint relation → `config_file`; sem role behavior. |
| `O-GUIDE` | scope → Purpose; 12 roles → Canonical agents; route → Routing; common rules → Shared support; temperature → Selective loading; docs-on-demand → Documentation access; exclusions/fail-closed → Boundaries. |
| `O-SS` | responsibility → Purpose; discovery order → Initial sequence; common routes → Shared references; narrow reads → Reading boundary; required-item failure → Failure handling. |
| `O-SM` | purpose → Purpose; items → Inventory; triggers → Activation rules; dependencies → Dependencies; non-triggers → Do not load; missing-required → Missing item behavior. |
| `O-AS` | role identity → Identity; activation → Activation; initial categories → Initial reads; start order → Sequence; common route → Shared support; failure/termination → Stop conditions. |
| `O-AM` | role/scope → Identity and role; module metadata → Inventory; triggers → Activation triggers; dependencies → Dependencies; non-triggers → Do not load; output/handoff → Output and handoff; no-copy audit → Trace expectations; docs-on-demand → Documentation access. |

`O-role` fornece somente semântica mínima de identity, responsibility, boundary e handoff, nunca source text. Obligation sem encaixe no mapping fechado aborta; não cria heading/key/slot. Body monolítico e `{{AGENT_BODY}}` são proibidos.

## Body source boundary

Fontes documentais permitidas: canonical inputs como fonte estrutural positiva; body-basis como semântica; placeholder inventory como nomes; placeholder syntax como forma tokenizada; support-layer decisions como responsibility boundaries; trace decisions como audit-only boundaries; anti-bloat como limites qualitativos; matrix, allowlist e contratos do materialization lab como boundary evidence.

Fontes proibidas: templates existentes; host-installed skills; skill produtiva; conteúdo histórico contaminado; filesystem observation como body authority; Target facts; GitHub facts; cópia literal de kernels, Senior Agent Profiles, `/docs` ou source bodies. Nenhuma fonte permitida isoladamente autoriza body final ou write.

## Template family coverage

| Family | Covered categories | TOML specification status | Markdown specification status | Generated notice status | Placeholder placement status | Escaping status | Future write meaning | Still blocked |
|---|---|---|---|---|---|---|---|---|
| platform entrypoint templates | GitHub + Codex entrypoints | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | eligible para retries documentais | write/values |
| target-level artifact templates | Codex config + AGENTS | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | eligible para retries documentais | write/Target values |
| shared support templates | Shared START/MANIFEST | N/A | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | body retry após predecessores | write/body |
| per-agent support templates | Per-agent START/MANIFEST | N/A | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | body retry após predecessores | write/body |
| activation control templates | START + MANIFEST control | N/A | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | references/triggers only | write/runtime |
| temperature shard templates | manifest inventory/references | N/A | SPECIFICATION_DEFINED como slots; sem separate trace file | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | SPECIFICATION_DEFINED | sem embedded shard body | physical finalization |
| trace support templates | audit-only | N/A | zero files | N/A | FORBIDDEN; frase estática apenas | SPECIFICATION_DEFINED | zero trace templates | schema/materialization |

## Trace support posture

Trace é audit-only, zero-file, não default behavior e não payload. Nenhum `trace.*` aparece nos 52 bodies; `Trace expectations` usa somente prosa estática no-copy/audit-only. Trace não é agente, third matrix, shard default, source mirror, report persistido ou autorização de schema.

## No-copy boundary

Kernels e Senior Agent Profiles são semantic authorities, nunca texto para inclusão. `/docs` é consultado sob demanda em fase autorizada, nunca despejado. Templates existentes e bodies históricos não são fontes. Future drafting deve parafrasear obligation por obligation e manter traceability fora do payload.

## Anti-bloat boundary

Cada section contém somente seu purpose; common rules são referenciadas em `_shared`; entrypoints não reimprimem manifests/shards; START não incorpora MANIFEST; MANIFEST não incorpora shard bodies; AGENTS não concatena roles. Repo-wide read, `/docs` inteiro, load-all, source mirror e agentes pesados são proibidos. Thresholds numéricos e enforcement permanecem deferred.

## Target dependency boundary

Tokens future-target-dependent podem ser posicionados somente nos slots deferred definidos, sem resolução. Nenhuma observation, capability discovery, mapping, adapter, path real, tooling fact, docs map, platform fact ou runtime mutation é autorizada. Slot sem value não recebe blank ou default inventado.

## Create-vs-mutate decision

Uma fase futura poderá ser somente create-only e all-or-nothing após todos os predecessor verdicts exigidos serem `EXCELLENT_PASS` e após autorização explícita de parent directories. Preexistência de qualquer path aborta antes de leitura. Overwrite, append, merge, repair, rename, normalization, delete-and-recreate e mutation permanecem bloqueados.

## Future gap resolution retry criteria

O retry `MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_BODY_CANONICAL_SOURCE_AND_TOML_PLACEHOLDER_PLACEMENT_GAP_RESOLUTION_DECISION_RETRY_AFTER_CANONICAL_SPECIFICATION` só poderá prosseguir se:

- este documento existir e tiver o verdict `EXCELLENT_PASS_WITH_TOML_MARKDOWN_NOTICE_PLACEHOLDER_PLACEMENT_AND_ESCAPING_CANONICAL_SPECIFICATION_DEFINED_AFTER_CANONICAL_INPUTS_TEMPLATE_WRITE_STILL_BLOCKED`;
- não houver leitura de templates, host-installed skills ou skill produtiva;
- body canonical source puder ser avaliado contra canonical inputs e esta specification;
- TOML entrypoint/config, Markdown families, notice, placement e escaping permanecerem definidos;
- no-copy, anti-bloat, values bloqueados, Target filling bloqueado e zero trace files forem preservados.

Esse retry continua documentation-only; não cria candidates, parents, outputs ou mecanismos.

## Future body content structure retry criteria

O retry `MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_BODY_CONTENT_STRUCTURE_AND_PLACEHOLDER_POLICY_DECISION_RETRY_AFTER_GAP_RESOLUTION` exige:

- canonical inputs decision com `EXCELLENT_PASS`;
- esta canonical specification retry com `EXCELLENT_PASS`;
- gap resolution retry com `EXCELLENT_PASS`;
- nenhuma leitura de templates, host-installed skills ou skill produtiva;
- body canonical source, headings/slots/prose boundary, TOML entrypoint/config, notice, placement e escaping definidos;
- no-copy, anti-bloat, values bloqueados, Target filling bloqueado e zero trace files preservados.

## Future create-only write readiness criteria

Uma futura write phase só poderá prosseguir se:

- canonical inputs, esta canonical specification, gap resolution retry e body content structure retry tiverem `EXCELLENT_PASS`;
- exact allowlist de 52 entries continuar válida e os 52 paths estiverem ausentes sem leitura de conteúdo;
- parent directory creation estiver explicitamente autorizada;
- cada body for derivável de body-basis + canonical inputs + canonical specification + gap resolution + body structure policy, sem adivinhação;
- nenhum body exigir template, host skill, skill produtiva, cópia literal, placeholder value ou Target-dependent filling;
- zero trace template files permanecerem exigidos;
- create-only/all-or-nothing continuar possível.

Nenhuma dessas condições autoriza escrita agora.

## Abort criteria for future template write

Abortar se precisar: inventar TOML key, table, ordering, type, comment, multiline ou escaping; inventar Markdown heading, order, slot, prose, list ou table; inventar notice ou placement; usar placeholder em path, filename, TOML key/table ou heading; preencher value; inferir Target-dependent value/mapping; usar `{{AGENT_BODY}}` ou token monolítico/unknown/nested/multiline; ler template, host skill ou skill produtiva; copiar/reusar source body; mutar ou sobrescrever existente; criar rendered output, fixture, snapshot, parser, renderer, schema, validator, checker, medidor, materializer ou runner; alterar Aggregator/criar décimo check; acessar Target/GitHub; copiar kernel/profile/`/docs`; alterar `12/24/2`; tratar support layer como terceira matriz ou template como agente; criar trace file; materializar Target artifact; encontrar path preexistente; ou não garantir create-only/all-or-nothing.

## What is decided now

Estão definidos: autoridade positiva; TOML entrypoint/config shapes, keys/tables/order/types/comments/multiline; seis estruturas Markdown; notice literal/placement/dedup; placement dos seis namespaces; escaping e format safety; body-basis→sections/keys/slots; source/no-copy/anti-bloat/trace/create-only boundaries; coverage e critérios de retries. Esta decisão substitui o bloqueio anterior somente quanto à existência da canonical specification.

## What remains blocked

Permanecem bloqueados: implementação dos 52 templates; parent directories; materialization; template creation/write/mutation; leitura de templates; rendered outputs; fixtures; snapshots; support-layer physical finalization; placeholder values; Target filling/mapping/adapter; final trace schema; source mirror; `/docs` dump; persisted report extra; checker; validator; medidor; parser; renderer; schema; materializer; runner; threshold enforcement; thresholds numéricos; Target; GitHub; branch; commit; PR; skill produtiva; host-installed skills; Aggregator change e décimo check.

## What cannot be finalized yet

Continuam abertos para fases separadas: gap resolution retry; body content structure retry; prosa e values finais; actual template write; post-write audit dos 52 arquivos; render/fixture/snapshot strategy; parser/renderer/schema decision; validation strategy; audit approach finalization; numeric anti-bloat thresholds; physical support-layer structure; Target mapping/adapter; trace final schema, se necessário; dev-only materialization; e mutation de dev templates, se futuramente autorizada.

## Forbidden inferences

Não inferir de template, host skill, skill produtiva, Target, GitHub, filesystem, convenção observada, contaminação histórica, flat legacy token, ausência de value, nome de arquivo/família ou body-basis literal. Não promover heading/slot a body final, namespace a placement automático, token a value, specification a schema ou allowlist a write permission.

## Allowed future decision paths

Ordem permitida: gap resolution retry após esta specification; body content structure retry após gap resolution; eventual create-only write; post-write audit. Render/fixture/snapshot, parser/renderer/schema, validation, audit final, thresholds, support physical layout, Target mapping/adapter, trace schema e mutation exigem decisões próprias e explícitas.

## Recommended safe next phase

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_BODY_CANONICAL_SOURCE_AND_TOML_PLACEHOLDER_PLACEMENT_GAP_RESOLUTION_DECISION_RETRY_AFTER_CANONICAL_SPECIFICATION`

Deve ser macro, fail-closed, documentation-only ou one-document-only, com orquestração explícita, sem ler templates, host-installed skills ou skill produtiva; sem criar os 52 files/parents, outputs ou mecanismos; e sem acessar Target real ou GitHub.

## Explicit non-authorization

Esta decisão não autoriza implementação dos 52 templates, materialização, template creation/write/mutation, parent directories, leitura de templates, rendered outputs, fixtures, snapshots, values finais, Target-dependent filling/mapping, support-layer physical finalization, trace schema/files, source mirror, `/docs` dump, persisted report extra, checker, validator, medidor, parser, renderer, schema, materializer, runner, threshold enforcement, thresholds numéricos, Target real, GitHub, branch, commit, PR, skill produtiva, host-installed skills, Aggregator change, décimo check ou qualquer retry automático. Exatamente este documento novo é o único output persistido desta fase.
