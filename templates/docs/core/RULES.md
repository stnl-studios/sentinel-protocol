SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Rules

## Objetivo
Registrar regras globais do projeto e limites operacionais do workflow, sem duplicar contexto factual ou inventário estrutural.

## Regras invioláveis
- sem evidência, não inventar; registrar `TBD` no contexto correto
- memória durável não vive em artefato efêmero
- `EXECUTION BRIEF` e `VALIDATION PACK` são artefatos efêmeros
- `Feature CONTEXT`, `DONE`, docs factuais atualizadas por `Resync` e ADR são memória durável
- `PLAN.md` não é memória durável do workflow novo

## Gates humanos relevantes
- usar `NEEDS_DEV_DECISION_BASE` quando faltar decisão de base, escopo ou direção
- usar `NEEDS_DEV_DECISION_HARNESS` quando faltar decisão sobre harness ou estratégia viável de validação
- usar `NEEDS_DEV_APPROVAL_EXECUTION` quando a execução exigir aprovação explícita

## Limites de atuação dos agents
- agents executores não fecham memória durável sozinhos
- `orchestrator` coordena gates e handoffs, não implementa
- `planner` gera `EXECUTION BRIEF`, não vira backlog manager
- `finalizer` e `resync` concentram fechamento mínimo e sincronização factual

## Mudança estrutural ou normativa
- mudança estrutural, normativa, arquitetural, de fronteira relevante ou de contrato externo relevante exige tratamento explícito
- quando aplicável, registrar ADR
- não normalizar breaking change silenciosa

## Restrições de execução
- não ampliar escopo por conveniência
- não usar artefato efêmero como fonte de verdade durável
- não reescrever docs factuais fora da feature sem necessidade real de `Resync`

## Referências
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `docs/core/CONTRACTS.md`
- `docs/core/TESTING.md`
- `docs/workflow/STATUS-GATES.md`
