# stnl_project_agent_specializer

Skill utilitária global para especializar e manter o conjunto mínimo útil de agents locais de um projeto já preparado por `stnl_project_context` ou, em greenfield, por `stnl_project_foundation`, materializando os artifacts no runtime definido por `target`.

O contrato operacional vive em `SKILL.md`. Este README existe só para manutenção do repo.

## Notas para mantenedores
- manter `SKILL.md` repo-agnostic e centrado na capacidade
- manter `target=vscode` como default compatível com a v1 atual
- manter suporte mínimo explícito a `vscode` e `codex`
- manter a skill ancorada nos outputs do repo alvo, nunca no repo Sentinel:
  - `vscode` -> `.github/agents/*.agent.md`
  - `codex` -> `.codex/agents/*.toml`
  - `codex` -> `AGENTS.md` na raiz do repo alvo
- nunca materializar artifacts finais no repo Sentinel Protocol; este repo mantém somente source of truth, templates internos, installer e smoke
- manter o template interno de `AGENTS.md` do target `codex` em `reference/templates/codex/AGENTS.md`; esse template não é o `AGENTS.md` operacional do Sentinel
- `reference/templates/codex/` é a menor estrutura interna nova para templates que não são base agents canônicos
- lembrar que o smoke valida `vscode` e `codex` em fixtures efêmeras; `AGENTS.md`, `.codex/agents/` e `.github/agents/` finais pertencem somente ao repo alvo materializado
- manter `docs/**` como source of truth e exigir discovery sério antes de qualquer geração
- manter claro que agents Sentinel não usam storage persistente externo; durable documentation vive somente em canonical docs under `docs/**`
- impedir que templates, reference agents ou agents materializados criem, atualizem, dependam ou mencionem canais externos de fatos fora de `docs/**`
- preservar a diferença entre docs factuais de `stnl_project_context` e docs greenfield de `stnl_project_foundation`; agents não podem promover `declarado` a `observado`
- manter o modelo factual intermediário como etapa obrigatória, mesmo quando ele não virar artifact persistido
- manter classes factuais explícitas para evitar overclaim: fato confirmado, pattern scoped, exemplo, TBD, exceção documentada e check manual
- manter a geração separada do quality gate pós-geração
- manter o gate auditando shape, referências cruzadas, fidelidade factual, overclaim e coverage
- manter repair loop curto e controlado, reparando apenas arquivos sinalizados antes de revalidar
- manter `tools` como source of truth no frontmatter operacional dos specializeds `vscode`
- manter metadata endurecida com `target` em todo specialized `vscode` e `agents` obrigatório no `orchestrator` de `vscode`
- manter o custom agent TOML de `codex` distinto do frontmatter `vscode`, com shape mínimo nativo `name`, `description` e `developer_instructions`, mais `sandbox_mode` obrigatório por política Sentinel
- não tratar `tools`, `agents`, `base_agent_version`, `specialization_revision` ou `managed_artifact` como campos obrigatórios nativos de `codex`
- não serializar `tools` no TOML controlado de `codex`; usar `sandbox_mode` para hardening runtime e `developer_instructions` para preservar a política semântica de tools
- tratar o specialized final como shape normalizado e remover legado residual por default durante create e update
- não perpetuar `## Tools` no corpo nem `agent_version` no frontmatter sem ordem humana explícita
- manter a governança de `model` explícita por `model_policy` e subordinada a `allowed_models` quando existir
- manter o bundle de referências alinhado aos base agents canônicos e às docs `AGENT-CONTRACT-SHAPE`, `AGENT-SPECIALIZATION-QUALITY-GATE`, `EXECUTION-LIFECYCLE` e `STATUS-GATES`
- evitar que este README ou detalhes internos do repo virem parte do contrato final da skill

## Relação com as referências canônicas
Esta skill depende dos base agents canônicos e das docs de contrato, quality gate e workflow do Sentinel apenas como referência. Na v1, essas referências não devem ser materializadas no repo alvo.
