---
name: sentinel_plan_blueprint
description: Cria ou recicla o `PLAN.md` do Sentinel Protocol. Use em `MODE=CREATE` para gerar o plano inicial e em `MODE=RECYCLE` apos `sentinel_phase_closure` para recompor o plano, detalhar apenas o `Escopo ativo` e manter o horizonte curto.
---
# Sentinel Plan Blueprint

## Papel central

Ser a skill dona do ciclo de vida do `PLAN.md`.

Esta skill:
1. cria o primeiro `PLAN.md`
2. recicla o `PLAN.md` apos fechamento da execucao
3. detalha apenas o `Escopo ativo`
4. mantem horizonte curto: `Bloco seguinte` curto e `Bloco posterior` apenas como opcional curto quando houver base suficiente
5. trata `PLAN.md` raiz apenas como fallback provisiorio quando a unidade real ainda nao foi resolvida

Esta skill nao:
1. executa implementacao
2. substitui o executor
3. fecha execucao
4. cria `DONE` como parte do fechamento
5. atualiza `CONTEXT`, `STATE` ou ADR como papel principal
6. mistura planejamento com execucao
7. vira backlog manager
8. delega o ciclo de vida do `PLAN.md` para outra skill

## Modos operacionais

### `MODE=CREATE`

Usar quando nao existe `PLAN.md` para a unidade alvo.

Responsabilidades:
1. criar o primeiro `PLAN.md`
2. organizar a demanda em horizonte curto
3. detalhar o `Escopo ativo`
4. manter `Bloco seguinte` curto
5. usar `Bloco posterior` apenas se houver base suficiente

### `MODE=RECYCLE`

Usar apos `sentinel_phase_closure`, quando ja existe `PLAN.md` e o proximo ciclo precisa ser preparado.

Responsabilidades:
1. receber o `PLAN.md` existente
2. reorganizar `Escopo ativo`, `Bloco seguinte` e `Bloco posterior` sem replanejar a feature inteira
3. remover ou resumir o escopo concluido do centro do plano
4. subir `Bloco seguinte` para `Escopo ativo` quando o fechamento for `CLOSED` e houver base
5. manter `Bloco seguinte` e `Bloco posterior` curtos, opcionais e coerentes com o novo recorte
6. detalhar o novo `Escopo ativo`
8. preparar o plano para o proximo ciclo de execucao

## Autoridade exclusiva sobre o plano

Somente `sentinel_plan_blueprint` pode:
1. criar `PLAN.md`
2. reciclar `PLAN.md`
3. reorganizar `Escopo ativo`, `Bloco seguinte` e `Bloco posterior`
4. promover ou absorver blocos quando houver base suficiente
5. resumir ou remover o escopo concluido do bloco ativo
6. detalhar o `Escopo ativo` pronto para o proximo ciclo

Nem `sentinel_phase_closure`, nem `sentinel_prompt_preflight`, nem o executor devem fazer isso.
Blueprint e o unico dono do ciclo de vida do `PLAN.md`.

## Regras inviolaveis da skill

1. `PLAN.md` e descartavel.
2. Conhecimento duravel vive em `DONE`, `CONTEXT`, `STATE` e ADR quando aplicavel.
3. Apenas o `Escopo ativo` pode ser detalhado em tarefas.
4. O horizonte maximo do plano e: `Escopo ativo` detalhado, `Bloco seguinte` curto e `Bloco posterior` opcional curto somente se houver base suficiente.
5. Nada alem disso entra como bloco planejado; o restante vira apenas risco, dependencia ou norte.
6. `MODE=RECYCLE` nao e fechamento.
7. `MODE=RECYCLE` nao e execucao.
8. `MODE=RECYCLE` nao e replanejamento completo da feature.
9. Se o `Escopo ativo` ficar grande demais, divida em blocos menores.
10. Se houver mudanca estrutural relevante, apenas sinalize necessidade de ADR.
11. Use o menor pacote de contexto possivel.
12. Evite backlog longo, historico longo e previsao distante.
13. Sem evidencia, registrar `TBD`.
14. Nem executor, nem preflight, nem closure podem criar, reciclar, promover, resumir ou detalhar `PLAN.md`.

