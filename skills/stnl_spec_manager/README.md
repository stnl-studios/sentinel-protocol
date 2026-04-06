# stnl_spec_manager

Skill utilitária global para amadurecer uma SPEC rastreável e consumível, sem conduzir o fluxo.

O contrato operacional vive em `SKILL.md`. Este README existe só para manutenção do repo.

## Notas para mantenedores
- manter a skill como produtora de SPEC e artefatos consumíveis, sem condução de fluxo
- tratar `reference/templates/*` como shape canônico obrigatório da saída persistida, não como sugestão frouxa
- manter `feature_spec.md` como artefato principal de SPEC consumível, não como relatório de análise nem pré-plano técnico
- manter `feature_spec.md` focado em problema, objetivo, escopo, fluxos, regras, aceite, riscos, impacto mínimo, dependências e direção consolidada apenas quando legitimamente sustentada
- manter `allow_implicit_invocation: false`
- manter `docs/**` como source of truth primária e codebase apenas como fallback controlado
- manter a regra central: nenhuma lacuna vira requisito silenciosamente
- manter a taxonomia `FACT / DERIVED / ASSUMPTION / OPEN_QUESTION / DECISION` operacional e visível
- manter apenas `MODE=RESUME` como modo público explícito
- manter o limite de até 5 perguntas por rodada
- manter split apenas por recortes funcionais consumíveis, nunca por camada técnica
- manter o `Spec Definition of Done` canônico em `feature_spec.md` e o status por item em `readiness_report.md`
- manter assumptions, open questions e histórico de decisões em artefatos canônicos próprios; não absorver isso cedo demais em `feature_spec.md`
- manter investigação detalhada, evidência expandida e comparação longa entre alternativas em artefatos auxiliares, principalmente `decision_log.md` e `readiness_report.md`
- manter `decision_log.md` apenas para decisões legítimas já tomadas ou explicitamente confirmadas como source of truth; direção ainda especulativa continua em `assumptions.md` ou `open_questions.md`
- manter o shape padrão de saída na skill e nos templates, para que o prompt do usuário carregue sobretudo objetivo, escopo e contexto específico
- manter blockers e perguntas críticas também na saída operacional, não só em artefatos
- manter `readiness_report.md` como gate honesto de prontidão, com `classification_strength`, `classification_notice`, cobertura, validações externas, riscos residuais e condicionalidades explícitas
- manter `readiness_score` como sinal secundário; blockers, gaps críticos e validações pendentes têm precedência
- manter `open_questions.md` com governança completa por item; não aceitar formas reduzidas do tipo `open/resolved: none` quando houver rastreabilidade a preservar
- manter qualquer handoff apenas como `Optional Manual Handoff Prompt`, nunca como roteamento automático
- evitar overlap com `planner`, `orchestrator`, `phase_closure` ou bootstrap de `docs/**`

## Bundle de templates
Base:
- `feature_spec.md`
- `open_questions.md`
- `assumptions.md`
- `decision_log.md`
- `readiness_report.md`
- `session_summary.md`

Condicionais:
- `spec_slices.md`
- `qa_checklist.md`

## Linguagem
Os templates permanecem em en-US para consistência com o restante do kit documental do repo.

## Referência estrutural
`feature_spec.md` é o template canônico e principal de SPEC consumível para desenvolvimento posterior. O output da skill continua sendo o conjunto de artefatos separados acima mais uma saída operacional curta e neutra; a trilha analítica detalhada, hipóteses, perguntas pendentes e histórico de decisão permanecem auditáveis nos artefatos auxiliares.
