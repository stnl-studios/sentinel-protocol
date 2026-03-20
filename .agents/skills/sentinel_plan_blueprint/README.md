# Sentinel Plan Blueprint

Version: 2026.3.0
Status: Active
Protocol line: 2026.3

## Proposito

Skill responsavel pelo ciclo de vida do `PLAN.md` no Sentinel Protocol.

## O que faz

`sentinel_plan_blueprint`:
1. cria o plano inicial
2. recicla o plano apos fechamento
3. reorganiza a ordem visivel do plano sem virar backlog manager
4. detalha apenas o `Escopo ativo`
5. mantem horizonte curto: `Escopo ativo` detalhado, `Bloco seguinte` curto e `Bloco posterior` opcional e curto somente quando houver base suficiente
6. trata `PLAN.md` raiz apenas como fallback provisiorio quando a unidade real ainda nao foi resolvida
7. e o unico dono do ciclo de vida do `PLAN.md`

## O que nao faz

Nao faz:
1. execucao
2. fechamento da execucao
3. criacao de `DONE`
4. atualizacao principal de `CONTEXT`, `STATE` ou ADR
5. promocao ou recomposicao do plano fora do proprio blueprint
6. qualquer consolidacao documental pos-execucao

## Entradas

1. demanda ou frente que precisa de plano
2. `PLAN.md` existente da unidade alvo, quando houver recycle
3. fechamento anterior da execucao, quando houver `MODE=RECYCLE`
4. evidencias suficientes para resolver a unidade alvo ou usar fallback provisiorio

## Saidas

1. `PLAN.md` inicial em `MODE=CREATE`
2. `PLAN.md` reciclado em `MODE=RECYCLE`
3. plano recomposto com o novo `Escopo ativo` detalhado quando o recycle for seguro
4. resultado `SKIPPED` ou `BLOCKED` quando as precondicoes nao forem satisfeitas

## Modos

### `MODE=CREATE`

Usar quando nao existe `PLAN.md` para a unidade alvo.

Regras:
1. organizar a demanda em horizonte curto
2. detalhar o `Escopo ativo`
3. manter `Bloco seguinte` curto
4. usar `Bloco posterior` apenas se houver base suficiente

### `MODE=RECYCLE`

Usar apos `sentinel_phase_closure`.

Regras:
1. recompor a estrutura do plano sem replanejar a feature inteira
2. remover ou resumir o escopo concluido do centro do plano
3. subir `Bloco seguinte` para `Escopo ativo` somente quando o fechamento permitir
4. detalhar o novo `Escopo ativo`
5. preparar o plano para o proximo ciclo

## Autoridade exclusiva

Somente o blueprint pode:
1. criar `PLAN.md`
2. reciclar `PLAN.md`
3. reorganizar `Escopo ativo`, `Bloco seguinte` e `Bloco posterior`
4. promover ou absorver blocos quando houver base
5. resumir ou remover escopo concluido do bloco ativo
6. detalhar o `Escopo ativo` pronto para execucao

Nem `sentinel_phase_closure`, nem `sentinel_prompt_preflight`, nem o executor devem fazer isso.
Blueprint e o unico dono do ciclo de vida do `PLAN.md`.

## Regras de detecção

1. `MODE=CREATE` verifica o `PLAN.md` da unidade alvo, nao qualquer plano do repo.
2. Se o plano alvo ja existir em `MODE=CREATE`, o resultado correto e `SKIPPED`.
3. `MODE=RECYCLE` exige um `PLAN.md` existente para o ciclo atual.
4. Se o ciclo estiver no fallback raiz e a unidade for resolvida no fechamento, o recycle pode materializar o `PLAN.md` canonico dessa unidade.
5. Se nao existir `PLAN.md` do ciclo atual nem base suficiente para resolver a unidade, o resultado correto e `BLOCKED`.

## Papel do `PLAN.md` raiz

1. `PLAN.md` na raiz e apenas fallback provisiorio quando a unidade real ainda nao foi resolvida com seguranca.
2. Ele nao define o diretorio canonico de artefatos duraveis.
3. `DONE`, `CONTEXT` e demais artefatos duraveis vivem sempre em `docs/features/<unidade_resolvida>/...`.
4. Se o fluxo comecou no fallback raiz e a unidade foi resolvida no fechamento, o proximo `MODE=RECYCLE` deve passar a usar o `PLAN.md` canonico dessa unidade.
5. Depois disso, `PLAN.md` raiz deixa de ser o plano principal daquele fluxo.

## Tratamento por status

### `CLOSED`

1. remover ou resumir o escopo concluido
2. subir `Bloco seguinte` para `Escopo ativo` quando houver base
3. detalhar o novo `Escopo ativo`
4. manter `Bloco seguinte` e `Bloco posterior` curtos
5. usar `Bloco posterior` apenas se houver base suficiente

### `PARTIAL`

1. nao promover automaticamente o proximo bloco
2. recompor o restante do recorte atual como novo `Escopo ativo`
3. manter os demais blocos apenas como esboco curto quando fizer sentido

### `BLOCKED`

1. nao promover artificialmente o proximo bloco
2. reciclar apenas se isso fizer sentido operacional
3. nao recompor artificialmente o `Bloco seguinte` sem base suficiente
4. refletir o bloqueio explicitamente no novo `Escopo ativo` quando houver recycle
5. se nao houver base para recycle seguro, manter a estrutura atual e devolver `BLOCKED`

## Regras inviolaveis

1. `PLAN.md` e descartavel.
2. Conhecimento duravel nao fica no plano.
3. Apenas o `Escopo ativo` pode ser detalhado.
4. O horizonte maximo do plano e: `Escopo ativo` detalhado, `Bloco seguinte` curto e `Bloco posterior` opcional e curto somente se houver base suficiente.
5. Nada alem disso entra como bloco planejado; o restante vira apenas risco, dependencia ou norte.
6. Recycle nao e fechamento.
7. Recycle nao e execucao.
8. Recycle nao e replanejamento completo da feature.
9. O blueprint nao pode virar backlog manager.

## Relacao com outras skills

- `sentinel_docs_bootstrap` prepara a base documental minima, mas nao toca no plano.
- `sentinel_prompt_preflight` prepara o prompt de execucao sobre um `Escopo ativo` ou tarefa ja definida pelo plano.
- `sentinel_phase_closure` fecha a execucao e deixa o proximo recycle para o blueprint.
- Executor, preflight e closure nao podem criar, reciclar, promover, resumir nem detalhar `PLAN.md`.

## Posicao no fluxo canonico

1. `sentinel_plan_blueprint MODE=CREATE`
2. `sentinel_prompt_preflight`
3. executor -> `PLAN OUTPUT`
4. `OK {ID}`
5. executor -> `EXECUTE OUTPUT`
6. `sentinel_phase_closure`
7. `sentinel_plan_blueprint MODE=RECYCLE`
8. `sentinel_prompt_preflight`
9. executor
