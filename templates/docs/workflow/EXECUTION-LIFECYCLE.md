# Execution Lifecycle Canonico

## Objetivo
Descrever a ordem operacional canônica do Sentinel com mais precisão que `STATUS-GATES.md`, deixando explícito onde entram o quality gate pós-execução e o review técnico semântico e quem é owner de cada artifact ou verdict.

## Ordem do fluxo
1. `orchestrator` aplica os gates canônicos e roteia a rodada sem absorver planejamento, execução, validação ou fechamento.
2. `planner` define o cut autorizado e produz `EXECUTION BRIEF`.
3. `validation-eval-designer` transforma o brief em `VALIDATION PACK`, definindo obrigações de prova, estratégia de evidência, limites de harness e checks determinísticos relevantes ao cut.
4. O fluxo resolve o gate de harness e o gate de aprovação de execução antes de qualquer implementação.
5. Os executors implementam o cut autorizado. Execução real devolve artifact aplicável ou `BLOCKED`; resposta descritiva não substitui artifact.
6. `validation-runner` executa o `VALIDATION PACK` sobre o artifact implementado. Isso inclui prova funcional e os checks determinísticos marcados no pack como relevantes ao cut.
7. `reviewer` entra quando aplicável para revisar o artifact implementado e o diff resultante em chave semântica e arquitetural. O `orchestrator` deve classificá-lo como `required` ou `advisory` antes da handoff.
8. `finalizer` apenas consolida o resultado do runner, o sinal do reviewer quando existir, ou um bloqueio pré-validação roteado pelo orchestrator. Ele não redesenha prova, não reexecuta checks e não assume ownership de review técnico substituto.
9. `resync` entra apenas quando o `finalizer` detecta delta factual fora da feature que precisa ser sincronizado.

## Contrato do quality gate pós-execução
- O `VALIDATION PACK` deve definir, quando relevante ao cut, lint, formatter/prettier, typecheck, build e testes mínimos da superfície tocada.
- Cada check determinístico do pack deve vir classificado como `required`, `optional`, `not_applicable` ou `blocked_by_harness`, sempre com racional ligado ao cut.
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
- Quando houver `reviewer required`, também não existe closure limpa com review pendente ou com risco estrutural material não resolvido.
- `finalizer` consome essa evidência para fechar a rodada; ele não suaviza falta de prova, não ignora review `required` pendente ou materialmente bloqueado, e não transforma green irrelevante em entrega limpa.
