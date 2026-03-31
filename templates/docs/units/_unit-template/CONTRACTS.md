SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# Unit Contracts

> Template opcional. Criar apenas quando a unit tiver vocabulário, camadas, boundaries ou contratos locais que não caibam bem em `docs/core/CONTRACTS.md`.

## Objetivo
Registrar nomenclatura, padrões e localização dos contratos locais da unit. Este arquivo serve como apoio direto para especialização dos coders por projeto e não deve virar inventário prolixo.

## Vocabulário local
| Categoria | Termo canônico | Papel | Observação curta |
| --- | --- | --- | --- |
| apresentação | `<termo>` | `<papel>` | `<obs>` |
| aplicação | `<termo>` | `<papel>` | `<obs>` |
| persistência | `<termo>` | `<papel>` | `<obs>` |
| integração | `<termo>` | `<papel>` | `<obs>` |

## Localização de contratos e padrões
| Contrato ou padrão | Path principal | Observação |
| --- | --- | --- |
| `<tipo, interface, schema, boundary ou convenção>` | `<path>` | `<obs>` |
| `<tipo, interface, schema, boundary ou convenção>` | `<path>` | `<obs>` |

## Ambiguidades e TBDs
- `TBD-001` — `<ambiguidade local>`
- `TBD-002` — `<lacuna local>`

## Referências
- `docs/core/CONTRACTS.md`
- `docs/units/<unit-slug>/RULES.md`
- `docs/units/<unit-slug>/STATE.md`
