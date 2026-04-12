# Sentinel Protocol

Nova fase em construção.

## Estado do repositório
Este repositório entrou em uma nova fase focada em:
- geração de agents custom por projeto
- estruturação de templates e overlays
- rastreabilidade arquitetural da evolução

## Legado
A implementação anterior do Sentinel foi preservada em `LEGACY/`.

## Foco atual
O foco atual não é evoluir o pipeline legado.
O foco é construir a base do novo ecossistema.

## Smoke do Sentinel
Use `node sentinel.mjs smoke` como caminho canônico de self-validation estrutural do Sentinel.

Ele cobre hoje:
- manifests canônicos de install e bundle das skills materializadas
- presença obrigatória dos artifacts endurecidos do protocolo atual
- cobertura dos roots sensíveis para evitar agent/doc canônico fora do bundle por acidente
- ciclo isolado de `init`, `update` e `doctor` em `HOME` temporário
- consistência mínima entre source of truth do repo e artifacts materializados

Ele ainda não cobre:
- e2e completo das skills em repositórios reais
- semântica profunda dos templates ou qualidade de conteúdo além do wiring estrutural
- integrações externas ou variações de ambiente fora do smoke local reproduzível

Para manter:
- rode `node sentinel.mjs smoke` antes de fechar mudanças em `sentinel.mjs`, templates cobertos ou wiring das skills
- estenda [`scripts/sentinel-smoke.mjs`](../sentinel-protocol/scripts/sentinel-smoke.mjs) com checks estruturais novos só quando houver novo source of truth ou novo root realmente possuído pelo bundle
- evite asserts cosméticos ou snapshots grandes; priorize presença, cobertura de manifest e coerência materializada
