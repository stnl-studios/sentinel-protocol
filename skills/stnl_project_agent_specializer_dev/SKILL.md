---
name: stnl_project_agent_specializer_dev
description: Area experimental para validar kernelizacao documental de agents Sentinel fora do fluxo ativo de materializacao.
---

# STNL Project Agent Specializer Dev

> Experimental: esta skill dev é uma área isolada para evolução controlada e
> não substitui `stnl_project_agent_specializer`.

## Foco Atual

Esta skill dev não é o caminho ativo para materializar agents em repo alvo.

A rota anterior de materialização experimental isolada por script solto foi
congelada e seus artefatos ativos foram removidos. Não há materializer ativo,
não há generated artifact como entrega ativa e não há autorização para escrever
artifacts finais de `target`.

O foco imediato é validar kernelização de agents comparando cada kernel com seu
respectivo snapshot dev de base agent em `reference/agents/**`. O
`execution_package_designer_kernel` está congelado como
`EXECUTION_PACKAGE_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS` após auditoria humana
final com `CLEAN_AUDIT_PASS_FOR_PROMOTION_RECOMMENDATION`, limitado ao kernel
lab dev documental, contratual, semântico mínimo e com harness textual
executável endurecido. O `designer_kernel` também está congelado como
`CLEAN_EXCELLENT_PASS` após promoção documental controlada. O
`coder_frontend_kernel` também está promovido como `CLEAN_EXCELLENT_PASS` após
promoção documental controlada.

Há seis kernels congelados como `CLEAN_EXCELLENT_PASS`: `orchestrator_kernel`,
`planner_kernel`, `validation_eval_designer_kernel`,
`execution_package_designer_kernel`, `designer_kernel` e
`coder_frontend_kernel`.

O `orchestrator_kernel` está congelado como `CLEAN_EXCELLENT_PASS`. O
`planner_kernel` também está congelado como `CLEAN_EXCELLENT_PASS` para o kernel
lab documental, contratual e semântico mínimo. Ele possui harnesses executáveis
read-only próprios em
`reference/planner_kernel/validation/check-static.mjs` e
`reference/planner_kernel/validation/check-golden.mjs`, mas isso não muda o
comportamento produtivo, não cria runtime, não autoriza materialização real,
não cria fallback para `templates/**` e não concede promoção automática para
qualquer kernel futuro. Ambos os passes são resultados exclusivos do kernel lab
dev e não autorizam repo alvo, skill produtiva ou materializer.

O `validation_eval_designer_kernel` está promovido como
`VALIDATION_EVAL_DESIGNER_KERNEL: CLEAN_EXCELLENT_PASS` após auditoria humana
crítica separadamente autorizada. Esse pass vale somente para o kernel lab dev
documental, contratual, semântico mínimo e com harness textual executável
endurecido. Seus harnesses são apoio bloqueante read-only e não concedem
promoção automática, runtime, materialização, escrita em repo alvo,
autorização para skill produtiva ou autorização para materializer.

O `execution_package_designer_kernel` também é pass exclusivo do kernel lab dev
documental, contratual, semântico mínimo e com harness textual executável
endurecido. Ele não autoriza runtime pass, materialization pass, target repo
pass, skill produtiva autorizada, materializer autorizado, repo alvo ou agente
executado em produção.

O `designer_kernel` é pass exclusivo do kernel lab dev documental, contratual,
semântico mínimo e com harness textual executável endurecido. Ele preserva
`optional per round`, real UX impact, `design-contributor`, `targeted-local`,
decisão de `required` vs `advisory` pelo orchestrator, `READY` difícil,
`BLOCKED` honesto e estreito, contribuição efêmera, no durable docs, no
`VALIDATION PACK` ownership, no `EXECUTION PACKAGE` ownership, no
implementation, no validation running e no resync/finalization. Ele não
autoriza runtime pass, materialization pass, target repo pass, skill produtiva
autorizada, materializer autorizado, escrita em GitHub, escrita em repo alvo ou
agente executado em produção.

