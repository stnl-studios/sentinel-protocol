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
| `PASS` | A validação confirmou o objetivo do ciclo sem pendência relevante. | Emitido pelo `validation-runner` na run de validação/eval; consumido no fechamento, não reemitido pelo `finalizer`. |
| `PARTIAL` | Houve avanço válido, mas o objetivo ficou parcialmente atendido. | Emitido pelo `validation-runner` na run de validação/eval; consumido no fechamento, não reemitido pelo `finalizer`. |
| `FAIL` | A validação mostrou que o objetivo não foi atingido. | Emitido pelo `validation-runner` na run de validação/eval; consumido no fechamento, não reemitido pelo `finalizer`. |
| `BLOCKED` | O ciclo não pode prosseguir ou ser consolidado por impedimento real. A origem do bloqueio deve ser nomeada. | Pode surgir em design, execução, validação ou finalização; no fechamento, o registro deve explicitar se o bloqueio foi pré-validação, de validação ou de consolidação durável. |

## Artefatos do workflow
- Os artefatos efêmeros do workflow são `EXECUTION BRIEF` e `VALIDATION PACK`.
- A memória durável fica em `DONE`, `Feature CONTEXT` e docs factuais tocadas por Resync.


## Notas de ownership
- `PASS`, `PARTIAL` e `FAIL` pertencem ao `validation-runner` como vereditos de validação.
- O `finalizer` consome esses vereditos para consolidar memória durável, mas não os reemite como seus próprios status.
- Quando a execução bloqueia antes do runner, o `orchestrator` roteia o caso direto ao `finalizer` como bloqueio pré-validação, sem inventar veredito do runner.
- Quando `designer` entra, o `orchestrator` deve classificá-lo como `required` ou `advisory`; só o caso `required` bloqueia a rodada por padrão.

## Invariantes para especialização por projeto
- A especialização por projeto pode adaptar heurísticas e contexto local, mas não pode alterar este conjunto de status canônicos.
- A especialização por projeto não pode alterar o ownership canônico dos status.
- A especialização por projeto não pode alterar a ordem canônica dos gates do workflow.
