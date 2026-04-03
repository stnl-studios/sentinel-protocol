# stnl_project_agent_specializer

Skill utilitária global para especializar e manter o conjunto mínimo útil de agents locais de um projeto já preparado por `stnl_project_context`.

O contrato operacional vive em `SKILL.md`. Este README existe só para manutenção do repo.

## Notas para mantenedores
- manter `SKILL.md` repo-agnostic e centrado na capacidade
- manter a skill ancorada no output `.github/agents/`
- manter `tools` como source of truth no frontmatter operacional dos specializeds
- manter o frontmatter endurecido com `target: vscode` em todo specialized e `agents` obrigatório no `orchestrator`
- tratar o specialized final como shape normalizado e remover legado residual por default durante create e update
- não perpetuar `## Tools` no corpo nem `agent_version` no frontmatter sem ordem humana explícita
- manter a governança de `model` explícita por `model_policy` e subordinada a `allowed_models` quando existir
- manter o bundle de referências alinhado aos base agents canônicos e às docs `AGENT-CONTRACT-SHAPE` e `STATUS-GATES`
- evitar que este README ou detalhes internos do repo virem parte do contrato final da skill

## Relação com as referências canônicas
Esta skill depende dos base agents canônicos e das docs de contrato e workflow do Sentinel apenas como referência. Na v1, essas referências não devem ser materializadas no repo alvo.