## Politica de contexto e tokens

1. Comece sempre pelo pacote minimo do modo escolhido.
2. Amplie leitura apenas por gatilho real.
3. Nao leia o repo inteiro por zelo.
4. Nao detalhe blocos alem do `Escopo ativo`.
5. Evite `Bloco posterior` quando nao houver base suficiente.
6. Nunca acumule historico longo dentro do `PLAN.md`.

## Entrevista curta

Usar somente quando houver ambiguidade operacional que impeça resolver:
1. feature alvo
2. unidade root/container/subfeature
3. dono do plano
4. decisao que muda a divisao do `Escopo ativo`

Limites:
1. padrao: no maximo 2 rodadas e 7 perguntas no total
2. estendido: apenas com flag explicita `INTERVIEW: EXTENDED`, no maximo 4 rodadas e 12 perguntas
3. preferir perguntas fechadas e com opcoes

## Deteccao e resolucao do `PLAN.md`

Considerar `PLAN.md` existente para a unidade alvo quando o path resolvido ja existir.

Regras:
1. em `MODE=CREATE`, verificar primeiro o path canonico da unidade alvo
2. em `MODE=CREATE`, se o path alvo ja existir, devolver `SKIPPED`
3. em `MODE=RECYCLE`, precisa existir um `PLAN.md` do ciclo atual; se o ciclo estiver no fallback raiz e o fechamento resolver a unidade real, o recycle pode materializar o `PLAN.md` canonico dessa unidade
4. se nao existir `PLAN.md` do ciclo atual nem fechamento suficiente para resolver a unidade, devolver `BLOCKED`
5. `PLAN.md` na raiz so vale como plano alvo quando a skill cair no fallback por falta de resolucao melhor

Path canonico preferencial:
1. feature simples: `docs/features/<feature_slug>/PLAN.md`
2. container: `docs/features/<root>/<container>/PLAN.md`
3. subfeature: `docs/features/<root>/<container>/<collection>/<subfeature>/PLAN.md`
4. fallback: `PLAN.md`, somente quando nao for possivel resolver a unidade correta com evidencia e entrevista curta

Colecoes reconhecidas:
1. `pages`
2. `use-cases`
3. `routes`
4. `features`
5. `modules`
6. `screens`
7. `items` como default

## Como resolver a unidade alvo

1. Se o pedido ou o fechamento apontarem para um path explicito, usar esse path.
2. Se existir exatamente 1 diretorio em `docs/features/`, usar esse slug.
3. Se o ciclo atual estiver em `PLAN.md` raiz e o fechamento resolver a unidade real com evidencia suficiente, passar a usar o path canonico dessa unidade no proximo `MODE=RECYCLE`.
4. Se existirem multiplos candidatos, perguntar ao usuario com opcoes fechadas.
5. Se `docs/features/` nao existir ou estiver vazio, nao inventar slug; usar fallback `PLAN.md` com `FEATURE = TBD`.
6. Em `MODE=RECYCLE`, editar por padrao o mesmo `PLAN.md` da unidade alvo; a unica excecao canonica e sair do fallback `PLAN.md` raiz para o path canonico da unidade resolvida.

## Papel canonico do `PLAN.md` raiz

1. `PLAN.md` na raiz e um plano provisiorio de fallback para bootstrap ou roteamento quando a unidade real ainda nao foi resolvida com seguranca.
2. Ele pode descrever o `Escopo ativo` atual, mas nao define a casa canonica dos artefatos duraveis.
3. `DONE`, `CONTEXT`, `done/` e demais artefatos duraveis sempre pertencem a `docs/features/<unidade_resolvida>/...`.
4. Se o ciclo comecou em `PLAN.md` raiz e a unidade real foi resolvida durante a execucao ou no fechamento, o proximo `MODE=RECYCLE` deve materializar ou atualizar o `PLAN.md` canonico dessa unidade.
5. Depois que a unidade canonica existir, `PLAN.md` raiz deixa de ser o plano principal desse fluxo e nao pode competir com o diretorio resolvido.
6. Se a unidade continuar sem resolucao segura, o fallback raiz pode permanecer somente como plano provisiorio do ciclo atual, com `FEATURE = TBD`.

