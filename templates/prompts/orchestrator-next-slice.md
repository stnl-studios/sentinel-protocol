Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Objetivo:
- retomar a execução a partir do próximo slice elegível com ID canônico `SL-001`, `SL-002`, `SL-003`, etc.
- usar o ultimo fechamento do `finalizer` como fonte para slice trabalhada, status final, evidencias, pendencias/blockers, necessidade de resync e proxima slice elegivel quando houver.
- se o fechamento anterior nao passou pelo `finalizer`, rotear primeiro para o `finalizer`; nao escolher proxima slice a partir de estado implicito.
