# stnl_spec_manager

Skill utilitária global para amadurecer uma SPEC rastreável e consumível, sem conduzir o fluxo.

O contrato operacional vive em `SKILL.md`. Este README existe só para manutenção do repo.

## Notas para mantenedores
- manter a skill como produtora de SPEC e artefatos consumíveis, sem condução de fluxo
- tratar `reference/templates/feature_spec.md` como shape canônico obrigatório da saída persistida e os demais templates como suportes opcionais
- manter `feature_spec.md` como único artefato canônico obrigatório e durável da SPEC final, não como relatório de análise nem pré-plano técnico
- manter `feature_spec.md` focado em problema, objetivo, escopo, fora de escopo, fluxos, regras, aceite, riscos relevantes, decisões finais consolidadas, lifecycle / closure e lacunas remanescentes apenas quando realmente existirem
- manter `allow_implicit_invocation: false`
- manter `docs/**` como source of truth primária e codebase apenas como fallback controlado
- manter a regra central: nenhuma lacuna vira requisito silenciosamente
- manter a taxonomia `FACT / DERIVED / ASSUMPTION / OPEN_QUESTION / DECISION` operacional e visível
- manter apenas `MODE=RESUME` e `MODE=CLOSE` como modos públicos explícitos
- manter o limite de até 5 perguntas por rodada
- manter split apenas por recortes funcionais consumíveis, nunca por camada técnica
- manter o `Spec Definition of Done` canônico em `feature_spec.md` e, quando `readiness_report.md` existir, o status por item nele
- manter `state` como maturidade da SPEC e `lifecycle_status` como estado de fechamento do artefato
- manter `MODE=CLOSE` restrito a reconciliar evidência já existente contra aceite, Spec DoD, blockers materiais e lacunas remanescentes já materializadas
- manter `MODE=CLOSE` como fechamento ou congelamento da SPEC, nunca como `DONE`, `Feature CONTEXT`, troca de ownership do workflow ou substituto de `finalizer` / `validation-runner`
- em `MODE=CLOSE`, compactar a SPEC fechada para que `feature_spec.md` vire a leitura final suficiente e remover auxiliares já absorvidos
- não apagar automaticamente auxiliares quando o resultado for `not_closed`
- manter artefatos auxiliares como transitórios por default; após fechamento, só persistem quando ainda carregarem valor residual real e explicitamente justificado em `feature_spec.md`
- manter investigação detalhada, evidência expandida e comparação longa entre alternativas fora do arquivo canônico sempre que isso evitar poluição da SPEC final
- manter `decision_log.md` apenas como apoio opcional para decisões intermediárias; decisões finais relevantes precisam ser consolidadas em `feature_spec.md`
- manter o shape padrão de saída na skill e nos templates, para que o prompt do usuário carregue sobretudo objetivo, escopo e contexto específico
- manter blockers e perguntas críticas também na saída operacional, não só em artefatos
- manter `readiness_report.md`, quando existir, como gate honesto de prontidão sem virar dependência estrutural da SPEC final
- manter `readiness_score` como sinal secundário; blockers, gaps críticos e validações pendentes têm precedência
- quando houver recorte composto por itens concretos do projeto, exigir discovery factual mínimo por item antes de abrir pergunta bloqueante ampla sobre direção técnica, dependência, estratégia ou classe de solução
- usar essa rodada mínima para reduzir a pergunta, não para fechar arquitetura automaticamente nem para transformar a skill em planner ou coder
- registrar, quando aplicável, uma matriz factual curta por item em `readiness_report.md` com item, evidência observada, direção preliminar, confiança e lacuna restante
- manter a classificação preliminar genérica e não prescritiva, por exemplo `local_optimization_candidate`, `structural_support_candidate` e `inconclusive`
- manter `open_questions.md` apenas quando houver rastreabilidade a preservar que realmente justifique o arquivo separado
- manter qualquer handoff apenas como `Optional Manual Handoff Prompt`, nunca como roteamento automático
- evitar overlap com `planner`, `orchestrator`, `phase_closure`, `finalizer`, `validation-runner` ou bootstrap de `docs/**`

## Bundle de templates
Canônico obrigatório:
- `feature_spec.md`

Auxiliares transitórios:
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
`feature_spec.md` é o único arquivo canônico obrigatório da SPEC final. Em `MODE=CLOSE`, a skill deve compactar a SPEC fechada para que a leitura futura comece e termine nele. `readiness_report.md`, `open_questions.md`, `assumptions.md`, `decision_log.md` e `session_summary.md` são transitórios por default e só permanecem após fechamento quando ainda preservarem valor residual único que não faça sentido duplicar.
