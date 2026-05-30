# stnl_project_agent_specializer_dev

Esta skill dev é uma área experimental isolada. Ela não substitui
`stnl_project_agent_specializer` e não é, neste momento, o caminho ativo para
materializar agents em um repo alvo.

O foco imediato mudou para validação de kernelização de agents fora do fluxo de
materialização da skill. O kernel lab contém pelo menos `orchestrator_kernel` e
`planner_kernel`.

O `orchestrator_kernel` está congelado como `CLEAN_EXCELLENT_PASS`. O
`planner_kernel` está integrado documentalmente para revisão e permanece
`NOT_EXCELLENT_PASS`.

A skill dev continua experimental. Não há runtime real, materializer ativo,
target materialization, generated artifact ou validação executável do planner
autorizados nesta área.

## Rota Atual

- preservar o `orchestrator_kernel` congelado sem alterar seus contratos,
  checks ou snapshots;
- revisar o `planner_kernel` contra o snapshot dev local
  `reference/agents/planner.agent.md`, derivado literalmente de
  `templates/agents/planner.agent.md`;
- extrair princípios reaproveitáveis sem forçar todos os agents ao mesmo molde
  interno;
- kernelizar os demais agents um por vez, por família de responsabilidade;
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
- manter `check-static.mjs` e `check-golden.mjs` read-only, sem autorizar
  materialização;
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
