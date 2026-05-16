# Status e Gates Canônicos

## Objetivo
Registrar os status e gates canônicos do workflow do Sentinel, o momento em que cada um aparece no fluxo, e deixar explícito que o fluxo já contempla proof pós-execução do artifact implementado e pode incluir review técnico semântico adicional do mesmo artifact.

Fluxo alvo:
`Gate de base → Planner → Design de validação/eval → Gate de harness → Package design de execução → Gate de aprovação da execução → Execução por coders especialistas-executores → Run de validação/eval + quality proof do pack → Reviewer semântico quando aplicável → Correction loop quando corrigível e houver budget → Finalização → Resync se necessário`

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
- Os artefatos efêmeros do workflow são `EXECUTION BRIEF`, `VALIDATION PACK`, `EXECUTION PACKAGE` e `CORRECTION PACK` quando runner ou reviewer encontram problema corrigível dentro do escopo aprovado.
- As stack quality guardrails ativas são metadados operacionais carregados por esses artefatos; elas não são agents e não substituem planner, package designer, coders, runner, reviewer ou finalizer.
- `EXECUTION PACKAGE` pertence ao `execution-package-designer`, carrega 1..N work packages executáveis e não substitui o `orchestrator`.
- `CORRECTION PACK` pertence ao agent que encontrou o problema como evidência de correção solicitada, mas o roteamento, o budget e a decisão de reutilizar ou redesenhar `EXECUTION PACKAGE` pertencem ao `orchestrator`.
- A memória durável fica em `DONE`, `Feature CONTEXT` e docs factuais tocadas por Resync.

## Regra de readiness pré-execução
- Antes do coder iniciar, o `EXECUTION PACKAGE` precisa estar pronto para execução com slice/cut correto, escopo aprovado, arquivos ou superfícies prováveis, guardrails aplicáveis e não aplicáveis com racional, critérios de aceite, validações esperadas, riscos relevantes, o que não pode mudar e blockers conhecidos.
- Esse gate valida handoff/readiness, não roda teste de código novo e não substitui a proof pós-execução.
- Se essa base estiver incompleta, contraditória ou exigir decisão estrutural, o pacote bloqueia antes do coder em vez de transferir ambiguidade para implementação.

## Regra de stack quality guardrails
- O fluxo ativa `stnl_frontend_quality`, `stnl_backend_quality`, `stnl_backend_sql_quality` e/ou `stnl_mobile_ios_swift_quality` conforme a superfície real do cut.
- O `VALIDATION PACK` deve transformar guardrails ativas em checks cut-scoped, sem copiar checklist inteiro nem acionar guardrail irrelevante por reflexo.
- O `EXECUTION PACKAGE` deve carregar `REQUIRED_QUALITY_GUARDRAILS` por work package quando aplicável.
- Coders aplicam as guardrails ativas, o runner valida os checks derivados do pack, o reviewer julga aderência estrutural quando entra, e o finalizer preserva o sinal se ele afetar closure.

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

## Regra de correction loop
- Problemas corrigíveis dentro do escopo aprovado devem voltar ao `orchestrator` antes de fechamento terminal como `PARTIAL`, `FAIL`, `BLOCKED` ou entrega parcial honesta.
- O retorno acontece por exatamente um bloco formal `CORRECTION PACK`, agrupando todos os problemas corrigíveis conhecidos da passagem atual, com `issue_id`, `fingerprint` ou `root_cause`, evidência objetiva, arquivo/superfície afetada, impacto, correção esperada, guardrail violada quando aplicável, e indicação de corrigibilidade dentro do escopo aprovado.
- Não vale correction request narrativo solto, comentário genérico como "corrija os problemas encontrados", nem handoff que combine `CORRECTION PACK` com verdict/status terminal.
- O `orchestrator` decide se o `CORRECTION PACK` é corrigível automaticamente dentro do escopo, exige decisão humana, precisa voltar ao `execution-package-designer`, ou deve ir ao `finalizer` como fechamento terminal honesto.
- Budget: cada slice/rodada tem no máximo 2 correction rounds automáticos; o mesmo `fingerprint/root_cause` só recebe 1 tentativa automática; erro novo só pode gerar correção enquanto houver budget total; reaparecimento do mesmo problema após tentativa automática não gera retry automático.
- O `EXECUTION PACKAGE` vigente só pode ser reutilizado quando a correção permanecer no mesmo `WORK_PACKAGE_ID`, mesmos boundaries, mesmo ownership, mesmo `DO_NOT_TOUCH`, mesmas validações esperadas, mesmos riscos relevantes, mesmas superfícies prováveis e mesmo escopo de execução.
- Se a correção alterar boundary, ownership, `DO_NOT_TOUCH`, validação esperada, risco relevante, arquivos/superfícies prováveis ou escopo de execução, o fluxo volta ao `execution-package-designer` para atualizar o pacote antes do coder; correção automática não pode virar bypass do package design.
- Correction round é correção mínima e cirúrgica, não replanejamento: não pode ampliar escopo aprovado, redesenhar arquitetura, fazer refactor amplo, alterar comportamento de produto não autorizado ou enfraquecer gates existentes.
- Ao estourar budget, ou quando o problema não for corrigível automaticamente dentro do escopo, o `orchestrator` roteia para fechamento terminal honesto pelo `finalizer`, preservando correction pack residual e evidência.

