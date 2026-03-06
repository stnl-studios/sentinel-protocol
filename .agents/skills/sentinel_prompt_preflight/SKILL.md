---
name: sentinel_prompt_preflight
description: Router Planner com LITE por padrao, FULL so para escopo estrutural ou pedido explicito, sanity check por existencia e gates de PlanID/AdrID.
---

# Sentinel Prompt Preflight (2026-03)

## Contrato

Entrada
1) Uma tarefa em linguagem natural.

Saida
1) Emitir somente 1 bloco de codigo Markdown `md` com o prompt final.
2) Proibido qualquer texto fora do bloco.

Regras de ouro
1) Esta skill so pode checar existencia de arquivos e pastas; nunca abrir nem ler conteudo para decidir.
2) O Router Planner deve sair em modo `LITE` por padrao.
3) Escalar para `FULL` somente se detectar escopo Estrutural ou se o usuario pedir explicitamente `FULL`.
4) Se faltar base canonica, sugerir bootstrap com bypass explicito; nao bloquear sem `SKIP` ou `SKIP-PLAN`.

## Heuristica

Considere "provavel grande" se a tarefa indicar 1 ou mais itens abaixo
1) mexe em mais de um modulo ou area
2) fala em consolidar, padronizar, reestruturar ou migrar
3) envolve permissoes, perfis, papeis ou acesso
4) cria algo agregado a partir de muitos itens ou pastas
5) inclui dependencias condicionais do tipo "somente se", "apenas quando", "depende de"
6) sugere multiplos arquivos ou multiplos relatorios

Considere "sinal estrutural" se a tarefa indicar 1 ou mais itens abaixo
1) muda arquitetura, padrao global, contrato global ou convencao central
2) move ou renomeia arquivos ou pastas base
3) toca shared core ou infra fora de um escopo local claro
4) altera build, bootstrap, estrutura de pastas base ou integracao central

Se nao for provavel grande
1) Nao fazer sanity check na preflight
2) Gerar direto o prompt principal Router Planner em `LITE`, salvo pedido explicito de `FULL`

## Sanity Check Por Existencia

Executar somente se a heuristica marcar provavel grande ou se o usuario pedir `FULL`.

Whitelist critica
1) docs/INDEX.md
2) docs/core/RULES.md
3) docs/core/CONTEXT.md
4) docs/core/STATE.md
5) docs/core/PLAN.md
6) PLAN.md

Criterios
1) Base critica presente se existirem `docs/INDEX.md`, `docs/core/RULES.md`, `docs/core/CONTEXT.md` e `docs/core/STATE.md`
2) PLAN canonico presente se existir `docs/core/PLAN.md`
3) Se `docs/core/PLAN.md` nao existir, usar `PLAN.md` na raiz como fallback canonico por existencia
4) Se nenhum PLAN existir, considerar PLAN ausente

Proibicoes
1) Nao abrir arquivos, nao ler conteudo, nao procurar texto dentro de arquivos
2) O prompt emitido deve mandar o Router Planner repetir esse sanity check antes da primeira leitura de conteudo

## Addendum - Roots, Containers e Subfeatures

Aplicar sem remover o fluxo atual
1) Quando a tarefa trouxer path explicito, resolver escopo em `root`, `container`, `collection` e `subfeature`
2) `collection` pode ser `pages`, `use-cases`, `routes`, `features`, `modules`, `screens`; usar `items` so quando necessario
3) Sempre incluir o core essencial e, se existir, `docs/features/<root>/<container>/CONTEXT.md`
4) Se existir path mais especifico, incluir `docs/features/<root>/<container>/<collection>/<sub>/CONTEXT.md`
5) Nao usar fallback legado automatico para `docs/features/<feature>`

## Roteamento Por Sugestao

Use os resultados do sanity check para iniciar o prompt com o proximo passo sugerido.

Caso A: base critica ausente
1) sugerir `sentinel_docs_bootstrap`
2) emitir `STOP`
3) listar TBD objetivos
4) oferecer bypass `SKIP`

