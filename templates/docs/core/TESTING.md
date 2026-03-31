SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Testing

## 1. Objetivo
Descreva a estratégia global de validação do projeto.

## 2. Estratégia mínima
Registre apenas o que existe por evidência.

- Unit: `<sim | não | TBD>`
- Integration: `<sim | não | TBD>`
- E2E / Smoke: `<sim | não | TBD>`
- Manual: `<sim | não | TBD>`

## 3. Mapa de teste por unit
| Unit | Tipos de teste | Paths principais | Observação |
| --- | --- | --- | --- |
| `<unit-slug>` | `<unit | integration | e2e | manual | TBD>` | `<path>` | `<obs>` |

## 4. Como rodar
Registre apenas comandos, entrypoints ou fluxos validados por evidência.

### Local
- `<comando ou fluxo local>`

### CI
- `<pipeline, job ou observação>`

## 5. Mínimos por tipo de mudança
### Feature
- `<mínimo esperado>`

### Bugfix
- `<mínimo esperado>`

### Refactor
- `<mínimo esperado>`

## 6. Validação manual relevante
Usar apenas quando fizer parte da realidade do projeto.

- `<superfície manual 1>`
- `<smoke manual mínimo>`

## 7. Limitações conhecidas
- `<lacuna ou limitação real>`
- `<dependência externa relevante>`

## 8. Referências
- `docs/core/STATE.md`
- docs de unit aplicáveis
