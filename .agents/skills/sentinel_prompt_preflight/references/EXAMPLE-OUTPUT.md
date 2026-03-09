# Exemplo de Saida Correta

````md
```md
TAREFA
Executar a Fase 1 do plano da unidade alvo indicada pelo usuario, criando apenas o service e a interface citados no escopo informado.

MODO
Router Planner. Primeiro planeje. Nao execute nada antes de OK com o ID correto.

SANITY CHECK
- docs/INDEX.md: PRESENTE
- docs/core/RULES.md: PRESENTE
- docs/core/CONTEXT.md: PRESENTE
- docs/core/STATE.md: PRESENTE
- PLAN principal da unidade alvo (`docs/features/payments/PLAN.md`): PRESENTE
- PLAN fallback raiz (`PLAN.md`): AUSENTE
Se faltar base critica, pare e aguarde `SKIP`.
Se nao houver plano utilizavel, pare e aguarde `SKIP-PLAN`.

FONTES CANONICAS
Use apenas por referencia de path ou categoria:
- `docs/INDEX.md`
- `docs/core/`
- `docs/decisions/`
- `docs/features/`
- `docs/features/payments/PLAN.md`; se nao houver resolucao melhor, usar fallback em `PLAN.md`
Leia conteudo somente sob demanda no executor.

LEITURA SOB DEMANDA
Leia apenas o minimo necessario para planejar.
Nao leia o repo inteiro.
Comece pelo `PLAN.md` principal resolvido; use fallback real apenas se necessario.
So amplie leitura se houver evidencia direta.

LIMITES
Nao invente regras, contratos, estruturas ou stack.
Nao faca refactor amplo sem permissao.
Mudanca estrutural exige ADR aprovado.
Executor nao toca `DONE`, `CONTEXT`, `STATE`, `ADR` nem `PLAN.md`.
Executor nao fecha fase e nao consolida docs duraveis.
Na duvida relevante, pergunte e pare.

SAIDA ESPERADA DO EXECUTOR
Responder com PLAN OUTPUT curto.
Executar somente apos OK com o ID correto.
Responder com EXECUTE OUTPUT curto, objetivo e verificavel.

POS-EXECUCAO
Apos o EXECUTE OUTPUT, o proximo passo canonico e `sentinel_phase_closure`.
```
````