O `coder_frontend_kernel` é clean pass documental exclusivo do kernel lab dev.
Ele preserva `executor`, `targeted-local`, execução de pacote frontend
autorizado, `EXECUTION PACKAGE`, `WORK_PACKAGE_ID`, `EXECUTION BRIEF`,
`VALIDATION PACK`, guardrails requeridos quando presentes, contexto técnico
mínimo frontend, consumo opcional de direção do `designer`, outputs com
implementação, delta conciso, paths/evidência, checks, risco residual e blocker
exato quando `BLOCKED`, além dos status `READY` e `BLOCKED`. Ele possui harness
documental/textual endurecido de validação, não é runtime pass, não é
materialization pass, não é target repo pass, não autoriza produção, não
autoriza skill produtiva, não autoriza materializer, não autoriza escrita em
GitHub, não autoriza escrita em repo alvo e não autoriza alteração em templates
canônicos.

## Rota Atual

1. Validar o `orchestrator` kernel contra
   `reference/agents/orchestrator.agent.md`, preservando seu congelamento.
2. Preservar o `planner_kernel` contra `reference/agents/planner.agent.md`, o
   snapshot dev local derivado de `templates/agents/planner.agent.md`.
   Os harnesses do planner são apoio bloqueante e podem bloquear drift
   documental, mas não promovem automaticamente nenhum kernel.
3. Preservar o `validation_eval_designer_kernel` contra
   `reference/agents/validation-eval-designer.agent.md`, snapshot dev local
   derivado literalmente de
   `templates/agents/validation-eval-designer.agent.md`.
4. Preservar o `execution_package_designer_kernel` congelado contra
   `reference/agents/execution-package-designer.agent.md`, snapshot dev local
   derivado literalmente de
   `templates/agents/execution-package-designer.agent.md`.
5. Executar os harnesses do `execution_package_designer_kernel` somente como
   apoio bloqueante read-only, sem promoção automática.
6. Preservar o `designer_kernel` congelado contra
   `reference/agents/designer.agent.md`, snapshot dev local derivado literalmente
   de `templates/agents/designer.agent.md`.
7. Executar os harnesses do `designer_kernel` somente como apoio bloqueante
   read-only, sem promoção automática.
8. Preservar o `coder_frontend_kernel` promovido contra
   `reference/agents/coder-frontend.agent.md`, snapshot dev local derivado
   literalmente de `templates/agents/coder-frontend.agent.md`, com harness
   documental/textual endurecido e sem runtime, materialização, produção,
   escrita em GitHub, escrita em repo alvo ou alteração em templates canônicos.
9. Extrair princípios reaproveitáveis sem forçar todos os agents ao mesmo molde.
10. Kernelizar agentes futuros somente em rodadas autorizadas próprias.
11. Validar o pacote de agents como conjunto coerente.
12. Avançar para Project Senior Profile somente depois dos agents kernelizados
   e validados.
13. Reconstruir a skill/materialização completa somente depois de agents e
    Profile estáveis.

## Famílias Sugeridas

- coordenação: `orchestrator`
- recorte e execution brief: `planner`
- desenho de prova e validation pack: `validation-eval-designer`
- empacotamento executável efêmero e execution package:
  `execution-package-designer`
- execução: `designer`, `coder-frontend`, `coder-backend`
- validação: `validation-runner`, `reviewer`
- fechamento/sincronização: `finalizer`, `resync`

A disciplina é comum, mas o desenho do kernel pode variar por família de
responsabilidade. Não forçar todos os agents ao mesmo molde interno.

## Critérios Base Agent Vs Kernel

Toda comparação deve validar que o kernel:

- preserva missão central;
- preserva limites de autoridade;
- preserva inputs/outputs;
- preserva handoffs;
- preserva completion contract;
- preserva proteções contra role drift;
- preserva gates críticos;
- remove redundância sem remover comportamento crítico;
- não depende de materialização, fallback ou contexto externo inexistente;
- mantém diferenças intencionais e justificadas.

## Referências Atuais

- Kernel lab: `reference/kernel_lab/README.md`
- Manifest do bundle dev: `reference/MANIFEST.md`
- Base `orchestrator` copiado para comparação:
  `reference/agents/orchestrator.agent.md`
- Snapshot dev do `planner` copiado literalmente do template produtivo:
  `reference/agents/planner.agent.md`
