---
name: sentinel_phase_closure
description: Fecha documental e operacionalmente a execucao apos o EXECUTE OUTPUT; valida objetivo, DoD e evidencias do escopo executado; decide CLOSED, PARTIAL ou BLOCKED; atualiza apenas docs minimas; nao recicla PLAN.md nem detalha o proximo escopo.
---

# Sentinel Phase Closure

## O que esta skill faz

Fechar a execucao ja realizada com base em evidencia, registrar o conhecimento minimo duravel e devolver um encerramento curto, confiavel e repetivel.

## Objetivo unico

Validar se o escopo executado pode ser considerado concluido e consolidar o fechamento documental pos-execucao sem misturar fechamento com planejamento.

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

## Separacao canonica e inviolavel

1. Esta skill fecha a execucao realizada.
2. Esta skill e o unico ponto canonico de consolidacao documental pos-execucao.
3. Esta skill nao recicla o `PLAN.md`.
4. Esta skill nao promove `Bloco seguinte` para `Escopo ativo`.
5. Esta skill nao detalha tecnicamente o proximo escopo.
6. Reorganizacao do plano, reciclagem do `PLAN.md` e detalhamento do novo `Escopo ativo` pertencem exclusivamente a `sentinel_plan_blueprint MODE=RECYCLE`.
7. O executor implementa e valida. Esta skill consolida docs duraveis. Esta skill nao implementa.

## Quando usar

Usar somente apos existir um `EXECUTE OUTPUT` do ciclo atual e quando for necessario decidir se o escopo executado pode ser encerrado como `CLOSED`, `PARTIAL` ou `BLOCKED`.

## Quando nao usar

1. Nao usar para criar `PLAN.md`.
2. Nao usar para reciclar, reordenar ou detalhar blocos do `PLAN.md`.
3. Nao usar para executar codigo, editar codigo ou completar implementacao faltante.
4. Nao usar para discovery amplo do repositorio.
5. Nao usar como substituto do executor.
6. Nao usar como substituto do `sentinel_plan_blueprint`.
7. Nao usar para gerar novo `PLAN OUTPUT`.
8. Nao usar para gerar prompt de replanejamento.

## Entradas obrigatorias

Nota de resolucao:
1. neste documento, `docs/features/<feature>/...` representa a unidade alvo resolvida
2. a unidade alvo pode ser feature simples, container ou subfeature aninhada
3. portanto, os paths abaixo devem ser interpretados no path real da unidade alvo, nao apenas em um path simples de feature
4. `PLAN.md` raiz so pode aparecer aqui como plano provisiorio do ciclo que ainda nao tinha unidade resolvida
5. antes de gravar artefato duravel, esta skill deve resolver a unidade alvo real com evidencia suficiente

1. `docs/INDEX.md`
2. `docs/core/RULES.md`
3. `docs/core/STATE.md`
4. `docs/features/<feature>/CONTEXT.md`, se existir
5. `docs/features/<feature>/PLAN.md` ou `PLAN.md` raiz provisiorio do ciclo atual
6. ultimo `EXECUTE OUTPUT` da feature
7. evidencias minimas associadas ao execute
8. ultimo `DONE` da feature, se existir

## Saidas obrigatorias

1. `PHASE CLOSURE OUTPUT` curto e operacional
2. `docs/features/<feature>/done/DONE-YYYYMMDD-<entrega-real>.md` na unidade alvo resolvida
3. atualizacao minima de `docs/features/<feature>/CONTEXT.md` na unidade alvo resolvida
4. atualizacao de `docs/core/STATE.md` apenas se houver impacto global real
5. `docs/decisions/ADR-YYYYMMDD-<slug>.md` apenas se a mudanca for estrutural

## Regras inviolaveis da skill (runtime)

