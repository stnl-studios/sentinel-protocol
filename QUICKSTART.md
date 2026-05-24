# Início rápido

Sentinel Protocol é um kit de protocolo em alfa. Use com revisão humana, testes e julgamento técnico normal.

## 1. Clone o repositório

```sh
git clone git@github.com:stnl-studios/sentinel-protocol.git
cd sentinel-protocol
```

## 2. Valide o repositório

Rode o smoke estrutural:

```sh
node sentinel.mjs smoke
```

O smoke valida a estrutura local e o wiring. Ele não prova qualidade semântica em projetos alvo reais.

## 3. Instale os assets locais

Prepare as skills/assets locais do Sentinel:

```sh
node sentinel.mjs install
```

Depois verifique a instalação local:

```sh
node sentinel.mjs doctor
```

Use `node sentinel.mjs doctor --source-only` quando quiser validar apenas o repositório fonte, sem exigir instalação em `HOME`. `init` e `update` continuam aliases de compatibilidade para `install`.

## Primeiro uso: repositório existente

Use `stnl_project_context` primeiro para fazer bootstrap ou resync do contexto factual do projeto. Depois que o repositório tiver contexto suficiente, use `stnl_project_agent_specializer` para gerar agents específicos do projeto para `vscode` ou `codex`.

Quando o trabalho precisar de implementação, crie ou retome uma SPEC com `stnl_spec_manager`. A SPEC ativa deve carregar `spec_slices.md` como mapa obrigatório de consumo; mesmo em corte único, `SL-001` representa o limite aprovado.

Use a Planning Interface somente quando houver necessidade de enriquecer restrições para consumo posterior do planner. Ela é documental e condicional: não autoriza execução, não cria work packages e não substitui `planner`, `validation-eval-designer`, `execution-package-designer` ou `finalizer`.

Ao consumir documentação Sentinel, respeite o `File Purpose Header`: ele indica quando ler o arquivo, para que ele serve e o que ele não autoriza.

Depois que a SPEC estiver pronta para execução, use `orchestrator`. No target Codex, `orchestrator` é o roteador lógico do fluxo Sentinel, mas a sessão parent/root medeia subagents nativos por `ROUTE_PACKET`, com autorização explícita e max depth controlado.

## Primeiro uso: projeto novo ou greenfield

Use `stnl_project_foundation` primeiro quando ainda não houver contexto de codebase existente para descobrir. Ela prepara uma fundação documental a partir de fontes e decisões declaradas.

Depois da foundation, use `stnl_project_agent_specializer` e então crie ou retome uma SPEC com `stnl_spec_manager`, preservando `spec_slices.md` como mapa de consumo da SPEC ativa. A execução continua acontecendo via `orchestrator`, com a mesma regra de Planning Interface documental e condicional.

## Prompts

Use [PROMPTS.md](PROMPTS.md) para escolher o launcher correto. Os templates reais de prompt ficam em [`templates/prompts/`](templates/prompts/).
