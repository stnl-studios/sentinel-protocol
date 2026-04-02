SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# Unit Testing

## Objetivo
Registrar como validar esta unit em modelo eval-first: que harness existe, quais checks determinísticos são possíveis, quando usar evals comportamentais, como a estratégia manual funciona e quais limitações impedem prova reprodutível.

## Estado do harness local
| Superfície | Harness disponível | Forma principal de prova | Observação |
| --- | --- | --- | --- |
| `<superfície>` | `sim | não | parcial | TBD` | `check | eval | manual | misto` | `<obs>` |
| `<superfície>` | `sim | não | parcial | TBD` | `check | eval | manual | misto` | `<obs>` |

## Estratégia mínima por superfície
| Superfície | Checks determinísticos | Evals comportamentais | Estratégia manual | Múltiplos trials | Observação |
| --- | --- | --- | --- | --- | --- |
| `<superfície>` | `<checks>` | `<evals>` | `<fluxo manual ou n/a>` | `sim | não | TBD` | `<obs>` |

## Quando faltar harness
- se a unit pedir automação ou prova reprodutível e não houver harness viável, registrar a limitação e o impacto no recorte local
- se a prova for apenas parcial, isso precisa aparecer cedo na evidência operacional e nas lacunas da unit
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

## Lacunas e limites de prova
- `<lacuna local de harness, cobertura ou repetibilidade>`

## Referências
- `docs/core/TESTING.md`
- `docs/units/<unit-slug>/STATE.md`
