# stnl_project_agent_specializer_dev

Esta skill dev é uma área experimental isolada. Ela não substitui
`stnl_project_agent_specializer` e não é, neste momento, o caminho ativo para
materializar agents em um repo alvo.

O foco imediato mudou para validação de kernelização de agents fora do fluxo de
materialização da skill. O kernel lab contém `orchestrator_kernel`,
`planner_kernel`, `validation_eval_designer_kernel`,
`execution_package_designer_kernel`, o kernel congelado `designer_kernel` e o
kernel promovido `coder_frontend_kernel` e o kernel promovido
`coder_backend_kernel`, além dos kernels promovidos `validation_runner_kernel`
e `reviewer_kernel`, e agora o kernel promovido `finalizer_kernel`.

Há dez kernels congelados como `CLEAN_EXCELLENT_PASS`:
`orchestrator_kernel`, `planner_kernel`, `validation_eval_designer_kernel`,
`execution_package_designer_kernel`, `designer_kernel`,
`coder_frontend_kernel`, `coder_backend_kernel` e
`validation_runner_kernel`, `reviewer_kernel` e `finalizer_kernel`. Esses
passes são resultados exclusivos do kernel lab dev.

O `orchestrator_kernel` está congelado como `CLEAN_EXCELLENT_PASS`. O
`planner_kernel` também está congelado como `CLEAN_EXCELLENT_PASS` para o kernel
lab documental, contratual e semântico mínimo.

O `validation_eval_designer_kernel` está promovido como
`VALIDATION_EVAL_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS` após auditoria humana
crítica separadamente autorizada. Esse pass vale somente para o kernel lab dev
documental, contratual, semântico mínimo e com harness textual executável
endurecido.

O `execution_package_designer_kernel` foi promovido para
`EXECUTION_PACKAGE_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS` após auditoria humana
final com `CLEAN_AUDIT_PASS_FOR_PROMOTION_RECOMMENDATION`. Esse pass vale
somente para o kernel lab dev documental, contratual, semântico mínimo e com
harness textual executável endurecido; não é runtime pass, materialization
pass, target repo pass, autorização para skill produtiva ou autorização para
materializer.

O `designer_kernel` foi promovido para `CLEAN_EXCELLENT_PASS` após promoção
documental controlada com snapshot byte-a-byte preservado. Esse pass vale
somente para o kernel lab dev documental, contratual, semântico mínimo e com
harness textual executável endurecido; não é runtime pass, materialization
pass, target repo pass, agente executado em produção, autorização para skill
produtiva, autorização para materializer, escrita em GitHub ou escrita em repo
alvo.

O `coder_frontend_kernel` foi promovido para `CLEAN_EXCELLENT_PASS` após
promoção documental controlada com snapshot byte-a-byte preservado e harness
documental/textual endurecido. Esse pass vale somente para o kernel lab dev
documental, contratual, semântico mínimo e com harness textual executável
endurecido; não é runtime pass, não é materialization pass, não é target repo
pass, não autoriza produção, não autoriza skill produtiva, não autoriza
materializer, não autoriza escrita em GitHub, não autoriza escrita em repo alvo
e não autoriza alteração em templates canônicos.

O `coder_backend_kernel` foi promovido para `CLEAN_EXCELLENT_PASS` após
promoção documental controlada com snapshot byte-a-byte preservado e harness
documental/textual endurecido. Esse pass vale somente para o kernel lab dev
documental, contratual, semântico mínimo e com harness textual executável
endurecido; não é runtime pass, não é materialization pass, não é target repo
pass, não autoriza runtime loader, não autoriza materialization path, não
autoriza produção, não autoriza skill produtiva, não autoriza materializer, não
autoriza escrita em GitHub, não autoriza escrita em repo alvo, não autoriza
generated reports, fixtures, target artifacts, active runtime adoption ou
alteração em templates canônicos.

