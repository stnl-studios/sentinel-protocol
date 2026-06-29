# Project-local agent micro-pack template write authorization decision

## 1. Status

`ACTIVE_TEMPLATE_WRITE_AUTHORIZATION_DECISION_DOCUMENT`

Este documento é dev-only, decision-only e authorization-only. Ele concede
somente autorização documental para abrir uma fase futura separada de escrita
de templates sob allowlist exata. Nenhum template é escrito ou alterado nesta
fase.

## 2. Phase

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_WRITE_AUTHORIZATION_DECISION`

## 3. Verdict

`PASS_WITH_SEPARATE_TEMPLATE_WRITE_PHASE_AUTHORIZED`

O veredito reconhece base suficiente para abrir uma fase futura estreita,
dev-only e fail-closed. Ele não constitui template-write approval atual nem
autoriza paths, bodies, inventory, values, outputs ou mecanismos por
transitividade.

## 4. Objective

Decidir se a base documental da arquitetura
`PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX` permite abrir uma fase futura separada
de template-write dentro da skill dev, com arquivos e paths explicitamente
allowlisted, sem Target real, GitHub, skill produtiva, rendered outputs,
materialização ou alteração do Aggregator.

## 5. Scope

O escopo desta decisão limita-se a:

- autorização documental de uma fase futura separada;
- critérios que deverão governar sua allowlist;
- distinção entre criação, leitura e mutação de templates dev;
- sete famílias candidatas e dez categorias conceituais de artifacts;
- uso nominal futuro dos 57 placeholders em seis namespaces;
- boundaries de no-copy, traceability, anti-bloat, Target e validação;
- abort criteria obrigatórios antes de qualquer escrita futura.

Esta fase cria somente este documento dentro da skill dev.

## 6. Non-goals

Não são objetivos desta decisão:

- criar, ler, copiar, reutilizar, comparar ou alterar templates;
- definir paths, bodies ou inventory executável finais;
- preencher ou resolver placeholders;
- criar outputs, fixtures, snapshots, reports, parser, renderer, schema,
  validator, checker, medidor, materializer ou Target adapter;
- finalizar support layer, trace, audit approach ou thresholds numéricos;
- implementar runtime, CLI, validação, materialização ou Target mapping;
- acessar Target real, GitHub ou skill produtiva;
- alterar a matriz, o Aggregator ou seus child checks.

## 7. Inherited baseline

A base canônica herdada registra:

- implementation plan ativo com `PASS_WITH_TEMPLATE_WRITE_BLOCKED`;
- posture
  `TEMPLATE_CREATION_IMPLEMENTATION_PLAN_DOCUMENTATION_ONLY_TEMPLATE_WRITE_BLOCKED`;
- autorização anterior com
  `PASS_WITH_SEPARATE_TEMPLATE_CREATION_PHASE_AUTHORIZED`;
- readiness com `PASS_WITH_TEMPLATE_CREATION_BLOCKED`;
- 57 placeholders canônicos sem values em seis namespaces;
- Target-dependent filling e mapping bloqueados;
- support layer com `PASS_WITH_IMPLEMENTATION_BLOCKED`;
- famílias de suporte conceptual-only e creation-blocked;
- gates revisados com criação bloqueada;
- trace closeout `CLOSED_WITH_EXCELLENT_PASS`;
- audit approach e thresholds numéricos deferred;
- matriz `12/24/2` e Aggregator fechado em nove child checks.

## 8. Relation to template creation implementation plan

O implementation plan é `ACTIVE_IMPLEMENTATION_PLAN_DOCUMENT` e conclui
`PASS_WITH_TEMPLATE_WRITE_BLOCKED`. Ele delimita sete famílias candidatas, dez
categorias conceituais de artifacts, seis namespaces, sete categorias de
revisão e abort criteria, sem autorizar escrita.

Esta decisão é o próximo passo documental recomendado pelo plano. Ela não
reabre nem amplia o plano: permite somente que outra fase, explicitamente
allowlisted, tente escrever templates sem inventar a base ausente.

## 9. Relation to template creation authorization

A autorização anterior concedeu somente a abertura do implementation plan e
não concedeu template-write. Seu resultado
`PASS_WITH_SEPARATE_TEMPLATE_CREATION_PHASE_AUTHORIZED` fornece continuidade
documental, não autorização operacional transitiva.

## 10. Relation to template readiness

O estado `PASS_WITH_TEMPLATE_CREATION_BLOCKED` permanece correto para a fase
atual. Readiness significa que invariantes e blockers estão delimitados; não
significa que files, paths, bodies, outputs ou mecanismos estejam prontos.

## 11. Relation to placeholder final inventory

O inventário fechado contém exatamente 57 placeholders canônicos:

- `shared`: 9;
- `agent`: 11;
- `shard`: 13;
- `trace`: 10;
- `platform`: 6;
- `target`: 8.

Nenhum possui value. O inventário é contrato nominal documental, não template
inventory, schema ou input executável. Activation continua sendo scope, não
sétimo namespace, e `{{AGENT_BODY}}` continua proibido.

## 12. Relation to support layer finalization

O estado `PASS_WITH_IMPLEMENTATION_BLOCKED` permite usar `_shared`, suporte por
agente, activation, shards e trace como responsabilidades conceituais. Ele não
define estrutura física, arquivos, diretórios, templates ou materialização.

## 13. Relation to support-layer template families

Shared support, per-agent support, activation, temperature shards e trace
permanecem famílias conceptual-only. Platform entrypoints e target-level
artifacts são famílias candidatas adicionais derivadas da matriz apenas para
decisão futura. Nenhuma família é arquivo, path, body ou inventory final.

## 14. Relation to template creation gates

Os gates permanecem `TEMPLATE_CREATION_GATES_REVIEWED_BUT_CREATION_BLOCKED` na
fase atual. As pendências históricas sobre inventário nominal foram delimitadas
posteriormente, mas paths, bodies, outputs, mecanismos, Target e autorização
operacional continuam bloqueados.

Os gates são boundaries qualitativos e abort criteria; não são checker,
validator, schema ou enforcement.

## 15. Relation to trace audit closeout

O closeout `CLOSED_WITH_EXCELLENT_PASS` confirma auditabilidade documental.
Trace permanece audit-only, conceptual-only, non-agent e sem estrutura, path,
inventory, schema ou persisted report finais.

## 16. Relation to audit approach deferred

O audit approach final permanece
`AUDIT_APPROACH_DEFERRED_WITH_CONCEPTUAL_DIMENSIONS_ONLY`. Revisões documentais
podem ser exigidas futuramente, mas nenhum método, engine, relatório, métrica,
checker, validator ou enforcement é autorizado.

## 17. Relation to anti-bloat thresholds deferred

A posture `MIXED_QUALITATIVE_WITH_DEFERRED_NUMERIC` permanece vigente.
Entrypoints pequenos, lazy loading, centralização, conteúdo focado, referências
e no-copy são normativos. Números, budgets, ratios, fórmulas, métricas e
threshold enforcement permanecem deferred.

## 18. Canonical invariants

Permanecem invariantes:

- direção `PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX`;
- agentes leves e entrypoints pequenos;
- regras comuns centralizadas conceitualmente em `_shared`;
- consumo de `/docs` sob demanda;
- kernels e Senior Agent Profiles como fontes, não payload literal;
- shards preparados para o projeto, nunca cópias integrais;
- behavior parity por referência, provenance e transformação rastreável;
- `always` mínimo; `hot`, `warm` e `cold` sob activation; trace audit-only;
- skill imutável por projeto;
- proibição de source mirror, `/docs` dump e `{{AGENT_BODY}}`;
- nenhum Target real, GitHub ou skill produtiva nesta trilha.

## 19. Matrix 12/24/2 preservation

A matriz permanece exatamente com os 12 agentes canônicos:

1. `orchestrator`
2. `planner`
3. `validation-eval-designer`
4. `execution-package-designer`
5. `designer`
6. `coder-frontend`
7. `coder-backend`
8. `coder-ios`
9. `validation-runner`
10. `reviewer`
11. `finalizer`
12. `resync`

Permanecem 24 artifacts canônicos de agente: 12 shapes conceituais
`.github/agents/<agent>.agent.md` e 12 shapes conceituais
`.codex/agents/<agent>.toml`. Permanecem dois artifacts target-level:
`.codex/config.toml` e `AGENTS.md`.

Artifacts target-level, templates, famílias, placeholders, inventories,
support packs, `_shared`, per-agent micro-packs, shards e trace não contam como
agentes. `.sentinel/agents/**` não é terceira matriz nem substitui as duas
superfícies de artifacts de agente.

## 20. Aggregator 9-check boundary

O Aggregator permanece fechado exatamente sobre:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

O wrapper não é décimo check. Nenhuma revisão, documentação, auditoria,
categoria de teste, mapper, consumer ou smoke se torna check oficial.

## 21. Template write authorization posture

`TEMPLATE_WRITE_AUTHORIZATION_GRANTED_FOR_SEPARATE_PHASE_ONLY`

A autorização é documental, não transitiva e vale somente para abrir uma fase
posterior dev-only, estreita, fail-closed e com allowlist exata. Nenhuma escrita
de template é autorizada nesta fase.

## 22. Authorization decision model

O modelo usa:

- `AUTHORIZATION_BASIS_READY`: condição documental suficiente para permitir
  avaliação ou ação estritamente allowlisted em fase futura;
- `DEFERRED`: decisão conhecida, mas dependente de fase ou evidência própria;
- `BLOCKED`: ação não autorizável sob a base atual.

`AUTHORIZATION_BASIS_READY` não significa file, path, body, value ou mecanismo
pronto. A fase futura deverá abortar diante de qualquer necessidade de
inferência.

## 23. Authorization criteria

Foram avaliados os 23 critérios obrigatórios:

1. `Implementation plan active`
2. `Template write still blocked in current phase`
3. `Candidate template families planned`
4. `Candidate artifact categories planned`
5. `Candidate paths not final`
6. `Template bodies not final`
7. `Placeholder usage plan exists`
8. `Placeholder values remain blocked`
9. `Target-dependent filling remains blocked`
10. `No-copy policy preserved`
11. `Abort criteria documented`
12. `Validation/test categories planning-only`
13. `Rendered outputs remain blocked`
14. `Renderer/parser/schema remain blocked`
15. `Implementation/materialization remain blocked`
16. `Existing dev template mutation requires explicit allowlist`
17. `Future write phase can be separately scoped`
18. `Matrix 12/24/2 preserved`
19. `Aggregator 9-check boundary preserved`
20. `Target real remains blocked`
21. `GitHub remains blocked`
22. `Productive skill remains blocked`
23. `Current phase writes limited to one document`

## 24. Authorization result

Esta tabela é documental. Não é schema, checker, validator, template ou gate
executável e não autoriza template-write nesta fase.

| Criterion | Status | Evidence basis | Authorization meaning | Still blocked |
| --- | --- | --- | --- | --- |
| Implementation plan active | `AUTHORIZATION_BASIS_READY` | `ACTIVE_IMPLEMENTATION_PLAN_DOCUMENT` | O plano pode sustentar esta decisão. | Escrita atual. |
| Template write still blocked in current phase | `AUTHORIZATION_BASIS_READY` | `PASS_WITH_TEMPLATE_WRITE_BLOCKED` | O boundary atual é explícito. | Toda escrita atual. |
| Candidate template families planned | `AUTHORIZATION_BASIS_READY` | Sete famílias candidatas delimitadas. | Famílias podem limitar uma allowlist futura. | Files, paths e bodies. |
| Candidate artifact categories planned | `AUTHORIZATION_BASIS_READY` | Dez shapes conceituais delimitados. | Categorias podem orientar escopo futuro. | Artifacts reais e path resolution. |
| Candidate paths not final | `AUTHORIZATION_BASIS_READY` | Shapes declarados não executáveis. | A fase futura deverá fornecer paths exatos. | Todo path final agora. |
| Template bodies not final | `AUTHORIZATION_BASIS_READY` | Body boundary explícito. | A fase futura exige base canônica própria. | Todo body final agora. |
| Placeholder usage plan exists | `AUTHORIZATION_BASIS_READY` | 57 nomes e seis namespaces. | Referência nominal pode ser allowlisted. | Values e resolução. |
| Placeholder values remain blocked | `AUTHORIZATION_BASIS_READY` | Nenhum value preenchido. | A fase futura deve preservar no-value. | Filling, defaults e samples. |
| Target-dependent filling remains blocked | `AUTHORIZATION_BASIS_READY` | Target boundary fail-closed. | Templates futuros não podem depender de Target. | Filling, mapping e adapter. |
| No-copy policy preserved | `AUTHORIZATION_BASIS_READY` | Source mirror e payload integral proibidos. | Toda escrita futura deve ser seletiva e rastreável. | Cópia de kernels, profiles e `/docs`. |
| Abort criteria documented | `AUTHORIZATION_BASIS_READY` | Implementation plan contém abort conditions. | A fase futura deve abortar antes de ampliar escopo. | Inferências e writes fora da allowlist. |
| Validation/test categories planning-only | `AUTHORIZATION_BASIS_READY` | Sete categorias documentais. | Revisão futura pode ser descrita e manual. | Testes, fixtures e enforcement. |
| Rendered outputs remain blocked | `AUTHORIZATION_BASIS_READY` | No-rendered-output boundary. | Escrita futura não inclui outputs. | Rendered, fixture e snapshot outputs. |
| Renderer/parser/schema remain blocked | `AUTHORIZATION_BASIS_READY` | Mechanism boundary explícito. | Template-write não pressupõe pipeline. | Parser, renderer, schema e serializer. |
| Implementation/materialization remain blocked | `AUTHORIZATION_BASIS_READY` | No-materialization boundary. | Fase futura limita-se a templates dev allowlisted. | Runtime, CLI e materialização. |
| Existing dev template mutation requires explicit allowlist | `AUTHORIZATION_BASIS_READY` | Existência documental sem leitura ou uso. | Mutação só pode ser reconsiderada com base própria. | `BLOCKED_PENDING_EXPLICIT_MUTATION_BASIS`. |
| Future write phase can be separately scoped | `AUTHORIZATION_BASIS_READY` | Famílias, proibições e abort criteria separados. | Pode-se abrir fase fail-closed. | Qualquer permissão implícita. |
| Matrix 12/24/2 preserved | `AUTHORIZATION_BASIS_READY` | Contagens e exclusões canônicas. | Templates não alteram a matriz. | Agentes ou artifacts adicionais. |
| Aggregator 9-check boundary preserved | `AUTHORIZATION_BASIS_READY` | Nove child checks fechados. | A fase futura opera sem Aggregator change. | Checker e décimo check. |
| Target real remains blocked | `AUTHORIZATION_BASIS_READY` | Hard scope dev-only. | A fase futura continua Target-independent. | Leitura, inferência e write em Target. |
| GitHub remains blocked | `AUTHORIZATION_BASIS_READY` | Hard scope sem operação remota. | Nenhuma autorização depende de GitHub. | GitHub, branch, commit e PR. |
| Productive skill remains blocked | `AUTHORIZATION_BASIS_READY` | Boundary explícito entre skills. | A fase futura fica isolada na skill dev. | Leitura, cópia, comparação e alteração produtiva. |
| Current phase writes limited to one document | `AUTHORIZATION_BASIS_READY` | Permissão path-limited desta fase. | Esta decisão não amplia escrita atual. | Segundo arquivo ou edição existente. |

Nenhum critério bloqueia a abertura condicional da próxima fase. As ações
operacionais listadas em `Still blocked` permanecem bloqueadas até autorização
específica e, quando aplicável, continuarão proibidas mesmo na fase futura.

## 25. Future template-write phase boundary

A próxima fase poderá escrever somente templates dev-only que estejam em uma
allowlist fechada de arquivos e paths fornecida por seu próprio prompt. Ela não
poderá acessar Target, GitHub, skill produtiva ou artifacts reais, nem produzir
outputs ou materializar a arquitetura.

A autorização termina nos limites dessa fase. Qualquer arquivo, família, path,
body, placeholder ou operação não explicitamente autorizado permanecerá
bloqueado.

## 26. Future write permission model

Uma fase futura somente poderá prosseguir se seu prompt declarar antes de
qualquer escrita:

| Required permission element | Mandatory future declaration | Fail-closed result if absent |
| --- | --- | --- |
| File allowlist | Arquivos exatos permitidos. | Abort sem escrita. |
| Path allowlist | Paths exatos dentro da skill dev. | Abort sem inferir localização. |
| Write mode | `create-only`, `mutate-only` ou `create-and-mutate`. | Abort sem escrita; `create-only` é apenas a recomendação para um novo prompt explícito. |
| Candidate families | Família de cada arquivo allowlisted. | Abort por escopo indefinido. |
| Canonical body basis | Evidência documental para o conteúdo pretendido. | Abort sem inventar body. |
| Placeholder boundary | Nomes permitidos e usos proibidos. | Abort sem adicionar ou preencher placeholders. |
| Prohibited files | Files e áreas fora de escopo. | Todo não allowlisted permanece proibido. |
| External boundaries | Target, GitHub e skill produtiva bloqueados. | Abort ao surgir dependência externa. |
| Output boundary | Sem rendered outputs, fixtures ou snapshots. | Abort antes de gerar output. |
| Mechanism boundary | Sem parser, renderer, schema, validator ou checker. | Separar em fase própria. |
| Aggregator boundary | Sem alteração ou décimo check. | Rejeitar a proposta. |
| Abort and rollback rules | Critérios antes de write e remoção apenas de novos files da fase em falha. | Abort sem escrita ou reversão estritamente local autorizada. |
| Post-write review | Revisão documental, no-copy, scope, matrix e Aggregator. | Não declarar sucesso sem revisão. |

## 27. Future create-vs-mutate boundary

- Criação de novos template files exige allowlist explícita e é o default
  recomendado: `create-only`.
- Mutação de templates dev existentes exige allowlist explícita, autorização
  explícita de leitura e justificativa de por que mutar é mais seguro que criar.
- Leitura de templates existentes exige base documental e finalidade
  explicitamente autorizadas no prompt futuro.
- Cópia ou reutilização de bodies existentes permanece bloqueada salvo decisão
  futura explícita que prove aderência a no-copy.
- Existência de templates dev anteriores não autoriza uso por implicação.

Mutação está atualmente:

`BLOCKED_PENDING_EXPLICIT_MUTATION_BASIS`

## 28. Existing dev template boundary

A base registra documentalmente quatro templates dev existentes, mas nenhum
deles foi lido nesta decisão. Sua existência não concede autorização de
leitura, comparação, cópia, reuso ou mutação e não fornece path ou body para
esta arquitetura.

Uma fase futura que pretenda mutá-los deverá apresentar paths exatos,
finalidade, autorização de leitura, análise de colisão e justificativa de
segurança. Sem todos esses elementos, ela deverá permanecer `create-only` ou
abortar.

## 29. Future candidate template allowlist boundary

Esta tabela registra elegibilidade para decisão futura, não write approval
atual. Ela não define paths ou bodies finais.

| Candidate family | Future write eligibility | Create consideration | Mutate consideration | Required future allowlist | Current phase status | Still blocked |
| --- | --- | --- | --- | --- | --- | --- | --- |
| platform entrypoint templates | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Pode ser considerada sob `create-only`. | `BLOCKED`: depende de base explícita de mutação. | Files, paths e superfícies exatos. | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Final path, body e artifact real. |
| target-level artifact templates | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Somente template dev independente de Target. | `BLOCKED`: depende de base explícita de mutação. | Files, paths e finalidade exatos. | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Target mapping, artifact real e content final. |
| shared support templates | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Pode considerar suporte comum mínimo. | `BLOCKED`: depende de base explícita de mutação. | Files, paths e responsabilidade exatos. | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | `_shared` físico e body final. |
| per-agent support templates | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Pode considerar somente os 12 agentes. | `BLOCKED`: depende de base explícita de mutação. | Files, paths e agente canônico exatos. | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Micro-packs físicos e terceira matriz. |
| activation control templates | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Pode considerar controles sem runtime. | `BLOCKED`: depende de base explícita de mutação. | Files, paths e papel de controle exatos. | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Ordering, engine e bodies finais. |
| temperature shard templates | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Pode considerar categorias focadas. | `BLOCKED`: depende de base explícita de mutação. | Files, paths e temperatura exatos. | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Inventory, loader e body final. |
| trace support templates | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Pode considerar somente suporte audit-only. | `BLOCKED`: depende de base explícita de mutação. | Files, paths e finalidade auditável exatos. | `ELIGIBLE_FOR_FUTURE_WRITE_DECISION` | Estrutura, schema, report e persistência. |

## 30. Future candidate path boundary

Candidate shapes não são final paths. `<agent>` e `**` são notação conceitual,
não globs, patterns ou instruções executáveis nesta fase.

Paths finais só poderão ser autorizados por allowlist exata no prompt futuro e
deverão permanecer dentro da skill dev. Nenhum path de Target real pode ser
usado. `.sentinel/agents/**`, `.github/agents/**`, `.codex/agents/**`,
`AGENTS.md` e `.codex/config.toml` permanecem shapes ou artifacts de Target não
materializados nesta fase. Nenhuma escrita ocorre nesses paths.

## 31. Future template body boundary

Nenhum template body final é definido agora. Headings, prose, TOML keys,
ordering, escaping, whitespace, defaults, fragments, includes, inheritance e
composition rules continuam bloqueados.

A fase futura deverá receber base canônica explícita para cada body allowlisted
e transformar fontes de forma seletiva e rastreável. Se precisar inventar body,
copiar fonte ou deduzir comportamento ausente, deverá abortar.

## 32. Placeholder usage boundary

Esta tabela permite somente referência nominal futura. Não fornece values,
parser, schema ou resolução.

| Namespace | Future write eligibility | Allowed future reference | Blocked current use | Value status | Target dependency handling |
| --- | --- | --- | --- | --- | --- |
| `shared` | Referência condicional em file allowlisted. | Governança e suporte comum mínimo. | Template atual, source copy e filling. | 9 nomes, todos sem value. | Não inferir dados de Target. |
| `agent` | Referência condicional para os 12 agentes. | Responsabilidade e activation conceituais. | Agent body monolítico, path e filling. | 11 nomes, todos sem value. | Não inferir variações por Target. |
| `shard` | Referência condicional em shard allowlisted. | Temperatura, foco e triggers conceituais. | Inventory, loader, path e filling. | 13 nomes, todos sem value. | Não resolver sources ou paths por Target. |
| `trace` | Referência condicional audit-only. | Anchors, summaries e transformation notes. | Source path real, schema, report e filling. | 10 nomes, todos sem value. | Provenance dependente de Target não é resolvida. |
| `platform` | Referência condicional em template dev de plataforma. | Superfície conceitual e categoria de artifact. | Capability discovery, escaping e filling. | 6 nomes, todos sem value. | Discovery e mapping permanecem bloqueados. |
| `target` | `DEFERRED` para qualquer uso populado. | Somente slot nominal se explicitamente necessário. | Target access, inference, mapping e filling. | 8 nomes, todos sem value. | Toda dependência permanece fail-closed. |

## 33. Forbidden placeholder usage

Permanece proibido:

- usar `{{AGENT_BODY}}` ou equivalente monolítico;
- criar, remover ou renomear placeholders;
- preencher, inferir, derivar, resolver ou serializar values;
- criar defaults, samples ou fallbacks imaginados;
- transformar o inventário em schema, grammar, parser input ou validator;
- usar placeholders para copiar kernels, Senior Agent Profiles, `/docs`,
  instruction bodies, shards ou support packs;
- tratar activation como sétimo namespace;
- interpretar nomes como prova de body ou readiness operacional.

## 34. No-copy boundary

Source mirror, `/docs` dump, cópia integral de kernels, Senior Agent Profiles,
instruction bodies, shards, support packs ou templates existentes permanecem
bloqueados. Behavior parity deverá resultar de seleção, resumo, referência,
provenance, source anchors e transformation notes, nunca de payload literal.

## 35. Traceability boundary

Toda escrita futura deverá permitir explicar origem, seleção e transformação
sem duplicar a fonte. Trace permanece audit-only e não é agente, runtime input,
source mirror ou terceira matriz.

Estrutura, path, inventory, schema, storage, persisted report e behaviors de
stale ou missing source permanecem deferred ou bloqueados.

## 36. Anti-bloat boundary

A futura fase deverá preservar qualitativamente:

- entrypoints pequenos;
- `always` mínimo e leitura de `hot`, `warm` e `cold` por necessidade;
- regras comuns centralizadas sem duplicação entre superfícies;
- conteúdo por agente e shard focado;
- referências em lugar de dumps;
- ausência de bodies monolíticos e de terceira matriz.

Thresholds, budgets, ratios, métricas, measurement tooling e enforcement
numérico permanecem deferred.

## 37. Target dependency boundary

Target real permanece fora do escopo desta e da próxima fase recomendada.
Leitura, discovery, inferência de paths ou capabilities, placeholder filling,
mapping, adapter e qualquer write em Target permanecem bloqueados.

Shapes e placeholders `target.*` não fornecem fatos. Ausência de dados exige
abort ou manutenção do item como deferred, nunca defaults imaginados.

## 38. Validation and test boundary

A fase futura poderá registrar ou executar somente revisão documental
proporcional sobre os templates dev allowlisted, sem criar artifacts de teste:

- static documentation review;
- no-copy review;
- placeholder inventory review;
- template boundary review;
- matrix preservation review;
- Aggregator boundary review;
- write-scope review;
- dry-run planning review.

Permanecem proibidos testes novos, fixtures, snapshots, rendered outputs,
checker, validator, schema, threshold enforcement, alteração do Aggregator e
décimo check. Esta lista é governança documental, não validation strategy final.

## 39. Abort criteria for future write phase

A futura fase deverá abortar antes de qualquer escrita se precisar:

- inventar template path, filename, body, inventory, field ou ordering;
- escrever arquivo fora da allowlist ou usar modo de escrita não declarado;
- preencher ou inferir placeholder values ou Target-dependent facts;
- ler Target real, acessar GitHub ou acessar skill produtiva;
- copiar kernel inteiro, Senior Agent Profile inteiro ou `/docs` inteiro;
- criar source mirror, `/docs` dump ou body monolítico;
- usar `{{AGENT_BODY}}` ou placeholder equivalente;
- ler, copiar ou reutilizar template existente sem autorização explícita;
- mutar template existente sem allowlist e justificativa explícitas;
- criar rendered output, fixture, snapshot, preview ou persisted report;
- criar parser, renderer, schema, validator, checker, medidor ou materializer;
- alterar o Aggregator ou criar décimo check;
- alterar `12/24/2`, criar terceira matriz ou tratar template como agente;
- finalizar support layer ou trace por implicação;
- materializar artifacts reais de Target;
- depender de threshold numérico ou audit approach final inexistente;
- deixar de provar no-copy, traceability, anti-bloat qualitativo ou scope.

## 40. No rendered output boundary

Rendered outputs, fixture outputs, snapshots, previews, materialized samples e
persisted reports permanecem bloqueados. Nenhuma strategy, format, location ou
comparison method é definida ou autorizada.

## 41. No parser renderer schema boundary

Parser, renderer, executable schema, AST, grammar, serializer, compiler,
resolution order, escaping implementation, Target adapter e pipeline
equivalente permanecem bloqueados. Placeholder syntax e template text não
constituem especificação implícita desses mecanismos.

## 42. No validation enforcement boundary

Validator, checker, meter, executable gate, test harness, threshold enforcement
e registro como child check permanecem bloqueados. Revisões documentais não são
enforcement e não alteram o Aggregator de nove checks.

## 43. No materialization boundary

Esta decisão não autoriza materializar templates em artifacts de Target,
agentes, support packs, shards ou artifacts target-level. Não se cria
`.sentinel/agents/**`, `.github/agents/**` ou `.codex/agents/**` e não se altera
`.codex/config.toml` ou `AGENTS.md`.

Runtime, CLI, filesystem materializer, Target writer e dev-only materialization
strategy permanecem fora do escopo.

## 44. What is decided now

- A base sustenta autorização documental para abrir uma fase futura separada.
- Essa fase deverá ser dev-only, fail-closed e path/file allowlisted.
- O default recomendado é `create-only`.
- As sete famílias são elegíveis apenas para decisão futura de escrita.
- Os 57 placeholders podem ser referenciados nominalmente, sem values.
- No-copy, traceability, anti-bloat qualitativo, `12/24/2` e nove checks são
  invariantes obrigatórios.
- Mutação permanece `BLOCKED_PENDING_EXPLICIT_MUTATION_BASIS`.

## 45. What remains blocked

Permanecem bloqueados:

- implementation e materialization;
- template creation, write e mutation nesta fase;
- mutação futura sem base explícita;
- final paths, bodies e inventory;
- rendered, fixture e snapshot outputs;
- support-layer physical finalization;
- placeholder values, filling, resolution e Target mapping;
- estrutura, path, inventory e schema finais de trace;
- source mirror, `/docs` dump e persisted report;
- parser, renderer, schema, validator, checker, meter e materializer;
- threshold enforcement, numeric thresholds e audit approach final;
- Target real, GitHub, branch, commit, PR e skill produtiva;
- alteração do Aggregator, child checks ou décimo check.

## 46. What cannot be finalized yet

Ainda não podem ser finalizados:

- exact template file allowlist;
- permissão definitiva create-only, mutate-only ou create-and-mutate;
- paths, filenames, bodies, fields, ordering, escaping e inventory finais;
- support-layer physical structure;
- placeholder values e resolution semantics;
- rendered-output, fixture e snapshot strategies;
- parser, renderer, schema e validation strategies;
- audit approach, thresholds e enforcement;
- Target-dependent mapping, Target adapter e artifacts finais;
- trace final structure, path, inventory e schema;
- implementation e dev-only materialization strategies.

## 47. Forbidden inferences

É proibido inferir que:

- este `PASS` autoriza template-write agora;
- autorização futura dispensa allowlist exata;
- família candidata equivale a file, path ou body final;
- shape conceitual equivale a glob ou filesystem layout aprovado;
- placeholder inventory equivale a template inventory ou fornece values;
- nome de artifact fornece content, format ou escaping;
- existência de template dev permite leitura, reuso ou mutação;
- ausência de Target permite defaults;
- trace closeout fornece schema, report ou implementação;
- anti-bloat qualitativo fornece threshold numérico;
- documentação ou revisão pode virar checker ou décimo check;
- `.sentinel/agents/**` constitui terceira matriz;
- uma fase futura pode ampliar o escopo para obter evidência ausente.

## 48. Allowed future decision paths

São legítimos somente:

1. abrir a fase futura de template-write com allowlist exata e default
   `create-only`;
2. abortar sem escrita se path, body, inventory ou base canônica estiver
   ausente;
3. abrir decisão intermediária própria para mutação, se ela for pretendida;
4. tratar outputs, mecanismos, validação final, audit approach, thresholds,
   Target mapping, trace final e materialization em fases separadas;
5. manter itens deferred abertos até existir evidência e autorização explícita.

Nenhum caminho herda permissão operacional por implicação.

## 49. Recommended safe next phase

Próxima fase segura:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_WRITE_IMPLEMENTATION`

Ela deverá ser estreita, dev-only, fail-closed e, por default, `create-only`,
com files e paths exatos, famílias e placeholders permitidos, base canônica de
body, arquivos proibidos, post-write review e abort/rollback rules. Target,
GitHub, skill produtiva, outputs, fixtures, snapshots, mechanisms, Aggregator
change, checker e décimo check permanecerão bloqueados.

Se mutação for necessária, deverá haver antes base explícita própria ou o
prompt da fase deverá conceder de modo inequívoco allowlist, leitura e
justificativa de mutação. Sem isso, a fase deverá abortar a mutação.

## 50. Explicit non-authorization

Esta decisão não autoriza implementação, materialização, template creation,
template write ou template mutation na fase atual; leitura, cópia ou reuso de
templates existentes; final paths, bodies ou inventory; rendered outputs,
fixtures ou snapshots; placeholder values; Target-dependent filling ou
mapping; support-layer physical finalization; trace final
structure/path/inventory/schema; source mirror; `/docs` dump; persisted report;
parser; renderer; schema; validator; checker; medidor; materializer; threshold
enforcement; audit approach final; runtime; CLI; Target real; GitHub; branch;
commit; PR; skill produtiva; alteração do Aggregator; alteração de child checks;
ou décimo check.

O veredito autoriza somente a abertura de uma fase futura separada sob
allowlist explícita. Até que essa fase seja aberta com todas as permissões e
boundaries exigidos, toda escrita de template permanece bloqueada.
