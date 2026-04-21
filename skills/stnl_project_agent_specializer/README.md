# stnl_project_agent_specializer

Skill utilitária global para especializar e manter o conjunto mínimo útil de agents locais de um projeto já preparado por `stnl_project_context`, materializando os artifacts no runtime definido por `target`.

O contrato operacional vive em `SKILL.md`. Este README existe só para manutenção do repo.

## Notas para mantenedores
- manter `SKILL.md` repo-agnostic e centrado na capacidade
- manter `target=vscode` como default compatível com a v1 atual
- manter suporte mínimo explícito a `vscode` e `codex`
- manter a skill ancorada nos outputs do repo alvo:
  - `vscode` -> `.github/agents/*.agent.md`
  - `codex` -> `.codex/agents/*.toml` e `AGENTS.md`
- nunca materializar artifacts finais no repo Sentinel Protocol; este repo mantém somente source of truth e templates internos
- manter o template interno de `AGENTS.md` do target `codex` em `reference/templates/codex/AGENTS.md`
- `reference/templates/codex/` é a menor estrutura interna nova para templates que não são base agents canônicos
- manter `docs/**` como source of truth e exigir discovery sério antes de qualquer geração
- manter o modelo factual intermediário como etapa obrigatória, mesmo quando ele não virar artifact persistido
- manter classes factuais explícitas para evitar overclaim: fato confirmado, pattern scoped, exemplo, TBD, exceção documentada e check manual
- manter a geração separada do quality gate pós-geração
- manter o gate auditando shape, referências cruzadas, fidelidade factual, overclaim e coverage
- manter repair loop curto e controlado, reparando apenas arquivos sinalizados antes de revalidar
- manter `tools` como source of truth no frontmatter operacional dos specializeds `vscode`
- manter metadata endurecida com `target` em todo specialized `vscode` e `agents` obrigatório no `orchestrator` de `vscode`
- manter o custom agent TOML de `codex` distinto do frontmatter `vscode`, com shape mínimo `name`, `description` e `developer_instructions`
- não tratar `tools`, `agents`, `base_agent_version`, `specialization_revision` ou `managed_artifact` como campos obrigatórios nativos de `codex`
- tratar o specialized final como shape normalizado e remover legado residual por default durante create e update
- não perpetuar `## Tools` no corpo nem `agent_version` no frontmatter sem ordem humana explícita
- manter a governança de `model` explícita por `model_policy` e subordinada a `allowed_models` quando existir
- manter o bundle de referências alinhado aos base agents canônicos e às docs `AGENT-CONTRACT-SHAPE`, `AGENT-SPECIALIZATION-QUALITY-GATE`, `EXECUTION-LIFECYCLE` e `STATUS-GATES`
- evitar que este README ou detalhes internos do repo virem parte do contrato final da skill

## Relação com as referências canônicas
Esta skill depende dos base agents canônicos e das docs de contrato, quality gate e workflow do Sentinel apenas como referência. Na v1, essas referências não devem ser materializadas no repo alvo.