- Contrato do orchestrator kernel:
  `reference/orchestrator_kernel/contracts/CONTRACT.md`
- Minimum safe bundle:
  `reference/orchestrator_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- Module index:
  `reference/orchestrator_kernel/contracts/MODULE_INDEX.md`
- Activation gates:
  `reference/orchestrator_kernel/contracts/ACTIVATION_GATES.md`
- Congelamento da rota de materialização experimental:
  `reference/orchestrator_kernel/contracts/EXPERIMENTAL_MATERIALIZATION.md`
- Static checks estruturais:
  `reference/orchestrator_kernel/validation/STATIC_CHECKS.md`
- Golden tests estruturais:
  `reference/orchestrator_kernel/validation/GOLDEN_TESTS.md`
- Harness read-only de static checks:
  `reference/orchestrator_kernel/validation/check-static.mjs`
- Harness read-only de golden tests:
  `reference/orchestrator_kernel/validation/check-golden.mjs`
- Kernel documental do planner:
  `reference/planner_kernel/README.md`
- Contratos documentais do planner:
  `reference/planner_kernel/contracts/CONTRACT.md`,
  `reference/planner_kernel/contracts/BEHAVIOR_PARITY_SPINE.md` e
  `reference/planner_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- Validação documental e harnesses read-only do planner, sem runtime de agente:
  `reference/planner_kernel/validation/STATIC_CHECKS.md` e
  `reference/planner_kernel/validation/GOLDEN_TESTS.md`
- Harness read-only de static checks do planner:
  `reference/planner_kernel/validation/check-static.mjs`
- Harness read-only de golden checks do planner:
  `reference/planner_kernel/validation/check-golden.mjs`
- Snapshot dev local do `execution-package-designer`:
  `reference/agents/execution-package-designer.agent.md`
- Kernel documental do `execution-package-designer`:
  `reference/execution_package_designer_kernel/README.md`
- Contratos documentais do `execution-package-designer`:
  `reference/execution_package_designer_kernel/contracts/CONTRACT.md`,
  `reference/execution_package_designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `reference/execution_package_designer_kernel/contracts/PACKAGE_READINESS_GATES.md` e
  `reference/execution_package_designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- Validação documental e harnesses read-only do `execution-package-designer`,
  sem runtime de agente:
  `reference/execution_package_designer_kernel/validation/STATIC_CHECKS.md` e
  `reference/execution_package_designer_kernel/validation/GOLDEN_TESTS.md`
- Harness read-only de static checks do `execution-package-designer`:
  `reference/execution_package_designer_kernel/validation/check-static.mjs`
- Harness read-only de golden checks do `execution-package-designer`:
  `reference/execution_package_designer_kernel/validation/check-golden.mjs`
- Snapshot dev local do `validation-eval-designer`:
  `reference/agents/validation-eval-designer.agent.md`
- Kernel documental do `validation-eval-designer`:
  `reference/validation_eval_designer_kernel/README.md`
- Contratos documentais do `validation-eval-designer`:
  `reference/validation_eval_designer_kernel/contracts/CONTRACT.md`,
  `reference/validation_eval_designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `reference/validation_eval_designer_kernel/contracts/HARNESS_DECISION_GATES.md`
  e
  `reference/validation_eval_designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- Validação documental e harnesses read-only do `validation-eval-designer`:
  `reference/validation_eval_designer_kernel/validation/STATIC_CHECKS.md`,
  `reference/validation_eval_designer_kernel/validation/GOLDEN_TESTS.md`,
  `reference/validation_eval_designer_kernel/validation/check-static.mjs` e
  `reference/validation_eval_designer_kernel/validation/check-golden.mjs`
- Snapshot dev local do `designer`:
  `reference/agents/designer.agent.md`
- Kernel documental do `designer`:
  `reference/designer_kernel/README.md`
