# Docs Index

## Objetivo
Este índice organiza a base documental do projeto e aponta a fonte de verdade de cada escopo.

## Estrutura ativa

### Core
- [`docs/core/CONTEXT.md`](coreONTEXT.md) — contexto global do projeto, escopo, fora de escopo e TBDs globais.
- [`docs/core/RULES.md`](coreULES.md) — regras globais, stop rules e limites de mudança.
- [`docs/core/STATE.md`](coreTATE.md) — fotografia operacional do repo, units e áreas compartilhadas.
- [`docs/core/CONTRACTS.md`](coreONTRACTS.md) — vocabulário canônico e localização de padrões globais.
- [`docs/core/TESTING.md`](coreESTING.md) — estratégia global de validação.

### Units
Registrar abaixo apenas units reais do projeto.

| Unit | Classe | Path principal | Docs |
| --- | --- | --- | --- |
| `<unit-slug>` | `app | api | mobile | worker | package | bff | admin | TBD` | `<path>` | [`docs/units/<unit-slug>/`](./units/) |

### Features
- `docs/features/` — contexto curto por feature ativa quando aplicável.

### Decisions
- [`docs/decisions/INDEX.md`](decisionsNDEX.md) — índice de ADRs e decisões duráveis.

### Reference
- `docs/reference/` — referência fria e leitura sob gatilho.
- [`docs/reference/DESIGN_SYSTEM.md`](referenceESIGN_SYSTEM.md) — design system central, quando existir.

## Regras de precedência
1. `docs/core/*` governa o projeto inteiro.
2. `docs/units/*` detalha apenas a unit correspondente.
3. `docs/reference/*` entra por necessidade específica; não substitui docs operacionais.
4. Em caso de falta de evidência, registrar `TBD` no `CONTEXT` do escopo correto.

## Leitura mínima sugerida

### Para visão global do projeto
1. `docs/core/CONTEXT.md`
2. `docs/core/RULES.md`
3. `docs/core/STATE.md`
4. `docs/core/TESTING.md`

### Para atuar em uma unit específica
1. `docs/units/<unit-slug>/CONTEXT.md`
2. `docs/units/<unit-slug>/RULES.md`
3. `docs/units/<unit-slug>/STATE.md`
4. `docs/units/<unit-slug>/TESTING.md`
5. `docs/units/<unit-slug>/CONTRACTS.md` quando existir
6. `docs/units/<unit-slug>/UI_KIT.md` quando a unit for visual
