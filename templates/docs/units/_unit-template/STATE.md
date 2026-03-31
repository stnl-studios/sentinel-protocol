SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# State

## 1. Snapshot da unit
- Path raiz: `<path>`
- Classe da unit: `app | api | mobile | worker | package | bff | admin | TBD`
- Stack principal observada: `<stack>`
- Status curto: `present | partial | TBD`

## 2. Estrutura local relevante
Liste apenas diretórios, módulos ou camadas úteis para localização rápida.

| Área | Path | Papel |
| --- | --- | --- |
| `<área>` | `<path>` | `<papel>` |

## 3. Pontos de entrada e saída
Registre entrypoints e saídas relevantes por evidência.

| Tipo | Path | Observação |
| --- | --- | --- |
| `<page | route | screen | controller | handler | job | consumer | TBD>` | `<path>` | `<obs>` |

## 4. Integrações e dependências visíveis
Liste apenas dependências locais importantes.

- `<dependência visível 1>`
- `<dependência visível 2>`

## 5. Superfícies de teste visíveis
- Unit tests: `<path ou TBD>`
- Integration tests: `<path ou TBD>`
- E2E / smoke: `<path ou TBD>`
- Manual: `<obs ou TBD>`

## 6. Observações de estado
Registre fatos operacionais curtos.

- `<observação factual 1>`
- `<observação factual 2>`

## 7. Referências
- `docs/units/<unit-slug>/CONTEXT.md`
- `docs/units/<unit-slug>/RULES.md`
- `docs/units/<unit-slug>/TESTING.md`