1. Nao fechar execucao sem evidencia suficiente.
2. Nao fechar execucao apenas porque houve alteracao de codigo.
3. O `EXECUTE OUTPUT` e a evidencia principal, mas nao substitui a validacao do objetivo e do DoD.
4. Sem objetivo entregue e sem DoD atingido, o escopo executado nao pode virar `CLOSED`.
5. Falta de evidencia critica resulta em `PARTIAL` ou `BLOCKED`.
6. `STATE` so pode ser atualizado se a mudanca afetar comportamento global, contrato global, regra global, decisao reutilizavel ou entendimento global do sistema.
7. Mudanca estrutural exige ADR; nao pode ser absorvida silenciosamente.
8. Conhecimento duravel vai para `DONE`, `CONTEXT` e `STATE` quando aplicavel; nao entulhar o `PLAN`.
9. Esta skill nao recicla o plano.
10. Esta skill nao detalha a proxima fase.
11. A skill deve ser curta, deterministica e anti-burocracia.
12. O comportamento padrao deve tocar o minimo possivel de docs.
13. Nao inventar evidencia ausente.
14. Nao afirmar fechamento por feeling.
15. Nao reler o projeto inteiro por zelo.
16. `PLAN.md` raiz e apenas plano provisiorio; nunca recebe `DONE`, `CONTEXT`, `done/` ou outros artefatos duraveis.
17. Se o ciclo comecou em `PLAN.md` raiz, a skill deve resolver a unidade alvo real antes de atualizar docs duraveis.
18. Se a unidade alvo real continuar ambigua, nao inventar diretorio canonico; retornar `PARTIAL` ou `BLOCKED`.
19. O nome do `DONE` deve refletir a entrega consolidada da rodada; nunca usar numeracao operacional na identidade do arquivo.
20. O `CONTEXT.md` da unidade resolvida deve manter cabecalho duravel: `SCOPE: feature`, `FEATURE: <feature-path>`, `STATUS: active` ou `in-progress`, `LAST UPDATED: YYYYMMDD`.
21. Nunca escrever `SCOPE: subfeature`.
22. Nunca escrever `STATUS` acoplado a fase, rodada ou fechamento, como `fase-x-closed`, `phase-x-closed` ou equivalente.
23. O historico no `CONTEXT` registra marcos entregues com data e ponteiro para o `DONE`, nunca em formato de status operacional numerado.
24. Esta skill absorve definitivamente toda necessidade de consolidacao documental pos-execucao.
25. Nao existe papel documental residual no executor apos o `EXECUTE OUTPUT`.
26. Esta skill e a dona do snapshot de recycle no topo do `CONTEXT.md` da unidade resolvida.
27. O snapshot de recycle deve permanecer curto, estavel e coerente com o `DONE` recem-criado, sem virar mini-`PLAN.md`, mini-`DONE` ou log operacional.

## Pacote minimo de contexto

Pacote base:

1. `docs/INDEX.md`
2. `docs/core/RULES.md`
3. `docs/core/STATE.md`
4. `docs/features/<feature>/CONTEXT.md`, se existir
5. `docs/features/<feature>/PLAN.md` ou `PLAN.md` raiz provisiorio do ciclo atual
6. ultimo `EXECUTE OUTPUT`
7. evidencias minimas associadas ao execute
8. ultimo `DONE` da feature, se existir

Regra de expansao:

1. Comecar sempre pelo pacote base.
2. Ampliar leitura somente por gatilho real.
3. Gatilhos validos:
   - arquivo citado no `EXECUTE OUTPUT`
   - evidencia necessaria para verificar um item do DoD
   - conflito entre `PLAN.md`, `EXECUTE OUTPUT` e docs da feature
   - indicio de impacto global real
   - indicio de mudanca estrutural
4. Nao abrir `docs/reference/*` por padrao.
5. Nao fazer discovery amplo do repo.

## Politica de docs

### Sempre pode atualizar

