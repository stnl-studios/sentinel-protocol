# stnl_project_agent_specializer_dev

Esta skill dev é uma área experimental isolada. Ela não substitui
`stnl_project_agent_specializer` e não é, neste momento, o caminho ativo para
materializar agents em um repo alvo.

O foco imediato mudou para validação de kernelização de agents fora do fluxo de
materialização da skill. O kernel lab contém `orchestrator_kernel`,
`planner_kernel`, `validation_eval_designer_kernel` e o draft autorizado
`execution_package_designer_kernel`.

O `orchestrator_kernel` está congelado como `CLEAN_EXCELLENT_PASS`. O
`planner_kernel` também está congelado como `CLEAN_EXCELLENT_PASS` para o kernel
lab documental, contratual e semântico mínimo. Ambos são resultados exclusivos
do kernel lab dev.

O `validation_eval_designer_kernel` está promovido como
`VALIDATION_EVAL_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS` após auditoria humana
crítica separadamente autorizada. Esse pass vale somente para o kernel lab dev
documental, contratual, semântico mínimo e com harness textual executável
endurecido.

O `execution_package_designer_kernel` foi iniciado como
`EXECUTION_PACKAGE_DESIGNER_KERNEL: DRAFT_READY_FOR_HUMAN_AUDIT`. Esse status
indica somente snapshot local, contratos documentais e harness textual prontos
para auditoria crítica; não é `CLEAN_EXCELLENT_PASS` e não autoriza runtime,
materialização, repo alvo, skill produtiva ou materializer.

A skill dev continua experimental. Não há runtime real, materializer ativo,
target materialization, generated artifact, autorização para skill produtiva ou
promoção automática de kernels autorizados nesta área. Os harnesses do planner
apenas bloqueiam drift documental; o pass registrado decorre da auditoria humana
autoritativa e não autoriza runtime, materialização ou repo alvo.

## Rota Atual

- preservar o `orchestrator_kernel` congelado sem alterar seus contratos,
  checks ou snapshots;
- preservar o `planner_kernel` congelado contra o snapshot dev local
  `reference/agents/planner.agent.md`, derivado literalmente de
  `templates/agents/planner.agent.md`;
- executar, quando necessário, os harnesses read-only
  `reference/planner_kernel/validation/check-static.mjs` e
  `reference/planner_kernel/validation/check-golden.mjs` sem promover
  automaticamente qualquer kernel;
- preservar o `validation_eval_designer_kernel` contra o snapshot dev
  local `reference/agents/validation-eval-designer.agent.md`, derivado
  literalmente de `templates/agents/validation-eval-designer.agent.md`;
- executar os harnesses read-only
  `reference/validation_eval_designer_kernel/validation/check-static.mjs` e
  `reference/validation_eval_designer_kernel/validation/check-golden.mjs` como
  apoio bloqueante, sem promoção automática;
- preservar o `execution_package_designer_kernel` em estado de draft contra o
  snapshot dev local `reference/agents/execution-package-designer.agent.md`,
  derivado literalmente de `templates/agents/execution-package-designer.agent.md`;
- executar os harnesses read-only
  `reference/execution_package_designer_kernel/validation/check-static.mjs` e
  `reference/execution_package_designer_kernel/validation/check-golden.mjs` como
  apoio bloqueante, sem promoção automática;
- extrair princípios reaproveitáveis sem forçar todos os agents ao mesmo molde
  interno;
- manter qualquer kernel futuro sujeito a autorização e auditoria próprias;
- validar o pacote de agents;
- avançar para Project Senior Profile apenas depois dos agents estabilizados;
- reconstruir a skill/materialização completa apenas no final.

## Notas Para Mantenedores

- tratar qualquer wording herdado de materialização como design congelado, não
  promessa operacional ativa;
- não recriar materializer solto nem generated artifacts nesta etapa;
- manter `reference/kernel_lab/README.md` como entrada curta para o recomeço;
- manter contratos/checks do orchestrator kernel apenas como apoio estrutural e
  conceitual;
- manter os harnesses `reference/orchestrator_kernel/validation/check-static.mjs`,
  `reference/orchestrator_kernel/validation/check-golden.mjs`,
  `reference/planner_kernel/validation/check-static.mjs` e
  `reference/planner_kernel/validation/check-golden.mjs`, além dos harnesses
  equivalentes do `validation_eval_designer_kernel` e do
  `execution_package_designer_kernel`, read-only, sem autorizar materialização
  ou promoção automática;
- tratar `reference/agents/**` como o único local autorizado para snapshots dev
  de base agents usados pelo kernel lab;
- nunca usar fallback para a skill produtiva, `templates/**`, `~/.agents/**` ou
  filesystem externo;
- não tocar na skill produtiva, templates produtivos, installer, smoke,
  `.github/**`, `.codex/**` ou `AGENTS.md`.

## Relação Com O Manifest

Esta skill dev mantém somente as referências declaradas em
`reference/MANIFEST.md`. Se algum conteúdo acordado estiver ausente, a rota
correta é bloquear e sinalizar a ausência, não procurar substitutos.
