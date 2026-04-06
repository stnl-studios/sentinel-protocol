# stnl_spec_manager

Skill utilitária global para amadurecer uma SPEC rastreável e consumível, sem conduzir o fluxo.

O contrato operacional vive em `SKILL.md`. Este README existe só para manutenção do repo.

## Notas para mantenedores
- manter a skill como produtora de SPEC e artefatos consumíveis, sem condução de fluxo
- manter `feature_spec.md` como artefato principal implementável e de decisão consolidada, não como relatório de análise
- manter `allow_implicit_invocation: false`
- manter `docs/**` como source of truth primária e codebase apenas como fallback controlado
- manter a regra central: nenhuma lacuna vira requisito silenciosamente
- manter a taxonomia `FACT / DERIVED / ASSUMPTION / OPEN_QUESTION / DECISION` operacional e visível
- manter apenas `MODE=RESUME` como modo público explícito
- manter o limite de até 5 perguntas por rodada
- manter split apenas por recortes funcionais consumíveis, nunca por camada técnica
- manter o `Spec Definition of Done` canônico em `feature_spec.md` e o status por item em `readiness_report.md`
- manter investigação detalhada, evidência expandida e comparação longa entre alternativas em artefatos auxiliares, principalmente `decision_log.md` e `readiness_report.md`
- manter o shape padrão de saída na skill e nos templates, para que o prompt do usuário carregue sobretudo objetivo, escopo e contexto específico
- manter blockers e perguntas críticas também na saída operacional, não só em artefatos
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
`feature_spec.md` é o template canônico e principal de SPEC implementável. O output da skill continua sendo o conjunto de artefatos separados acima mais uma saída operacional curta e neutra; a trilha analítica detalhada permanece secundária e auditável nos artefatos auxiliares.
