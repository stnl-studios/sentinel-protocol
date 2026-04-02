SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Contracts

## Objetivo
Registrar vocabulário canônico, padrões nomeados e localização dos contratos observáveis do projeto. Este arquivo serve como apoio direto para execução e especialização futura dos coders e não deve virar inventário prolixo nem fingir cobertura total sem evidência.

## Vocabulário canônico
Preencher apenas com termos que realmente existam no projeto.

| Categoria | Termo canônico | Papel | Observação curta |
| --- | --- | --- | --- |
| apresentação | `<Page | Screen | View | Component | TBD>` | `<papel>` | `<obs>` |
| aplicação | `<UseCase | Service | Handler | Facade | TBD>` | `<papel>` | `<obs>` |
| persistência | `<Repository | Gateway | Adapter | TBD>` | `<papel>` | `<obs>` |
| integração | `<Client | Consumer | Publisher | Webhook | TBD>` | `<papel>` | `<obs>` |

## Localização de contratos e padrões
| Contrato ou padrão | Path principal | Observável relevante | Escopo |
| --- | --- | --- | --- |
| `<tipo, schema, interface, boundary ou convenção>` | `<path>` | `<o que esse artefato governa>` | `global | unit:<unit-slug>` |
| `<tipo, schema, interface, boundary ou convenção>` | `<path>` | `<o que esse artefato governa>` | `global | unit:<unit-slug>` |

## Entrypoints e fronteiras observáveis
- `<entrypoint, boundary ou integração principal>`
- `<entrypoint, boundary ou integração principal>`

## Ambiguidades, lacunas e limites
- usar `principais contratos observados` quando a evidência vier de amostragem forte
- `TBD-001` — `<ambiguidade real de nomenclatura>`
- `TBD-002` — `<lacuna real de localização ou ownership>`

## Referências
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `docs/core/RULES.md`
