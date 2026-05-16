# Execution Lifecycle Canonico

## Objetivo
Descrever a ordem operacional canônica do Sentinel com mais precisão que `STATUS-GATES.md`, deixando explícito onde entram o quality gate pós-execução e o review técnico semântico e quem é owner de cada artifact ou verdict.

## Ordem do fluxo
1. `orchestrator` aplica os gates canônicos e roteia a rodada sem absorver planejamento, execução, validação ou fechamento.
2. `planner` define o cut autorizado, marca as stack quality guardrails ativas quando relevantes e produz `EXECUTION BRIEF`.
3. `validation-eval-designer` transforma o brief em `VALIDATION PACK`, definindo obrigações de prova, estratégia de evidência, limites de harness, checks determinísticos relevantes ao cut e checks derivados das stack quality guardrails ativas.
4. O fluxo resolve o gate de harness e o gate de aprovação de execução antes de qualquer implementação. Em mudança simples e local, ausência de testes pode continuar não-bloqueante quando a prova leve do cut for honesta; em mudança de risco relevante sem cobertura mínima da surface tocada, o fluxo para em `NEEDS_DEV_DECISION_HARNESS`.
5. Se o DEV escolher adicionar testes focados na SPEC agora, a escolha não libera execução por si só: o `validation-eval-designer` atualiza o `VALIDATION PACK` com a nova prova exigida, e quando a decisão alterar materialmente o cut o fluxo reabre `planner -> validation-eval-designer` antes de qualquer approval.
6. Se o DEV escolher aceitar evidência parcial explicitamente, o fluxo volta ao `validation-eval-designer` para registrar no `VALIDATION PACK` a limitação aceita, a prova faltante, a evidência substituta, o risco residual visível e que o compromisso foi decisão explícita do DEV; só depois disso o fluxo retorna ao gate normal de execução.
7. Se o DEV escolher reduzir o cut, o cut anterior deixa de valer como base de execução: o fluxo volta obrigatoriamente ao `planner` para um novo `EXECUTION BRIEF`, depois ao `validation-eval-designer` para um novo `VALIDATION PACK`, e readiness ou approval anteriores não sobrevivem automaticamente.
8. `execution-package-designer` compila `EXECUTION PACKAGE` a partir do `EXECUTION BRIEF` e do `VALIDATION PACK`, com readiness pré-execução explícita, 1..N work packages executáveis e `REQUIRED_QUALITY_GUARDRAILS` por pacote quando aplicável. Ele não coordena coders, não chama agents, não implementa e não substitui o `orchestrator`.
9. O `orchestrator` consome o `EXECUTION PACKAGE`, decide sequência ou paralelização dos coders, confirma capability e só então roteia os coders especialistas-executores.
10. Os coders executam apenas o `WORK_PACKAGE_ID` autorizado e aplicam as stack quality guardrails exigidas para o pacote. Execução real devolve handoff terminal explícito: `READY` com artifact aplicável e evidência de alteração aplicada, ou `BLOCKED` com causa objetiva. Resposta descritiva, pacote recompilado localmente, progresso intermediário, log operacional, promessa, diff parcial, status implícito ou scope ampliado não substitui artifact.
11. O `orchestrator` rejeita handoff ausente, implícito, ambíguo, intermediário, narrativo ou `READY` sem evidência aplicada como `EXECUTOR_HANDOFF_INVALID`; a rodada bloqueia operacionalmente e não entra no `validation-runner`.
12. `validation-runner` executa o `VALIDATION PACK` sobre o artifact implementado somente quando houver executor `READY` válido. Isso inclui prova funcional, checks determinísticos e checks de stack quality guardrail marcados no pack como relevantes ao cut.
13. Se o `validation-runner` encontrar problema corrigível dentro do escopo aprovado e ainda houver budget, ele emite exatamente um bloco formal `CORRECTION PACK` e devolve ao `orchestrator` antes de transformar a rodada em `PARTIAL`, `FAIL` ou `BLOCKED` terminal.
14. `reviewer` entra quando aplicável para revisar o artifact implementado e o diff resultante em chave semântica, arquitetural e de aderência às stack quality guardrails ativas. O `orchestrator` deve classificá-lo como `required` ou `advisory` antes da handoff.
15. Se o `reviewer` encontrar problema semântico, arquitetural, de boundary ou guardrail corrigível dentro do escopo aprovado e ainda houver budget, ele emite exatamente um bloco formal `CORRECTION PACK` e devolve ao `orchestrator`; ele não executa a correção.
16. O `orchestrator` decide o roteamento de cada `CORRECTION PACK`: reutilizar o `EXECUTION PACKAGE` vigente, voltar ao `execution-package-designer`, fazer correção automática mínima dentro do escopo, pedir decisão humana, ou fechar terminalmente pelo `finalizer`.
17. Toda rodada terminal passa obrigatoriamente pelo `finalizer`: `PASS`, `PARTIAL`, `FAIL`, `BLOCKED`, bloqueio pré-validação, estouro de budget de correção, problema não corrigível automaticamente dentro do escopo, e execução parcial com `BLOCKED` precisam virar fechamento honesto antes de parar. O `finalizer` apenas consolida o resultado do runner, o sinal do reviewer quando existir, o correction pack residual quando existir, ou um bloqueio pré-validação roteado pelo orchestrator. Ele não redesenha prova, não reexecuta checks e não assume ownership de review técnico substituto. Em rodada de slice, o `finalizer` também é o owner canônico da declaração pós-slice.
18. `resync` entra apenas quando o `finalizer` detecta delta factual fora da feature que precisa ser sincronizado.

