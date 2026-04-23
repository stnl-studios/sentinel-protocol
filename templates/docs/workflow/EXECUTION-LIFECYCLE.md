# Execution Lifecycle Canonico

## Objetivo
Descrever a ordem operacional canônica do Sentinel com mais precisão que `STATUS-GATES.md`, deixando explícito onde entram o quality gate pós-execução e o review técnico semântico e quem é owner de cada artifact ou verdict.

## Ordem do fluxo
1. `orchestrator` aplica os gates canônicos e roteia a rodada sem absorver planejamento, execução, validação ou fechamento.
2. `planner` define o cut autorizado e produz `EXECUTION BRIEF`.
3. `validation-eval-designer` transforma o brief em `VALIDATION PACK`, definindo obrigações de prova, estratégia de evidência, limites de harness e checks determinísticos relevantes ao cut.
4. O fluxo resolve o gate de harness e o gate de aprovação de execução antes de qualquer implementação. Em mudança simples e local, ausência de testes pode continuar não-bloqueante quando a prova leve do cut for honesta; em mudança de risco relevante sem cobertura mínima da surface tocada, o fluxo para em `NEEDS_DEV_DECISION_HARNESS`.
5. Se o DEV escolher adicionar testes focados na SPEC agora, a escolha não libera execução por si só: o `validation-eval-designer` atualiza o `VALIDATION PACK` com a nova prova exigida, e quando a decisão alterar materialmente o cut o fluxo reabre `planner -> validation-eval-designer` antes de qualquer approval.
6. Se o DEV escolher aceitar evidência parcial explicitamente, o fluxo volta ao `validation-eval-designer` para registrar no `VALIDATION PACK` a limitação aceita, a prova faltante, a evidência substituta, o risco residual visível e que o compromisso foi decisão explícita do DEV; só depois disso o fluxo retorna ao gate normal de execução.
7. Se o DEV escolher reduzir o cut, o cut anterior deixa de valer como base de execução: o fluxo volta obrigatoriamente ao `planner` para um novo `EXECUTION BRIEF`, depois ao `validation-eval-designer` para um novo `VALIDATION PACK`, e readiness ou approval anteriores não sobrevivem automaticamente.
8. `execution-package-designer` compila `EXECUTION PACKAGE` a partir do `EXECUTION BRIEF` e do `VALIDATION PACK`, com 1..N work packages executáveis. Ele não coordena coders, não chama agents, não implementa e não substitui o `orchestrator`.
9. O `orchestrator` consome o `EXECUTION PACKAGE`, decide sequência ou paralelização dos coders, confirma capability e só então roteia os coders especialistas-executores.
10. Os coders executam apenas o `WORK_PACKAGE_ID` autorizado. Execução real devolve artifact aplicável ou `BLOCKED`; resposta descritiva, pacote recompilado localmente ou scope ampliado não substitui artifact.
11. `validation-runner` executa o `VALIDATION PACK` sobre o artifact implementado. Isso inclui prova funcional e os checks determinísticos marcados no pack como relevantes ao cut.
12. `reviewer` entra quando aplicável para revisar o artifact implementado e o diff resultante em chave semântica e arquitetural. O `orchestrator` deve classificá-lo como `required` ou `advisory` antes da handoff.
13. `finalizer` apenas consolida o resultado do runner, o sinal do reviewer quando existir, ou um bloqueio pré-validação roteado pelo orchestrator. Ele não redesenha prova, não reexecuta checks e não assume ownership de review técnico substituto.
14. `resync` entra apenas quando o `finalizer` detecta delta factual fora da feature que precisa ser sincronizado.

Fluxo alvo resumido:
`orchestrator -> planner -> validation-eval-designer -> execution-package-designer -> orchestrator -> coder(s) -> validation-runner -> reviewer quando aplicável -> finalizer`

## Contrato do pacote de execução
O `EXECUTION PACKAGE` é efêmero, operacional e leve. Ele deve permitir que coders especialistas-executores apliquem a mudança sem reinterpretar arquitetura local.

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
- `BLOCK_IF`

O pacote pode conter 1..N work packages. Isso não cria um segundo coordenador: `execution-package-designer` compila o pacote, e o `orchestrator` continua sendo o único owner de routing, sequencing, paralelização e stop/go.

## Contrato do quality gate pós-execução
- O `VALIDATION PACK` deve definir, quando relevante ao cut, lint, formatter/prettier, typecheck, build e testes mínimos da superfície tocada.
- Cada check determinístico do pack deve vir classificado como `required`, `optional`, `not_applicable` ou `blocked_by_harness`, sempre com racional ligado ao cut.
- Em cuts simples e locais, build, lint, smoke ou manual path podem bastar sem exigir testes novos por default.
- Em cuts que tocam lógica de negócio, state, services, facades, repositories, data access, guards, resolvers, interceptors, contratos compartilhados, libs compartilhadas, auth, autorização, segurança, PIN, token, sessão, fluxos assíncronos, multi-step ou comportamento com risco de regressão transversal, ausência de testes relevantes existentes ou de harness minimamente confiável para a surface tocada deve acionar `NEEDS_DEV_DECISION_HARNESS` antes da execução.
- Quando o DEV optar por investir em prova nova nesse gate, a exigência é de testes focados na SPEC e nos fluxos críticos prometidos pelo cut, não de cobertura ampla do projeto.
- `NEEDS_DEV_DECISION_HARNESS` é gate de decisão, não atalho para execução: depois da escolha do DEV, o fluxo sempre volta ao owner do artifact afetado antes de qualquer approval ou handoff para executor.
- `NEEDS_DEV_APPROVAL_EXECUTION`, `APPROVED_EXECUTION`, `SKIP_EXECUTION_APPROVAL` e qualquer leitura de readiness valem apenas para o conjunto vigente `EXECUTION BRIEF` + `VALIDATION PACK` + `EXECUTION PACKAGE`, nunca para versões anteriores do recorte.
- O `validation-runner` executa e julga esses checks no escopo do cut. O runner não vira smoke runner genérico repo-wide e não redesenha o pack durante a run.
- Falha de check obrigatório, ausência de execução de check obrigatório ou bloqueio real do path de prova afetam formalmente verdict e confidence.

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
- Quando houver `reviewer required`, também não existe closure limpa com review pendente ou com risco estrutural material não resolvido.
- `finalizer` consome essa evidência para fechar a rodada; ele não suaviza falta de prova, não ignora review `required` pendente ou materialmente bloqueado, e não transforma green irrelevante em entrega limpa.
