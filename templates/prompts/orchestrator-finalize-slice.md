Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Slice ID canônico:
- <SL-00X>

Objetivo:
- rotear a finalização desta slice pelo `finalizer`, preservando o verdict ou bloqueio real da rodada.
- preservar o ID canônico da slice no fechamento.
- exigir que o fechamento declare `slice_id`, status final da slice (`concluida`, `parcial` ou `bloqueada`), evidências usadas, pendências/blockers, necessidade de resync e próxima slice elegível quando aplicável.
- não substituir o `finalizer` por resumo manual do `orchestrator`.

Observação:
- launcher manual auxiliar; não substitui a regra automática de que toda rodada terminal passa pelo `finalizer`.
- fechamento pós-execução da slice pertence ao `finalizer`; `spec_slices.md` é mapa de consumo, não fonte de closure pós-execução.
- o `orchestrator` apenas roteia este fechamento; o `finalizer` é o owner canônico da declaração final da rodada de slice.
