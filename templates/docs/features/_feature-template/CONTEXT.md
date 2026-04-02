# Feature CONTEXT

## Snapshot de recycle
- LAST DONE: `./done/DONE-YYYYMMDD-<entrega-real>.md` | `TBD`
- LAST DECISION: `CLOSED | PARTIAL | BLOCKED | TBD`
- LAST MILESTONE: `<frase-curta-ou-TBD>`
- OPEN THREADS:
  - `<item-curto-ou-TBD>`
- NEXT RECYCLE BASIS: `<frase-curta-ou-TBD>`

SCOPE: feature
FEATURE: <feature-path>
STATUS: active | in-progress
LAST UPDATED: YYYYMMDD

## Objetivo
Mapa durável e operacional da feature. Este documento orienta estado atual, paths principais, contratos locais, testes relevantes e riscos sem virar log detalhado, mini-`PLAN.md` ou mini-`DONE`.

## Estado atual
- Resumo factual do foco atual da feature.
- Escopo ativo do momento.
- Dependências locais ou fronteiras que realmente importam agora.

## Paths principais e entrypoints locais
- `<path, rota, tela, endpoint, worker ou arquivo central>`
- `<path, rota, tela, endpoint, worker ou arquivo central>`

## Contratos e dependências locais
- `<schema, interface, boundary, serviço ou integração relevante>`
- `<schema, interface, boundary, serviço ou integração relevante>`

## Hot paths / onde mexer primeiro
- `<arquivo, pasta ou fluxo que concentra mudança útil>`
- `<arquivo, pasta ou fluxo que concentra mudança útil>`

## Testes principais / prova local
- `<suite, comando, roteiro manual ou limite de harness>`
- `<suite, comando, roteiro manual ou limite de harness>`

## DONEs relevantes
- `YYYYMMDD` - [`DONE-YYYYMMDD-<entrega-real>.md`](./done/DONE-YYYYMMDD-<entrega-real>.md) - marco entregue relacionado ao estado atual.

## Riscos, TBDs e limites de exaustividade
- Risco, pendência factual, limite de leitura ou `TBD` ainda aberto na feature.

## Referências úteis da unidade
- Link para docs da unit, contratos, regras ou referência factual que sustentam a feature.

## Histórico de marcos
- `YYYYMMDD` - entrega consolidada resumida em uma linha. Ver [`DONE-YYYYMMDD-<entrega-real>.md`](./done/DONE-YYYYMMDD-<entrega-real>.md).

## Regras de uso
- manter o snapshot curto, estável e útil para recycle
- não usar `SCOPE: subfeature`
- a hierarquia fica no path de `FEATURE`, não no valor de `SCOPE`
- não duplicar histórico detalhado do `DONE`
- quando faltar fato relevante, usar `TBD` ou marcar parcialidade em vez de inferir
- usar `principais pontos observados` quando a feature tiver amostragem forte sem inventário total
- atualizar este contexto quando o estado da feature mudar ou quando um novo `DONE` relevante existir