## Nota de review técnico pós-execução
- O workflow pode incluir `reviewer` como camada adicional de review semântico/arquitetural do artifact implementado e do diff resultante.
- Esse review não substitui o verdict do `validation-runner` nem redefine o `VALIDATION PACK`.
- O `orchestrator` pode classificar o `reviewer` como `required` ou `advisory`.
- Quando o `reviewer` for `required`, ausência de review ou risco estrutural material não resolvido impede closure limpa.
- Quando o `reviewer` for `advisory`, o review informa o fechamento, mas não bloqueia por default.
- Quando o `reviewer` encontrar problema semântico/arquitetural corrigível dentro do escopo e houver budget, ele emite `CORRECTION PACK` para o `orchestrator`; não executa correção e não vira planner.

## Nota sobre trilhas condicionais de risco
- Certos cuts podem carregar obrigações adicionais de `security`, `performance`, `migration/schema` ou `observability/release safety` dentro do `VALIDATION PACK` e do review aplicável.
- Essas obrigações não criam novos status e não alteram o conjunto canônico acima.

## Notas de ownership
- `PASS`, `PARTIAL`, `FAIL` e o `BLOCKED` de validação pertencem ao `validation-runner` como vereditos de validação.
- O `validation-runner` valida o artifact real depois do coder e pode emitir `CORRECTION PACK` para problema corrigível dentro do escopo antes de verdict terminal; ele não redesenha proof, pacote ou plano.
- `execution-package-designer` é owner apenas do `EXECUTION PACKAGE`; o `orchestrator` continua sendo o único coordenador da rodada e único owner de roteamento.
- `validation-eval-designer` desenha o `VALIDATION PACK`; `execution-package-designer` garante pacote pronto para coder com critérios de qualidade e guardrails aplicáveis; coders implementam sem ampliar escopo.
- O `reviewer` é owner do review semântico/arquitetural pós-execução quando ele entra na rodada; esse sinal não substitui o ownership de proof do runner.
- O `finalizer` consome esses vereditos para consolidar memória durável, mas não os reemite como seus próprios status.
- O `finalizer` também pode consumir o sinal do `reviewer` quando ele existir, sem absorver review técnico substituto, e preserva correction pack residual quando budget estoura ou correção automática não é permitida.
- Em rodada de slice, o `finalizer` é o owner canônico da declaração pós-slice: slice trabalhada com ID `SL-001`, `SL-002`, etc., status final `concluida`, `parcial` ou `bloqueada`, evidências, pendências/blockers, necessidade de resync e próxima slice elegível quando aplicável.
- Quando a execução bloqueia antes do runner, o `orchestrator` roteia o caso direto ao `finalizer` como bloqueio pré-validação, sem inventar veredito do runner nem closure otimista.
- `PARTIAL`, `FAIL`, `BLOCKED`, bloqueio pré-validação e execução parcial com `BLOCKED` nunca são fim operacional direto da rodada; todos exigem passagem terminal pelo `finalizer` para preservar verdict ou bloqueio, `DONE: yes/no`, resync yes/no e risco residual sem fechar a SPEC inteira.
- Quando `designer` entra, o `orchestrator` deve classificá-lo como `required` ou `advisory`; só o caso `required` bloqueia a rodada por padrão.

## Invariantes para especialização por projeto
- A especialização por projeto pode adaptar heurísticas e contexto local, mas não pode alterar este conjunto de status canônicos.
- A especialização por projeto não pode alterar o ownership canônico dos status.
- A especialização por projeto não pode alterar a ordem canônica dos gates do workflow.
