# TBDs

## File Purpose Header
- purpose: Consolidado canônico de lacunas, conflitos e ambiguidades relevantes.
- read_when: Discovery, resync, handoff, especialização ou execução encontra dúvida arquitetural, contratual ou de boundary.
- do_not_use_for: Backlog genérico, plano de execução, comandos, work packages ou fechamento otimista.
- canonical_source_for: Status e descrição das lacunas relevantes do projeto.
- canonical_source_not_for: Regras ativas, contratos detalhados, estado factual completo ou validação.
- update_owner: `stnl_project_context` ou `stnl_project_foundation`, conforme estágio documental.
- downstream_consumers: `orchestrator`, `planner`, `reviewer`, `finalizer`, `resync`, `stnl_project_agent_specializer`.
- token_policy: Ler IDs/status e somente os itens relacionados ao bloqueio ou delta atual.
- related_files: `docs/INDEX.md`, `docs/core/*`, `docs/units/*`, `docs/features/*`, `docs/decisions/*`.

## Objetivo
Consolidar as lacunas relevantes do projeto em um ponto canônico de consulta, sem transformar `RULES.md` ou `INDEX.md` em backlog de pendências.

## Como usar
- docs locais podem continuar registrando `TBDs`, mas `docs/TBDS.md` é o consolidado canônico
- registrar aqui lacunas que bloqueiam ou distorcem decisão arquitetural, contratual, de boundary ou compatibilidade
- não exigir leitura deste arquivo em toda demanda normal; ele serve principalmente para discovery, bootstrap, resync e ambiguidades relevantes

## Itens

### TBD-001 - <título curto e acionável>
- `ID`: `TBD-001`
- `Título`: `<título curto e acionável>`
- `Prioridade`: `<alta | média | baixa>`
- `Impacto`: `<arquitetura | contrato | boundary | compatibilidade | operação>`
- `Origem`: `<doc, path, decisão ou trecho da codebase que abriu a lacuna>`
- `Descrição`: `<explicar a lacuna e por que ela importa>`
- `Próxima ação sugerida`: `<decisão, investigação ou alinhamento que destrava a lacuna>`
- `Status`: `open`

### TBD-002 - <título curto e acionável>
- `ID`: `TBD-002`
- `Título`: `<título curto e acionável>`
- `Prioridade`: `<alta | média | baixa>`
- `Impacto`: `<arquitetura | contrato | boundary | compatibilidade | operação>`
- `Origem`: `<doc, path, decisão ou trecho da codebase que abriu a lacuna>`
- `Descrição`: `<explicar a lacuna e por que ela importa>`
- `Próxima ação sugerida`: `<decisão, investigação ou alinhamento que destrava a lacuna>`
- `Status`: `investigating`

## Status válidos
- `open`
- `investigating`
- `resolved`
