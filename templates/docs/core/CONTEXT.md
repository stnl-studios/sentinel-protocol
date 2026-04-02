SCOPE: core
PROJECT: <project-name>
REPO SHAPE: single-unit | multi-unit | TBD
LAST UPDATED: YYYYMMDD

# Core Context

## Objetivo
Registrar a base factual global do projeto com a maior densidade honesta que a evidência sustentar. Este documento deve explicar o que o projeto é, qual domínio cobre, quais superfícies existem e onde estão as principais referências observáveis, sem virar arquivo de regras, contratos ou política de testes.

## Visão factual do projeto
Descreva o que o projeto é, qual problema cobre, quem depende dele e qual papel esta codebase sustenta. Se a visão vier de evidência parcial, marcar isso explicitamente.

## Escopo observável
- `<escopo real 1>`
- `<escopo real 2>`
- `<escopo real 3>`

## Fora de escopo
- `<fora de escopo 1>`
- `<fora de escopo 2>`

## Superfícies principais
| Superfície | Paths principais | Entrypoint(s) observáveis | Papel operacional |
| --- | --- | --- | --- |
| `<unit-ou-area>` | `<path>` | `<path-ou-comando>` | `<papel>` |
| `<unit-ou-area>` | `<path>` | `<path-ou-comando>` | `<papel>` |

## Integrações e dependências relevantes
- `<integração externa, dependência local ou fronteira que afeta entendimento global>`
- `<integração externa, dependência local ou fronteira que afeta entendimento global>`

## Linguagem do domínio
| Termo | Significado observável | Onde aparece |
| --- | --- | --- |
| `<termo-canônico>` | `<significado factual>` | `<path, fluxo ou superfície>` |
| `<termo-canônico>` | `<significado factual>` | `<path, fluxo ou superfície>` |

## Hot paths / onde mexer primeiro
- `<path, entrypoint ou área que costuma concentrar mudança relevante>`
- `<path, entrypoint ou área que costuma concentrar mudança relevante>`

## Fronteiras principais observáveis
- forma da codebase: `single-unit | multi-unit | TBD`
- `<fronteira entre superfícies ou bounded contexts>`
- `<fronteira entre superfícies ou bounded contexts>`

## Lacunas factuais e limites de exaustividade
Registrar apenas lacunas que afetam o entendimento global do projeto. Quando a leitura vier de amostragem forte, assumir wording como `principais pontos observados` em vez de simular inventário total.

- `TBD-001` — `<lacuna global>`
- `TBD-002` — `<lacuna global>`

## Referências
- `docs/INDEX.md`
- `docs/core/RULES.md`
- `docs/core/STATE.md`
- `docs/core/CONTRACTS.md`
- `docs/core/TESTING.md`
- docs complementares do projeto, se existirem
