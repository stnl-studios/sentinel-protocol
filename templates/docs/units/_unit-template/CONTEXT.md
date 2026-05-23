SCOPE: unit
UNIT: <unit-slug>
UNIT CLASS: app | api | mobile | worker | package | bff | admin | TBD
LAST UPDATED: YYYYMMDD

## File Purpose Header
- purpose: Contexto local de uma unit sem contrariar a base global.
- read_when: Um agente trabalha dentro desta unit e precisa entender papel, escopo, superfícies e dependências locais.
- do_not_use_for: Regras globais, contratos completos, matriz de testes, comandos, execução ou work packages.
- canonical_source_for: Papel da unit, escopo local, superfícies, integrações e linguagem local.
- canonical_source_not_for: Verdade global do projeto, regras locais detalhadas, contratos locais ou validação.
- update_owner: `stnl_project_context`; em greenfield, `stnl_project_foundation` até handoff.
- downstream_consumers: `planner`, `execution-package-designer`, coders, `reviewer`, `resync`, agents especializados.
- token_policy: Ler header e seções locais relevantes; voltar para `core` quando a dúvida for global.
- related_files: `docs/core/CONTEXT.md`, `docs/units/<unit-slug>/RULES.md`, `STATE.md`, `CONTRACTS.md`, `TESTING.md`, `UI_KIT.md`.

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
