# Quickstart - Sentinel Prompt Preflight

Use esta skill para transformar um pedido em prompt compacto do Router Planner, com baixo consumo de tokens no uso diario.

## Regras de uso rapido
- Modo padrao: `LITE`
- Escalar para `FULL` somente em escopo `Estrutural` ou quando o usuario pedir `FULL`
- Se faltar base canonica, sugerir bootstrap com `SKIP` ou `SKIP-PLAN`
- Manter packs lazy: sanity check por existencia antes da primeira leitura, evidence pack so com paths e nomes de secoes

## Saida esperada
- Sempre 1 unico bloco de codigo Markdown `md`
- Nenhum texto fora do bloco
- `PlanID` em `PLAN-YYYYMMDD-01`
- `AdrID` em `ADR-YYYYMMDD-01` quando o escopo for `Estrutural`