Fluxo alvo resumido:
`orchestrator -> planner -> validation-eval-designer -> execution-package-designer -> orchestrator -> coder(s) -> validation-runner -> reviewer quando aplicável -> correction loop quando corrigível e houver budget -> finalizer`

## Contrato de parada na preparação
Preparação só avança com artifact canônico claro e status explícito. `planner READY` exige `EXECUTION BRIEF` bounded; `validation-eval-designer READY` exige `VALIDATION PACK` honesto para proof e package readiness; `execution-package-designer READY` exige `EXECUTION PACKAGE` seguro para coder.

Quando um preparador não consegue produzir seu artifact sem inventar, inferir demais, esconder conflito, ampliar escopo ou transferir ambiguidade, ele para antes do próximo agente. O handoff de parada deve informar o artifact bloqueado, a decisão ou fato mínimo faltante, por que isso bloqueia o artifact atual, e qual owner precisa destravar. Stop informal, status ambíguo ou artifact parcial especulativo é handoff inválido para o `orchestrator`.

## Contrato do pacote de execução
O `EXECUTION PACKAGE` é efêmero, operacional e leve. Ele deve permitir que coders especialistas-executores apliquem a mudança sem reinterpretar arquitetura local.

Antes de qualquer coder iniciar, o pacote precisa passar por readiness pré-execução. Esse gate não testa código novo; ele valida se o handoff está pronto para execução. O pacote deve conter:
- slice/cut correto
- escopo aprovado
- arquivos ou superfícies prováveis
- guardrails de qualidade aplicáveis e não aplicáveis com racional
- critérios de aceite
- validações esperadas
- riscos relevantes
- o que não pode mudar
- blockers conhecidos, se houver

Cada work package deve carregar, no mínimo:
- `WORK_PACKAGE_ID`
- `GOAL`
- `OWNED_PATHS`
- `SEARCH_ANCHORS`
- `EDIT_ANCHORS`
- `DEPENDS_ON`
- `DO_NOT_TOUCH`
- `CHANGE_RULES`
- `RUN_COMMANDS`
- `ACCEPTANCE_CHECKS`
- `REQUIRED_QUALITY_GUARDRAILS`
- `BLOCK_IF`

O pacote pode conter 1..N work packages. Isso não cria um segundo coordenador: `execution-package-designer` compila o pacote, e o `orchestrator` continua sendo o único owner de routing, sequencing, paralelização e stop/go.

## Contrato do correction loop
Problemas corrigíveis dentro do escopo aprovado devem voltar ao `orchestrator` antes de virarem fechamento terminal. O objetivo é corrigir agora, em uma rodada mínima, quando isso evita `PARTIAL`, `BLOCKED` ou `FAIL` prematuro sem enfraquecer os gates.

O retorno acontece por exatamente um bloco formal com o marcador literal `CORRECTION PACK`. O bloco deve agrupar todos os problemas corrigíveis conhecidos da passagem atual para evitar erro pingado e conter, no mínimo:
- `issue_id`
- `fingerprint` ou `root_cause`
- evidência objetiva
- arquivo ou superfície afetada
- impacto
- correção esperada
- guardrail violada, quando aplicável
- indicação se o problema parece corrigível dentro do escopo aprovado

Não é válido pedir correção por narrativa solta, comentário lateral ou instrução genérica como "corrija os problemas encontrados". Quando runner ou reviewer emitirem `CORRECTION PACK`, não podem emitir verdict/status terminal no mesmo handoff. O bloco precisa ser roteável pelo `orchestrator` sem ele reconstruir a falha a partir de prosa.

