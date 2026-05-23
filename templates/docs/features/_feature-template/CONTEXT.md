# Feature CONTEXT

## File Purpose Header
- purpose: Snapshot operacional e durável de uma feature ativa.
- read_when: Um agente trabalha no recorte da feature, precisa entender foco atual, paths, dependências ou riscos imediatos.
- do_not_use_for: Regras globais, catálogo de contratos, política de testes, execução, comandos ou histórico completo.
- canonical_source_for: Estado atual da feature, escopo ativo, hot paths, dependências imediatas e lacunas locais.
- canonical_source_not_for: Regras estáveis, contratos detalhados, harness global, milestones `DONE` ou decisões transversais.
- update_owner: `stnl_project_context`; em greenfield, `stnl_project_foundation` até handoff.
- downstream_consumers: `orchestrator`, `planner`, `execution-package-designer`, coders, `reviewer`, `finalizer`, `resync`.
- token_policy: Ler snapshot e seções do cut; buscar detalhes estáveis em `core`, `units`, `DONE` ou paths fonte.
- related_files: `docs/core/*`, `docs/units/*`, `docs/features/<feature-path>/done/*`, `docs/TBDS.md`.

## Snapshot da feature
- LATEST MILESTONE NOTE: `./done/DONE-YYYYMMDD-<entrega-real>.md` | `TBD`
- CURRENT STATUS: `active | in-progress | paused | TBD`
- CURRENT FOCUS: `<frase-curta-ou-TBD>`
- OPEN THREADS:
  - `<item-curto-ou-TBD>`
- NEXT CHECKPOINT: `<frase-curta-ou-TBD>`

SCOPE: feature
FEATURE: <feature-path>
STATUS: active | in-progress
LAST UPDATED: YYYYMMDD

## Objetivo
Mapa durável e operacional da feature. Este documento orienta estado atual, escopo ativo, paths principais, dependências imediatas e riscos sem virar log detalhado nem absorver conteúdo que pertence a `RULES`, `STATE`, `CONTRACTS` ou `TESTING`.

## Estado atual
- Resumo factual do foco atual da feature.
- Escopo ativo do momento.
- Dependências locais ou fronteiras que realmente importam agora.

## Escopo ativo e fora de escopo imediato
- `<escopo ativo ou entrega em andamento>`
- `<fora de escopo imediato ou limite importante>`

## Paths principais e hot paths
- `<path, rota, tela, endpoint, worker ou arquivo central>`
- `<path, rota, tela, endpoint, worker ou arquivo central>`

## Dependências imediatas e referências úteis
- `docs/core/CONTRACTS.md` ou `docs/units/<unit-slug>/CONTRACTS.md`, quando a feature depender de contrato estável
- `docs/core/TESTING.md` ou `docs/units/<unit-slug>/TESTING.md`, quando a estratégia de validação precisar ser consultada
- `<path real do repo, doc local, integração ou boundary que sustenta o entendimento atual da feature>`

## Riscos, TBDs e limites de exaustividade
- Risco, pendência factual, limite de leitura ou `TBD` ainda aberto na feature.

## Regras de uso
- manter o snapshot curto, estável e útil para entendimento rápido da feature
- não usar `SCOPE: subfeature`
- a hierarquia fica no path de `FEATURE`, não no valor de `SCOPE`
- não duplicar histórico detalhado do `DONE`
- não transformar este contexto em catálogo de contratos, mapa estrutural completo ou política de testes
- não abrir seções próprias para testes detalhados, mini `CONTRACTS`, dump de entidades ou inventário estrutural amplo
- quando precisar desses detalhes, apontar `docs/core/CONTRACTS.md`, `docs/core/TESTING.md`, `docs/units/*` ou paths reais em vez de copiar volume
- quando faltar fato relevante, usar `TBD` ou marcar parcialidade em vez de inferir
- usar `principais pontos observados` quando a feature tiver amostragem forte sem inventário total
- atualizar este contexto quando o estado da feature mudar ou quando um novo `DONE` relevante existir
