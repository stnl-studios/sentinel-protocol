# PLAN

Este PLAN é descartável.
Ele existe para executar uma fase curta e completa sem enviar tarefa por tarefa.
Após a execução, o conhecimento é depositado em DONE, CONTEXT da feature e STATE.

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
2) Planejar a fase 2 como esboço forte, com macro passos e horizonte.
3) Planejar a fase 3 como esboço leve, só para norte.
4) Fase mais distante do que isso não vira tarefa, apenas risco e dependência.

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

### Fase 3 esboço
Norte
1 linha

Principal dependência ou risco
1 linha

## Critérios para dividir fase
Dividir se ocorrer
1) mais de um objetivo principal
2) dependência grande de Reference
3) mudança transversal ou estrutural
4) esforço grande demais para uma rodada de execução

## Checklist de encerramento da fase executada
1) criar DONE em docs/features/<feature>/done
2) atualizar CONTEXT da feature com decisões, estado, novos componentes, novos contratos
3) atualizar STATE core se algo global mudou
4) criar ADR se houve mudança estrutural
