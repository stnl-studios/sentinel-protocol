Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/

Slice:
- S-00X

Objetivo:
- rotear a finalizacao desta slice pelo `finalizer`, preservando o verdict ou bloqueio real da rodada.

Observacao:
- launcher manual auxiliar; nao substitui a regra automatica de que toda rodada terminal passa pelo `finalizer`.
