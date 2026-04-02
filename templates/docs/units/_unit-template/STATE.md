SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# Unit State

## Objetivo
Ser a fotografia factual curta da estrutura e das superfícies da unit para localização rápida e entendimento operacional local. Este documento deve dizer o que existe e onde fica, sem virar regras, contratos ou política de teste.

## Snapshot da unit
- path raiz: `<path>`
- classe da unit: `app | api | mobile | worker | package | bff | admin | TBD`
- stack principal observada: `<stack>`
- status curto: `present | partial | TBD`

## Estrutura local relevante
| Área | Path | Papel |
| --- | --- | --- |
| `<área>` | `<path>` | `<papel>` |
| `<área>` | `<path>` | `<papel>` |

## Superfícies e entrypoints relevantes
| Superfície | Tipo | Path | Observação |
| --- | --- | --- | --- |
| `<surface>` | `<page | route | screen | controller | handler | job | consumer | component | TBD>` | `<path>` | `<obs>` |
| `<surface>` | `<page | route | screen | controller | handler | job | consumer | component | TBD>` | `<path>` | `<obs>` |

## Boundaries, entradas e saídas úteis
| Entrada ou saída | Path | Uso rápido |
| --- | --- | --- |
| `<entrypoint ou boundary>` | `<path>` | `<obs>` |
| `<entrypoint ou boundary>` | `<path>` | `<obs>` |

## Jobs, pipelines e rotinas locais
| Fluxo | Path ou comando | Papel |
| --- | --- | --- |
| `<job, pipeline ou rotina>` | `<path ou comando>` | `<papel>` |
| `<job, pipeline ou rotina>` | `<path ou comando>` | `<papel>` |

## Testes existentes e localização rápida
| Suite ou tipo | Path principal | Escopo |
| --- | --- | --- |
| `<suite, pasta ou harness>` | `<path>` | `<o que cobre>` |
| `<suite, pasta ou harness>` | `<path>` | `<o que cobre>` |

## Observações factuais
- `<fato operacional 1>`
- `<fato operacional 2>`

## Lacunas e limites de exaustividade
- `<lacuna ou limite real>`

## Referências
- `docs/units/<unit-slug>/CONTEXT.md`
- `docs/units/<unit-slug>/RULES.md`
- `docs/units/<unit-slug>/CONTRACTS.md` quando existir
- `docs/units/<unit-slug>/TESTING.md`
