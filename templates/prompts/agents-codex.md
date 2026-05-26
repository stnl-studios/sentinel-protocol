Use `stnl_project_agent_specializer`.

target:
- codex

Codex sandbox policy:
- materializar `sandbox_mode` em todo `.codex/agents/*.toml`
- materializar `.codex/config.toml` a partir do template interno
- usar `[agents] max_depth = 1` em `.codex/config.toml`
- usar `read-only` para papéis sem edição/execução
- usar `workspace-write` para papéis que precisam editar ou executar comandos locais
- não serializar `tools` nos TOMLs Codex

Codex routing policy:
- a main/root Codex session é a human-visible workspace entrypoint para trabalho Sentinel-governed
- root/main não deve spawnar custom subagent por padrão nem por descrição do trabalho
- `Use stnl_spec_manager`, `Use stnl_project_context` e `Use stnl_project_agent_specializer` são pedidos de skill/workflow no root/main, não autorização para custom subagent
- custom subagent só pode ser chamado quando o humano pedir explicitamente por exact custom agent name, por exemplo `Use orchestrator`, `Use planner`, `Use coder-frontend` ou `Use validation-runner`
- se uma tarefa exigir custom subagent Sentinel e o humano não tiver autorizado um agent por nome exato, bloquear com `SUBAGENT_AUTH_REQUIRED` e informar o agent necessário, motivo curto e prompt mínimo para rerun com `Use <agent>`
- quando o humano pede `Use orchestrator`, aplicar Codex Parent-Mediated Routing Contract: root/main spawna `orchestrator`; `orchestrator` retorna ROUTE_PACKET compacto; root/main spawna o owner indicado como sibling/root-level native custom subagent; owner retorna compacto; root/main volta ao `orchestrator` para próxima decisão
- `[agents].max_depth = 1` permite subagents diretos do root/main quando explicitamente autorizados e bloqueia nested owner threads abaixo do `orchestrator`
- em Codex visual mode, `orchestrator` é route decision owner, não spawn executor dos downstream owners; ele não deve spawnar downstream Sentinel owners diretamente
- root/main não escolhe owner por conta própria sem ROUTE_PACKET válido do `orchestrator`, exceto pedido humano explícito de custom agent específico por nome exato ou comportamento documentado de recovery/blocking
- o spawn Sentinel não deve solicitar nem depender de full-history fork
- o payload para subagent explicitamente autorizado deve ser mínimo e task-scoped: tarefa, repo, SPEC path quando aplicável, modo, objetivo, decisões ativas e instrução para ler `AGENTS.md`, developer instructions, templates/docs Sentinel e docs/codebase permitidos
- se full-history fork for recusado, isso só é aceitável se a runtime criar uma native agent thread do custom subagent explicitamente solicitado
- contrato completo colado no prompt não é handoff nativo e não preserva handoff nativo por nome
- `orchestrator.toml` é o routing controller do fluxo Sentinel no Codex somente quando explicitamente invocado, não fallback automático
- o `orchestrator` deve decidir o owner canônico atual por exact custom agent name, preservar boundaries, retornar ROUTE_PACKET compacto e aguardar o root/main devolver o resultado compacto do owner antes do próximo gate
- direct root-to-owner spawning não é o caminho Sentinel padrão; só vale para pedido humano explícito de agente específico ou uso non-Sentinel
- handoff Sentinel no Codex = native custom subagent spawn pelo nome exato do custom agent executado por root/main após autorização explícita e/ou ROUTE_PACKET válido
- nunca usar `codex exec`, shell, subprocesso, script ou continuação local para simular handoff
- bloquear com `ROUTING_RUNTIME_BLOCKED` se houver autorização explícita mas não houver agent thread nativa do custom subagent solicitado, se o runtime não suportar/permitir spawn nativo, se depth/config bloquear, ou se o custom agent nomeado estiver indisponível

Compact Agent Return Contract:
- todo subagent deve retornar só o mínimo necessário para o parent decidir o próximo gate
- formato default: `STATUS`, `OWNER`, `GATE`, `FILES_CHANGED`, `NEXT_OWNER`, `VALIDATIONS`, `BLOCKER` somente se real, e `NOTES` com no máximo 3 bullets curtos
- não repetir contrato Sentinel completo, prompt inteiro, SPEC, checklist, docs, logs, diffs ou artifacts completos no chat
- quando houver artifact em arquivo, retornar path + resumo compacto
- expandir somente em blocker, falha, evidência crítica de validação ou pedido humano explícito
- manter main chat focado em routing/status deltas

allowed_models:
- gpt-5.5
- gpt-5.4
- gpt-5.4-mini
- gpt-5.3-codex
- gpt-5.2

Preferência de custo:
- usar modelos mais baratos para execução mecânica, sync local, fechamento simples e validação objetiva
- preservar modelos fortes para roteamento crítico, planejamento, review arquitetural, boundary, segurança, persistência, migração e coordenação multi-agent
