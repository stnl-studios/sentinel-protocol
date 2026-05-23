# Prompt launchers

Esta pasta contém prompts lançadores curtos para uso humano no dia a dia do Sentinel Protocol.

Eles servem para copiar e colar no agente/skill correspondente, sem repetir contratos internos que já vivem nas `SKILL.md`, nos base agents e nos artifacts canônicos do protocolo.

## Regra de uso

- Use estes arquivos como interface humana de invocação.
- Preencha apenas placeholders como `<feature>`, `<feature-path>`, `<SL-00X>` e blocos entre colchetes.
- Para slices, substitua `<SL-00X>` por um ID canônico existente como `SL-001`; não use labels como `S-001`, `Slice 1`, `SLICE - 001`, `S1` ou `slice-1`.
- Não duplique regras fixas da skill no prompt da rodada.
- Quando uma regra fixa precisar mudar, altere a skill/base agent correspondente, não este prompt launcher.
- Quando houver uma exceção real do projeto ou da rodada, registre em `Restrições excepcionais`.

## SPEC ativa

- SPEC ativa agora inclui `spec_slices.md` e ao menos `SL-001`.
- Launchers continuam finos; a regra completa vive na skill, agentes, templates e validações.
- Quando houver `File Purpose Header`, agentes devem usá-lo como roteador de leitura, mas o launcher não precisa repetir headers.

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
- `orchestrator-auto-spec.md`
- `orchestrator-finalize-slice.md`
- `orchestrator-next-slice.md`
- `orchestrator-slice.md`
