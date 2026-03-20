# Sentinel Phase Closure

## Proposito

Fechar a execucao realizada com base em evidencia, registrar `DONE` e consolidar o minimo de conhecimento duravel sem misturar fechamento com planejamento.

## O que faz

1. valida objetivo, DoD e evidencias do escopo executado
2. classifica o fechamento como `CLOSED`, `PARTIAL` ou `BLOCKED`
3. cria `DONE` curto na unidade alvo resolvida com nome baseado na entrega real
4. atualiza `CONTEXT` da unidade alvo com o minimo duravel e cabecalho estavel
5. atualiza `docs/core/STATE.md` apenas se houver impacto global real
6. cria ou exige ADR apenas quando a mudanca for estrutural
7. emite `PHASE CLOSURE OUTPUT` curto e operacional
8. absorve de forma definitiva a consolidacao documental pos-execucao

## O que nao faz

1. nao cria `PLAN.md`
2. nao recicla, promove ou detalha blocos do `PLAN.md`
3. nao executa implementacao
4. nao substitui o executor
5. nao faz discovery amplo do repositorio
6. nao usa `PLAN.md` raiz como destino de artefatos duraveis
7. nao recicla plano nem promove fase

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
2. `docs/features/<unidade_resolvida>/done/DONE-YYYYMMDD-<entrega-real>.md`
3. atualizacao minima de `docs/features/<unidade_resolvida>/CONTEXT.md`
4. atualizacao de `docs/core/STATE.md` apenas se houver impacto global real
5. `docs/decisions/ADR-YYYYMMDD-<slug>.md` apenas se a mudanca for estrutural

## Convencoes duraveis de fechamento

1. O `DONE` deve seguir `DONE-YYYYMMDD-<entrega-real>.md`; a entrega consolidada e a identidade duravel do arquivo.
2. O `CONTEXT` da unidade resolvida usa cabecalho duravel: `SCOPE: feature`, `FEATURE: <feature-path>`, `STATUS: active | in-progress`, `LAST UPDATED: YYYYMMDD`.
3. O historico do `CONTEXT` registra marcos entregues com data e path para o `DONE`, nunca com status operacional numerado.

## Relacao com outras skills

- `sentinel_docs_bootstrap` prepara a base documental minima antes do ciclo com `PLAN.md`, mas nao fecha execucao.
- `sentinel_plan_blueprint` e o unico dono do ciclo de vida do `PLAN.md`; depois da closure, o passo canonico e `MODE=RECYCLE`.
- `sentinel_prompt_preflight` apenas prepara o prompt do executor e nao participa do fechamento.
- O executor implementa e valida; nao toca artefatos duraveis.
- O fechamento documental real acontece aqui.
- Esta skill absorve de forma definitiva toda necessidade de consolidacao documental pos-execucao.

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

## Posicao no fluxo canonico

1. `sentinel_docs_bootstrap`, quando faltar base documental
2. `sentinel_plan_blueprint MODE=CREATE`
3. `sentinel_prompt_preflight`
4. executor -> `PLAN OUTPUT`
5. `OK {ID}`
6. executor -> `EXECUTE OUTPUT`
7. `sentinel_phase_closure`
8. `sentinel_plan_blueprint MODE=RECYCLE`
