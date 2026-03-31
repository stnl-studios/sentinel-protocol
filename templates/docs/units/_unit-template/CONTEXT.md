SCOPE: unit
UNIT: <unit-slug>
UNIT CLASS: app | api | mobile | worker | package | bff | admin | TBD
LAST UPDATED: YYYYMMDD

# Unit Context

## Objetivo
Ser o mapa factual curto da unit. Este documento especializa o recorte local sem contrariar `docs/core/*` e serve como base mínima para especialização futura dos agents por projeto.

## Papel da unit no projeto
Descreva em poucas linhas o que esta unit entrega, para quem ela existe e como se conecta ao restante do projeto.

## Escopo local
- `<escopo local 1>`
- `<escopo local 2>`

## Fora de escopo local
- `<fora de escopo 1>`
- `<fora de escopo 2>`

## Superfícies principais
| Superfície | Path principal | Papel |
| --- | --- | --- |
| `<área ou módulo>` | `<path>` | `<papel>` |
| `<área ou módulo>` | `<path>` | `<papel>` |

## Base útil para especialização dos agents
- fronteiras locais relevantes
- dependências ou integrações principais
- termos e áreas que um agent precisa reconhecer cedo

## Riscos e TBDs locais
- `<risco ou limitação local>`
- `TBD-001` — `<lacuna local>`

## Referências
- `docs/core/CONTEXT.md`
- `docs/core/RULES.md`
- `docs/units/<unit-slug>/RULES.md`
- `docs/units/<unit-slug>/STATE.md`
- `docs/units/<unit-slug>/TESTING.md`
- `docs/units/<unit-slug>/CONTRACTS.md` quando existir
- `docs/units/<unit-slug>/UI_KIT.md` quando a unit for visual
