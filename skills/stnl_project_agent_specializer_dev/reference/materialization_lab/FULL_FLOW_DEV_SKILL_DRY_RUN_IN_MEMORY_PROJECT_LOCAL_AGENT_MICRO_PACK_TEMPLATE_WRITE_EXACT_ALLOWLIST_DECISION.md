# Full-Flow Dev-Skill Dry-Run In-Memory Project-Local Agent Micro-Pack Template Write Exact Allowlist Decision

## 1. Status

`BLOCKED_PENDING_EXACT_ALLOWLIST_BASIS`

Este documento é exclusivamente uma decisão documental, dev-only e fail-closed. Ele não é template, inventário executável, schema, validator, checker ou autorização de escrita.

## 2. Phase

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_WRITE_EXACT_ALLOWLIST_DECISION`

## 3. Verdict

`BLOCKED_WITHOUT_EXACT_ALLOWLIST`

Postura:

`TEMPLATE_WRITE_EXACT_ALLOWLIST_BLOCKED_PENDING_CANONICAL_PATH_BASIS`

Não existe base canônica suficiente para fechar nomes de arquivos, paths exatos e body basis sem inferência. A exact allowlist não foi definida e `TEMPLATE_WRITE_IMPLEMENTATION` permanece bloqueada.

## 4. Objective

Decidir se a documentação herdada sustenta uma allowlist exata para uma futura escrita de templates dentro da skill dev. O resultado é negativo: as categorias, famílias e shapes disponíveis delimitam intenção, mas não determinam filenames, paths físicos ou base canônica de bodies.

## 5. Scope

O escopo é restrito a `skills/stnl_project_agent_specializer_dev/` e à criação deste único documento de decisão. A análise considera somente evidência documental permitida e não lê templates existentes.

## 6. Non-goals

Esta fase não cria nem altera templates; não define bodies finais; não cria inventory executável; não produz outputs; não implementa parser, renderer, schema, validator, checker, medidor ou materializer; não acessa Target real, GitHub ou skill produtiva; e não altera runtime, CLI, Aggregator ou matriz canônica.

## 7. Inherited baseline

A base herdada registra:

- template write authorization fechada com `PASS_WITH_SEPARATE_TEMPLATE_WRITE_PHASE_AUTHORIZED` e postura `TEMPLATE_WRITE_AUTHORIZATION_GRANTED_FOR_SEPARATE_PHASE_ONLY`;
- próxima fase anteriormente recomendada como `TEMPLATE_WRITE_IMPLEMENTATION`, condicionada a exact allowlist;
- default recomendado `create-only`;
- mutação em `BLOCKED_PENDING_EXPLICIT_MUTATION_BASIS`;
- implementation plan com `PASS_WITH_TEMPLATE_WRITE_BLOCKED`;
- template readiness com `PASS_WITH_TEMPLATE_CREATION_BLOCKED`;
- 57 placeholders canônicos em seis namespaces, todos sem values;
- Target-dependent filling e mapping bloqueados;
- support layer finalization com `PASS_WITH_IMPLEMENTATION_BLOCKED`;
- famílias de templates conceptual-only e bounded;
- creation gates reviewed-but-creation-blocked;
- trace audit closeout com `CLOSED_WITH_EXCELLENT_PASS`, audit-only e conceptual-only;
- audit approach final e thresholds numéricos deferred;
- matriz `12/24/2` e Aggregator de nove child checks preservados.

Essa base autoriza a presente decisão, mas não fornece exact paths, exact filenames ou body basis canônica.

## 8. Relation to template write authorization

`PASS_WITH_SEPARATE_TEMPLATE_WRITE_PHASE_AUTHORIZED` autoriza somente uma fase separada, sujeita a exact allowlist prévia. Não autoriza escrita por implicação. Como a allowlist exata não pode ser fechada agora, a autorização condicional não se torna operacional.

## 9. Relation to template creation implementation plan

O plano fechado com `PASS_WITH_TEMPLATE_WRITE_BLOCKED` preserva famílias e categorias como candidatas, sem transformar shapes em filesystem layout. Ele também declara final path selection e template bodies como bloqueados. Esta decisão mantém esse limite.

## 10. Relation to template readiness

`PASS_WITH_TEMPLATE_CREATION_BLOCKED` demonstra readiness documental, não readiness para escrita. Não há promoção automática de readiness para path, filename, body ou inventory final.

## 11. Relation to placeholder final inventory

Os 57 placeholders e os namespaces `shared`, `agent`, `shard`, `trace`, `platform` e `target` fornecem apenas contrato nominal. Nenhum value existe; nenhum placeholder pode ser criado, removido, renomeado ou resolvido nesta fase; Target-dependent filling permanece bloqueado.

## 12. Relation to support layer finalization

`PASS_WITH_IMPLEMENTATION_BLOCKED` estabiliza a direção conceitual da support layer, mas não sua estrutura física. Diretórios, filenames, nesting, extensions, inventory e materialização continuam indefinidos.

## 13. Relation to support-layer template families

As sete famílias candidatas permanecem conceptual-only. Elas não são arquivos, paths, bodies, templates finais, agentes ou autorização de criação. Sua associação às categorias candidatas abaixo é taxonômica e bloqueada.

## 14. Relation to template creation gates

A postura `TEMPLATE_CREATION_GATES_REVIEWED_BUT_CREATION_BLOCKED` permite preservar critérios de abort e revisão. Não converte gates documentais em validator, checker, schema ou autorização de template write.

## 15. Relation to trace audit closeout

`CLOSED_WITH_EXCELLENT_PASS` confirma auditabilidade documental. Trace permanece audit-only e conceptual-only; final structure, path, inventory, schema, report e persistência continuam bloqueados.

## 16. Relation to audit approach deferred

O método final de auditoria não está decidido. Esta fase não seleciona mecanismo, fixture, snapshot, persisted report, checker, métrica ou enforcement.

## 17. Relation to anti-bloat thresholds deferred

As restrições qualitativas de no-copy e payload mínimo permanecem válidas. Thresholds numéricos, medição e enforcement continuam deferred e não podem ser usados para inventar body basis.

## 18. Canonical invariants

Permanecem invariantes:

- arquitetura `PROJECT_LOCAL_AGENT_MICRO_PACK_MATRIX`;
- entrypoints pequenos e support packs focados;
- kernels e Senior Agent Profiles como fontes fortes, nunca payload literal;
- ausência de cópia integral de `/docs`;
- regras comuns centralizadas conceitualmente em `_shared`;
- consumo de `/docs` sob demanda;
- skill imutável por projeto;
- behavior parity por transformação rastreável;
- ausência de Target, GitHub e skill produtiva nesta fase.

## 19. Matrix 12/24/2 preservation

A matriz continua exatamente com 12 agentes canônicos: `orchestrator`, `planner`, `validation-eval-designer`, `execution-package-designer`, `designer`, `coder-frontend`, `coder-backend`, `coder-ios`, `validation-runner`, `reviewer`, `finalizer` e `resync`.

Continuam existindo conceitualmente 24 artifacts de agente, 12 por superfície, e 2 artifacts target-level. `.codex/config.toml` e `AGENTS.md` não contam como agentes. Templates, famílias, placeholders, `_shared`, support packs, per-agent micro-packs e trace não contam como agentes. `.sentinel/agents/**` não é terceira matriz nem substitui as superfícies canônicas.

## 20. Aggregator 9-check boundary

O Aggregator permanece fechado exatamente nestes nove child checks:

1. `scripts/materialization_lab/check-static.mjs`
2. `scripts/materialization_lab/check-source-inventory.mjs`
3. `scripts/materialization_lab/check-template-coverage.mjs`
4. `scripts/materialization_lab/check-fixture-boundary.mjs`
5. `scripts/materialization_lab/check-lazy-load-fixtures.mjs`
6. `scripts/materialization_lab/check-project-scenarios.mjs`
7. `scripts/materialization_lab/check-render-context.mjs`
8. `scripts/materialization_lab/check-dry-run-plan.mjs`
9. `scripts/materialization_lab/check-fixture-render-dry-run-integration.mjs`

O wrapper não é décimo check. Nenhum child check, Aggregator ou validation harness official file é alterado. Esta documentação não é registrada como check.

## 21. Exact allowlist decision posture

`TEMPLATE_WRITE_EXACT_ALLOWLIST_BLOCKED_PENDING_CANONICAL_PATH_BASIS`

Todos os arquivos e paths permanecem proibidos para futura escrita até que uma fase documental intermediária estabeleça base canônica de exact filenames, exact paths e body basis sem ler ou reutilizar templates existentes por implicação.

## 22. Exact allowlist decision model

A allowlist somente poderia passar se cada entrada tivesse filename literal, path literal dentro da skill dev, write mode explícito, família e categoria documentadas, body basis não final mas canonicamente rastreável, namespaces permitidos e proibições próprias. Nenhuma entrada pode conter glob, `<agent>`, `**`, placeholder em path ou destination de Target.

Como a documentação herdada oferece shapes conceituais em vez desses elementos literais, o modelo falha fechado e não produz entries.

## 23. Exact allowlist criteria

Os 27 critérios obrigatórios são avaliados na seção seguinte. `ALLOWLIST_BASIS_READY` significa somente que o limite documental do critério está estabelecido; não significa autorização de escrita. `DEFERRED` mantém decisão futura separada. `BLOCKED` impede a allowlist.

## 24. Exact allowlist result

| Criterion | Status | Evidence basis | Decision meaning | Still blocked |
| --- | --- | --- | --- | --- |
| Template write authorization exists | `ALLOWLIST_BASIS_READY` | `PASS_WITH_SEPARATE_TEMPLATE_WRITE_PHASE_AUTHORIZED` é condicional a fase separada e exact allowlist. | A decisão de allowlist pode ser avaliada. | Toda escrita de template. |
| Implementation plan exists | `ALLOWLIST_BASIS_READY` | Plano fechado com `PASS_WITH_TEMPLATE_WRITE_BLOCKED`. | Famílias, categorias e limites podem ser herdados. | Escrita, bodies, inventory e paths finais. |
| Exact file allowlist basis exists | `BLOCKED` | Nenhum documento define filenames literais canônicos. | Nenhuma file entry pode ser criada sem invenção. | Toda futura file allowlist. |
| Exact path allowlist basis exists | `BLOCKED` | Shapes conceituais usam localização não final, `<agent>` ou `**`. | Nenhuma path entry pode ser criada sem inferência. | Toda futura path allowlist. |
| Write mode can be declared | `ALLOWLIST_BASIS_READY` | Default herdado é `create-only`. | O modo poderá ser repetido após existirem entries exatas. | Uso operacional do modo sem allowlist. |
| Create-only can be preserved | `ALLOWLIST_BASIS_READY` | Autorização herdada recomenda criação sem mutação. | Arquivo preexistente deverá causar abort. | Qualquer criação atual. |
| Mutation remains blocked | `ALLOWLIST_BASIS_READY` | `BLOCKED_PENDING_EXPLICIT_MUTATION_BASIS`. | `mutate-only` e `create-and-mutate` não são opções atuais. | Leitura, comparação e alteração de templates existentes. |
| Existing templates not read by implication | `ALLOWLIST_BASIS_READY` | No-read/no-copy boundary herdada e preservada. | Existência não produz autorização nem body basis. | Leitura, cópia, reuso, comparação e mutação. |
| Candidate families mapped | `DEFERRED` | Sete famílias conceituais são conhecidas. | Associação taxonômica pode ser registrada, mas não finalizada por arquivo. | Mapping final file-to-family. |
| Candidate artifact categories mapped | `DEFERRED` | Dez categorias conceituais são conhecidas. | Shapes são rótulos, não destinations. | Mapping final file-to-category. |
| Canonical body basis can be described without final body | `BLOCKED` | Há no-copy policy, mas não há source-selection/transformation basis por arquivo. | Uma fase intermediária deve decidir base rastreável sem escrever bodies. | Body basis e bodies finais. |
| Placeholder namespaces mapped | `ALLOWLIST_BASIS_READY` | Seis namespaces e 57 nomes estão fechados documentalmente. | Namespaces podem limitar decisão futura. | Uso por arquivo, values, parsing e filling. |
| Placeholder values remain blocked | `ALLOWLIST_BASIS_READY` | Inventário herdado contém nomes sem values. | Nenhum value pode ser inferido ou preenchido. | Todos os values. |
| Target-dependent filling remains blocked | `ALLOWLIST_BASIS_READY` | Boundary de Target é fail-closed. | Nenhuma dependência de Target pode resolver conteúdo. | Filling, mapping, adapter e acesso a Target. |
| No-copy policy preserved | `ALLOWLIST_BASIS_READY` | Source mirror, `/docs` dump e cópias integrais são proibidos. | Futura body basis deverá ser seletiva e rastreável. | Payload literal e `{{AGENT_BODY}}`. |
| Abort criteria preserved | `ALLOWLIST_BASIS_READY` | Gates herdados podem ser expressos documentalmente. | Uma futura fase deve abortar antes da primeira escrita se qualquer critério falhar. | Gate executável, checker e write atual. |
| Rollback boundary can be described | `ALLOWLIST_BASIS_READY` | Futuro modo esperado é `create-only`. | Rollback documental limita-se a remover somente arquivos novos da fase futura. | Operação de rollback nesta fase e alterações preexistentes. |
| Post-write review can be described | `ALLOWLIST_BASIS_READY` | Categorias de revisão podem ser listadas sem criar mecanismos. | Revisão futura deverá conferir allowlist e boundaries. | Tests, validator, checker, snapshots e outputs. |
| Rendered outputs remain blocked | `ALLOWLIST_BASIS_READY` | Boundary explícita de no-rendered-output. | Nenhum output pode integrar a allowlist. | Render, fixtures, snapshots e reports. |
| Renderer/parser/schema remain blocked | `ALLOWLIST_BASIS_READY` | Implementation plan preserva esses mecanismos como não autorizados. | A decisão continua puramente documental. | Parser, renderer e schema. |
| Implementation/materialization remain blocked | `ALLOWLIST_BASIS_READY` | Support layer e template write continuam implementation-blocked. | Esta fase não produz artifact operacional. | Implementation e materialization. |
| Matrix 12/24/2 preserved | `ALLOWLIST_BASIS_READY` | Contagens e papéis canônicos estão fechados. | Templates e support layer não alteram a matriz. | Novos agentes, terceira matriz e recontagem. |
| Aggregator 9-check boundary preserved | `ALLOWLIST_BASIS_READY` | Lista oficial permanece fechada em nove child checks. | Nenhum item desta decisão é check. | Alteração do Aggregator ou décimo check. |
| Target real remains blocked | `ALLOWLIST_BASIS_READY` | Escopo dev-only e Target-independent. | Nenhum path ou value pode ser derivado de Target. | Leitura, escrita, discovery e mapping de Target. |
| GitHub remains blocked | `ALLOWLIST_BASIS_READY` | Escopo exclui GitHub e operações remotas. | Shapes GitHub continuam conceituais. | Acesso, branch, commit e PR. |
| Productive skill remains blocked | `ALLOWLIST_BASIS_READY` | Hard scope restringe acesso à skill dev. | Nenhuma base pode ser derivada da skill produtiva. | Leitura, comparação e alteração da skill produtiva. |
| Current phase writes limited to one document | `ALLOWLIST_BASIS_READY` | Write permission é `CREATE_ONE_DOCUMENT_ONLY`. | Somente este documento de decisão pode ser criado. | Qualquer segundo arquivo ou edição. |

Conclusão: os bloqueios em exact file basis, exact path basis e canonical body basis impedem a allowlist. Status ready em critérios de boundary não compensa a ausência dessas três bases centrais.

## 25. Write mode decision

O modo recomendado para eventual fase futura permanece `create-only`, mas não está operacional porque não existem entries exatas.

- `create-only`: somente poderá ser usado para arquivos literais de uma allowlist futura aprovada;
- `mutate-only`: `BLOCKED_PENDING_EXPLICIT_MUTATION_BASIS`;
- `create-and-mutate`: `BLOCKED_PENDING_EXPLICIT_MUTATION_BASIS`;
- ausência de write mode explícito em prompt futuro: abort;
- existência prévia de qualquer arquivo allowlisted em modo `create-only`: abort antes de qualquer escrita.

## 26. Create-vs-mutate decision

Nenhuma criação ou mutação é autorizada agora. O futuro default continua `create-only`. Templates dev existentes não foram lidos e sua existência não é autorização para inferir nomes, paths, bodies, style, inventory ou mutation basis. Qualquer mutação exigirá decisão e fase próprias.

## 27. Future file allowlist

| Allowed future file | Write mode | Candidate family | Candidate artifact category | Canonical body basis | Allowed placeholder namespaces | Prohibited content | Current phase status |
| --- | --- | --- | --- | --- | --- | --- | --- |

Nenhuma entrada definida. A ausência é intencional e fail-closed: não há exact filename basis nem canonical body basis. Todo arquivo permanece não allowlisted.

## 28. Future path allowlist

| Allowed future path | Path type | Must not already exist | Reason | Blocked adjacent paths |
| --- | --- | --- | --- | --- |

Nenhuma entrada definida. Shapes conceituais, `<agent>`, `**`, `START.md`, `MANIFEST.md`, `AGENTS.md` e `.codex/config.toml` não são convertidos em destination paths.

## 29. Future prohibited files and areas

Permanecem proibidos:

- `skills/stnl_project_agent_specializer/` e qualquer conteúdo da skill produtiva;
- Target real e qualquer path dependente de Target;
- GitHub e operações de branch, commit ou PR;
- `.github/agents/**`, `.codex/agents/**` e `.sentinel/agents/**` como destinations reais;
- `AGENTS.md` e `.codex/config.toml` como artifacts reais;
- templates dev existentes, salvo autorização futura explícita de mutação;
- `README.md`, `MANIFEST.md`, scripts, tests, fixtures, snapshots e rendered outputs;
- Aggregator, seus nove child checks e validation harness official files;
- contracts, salvo leitura documental futura explicitamente permitida;
- parser, renderer, schema, validator, checker, medidor, materializer e persisted report;
- qualquer arquivo sem entrada literal em futura allowlist aprovada;
- qualquer path adjacente, parent ou sibling inferido a partir de uma futura entry.

## 30. Future candidate family mapping

O mapping abaixo preserva as sete famílias e as dez categorias somente como candidatos bloqueados. Não é file mapping, path mapping, inventory ou autorização.

| Candidate family | Candidate artifact categories | Mapping status | Missing basis | Prohibited interpretation |
| --- | --- | --- | --- | --- |
| platform entrypoint templates | GitHub platform entrypoint; Codex platform entrypoint | `BLOCKED` | Exact filenames, paths e body basis. | Não materializar `.github/agents/<agent>.agent.md` ou `.codex/agents/<agent>.toml`. |
| target-level artifact templates | Codex target-level config; Target-level agent guidance | `BLOCKED` | Exact filenames internos da skill dev, paths e body basis. | Não materializar `.codex/config.toml` ou `AGENTS.md`. |
| shared support templates | Shared support | `BLOCKED` | Estrutura física, filename, path e body basis. | Não tratar `.sentinel/agents/_shared/**` como destination. |
| per-agent support templates | Per-agent support | `BLOCKED` | Expansão literal dos 12 agentes, filenames, paths e body basis. | Não tratar `.sentinel/agents/<agent>/**` como destination ou terceira matriz. |
| activation control templates | Activation entry control; Activation manifest control | `BLOCKED` | Localização, filenames, paths e body basis. | Não criar `START.md` ou `MANIFEST.md`. |
| temperature shard templates | Temperature support | `BLOCKED` | Inventory, filenames, paths e body basis para `always`, `hot`, `warm` e `cold`. | Não criar shards, loader ou inventory. |
| trace support templates | Trace support | `BLOCKED` | Final structure, path, inventory, schema e body basis. | Não criar trace persistido, report ou schema. |

As dez categorias preservadas são: GitHub platform entrypoint, Codex platform entrypoint, Codex target-level config, Target-level agent guidance, Shared support, Per-agent support, Activation entry control, Activation manifest control, Temperature support e Trace support.

## 31. Future body basis boundary

Não há body basis suficiente por futuro arquivo. A documentação define no-copy, foco, rastreabilidade e separação conceitual, mas não seleciona fontes, seções, transformation notes, headings, TOML keys, ordering, escaping, composition ou critérios de suficiência por entry.

A fase intermediária deverá decidir somente base documental de body por filename/path candidato, sem produzir body final, sem ler templates existentes e sem copiar kernels, Senior Agent Profiles ou `/docs` integralmente.

## 32. Placeholder usage boundary

| Namespace | Future allowlisted use | Blocked current use | Value status | Target dependency handling | Notes |
| --- | --- | --- | --- | --- | --- |
| `shared` | Candidato a regras comuns mínimas, somente após mapping por arquivo. | Template use, filling, `_shared` físico e source copy. | `BLOCKED`; nenhum value. | Não inferir dados de Target. | 9 nomes canônicos herdados; nenhuma nova definição. |
| `agent` | Candidato a identidade e responsabilidade dos 12 agentes, somente após mapping por arquivo. | Agent body, path, micro-pack, template use e filling. | `BLOCKED`; nenhum value. | Não derivar variações do Target. | 11 nomes canônicos herdados; activation não é namespace. |
| `shard` | Candidato a shard focus, temperature e triggers, somente após mapping por arquivo. | Inventory, loader, path, template use e filling. | `BLOCKED`; nenhum value. | Não resolver sources ou paths pelo Target. | 13 nomes canônicos herdados. |
| `trace` | Candidato a source anchors, summaries e transformation notes, somente após mapping por arquivo. | Path real, schema, report, template use e filling. | `BLOCKED`; nenhum value. | Provenance dependente de Target não pode ser resolvida. | 10 nomes canônicos herdados; audit-only. |
| `platform` | Candidato às superfícies conceituais, somente após mapping por arquivo. | Final path, capability discovery, escaping, template use e filling. | `BLOCKED`; nenhum value. | Discovery e mapping por Target proibidos. | 6 nomes canônicos herdados. |
| `target` | Nenhum uso allowlisted enquanto Target-dependent basis estiver bloqueada. | Target access, inference, mapping, adapter, template use e filling. | `BLOCKED`; nenhum value. | Toda dependência permanece fail-closed e deferred. | 8 nomes canônicos herdados. |

A tabela não cria schema, parser, validator, values ou placeholders.

## 33. Forbidden placeholder usage

É proibido:

- usar `{{AGENT_BODY}}`;
- criar placeholder monolítico ou payload container;
- criar, remover, renomear ou preencher placeholders;
- preencher values por defaults, exemplos, fixtures ou Target;
- usar placeholders em filenames ou paths;
- usar placeholder para copiar kernel, Senior Agent Profile, `/docs`, source mirror ou template existente;
- tratar activation como sétimo namespace;
- criar parser, renderer, schema ou validation enforcement para placeholders.

## 34. No-copy boundary

Nenhuma futura body basis pode autorizar source mirror, `/docs` dump, kernel inteiro, Senior Agent Profile inteiro, template body existente, shard indiscriminado ou conteúdo monolítico. Behavior parity exige seleção mínima e transformation traceability. Referência documental não é licença para payload literal.

## 35. Traceability boundary

Uma futura decisão poderá exigir, como categoria documental, source basis, selection rationale, transformation note e behavior-parity link por entry. Não pode finalizar trace structure, path, inventory, schema, report, persistence, runtime ou Target-dependent provenance.

## 36. Anti-bloat boundary

Continuam válidos os limites qualitativos: entrypoints pequenos, suporte focado, regras comuns sem duplicação, leitura de `/docs` sob demanda e proibição de payload integral. Nenhum threshold numérico, orçamento, medidor ou enforcement é definido.

## 37. Target dependency boundary

Target real não pode ser lido ou escrito. Nenhum filename, path, placeholder value, body basis, capability, platform variation, discovery, mapping ou adapter pode ser derivado de Target. Qualquer necessidade de Target causa abort.

## 38. Validation and review boundary

Uma futura revisão pode usar somente categorias documentais: file/path exactness, create-only preexistence, family/category mapping, placeholder boundary, no-copy, matrix preservation, Aggregator preservation, no-Target e no-output. Esta fase não cria testes, fixtures, snapshots, rendered outputs, checker, validator, schema ou enforcement.

## 39. Abort criteria for future template write

Uma futura fase deverá abortar antes de qualquer escrita se precisar:

- criar arquivo fora da allowlist ou usar path não literal;
- usar `<agent>` sem expansão literal, `**` como glob ou placeholder em path;
- escrever arquivo já existente em modo `create-only`;
- mutar ou ler template existente sem autorização explícita;
- copiar, reutilizar, comparar ou derivar body de template existente;
- inventar filename, path, final body ou inventory;
- preencher placeholder values ou inferir valores dependentes de Target;
- acessar Target real, GitHub ou skill produtiva;
- copiar kernel, Senior Agent Profile ou `/docs` integralmente;
- usar `{{AGENT_BODY}}` ou placeholder monolítico;
- criar rendered output, fixture, snapshot ou persisted report;
- criar parser, renderer, schema, validator, checker, medidor ou materializer;
- alterar Aggregator, child checks ou criar décimo check;
- alterar a matriz `12/24/2`, criar novo agente ou terceira matriz;
- tratar support layer, templates, famílias ou trace como agentes;
- materializar `.github/agents/**`, `.codex/agents/**`, `.sentinel/agents/**`, `AGENTS.md` ou `.codex/config.toml`;
- prosseguir sem write mode `create-only`, rollback boundary ou post-write review explícitos.

Como não há exact allowlist, qualquer tentativa atual de `TEMPLATE_WRITE_IMPLEMENTATION` satisfaz o primeiro critério de abort.

## 40. Rollback boundary

Nesta fase não há rollback de template porque nenhum template é criado. Em eventual fase futura `create-only`, rollback deverá limitar-se à remoção dos arquivos novos criados por aquela própria fase e somente após identificação inequívoca. Nunca poderá reverter, substituir, editar ou remover arquivo preexistente, template existente ou mudança do usuário. Se atomicidade e ownership não puderem ser demonstrados, a fase deverá abortar antes de escrever.

## 41. Post-write review boundary

Somente após existir allowlist aprovada, uma futura revisão poderá conferir: correspondência um-a-um entre entries e arquivos novos, paths literais, inexistência prévia, modo `create-only`, conteúdo limitado à body basis aprovada, namespaces permitidos, ausência de values, no-copy, ausência de Target e preservação de matriz/Aggregator. Essa revisão não autoriza rendered outputs, tests, fixtures, snapshots, parser, renderer, schema, validator ou checker.

## 42. No rendered output boundary

Rendered outputs, previews persistidos, fixture outputs, snapshot outputs e reports continuam bloqueados. Nenhum deles pode integrar futura allowlist nesta trilha sem fase e autorização próprias.

## 43. No parser renderer schema boundary

Parser, renderer e schema permanecem bloqueados. A decisão e suas tabelas são documentação humana, não contrato executável, AST, grammar, serialization format ou mecanismo de renderização.

## 44. No validation enforcement boundary

Nenhum validator, checker, medidor, threshold enforcement, teste ou gate executável é criado ou autorizado. Os critérios deste documento são boundaries para revisão humana futura e não constituem décimo child check.

## 45. No materialization boundary

Não há materialização de agentes, entrypoints, target-level artifacts, support packs, `_shared`, per-agent micro-packs, activation controls, shards ou trace. A decisão não autoriza materializer, Target adapter, runtime ou CLI behavior.

## 46. What is decided now

Decide-se que:

- a exact allowlist não pode ser definida com segurança;
- o status é `BLOCKED_PENDING_EXACT_ALLOWLIST_BASIS`;
- o verdict é `BLOCKED_WITHOUT_EXACT_ALLOWLIST`;
- o posture é `TEMPLATE_WRITE_EXACT_ALLOWLIST_BLOCKED_PENDING_CANONICAL_PATH_BASIS`;
- o futuro default permanece `create-only`, ainda não operacional;
- mutação permanece `BLOCKED_PENDING_EXPLICIT_MUTATION_BASIS`;
- Future file allowlist e Future path allowlist permanecem sem entries;
- sete famílias, dez categorias e seis namespaces são somente taxonomia documental;
- é necessária fase intermediária antes de `TEMPLATE_WRITE_IMPLEMENTATION`.

## 47. What remains blocked

Permanecem bloqueados implementation, materialization, template creation/write/mutation, leitura de templates existentes por implicação, final bodies, final inventory, rendered outputs, fixtures, snapshots, support-layer physical finalization, placeholder values, Target-dependent filling/mapping, final trace structure/path/inventory/schema, source mirror, `/docs` dump, persisted report, checker, validator, medidor, parser, renderer, schema, materializer, threshold enforcement, numeric thresholds, final audit approach, Target real, GitHub, branch, commit, PR, skill produtiva, Aggregator change e décimo check.

## 48. What cannot be finalized yet

Não podem ser finalizados:

- exact filenames e exact paths de templates dev;
- file-to-family e file-to-category mapping;
- canonical body basis por arquivo;
- final template bodies e executable inventory;
- physical support-layer structure;
- rendered output e fixture/snapshot strategy;
- parser/renderer/schema e validation strategy;
- audit approach e thresholds numéricos;
- Target-dependent mapping, adapter e filling;
- trace structure, path, inventory e schema;
- implementation ou dev-only materialization strategy;
- qualquer mutation basis para templates existentes.

## 49. Forbidden inferences

É proibido inferir:

- que autorização condicional equivale a write approval;
- que shape conceitual equivale a path final;
- que `<agent>` ou `**` equivale a expansão autorizada;
- que famílias ou categorias determinam filenames;
- que existência de template dev determina style, body, path ou mutation basis;
- que os 57 placeholders determinam values, schema ou file mapping;
- que Target-level shape autoriza Target real;
- que trace auditability autoriza estrutura ou persistência;
- que qualitative anti-bloat autoriza thresholds numéricos;
- que documentação funciona como checker, validator ou schema;
- que support layer forma terceira matriz;
- que ausência de entry permite escrita discricionária.

## 50. Allowed future decision paths

São permitidos somente estes caminhos documentais futuros, cada qual com prompt e escopo próprios:

1. decisão intermediária de exact filenames, exact dev paths e canonical body basis, sem escrever templates e sem ler templates existentes;
2. nova revisão da exact allowlist, somente se a fase intermediária produzir base canônica suficiente;
3. `TEMPLATE_WRITE_IMPLEMENTATION` dev-only e `create-only`, somente após exact allowlist aprovada e repetida integralmente no prompt;
4. fases separadas posteriores para mutation basis, outputs, validation strategy, audit method, thresholds, Target mapping ou materialization, se explicitamente autorizadas.

Pular qualquer etapa mantém o bloqueio.

## 51. Recommended safe next phase

Recomenda-se a fase intermediária documental:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_PATH_FILENAME_AND_BODY_BASIS_DECISION`

Ela deve ser dev-only, read-limited, documentation-only e fail-closed. Deve decidir, sem criar templates: filenames literais candidatos, paths literais dentro da skill dev, origem canônica de cada path, associação às sete famílias e dez categorias, body basis rastreável por arquivo sem body final, namespaces permitidos e colisão/preexistence rules. Não deve ler templates existentes, usar Target, criar outputs ou mecanismos, nem autorizar escrita.

Somente depois de base suficiente e de nova exact allowlist aprovada poderá ser considerada:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_PROJECT_LOCAL_AGENT_MICRO_PACK_TEMPLATE_WRITE_IMPLEMENTATION`

## 52. Explicit non-authorization

Este documento não autoriza:

- implementação ou materialização;
- template creation, write ou mutation na fase atual;
- leitura, cópia, reuso ou comparação de templates existentes;
- final template bodies ou inventory;
- rendered outputs, fixtures, snapshots ou reports;
- placeholder values, Target-dependent filling ou mapping;
- support-layer physical finalization;
- trace final structure, path, inventory ou schema;
- source mirror, `/docs` dump, kernel copy ou Senior Agent Profile copy;
- parser, renderer, schema, validator, checker, medidor ou materializer;
- threshold enforcement ou numeric thresholds;
- Target real, Target adapter ou Target write approval;
- GitHub, branch, commit ou PR;
- acesso ou alteração da skill produtiva;
- alteração de `README.md`, `MANIFEST.md`, contracts, scripts, tests ou validation harness;
- alteração do Aggregator, seus nove child checks ou criação de décimo check;
- alteração da matriz `12/24/2` ou criação de terceira matriz;
- execução de `TEMPLATE_WRITE_IMPLEMENTATION` antes de exact allowlist aprovada.

Qualquer file, path, body, placeholder use ou ação não explicitamente allowlisted por decisão futura aprovada permanece proibido.
