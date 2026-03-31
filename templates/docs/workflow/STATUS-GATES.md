# Status e Gates Canônicos

## Objetivo
Registrar os status e gates canônicos do workflow do Sentinel e o momento em que cada um aparece no fluxo.

Fluxo alvo:
`Gate de base → Planner → Design de validação/eval → Gate de harness → Gate de aprovação da execução → Execução → Run de validação/eval → Finalização → Resync se necessário`

## Status de decisão e gates
| Status | Significado | Momento do fluxo |
| --- | --- | --- |
| `NEEDS_DEV_DECISION_BASE` | Falta decisão do DEV sobre base, escopo ou direção antes de avançar. | Gate de base. |
| `NEEDS_DEV_DECISION_HARNESS` | Falta decisão do DEV sobre harness, estratégia ou condição de validação. | Gate de harness. |
| `NEEDS_DEV_APPROVAL_EXECUTION` | O plano e o desenho de validação estão prontos, mas a execução depende de aprovação explícita. | Gate de aprovação da execução. |
| `APPROVED_EXECUTION` | A execução foi aprovada explicitamente pelo DEV. | Saída do gate de aprovação, antes da execução. |
| `SKIP_EXECUTION_APPROVAL` | A execução pode seguir sem aprovação explícita adicional. | Saída do gate de aprovação, quando a política permite seguir direto. |
| `READY` | O trabalho está pronto para entrar na próxima etapa operacional sem pendência aberta. | Ao sair de um gate resolvido ou ao concluir a preparação para execução. |

## Status de validação e fechamento
| Status | Significado | Momento do fluxo |
| --- | --- | --- |
| `PASS` | A validação confirmou o objetivo do ciclo sem pendência relevante. | Run de validação/eval ou fechamento. |
| `PARTIAL` | Houve avanço válido, mas o objetivo ficou parcialmente atendido. | Run de validação/eval ou fechamento. |
| `FAIL` | A validação mostrou que o objetivo não foi atingido. | Run de validação/eval ou fechamento. |
| `BLOCKED` | O ciclo não pode prosseguir ou fechar por impedimento externo ou estrutural. | Qualquer ponto de bloqueio real, com fechamento explícito. |

## Artefatos do workflow
- Os artefatos efêmeros do workflow são `EXECUTION BRIEF` e `VALIDATION PACK`.
- A memória durável fica em `DONE`, `Feature CONTEXT` e docs factuais tocadas por Resync.
