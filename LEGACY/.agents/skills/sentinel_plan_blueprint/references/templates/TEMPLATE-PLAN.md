# PLAN

Este PLAN é descartável.
Ele existe para executar um escopo curto e coeso sem enviar tarefa por tarefa.
O executor implementa e valida. A consolidacao pos-execucao em docs duraveis pertence a `sentinel_phase_closure`.
Reciclagem, recomposicao e promocao de blocos pertencem ao `sentinel_plan_blueprint`.

Se este arquivo estiver em `PLAN.md` na raiz do repo, ele e apenas um fallback provisiorio.
Ele nao define a unidade canonica do fluxo.
Assim que a unidade real for resolvida, `DONE`, `CONTEXT`, `done/` e demais artefatos duraveis vivem em `docs/features/<unidade_resolvida>/...`.
No ciclo seguinte, o `sentinel_plan_blueprint MODE=RECYCLE` deve passar a usar o `PLAN.md` canonico da unidade resolvida.

## Cabeçalho
FEATURE
slug ou TBD

OWNER
quem executa ou TBD

STATUS
draft ou approved ou executing ou done

LAST UPDATED
YYYYMMDD

## Horizonte de planejamento
Regra
1) Detalhar apenas o `Escopo ativo`.
2) Manter `Bloco seguinte` curto e voltado a previsibilidade operacional.
3) Usar `Bloco posterior` apenas como esboco opcional e curto, so se houver base suficiente.
4) `Bloco seguinte` pode ser absorvido pelo `Escopo ativo` quando for continuacao natural do mesmo recorte e o plano continuar curto e coerente.
5) Separar os blocos quando o escopo ficar grande, mudar de natureza, puxar contexto demais ou deixar de parecer uma rodada coesa.
6) Recycle nao e fechamento e nao e replanejamento completo da feature.

## Contexto do escopo
Core Pack
listar arquivos core que entram ou TBD

Feature Pack
listar arquivos da feature que entram ou TBD

Evidence Pack
listar apenas evidências necessárias ou TBD

Reference Pack
listar apenas se houver gatilho e dizer qual ou vazio

## Problema em 3 linhas
1)
2)
3)

## Objetivo do escopo ativo
Descreva o que sera entregue ao final deste escopo.

## Entregáveis
1)
2)
3)

## Scope Lock
Inclui
1) paths alvo ou TBD
2) comportamentos alvo

Fora de escopo
1)
2)

Restrições e guardrails
1) não fazer X
2) não tocar em Y

## Plano de validação
Como provar que ficou correto
1)
2)
3)

## Plano de rollback
Como voltar atrás com segurança
1)
2)

## Observabilidade mínima
Como detectar regressão
1)
2)

## Just in time build
Proibido criar artefatos que só serão usados muito mais à frente.
So criar agora se for dependencia direta do DoD do `Escopo ativo`.

## Blocos do plano
Cada bloco deve ser pequeno e coerente com uma rodada do agente.
O `Escopo ativo` termina com DoD verificavel.
Somente o `Escopo ativo` pode ficar detalhado em tarefas.

### Escopo ativo
Título

Escopo
1) objetivo imediato
2) limites

Tarefas
1)
2)
3)
4)
5)
6)
7)

DoD
1) verificável
2) verificável
3) verificável

Riscos e mitigação
1)
2)

TBDs e perguntas abertas
1) pergunta, dono, prazo
2)

Referências internas
referenciar IDs do CONTEXT
referenciar ADR se existir

### Bloco seguinte
Título

Objetivo

Macro passos
1)
2)
3)
4)
5)

Dependências e pré condições
1)
2)

Decisões pendentes
1)
2)

Riscos principais
1)
2)

### Bloco posterior
Norte
1 linha

Principal dependência ou risco
1 linha

## Historico curto opcional
No maximo 1 ciclo anterior.

Escopo anterior
1 linha

Status
`CLOSED`, `PARTIAL` ou `BLOCKED`

Referencia ao DONE
path ou `none`

Observacao curta
1 linha

## Criterios para dividir o escopo
Dividir se ocorrer
1) mais de um objetivo principal
2) dependência grande de Reference
3) mudança transversal ou estrutural
4) esforço grande demais para uma rodada de execução

## Checklist de encerramento do escopo executado
Referencia de fluxo. O fechamento documental pertence a `sentinel_phase_closure`.
Reciclagem e promocao dos proximos blocos pertencem a `sentinel_plan_blueprint MODE=RECYCLE`.
1) se este arquivo estiver na raiz, resolver primeiro a unidade alvo real antes do fechamento documental
2) o executor nao cria `DONE`, nao atualiza `CONTEXT`, nao atualiza `STATE` e nao cria ADR
3) `sentinel_phase_closure` decide `CLOSED`, `PARTIAL` ou `BLOCKED` e consolida docs duraveis
4) `sentinel_plan_blueprint MODE=RECYCLE` recicla, promove e detalha o proximo ciclo
