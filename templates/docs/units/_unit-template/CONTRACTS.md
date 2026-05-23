SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

## File Purpose Header
- purpose: Mapa de contratos e convenções locais da unit.
- read_when: A mudança toca DTO, payload, event, interface, boundary ou convenção local desta unit.
- do_not_use_for: Contratos globais, regras, estado estrutural, testes, execução ou inventário completo.
- canonical_source_for: Localização, convenções e contratos locais representativos ou sensíveis.
- canonical_source_not_for: Contratos globais, implementação completa, regras locais ou matriz de validação.
- update_owner: `stnl_project_context`; em greenfield, `stnl_project_foundation` até handoff.
- downstream_consumers: `planner`, `validation-eval-designer`, `execution-package-designer`, coders, `reviewer`.
- token_policy: Ler só o tipo de contrato afetado; abrir paths fonte quando compatibilidade exigir exatidão.
- related_files: `docs/core/CONTRACTS.md`, `docs/units/<unit-slug>/CONTEXT.md`, `RULES.md`, `STATE.md`, `TESTING.md`.

# Unit Contracts

> Template opcional. Criar apenas quando a unit tiver vocabulário, camadas, boundaries ou contratos locais que não caibam bem em `docs/core/CONTRACTS.md`.

## Objetivo
Registrar apenas padrões, convenções e localização dos contratos locais da unit. Este arquivo não deve virar inventário prolixo nem espelho da codebase.

## Como usar este arquivo
- documentar o padrão local e o path onde ele vive; se houver muitos contratos, apontar a localização em vez de copiar volume
- registrar convenções de naming, DTOs, payloads, events, interfaces e boundaries apenas quando forem recorrentes ou sensíveis
- destacar só contratos representativos ou críticos para manutenção local

## Onde os contratos locais vivem
| Tipo de contrato ou padrão | Path principal | O que governa |
| --- | --- | --- |
| `<DTO, schema, interface, event, payload, boundary ou convenção>` | `<path>` | `<obs>` |
| `<DTO, schema, interface, event, payload, boundary ou convenção>` | `<path>` | `<obs>` |

## Convenções locais de contrato
- naming de requests, responses, commands, events ou interfaces: `<convenção>`
- compatibilidade, versionamento ou evolução: `<regra local>`
- origem e consumo dos contratos: `<onde definem e onde costumam ser usados>`

## Contratos representativos ou sensíveis
| Padrão | Exemplo curto | Sensibilidade |
| --- | --- | --- |
| `<padrão recorrente>` | `<exemplo curto>` | `baixa | média | alta` |
| `<padrão recorrente>` | `<exemplo curto>` | `baixa | média | alta` |

## Ambiguidades, lacunas e TBDs
- `TBD-001` — `<ambiguidade local>`
- `TBD-002` — `<lacuna local>`

## Referências
- `docs/core/CONTRACTS.md`
- `docs/units/<unit-slug>/RULES.md`
- `docs/units/<unit-slug>/STATE.md`
- `docs/units/<unit-slug>/TESTING.md`
