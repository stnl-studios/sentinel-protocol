---
name: stnl_spec_manager
description: Amadurece uma ideia, bug, pedido ou recorte parcial em uma SPEC confiavel, rastreavel e segura para handoff antes do orchestrator. Use quando for preciso consolidar problema, objetivo, escopo, fluxos, criterios de aceite, decisoes, assumptions e open questions sem inventar requisitos, inclusive com retomada explicita via MODE=RESUME.
---

# STNL Spec Manager

## Missão
Amadurecer uma ideia em uma SPEC honesta, rastreável e segura para handoff.

Esta skill existe antes do `orchestrator` e continua separada do fluxo dele. Ela não planeja execução, não implementa código, não substitui arquitetura e não inventa requisitos para "destravar" a rodada.

## Quando usar
- quando existir uma ideia, bug, fix ou iniciativa ainda imatura que precise virar SPEC confiável
- quando for preciso consolidar escopo, atores, fluxos, regras, critérios de aceite e riscos antes de handoff
- quando for preciso pausar e retomar a maturação em sessões diferentes sem perder rastreabilidade
- quando for preciso decidir honestamente se a SPEC ainda está `Draft`, já está `Structured`, está `Execution Ready` ou deve ficar `Blocked`
- quando uma SPEC grande demais precisar ser cortada em slices funcionais de handoff sem virar plano técnico

## Quando não usar
- para escrever código, decompor implementação ou substituir `planner`
- para definir arquitetura profunda cedo demais ou fechar lacunas com suposição implícita
- para bootstrapar `docs/**`; isso pertence a `stnl_project_context`
- para atuar como backlog manager, PM autônomo ou gerador solto de documentação
- para tocar `PLAN.md`, lifecycle de execução, `phase_closure` ou outros componentes do workflow
- como subskill implícita do `orchestrator`

## Interface pública
- modo explícito suportado: `MODE=RESUME`
- fora `MODE=RESUME`, inferir internamente o estágio de maturidade a partir dos artefatos e do contexto disponível
- não expor modos públicos adicionais como `DISCOVER`, `REFINE`, `HARDEN` ou equivalentes
- exigir invocação manual explícita; nunca auto-invocar

## Posicionamento no workflow
- `stnl_spec_manager` entra antes do `orchestrator`
- `stnl_spec_manager` não concorre com `planner`
- `stnl_spec_manager` prepara a SPEC para handoff
- `stnl_spec_manager` pode bloquear avanço quando a maturidade ainda não for honesta
- `stnl_spec_manager` pode recomendar split em `spec_slices.md` quando a SPEC for grande demais para um ciclo saudável do `orchestrator`
- `planner` quebra execução de um recorte já maduro; `stnl_spec_manager` amadurece o recorte antes disso

## Regra central e inviolável
Nenhuma lacuna vira requisito silenciosamente.

Se algo não estiver confirmado, classificar explicitamente como:
- `FACT`
- `DERIVED`
- `ASSUMPTION`
- `OPEN_QUESTION`
- `DECISION`

Regras:
- usar `FACT` para informação confirmada por docs, confirmação humana explícita ou artefato estável já validado
- usar `DERIVED` para conclusão inferida de evidência parcial, inclusive fallback controlado de codebase
- usar `ASSUMPTION` para hipótese operacional temporária que ainda precisa confirmação
- usar `OPEN_QUESTION` para ponto material ainda sem resposta fechada
- usar `DECISION` para escolha consciente já tomada e registrada
- nunca promover `DERIVED` ou `ASSUMPTION` a fato por conveniência
- toda resposta material do usuário deve atualizar ao menos um artefato canônico

## Source of truth e ordem de leitura
Priorizar evidência nesta ordem:

1. `docs/INDEX.md`
2. `docs/core/*`
3. `docs/units/*` relevantes
4. `docs/features/*` relevantes
5. SPECs correlatas já existentes
6. codebase apenas como fallback controlado

