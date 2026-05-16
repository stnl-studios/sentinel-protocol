Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Slice ID canônico:
- <SL-00X>

Objetivo:
- iniciar ou retomar exclusivamente este slice conforme o estado real atual.
- preservar o ID canônico da slice em todo handoff e finalizar a rodada pelo `finalizer` antes de declarar a slice como concluida, parcial ou bloqueada.
- se faltar informacao bloqueante para executar esta slice sem inventar requisito, pare no gate canonico apropriado e peça somente a informacao minima necessaria.
