# Changelog

## v2026.5.0-alpha.2

Correção de contrato Codex na linha Alpha Preview.

### Corrigido

- Corrigido o contrato de materialização Codex para exigir handoff via native custom subagent spawning, bloquear emulação com `codex exec`/shell e gerar configuração `.codex/config.toml` com profundidade controlada.

## v2026.5.0-alpha.1

Release de capacidade da linha Alpha Preview.

### Adicionado

- Quality guardrails por stack como capacidades oficiais do fluxo Sentinel.
- Propagação operacional das guardrails entre planejamento, package design, execução, validação, review e fechamento quando aplicável.

### Alterado

- Refatorada a semântica operacional dos agents base.
- Melhorada a portabilidade, autoridade e clareza operacional das skills.
- Reforçado o fluxo com `execution-package-designer`, gates de validação, finalização e correção.
- Atualizadas documentações canônicas para refletir o comportamento atual do workflow.

### Corrigido

- Reduzido drift documental introduzido por mudanças recentes em agents, skills e quality guardrails.
- Alinhada a classificação do `designer` como `design-contributor`, não como executor.

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
