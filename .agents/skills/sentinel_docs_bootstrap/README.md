# Sentinel Docs Bootstrap

## Proposito

Bootstrap documental minimo para projeto existente que ainda nao tem base canonica suficiente para operar o protocolo com seguranca.

## O que faz

1. faz discovery documental do repo sem executar codigo
2. cria apenas o que estiver faltando, em create-only absoluto
3. monta a base minima de docs canonicos do Sentinel
4. centraliza lacunas como `TBD` em `docs/core/CONTEXT.md`
5. prepara a base documental para uso posterior do protocolo

## O que nao faz

1. nao cria, edita, move ou renomeia `PLAN.md`
2. nao executa implementacao
3. nao altera codigo da aplicacao
4. nao cria `DONE`
5. nao inventa stack, regras, contratos, paths ou decisoes sem evidencia

## Entradas

1. estrutura real do repo, lida apenas para discovery
2. evidencias de paths, stack e padroes existentes
3. entrevista guiada minima apenas quando discovery nao bastar

## Saidas

1. `README.md` raiz, se faltar
2. `docs/INDEX.md`
3. `docs/core/CONTEXT.md`
4. `docs/core/RULES.md`
5. `docs/core/STATE.md`
6. `docs/core/CONTRACTS.md`
7. `docs/core/TESTING.md`
8. `docs/core/UI_KIT.md`, quando aplicavel
9. `docs/decisions/INDEX.md`
10. `docs/reference/` em create-only e `docs/reference/DESIGN_SYSTEM.md`, quando aplicavel
11. `docs/features/` e features iniciais apenas com evidencia suficiente

## Regras criticas

1. create-only absoluto: se o arquivo ja existir, registrar `SKIPPED`
2. proibido tocar em `PLAN.md` ou `plan.md`
3. toda lacuna vira `TBD` canonico em `docs/core/CONTEXT.md`
4. nao usar `TODO`
5. nao executar implementacao nem alterar comportamento do projeto

## Relacao com outras skills

- `sentinel_plan_blueprint` assume o ciclo de vida do `PLAN.md` depois que a base documental minima estiver suficiente.
- `sentinel_prompt_preflight` prepara prompt de execucao sobre fase ou tarefa ja definida; nao substitui o bootstrap.
- `sentinel_phase_closure` entra apenas depois de uma fase executada; nao participa do bootstrap.

## Posicao no fluxo canonico

1. `sentinel_docs_bootstrap`
2. confirmar e completar o contexto minimo necessario
3. quando a demanda exigir planejamento por fases, `sentinel_plan_blueprint MODE=CREATE`
4. `sentinel_prompt_preflight`
5. executor
6. `sentinel_phase_closure`
7. `sentinel_plan_blueprint MODE=RECYCLE`

## Proximo passo canonico

Depois do bootstrap, confirme a base minima e resolva os `TBD` necessarios no contexto. Quando a demanda pedir ciclo por fases, o proximo passo canonico e usar `sentinel_plan_blueprint`.
