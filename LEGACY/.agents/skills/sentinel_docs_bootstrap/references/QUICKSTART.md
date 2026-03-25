Use esta skill quando o projeto já existe e está sem documentação base em `README.md` e `docs/`.
A operação é `create only`: sempre verificar existência antes de criar e marcar `SKIPPED` quando já existir.
Faça discovery do repositório antes de perguntar qualquer coisa ao usuário.
Cite evidências reais (paths) para cada conclusão de stack, estrutura e convenções.
Limite a entrevista guiada a no máximo 2 rodadas por documento.
Descubra ou confirme `Tipo: APP | FE | BE | FS | TBD` no `docs/core/CONTEXT.md`.
Se não der para inferir o tipo e o usuário não souber, crie `CONTEXT` com `Tipo: TBD`, crie `docs/INDEX.md` e pare.
Centralize todas as lacunas em `TBD-XXX` dentro de `docs/core/CONTEXT.md`.
Não espalhe `TODO` em nenhum arquivo gerado; use apenas o fluxo de TBD canônico.
Não criar, editar, mover ou renomear `PLAN.md`/`plan.md`.
Os templates vivem só em `references/templates` dentro da skill.
O projeto alvo deve receber apenas documentos finais prontos, nunca cópia de templates.
`docs/reference/DESIGN_SYSTEM.md` só entra por evidência clara ou pedido explícito.
`docs/core/UI_KIT.md` só entra quando o tipo for `APP`, `FE` ou `FS`.
Sempre finalize com lista de criados, `SKIPPED`, TBD IDs e sugestão de próxima skill para `PLAN.md`.
