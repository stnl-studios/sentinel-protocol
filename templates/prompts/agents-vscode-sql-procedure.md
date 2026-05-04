Use `stnl_project_agent_specializer`.

target:
- vscode

allowed_models:
- GPT-5.4
- GPT-5.4 Mini
- GPT-5.3-Codex
- GPT-5 mini
- Claude Opus 4.6
- Claude Sonnet 4.6
- Gemini 3.1 Pro
- Gemini 3 Flash

Preferência de custo:
- usar modelos mais baratos para execução mecânica, sync local, fechamento simples e validação objetiva
- preservar modelos fortes para roteamento crítico, planejamento, review arquitetural, boundary, segurança, persistência, procedure de banco, SQL versionado, migração e coordenação multi-agent

Preset:
- considerar SQL/procedures versionadas como superfície sensível de backend/persistência.

Regras excepcionais:
- localizar chamadas no código antes de alterar assinatura/parâmetros
- não inventar tabela, coluna, índice, procedure, parâmetro ou regra de negócio
- preservar compatibilidade com dados existentes sempre que possível
- declarar impacto em API, relatórios, jobs ou integrações quando aplicável
- sugerir rollback ou caminho de reversão quando possível
- exigir validação manual ou objetiva em dev/homolog quando não houver harness automatizado
