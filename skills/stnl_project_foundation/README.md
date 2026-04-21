# stnl_project_foundation

Skill utilitaria global para estruturar a fundacao documental Sentinel de projetos greenfield, inception ou repos novos a partir de documentacao bruta, decisoes explicitas e contratos declarados.

O contrato operacional vive em `SKILL.md`. Este README existe so para manutencao do repo.

## Notas para mantenedores
- manter `SKILL.md` repo-agnostic e centrado em capacidade
- manter a skill separada de discovery factual forte de codebase; isso pertence a `stnl_project_context`
- manter `features` como eixo principal em greenfield
- manter `units` como suporte estrutural condicional, apenas quando houver arquitetura declarada clara e estavel
- manter a taxonomia de confianca visivel: decisao explicita, contrato canonico, direcao declarada, hipotese de trabalho, observado no repo e TBD/conflito
- manter `docs/TBDS.md` como consolidado de lacunas e conflitos relevantes, sem virar backlog generico
- manter `MODE=HANDOFF` como fronteira explicita de transicao para `stnl_project_context`
- nao permitir que a skill materialize agents, conduza workflow, amadureca SPEC ou planeje execucao
- ao tocar outputs, manter compatibilidade com `stnl_project_agent_specializer` via `docs/INDEX.md`, `docs/TBDS.md`, `docs/core/*`, `docs/features/*` e `docs/units/*` quando existirem
- evitar que este README ou detalhes internos do repo virem parte do contrato final da skill

## Relacao com o kit documental do repo
Esta skill usa o kit documental Sentinel como shape de materializacao, mas adapta a semantica para greenfield: documentos precisam separar claramente `declarado` de `observado`.

## Modos oficiais
- `FOUNDATION`: bootstrap inicial de projeto novo a partir de documentacao
- `REFINE`: refino incremental apos chegada de novas docs, decisoes ou conflitos
- `HANDOFF`: preparacao da transicao para `stnl_project_context`
