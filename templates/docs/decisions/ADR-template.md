# ADR Template

## File Purpose Header
- purpose: Template para decisão durável arquitetural, contratual, normativa ou de boundary.
- read_when: Uma decisão transversal precisa ser registrada ou consultada como fonte estável.
- do_not_use_for: Backlog, plano de execução, changelog, tentativa operacional, comandos ou work packages.
- canonical_source_for: Shape de ADRs e decisões duráveis do projeto.
- canonical_source_not_for: Estado atual, regras completas, contratos implementados, evidência de validação ou `DONE`.
- update_owner: `stnl_project_foundation` ou owner documental autorizado pela decisão.
- downstream_consumers: `planner`, `reviewer`, `resync`, `stnl_project_agent_specializer`, agents especializados.
- token_policy: Ler decisão, status e impactos; abrir docs afetadas para regras ou contratos exatos.
- related_files: `docs/decisions/INDEX.md`, `docs/core/RULES.md`, `docs/core/CONTRACTS.md`, `docs/TBDS.md`.

## Objetivo
Usar este template apenas para mudanças estruturais, normativas, arquiteturais, de fronteira relevante ou de contrato externo relevante.

## Quando não usar
- Não usar para pendência trivial, nota temporária, backlog ou acompanhamento operacional.
- ADR não substitui `DONE`.
- ADR não substitui `Feature CONTEXT`.

## Template
```md
# ADR - <titulo>

DATA: YYYYMMDD
STATUS: proposed | accepted | superseded | deprecated

## Contexto
- Situação factual que exige decisão durável.

## Decisão
- Decisão tomada de forma objetiva.

## Impactos
- Efeitos concretos no sistema, no protocolo ou nas fronteiras afetadas.

## Evidências / referências
- Links, docs, validações ou fatos que sustentam a decisão.

## Trade-offs
- O que foi escolhido e o que foi conscientemente deixado de lado.

## Próximos efeitos / adoção
- Ajustes, adoção esperada ou pontos que precisam ser absorvidos pelo ecossistema.
```
