SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Testing

## Objetivo
Registrar a estratégia global de validação em modelo eval-first com base em evidência operacional: o que pode ser provado com checks determinísticos, o que precisa de evals comportamentais, onde existe harness e quais limitações impedem prova reprodutível.

## Princípios do projeto
- nem toda validação será automação clássica
- partes determinísticas pedem checks determinísticos
- partes com IA, comportamento emergente ou forte dependência contextual podem exigir evals comportamentais
- estratégia manual bem definida continua válida quando for a melhor forma honesta de prova
- ausência de harness viável precisa aparecer cedo na documentação de testes

## Estado do harness
| Superfície | Harness disponível | Path principal | Forma de prova principal | Observação |
| --- | --- | --- | --- | --- |
| `<superfície>` | `sim | não | parcial | TBD` | `<path>` | `check | eval | manual | misto` | `<obs>` |
| `<superfície>` | `sim | não | parcial | TBD` | `<path>` | `check | eval | manual | misto` | `<obs>` |

## Estratégia principal por superfície
| Superfície | Checks determinísticos | Evals comportamentais | Estratégia manual | Múltiplos trials | Observação |
| --- | --- | --- | --- | --- | --- |
| `<superfície>` | `<quais checks>` | `<quais evals>` | `<fluxo manual ou n/a>` | `sim | não | TBD` | `<obs>` |

## Quando faltar harness
- se a superfície pedir automação ou prova reprodutível e não houver harness viável, registrar a limitação e o impacto prático
- se existir apenas prova parcial, explicitar a limitação na evidência operacional e nas lacunas de prova
- quando fizer sentido automatizar mas a base ainda não existir, isso pode virar marco separado de implantação inicial da base de testes

## Base de prova quando faltar harness
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
- `<roteiro manual verificável>`

## Lacunas e limites de prova
- `<lacuna real de harness, cobertura ou repetibilidade>`

## Referências
- `docs/INDEX.md`
- `docs/core/STATE.md`
- docs de unit aplicáveis
- docs operacionais complementares do projeto, se existirem
