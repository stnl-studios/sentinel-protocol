# Exemplo 1 — Angular sem docs
Projeto Angular já existente sem `README.md` e sem `docs/`.
Objetivo: bootstrap documental create only e priorizar 2 features iniciais (`auth-login` e `dashboard`).

# Exemplo 2 — Next com dúvida de Tipo
Projeto Next.js existente com `app/` e `app/api/`, mas usuário em dúvida entre `FE` e `FS`.
Objetivo: inferir por evidência, perguntar apenas o mínimo necessário e seguir create only.

# Exemplo 3 — .NET sem teste claro
Projeto .NET existente com `.sln` e múltiplos `.csproj`, sem comando de testes explícito no repositório.
Objetivo: gerar docs core com evidência e registrar lacuna de testes como TBD canônico.

# Exemplo 4 — Projeto A com root main e container
Projeto com `src/app/main/registration` e subestruturas internas em `pages`, `use-cases` e `routes`.
Objetivo: manter create only e mapear documentação por root/container/subfeature sem apagar exemplos anteriores.

# Exemplo 5 — Projeto B com root modules e subfeatures em pages
Projeto com `src/app/modules/perimeters/pages/categories` e `src/app/modules/perimeters/pages/groups`.
Objetivo: manter create only e gerar exemplos de mapeamento canônico por root `modules` e container `perimeters`.
