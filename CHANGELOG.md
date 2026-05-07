# Changelog

## v2026.4.1-alpha.1

Correcao de contrato/guarda da especializacao de agents.

### Inclui

- bloqueio explicito a storage persistente externo em agents gerenciados
- proibicao de referencias legadas a memoria factual externa, paths persistentes por repo e termos equivalentes
- normalizacao de vocabulario para documentacao canonica em `docs/**`
- reforco no smoke para impedir regressao em templates, reference agents e agents materializados
- ajuste dos base agents `finalizer` e `resync` para usar durable documentation, Feature CONTEXT e shared canonical docs

### Observacoes

- nao altera o fluxo canonico dos agents
- nao adiciona novo agent
- nao muda o contrato de execucao
- apenas reforca que o Sentinel usa `docs/**` como source of truth persistente

## v2026.4.0-alpha.1

- Primeira Alpha Preview externa/controlada da arquitetura atual do Sentinel Protocol.
- Marca `v2026.3.0-alpha.2` como linha experimental interna, usada apenas pelo mantenedor e agora descontinuada.
- Documenta as skills principais: `stnl_project_context`, `stnl_project_foundation`, `stnl_spec_manager` e `stnl_project_agent_specializer`.
- Documenta os templates de prompts em `templates/prompts/`.
- Inclui agents base para materialização.
- Suporta targets de materialização `vscode` e `codex`.
- Mantém validação estrutural de smoke via `node sentinel.mjs smoke`.
