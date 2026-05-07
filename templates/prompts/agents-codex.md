Use `stnl_project_agent_specializer`.

target:
- codex

Codex sandbox policy:
- materializar `sandbox_mode` em todo `.codex/agents/*.toml`
- usar `read-only` para papéis sem edição/execução
- usar `workspace-write` para papéis que precisam editar ou executar comandos locais
- não serializar `tools` nos TOMLs Codex

allowed_models:
- GPT-5.5
- GPT-5.4
- GPT-5.4 Mini
- GPT-5.3-Codex
- GPT-5.2

Preferência de custo:
- usar modelos mais baratos para execução mecânica, sync local, fechamento simples e validação objetiva
- preservar modelos fortes para roteamento crítico, planejamento, review arquitetural, boundary, segurança, persistência, migração e coordenação multi-agent
