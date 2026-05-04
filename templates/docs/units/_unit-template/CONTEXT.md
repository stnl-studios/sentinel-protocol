SCOPE: unit
UNIT: <unit-slug>
UNIT CLASS: app | api | mobile | worker | package | bff | admin | TBD
LAST UPDATED: YYYYMMDD

# Unit Context

## Objetivo
Ser o mapa factual curto da unit. Este documento especializa o recorte local sem contrariar `docs/core/*` e explica o que esta unit faz, quais superfícies locais importam e onde estão as principais referências observáveis, sem virar arquivo de regras, contratos ou política de testes.

## Papel da unit no projeto
Descreva em poucas linhas o que esta unit entrega, para quem ela existe e como se conecta ao restante do projeto.

## Escopo local observável
- `<escopo local 1>`
- `<escopo local 2>`

## Fora de escopo local
- `<fora de escopo 1>`
- `<fora de escopo 2>`

## Superfícies e entrypoints locais
| Superfície | Path principal | Entrypoint ou boundary | Papel |
| --- | --- | --- | --- |
| `<área ou módulo>` | `<path>` | `<path ou comando>` | `<papel>` |
| `<área ou módulo>` | `<path>` | `<path ou comando>` | `<papel>` |

## Integrações e dependências locais
- `<integração, dependência ou fronteira que afeta esta unit>`
- `<integração, dependência ou fronteira que afeta esta unit>`

## Linguagem local
| Termo | Significado local | Onde aparece |
| --- | --- | --- |
| `<termo>` | `<significado observável>` | `<path ou fluxo>` |
| `<termo>` | `<significado observável>` | `<path ou fluxo>` |

## Hot paths / onde mexer primeiro
- `<path ou fluxo que concentra mudança útil>`
- `<path ou fluxo que concentra mudança útil>`

## Lacunas factuais e TBDs locais
- `<lacuna, risco factual ou limitação local>`
- `TBD-001` — `<lacuna local>`

## Referências
- `docs/core/CONTEXT.md`
- `docs/units/<unit-slug>/RULES.md`
- `docs/units/<unit-slug>/STATE.md`
- `docs/units/<unit-slug>/CONTRACTS.md` quando existir
- `docs/units/<unit-slug>/TESTING.md`
- `docs/units/<unit-slug>/UI_KIT.md` quando a unit for visual
