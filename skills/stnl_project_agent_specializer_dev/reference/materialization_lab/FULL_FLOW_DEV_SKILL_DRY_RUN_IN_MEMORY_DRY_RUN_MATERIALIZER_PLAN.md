# Full-Flow Dev-Skill Dry-Run In-Memory Dry-Run Materializer Plan

## 1. Title

`FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_DRY_RUN_MATERIALIZER_PLAN`

This document records a dev-only, reference-only plan for a future conceptual
full-flow package dry-run materializer. It is a plan artifact only.

## 2. Status

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_DRY_RUN_MATERIALIZER_PLAN: READY`

This document is documentation-only, reference-only, dev-only, plan-only,
non-runtime, non-CLI, non-schema, non-checker, non-Aggregator child,
non-authorizing, in-memory-first, no-write, no Target real, no GitHub, no
productive skill, and no real materialization.

Nenhum Target real, GitHub ou skill produtiva é acessado.

## 3. Audit Failure Context

The previous audit failed because the dry-run materializer plan existed only
as textual phase output and did not exist as a local, discoverable, auditable
artifact inside the dev skill.

Este documento corrige somente a ausência documental do plano.

This document corrects only that documentation gap. It does not implement a
materializer, alter scripts, alter tests, create a checker, change the
Aggregator, create a runtime surface, authorize writes, or materialize agents.

## 4. Purpose

The purpose of this plan is to describe a future conceptual package-level,
in-memory, no-write dry-run materializer for the full-flow dev skill.

The future component would reason over an approved package result and a
conceptual output inventory. It would remain package-level and in-memory. It
would not interact with a real Target, GitHub, the productive skill, or any
write surface.

## 5. Critical Disambiguation

The current dev lab already contains:

- `scripts/materialization_lab/dry-run-only-materializer-prototype.mjs`;
- `scripts/materialization_lab/dry-run-only-materializer-prototype.test.mjs`.

Those files are existing dev-lab prototypes. They are not the future full-flow
package dry-run materializer described by this plan.

O futuro full-flow package dry-run materializer ainda não está implementado.

This document is the plan/documentation artifact only. It is not an
implementation and does not create operational capacity.

O protótipo dry-run-only existente não é autorização para materialização real.

The existing prototype does not authorize extrapolation to a real Target,
writer, real renderer, loader, runtime, CLI, official schema, stdout contract,
Target Adapter, Write Approval, Aggregator child, checker, tenth check, or
productive-skill flow.

Dry-run materializer não é writer.
Dry-run materializer não é renderer real.
Dry-run materializer não é loader.
Dry-run materializer não é Target Adapter.
Dry-run materializer não é Write Approval.

## 6. Proposed Definition

The future dry-run materializer is defined only as a conceptual component that
could assemble in-memory objects from a package result, conceptual output
shapes, and an inventory of target-root-relative outputs.

It could group planned artifacts by conceptual target family and preserve
no-write and non-authorization evidence. It would not render final content,
write files, read a real Target, resolve real filesystem paths, stat or list a
Target, persist reports, generate materialized output, or authorize
materialization.

The definition is intentionally narrower than a renderer, writer, loader,
Target Adapter, Write Approval surface, runtime, CLI, public API, official
schema, stdout contract, checker, or Aggregator child.

## 7. Relationship To Current Flow

Conceptual flow:

- package sources;
- composer in-memory;
- package orchestrator;
- package review flow;
- future conceptual dry-run materializer.

The future dry-run materializer would be downstream of the package-level
review understanding but would not replace the orchestrator, smoke, local
mapper, or review layer.

It would not make `REVIEW_PASS` authorizing, and it would not convert package
review into write approval.

## 8. Conceptual Inputs

| input | origem | uso conceitual | limite |
| --- | --- | --- | --- |
| package result aprovado | package orchestrator plus package review flow | Base in-memory para planejar inventário conceitual de outputs | Não autoriza escrita, Target real ou materialização |
| review verdict não autorizante | package result review layer | Preservar que `REVIEW_PASS` é apenas boundary review | Não vira approval token ou Write Approval |
| canonical agents | package model | Confirmar cobertura dos 12 agentes canônicos | Não cria agentes nem materializa por agente |
| canonical kernel mapping | kernel mapping conceitual do pacote | Confirmar relacionamento conceitual agente/kernel | Não lê, resolve ou aplica kernel em Target real |
| source coverage summary | cobertura de fontes do pacote | Preservar rastreabilidade conceitual | Não acessa skill produtiva nem fontes fora da dev skill |
| template summary | templates canônicos esperados | Relacionar templates a output shapes | Não renderiza conteúdo final |
| conceptual output shapes | plano target-root-relative | Descrever formas esperadas de saída | Não resolve paths reais |
| Codex target-level artifact summary | resumo de `.codex/config.toml` e `AGENTS.md` | Separar artifacts target-level dos agentes | Não conta esses artifacts como agentes |
| no-write evidence | evidência in-memory do fluxo | Bloquear qualquer ambiguidade de escrita | Campos ausentes, true, renomeados ou contraditórios bloqueiam pass futuro |
| non-authorization evidence | evidência in-memory do fluxo | Preservar negações explícitas | Todos os valores devem permanecer exatamente false |

## 9. Conceptual Outputs

| output | finalidade | natureza | limite |
| --- | --- | --- | --- |
| package-level dry-run materialization plan | Representar plano conceitual do pacote completo | In-memory, documentation-aligned | Não é output materializado |
| conceptual output inventory | Listar artifacts planejados por forma conceitual | In-memory/no-write | Não cria arquivos |
| target-root-relative path list | Mostrar paths conceituais relativos à raiz do Target | Conceitual | Não resolve, lista, stat ou lê Target real |
| template-to-output mapping | Relacionar templates obrigatórios a output shapes | Planejamento in-memory | Não renderiza templates |
| per-target artifact grouping | Agrupar artifacts por família Copilot/Codex e target-level | Conceitual | Não acessa diretórios reais |
| blocked/unsafe signals | Registrar sinais que impediriam pass futuro | Fail-closed | Não corrige nem aplica patches |
| no-write evidence preservation | Preservar evidência sem escrita | In-memory evidence | Não persiste relatório |
| non-authorization evidence preservation | Preservar negações de autorização | In-memory evidence | Não emite token, assinatura ou aprovação |

## 10. Canonical Package Model

The canonical package contains exactly 12 agents:

- orchestrator;
- planner;
- validation-eval-designer;
- execution-package-designer;
- designer;
- coder-frontend;
- coder-backend;
- coder-ios;
- validation-runner;
- reviewer;
- finalizer;
- resync.

The package model preserves:

- 12 x copilot;
- 12 x codex;
- `.codex/config.toml` as a target-level artifact;
- `AGENTS.md` as a target-level artifact.

`.codex/config.toml` and `AGENTS.md` are not agents and must not be counted as
agents. They do not increase the canonical agent count beyond 12.

## 11. Templates And Output Shapes

Mandatory templates:

- `reference/templates/copilot/agent.md`;
- `reference/templates/codex/agent.toml`;
- `reference/templates/codex/config.toml`;
- `reference/templates/codex/AGENTS.md`.

Conceptual output shapes:

- `.github/agents/<agent>.agent.md`;
- `.codex/agents/<agent>.toml`;
- `.codex/config.toml`;
- `AGENTS.md`.

All paths above are target-root-relative conceptual paths. They are not real
resolved filesystem paths and must not be used for Target access.

## 12. Boundary Matrix

| superfície | permitido conceitualmente | proibido | evidência esperada |
| --- | --- | --- | --- |
| package | Planejar pacote completo in-memory | Materialização agent-by-agent ou parcial | 12 agentes canônicos preservados |
| paths | Listar shapes target-root-relative conceituais | Resolver, stat, listar ou ler paths reais | `filesystem_stat_attempted: false` e `directory_listing_attempted: false` |
| templates | Mapear templates obrigatórios para shapes | Renderizar conteúdo final ou alterar templates | Template summary in-memory |
| Codex config/AGENTS.md | Tratar como artifacts target-level | Contar como agentes | Separação explícita do modelo 12-agent |
| escrita | Preservar no-write evidence | File write, patch, report, snapshot, cache, stdout capture persistido | `target_write_attempted: false` e `files_written: []` |
| Target | Usar somente conceito target-root-relative | Target real read/write/list/stat | `target_read_attempted: false` |
| GitHub | Nenhum uso | GitHub write, branch, commit, PR | `github_write_attempted: false` |
| skill produtiva | Nenhum acesso | Ler, usar como fonte ou modificar skill produtiva | `productive_skill_mutation_attempted: false` |
| autorizações | Preservar negações | Approval token, registry, signature, signer, Write Approval | `approval_token_issued: false` |
| Aggregator | Manter fechado | Alterar Aggregator ou registrar materializer | Aggregator permanece fechado em exatamente 9 checks. |
| checker/décimo check | Nenhum novo checker | Criar checker, Aggregator child ou décimo check | Nenhum novo check registrado |
| runtime/CLI/schema | Nenhuma superfície operacional | Runtime, CLI, schema oficial, stdout contract | Documento permanece plan-only |

## 13. No-Write Evidence

Future evidence must preserve these mandatory fields and expected values:

```text
target_read_attempted: false
target_write_attempted: false
filesystem_stat_attempted: false
directory_listing_attempted: false
file_content_read_attempted: false
files_written: []
persistent_report_written: false
github_write_attempted: false
productive_skill_mutation_attempted: false
approval_token_issued: false
write_executed: false
patch_applied: false
commit_created: false
branch_created: false
pull_request_created: false
```

Missing, true, renamed, softened, or contradictory evidence blocks any future
pass. There is no permissive fallback for absent evidence.

## 14. Non-Authorization Evidence

Future non-authorization evidence must preserve explicit false values for:

- real materialization;
- real Target read;
- real Target write;
- filesystem access against real Target;
- real writer;
- real renderer;
- real loader;
- real scenario selector;
- real Target Adapter;
- real Write Approval;
- approval token;
- approval registry;
- approval signature;
- signer;
- persistent report;
- generated output;
- materialized output;
- patch or diff application;
- GitHub write;
- productive skill access;
- productive skill mutation;
- commit;
- branch;
- pull request;
- Aggregator change;
- checker creation;
- tenth check.

All values must remain exactly false. Any missing, softened, renamed,
contradictory, or positive authorization signal blocks future pass.

## 15. REVIEW_PASS And Future DRY_RUN_PASS Semantics

`REVIEW_PASS` does not authorize materialization. It only means the in-memory
review layer accepted the package result within its non-authorizing boundary.

Any future `DRY_RUN_PASS` is also non-authorizing. DRY_RUN_PASS futuro não
autoriza escrita.

A future `DRY_RUN_PASS` must not authorize writing, real Target access, GitHub
access, productive-skill access, Aggregator changes, checker creation, tenth
check creation, real materialization, patch application, branch creation,
commit creation, pull request creation, or persistent output.

## 16. Options Evaluated

| option | decision | reason |
| --- | --- | --- |
| `OPTION_A_KEEP_READINESS_CONCEPTUAL_ONLY` | Rejected | Keeps readiness textual only and does not correct the missing local auditable plan artifact |
| `OPTION_B_PLAN_IN_MEMORY_PACKAGE_DRY_RUN_MATERIALIZER` | Recommended | Creates a local documentation-only plan for a future in-memory/no-write package dry-run materializer |
| `OPTION_C_PLAN_RENDER_CONTEXT_PLUS_DRY_RUN_MATERIALIZER_TOGETHER` | Rejected | Risks scope expansion into renderer planning |
| `OPTION_D_PLAN_RENDERER_WRITER_LOADER_TARGET_ADAPTER` | Rejected | Introduces explicitly blocked operational surfaces |
| `OPTION_E_PLAN_RUNTIME_CLI_SCHEMA_OR_STDOUT_CONTRACT` | Rejected | Introduces runtime, CLI, schema, or stdout-contract creep |
| `OPTION_F_PLAN_TARGET_REAL_OR_GITHUB_OR_PRODUCTIVE_SKILL` | Rejected | Violates no Target real, no GitHub, and no productive skill boundaries |
| `OPTION_G_REGISTER_DRY_RUN_MATERIALIZER_IN_AGGREGATOR` | Rejected | Violates the closed 9-check Aggregator boundary |

Recommendation:

`OPTION_B_PLAN_IN_MEMORY_PACKAGE_DRY_RUN_MATERIALIZER`

## 17. Risks And Mitigations

| risk | mitigation |
| --- | --- |
| materializer naming creep | Always qualify as future conceptual dry-run materializer, in-memory/no-write only |
| renderer creep | State that the dry-run materializer does not render final content |
| writer creep | Preserve `target_write_attempted: false`, `files_written: []`, and `write_executed: false` |
| loader creep | Deny loader behavior and avoid real filesystem discovery |
| Target Adapter creep | Keep target paths target-root-relative and conceptual only |
| Write Approval creep | Preserve approval token, registry, signature, and signer as false/nonexistent |
| runtime creep | Keep the plan non-runtime and non-CLI |
| schema creep | Do not define an official schema or public API |
| Aggregator creep | Keep the Aggregator closed at exactly 9 checks |
| evidence weakening | Treat missing, true, renamed, softened, or contradictory evidence as blocking |
| agent-by-agent regression | Preserve package-level proof over the complete 12-agent model |
| productive skill contamination | Keep productive skill access and mutation explicitly denied |

## 18. Next Phase Recommendation

Recommended single next phase:

`MATERIALIZATION_FULL_FLOW_DEV_SKILL_DRY_RUN_IN_MEMORY_DRY_RUN_MATERIALIZER_PLAN_AUDIT_RETRY`

The next phase must be documentation-only, audit-only, read-only, no-write,
non-runtime, non-CLI, non-schema, non-checker, non-Aggregator child,
non-authorizing, no Target real, no GitHub, no productive skill, and no real
materialization.

It must audit this now-existing local document as the plan artifact.

## 19. Explicitly Blocked Phases

The following phases remain blocked:

- implementation of the materializer;
- renderer;
- writer;
- loader;
- Target Adapter;
- Write Approval;
- runtime;
- CLI;
- schema oficial;
- stdout contract;
- Target real;
- GitHub;
- skill produtiva;
- output persistido;
- relatório;
- snapshot;
- cache;
- materialização de agentes;
- Aggregator change;
- checker novo;
- décimo check.

These items require separate authorization and are not enabled by this plan.

## 20. Conclusion

This document makes the dry-run materializer plan auditable as a local
reference artifact inside the dev skill.

It does not implement or authorize real materialization. It does not create a
runtime, CLI, schema, checker, Aggregator child, writer, renderer, loader,
Target Adapter, Write Approval surface, Target access, GitHub flow, productive
skill access, output, report, snapshot, cache, branch, commit, or pull request.

The next step should be a separate read-only audit retry against this document.
