Use `stnl_spec_manager`.
MODE=PLANNING_INTERFACE

SPEC alvo obrigatório e explícito:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Objetivo desta rodada:
- enriquecer a Planning Interface da SPEC ativa para consumo posterior pelo planner.
- atualizar principalmente `spec_slices.md`.

Contexto novo para a interface:
- decisões recentes: [...]
- blockers conhecidos: [...]
- inputs confirmados ainda necessários para planejamento preciso: [...]
- foco esperado de planejamento, sem sequência técnica: [...]
- superfícies prováveis como hints semânticos, sem paths finais ou owned paths: [...]
- foco de validação esperado, sem comandos ou validation pack final: [...]
- constraints anti-drift que o planner não pode violar: [...]
- notas curtas para o planner, sem escolher agente ou chamar orchestrator: [...]

Restrições:
- não gerar execution plan.
- não criar work packages.
- não definir owned paths finais.
- não definir comandos finais.
- não criar validation pack final.

Restrições excepcionais:
- [somente se houver]
