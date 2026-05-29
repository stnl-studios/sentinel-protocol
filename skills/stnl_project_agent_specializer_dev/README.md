# stnl_project_agent_specializer_dev

Esta skill dev é uma área experimental isolada. Ela não substitui
`stnl_project_agent_specializer` e não é, neste momento, o caminho ativo para
materializar agents em um repo alvo.

O foco imediato mudou para validação de kernelização de agents fora do fluxo de
materialização da skill. O primeiro estudo é o `orchestrator`; depois, o padrão
validado deve orientar os demais agents por família de responsabilidade, seguido
por Project Senior Profile e, só então, pela reconstrução da skill.

## Rota Atual

- validar o `orchestrator` kernel contra o base agent copiado em
  `reference/agents/orchestrator.agent.md`;
- extrair princípios reaproveitáveis sem forçar todos os agents ao mesmo molde
  interno;
- kernelizar os demais agents por família de responsabilidade;
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
- nunca usar fallback para a skill produtiva, `templates/**`, `~/.agents/**` ou
  filesystem externo;
- não tocar na skill produtiva, templates produtivos, installer, smoke,
  `.github/**`, `.codex/**` ou `AGENTS.md`.

## Relação Com O Manifest

Esta skill dev mantém somente as referências declaradas em
`reference/MANIFEST.md`. Se algum conteúdo acordado estiver ausente, a rota
correta é bloquear e sinalizar a ausência, não procurar substitutos.
