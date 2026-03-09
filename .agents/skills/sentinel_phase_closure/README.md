# Sentinel Phase Closure

Skill responsavel por fechar documental e operacionalmente a fase que ja foi executada.

## Proposito

Encerrar a fase com base em evidencia, consolidar o minimo de conhecimento duravel e devolver um veredito curto e confiavel para o proximo passo do fluxo.

## O que faz

1. valida objetivo, DoD e evidencias da fase executada
2. classifica o fechamento como `CLOSED`, `PARTIAL` ou `BLOCKED`
3. cria `DONE` curto na unidade alvo resolvida
4. atualiza `CONTEXT` da unidade alvo com o minimo duravel
5. atualiza `docs/core/STATE.md` apenas se houver impacto global real
6. cria ou exige ADR apenas quando a mudanca for estrutural
7. emite `PHASE CLOSURE OUTPUT` curto e operacional

## O que nao faz

1. nao cria `PLAN.md`
2. nao recicla, promove ou detalha fases do `PLAN.md`
3. nao executa implementacao
4. nao substitui o executor
5. nao faz discovery amplo do repositorio
6. nao usa `PLAN.md` raiz como destino de artefatos duraveis

## Entradas

1. `docs/INDEX.md`
2. `docs/core/RULES.md`
3. `docs/core/STATE.md`
4. `docs/features/<unidade_resolvida>/CONTEXT.md`
5. `docs/features/<unidade_resolvida>/PLAN.md`, ou `PLAN.md` raiz apenas como plano provisiorio do ciclo atual
6. ultimo `EXECUTE OUTPUT`
7. evidencias minimas associadas ao execute
8. ultimo `DONE` da unidade, se existir

## Saidas

1. `PHASE CLOSURE OUTPUT`
2. `docs/features/<unidade_resolvida>/done/DONE-YYYYMMDD-<slug>.md`
3. atualizacao minima de `docs/features/<unidade_resolvida>/CONTEXT.md`
4. atualizacao de `docs/core/STATE.md` apenas se houver impacto global real
5. `docs/decisions/ADR-YYYYMMDD-<slug>.md` apenas se a mudanca for estrutural

## Significado dos status

### `CLOSED`

Usar quando o objetivo da fase foi entregue, o DoD relevante foi demonstrado, a validacao minima foi registrada e as docs minimas de fechamento foram atualizadas.

### `PARTIAL`

Usar quando houve avancos reais, mas ainda nao e seguro afirmar fechamento completo porque parte do objetivo, do DoD ou da evidencia segue pendente.

### `BLOCKED`

Usar quando existe impedimento real para fechar a fase, falta evidencia critica, o DoD nao e verificavel, ha conflito relevante entre fontes ou existe mudanca estrutural sem ADR suficiente.

## Regra para `PLAN.md` raiz

1. `PLAN.md` na raiz e apenas fallback provisiorio para ciclos que ainda nao tinham unidade resolvida.
2. Antes de gravar `DONE`, `CONTEXT` ou qualquer artefato duravel, a skill deve resolver a unidade alvo real com evidencia suficiente.
3. Artefatos duraveis vivem sempre em `docs/features/<unidade_resolvida>/...`.
4. Se a unidade continuar ambigua, a closure nao inventa diretorio canonico e deve retornar `PARTIAL` ou `BLOCKED`.

## Relacao com Blueprint

- `sentinel_plan_blueprint` e o unico dono do ciclo de vida do `PLAN.md`.
- Depois da closure, o passo canonico e `sentinel_plan_blueprint MODE=RECYCLE`.
- Se o ciclo comecou em `PLAN.md` raiz e a unidade foi resolvida, o Blueprint deve assumir o `PLAN.md` canonico da unidade no recycle seguinte.

## Relacao com Preflight

- `sentinel_prompt_preflight` apenas prepara o prompt do executor.
- O Preflight pode apontar `PLAN.md` raiz como fallback provisiorio.
- A closure fecha esse caso exigindo resolucao da unidade real antes dos artefatos duraveis.

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