O `validation_runner_kernel` foi promovido para
`VALIDATION_RUNNER_KERNEL: CLEAN_EXCELLENT_PASS` após promoção documental
controlada com snapshot byte-a-byte preservado e harness documental/textual
endurecido. Esse pass vale somente para o kernel lab dev documental,
contratual, semântico mínimo e com harness textual executável endurecido; não
é runtime pass, não é materialization pass, não é target repo pass, não
autoriza runtime loader, não autoriza materialization path, não autoriza
produção, não autoriza skill produtiva, não autoriza materializer, não
autoriza escrita em GitHub, não autoriza escrita em repo alvo, não autoriza
generated reports, fixtures, target artifacts, active runtime adoption ou
alteração em templates canônicos.

O `reviewer_kernel` foi promovido para
`REVIEWER_KERNEL: CLEAN_EXCELLENT_PASS` após promoção documental controlada
com snapshot byte-a-byte preservado e harness documental/textual endurecido.
Esse pass vale somente para o kernel lab dev documental, contratual, semântico
mínimo e com harness textual executável endurecido; não é runtime pass, não é
materialization pass, não é target repo pass, não autoriza runtime loader, não
autoriza materialization path, não autoriza produção, não autoriza skill
produtiva, não autoriza materializer, não autoriza escrita em GitHub, não
autoriza escrita em repo alvo, não autoriza generated reports, fixtures,
target artifacts, active runtime adoption ou alteração em templates canônicos.

O `finalizer_kernel` foi promovido para
`FINALIZER_KERNEL: CLEAN_EXCELLENT_PASS` após promoção documental controlada
com snapshot byte-a-byte preservado e harness documental/textual endurecido.
Esse pass vale somente para o kernel lab dev documental, contratual, semântico
mínimo e com harness textual executável endurecido; não é runtime pass, não é
materialization pass, não é target repo pass, não autoriza runtime loader, não
autoriza materialization path, não autoriza produção, não autoriza skill
produtiva, não autoriza materializer, não autoriza escrita em GitHub, não
autoriza escrita em repo alvo, não autoriza generated reports, fixtures,
target artifacts, active runtime adoption ou alteração em templates canônicos.
Ele preserva closure, `READY/BLOCKED`, runner verdict como input, reviewer
signal, residual correction pack, `DONE: yes/no`, `resync: yes/no`, ledger de
fechamento e limite explícito contra execução de resync.

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
- preservar o `execution_package_designer_kernel` congelado contra o
  snapshot dev local `reference/agents/execution-package-designer.agent.md`,
  derivado literalmente de `templates/agents/execution-package-designer.agent.md`;
- executar os harnesses read-only
  `reference/execution_package_designer_kernel/validation/check-static.mjs` e
  `reference/execution_package_designer_kernel/validation/check-golden.mjs` como
  apoio bloqueante, sem promoção automática;
- preservar o `designer_kernel` congelado contra o snapshot dev local
  `reference/agents/designer.agent.md`, derivado literalmente de
  `templates/agents/designer.agent.md`;
- executar os harnesses read-only
  `reference/designer_kernel/validation/check-static.mjs` e
  `reference/designer_kernel/validation/check-golden.mjs` como apoio
  bloqueante, sem promoção automática;
- preservar o `coder_frontend_kernel` promovido contra o snapshot dev local
  `reference/agents/coder-frontend.agent.md`, derivado literalmente de
  `templates/agents/coder-frontend.agent.md`, com harness documental/textual
  endurecido e sem runtime, materialização, produção, escrita em GitHub,
  escrita em repo alvo ou alteração em templates canônicos;
- preservar o `coder_backend_kernel` promovido contra o snapshot dev local
  `reference/agents/coder-backend.agent.md`, derivado literalmente de
  `templates/agents/coder-backend.agent.md`, com harness documental/textual
  endurecido e sem runtime, runtime loader, materialização, materialization
  path, produção, escrita em GitHub, escrita em repo alvo, generated reports,
  fixtures, target artifacts, active runtime adoption, skill produtiva ou
  alteração em templates canônicos;
