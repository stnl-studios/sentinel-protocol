# Decisions Index

## File Purpose Header
- purpose: Índice de ADRs e decisões duráveis do projeto.
- read_when: Um agente precisa localizar decisão estável antes de planejar, revisar ou especializar.
- do_not_use_for: Conteúdo completo da decisão, backlog, execução, comandos ou evidência de validação.
- canonical_source_for: Lista, status e paths das decisões duráveis.
- canonical_source_not_for: Racional completo, impactos detalhados, regras ativas ou contratos.
- update_owner: `stnl_project_foundation` ou owner documental autorizado pela decisão.
- downstream_consumers: `orchestrator`, `planner`, `reviewer`, `resync`, `stnl_project_agent_specializer`.
- token_policy: Ler tabela; abrir o ADR específico quando exatidão importar.
- related_files: `docs/decisions/ADR-*.md`, `docs/core/RULES.md`, `docs/core/CONTRACTS.md`, `docs/TBDS.md`.

## Objetivo
Indexar ADRs e decisões duráveis do projeto.

## Convenção sugerida
Use um identificador estável por decisão, por exemplo:
- `ADR-001-nome-curto.md`
- `ADR-002-nome-curto.md`

## Tabela de decisões
| ID | Título | Status | Data | Path |
| --- | --- | --- | --- | --- |
| `ADR-001` | `<titulo>` | `proposed | accepted | superseded | deprecated` | `YYYYMMDD` | `<path>` |

## Regras de uso
- Registrar aqui apenas decisões duráveis.
- Não usar este índice para backlog, changelog ou notas temporárias.
- Quando uma decisão for substituída, manter o histórico e atualizar o status.
