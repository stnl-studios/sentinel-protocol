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
  - `codex` -> `.codex/config.toml`
  - `codex` -> `AGENTS.md` na raiz do repo alvo
- no target `codex`, manter a main/root Codex session como superficie humana/visual do workspace
- no target `codex`, manter `orchestrator.toml` como o primeiro subagent padrao Sentinel e default routing controller antes dos owners especialistas
- no target `codex`, manter `[agents].max_depth = 1`; isso permite subagents diretos do root/main e bloqueia owners aninhados abaixo do `orchestrator`
- no target `codex`, preservar parent-mediated routing: `root/main -> orchestrator -> ROUTE_PACKET -> root/main spawns owner sibling/root-level -> root/main returns to orchestrator`
- no target `codex`, `orchestrator` decide gate/owner e retorna `ROUTE_PACKET` compacto; ele nao spawna downstream owners diretamente no fluxo visual padrao
- no target `codex`, root/main nao escolhe owner sem `ROUTE_PACKET` valido do `orchestrator`, salvo pedido humano explicito non-Sentinel/custom-agent ou recovery/blocking documentado
- no target `codex`, full-history fork nao e requisito Sentinel; agent thread nativa de `orchestrator` basta para continuar
- no target `codex`, payload para `orchestrator` deve ser minimo e task-scoped, com contrato duravel vindo de `AGENTS.md`, `.codex/agents/*.toml`, docs/templates Sentinel e docs/codebase permitidos
- no target `codex`, contrato completo no prompt e fallback proibido e nao pode ser descrito como handoff nativo preservado
- no target `codex`, se a agent thread nativa necessaria nao subir, bloquear com `ROUTING_RUNTIME_BLOCKED`
- no target `codex`, manter `Compact Agent Return Contract` em `AGENTS.md` e nos TOMLs gerenciados: subagents retornam só status/gate/evidencia minima, artifact path + resumo compacto, sem despejar contrato/SPEC/checklist/logs/diffs/artifacts completos no chat por default
- preservar as melhorias novas de quality, model selection, sandbox e runtime hardening sem orientar root-to-owner direto como fluxo Sentinel default
- nunca materializar artifacts finais no repo Sentinel Protocol; este repo mantém somente source of truth, templates internos, installer e smoke
- manter os templates internos do target `codex` em `reference/templates/codex/AGENTS.md` e `reference/templates/codex/config.toml`; esses templates não são artifacts operacionais do repo Sentinel
- nunca criar `.codex/config.toml` final na raiz do repo Sentinel; esse arquivo só deve existir como template interno ou como artifact final no repo alvo materializado
- `reference/templates/codex/` é a menor estrutura interna nova para templates que não são base agents canônicos
- lembrar que o smoke valida `vscode` e `codex` em fixtures efêmeras; `AGENTS.md`, `.codex/agents/`, `.codex/config.toml` e `.github/agents/` finais pertencem somente ao repo alvo materializado
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
- manter `model` como campo operacional obrigatório em todo agent materializado
- manter `model_policy` como override avançado opcional; ausência de `model_policy` não deve exigir matriz longa nos prompts de uso diário
- manter `allowed_models` como lista autorizada e ordenada para resolução default por role class
- manter `model_reasoning_effort` obrigatório apenas nos TOMLs `codex`
- nunca serializar effort operacional no frontmatter `.agent.md` de VS Code/GitHub
- manter o gate de 30.000 caracteres para prompts Markdown de `.agent.md` VS Code/GitHub
- preservar a política `Consistency without legacy propagation`: consistência com o projeto não autoriza copiar dívida técnica acidental nem fazer refactor amplo escondido
- manter gate explícito de propagação protocol-fixed entre `templates/agents`, `reference/agents` instalado e artifact final materializado; Codex deve carregar esses blocos em `developer_instructions`
- manter o bundle de referências alinhado aos base agents canônicos e às docs `AGENT-CONTRACT-SHAPE`, `AGENT-SPECIALIZATION-QUALITY-GATE`, `EXECUTION-LIFECYCLE` e `STATUS-GATES`
- evitar que este README ou detalhes internos do repo virem parte do contrato final da skill

## Relação com as referências canônicas
Esta skill depende dos base agents canônicos e das docs de contrato, quality gate e workflow do Sentinel apenas como referência. Na v1, essas referências não devem ser materializadas no repo alvo.
