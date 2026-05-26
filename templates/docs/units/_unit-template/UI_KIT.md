SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

## File Purpose Header
- purpose: Referência operacional dos padrões visuais locais da unit.
- read_when: Mudança visual, componente, tela, fluxo UI ou revisão de consistência toca esta unit.
- do_not_use_for: Design system global, decisões de produto, implementação, comandos ou validação completa.
- canonical_source_for: Padrões visuais locais, superfícies UI e reuso local da unit.
- canonical_source_not_for: Tokens globais, decisões de marca, contratos de API ou estratégia de testes.
- update_owner: `stnl_project_context`; em greenfield, `stnl_project_foundation` até handoff.
- downstream_consumers: `designer`, `coder-frontend`, `coder-ios`, `reviewer`, `validation-eval-designer`.
- token_policy: Ler padrões locais e lacunas; abrir `docs/reference/DESIGN_SYSTEM.md` para verdade global.
- related_files: `docs/reference/DESIGN_SYSTEM.md`, `docs/units/<unit-slug>/CONTEXT.md`, `RULES.md`, `STATE.md`, `TESTING.md`.

# Unit UI Kit

> Template opcional. Criar apenas para units visuais (`app`, `admin`, `web`, `mobile` ou equivalentes).

## Objetivo
Manter um mapa curto e operacional das superfícies e padrões visuais locais da unit, útil para orientar manutenção visual, implementação consistente e reuso local.

## Relação com o design system
- existe design system de referência? `<sim | não>`
- existe biblioteca interna de componentes? `<sim | não>`
- regra local de precedência: `<como esta unit segue o design system sem duplicá-lo>`

## Superfícies e componentes relevantes
| Nome | Tipo | Path | Papel | Observação |
| --- | --- | --- | --- | --- |
| `<componente ou superfície>` | `<page | screen | layout | component | pattern>` | `<path>` | `<papel>` | `<obs>` |
| `<componente ou superfície>` | `<page | screen | layout | component | pattern>` | `<path>` | `<papel>` | `<obs>` |

## Padrões visuais locais
- `<padrão de formulário>`
- `<padrão de listagem>`
- `<padrão de feedback, loading, empty ou error>`

## Regras de uso e reuso
- reutilizar componente existente quando houver equivalência funcional
- não duplicar integralmente `docs/reference/DESIGN_SYSTEM.md`
- registrar aqui apenas o que for operacionalmente relevante para a unit

## Lacunas e observações
- `<lacuna real 1>`
- `<observação operacional 1>`
