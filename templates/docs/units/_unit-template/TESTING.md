SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# Unit Testing

## Objetivo
Registrar como validar esta unit em modelo eval-first: que harness existe, quais checks determinísticos são possíveis, quando usar evals comportamentais, como a estratégia manual funciona e quando o fluxo precisa subir `NEEDS_DEV_DECISION_HARNESS`.

## Estado do harness local
| Superfície | Harness disponível | Forma principal de prova | Observação |
| --- | --- | --- | --- |
| `<superfície>` | `sim | não | parcial | TBD` | `check | eval | manual | misto` | `<obs>` |
| `<superfície>` | `sim | não | parcial | TBD` | `check | eval | manual | misto` | `<obs>` |

## Estratégia mínima por superfície
| Superfície | Checks determinísticos | Evals comportamentais | Estratégia manual | Múltiplos trials | Observação |
| --- | --- | --- | --- | --- | --- |
| `<superfície>` | `<checks>` | `<evals>` | `<fluxo manual ou n/a>` | `sim | não | TBD` | `<obs>` |

## Gate de harness
- se a rodada pedir automação ou prova reprodutível e a unit não tiver harness viável, sinalizar `NEEDS_DEV_DECISION_HARNESS`
- se a prova for apenas parcial, isso precisa aparecer cedo no `VALIDATION PACK`
- quando fizer sentido automatizar, mas a base ainda não existir, pode haver marco separado de implantação mínima da base de testes

## Base mínima quando faltar harness
- definir checks simples, smoke local ou roteiro manual verificável
- separar falha real de impossibilidade de prova
- não fingir cobertura que a unit não possui

## Evidência operacional
Registrar apenas comandos, pipelines, rotinas ou roteiros que existam por evidência.

### Checks determinísticos
- `<comando, script ou pipeline>`

### Evals comportamentais
- `<harness, rotina ou fluxo>`

### Manual
- `<roteiro manual mínimo>`

## Referências
- `docs/core/TESTING.md`
- `docs/units/<unit-slug>/STATE.md`
