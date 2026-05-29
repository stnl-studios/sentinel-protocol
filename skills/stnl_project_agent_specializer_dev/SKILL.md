---
name: stnl_project_agent_specializer_dev
description: Area experimental para validar kernelizacao de agents Sentinel fora do fluxo ativo de materializacao, começando pelo orchestrator.
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
respectivo base agent. O primeiro caso de estudo é `orchestrator`.

## Rota Atual

1. Validar o `orchestrator` kernel contra
   `reference/agents/orchestrator.agent.md`.
2. Extrair princípios reaproveitáveis do caso `orchestrator`.
3. Kernelizar os demais agents por família de responsabilidade.
4. Validar o pacote de agents como conjunto coerente.
5. Avançar para Project Senior Profile somente depois dos agents kernelizados
   e validados.
6. Reconstruir a skill/materialização completa somente depois de agents e
   Profile estáveis.

## Famílias Sugeridas

- coordenação: `orchestrator`
- planejamento: `planner`, `execution-package-designer`,
  `validation-eval-designer`
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
- Contrato do orchestrator kernel:
  `reference/orchestrator_kernel/CONTRACT.md`
- Minimum safe bundle:
  `reference/orchestrator_kernel/MINIMUM_SAFE_BUNDLE.md`
- Module index:
  `reference/orchestrator_kernel/MODULE_INDEX.md`
- Activation gates:
  `reference/orchestrator_kernel/ACTIVATION_GATES.md`
- Congelamento da rota de materialização experimental:
  `reference/orchestrator_kernel/EXPERIMENTAL_MATERIALIZATION.md`
- Static checks estruturais:
  `reference/orchestrator_kernel/STATIC_CHECKS.md`
- Golden tests estruturais:
  `reference/orchestrator_kernel/GOLDEN_TESTS.md`
- Harness read-only de static checks:
  `reference/orchestrator_kernel/check-static.mjs`
- Harness read-only de golden tests:
  `reference/orchestrator_kernel/check-golden.mjs`

## Regras De Uso

- ler `reference/MANIFEST.md` antes de depender de qualquer referência interna;
- usar somente os arquivos explicitamente listados no manifest e necessários
  para a rodada;
- se faltar conteúdo acordado, bloquear e sinalizar o arquivo ausente;
- ignorar `__MACOSX` e `.DS_Store`;
- não inventar templates, paths, base agents ou refs ausentes;
- não usar fallback para skill produtiva, `templates/**`, `~/.agents/**` ou
  filesystem externo.

## Fora De Escopo Atual

- kernelizar todos os agents nesta etapa;
- implementar Project Senior Profile;
- reconstruir a skill;
- criar novo materializer;
- produzir generated artifacts;
- materializar repo alvo;
- tocar na skill produtiva `skills/stnl_project_agent_specializer/**`;
- tocar em templates produtivos `templates/**`;
- tocar em `sentinel.mjs`, `scripts/sentinel-smoke.mjs`, `.github/**`,
  `.codex/**`, `AGENTS.md` ou `~/.agents/**`.

## Checks Locais

Os checks locais são apoio estrutural/conceitual. Eles não autorizam
materialização, escrita em target, runtime adoption ou alteração do fluxo
produtivo.

Comandos:

- `node --check reference/orchestrator_kernel/check-static.mjs`
- `node --check reference/orchestrator_kernel/check-golden.mjs`
- `node reference/orchestrator_kernel/check-static.mjs`
- `node reference/orchestrator_kernel/check-golden.mjs`
