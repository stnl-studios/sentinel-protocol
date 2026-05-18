Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Slice ID canônico:
- <SL-00X>

Modo:
- MODE=standard
- FLOW=supervised
- RUN=execute

Objetivo:
- iniciar ou retomar exclusivamente esta slice conforme o estado real atual.
- preservar o ID canônico da slice em todo handoff.
- executar a slice pelo fluxo Sentinel: `EXECUTION BRIEF`, `VALIDATION PACK`, `EXECUTION PACKAGE`, execução por coder, validação, review quando aplicável e fechamento pelo `finalizer`.
- não declarar a slice como concluída, parcial ou bloqueada sem passagem terminal pelo `finalizer`.
- se faltar informação bloqueante para executar esta slice sem inventar requisito, contrato, schema, auth, arquitetura ou regra de negócio, pare no gate canônico apropriado e peça somente a informação mínima necessária.
