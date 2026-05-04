# Quickstart

Sentinel Protocol é um kit de protocolo em alpha. Use com revisão humana, testes e julgamento técnico normal.

## 1. Clone o repo

```sh
git clone <repo-url>
cd sentinel-protocol
```

## 2. Valide o repo

Rode o smoke estrutural:

```sh
node sentinel.mjs smoke
```

O smoke valida estrutura local e wiring. Ele não prova qualidade semântica em projetos alvo reais.

## 3. Instale os assets locais

Prepare as skills/assets locais do Sentinel:

```sh
node sentinel.mjs init
```

Depois verifique a instalação local:

```sh
node sentinel.mjs doctor
```

## Primeiro uso: repo existente

Use `stnl_project_context` primeiro para fazer bootstrap ou resync do contexto factual do projeto. Depois que o repo tiver contexto suficiente, use `stnl_project_agent_specializer` para gerar agents específicos do projeto para `vscode` ou `codex`.

Quando o trabalho precisar de implementação, crie ou retome uma SPEC com `stnl_spec_manager` e execute via `orchestrator`.

## Primeiro uso: projeto novo ou greenfield

Use `stnl_project_foundation` primeiro quando ainda não houver contexto de codebase existente para descobrir. Ela prepara uma fundação documental a partir de fontes e decisões declaradas.

Depois da foundation, use `stnl_project_agent_specializer` e então crie ou retome uma SPEC com `stnl_spec_manager`. A execução continua acontecendo via `orchestrator`.

## Prompts

Use [PROMPTS.md](PROMPTS.md) para escolher o launcher correto. Os templates reais de prompt vivem em [`templates/prompts/`](templates/prompts/).
