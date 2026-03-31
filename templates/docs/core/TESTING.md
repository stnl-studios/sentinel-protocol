SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Testing

## Objetivo
Registrar a estratégia global de validação em modelo eval-first: o que pode ser provado com checks determinísticos, o que precisa de evals comportamentais, onde existe harness e quando o fluxo deve parar em `NEEDS_DEV_DECISION_HARNESS`.

## Princípios do projeto
- nem toda validação será automação clássica
- partes determinísticas pedem checks determinísticos
- partes agentic, IA ou altamente comportamentais podem exigir evals comportamentais
- estratégia manual bem definida continua válida quando for a melhor forma honesta de prova
- ausência de harness viável precisa aparecer cedo no fluxo

## Estado do harness
| Superfície | Harness disponível | Forma de prova principal | Observação |
| --- | --- | --- | --- |
| `<superfície>` | `sim | não | parcial | TBD` | `check | eval | manual | misto` | `<obs>` |
| `<superfície>` | `sim | não | parcial | TBD` | `check | eval | manual | misto` | `<obs>` |

## Estratégia mínima por superfície
| Superfície | Checks determinísticos | Evals comportamentais | Estratégia manual | Múltiplos trials | Observação |
| --- | --- | --- | --- | --- | --- |
| `<superfície>` | `<quais checks>` | `<quais evals>` | `<fluxo manual ou n/a>` | `sim | não | TBD` | `<obs>` |

## Gate de harness
- se a rodada pedir automação ou prova reprodutível e não houver harness viável, sinalizar `NEEDS_DEV_DECISION_HARNESS`
- se existir apenas prova parcial, explicitar a limitação no `VALIDATION PACK`
- quando fizer sentido automatizar mas a base ainda não existir, isso pode virar marco separado de implantação mínima da base de testes

## Base mínima quando faltar harness
- definir ao menos checks simples, smoke manual ou roteiro verificável por evidência
- separar claramente falha real de impossibilidade de prova
- não fingir cobertura que o projeto não possui

## Evidência operacional
Registrar apenas comandos, pipelines, rotinas manuais ou entrypoints realmente existentes.

### Checks determinísticos
- `<comando, script ou pipeline>`

### Evals comportamentais
- `<harness, rotina ou fluxo>`

### Manual
- `<roteiro manual mínimo>`

## Referências
- `docs/workflow/STATUS-GATES.md`
- `docs/core/STATE.md`
- docs de unit aplicáveis
