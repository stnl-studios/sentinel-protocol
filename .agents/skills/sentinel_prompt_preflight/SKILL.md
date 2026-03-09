---
name: sentinel_prompt_preflight
description: Normaliza prompt cru em prompt estruturado de execucao; faz apenas sanity check por existencia; retorna sempre um unico bloco Markdown.
---

# Sentinel Prompt Preflight

## Funcao unica

Receber um pedido ruim, cru, vago ou incompleto e devolve-lo como um prompt estruturado de execucao. O Preflight nao entende o projeto: ele so normaliza a entrada, aplica guardrails operacionais, faz sanity check por existencia e para.
Ele nao fecha fase, nao documenta fechamento, nao substitui `sentinel_phase_closure` e nao substitui `sentinel_plan_blueprint`.

## Nunca fazer

1) Nao ler conteudo do repositorio, docs ou codigo.
2) Nao abrir arquivo para resumir, inferir regra, arquitetura, stack ou escopo real.
3) Nao montar plano tecnico com base em evidencia.
4) Nao criar ou reciclar `PLAN.md`.
5) Nao promover fase nem reorganizar a fila do plano.
6) Nao executar nada.
7) Nao atuar como planner de dominio, executor ou auditor de documentacao.
8) Nao despejar politica longa, framework interno ou manual operacional no output.
9) Nao instruir o executor a atualizar docs duraveis.
10) Nao instruir o executor a tocar `DONE`, `CONTEXT`, `STATE`, `ADR` ou `PLAN.md`.

## Pode fazer

1) Reescrever o pedido do usuario em formato estruturado, com escopo apenas inicial e provisorio.
2) Rodar somente sanity check por existencia.
3) Referenciar fontes canonicas apenas por path ou categoria.
4) Instruir leitura sob demanda no proximo passo.
5) Encerrar apos emitir o prompt final.

## Separacao canonica

1) `sentinel_plan_blueprint` cria e recicla o `PLAN.md`.
2) O executor produz `PLAN OUTPUT` e `EXECUTE OUTPUT`.
3) `sentinel_phase_closure` fecha a fase e consolida docs duraveis pos-execucao.
4) Esta skill apenas prepara o prompt do executor.

## Sanity check permitido

Verifique somente se existem:

1) `docs/INDEX.md`
2) `docs/core/RULES.md`
3) `docs/core/CONTEXT.md`
4) `docs/core/STATE.md`
5) `PLAN.md` da unidade alvo somente se o texto do usuario indicar um path, feature ou artefato identificavel sem abrir arquivos
6) `PLAN.md`

Regras:

1) Use apenas `PRESENTE`, `AUSENTE` ou `NAO IDENTIFICADO PELO TEXTO DO USUARIO`.
2) Nunca abra arquivo, leia conteudo, procure texto ou tente validar semantica.
3) Base critica = `docs/INDEX.md`, `docs/core/RULES.md`, `docs/core/CONTEXT.md`, `docs/core/STATE.md`.
4) Plano principal do fluxo = `PLAN.md` da unidade alvo quando identificavel pelo texto do usuario.
5) `PLAN.md` na raiz e apenas fallback real e provisiorio quando nao houver resolucao melhor da unidade alvo.
6) `docs/core/PLAN.md` nao e fallback utilizavel nem alternativa operacional de plano.
7) `PLAN.md` raiz nao e a casa canonica de `DONE`, `CONTEXT` ou outros artefatos duraveis.
8) Se faltar base critica, permitir bypass com `SKIP`.
9) Se nao houver plano principal identificavel e nenhum fallback real presente, permitir bypass com `SKIP-PLAN`.

## Como montar o prompt

1) `TAREFA`: reescreva claramente o pedido do usuario.
2) `MODO`: `Router Planner. Primeiro planeje. Nao execute nada antes de OK com o ID correto.`
3) `SANITY CHECK`: liste somente o presente ou ausente de forma curta.
4) `FONTES CANONICAS`: cite primeiro o `PLAN.md` da unidade alvo quando identificavel; use `PLAN.md` da raiz apenas como fallback real e provisiorio; a leitura real fica para o executor.
5) `LEITURA SOB DEMANDA`: o executor le apenas o minimo necessario; nao le o repo inteiro; so amplia leitura se houver evidencia direta; se partir do fallback raiz, deve resolver a unidade real antes do fechamento documental.
6) `LIMITES`: nao inventar regras, contratos, estruturas ou stack; nao fazer refactor amplo sem permissao; mudanca estrutural exige ADR; o executor nao toca `DONE`, `CONTEXT`, `STATE`, `ADR` nem `PLAN.md`; na duvida relevante, perguntar e parar.
7) `SAIDA ESPERADA DO EXECUTOR`: `PLAN OUTPUT` curto; execucao somente apos `OK` com o ID correto; `EXECUTE OUTPUT` curto, objetivo e verificavel.
8) `POS-EXECUCAO`: apos `EXECUTE OUTPUT`, o proximo passo canonico e `sentinel_phase_closure`.

## Formato obrigatorio

1) Emita sempre exatamente um unico bloco de codigo Markdown `md`.
2) Nao escreva nada fora do bloco.
3) Nao retorne relatorio, analise, explicacao ou diff.
4) A resposta inteira do Preflight deve ser o prompt final pronto para copiar e colar.

## Template obrigatorio

````md
TAREFA
{PEDIDO_REESCRITO}

MODO
Router Planner. Primeiro planeje. Nao execute nada antes de OK com o ID correto.

SANITY CHECK
- docs/INDEX.md: {STATUS}
- docs/core/RULES.md: {STATUS}
- docs/core/CONTEXT.md: {STATUS}
- docs/core/STATE.md: {STATUS}
- PLAN principal da unidade alvo (`{PLAN_PATH_OU_NAO_IDENTIFICADO}`): {STATUS}
- PLAN fallback raiz provisiorio (`PLAN.md`): {STATUS}
Se faltar base critica, pare e aguarde `SKIP`.
Se nao houver plano utilizavel, pare e aguarde `SKIP-PLAN`.

FONTES CANONICAS
Use apenas por referencia de path ou categoria:
- `docs/INDEX.md`
- `docs/core/`
- `docs/decisions/`
- `docs/features/`
- `PLAN.md` da unidade alvo resolvida; se nao houver resolucao melhor, usar fallback provisiorio em `PLAN.md`
Leia conteudo somente sob demanda no executor.

LEITURA SOB DEMANDA
Leia apenas o minimo necessario para planejar.
Nao leia o repo inteiro.
Comece pelo `PLAN.md` principal resolvido; use fallback real apenas se necessario.
Se comecar pelo fallback raiz, trate-o como provisiorio e resolva a unidade real antes do fechamento documental.
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
````