Budget:
- cada slice/rodada pode ter no máximo 2 correction rounds automáticos
- o mesmo `fingerprint` ou `root_cause` só pode gerar 1 tentativa automática
- erro novo pode gerar nova correção apenas enquanto ainda houver budget total
- se o mesmo problema reaparecer após tentativa automática, não repetir automaticamente
- ao estourar o budget, rotear para fechamento terminal honesto pelo `finalizer`, preservando correction pack residual e evidência

O `orchestrator` pode reutilizar o `EXECUTION PACKAGE` vigente quando a correção couber claramente no mesmo `WORK_PACKAGE_ID`, mesmos boundaries, mesmo ownership, mesmo `DO_NOT_TOUCH`, mesmas validações esperadas, mesmos riscos relevantes, mesmas superfícies prováveis e mesmo escopo de execução.

Se a correção alterar boundary, ownership, `DO_NOT_TOUCH`, validação esperada, risco relevante, arquivos/superfícies prováveis ou escopo de execução, o fluxo volta ao `execution-package-designer` para atualizar o pacote antes do coder. Correção automática não pode virar bypass do package design.

Correction round é correção mínima, não replanejamento, redesign ou refactor amplo. Ele não pode ampliar escopo aprovado, redesenhar arquitetura, fazer refactor amplo, alterar comportamento de produto não autorizado, nem usar correção como limpeza oportunista. Se a correção exigir mudança estrutural maior, decisão de produto/arquitetura ou refactor amplo, o fluxo para para decisão humana ou segue para fechamento terminal honesto conforme o roteamento do `orchestrator`.

## Contrato das stack quality guardrails
As 4 skills de qualidade são guardrails de stack, não novos agents do fluxo:
- `stnl_frontend_quality`: web/browser front-end, UI, componentes, forms, estado, service/facade/store, mapping, lifecycle async, design system, contratos e testabilidade client-side.
- `stnl_backend_quality`: APIs, services, domínio, jobs, auth, integrações, runtime, contratos, responsabilidades, transaction boundaries, segurança básica e testabilidade back-end.
- `stnl_backend_sql_quality`: persistência, data access, SQL, ORM, NoSQL, cache, migrations, transações, índices, queries, bounded access e consistência de dados.
- `stnl_mobile_ios_swift_quality`: Swift, SwiftUI, UIKit interop, navegação, state ownership, concurrency, lifecycle, networking, persistence, plataforma e testabilidade iOS.

O `orchestrator` marca as guardrails ativas por superfície, o `planner` preserva essa marcação no `EXECUTION BRIEF`, o `validation-eval-designer` transforma a marcação em checks cut-scoped no `VALIDATION PACK`, o `execution-package-designer` carrega `REQUIRED_QUALITY_GUARDRAILS` por pacote, os coders aplicam as guardrails, o runner valida apenas os checks derivados do pack, o reviewer usa as guardrails ativas como critério estrutural quando entra, e o finalizer preserva o sinal no fechamento quando ele afeta `DONE`, risco residual ou resync.

## Contrato do quality gate pós-execução
- O `VALIDATION PACK` deve definir, quando relevante ao cut, lint, formatter/prettier, typecheck, build e testes mínimos da superfície tocada.
- Cada check determinístico do pack deve vir classificado como `required`, `optional`, `not_applicable` ou `blocked_by_harness`, sempre com racional ligado ao cut.
- Em cuts simples e locais, build, lint, smoke ou manual path podem bastar sem exigir testes novos por default.
- Em cuts que tocam lógica de negócio, state, services, facades, repositories, data access, guards, resolvers, interceptors, contratos compartilhados, libs compartilhadas, auth, autorização, segurança, PIN, token, sessão, fluxos assíncronos, multi-step ou comportamento com risco de regressão transversal, ausência de testes relevantes existentes ou de harness minimamente confiável para a surface tocada deve acionar `NEEDS_DEV_DECISION_HARNESS` antes da execução.
- Quando o DEV optar por investir em prova nova nesse gate, a exigência é de testes focados na SPEC e nos fluxos críticos prometidos pelo cut, não de cobertura ampla do projeto.
- `NEEDS_DEV_DECISION_HARNESS` é gate de decisão, não atalho para execução: depois da escolha do DEV, o fluxo sempre volta ao owner do artifact afetado antes de qualquer approval ou handoff para executor.
- `NEEDS_DEV_APPROVAL_EXECUTION`, `APPROVED_EXECUTION`, `SKIP_EXECUTION_APPROVAL` e qualquer leitura de readiness valem apenas para o conjunto vigente `EXECUTION BRIEF` + `VALIDATION PACK` + `EXECUTION PACKAGE`, nunca para versões anteriores do recorte.
- O `validation-runner` executa e julga esses checks no escopo do cut. O runner não vira smoke runner genérico repo-wide e não redesenha o pack durante a run.
- Quando o runner encontra problema corrigível dentro do escopo aprovado e há budget, ele emite `CORRECTION PACK` e devolve ao `orchestrator`; quando não for corrigível automaticamente, preserva a evidência para fechamento terminal via `finalizer`.
- Falha de check obrigatório, ausência de execução de check obrigatório ou bloqueio real do path de prova afetam formalmente verdict e confidence.
- Check obrigatório derivado de stack quality guardrail ativa tem o mesmo peso operacional: se falhar, não rodar ou ficar bloqueado por harness, o runner deve refletir isso no verdict e no risco residual.

