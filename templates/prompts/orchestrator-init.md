Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Modo:
- MODE=standard
- FLOW=supervised
- RUN=execute/plan

Objetivo:
- iniciar ou retomar a execução da SPEC consolidada pelo fluxo Sentinel.
- preservar os gates canônicos antes de execução: `EXECUTION BRIEF`, `VALIDATION PACK`, `EXECUTION PACKAGE`, aprovação de execução quando aplicável, execução por coder, validação, review quando aplicável e fechamento pelo `finalizer`.
- não pular gate, não inferir requisito/contrato/schema/auth/arquitetura/regra de negócio e pedir somente a informação mínima quando houver blocker real.
