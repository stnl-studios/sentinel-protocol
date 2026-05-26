# Fluxo de comunicação entre agentes

![Sentinel agent communication flow](../../assets/agent-communication-flow.png)

Este diagrama é uma visão macro. O contrato textual versionado em templates, skills e docs de workflow é a fonte da verdade.

Este diagrama mostra os ciclos de comunicação possíveis entre agentes Sentinel, com `orchestrator` como único dono lógico do roteamento.

## Leitura rápida

- `orchestrator` é o único roteador Sentinel.
- Para targets Codex, o roteamento é mediado pela sessão parent: `orchestrator` retorna um `ROUTE_PACKET` compacto, e a sessão parent/root cria o subagent nativo exato somente após autorização explícita.
- O roteamento Codex deve manter max depth controlado e não deve emular handoff por prompt replay, shell, `codex exec` ou absorção local de papel.
- O consumo da SPEC ativa começa por `spec_slices.md`; Planning Interface é documentação opcional/condicional para planejamento posterior e não autoriza execução.
- `planner`, `validation-eval-designer` e `execution-package-designer` formam o ciclo de planejamento/preparação.
- `EXECUTION BRIEF`, `VALIDATION PACK` e `EXECUTION PACKAGE` são handoffs efêmeros de rodada: não exigem arquivos, não são materializados por esses agentes, e só valem quando recebidos do owner correto na rodada atual ou reenviados pelo `orchestrator`.
- No fluxo feliz, readiness desses preparadores continua sendo `STATUS: READY` com o handoff correspondente; `HANDOFF_READY`, se aparecer, é só metadado/substatus operacional e não substitui `READY`.
- Se um handoff efêmero faltar ou for inválido, o consumidor devolve `HANDOFF_MISSING`, `HANDOFF_INVALID`, `REQUEST_REPLAY_FROM_ORCHESTRATOR` ou `REQUEST_REGEN_FROM_OWNER`; ele não busca `workspaceStorage`, `chat-session-resources` ou `content.txt`.
- `coders` executam work packages autorizados e retornam `READY` ou `BLOCKED`.
- `validation-runner` valida a prova definida no `VALIDATION PACK`.
- `reviewer` entra quando aplicável e retorna `PASS` ou `FAIL`.
- `finalizer` sempre fecha rodadas terminais.
- `resync` só entra quando há delta factual fora da feature.