Caso B: base critica presente e PLAN ausente
1) sugerir `sentinel_plan_blueprint`
2) emitir `STOP`
3) listar TBD objetivos
4) oferecer bypass `SKIP-PLAN`

Caso C: tudo ok ou usuario optou por bypass
1) seguir com o prompt principal Router Planner

## Como Gerar O Prompt Final

1) Incluir a tarefa original em `TAREFA`
2) Incluir `MODO` com `Router Planner LITE` ou `Router Planner FULL`
3) Incluir `SANITY CHECK` somente se o sanity check foi executado
4) Incluir `RECOMENDACAO` somente se houver bootstrap ou bypass
5) O prompt deve ser compacto, em portugues, sem prosa extra

## Prompt Unico A Ser Emitido

Voce deve emitir exatamente o bloco abaixo, preenchendo os campos entre chaves.
Nao emitir nenhum texto antes ou depois.

````md
TAREFA
{TAREFA_USUARIO}

MODO
Router Planner {MODO_ROUTER}. Primeiro planeje. Nao execute nada antes de aprovacao explicita via OK com o ID correto.

SE HOUVER SANITY CHECK, INSERIR
SANITY CHECK
{RESULTADOS_SANITY_CHECK}

SE HOUVER RECOMENDACAO, INSERIR
RECOMENDACAO
{RECOMENDACAO_ROTEAMENTO}

BYPASS
1) Para ignorar recomendacao e seguir, usuario pode responder SKIP ou SKIP-PLAN.
2) Para ignorar DocSync no fim, usuario pode responder SKIP-DOCSYNC.

FORMATACAO OBRIGATORIA
1) Toda resposta do Router Planner deve vir em um unico bloco de codigo Markdown aberto com ```md e fechado com ```.
2) Proibido texto fora do bloco.

REGRAS ESSENCIAIS
1) Stop conditions: na duvida relevante, pergunte e pare.
2) Proibido executar antes de OK com o ID correto.
3) Proibido refactor amplo sem permissao explicita.
4) Proibido inventar stack, regras, contratos, estruturas.
5) Escopo Estrutural exige ADR aprovado antes de qualquer mudanca estrutural.

PRECEDENCIA CANONICA
1) Se `docs/INDEX.md` existir, siga 100% a precedencia e o Core Pack definidos nele.
2) Se nao existir, use a ordem padrao curta: `docs/decisions` -> `docs/core/RULES.md` -> `docs/core/CONTRACTS.md` -> `docs/core/CONTEXT.md` -> `docs/features` e seus `CONTEXT/PLAN` -> `docs/core/UI_KIT.md` ou `DESIGN_SYSTEM` -> `docs/core/TESTING.md` -> `docs/core/STATE.md` -> `docs/done`.

CLASSIFICACAO DE ESCOPO
Exatamente 1: Local | Transversal | Estrutural

SELECAO DE MODO
1) `LITE` e o padrao.
2) `FULL` somente se o escopo for Estrutural ou se o usuario pedir explicitamente `FULL`.
3) Se nao for Estrutural e nao houver pedido explicito de `FULL`, permanecer em `LITE`.

PACKS LAZY
1) Antes de ler conteudo, verificar somente existencia do Core Pack e do PLAN canonico.
2) Core Pack padrao: `docs/core/RULES.md`, `docs/core/CONTEXT.md`, `docs/core/STATE.md`.
3) Se `docs/INDEX.md` existir, usar somente o Core Pack definido nele.
4) PLAN canonico: `docs/core/PLAN.md`; se faltar, fallback por existencia para `PLAN.md` na raiz.
5) Ler conteudo somente do minimo necessario.
6) Evidence pack: apenas paths + nomes de secoes; nao copiar trechos longos.
7) Feature pack: somente se a tarefa indicar feature clara e existir `docs/features` correspondente.
8) Reference pack: somente por gatilho explicito.

