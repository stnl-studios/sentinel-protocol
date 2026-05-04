# Prompt launchers

Esta pasta contém prompts lançadores curtos para uso humano no dia a dia do Sentinel Protocol.

Eles servem para copiar e colar no agente/skill correspondente, sem repetir contratos internos que já vivem nas `SKILL.md`, nos base agents e nos artifacts canônicos do protocolo.

## Regra de uso

- Use estes arquivos como interface humana de invocação.
- Preencha apenas placeholders como `<feature>`, `<feature-path>`, `<S-00X>` e blocos entre colchetes.
- Não duplique regras fixas da skill no prompt da rodada.
- Quando uma regra fixa precisar mudar, altere a skill/base agent correspondente, não este prompt launcher.
- Quando houver uma exceção real do projeto ou da rodada, registre em `Restrições excepcionais`.

## Natureza destes arquivos

Estes templates não são usados automaticamente pelo runtime do Sentinel.

Por enquanto, eles são uma biblioteca operacional de copy/paste para reduzir atrito, evitar prompts gigantes e diminuir drift entre uso diário e contrato real do protocolo.

## Templates disponíveis

- `context-bootstrap.md`
- `context-resync.md`
- `context-tbd-sync.md`
- `spec-new.md`
- `spec-resume.md`
- `spec-close.md`
- `foundation.md`
- `agents-vscode.md`
- `agents-codex.md`
- `agents-vscode-sql-procedure.md`
- `orchestrator-init.md`
- `orchestrator-next-slice.md`
- `orchestrator-slice.md`
