SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# UI KIT

> Template opcional. Criar apenas para units visuais (`app`, `admin`, `web`, `mobile` ou equivalentes).

## 1. Objetivo
Descreva o papel deste UI Kit como fonte operacional de interface desta unit.

## 2. Fonte canônica e precedência
- Este arquivo é a fonte operacional mínima de UI? `<sim | não>`
- Existe `docs/reference/DESIGN_SYSTEM.md`? `<sim | não>`
- Existe biblioteca interna de componentes? `<sim | não>`
- Regra de precedência em caso de conflito: `<descrever>`

## 3. Inventário de componentes
| Nome | Seletor | Status | Path | Tipo | Uso observado / observações |
| --- | --- | --- | --- | --- | --- |
| `<componente>` | `<selector ou N/A>` | `implemented | planned | partial | TBD` | `<path>` | `<tipo>` | `<uso ou obs>` |

## 4. Padrões de composição
Registre apenas padrões reais de interface e composição.

- `<padrão de formulário>`
- `<padrão de listagem>`
- `<padrão de feedback>`
- `<loading / empty / error state>`

## 5. Regras de reuso
- Reutilizar componente existente quando houver equivalência funcional.
- Não duplicar comportamento genérico já coberto pelo ecossistema canônico desta unit.
- Novo componente genérico deve ser registrado neste arquivo quando entrar em uso real.

## 6. Convenções para novos componentes
- Path esperado: `<path>`
- Prefixo de seletor / naming: `<prefixo>`
- Convenções de i18n: `<regra>`
- Estrutura mínima: `<estrutura ou exemplo>`

## 7. Tokens e estilos relevantes
Registre apenas o necessário para operação.

- Tipografia: `<fonte ou token>`
- Tema: `<tema>`
- Tokens principais: `<tokens>`
- Locale / formatação: `<locale>`

## 8. Lacunas e observações
- `<lacuna real 1>`
- `<observação operacional 1>`
