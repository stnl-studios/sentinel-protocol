# Feature CONTEXT

SCOPE: feature
FEATURE: <feature-path>
STATUS: active | in-progress
LAST UPDATED: YYYYMMDD

## Objetivo
Mapa curto e durável da feature. Este documento orienta o estado atual, os marcos já entregues e os riscos locais sem virar log detalhado.

## Estado atual
- Resumo curto do foco atual da feature.
- Escopo ativo do momento.

## DONEs relevantes
- `YYYYMMDD` - [`DONE-YYYYMMDD-<entrega-real>.md`](./done/DONE-YYYYMMDD-<entrega-real>.md) - marco entregue relacionado ao estado atual.

## Riscos / TBDs locais
- Risco, pendência factual ou `TBD` ainda aberto na feature.

## Referências úteis da unidade
- Link para docs da unit, contratos, regras ou referência factual que sustentam a feature.

## Histórico de marcos
- `YYYYMMDD` - entrega consolidada resumida em uma linha. Ver [`DONE-YYYYMMDD-<entrega-real>.md`](./done/DONE-YYYYMMDD-<entrega-real>.md).

## Regras de uso
- Não usar `SCOPE: subfeature`.
- A hierarquia fica no path de `FEATURE`, não no valor de `SCOPE`.
- Não duplicar histórico detalhado do `DONE`.
- Atualizar este contexto quando o estado da feature mudar ou quando um novo `DONE` relevante existir.
