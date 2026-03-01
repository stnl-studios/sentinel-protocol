# Quickstart - Sentinel Prompt Preflight

Use esta skill quando o pedido estiver ambíguo ou quando faltarem permissões e limites claros para execução.

## Regras de uso rápido
- Se o pedido já estiver completo (objetivo, escopo IN/OUT, restrições, critérios e permissões), não perguntar nada.
- Se faltar informação essencial, fazer elicitação mínima (máximo 2 rodadas, até 8 perguntas por rodada).
- Sempre entregar um único prompt final forte com PLAN/AGENT e stop rules explícitas.
- Registrar lacunas remanescentes como TBD, sem bloquear a entrega do prompt final.

## Saída esperada
- Markdown em PT-BR.
- Formato fixo de 8 seções.
- Sem JSON.
