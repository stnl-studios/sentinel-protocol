# Status e Gates Canônicos

## Objetivo
Registrar os status e gates canônicos do workflow do Sentinel, o momento em que cada um aparece no fluxo, e deixar explícito que o fluxo já contempla proof pós-execução do artifact implementado e pode incluir review técnico semântico adicional do mesmo artifact.

Fluxo alvo:
`Gate de base → Planner → Design de validação/eval → Gate de harness → Package design de execução → Gate de aprovação da execução → Execução por coders especialistas-executores → Run de validação/eval + quality proof do pack → Reviewer semântico quando aplicável → Finalização → Resync se necessário`

## Status de decisão e gates
| Status | Significado | Momento do fluxo |
| --- | --- | --- |
| `NEEDS_DEV_DECISION_BASE` | Falta decisão do DEV sobre base, escopo ou direção antes de avançar. | Gate de base. |
| `NEEDS_DEV_DECISION_HARNESS` | Falta decisão do DEV sobre harness, estratégia ou suficiência de prova para um cut cujo risco não pode seguir só com evidência leve; esse status para o fluxo antes de approval ou execução e não autoriza salto direto para implementar. | Gate de harness. |
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
- Os artefatos efêmeros do workflow são `EXECUTION BRIEF`, `VALIDATION PACK` e `EXECUTION PACKAGE`.
- `EXECUTION PACKAGE` pertence ao `execution-package-designer`, carrega 1..N work packages executáveis e não substitui o `orchestrator`.
- A memória durável fica em `DONE`, `Feature CONTEXT` e docs factuais tocadas por Resync.

## Regra de proof pós-execução
- O fluxo canônico já contempla proof pós-execução do artifact implementado: prova funcional mais checks determinísticos relevantes ao cut definidos no `VALIDATION PACK`.
- Quando relevante ao cut, esses checks incluem lint, formatter/prettier, typecheck, build e testes mínimos da superfície tocada.
- Em mudança simples, local e de baixo acoplamento, ausência de specs existentes não bloqueia automaticamente; build, lint, smoke ou manual path podem bastar quando forem prova honesta para o cut.
- Em mudança que toca lógica de negócio, state, services, facades, repositories, data access, guards, resolvers, interceptors, contratos compartilhados, libs compartilhadas, auth, autorização, segurança, PIN, token, sessão, fluxos assíncronos, multi-step ou comportamento com risco de regressão transversal, ausência de testes relevantes existentes ou de harness minimamente confiável para a surface tocada deve virar `NEEDS_DEV_DECISION_HARNESS` antes da execução.
- Nesse gate, o DEV decide entre criar testes focados na SPEC agora, aceitar seguir com evidência parcial conscientemente, ou reduzir o cut para uma parte validável com o harness atual.
- "Testes relevantes" aqui significa testes focados na SPEC e na surface tocada, não uma iniciativa de cobertura ampla do projeto.
- Depois da decisão do DEV, o fluxo retorna ao owner do artifact afetado: mesma fronteira de cut volta ao `validation-eval-designer` para atualizar o `VALIDATION PACK`; mudança material de cut reabre `planner -> validation-eval-designer`.
- Aceitar evidência parcial explicitamente exige que o `validation-eval-designer` registre no `VALIDATION PACK` a limitação de harness aceita, a prova ainda faltante, a evidência substituta, o risco residual visível e que a escolha foi decisão explícita do DEV antes de qualquer gate normal de execução.
- Reduzir o cut invalida implicitamente o cut anterior como base de execução; readiness, `EXECUTION PACKAGE` e execution approval derivados do recorte anterior não valem para o novo recorte até existirem novo `EXECUTION BRIEF`, novo `VALIDATION PACK` e novo `EXECUTION PACKAGE`.
- Sem proof/check mínimo relevante executado com resultado honesto, a rodada não fecha como "done limpo"; a lacuna, falha ou bloqueio precisa aparecer no verdict e no fechamento.

## Nota de review técnico pós-execução
- O workflow pode incluir `reviewer` como camada adicional de review semântico/arquitetural do artifact implementado e do diff resultante.
- Esse review não substitui o verdict do `validation-runner` nem redefine o `VALIDATION PACK`.
- O `orchestrator` pode classificar o `reviewer` como `required` ou `advisory`.
- Quando o `reviewer` for `required`, ausência de review ou risco estrutural material não resolvido impede closure limpa.
- Quando o `reviewer` for `advisory`, o review informa o fechamento, mas não bloqueia por default.

## Nota sobre trilhas condicionais de risco
- Certos cuts podem carregar obrigações adicionais de `security`, `performance`, `migration/schema` ou `observability/release safety` dentro do `VALIDATION PACK` e do review aplicável.
- Essas obrigações não criam novos status e não alteram o conjunto canônico acima.

## Notas de ownership
- `PASS`, `PARTIAL`, `FAIL` e o `BLOCKED` de validação pertencem ao `validation-runner` como vereditos de validação.
- `execution-package-designer` é owner apenas do `EXECUTION PACKAGE`; o `orchestrator` continua sendo o único coordenador da rodada e único owner de roteamento.
- O `reviewer` é owner do review semântico/arquitetural pós-execução quando ele entra na rodada; esse sinal não substitui o ownership de proof do runner.
- O `finalizer` consome esses vereditos para consolidar memória durável, mas não os reemite como seus próprios status.
- O `finalizer` também pode consumir o sinal do `reviewer` quando ele existir, sem absorver review técnico substituto.
- Quando a execução bloqueia antes do runner, o `orchestrator` roteia o caso direto ao `finalizer` como bloqueio pré-validação, sem inventar veredito do runner nem closure otimista.
- Quando `designer` entra, o `orchestrator` deve classificá-lo como `required` ou `advisory`; só o caso `required` bloqueia a rodada por padrão.

## Invariantes para especialização por projeto
- A especialização por projeto pode adaptar heurísticas e contexto local, mas não pode alterar este conjunto de status canônicos.
- A especialização por projeto não pode alterar o ownership canônico dos status.
- A especialização por projeto não pode alterar a ordem canônica dos gates do workflow.
