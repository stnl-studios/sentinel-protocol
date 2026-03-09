# PLAN

Este PLAN é descartável.
Ele existe para executar uma fase curta e completa sem enviar tarefa por tarefa.
Apos a execucao, o conhecimento e depositado em DONE, CONTEXT da unidade alvo e STATE.
Reciclagem, reindexacao e promocao de fases pertencem ao `sentinel_plan_blueprint`.

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
1) Detalhar apenas a fase atual.
2) Planejar a Fase 2 como esboco operacional curto e forte.
3) Planejar a Fase 3 apenas como esboco opcional e curto, so se houver base suficiente.
4) Nada alem da Fase 3 vira fase planejada; o que estiver mais distante vira apenas risco, dependencia ou norte.
5) Recycle nao e fechamento e nao e replanejamento completo da feature.

## Contexto da fase
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

## Objetivo da fase atual
Descreva o que será entregue ao final desta fase.

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
Só criar agora se for dependência direta do DoD da fase atual.

## Fases
Cada fase deve ser pequena e executável em uma rodada do agente.
Cada fase termina com DoD verificável.
Somente a fase ativa pode ficar detalhada em tarefas.

### Fase 1
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

### Fase 2 esboço
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

### Fase 3 esboço opcional
Norte
1 linha

Principal dependência ou risco
1 linha

## Historico curto opcional
No maximo 1 ciclo anterior.

Fase anterior
1 linha

Status
`CLOSED`, `PARTIAL` ou `BLOCKED`

Referencia ao DONE
path ou `none`

Observacao curta
1 linha

## Critérios para dividir fase
Dividir se ocorrer
1) mais de um objetivo principal
2) dependência grande de Reference
3) mudança transversal ou estrutural
4) esforço grande demais para uma rodada de execução

## Checklist de encerramento da fase executada
Referencia de fluxo. O fechamento pertence a `sentinel_phase_closure`.
Reciclagem e promocao da proxima fase pertencem a `sentinel_plan_blueprint MODE=RECYCLE`.
1) se este arquivo estiver na raiz, resolver primeiro a unidade alvo real; sem isso, nao gravar artefato duravel em local ambiguo
2) criar DONE no diretorio `done/` da unidade alvo resolvida, seja feature, container ou subfeature
3) atualizar CONTEXT da unidade alvo com decisoes, estado, novos componentes, novos contratos
4) atualizar STATE core se algo global mudou
5) criar ADR se houve mudança estrutural