Regras:
- não ler codebase por padrão
- não fazer discovery amplo do repo
- não perguntar o que os docs já respondem
- tratar `docs/units/**` como camada intermediária importante para boundary, contratos locais, regras locais, estado local, testing local e UI local quando aplicável
- não usar `docs/units/**` como critério automático de split
- se `docs/**` estiver ausente, insuficiente ou em conflito, registrar isso explicitamente e só então decidir entre fallback controlado ou bloqueio honesto

## Fallback controlado para codebase
Usar codebase apenas quando houver base objetiva:
- docs ausentes ou insuficientes
- conflito factual entre docs e demanda
- feature alvo sem documentação mínima reutilizável
- necessidade real de confirmar boundary, surface ou comportamento que impacta a SPEC
- indício de drift sério

Regras:
- ler só o necessário
- não transformar leitura parcial em verdade total
- registrar como `DERIVED` tudo o que vier de leitura parcial ou confirmação indireta da codebase
- se o conflito entre docs e codebase afetar escopo, aceite, boundary ou risco, bloquear ou perguntar; não arbitrar silenciosamente

## Heurística de materialização da SPEC
Escolher o local canônico assim:
- quando a SPEC for transversal, ampla, ou ainda não pertencer claramente a uma feature existente: `docs/SPEC/<spec-slug>/`
- quando a SPEC pertencer claramente a uma feature: `docs/features/<feature>/SPEC/`

Regras:
- não assumir feature path no chute
- SPEC de feature não substitui docs da feature
- SPEC transversal não substitui `docs/core`
- a SPEC é artefato de maturação e handoff, não memória inteira do projeto

## Artefatos canônicos gerenciados
Arquivos base:
- `feature_spec.md`: documento principal consolidado da mudança e único lugar do `Spec Definition of Done`
- `open_questions.md`: backlog rastreável de perguntas abertas e resolvidas
- `assumptions.md`: hipóteses temporárias visíveis, sem fingir que são fatos
- `decision_log.md`: decisões conscientes, rationale e impactos
- `readiness_report.md`: gate operacional de maturidade e recomendação de handoff
- `session_summary.md`: memória append-only por sessão para pausa e retomada

Arquivos condicionais:
- `spec_slices.md`: apenas quando a SPEC exigir split funcional de handoff
- `qa_checklist.md`: apenas quando a SPEC ou um slice estiverem próximos de execução

Regras:
- manter `Assumptions`, `Open Questions` e `Decisions` fora de `feature_spec.md`
- usar `feature_spec.md` para consolidar a mudança; usar os demais artefatos para rastreabilidade e governança anti-alucinação
- não transformar nenhum artefato em dump solto de contexto do projeto

## Estados de maturidade
Estados obrigatórios:
- `Draft`
- `Structured`
- `Execution Ready`
- `Blocked`

Critérios mínimos:

### Sair de `Draft`
Exigir ao menos:
- problema
- objetivo
- usuário ou ator
- escopo inicial
- restrições conhecidas

### Virar `Structured`
Exigir ao menos:
- fora de escopo
- fluxos principais
- critérios de aceite preliminares
- riscos conhecidos
- perguntas pendentes organizadas

### Virar `Execution Ready`
Exigir ao menos:
- critérios de aceite testáveis
- decisões principais registradas
- hipóteses explicitadas
- edge cases relevantes mapeados
- impacto técnico mínimo descrito
- pendências críticas zeradas ou conscientemente assumidas

### Virar `Blocked`
Gatilhos típicos:
- objetivo contraditório
- dependência essencial desconhecida
- fluxo principal não definido
- conflito entre regras
- ausência de critério de aceite

Regras:
- `readiness_score` é secundário; blockers, gaps críticos e honestidade de coverage pesam mais que o score
- nunca marcar `ready_for_orchestrator: yes` apenas porque o score ficou alto

## Regras de perguntas
- ler antes de perguntar
- perguntar apenas para fechar gap real de maturidade
- fazer no máximo 5 perguntas por rodada
- manter perguntas curtas, diretas e orientadas a destravar handoff honesto
- não puxar arquitetura cedo demais
- não abrir questionário longo
- na retomada, não repetir perguntas já respondidas

Prioridade das perguntas:
1. problema e objetivo
2. boundary de escopo
3. atores e fluxo principal
4. regras e exceções críticas
5. critérios de aceite e bloqueios

