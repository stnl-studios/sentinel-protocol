Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Modo:
- MODE=standard
- FLOW=supervised
- RUN=execute

Objetivo:
- retomar a execução a partir da próxima slice elegível com ID canônico `SL-001`, `SL-002`, `SL-003`, etc.
- usar o último fechamento do `finalizer` e `spec_slices.md` como mapa canônico de dependências/readiness para próxima slice elegível.
- se o fechamento anterior não passou pelo `finalizer`, rotear primeiro para o `finalizer`; não escolher próxima slice a partir de estado implícito.
- preservar o fluxo Sentinel completo para a próxima slice: `EXECUTION BRIEF`, `VALIDATION PACK`, `EXECUTION PACKAGE`, execução por coder, validação, review quando aplicável e fechamento pelo `finalizer`.
- não escolher próxima slice por inferência se `spec_slices.md` estiver inconsistente.
- não inferir próxima slice quando houver conflito, blocker, dependência pendente ou estado insuficiente.
