Use `stnl_project_agent_specializer`.

target:
- codex

Codex sandbox policy:
- materializar `sandbox_mode` em todo `.codex/agents/*.toml`
- materializar `.codex/config.toml` a partir do template interno
- usar `[agents] max_depth = 2` em `.codex/config.toml`
- usar `read-only` para papéis sem edição/execução
- usar `workspace-write` para papéis que precisam editar ou executar comandos locais
- não serializar `tools` nos TOMLs Codex

Codex routing policy:
- a main/root Codex session é o default visual entrypoint para trabalho Sentinel-governed
- não spawnar `orchestrator` automaticamente como primeiro task por default
- a root/main session deve aplicar o Sentinel orchestrator boundary, ler somente o necessário para identificar gate/current owner e spawnar diretamente o owner canônico atual
- handoff Sentinel no Codex = native custom subagent spawn pelo nome exato do custom agent
- aguardar o resultado do subagent antes de decidir o próximo gate
- nunca usar `codex exec`, shell, subprocesso, script ou continuação local para simular handoff
- bloquear com `ROUTING_RUNTIME_BLOCKED` se o runtime não suportar/permitir spawn nativo, se depth/config bloquear, ou se o custom agent nomeado estiver indisponível
- `orchestrator.toml` deve permanecer disponível para invocação humana explícita, fallback e referência de boundary, mas não é o default visual entrypoint

allowed_models:
- gpt-5.5
- gpt-5.4
- gpt-5.4-mini
- gpt-5.3-codex
- gpt-5.2

Preferência de custo:
- usar modelos mais baratos para execução mecânica, sync local, fechamento simples e validação objetiva
- preservar modelos fortes para roteamento crítico, planejamento, review arquitetural, boundary, segurança, persistência, migração e coordenação multi-agent
