# stnl_project_context

Skill utilitária global para materializar ou ressincronizar o kit factual mínimo do projeto com `BOOTSTRAP`, `RESYNC` e `TBD_SYNC`.

O contrato operacional vive em `SKILL.md`. Este README existe só para manutenção do repo.

## Notas para mantenedores
- manter `SKILL.md` repo-agnostic e centrado em capacidade
- manter a fronteira com `stnl_project_foundation`: greenfield/inception com documentacao como fonte principal pertence a `stnl_project_foundation`; discovery factual de codebase existente pertence a `stnl_project_context`
- manter o kit documental mínimo alinhado ao contrato, incluindo `docs/INDEX.md` como navegação factual do kit base
- manter `docs/TBDS.md` como consolidado canônico sob ownership de `stnl_project_context`; não criar skill separada para TBDs
- ao tocar modos, exemplos ou output da skill, alinhar `SKILL.md` com o shape canônico de status em `templates/docs/TBDS.md`
- evitar que este README ou detalhes internos do repo virem parte do contrato final da skill

## Relação com o kit documental do repo
Este repo mantém o kit documental canônico usado pela skill. Detalhes internos de organização devem permanecer fora do contrato operacional.

## Modos oficiais
- `BOOTSTRAP`: criação inicial create-only do kit documental ausente
- `RESYNC`: sincronização factual orientada por delta e feature alvo explícita
- `TBD_SYNC`: tratamento canônico e auditável de TBD já registrado em `docs/TBDS.md`
