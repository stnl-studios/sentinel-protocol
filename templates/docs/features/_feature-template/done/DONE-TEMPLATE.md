# DONE Template

## File Purpose Header
- purpose: Template de marco durável verificável de uma feature.
- read_when: `finalizer` ou `resync` precisam registrar ou consultar uma entrega real já comprovada.
- do_not_use_for: Tentativa sem entrega, plano futuro, execução, comandos, work packages ou substituto de `Feature CONTEXT`.
- canonical_source_for: Shape de memória durável de marcos `DONE` da feature.
- canonical_source_not_for: Estado atual da feature, backlog, validação detalhada ou contrato técnico.
- update_owner: `finalizer` cria marcos; `resync` sincroniza impactos factuais quando necessário.
- downstream_consumers: `finalizer`, `resync`, `planner`, `reviewer`, agents especializados.
- token_policy: Ler objetivo, status, evidência e limites; não usar como log detalhado.
- related_files: `docs/features/<feature-path>/CONTEXT.md`, `docs/TBDS.md`, `docs/core/*`.

## Objetivo
Registrar um marco verificável da feature. `DONE` é memória durável e só deve existir quando houver uma entrega real que valha ser preservada.

## Convenção de arquivo
- Nome real futuro: `DONE-YYYYMMDD-<entrega-real>.md`
- O slug deve representar a entrega real, nunca referência operacional interna.

## Template
```md
# DONE - <entrega consolidada>

FEATURE: <feature-path>
ENTREGA CONSOLIDADA: <entrega-real>
STATUS DO MARCO: confirmado | parcial
DATA: YYYYMMDD

## Objetivo da entrega
- O que esta entrega alterou de forma concreta.

## Status do marco
- Registrar se o marco está confirmado ou parcial, com uma frase objetiva de justificativa.

## Evidência principal
- Artefato, diff, validação ou referência factual que comprova o marco.

## Validação principal
- Check, evidência ou roteiro principal que sustenta o marco.

## Limites conhecidos
- Limite conhecido, desvio assumido ou pendência remanescente.

## Referências atualizadas
- Docs duráveis atualizadas, criadas ou confirmadas.

## Próximo passo lógico
- Próximo passo natural após este marco, sem transformar o `DONE` em plano detalhado.
```

## Regras de uso
- Criar `DONE` apenas quando houver marco real.
- `DONE` normalmente deve registrar marco confirmado; status parcial só cabe quando a entrega principal estiver comprovada e a pendência remanescente for claramente secundária.
- Não criar `DONE` para tentativa sem entrega verificável.
- Manter o texto curto, verificável e durável.
- `DONE` não substitui `Feature CONTEXT`.