- Contratos documentais do `designer`:
  `reference/designer_kernel/contracts/CONTRACT.md`,
  `reference/designer_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `reference/designer_kernel/contracts/DESIGN_CONTRIBUTION_GATES.md` e
  `reference/designer_kernel/contracts/MINIMUM_SAFE_BUNDLE.md`
- Validação documental e harnesses read-only do `designer`:
  `reference/designer_kernel/validation/STATIC_CHECKS.md`,
  `reference/designer_kernel/validation/GOLDEN_TESTS.md`,
  `reference/designer_kernel/validation/check-static.mjs` e
  `reference/designer_kernel/validation/check-golden.mjs`
- Snapshot dev local do `coder-frontend`:
  `reference/agents/coder-frontend.agent.md`
- Kernel documental clean pass do `coder-frontend`:
  `reference/coder_frontend_kernel/README.md`
- Contratos documentais clean pass do `coder-frontend`:
  `reference/coder_frontend_kernel/contracts/CONTRACT.md`,
  `reference/coder_frontend_kernel/contracts/BEHAVIOR_PARITY_SPINE.md`,
  `reference/coder_frontend_kernel/contracts/MINIMUM_SAFE_BUNDLE.md` e
  `reference/coder_frontend_kernel/contracts/FRONTEND_EXECUTION_GATES.md`
- Validação documental/textual read-only do `coder-frontend`, sem promoção
  automática futura:
  `reference/coder_frontend_kernel/validation/STATIC_CHECKS.md`,
  `reference/coder_frontend_kernel/validation/GOLDEN_TESTS.md`,
  `reference/coder_frontend_kernel/validation/check-static.mjs` e
  `reference/coder_frontend_kernel/validation/check-golden.mjs`

## Regras De Uso

- ler `reference/MANIFEST.md` antes de depender de qualquer referência interna;
- usar somente os arquivos explicitamente listados no manifest e necessários
  para a rodada;
- se faltar conteúdo acordado, bloquear e sinalizar o arquivo ausente;
- ignorar `__MACOSX` e `.DS_Store`;
- não inventar templates, paths, base agents ou refs ausentes;
- usar snapshots dev de base agents somente quando estiverem em
  `reference/agents/**` e declarados no manifest;
- não usar fallback para skill produtiva, `templates/**`, `~/.agents/**` ou
  filesystem externo.

## Fora De Escopo Atual

- kernelizar todos os agents nesta etapa;
- implementar Project Senior Profile;
- reconstruir a skill;
- criar novo materializer;
- produzir generated artifacts;
- criar fixture, generated report, runtime ou materializer para o planner;
- criar qualquer harness do planner além dos dois scripts read-only declarados;
- criar fixture, generated report, runtime loader, materializer ou
  materialization path para o `coder_frontend_kernel`;
- materializar repo alvo;
- tocar na skill produtiva `skills/stnl_project_agent_specializer/**`;
- tocar em templates produtivos `templates/**`;
- tocar em `sentinel.mjs`, `scripts/sentinel-smoke.mjs`, `.github/**`,
  `.codex/**`, `AGENTS.md` ou `~/.agents/**`.

## Checks Locais

Os checks locais são apoio estrutural/conceitual. Eles não autorizam
materialização, escrita em target, runtime adoption ou alteração do fluxo
produtivo. O pass registrado para cada kernel lab não altera esses limites.

Comandos executados da raiz do repo:

- `node --check skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/validation/check-static.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/validation/check-golden.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/check-static.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/check-golden.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/validation_eval_designer_kernel/validation/check-static.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/validation_eval_designer_kernel/validation/check-golden.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/execution_package_designer_kernel/validation/check-static.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/execution_package_designer_kernel/validation/check-golden.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/designer_kernel/validation/check-static.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/designer_kernel/validation/check-golden.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/coder_frontend_kernel/validation/check-static.mjs`
- `node --check skills/stnl_project_agent_specializer_dev/reference/coder_frontend_kernel/validation/check-golden.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/validation/check-static.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/orchestrator_kernel/validation/check-golden.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/check-static.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/planner_kernel/validation/check-golden.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/validation_eval_designer_kernel/validation/check-static.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/validation_eval_designer_kernel/validation/check-golden.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/execution_package_designer_kernel/validation/check-static.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/execution_package_designer_kernel/validation/check-golden.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/designer_kernel/validation/check-static.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/designer_kernel/validation/check-golden.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/coder_frontend_kernel/validation/check-static.mjs`
- `node skills/stnl_project_agent_specializer_dev/reference/coder_frontend_kernel/validation/check-golden.mjs`
