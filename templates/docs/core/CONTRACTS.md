SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Contracts

## Objetivo
Registrar apenas padrões de contrato realmente úteis para navegação e implementação. Este arquivo deve mostrar onde os contratos vivem, quais convenções importam e quais contratos são sensíveis, sem virar dump de DTOs, endpoints, interfaces ou payloads.

## Como usar este arquivo
- documentar o padrão e a localização dos contratos; quando houver volume alto, apontar o path em vez de copiar tudo
- registrar convenções estruturais, naming, versionamento e compatibilidade apenas quando forem recorrentes ou sensíveis
- destacar só contratos críticos, representativos ou especialmente sensíveis

## Onde os contratos vivem
| Tipo de contrato ou padrão | Path principal | O que governa | Escopo |
| --- | --- | --- | --- |
| `<DTO, schema, interface, event, payload, client, boundary ou convenção>` | `<path>` | `<o que esse artefato governa>` | `global | unit:<unit-slug>` |
| `<DTO, schema, interface, event, payload, client, boundary ou convenção>` | `<path>` | `<o que esse artefato governa>` | `global | unit:<unit-slug>` |

## Convenções estruturais
- naming de DTOs, requests, responses, events, commands ou interfaces: `<convenção observável>`
- compatibilidade, versionamento ou evolução de contrato: `<regra observável>`
- boundary de definição e consumo: `<onde contrato nasce e onde costuma ser consumido>`

## Padrões e exemplos representativos
| Padrão | Exemplo curto | Onde se aplica | Sensibilidade |
| --- | --- | --- | --- |
| `<padrão recorrente>` | `<exemplo curto e representativo>` | `<superfície ou path>` | `baixa | média | alta` |
| `<padrão recorrente>` | `<exemplo curto e representativo>` | `<superfície ou path>` | `baixa | média | alta` |

## Contratos sensíveis
- `<contrato ou boundary cuja mudança exige cuidado extra>`
- `<contrato ou boundary cuja mudança exige cuidado extra>`

## Ambiguidades, lacunas e limites
- usar `principais contratos observados` quando a evidência vier de amostragem forte
- `TBD-001` — `<ambiguidade real de nomenclatura>`
- `TBD-002` — `<lacuna real de localização ou ownership>`

## Referências
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `docs/core/RULES.md`
- `docs/core/TESTING.md`