## Pacote minimo por modo

### `MODE=CREATE`

Ler apenas o minimo para:
1. localizar a feature alvo
2. identificar packs reais por path
3. preencher o template sem inventar contexto

Pacote base:
1. estrutura de `docs/features/`
2. paths canonicos relevantes para a feature
3. `references/templates/TEMPLATE-PLAN.md`

### `MODE=RECYCLE`

Ler apenas o minimo para reorganizar o plano:
1. `PLAN.md` atual da feature
2. ultimo `PHASE CLOSURE OUTPUT`
3. ultimo `DONE` referenciado ou mais recente da unidade, como evidencia complementar, se existir
4. `CONTEXT.md` da feature somente se ainda faltar base para recompor o `Escopo ativo`

Precedencia obrigatoria:
1. `PLAN.md` atual
2. ultimo `PHASE CLOSURE OUTPUT`
3. ultimo `DONE` referenciado ou mais recente da unidade, como evidencia complementar, quando houver
4. `CONTEXT.md` da feature somente se ainda faltar base

Ao abrir `CONTEXT.md`, usar leitura dirigida nesta ordem:
1. bloco `## Snapshot de recycle` no topo, quando existir
2. secoes criticas: `TBD`, pendencias, riscos, perguntas abertas e referencias uteis
3. trecho final ou historico recente

Regras:
1. nao assumir que as primeiras linhas fora do snapshot bastam
2. nao ler o `CONTEXT.md` inteiro por padrao
3. `done/` e `DONE` sao evidencia complementar de fechamento; nao substituem automaticamente o `CONTEXT.md`
4. quando o snapshot nao existir, usar o fallback dirigido acima para compatibilidade com contextos antigos

## Como preencher o plano

Base obrigatoria: `references/templates/TEMPLATE-PLAN.md`

Preencher automaticamente:
1. `STATUS`: `draft`, salvo se a rotina local exigir outro valor
2. `LAST UPDATED`: `YYYYMMDD`
3. `FEATURE`: slug resolvido ou `TBD`
4. `OWNER`: informado pelo usuario ou `TBD`
5. `Core Pack`, `Feature Pack`, `Evidence Pack` e `Reference Pack`: listar apenas paths reais; se nao houver evidencia, registrar `TBD`

## Regras de montagem dos blocos

1. O `Escopo ativo` deve ser pequeno e executavel em uma rodada do executor.
2. `Bloco seguinte` deve ficar curto e servir apenas para previsibilidade operacional.
3. `Bloco posterior` e opcional, curto e so entra quando houver base suficiente.
4. O `Bloco seguinte` pode ser absorvido pelo `Escopo ativo` quando for continuacao natural do mesmo recorte, desde que o plano continue curto e coerente.
5. Separar os blocos quando o `Escopo ativo` ficar grande, mudar de natureza, puxar contexto demais ou deixar de parecer uma rodada coesa.

## Tratamento obrigatorio por status de fechamento

### Se `CLOSED`

1. remover ou resumir o escopo concluido do bloco ativo
2. subir `Bloco seguinte` para `Escopo ativo` quando houver base
3. detalhar o novo `Escopo ativo`
4. manter `Bloco seguinte` curto
5. usar `Bloco posterior` apenas se houver base suficiente

### Se `PARTIAL`

1. nao promover automaticamente o proximo bloco
2. recompor o restante do recorte atual como novo `Escopo ativo`
3. manter os demais blocos apenas como esboco curto quando fizer sentido
4. detalhar somente o que falta para fechar o recorte atual

### Se `BLOCKED`

