# Sentinel Plan Blueprint

Skill responsavel pelo ciclo de vida do `PLAN.md` no Sentinel Protocol.

## Papel

`sentinel_plan_blueprint`:
1. cria o plano inicial
2. recicla o plano apos fechamento de fase
3. detalha apenas a fase ativa
4. mantem horizonte curto: Fase 2 como esboco e Fase 3 apenas como opcional curta quando houver base suficiente
5. trata `PLAN.md` raiz apenas como fallback provisiorio quando a unidade real ainda nao foi resolvida

Nao faz:
1. execucao
2. fechamento de fase
3. criacao de `DONE`
4. atualizacao principal de `CONTEXT`, `STATE` ou ADR
5. promocao de fase fora do proprio blueprint

## Modos

### `MODE=CREATE`

Usar quando nao existe `PLAN.md` para a unidade alvo.

Regras:
1. organizar a demanda em fases curtas
2. detalhar a Fase 1
3. manter a Fase 2 como esboco
4. criar Fase 3 curta apenas se houver base suficiente

### `MODE=RECYCLE`

Usar apos `sentinel_phase_closure`.

Regras:
1. reindexar a fila do plano sem replanejar a feature inteira
2. remover ou resumir a fase concluida do bloco ativo
3. promover fases somente quando o fechamento permitir
4. detalhar a nova Fase 1
5. preparar o plano para o proximo ciclo

## Autoridade exclusiva

Somente o blueprint pode:
1. criar `PLAN.md`
2. reorganizar a fila de fases
3. promover fases
4. resumir ou remover fase concluida do bloco ativo
5. detalhar a fase ativa pronta para execucao

Nem `sentinel_phase_closure`, nem `sentinel_prompt_preflight`, nem o executor devem fazer isso.

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

1. remover ou resumir a fase concluida
2. promover a proxima fase
3. detalhar a nova Fase 1
4. promover a antiga Fase 3 para nova Fase 2 esboco, se existir
5. criar nova Fase 3 apenas se houver base suficiente

### `PARTIAL`

1. nao promover automaticamente a proxima fase
2. recompor o restante da frente atual como nova Fase 1
3. manter a proxima apenas como esboco

### `BLOCKED`

1. nao promover automaticamente a proxima fase
2. reciclar apenas se isso fizer sentido operacional
3. nao recompor artificialmente a fase seguinte sem base suficiente
4. refletir o bloqueio explicitamente na nova Fase 1 quando houver recycle
5. se nao houver base para recycle seguro, manter a fila atual e devolver `BLOCKED`

## Regras inviolaveis

1. `PLAN.md` e descartavel.
2. Conhecimento duravel nao fica no plano.
3. Apenas a fase atual pode ser detalhada.
4. O horizonte maximo do plano e: Fase 1 detalhada, Fase 2 em esboco e Fase 3 opcional curta somente se houver base suficiente.
5. Nada alem da Fase 3 entra como fase planejada; o restante vira apenas risco, dependencia ou norte.
6. Recycle nao e fechamento.
7. Recycle nao e execucao.
8. Recycle nao e replanejamento completo da feature.
9. O blueprint nao pode virar backlog manager.

## Fluxo canonico

1. `sentinel_plan_blueprint MODE=CREATE`
2. `sentinel_prompt_preflight`
3. executor -> `PLAN OUTPUT`
4. `OK {ID}`
5. executor -> `EXECUTE OUTPUT`
6. `sentinel_phase_closure`
7. `sentinel_plan_blueprint MODE=RECYCLE`
8. `sentinel_prompt_preflight`
9. executor
