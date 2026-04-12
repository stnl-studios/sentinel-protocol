# Status e Gates Canônicos

## Objetivo
Registrar os status e gates canônicos do workflow do Sentinel, o momento em que cada um aparece no fluxo, e deixar explícito que o fluxo já contempla proof pós-execução do artifact implementado.

Fluxo alvo:
`Gate de base → Planner → Design de validação/eval → Gate de harness → Gate de aprovação da execução → Execução → Run de validação/eval + quality proof do pack → Finalização → Resync se necessário`

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
| `PASS` | A validação confirmou o objetivo do ciclo e os checks obrigatórios relevantes do `VALIDATION PACK` passaram. | Emitido pelo `validation-runner` na run de validação/eval; consumido no fechamento, não reemitido pelo `finalizer`. |
| `PARTIAL` | Houve avanço válido, mas o objetivo ficou parcialmente atendido ou a prova relevante ficou incompleta. | Emitido pelo `validation-runner` na run de validação/eval; consumido no fechamento, não reemitido pelo `finalizer`. |
| `FAIL` | A validação mostrou que o objetivo não foi atingido ou que um check obrigatório executado falhou de forma material. | Emitido pelo `validation-runner` na run de validação/eval; consumido no fechamento, não reemitido pelo `finalizer`. |
| `BLOCKED` | A validação não conseguiu provar honestamente o ciclo por impedimento real no path de prova. A origem do bloqueio deve ser nomeada. | Como verdict de validação, pertence ao `validation-runner`; quando houver bloqueio antes do runner, o fechamento deve preservá-lo explicitamente como bloqueio pré-validação, sem inventar verdict limpo. |

## Artefatos do workflow
- Os artefatos efêmeros do workflow são `EXECUTION BRIEF` e `VALIDATION PACK`.
- A memória durável fica em `DONE`, `Feature CONTEXT` e docs factuais tocadas por Resync.

## Regra de proof pós-execução
- O fluxo canônico já contempla proof pós-execução do artifact implementado: prova funcional mais checks determinísticos relevantes ao cut definidos no `VALIDATION PACK`.
- Quando relevante ao cut, esses checks incluem lint, formatter/prettier, typecheck, build e testes mínimos da superfície tocada.
- Sem proof/check mínimo relevante executado com resultado honesto, a rodada não fecha como "done limpo"; a lacuna, falha ou bloqueio precisa aparecer no verdict e no fechamento.

## Notas de ownership
- `PASS`, `PARTIAL`, `FAIL` e o `BLOCKED` de validação pertencem ao `validation-runner` como vereditos de validação.
- O `finalizer` consome esses vereditos para consolidar memória durável, mas não os reemite como seus próprios status.
- Quando a execução bloqueia antes do runner, o `orchestrator` roteia o caso direto ao `finalizer` como bloqueio pré-validação, sem inventar veredito do runner nem closure otimista.
- Quando `designer` entra, o `orchestrator` deve classificá-lo como `required` ou `advisory`; só o caso `required` bloqueia a rodada por padrão.

## Invariantes para especialização por projeto
- A especialização por projeto pode adaptar heurísticas e contexto local, mas não pode alterar este conjunto de status canônicos.
- A especialização por projeto não pode alterar o ownership canônico dos status.
- A especialização por projeto não pode alterar a ordem canônica dos gates do workflow.
