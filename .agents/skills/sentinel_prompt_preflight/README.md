# Sentinel Prompt Preflight

## Proposito

Skill para transformar um pedido bruto em um prompt governado de execucao.

## O que faz

1. recebe um pedido ruim, cru, vago ou incompleto
2. reescreve a solicitacao em formato estruturado para execucao
3. aplica guardrails operacionais minimos
4. faz sanity check somente por existencia
5. devolve exatamente um unico bloco de codigo Markdown `md`
6. encerra apos emitir o prompt final

## O que nao faz

- Nao le conteudo do repositorio.
- Nao le ou resume docs.
- Nao exporta regras das docs para o prompt.
- Nao monta plano tecnico com base em evidencia.
- Nao cria ou recicla `PLAN.md`.
- Nao substitui o Blueprint.
- Nao promove fase nem reorganiza a fila do plano.
- Nao fecha fase.
- Nao executa nada.
- Nao atua como planner real, executor ou auditor.

## Entradas

1. pedido do usuario
2. paths citados explicitamente no pedido, quando houver
3. existencia dos arquivos canonicos permitidos no sanity check

## Saidas

1. um unico prompt estruturado em bloco `md`
2. instrucao de leitura sob demanda para o executor
3. gates operacionais curtos para `SKIP` e `SKIP-PLAN`, quando aplicavel

## Relacao com outras skills

- O ciclo de vida do `PLAN.md` pertence exclusivamente a `sentinel_plan_blueprint`.
- Fechamento de fase pertence exclusivamente a `sentinel_phase_closure`.
- `sentinel_docs_bootstrap` prepara base documental para repositorio ainda sem base canonica.
- O Preflight apenas prepara o prompt do executor para o ciclo atual, sobre fase ou tarefa ja definida.
- O bloco `DOCSYNC` do prompt e apenas um gate operacional de documentacao ao fim do execute; nao representa skill separada nem substitui a closure.
- Quando a unidade alvo for identificavel, o plano principal do fluxo e o `PLAN.md` dessa unidade.
- `PLAN.md` na raiz e o unico fallback real quando nao houver resolucao melhor da unidade alvo, mas permanece provisiorio.
- `PLAN.md` raiz nao e a casa canonica de `DONE`, `CONTEXT` ou outros artefatos duraveis.
- `docs/core/PLAN.md` nao e fallback utilizavel nem alternativa operacional de plano.

## Sanity check permitido

Somente:

- `docs/INDEX.md`
- `docs/core/RULES.md`
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `PLAN.md` da unidade alvo, apenas se o texto do usuario permitir identificar um candidato sem abrir arquivos
- `PLAN.md` na raiz, apenas como fallback real e provisiorio

Nunca:

- abrir arquivo
- ler conteudo
- resumir conteudo
- inferir regra de negocio
- inferir arquitetura
- inferir escopo real a partir do codigo

Se o prompt final precisar usar `PLAN.md` raiz, o executor deve trata-lo como plano provisiorio e resolver a unidade real antes do fechamento e da gravacao de artefatos duraveis.

## Posicao no fluxo canonico

1. `sentinel_docs_bootstrap`, quando faltar base documental
2. `sentinel_plan_blueprint`, quando a demanda exigir ciclo por fases
3. `sentinel_prompt_preflight`
4. executor
5. `sentinel_phase_closure`
6. `sentinel_plan_blueprint MODE=RECYCLE`, quando houver novo ciclo

## Estrutura do prompt gerado

1) `TAREFA`
2) `MODO`
3) `SANITY CHECK`
4) `FONTES CANONICAS`
5) `LEITURA SOB DEMANDA`
6) `LIMITES`
7) `SAIDA ESPERADA DO EXECUTOR`
8) `DOCSYNC`

## Regra de formato

Nao pode existir texto fora do bloco final iniciado com ` ```md `.
