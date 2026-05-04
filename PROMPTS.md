# Mapa de prompts

Use este arquivo para escolher o launcher correto do Sentinel. Os templates concretos vivem em [`templates/prompts/`](templates/prompts/); não duplique esses templates na documentação do projeto, a menos que precise de um wrapper específico.

## Escolha o caminho

| Necessidade | Use | Template |
| --- | --- | --- |
| Fazer bootstrap de contexto em repo existente | `stnl_project_context` | `context-bootstrap.md` |
| Ressincronizar contexto existente | `stnl_project_context` | `context-resync.md` |
| Sincronizar TBDs | `stnl_project_context` | `context-tbd-sync.md` |
| Iniciar fundação de projeto novo ou greenfield | `stnl_project_foundation` | `foundation.md` |
| Gerar agents para VS Code | `stnl_project_agent_specializer` | `agents-vscode.md` |
| Gerar agents para Codex | `stnl_project_agent_specializer` | `agents-codex.md` |
| Gerar agents de procedure SQL para VS Code | `stnl_project_agent_specializer` | `agents-vscode-sql-procedure.md` |
| Criar uma SPEC | `stnl_spec_manager` | `spec-new.md` |
| Retomar uma SPEC | `stnl_spec_manager` | `spec-resume.md` |
| Fechar uma SPEC | `stnl_spec_manager` | `spec-close.md` |
| Iniciar execução de SPEC | `orchestrator` | `orchestrator-init.md` |
| Continuar para a próxima slice | `orchestrator` | `orchestrator-next-slice.md` |
| Executar uma slice | `orchestrator` | `orchestrator-slice.md` |

## Arquivos em templates/prompts/

Arquivos atuais:

- `README.md`
- `agents-codex.md`
- `agents-vscode-sql-procedure.md`
- `agents-vscode.md`
- `context-bootstrap.md`
- `context-resync.md`
- `context-tbd-sync.md`
- `foundation.md`
- `orchestrator-init.md`
- `orchestrator-next-slice.md`
- `orchestrator-slice.md`
- `spec-close.md`
- `spec-new.md`
- `spec-resume.md`

Estes arquivos são launchers humanos de copy/paste, não um runtime automático.
