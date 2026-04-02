SCOPE: core
PROJECT: <project-name>
REPO SHAPE: single-unit | multi-unit | TBD
LAST UPDATED: YYYYMMDD

# Core Context

## Objetivo
Registrar a base factual global do projeto com a maior densidade honesta que a evidência sustentar. Este documento orienta entendimento global, delimita escopo e serve como insumo direto para execução e especialização futura dos agents por projeto.

## Visão factual do projeto
Descreva o que o projeto é, qual problema cobre e qual papel esta codebase sustenta. Se a visão vier de evidência parcial, marcar isso explicitamente.

## Escopo
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

## Dependências locais e fronteiras relevantes
- `<dependência estrutural, integração local ou fronteira importante>`
- `<dependência estrutural, integração local ou fronteira importante>`

## Hot paths / onde mexer primeiro
- `<path, entrypoint ou área que costuma concentrar mudança relevante>`
- `<path, entrypoint ou área que costuma concentrar mudança relevante>`

## Base para agents
- forma da codebase: `single-unit | multi-unit | TBD`
- fronteiras principais entre superfícies
- termos e áreas que qualquer agent precisa reconhecer cedo
- pontos de entrada úteis para descoberta rápida

## Lacunas e limites de exaustividade
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
