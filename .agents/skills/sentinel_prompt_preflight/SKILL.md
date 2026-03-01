---
name: sentinel_prompt_preflight
description: Router Planner. Heurística de demanda grande + sanity check por existência + sugestões de bootstrap + prompt único para PLAN/OK/EXECUTE no mesmo chat com gates (PlanID e AdrID), packs lazy, stop conditions e DocSync.
---

# Sentinel Prompt Preflight (2026-03)

## Contrato

Entrada
1) Uma tarefa em linguagem natural.

Saída
1) Somente 1 prompt pronto para copiar e colar no chat do agente.
2) Nenhum relatório, nenhuma explicação adicional fora do prompt.

Regras de ouro
1) Esta skill pode checar somente existência de arquivos e pastas quando a heurística indicar demanda grande.
2) Esta skill não pode abrir nem ler conteúdo de arquivos para tomar decisões.
3) Se faltar base canônica, sugerir bootstraps, mas nunca bloquear sem oferecer bypass explícito.

## Heurística de demanda grande

Considere "provável grande" se o texto da tarefa indicar 1 ou mais itens abaixo
1) mexe em mais de um módulo ou área
2) fala em consolidar, padronizar, reestruturar, migrar
3) envolve permissões, perfis, papéis, acesso
4) cria algo agregado a partir de muitos itens ou pastas
5) inclui condições do tipo "somente se", "apenas quando", "depende de"
6) sugere múltiplos arquivos ou múltiplos relatórios

Se não for provável grande
1) Não fazer sanity check
2) Gerar direto o prompt principal Router Planner

## Sanity check por existência

Executar somente se a heurística marcar provável grande.

Whitelist v1 para checar existência
1) docs/INDEX.md
2) docs/core/RULES.md
3) docs/core/STATE.md
4) docs/core/CONTEXT.md
5) docs/core/CONTRACTS.md
6) docs/core/TESTING.md
7) docs/core/UI_KIT.md
8) docs/decisions
9) PLAN.md
10) docs/features

Critérios
1) Base canônica mínima presente se INDEX existe e RULES existe e STATE existe e CONTEXT existe
2) PLAN presente se PLAN.md existe
3) decisions presente se docs/decisions existe

Proibição
1) Não abrir arquivos, não ler conteúdo, não procurar por texto dentro de arquivos.

## Roteamento por sugestão

Use os resultados do sanity check para gerar um prompt que comece sugerindo um próximo passo.

Caso A base canônica mínima ausente
1) sugerir rodar a skill sentinel_docs_bootstrap
2) oferecer bypass: SKIP

Caso B base canônica mínima presente, provável grande, PLAN ausente
1) sugerir rodar a skill de PLAN Bootstrap
2) nome padrão sugerido: sentinel_plan_bootstrap
3) oferecer bypass: SKIP-PLAN

Caso C tudo ok ou usuário optar por bypass
1) seguir com prompt principal Router Planner

## Como gerar o prompt final

1) Incluir a tarefa original em uma seção "TAREFA"
2) Incluir um bloco curto "SANITY CHECK" apenas se o sanity check foi executado
3) Incluir recomendações com bypass apenas se aplicável
4) Incluir o prompt principal Router Planner sempre, como o corpo único do prompt
5) O prompt deve ser em português
6) O prompt deve ser compacto, sem prosa extra

## Prompt único a ser emitido

Você deve emitir exatamente o texto abaixo, preenchendo os campos entre chaves.
Não emita nenhum texto antes ou depois.

Começar prompt

[INICIO DO PROMPT]

TAREFA
{TAREFA_USUARIO}

MODO
Router Planner. Primeiro você planeja. Você não executa nada antes de aprovação explícita via OK com o ID correto.

SE HOUVER SANITY CHECK, INSERIR
SANITY CHECK
{RESULTADOS_SANITY_CHECK}

SE HOUVER RECOMENDAÇÃO, INSERIR
RECOMENDAÇÃO
{RECOMENDACAO_ROTEAMENTO}

BYPASS
1) Para ignorar recomendação e seguir, usuário pode responder SKIP ou SKIP-PLAN conforme indicado.
2) Para ignorar DocSync no fim, usuário pode responder SKIP-DOCSYNC.

REGRAS INVOLÁVEIS
1) Stop conditions: na dúvida relevante, pergunte e pare.
2) Proibido refactor amplo sem permissão explícita.
3) Proibido inventar stack, regras, contratos, estruturas.
4) Proibido executar antes de OK com o ID correto.

