SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

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
