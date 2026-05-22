Use `stnl_spec_manager`.
MODE=CLOSE

SPEC alvo:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Evidências disponíveis para fechamento:
- [validação automatizada]
- [teste manual]
- [checklist factual]
- [limites conhecidos]

Contrato de fechamento:
- Se fechar como `closed` ou `closed_with_residuals`, compacte o conteúdo durável necessário no `feature_spec.md` e limpe a pasta da SPEC para ficar somente com `feature_spec.md`, ignorando apenas `__MACOSX` e `.DS_Store`.
- Consolide evidências por categoria compacta; não registre comandos detalhados, logs, contagens de suíte ou checklist técnico granular no `feature_spec.md` fechado.
- `closed_with_residuals` registra limites conhecidos dentro do `feature_spec.md`; não preserva auxiliares, checklist, readiness report, session summary ou histórico técnico.
- Se algum auxiliar ainda for necessário para entender a SPEC, retorne `not_closed`.
- Se alguma restrição pedir preservação de auxiliares ou histórico técnico, bloqueie com `BLOCKED_CLOSE_CONTRACT_OVERRIDE`.

Restrições excepcionais:
- [somente se houver]