1. `docs/features/<feature>/done/DONE-YYYYMMDD-<entrega-real>.md` da unidade alvo resolvida
2. `docs/features/<feature>/CONTEXT.md` da unidade alvo resolvida

### Pode atualizar por gatilho real

1. `docs/core/STATE.md`

### So se estrutural

1. `docs/decisions/ADR-YYYYMMDD-<slug>.md`

### Nao deve tocar por padrao

1. `docs/reference/*`
2. arquivos de codigo
3. `PLAN.md` para reciclagem estrutural

### Regra especifica sobre o plano

1. Pode ler `docs/features/<feature>/PLAN.md` para validar escopo, objetivo e DoD.
2. Se o ciclo estiver em `PLAN.md` raiz, pode le-lo apenas como registro provisiorio do escopo executado.
3. Antes de gravar `DONE` ou `CONTEXT`, deve resolver a unidade alvo real e usar o diretorio canonico dessa unidade.
4. Nao pode reciclar, reordenar, promover, reestruturar ou detalhar o plano.

## Politica anti-burocracia

1. Fechamento normal toca apenas o minimo:
   - criar `DONE`
   - atualizar `CONTEXT`
   - atualizar `STATE` so se houver impacto global
   - criar ADR so se estrutural
2. Nao gerar relatorio longo.
3. Nao produzir narrativa excessiva.
4. Nao transformar fechamento em auditoria pesada.
5. Nao duplicar no `PLAN.md` o que deve viver em `DONE`, `CONTEXT`, `STATE` ou ADR.
6. O fechamento documental real acontece aqui, nao no executor.

## Evidencia valida

Considerar como evidencia valida somente o que estiver explicitamente demonstrado por uma ou mais fontes canonicas:

1. `EXECUTE OUTPUT`
2. validacoes registradas no execute
3. paths, arquivos e artefatos citados no execute
4. docs minimas atualizadas pela propria closure
5. evidencias complementares estritamente necessarias para confirmar um item do DoD

Nao considerar como evidencia suficiente:

1. diff sem relacao clara com o objetivo do escopo executado
2. lista de arquivos alterados sem validacao
3. afirmacao generica de que "foi implementado"
4. inferencia sem base de que o DoD foi atingido

## Conteudo minimo das docs de fechamento

### DONE

Registrar de forma curta:

1. feature
2. entrega consolidada que identifica o arquivo
3. status (`CLOSED`, `PARTIAL` ou `BLOCKED`)
4. objetivo do escopo executado
5. veredito do DoD
6. evidencia principal
7. validacao minima executada
8. desvios, TBDs e observacoes relevantes
9. impacto documental
10. proximo passo logico

### CONTEXT

Atualizar somente o minimo necessario para a feature continuar coerente:

1. cabecalho estavel e duravel da unidade
2. snapshot curto de recycle no topo
3. fatos duraveis aprendidos com a execucao
4. historico curto por marco entregue com data e path para o `DONE`
5. TBDs, restricoes ou riscos locais que continuam abertos
6. referencias uteis da unidade, sem transformar o arquivo em log de execucao

## Convencoes duraveis obrigatorias

### CONTEXT da unidade resolvida

1. Sempre usar `SCOPE: feature`.
2. Sempre usar `FEATURE: <feature-path>` com o path resolvido da unidade, inclusive quando ela for aninhada.
3. O `STATUS` do cabecalho deve ficar em `active` ou `in-progress`, conforme o estado duravel observado; nunca acoplar o valor a numeracao operacional.
4. No topo, manter sempre o bloco canonico:
   `## Snapshot de recycle`
   `- LAST DONE: <path-ou-TBD>`
   `- LAST DECISION: CLOSED | PARTIAL | BLOCKED | TBD`
   `- LAST MILESTONE: <frase-curta-ou-TBD>`
   `- OPEN THREADS:`
   `  - <item curto ou TBD>`
   `- NEXT RECYCLE BASIS: <frase curta sobre o que habilita o proximo recycle>`
   `- LAST UPDATED: YYYYMMDD`