PRECEDÊNCIA DE FONTES CANÔNICAS
1) Se docs/INDEX.md existir, siga a ordem de precedência definida nele.
2) Se não existir, use esta ordem padrão
2.1) ADR em docs/decisions
2.2) docs/core/RULES.md
2.3) docs/core/CONTRACTS.md
2.4) docs/core/CONTEXT.md
2.5) docs/features e seus CONTEXT e PLAN
2.6) docs/core/UI_KIT.md ou DESIGN_SYSTEM quando existir
2.7) docs/core/TESTING.md
2.8) docs/core/STATE.md
2.9) docs/done quando existir

PACKS LAZY
1) Core mínimo sempre
1.1) docs/core/RULES.md
1.2) docs/core/STATE.md
1.3) docs/core/CONTEXT.md
2) Feature pack somente se a tarefa tiver feature clara e houver pasta docs/features correspondente
3) Evidence pack mínimo: só paths e nomes de seções, sem copiar trechos longos
4) Reference pack somente por gatilho explícito: integração externa, contrato externo, ou pedido do usuário

CLASSIFICAÇÃO DE ESCOPO
Você deve classificar a tarefa como exatamente 1 opção
1) Local: poucos arquivos, uma área, sem impactos em contratos globais
2) Transversal: múltiplas áreas ou múltiplos módulos, mas sem mudar arquitetura base
3) Estrutural: muda arquitetura, padrões globais, contratos globais, estrutura de pastas base, build ou convenções centrais

REGRA DE ADR
1) Se escopo for Estrutural, exige ADR aprovado antes de qualquer mudança estrutural.
2) Você deve emitir AdrID e parar aguardando OK do usuário.

LIMITES PARA REFATOR AMPLO
Considere refactor amplo se ocorrer qualquer item
1) mais de 10 arquivos alterados sem justificativa direta
2) mover ou renomear arquivos ou pastas
3) renomear símbolos públicos com múltiplos usos
4) tocar em shared core infra sem estar no escopo
Ação: pedir permissão e parar

MAQUINA DE ESTADOS NO MESMO CHAT
Estado PLAN
1) Ler apenas o necessário conforme packs lazy
2) Produzir um plano curto e travado no formato PLAN OUTPUT
3) Gerar PlanID e terminar com STOP aguardando OK PlanID

Transição para EXECUTE
1) Só entrar em EXECUTE se a última mensagem do usuário for exatamente OK {PlanID}
2) Se mensagem for diferente, permanecer em PLAN e não executar

Estrutural
1) Se classificar Estrutural, emitir AdrID e parar aguardando OK AdrID
2) Só após OK AdrID, criar ADR e então executar o plano

DOCSYNC NO FIM DO EXECUTE
Objetivo: manter docs mínimas coerentes, sem burocracia
Regras
1) Por padrão, atualizar no máximo 3 arquivos de docs por execução
2) Alterar somente as seções necessárias, sem reformatar arquivos inteiros
3) Se precisar mexer em mais de 3 docs, pedir permissão e parar
4) Bypass: se usuário usar SKIP-DOCSYNC, registrar TBD e seguir

Gatilhos DocSync
1) PLAN.md: atualizar se houve desvio do plano ou para marcar concluído
2) docs/core/STATE.md: atualizar se mudou comportamento, permissão, fluxo, config ou feature
3) docs/core/CONTRACTS.md: atualizar se mudou contrato, DTO, payload, permissões públicas ou integrações
4) docs/core/RULES.md ou CONTEXT: atualizar se mudou regra de negócio
5) UI_KIT ou DESIGN_SYSTEM: atualizar se mudou padrão de UI ou componente reutilizável
6) TESTING: atualizar se mudou validação mínima recomendada

PLAN OUTPUT
Você deve responder no máximo 60 linhas.
Campos obrigatórios e ordem
1) PlanID
2) Escopo: Local ou Transversal ou Estrutural
3) Packs a ler e lista de arquivos a ler em ordem
4) Scope Lock: arquivos alvo previstos e fora de escopo explícito
5) Plano em até 7 passos
6) Validação mínima
7) DocSync previsto
8) Perguntas ou TBD no máximo 5 itens
9) STOP aguardando OK PlanID ou OK AdrID

EXECUTE OUTPUT
Você deve responder no máximo 40 linhas.
Campos obrigatórios e ordem
1) STATUS: DONE ou BLOCKED
2) Escopo
3) Arquivos alterados
4) Validação executada
5) DocSync aplicado ou SKIPPED
6) Mudança de comportamento relevante
7) Próximo passo ou motivo do bloqueio

STOP CONDITIONS
Você deve perguntar e parar se ocorrer qualquer item
1) ambiguidade que muda comportamento do usuário
2) falta de evidência para regra crítica
3) conflito entre fontes canônicas
4) necessidade de refactor amplo não autorizado
5) mudança estrutural sem ADR aprovado

[FINAL DO PROMPT]

Terminar prompt

[FIM DO PROMPT]
