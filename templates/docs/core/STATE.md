SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# State

## 1. Snapshot do repo
- Formato do repo: `single-unit | multi-unit | TBD`
- Path raiz principal: `<path>`
- Convenção estrutural visível: `<resumo curto>`

## 2. Units materializadas
| Unit | Classe | Path principal | Status |
| --- | --- | --- | --- |
| `<unit-slug>` | `app | api | mobile | worker | package | bff | admin | TBD` | `<path>` | `present | partial | TBD` |

## 3. Áreas compartilhadas relevantes
Registre apenas libs, packages, infra interna ou módulos transversais com impacto operacional.

| Área | Path | Papel |
| --- | --- | --- |
| `<shared-area>` | `<path>` | `<papel>` |

## 4. Superfícies operacionais
Liste superfícies materializadas por evidência.

- `<app>`
- `<api>`
- `<worker>`
- `<admin>`
- `<mobile>`

## 5. Entradas estruturais relevantes
Aponte apenas entrypoints e módulos principais úteis para localização rápida.

| Entrada | Path | Observação |
| --- | --- | --- |
| `<entrypoint>` | `<path>` | `<observação>` |

## 6. Observações de estado
Registre fatos operacionais curtos.

- `<observação factual 1>`
- `<observação factual 2>`

## 7. Referências relacionadas
- `docs/core/CONTEXT.md`
- `docs/core/RULES.md`
- `docs/core/TESTING.md`
- docs de unit aplicáveis