1. nao promover artificialmente o proximo bloco
2. reciclar apenas se fizer sentido operacional
3. se reciclar, o novo `Escopo ativo` deve refletir explicitamente o bloqueio e a estrategia de desbloqueio
4. se nao houver base para reciclar com seguranca, manter a fila atual e devolver `BLOCKED`

## Historico curto opcional no `PLAN.md`

Pode manter no maximo 1 ciclo anterior, somente com:
1. escopo anterior
2. status
3. referencia ao `DONE`
4. observacao curta

Nunca:
1. acumular historico
2. duplicar conteudo do `DONE`
3. transformar o plano em diario

## Algoritmo operacional

### `MODE=CREATE`

1. Confirmar que nao existe `PLAN.md` para a unidade alvo.
2. Resolver feature, container ou subfeature com evidencia de path.
3. Carregar o template.
4. Preencher cabecalho e packs com paths reais ou `TBD`.
5. Organizar a demanda em horizonte curto.
6. Detalhar apenas o `Escopo ativo`.
7. Manter `Bloco seguinte` curto e adicionar `Bloco posterior` apenas se houver base suficiente.
8. Criar exatamente 1 `PLAN.md`.
9. Se o plano alvo ja existir, parar com `SKIPPED`.

### `MODE=RECYCLE`

1. Ler o `PLAN.md` atual e identificar o `Escopo ativo`.
2. Ler o ultimo `PHASE CLOSURE OUTPUT`.
3. Ler o ultimo `DONE` referenciado ou mais recente da unidade, como evidencia complementar, quando houver.
4. Abrir `CONTEXT.md` da feature somente se ainda faltar base; priorizar o bloco `## Snapshot de recycle` e, sem snapshot, usar leitura dirigida de topo, secoes criticas e trecho final ou historico recente.
5. Aplicar a regra de `CLOSED`, `PARTIAL` ou `BLOCKED`.
6. Recompor os blocos sem replanejar a feature inteira.
7. Detalhar o novo `Escopo ativo` e reduzir o resto para esboco curto.
8. Manter historico curto opcional, no maximo 1 ciclo.
9. Atualizar por padrao o mesmo `PLAN.md`; se o ciclo saiu do fallback raiz para unidade resolvida, materializar ou atualizar o `PLAN.md` canonico dessa unidade.
10. Se nao houver `PLAN.md` do ciclo atual ou fechamento suficiente para recycle seguro, parar com `BLOCKED`.

## Posicao canonica no fluxo

1. `sentinel_plan_blueprint MODE=CREATE`
2. `sentinel_prompt_preflight`
3. executor -> `PLAN OUTPUT`
4. `OK {ID}`
5. executor -> `EXECUTE OUTPUT`
6. `sentinel_phase_closure`
7. `sentinel_plan_blueprint MODE=RECYCLE`
8. `sentinel_prompt_preflight`
9. executor

## Saida operacional esperada

Retornar curto e objetivo, com:
1. `MODE`
2. `STATUS`: `CREATED`, `RECYCLED`, `SKIPPED` ou `BLOCKED`
3. `PLAN PATH`
4. `FEATURE`
5. `ACTIVE SCOPE`
6. `QUESTIONS ASKED`
7. `FILES CREATED/UPDATED`

## Criterios de pronto desta skill

1. `.agents/skills/sentinel_plan_blueprint/SKILL.md` reflete `MODE=CREATE` e `MODE=RECYCLE`.
2. `references/templates/TEMPLATE-PLAN.md` preserva o template e a separacao entre `Escopo ativo`, `Bloco seguinte` e `Bloco posterior`.
3. A skill deixa claro que a autoridade sobre a fila do plano e exclusiva do blueprint.
4. O fluxo canonico fica consistente com `sentinel_prompt_preflight` e `sentinel_phase_closure`.
5. `MODE=RECYCLE` deixa explicito que o snapshot do `CONTEXT.md` e a interface duravel prioritaria de handoff quando o plano, o fechamento e o `DONE` ainda nao bastarem.
