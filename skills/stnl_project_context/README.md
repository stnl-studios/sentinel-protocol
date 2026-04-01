# stnl_project_context

## Missão
Levantar contexto factual do projeto e materializar ou ressincronizar apenas a base documental mínima em `docs/core/*`, `docs/units/*` e `docs/features/*`.

## Modos suportados
- `MODE=BOOTSTRAP`
- `MODE=RESYNC`

## Fonte central consumida
Esta skill consome somente o subconjunto real de `templates/docs/*` abaixo:

- `templates/docs/core/CONTEXT.md`
- `templates/docs/core/CONTRACTS.md`
- `templates/docs/core/RULES.md`
- `templates/docs/core/STATE.md`
- `templates/docs/core/TESTING.md`
- `templates/docs/units/_unit-template/CONTEXT.md`
- `templates/docs/units/_unit-template/CONTRACTS.md`
- `templates/docs/units/_unit-template/RULES.md`
- `templates/docs/units/_unit-template/STATE.md`
- `templates/docs/units/_unit-template/TESTING.md`
- `templates/docs/units/_unit-template/UI_KIT.md`
- `templates/docs/features/_feature-template/CONTEXT.md`
- `templates/docs/features/_feature-template/done/DONE-TEMPLATE.md`

## Paths ignorados
Esta skill não consome nem instala no bundle local:

- `templates/docs/workflow/*`
- `templates/docs/agents/*`
- `templates/docs/decisions/*`
- `templates/docs/reference/*`
- `templates/docs/feature_spec_template.md`
- `templates/docs/INDEX.md`

Também fica fora do escopo da skill:

- `templates/agents/*`
- qualquer uso de `LEGACY/*`
- qualquer uso de `.agents/skills/*` como source

## Bundle local instalado
No `init` e no `update`, o instalador global copia a skill para os targets globais do usuário e prepara dentro da skill instalada:

- `reference/docs/`

Esse bundle local contém somente os arquivos listados em "Fonte central consumida". O instalador limpa apenas `reference/docs/` antes de recopiar esse subconjunto.

## Materialização no projeto-alvo
Esta skill materializa ou ajusta apenas:

- `docs/core/*`
- `docs/units/*`
- `docs/features/*`

Ela ignora:

- `docs/workflow/*`

## Fora do escopo
Este README não substitui o `SKILL.md`.

Também ficam explicitamente fora do escopo:

- materializar `docs/` durante a instalação global
- copiar `templates/docs/*` de forma indiscriminada
- duplicar ownership da fonte central `templates/docs/*`
- criar mecanismo paralelo ao `sentinel.mjs`

## Regra de cópia mínima
O instalador global deve copiar apenas o que importa para esta skill. Para `stnl_project_context`, isso significa:

- copiar a própria skill a partir de `skills/stnl_project_context/`
- preparar `reference/docs/` só com o subconjunto real de `templates/docs/*` usado por ela
- excluir `workflow/*` e qualquer conteúdo fora das responsabilidades documentais da skill
