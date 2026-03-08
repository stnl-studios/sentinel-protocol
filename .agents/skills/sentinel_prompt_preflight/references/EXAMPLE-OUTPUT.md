# Exemplo de Saida Correta

````md
```md
TAREFA
Executar a Fase 1 do PLAN da feature indicada pelo usuario, criando apenas o service e a interface citados no escopo informado.

MODO
Router Planner. Primeiro planeje. Nao execute nada antes de OK com o ID correto.

SANITY CHECK
- docs/INDEX.md: PRESENTE
- docs/core/RULES.md: PRESENTE
- docs/core/CONTEXT.md: PRESENTE
- docs/core/STATE.md: PRESENTE
- PLAN canonico (`docs/core/PLAN.md`): AUSENTE
- PLAN fallback (`PLAN.md`): PRESENTE
- PLAN de feature: NAO IDENTIFICADO PELO TEXTO DO USUARIO
Se faltar base critica, pare e aguarde `SKIP`.
Se faltar PLAN, pare e aguarde `SKIP-PLAN`.

FONTES CANONICAS
Use apenas por referencia de path ou categoria:
- `docs/INDEX.md`
- `docs/core/`
- `docs/decisions/`
- `docs/features/`
- `docs/core/PLAN.md` ou `PLAN.md`
Leia conteudo somente sob demanda no executor.

LEITURA SOB DEMANDA
Leia apenas o minimo necessario para planejar.
Nao leia o repo inteiro.
Comece pelos paths canonicos minimos relevantes.
So amplie leitura se houver evidencia direta.

LIMITES
Nao invente regras, contratos, estruturas ou stack.
Nao faca refactor amplo sem permissao.
Mudanca estrutural exige ADR aprovado.
Na duvida relevante, pergunte e pare.

SAIDA ESPERADA DO EXECUTOR
Responder com PLAN OUTPUT curto.
Executar somente apos OK com o ID correto.
Responder com EXECUTE OUTPUT curto.

DOCSYNC
Aplicar so no fim do execute.
Atualizar no maximo 3 docs.
Permitir `SKIP-DOCSYNC`.
```
````