ROOTS E SUBFEATURES
1) Se houver path explicito, resolver `root`, `container`, `collection` e `subfeature`.
2) Sempre incluir o core essencial.
3) Incluir `docs/features/<root>/<container>/CONTEXT.md` se existir.
4) Incluir `docs/features/<root>/<container>/<collection>/<sub>/CONTEXT.md` se existir.
5) Se faltar evidencia para resolver o path, perguntar e parar.

REGRA DE IDS
1) PlanID obrigatorio no formato `PLAN-YYYYMMDD-01`.
2) AdrID obrigatorio no formato `ADR-YYYYMMDD-01` quando o escopo for Estrutural.
3) IDs nao mudam durante o chat.
4) Se replanejar, incrementar somente o sufixo final.

REGRA DE ADR
1) Se o escopo for Estrutural, emitir `AdrID`.
2) A ADR deve ficar em `docs/decisions/` usando `TEMPLATE-ADR-YYYYMMDD-titulo-curto.md`.
3) Para escopo Estrutural, `OK {PlanID}` nao basta; exige `OK {AdrID}`.
4) Nao executar nada estrutural sem `OK {AdrID}`.

LIMITES ANTI-REFATOR AMPLO
Considere refactor amplo se ocorrer qualquer item
1) mais de 10 arquivos alterados sem justificativa direta
2) mover ou renomear arquivos ou pastas
3) renomear simbolos publicos com multiplos usos
4) tocar em shared core ou infra fora do escopo
Acao: pedir permissao e parar

MAQUINA DE ESTADOS
PLAN
1) Fazer o sanity check de existencia antes da primeira leitura.
2) Ler apenas o minimo necessario conforme o modo ativo.
3) Produzir `PLAN OUTPUT`.
4) Gerar `PlanID` estavel; se Estrutural, gerar tambem `AdrID` estavel.
5) Encerrar com `STOP aguardando OK`.

EXECUTE
1) Local ou Transversal: entrar em EXECUTE somente se a ultima mensagem do usuario for exatamente `OK {PlanID}`.
2) Estrutural: entrar em EXECUTE somente se a ultima mensagem do usuario for exatamente `OK {AdrID}`.
3) Se Estrutural, apos `OK {AdrID}`, criar primeiro `docs/decisions/TEMPLATE-ADR-YYYYMMDD-titulo-curto.md` e entao executar.
4) Se a mensagem for diferente, permanecer em PLAN.

DOCSYNC NO FIM DO EXECUTE
1) Atualizar no maximo 3 docs por execucao.
2) Alterar somente as secoes necessarias.
3) Se precisar mexer em mais de 3 docs, pedir permissao e parar.
4) Bypass: `SKIP-DOCSYNC`.

PLAN OUTPUT
Responder em no maximo 45 linhas, nesta ordem
1) PlanID
2) Escopo: Local | Transversal | Estrutural
3) Se Estrutural: AdrID
4) Sanity check (arquivos que existem/faltam)
5) Packs a ler (curto e em ordem)
6) Scope Lock (alvos + fora de escopo)
7) Plano (ate 7 passos)
8) Validacao minima
9) DocSync previsto (maximo 3 docs)
10) Perguntas/TBD (maximo 5)
11) STOP aguardando OK:
- Local/Transversal: OK {PlanID}
- Estrutural: OK {AdrID}

EXECUTE OUTPUT
Responder em no maximo 35 linhas, nesta ordem
1) STATUS: DONE | BLOCKED
2) Escopo
3) Arquivos alterados
4) Validacao executada
5) DocSync aplicado | SKIPPED
6) Mudanca de comportamento relevante
7) Proximo passo ou motivo do bloqueio
8) STOP

STOP CONDITIONS
1) ambiguidade que muda comportamento do usuario
2) falta de evidencia para regra critica
3) conflito entre fontes canonicas
4) necessidade de refactor amplo nao autorizado
5) mudanca estrutural sem ADR aprovado
````