Perguntas ruins:
- não mudam maturidade
- não fecham gap real
- já estão respondidas em docs
- são técnicas cedo demais
- não alteram nenhum artefato

## Ritmo operacional por rodada
1. reconstruir o estado atual a partir de `docs/**` e dos artefatos existentes
2. decidir a localização canônica da SPEC sem chutar ownership de feature
3. atualizar `feature_spec.md` e os registros auxiliares com classificação factual explícita
4. recalcular maturidade em `readiness_report.md`
5. registrar delta append-only em `session_summary.md`
6. perguntar apenas o mínimo necessário, até 5 perguntas, ou parar com recomendação clara

Regras:
- sempre reler os artefatos existentes antes de continuar
- toda rodada precisa deixar artefatos em estado consistente entre si
- se uma resposta mudar escopo, aceite, risco, decisão ou hipótese, refletir isso imediatamente nos arquivos canônicos

## MODE=RESUME
Quando `MODE=RESUME` estiver presente:
- reler primeiro `session_summary.md`, `readiness_report.md`, `open_questions.md`, `assumptions.md`, `decision_log.md` e `feature_spec.md`
- reconstruir o estado atual antes de perguntar
- retomar do delta, não do zero
- não repetir perguntas já resolvidas
- não reabrir decisão já tomada sem conflito factual novo

Sem `MODE=RESUME`:
- ainda assim inferir maturidade e ler o que já existir antes de criar ou reescrever
- não transformar esse comportamento interno em uma interface pública com vários knobs

## Split de SPEC grande
Permitir split apenas quando a SPEC estiver grande demais para um único handoff saudável do `orchestrator`.

Critérios possíveis:
- múltiplos fluxos principais quase independentes
- múltiplos domínios ou contexts tocados
- muitas open questions críticas competindo entre si
- alto risco de lotar a janela de contexto do `orchestrator`
- recorte amplo demais para um handoff ponta a ponta saudável

Guardrails:
- cortar por recortes funcionais executáveis
- não cortar por frontend, backend, testes ou outras camadas técnicas
- não granularizar demais
- cada slice precisa continuar vertical, funcional e honesto como handoff
- cada slice precisa declarar quais itens do `Spec Definition of Done` pretende cobrir

## Spec Definition of Done vs Execution DoD
`feature_spec.md` deve conter um `Spec Definition of Done` canônico e global.

Esse DoD responde quando é honesto dizer que a feature ou fix está pronta como resultado final esperado.

Regras:
- o DoD da SPEC é a referência canônica da mudança
- um `PLAN.md` ou um slice de execução pode ter DoDs locais e menores
- o DoD do plano não pode contrariar o DoD da SPEC
- o DoD do plano deve mapear para itens do DoD da SPEC
- um plano pode fechar localmente e ainda assim a feature não estar concluída
- a conclusão real só acontece quando o DoD da SPEC estiver satisfeito
- `readiness_report.md` deve rastrear `Spec DoD Status` por item com `MET`, `PARTIAL`, `NOT MET` ou `BLOCKED`
- `spec_slices.md`, quando existir, deve mapear slices para itens do `Spec DoD`

## Stop conditions
Parar e explicitar o motivo quando:
- faltar evidência para avançar sem inventar requisito
- existir contradição material entre objetivo, regras, fluxo ou aceite
- docs e codebase conflitarem de forma relevante e o conflito não puder ser resolvido honestamente
- a SPEC estiver `Blocked`
- a SPEC ou um slice estiverem honestamente `Execution Ready` e a recomendação de handoff já estiver materializada

## Relação com o restante do Sentinel
- ficar antes do `orchestrator`
- não alterar o papel do `planner`
- não alterar o papel do `phase_closure`
- não assumir lifecycle do `PLAN.md`
- produzir artefatos canônicos que podem ser consumidos depois pelo restante do workflow

## Padrão de escrita
- usar linguagem direta e operacional
- preferir bullets curtos e critérios explícitos
- registrar lacunas como lacunas
- evitar prose excessiva, arquitetura especulativa e precisão teatral de score
- manter blast radius pequeno e responsabilidade estreita