## Contrato do review semântico pós-execução
- O `reviewer` revisa o artifact implementado e o diff resultante no escopo do cut, com leitura mínima e foco em aderência semântica, boundaries, complexidade, maintainability, smells arquiteturais e acoplamento indevido.
- O `reviewer` não substitui o `validation-runner`, não reexecuta proof, não redesenha o plano e não fecha a rodada.
- `required` deve ser usado para mudanças estruturais, boundary-sensitive, refactors relevantes, impacto transversal ou alteração importante de contratos internos.
- `advisory` deve ser usado quando o review agrega sinal técnico real, mas não precisa bloquear o fechamento por default.

## Trilhas condicionais de risco
- Além da proof normal do `VALIDATION PACK` e do review semântico quando aplicável, alguns cuts exigem trilhas adicionais de análise e prova por risco real do recorte.
- As trilhas condicionais reconhecidas neste protocolo são `security`, `performance`, `migration/schema` e `observability/release safety`.
- Essas trilhas são ativadas apenas quando o cut carrega risco material correspondente; elas não criam um stage fixo novo para toda rodada.
- Quando uma trilha estiver ativa, ela adiciona obrigações cut-scoped ao `VALIDATION PACK` e pode elevar a necessidade de review semântico, mas não substitui o `VALIDATION PACK`, não substitui o `validation-runner` e não substitui o `reviewer`.

## Regra de closure
- Sem proof funcional ou sem check mínimo relevante definido no pack e executado honestamente, não existe closure otimista.
- `PASS` limpo exige artifact implementado mais prova suficiente do runner para as obrigações e checks obrigatórios relevantes.
- `PASS` limpo também exige que a execução tenha vindo de work package válido ou que qualquer bloqueio de package tenha sido preservado explicitamente.
- Handoff inválido do executor bloqueia antes do runner: handoff ausente, implícito, ambíguo, intermediário, narrativo, log operacional, promessa, diff parcial ou `READY` sem evidência aplicada não vira validation target.
- Quando houver `reviewer required`, também não existe closure limpa com review pendente ou com risco estrutural material não resolvido.
- `finalizer` consome essa evidência para fechar a rodada; ele não suaviza falta de prova, não ignora review `required` pendente ou materialmente bloqueado, e não transforma green irrelevante em entrega limpa.
- O `finalizer` emite apenas `READY` ou `BLOCKED`; verdicts do runner (`PASS`, `PARTIAL`, `FAIL`, `BLOCKED`) são inputs preservados, não status reemitidos.
- `PARTIAL`, `FAIL`, `BLOCKED` e execução parcial não encerram a rodada diretamente no runner, reviewer, coder ou orchestrator; todos precisam de passagem terminal pelo `finalizer` para registrar verdade atual, `DONE: yes/no`, resync yes/no e risco residual sem fechar a SPEC inteira.
- `finalizer READY` exige closure ledger explícito: runner verdict preservado ou bloqueio pré-validação preservado, reviewer signal preservado quando houver, artifacts de memória/contexto alterados, `DONE` yes/no com racional, resync yes/no com racional, e delta factual quando resync for necessário.
- Em rodada de slice, o closure ledger também precisa declarar `slice_id` canônico (`SL-001`, `SL-002`, etc.), `slice_status: concluida|parcial|bloqueada`, evidências usadas para esse status, pendências ou blockers, se precisa resync, e próxima slice elegível quando aplicável.