5. `OPEN THREADS` pode ficar apenas com `- TBD` quando nao houver base melhor.
6. O snapshot deve ser coerente com o `DONE` recem-criado e nao deve duplicar conteudo longo do `DONE`.
7. O historico deve registrar o que foi consolidado, a data e o path do `DONE`.
8. Exemplo aceitavel de historico:
   - `20260309: interfaces e service do relatorio consolidado concluidos -> docs/features/print-documents/consolidated-report/done/DONE-20260309-interfaces-service-relatorio-consolidado.md`

### DONE da unidade resolvida

1. O arquivo deve seguir `DONE-YYYYMMDD-<entrega-real>.md`.
2. O slug deve vir da entrega consolidada demonstrada por objetivo e evidencia, nao do numero da fase.
3. O corpo pode mencionar o escopo executado da rodada, mas isso nao define a identidade do arquivo.

### STATE

Atualizar somente quando houver impacto global real, registrando:

1. o que mudou globalmente
2. por que a mudanca e global
3. onde a evidencia e a decisao podem ser encontradas

### ADR

Criar ou exigir ADR quando houver mudanca estrutural, por exemplo:

1. alteracao de fronteira arquitetural
2. novo contrato externo ou mudanca material de contrato externo
3. regra compartilhada reutilizavel entre features
4. decisao sistemica que passa a orientar implementacoes futuras

Se a mudanca estrutural existir e nao houver base suficiente para ADR, parar em `BLOCKED`.

## Algoritmo operacional

1. Resolver a feature alvo sem discovery amplo.
2. Se o ciclo veio de `PLAN.md` raiz, resolver primeiro a unidade alvo real com base no `EXECUTE OUTPUT` e nas evidencias minimas; sem isso, nao ha fechamento duravel seguro.
3. Ler `docs/features/<feature>/PLAN.md` da unidade resolvida, ou o `PLAN.md` raiz apenas como plano provisiorio do escopo executado, e identificar o escopo executado, o objetivo e o DoD canonico.
4. Ler o ultimo `EXECUTE OUTPUT` como evidencia principal.
5. Reunir apenas as evidencias minimas citadas ou necessarias para verificar o DoD.
6. Comparar objetivo, DoD e evidencia. Registrar cada item como `ATINGIDO`, `PARCIAL`, `NAO DEMONSTRADO` ou `BLOQUEADO`.
7. Verificar se houve validacao minima executada e registrada.
8. Verificar se existe bloqueio, desvio relevante, conflito entre fontes ou falta de evidencia critica.
9. Classificar o fechamento como `CLOSED`, `PARTIAL` ou `BLOCKED`.
10. Derivar o slug do `DONE` a partir da entrega consolidada demonstrada por objetivo e evidencia, nunca pelo numero da fase.
11. Criar `DONE` curto no diretorio da unidade resolvida com o veredito, a evidencia principal, validacoes e pendencias.
12. Atualizar `docs/features/<feature>/CONTEXT.md` da unidade resolvida com o snapshot canonico de recycle no topo, cabecalho duravel, fatos duraveis e historico por marco entregue apontando para o `DONE`.
13. Atualizar `docs/core/STATE.md` somente se a mudanca tiver impacto global real.
14. Criar ou exigir ADR somente se a mudanca for estrutural.
15. Emitir `PHASE CLOSURE OUTPUT` curto, claro e operacional, incluindo o proximo passo logico.

## Criterio canonico de fechamento

O fechamento so pode retornar `CLOSED` se todos os quatro criterios abaixo forem satisfeitos:

1. o objetivo do escopo executado foi entregue
2. a validacao minima foi executada e registrada
3. nao existe bloqueio que invalide o DoD
4. as docs minimas de fechamento foram atualizadas

## Classificacao obrigatoria

### `CLOSED`

