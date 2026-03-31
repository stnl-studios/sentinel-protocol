SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Contracts

## 1. Objetivo
Este arquivo nomeia e localiza padrões canônicos do projeto.
Ele não deve virar catálogo de endpoint, DTO, payload ou schema completo.

## 2. Nomenclatura oficial do projeto
Preencher apenas com termos que realmente existam no repo.

| Categoria | Termo canônico | Papel | Observação curta |
| --- | --- | --- | --- |
| apresentação | `<Page | Screen | View | Component | TBD>` | `<papel>` | `<obs>` |
| aplicação | `<UseCase | Service | Facade | Handler | TBD>` | `<papel>` | `<obs>` |
| persistência | `<Repository | Gateway | Adapter | TBD>` | `<papel>` | `<obs>` |
| integração | `<HTTP Client | Publisher | Consumer | TBD>` | `<papel>` | `<obs>` |

## 3. Localização no repo
Aponte os paths reais das camadas e artefatos canônicos.

| Termo | Path principal | Escopo |
| --- | --- | --- |
| `<termo>` | `<path>` | `global | unit:<unit-slug>` |

## 4. Evidências
Registre 1 a 3 evidências curtas por grupo relevante.

- `<evidência 1>`
- `<evidência 2>`

## 5. Ambiguidades e TBDs
Registre apenas ambiguidades reais de nomenclatura ou localização.

- `TBD-001` — `<ambiguidade de nomenclatura ou boundary>`
- `TBD-002` — `<lacuna de localização canônica>`

## 6. Referências
- `docs/core/CONTEXT.md`
- `docs/core/RULES.md`
- docs de unit aplicáveis
