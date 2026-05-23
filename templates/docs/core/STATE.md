SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

## File Purpose Header
- purpose: Fotografia factual global da estrutura, entrypoints e superfícies observáveis.
- read_when: Um agente precisa localizar onde algo existe antes de abrir código ou docs locais.
- do_not_use_for: Regras, contratos detalhados, testes, decisão de arquitetura ou autorização de mudança.
- canonical_source_for: Mapa global de paths, entrypoints, módulos, jobs, pipelines e superfícies.
- canonical_source_not_for: Significado de domínio, regras, contratos sensíveis, política de validação ou lacunas consolidadas.
- update_owner: `stnl_project_context`; em greenfield, `stnl_project_foundation` até handoff.
- downstream_consumers: `orchestrator`, `planner`, `execution-package-designer`, coders, `reviewer`, `resync`.
- token_policy: Ler tabelas de localização; abrir arquivos do repo apenas quando o cut exigir evidência atual.
- related_files: `docs/core/CONTEXT.md`, `docs/core/RULES.md`, `docs/core/CONTRACTS.md`, `docs/core/TESTING.md`, `docs/units/*/STATE.md`.

# Core State

## Objetivo
Manter uma fotografia factual e operacional do repo para localização rápida. Este documento deve mapear o que existe hoje e onde fica cada superfície relevante, sem virar narrativa de domínio, regras ou política de teste.

## Snapshot do repo
- formato: `single-unit | multi-unit | TBD`
- path raiz principal: `<path>`
- organização visível dominante: `<resumo curto>`
- limites observados da leitura: `<amostragem forte | leitura ampla | TBD>`

## Superfícies principais
| Superfície | Tipo | Path principal | Status |
| --- | --- | --- | --- |
| `<superfície>` | `app | api | worker | package | admin | mobile | TBD` | `<path>` | `present | partial | TBD` |
| `<superfície>` | `app | api | worker | package | admin | mobile | TBD` | `<path>` | `present | partial | TBD` |

## Entrypoints e superfícies úteis
| Entrada | Tipo | Path | Uso rápido |
| --- | --- | --- | --- |
| `<entrypoint>` | `app | route | api | cli | job | worker | pipeline | TBD` | `<path>` | `<observação curta>` |
| `<entrypoint>` | `app | route | api | cli | job | worker | pipeline | TBD` | `<path>` | `<observação curta>` |

## Áreas compartilhadas e módulos relevantes
| Área | Path | Papel operacional |
| --- | --- | --- |
| `<shared-area>` | `<path>` | `<papel>` |
| `<shared-area>` | `<path>` | `<papel>` |

## Jobs, pipelines e rotinas operacionais
| Fluxo | Path ou comando | Papel |
| --- | --- | --- |
| `<job, pipeline ou rotina>` | `<path ou comando>` | `<papel operacional>` |
| `<job, pipeline ou rotina>` | `<path ou comando>` | `<papel operacional>` |

## Testes existentes e localização rápida
| Suite ou tipo | Path principal | Escopo |
| --- | --- | --- |
| `<suite, pasta ou harness>` | `<path>` | `<o que cobre>` |
| `<suite, pasta ou harness>` | `<path>` | `<o que cobre>` |

## Hot paths / onde mexer primeiro
- `<path ou arquivo que concentra mudanças frequentes ou críticas>`
- `<path ou arquivo que concentra mudanças frequentes ou críticas>`

## Observações factuais
- `<fato operacional 1>`
- `<fato operacional 2>`

## Lacunas e limites de exaustividade
- `<lacuna ou limite real>`

## Referências
- `docs/core/CONTEXT.md`
- `docs/core/RULES.md`
- `docs/core/CONTRACTS.md`
- `docs/core/TESTING.md`