Usar somente quando:

1. o objetivo do escopo executado foi entregue
2. todos os itens relevantes do DoD foram demonstrados
3. a validacao minima foi executada e registrada
4. nao existe bloqueio canonico aberto
5. `DONE` e `CONTEXT` foram atualizados
6. `STATE` e ADR foram tratados quando aplicavel

### `PARTIAL`

Usar quando:

1. houve implementacao ou avancos reais
2. parte do objetivo foi entregue ou parte do DoD foi demonstrada
3. ainda nao e seguro afirmar fechamento completo
4. faltam evidencias nao criticas para concluir o fechamento, ou existem pendencias objetivas enderecaveis sem reabrir todo o planejamento

### `BLOCKED`

Usar quando:

1. existe impedimento real para afirmar o fechamento
2. falta evidencia critica
3. o DoD nao e verificavel
4. ha conflito relevante entre fontes canonicas
5. a mudanca exigiria contrato externo sem base suficiente
6. a mudanca e estrutural e ainda nao possui ADR ou base para ADR
7. a ausencia de validacao minima invalida o fechamento

## Stop conditions

Parar e nao fechar a execucao se houver:

1. conflito entre fontes canonicas
2. falta de evidencia critica
3. inconsistencias relevantes entre `PLAN.md` e `EXECUTE OUTPUT`
4. ambiguidade que muda comportamento do usuario
5. necessidade de alterar contrato externo sem base suficiente
6. necessidade de mudanca estrutural sem ADR
7. DoD nao verificavel
8. objetivo do escopo executado nao demonstrado
9. ausencia de validacao minima quando ela era necessaria

Nessas condicoes, a skill deve retornar `PARTIAL` ou `BLOCKED`, nunca `CLOSED`.

## Regra de proximo passo

1. Se o status for `CLOSED`, o proximo passo padrao e `sentinel_plan_blueprint MODE=RECYCLE`.
2. Se o status for `PARTIAL`, o proximo passo padrao e `sentinel_plan_blueprint MODE=RECYCLE` para recompor o `Escopo ativo` sem promover automaticamente o proximo bloco.
3. Se o status for `BLOCKED`, o proximo passo padrao e avaliar `sentinel_plan_blueprint MODE=RECYCLE`; se o recycle nao fizer sentido operacional, manter o bloqueio registrado e parar.

## Formato obrigatorio de saida

```md
## PHASE CLOSURE OUTPUT

STATUS: CLOSED | PARTIAL | BLOCKED

FEATURE: <feature>
ENTREGA: <entrega consolidada>
DOD: <atingido | parcial | nao atingido | nao verificavel>
EVIDENCE SUMMARY: <resumo curto da evidencia principal e da validacao minima>
DOCS UPDATED: <lista curta de docs atualizadas ou none>
TBDS / OBSERVATIONS: <lista curta ou none>
NEXT STEP: <proximo passo logico do fluxo>
```

Regras do output:

1. Saida curta e operacional.
2. Sem relatorio prolixo.
3. Sem explicacao longa desnecessaria.
4. Sem reciclar plano no output.
5. Sem detalhar tecnicamente o proximo escopo.

## Observacoes finais de uso

1. `DONE` e o registro de fechamento da tentativa executada. Pode registrar `CLOSED`, `PARTIAL` ou `BLOCKED`, mas o nome do arquivo deve representar a entrega real.
2. `CONTEXT` guarda apenas memoria duravel minima da feature; manter snapshot curto no topo, cabecalho estavel e historico por marco entregue, sem duplicar o `DONE`.
3. `STATE` existe para delta global real; nao usar como despejo de status local da feature.
4. ADR existe para decisao estrutural; nao usar ADR para pendencia trivial.
5. Esta skill fecha a execucao realizada. O replanejamento posterior pertence exclusivamente a `sentinel_plan_blueprint MODE=RECYCLE`.
