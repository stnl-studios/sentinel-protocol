SCOPE: core
PROJECT: <project-name>
REPO SHAPE: single-unit | multi-unit | TBD
LAST UPDATED: YYYYMMDD

# Context

## 1. Resumo executivo
Descreva em poucas linhas o que este projeto é, qual problema resolve e qual papel este repo sustenta.

## 2. Escopo do projeto
Liste o que este repo cobre de fato hoje.

- `<escopo 1>`
- `<escopo 2>`
- `<escopo 3>`

## 3. Fora de escopo
Liste explicitamente o que não pertence a este repo ou não deve ser presumido.

- `<fora de escopo 1>`
- `<fora de escopo 2>`

## 4. Forma do repo
Explique se o repo é single-unit ou multi-unit e quais units existem.

| Unit | Classe | Path principal | Papel |
| --- | --- | --- | --- |
| `<unit-slug>` | `app | api | mobile | worker | package | bff | admin | TBD` | `<path>` | `<papel>` |

## 5. Mapa de units
Para cada unit relevante, descreva em uma linha:
- o que ela entrega
- com quais units ela se relaciona
- qual a fronteira operacional dela

## 6. Visão macro de arquitetura
Registre apenas a arquitetura transversal do projeto:
- relação entre units
- fronteiras principais
- dependências de alto nível
- integrações estruturais relevantes

## 7. Convenções estruturais relevantes
Registre apenas convenções que ajudam qualquer agente a se orientar no repo.
Não duplicar `RULES.md`.

## 8. Fontes canônicas relacionadas
- `docs/core/RULES.md`
- `docs/core/STATE.md`
- `docs/core/CONTRACTS.md`
- `docs/core/TESTING.md`
- `docs/decisions/INDEX.md`
- docs de unit aplicáveis

## 9. TBDs globais
Registrar somente pendências que afetem o entendimento do projeto como um todo.

- `TBD-001` — `<pergunta ou lacuna global>`
- `TBD-002` — `<pergunta ou lacuna global>`
