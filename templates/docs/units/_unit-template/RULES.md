SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# Unit Rules

## Objetivo
Registrar limites, invariantes e restrições locais da unit sem contrariar `docs/core/RULES.md`.

## Regras invioláveis locais
- `<regra local 1>`
- `<regra local 2>`

## Limites de mudança
- `<mudança segura nesta unit>`
- `<mudança que exige decisão explícita>`

## Boundaries locais
- `<o que pertence claramente à unit>`
- `<o que deve ficar fora da unit>`

## Mudança estrutural local relevante
- mudança estrutural, normativa, arquitetural ou de contrato local relevante exige tratamento explícito
- não normalizar breaking change silenciosa

## Artefato efêmero vs memória durável
- `EXECUTION BRIEF` e `VALIDATION PACK` são efêmeros
- memória durável local vive em `Feature CONTEXT`, `DONE` e docs factuais atualizadas quando houver `Resync`
- não usar artefato efêmero como fonte de verdade durável da unit

## Stop rules locais
- `<stop rule local 1>`
- `<stop rule local 2>`

## Referências
- `docs/core/RULES.md`
- `docs/core/CONTRACTS.md`
- `docs/units/<unit-slug>/CONTEXT.md`
- `docs/units/<unit-slug>/CONTRACTS.md` quando existir