- preservar o `validation_runner_kernel` promovido contra o snapshot dev local
  `reference/agents/validation-runner.agent.md`, derivado literalmente de
  `templates/agents/validation-runner.agent.md`, com harness
  documental/textual endurecido e sem runtime, runtime loader, materialização,
  materialization path, produção, escrita em GitHub, escrita em repo alvo,
  generated reports, fixtures, target artifacts, active runtime adoption,
  materializer, skill produtiva ou alteração em templates canônicos;
- preservar o `reviewer_kernel` promovido contra o snapshot dev local
  `reference/agents/reviewer.agent.md`, derivado literalmente de
  `templates/agents/reviewer.agent.md`, com harness documental/textual
  endurecido e sem runtime, runtime loader, materialização, materialization
  path, produção, escrita em GitHub, escrita em repo alvo, generated reports,
  fixtures, target artifacts, active runtime adoption, materializer, skill
  produtiva ou alteração em templates canônicos;
- preservar o `finalizer_kernel` promovido contra o snapshot dev local
  `reference/agents/finalizer.agent.md`, derivado literalmente de
  `templates/agents/finalizer.agent.md`, com harness documental/textual
  endurecido e sem runtime, runtime loader, materialização, materialization
  path, produção, escrita em GitHub, escrita em repo alvo, generated reports,
  fixtures, target artifacts, active runtime adoption, materializer, skill
  produtiva, alteração em templates canônicos, execução de resync ou
  substituição de runner/reviewer;
- extrair princípios reaproveitáveis sem forçar todos os agents ao mesmo molde
  interno;
- manter qualquer kernel futuro sujeito a autorização e auditoria próprias;
- manter `resync_kernel` como próximo possível da família
  fechamento/sincronização, sem criar nem promover `resync_kernel` nesta rota;
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
  `execution_package_designer_kernel` e do `designer_kernel`, read-only, sem
  autorizar materialização ou promoção automática;
- tratar `reference/agents/**` como o único local autorizado para snapshots dev
  de base agents usados pelo kernel lab;
- tratar `reference/coder_frontend_kernel/**` como clean pass documental
  dev-only com harness textual bloqueante, sem autorizar runtime,
  materialização, produção, GitHub, repo alvo ou skill produtiva;
- tratar `reference/coder_backend_kernel/**` como clean pass documental
  dev-only com harness textual bloqueante, sem autorizar runtime, runtime
  loader, materialização, materialization path, produção, GitHub, repo alvo,
  generated reports, fixtures, target artifacts, active runtime adoption ou
  skill produtiva;
- tratar `reference/validation_runner_kernel/**` como clean pass documental
  dev-only com harness textual bloqueante, sem autorizar runtime, runtime
  loader, materialização, materialization path, produção, GitHub, repo alvo,
  generated reports, fixtures, target artifacts, active runtime adoption,
  materializer, skill produtiva ou alteração em templates canônicos;
- tratar `reference/reviewer_kernel/**` como clean pass documental dev-only com
  harness textual bloqueante, sem autorizar runtime, runtime loader,
  materialização, materialization path, produção, GitHub, repo alvo, generated
  reports, fixtures, target artifacts, active runtime adoption, materializer,
  skill produtiva ou alteração em templates canônicos;
- tratar `reference/finalizer_kernel/**` como clean pass documental dev-only
  com harness textual bloqueante, sem autorizar runtime, runtime loader,
  materialização, materialization path, produção, GitHub, repo alvo, generated
  reports, fixtures, target artifacts, active runtime adoption, materializer,
  skill produtiva, alteração em templates canônicos, execução de resync ou
  substituição de runner/reviewer;
- não recorrer à skill produtiva, `templates/**`, `~/.agents/**` ou filesystem
  externo como substituto de referência;
- não tocar na skill produtiva, templates produtivos, installer, smoke,
  `.github/**`, `.codex/**` ou `AGENTS.md`.

## Relação Com O Manifest

Esta skill dev mantém somente as referências declaradas em
`reference/MANIFEST.md`. Se algum conteúdo acordado estiver ausente, a rota
correta é bloquear e sinalizar a ausência, não procurar substitutos.
