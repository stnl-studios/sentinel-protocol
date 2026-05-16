Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Slice ID canônico:
- <SL-00X>

Objetivo:
- rotear a finalizacao desta slice pelo `finalizer`, preservando o verdict ou bloqueio real da rodada.
- exigir que o fechamento declare `slice_id`, status final da slice (`concluida`, `parcial` ou `bloqueada`), evidencias usadas, pendencias/blockers, necessidade de resync e proxima slice elegivel quando aplicavel.

Observacao:
- launcher manual auxiliar; nao substitui a regra automatica de que toda rodada terminal passa pelo `finalizer`.
- o `orchestrator` apenas roteia este fechamento; o `finalizer` e o owner canonico da declaracao final da rodada de slice.
