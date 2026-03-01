# Exemplo 1 — Saída (Angular FE)

## Tree criado no projeto alvo

```text
README.md
docs/
  INDEX.md
  core/
    CONTEXT.md
    RULES.md
    STATE.md
    CONTRACTS.md
    TESTING.md
    UI_KIT.md
  features/
    auth-login/
      CONTEXT.md
      done/
        .gitkeep
    dashboard/
      CONTEXT.md
      done/
        .gitkeep
  decisions/
    INDEX.md
  reference/
    .gitkeep
    DESIGN_SYSTEM.md (se aplicável)
```

## TBDs em docs/core/CONTEXT.md

```text
TBD-001: Confirmar versão exata do Angular em package.json (path real obrigatório).
TBD-002: Confirmar comando oficial de teste e cobertura para CI local.
```

## CONTRACTS (somente nomenclatura + paths)

```text
- Components: src/app/shared/components/
- Feature modules: src/app/features/<feature>/
- Services: src/app/core/services/
- Route guards: src/app/core/guards/
```

## UI_KIT (quando aplicável)

```text
- button-primary: existente (src/app/shared/ui/button/)
- input-text: existente (src/app/shared/ui/input/)
- data-table: TBD (não encontrado com evidência)
```

# Exemplo 2 — Saída (Next FE/FS com dúvida)

## Tree criado no projeto alvo

```text
docs/
  INDEX.md
  core/
    CONTEXT.md
    RULES.md
    STATE.md
    CONTRACTS.md
    TESTING.md
    UI_KIT.md
  features/
  decisions/
    INDEX.md
  reference/
    .gitkeep
    DESIGN_SYSTEM.md (se aplicável)
README.md
```

## TBDs em docs/core/CONTEXT.md

```text
TBD-001: Resolver Tipo final entre FE e FS (evidência: app/ e app/api/ presentes).
TBD-002: Confirmar se Server Actions são padrão autorizado neste repositório.
```

## CONTRACTS (somente nomenclatura + paths)

```text
- App Router pages: app/**/page.tsx
- Layouts: app/**/layout.tsx
- API handlers: app/api/**/route.ts
- Shared components: components/
```

## UI_KIT (quando aplicável)

```text
- app-shell: existente (app/layout.tsx)
- form-controls: existente parcial (components/forms/)
- feedback/loading: TBD (padrão não identificado)
```

# Exemplo 3 — Saída (.NET BE)

## Tree criado no projeto alvo

```text
README.md
docs/
  INDEX.md
  core/
    CONTEXT.md
    RULES.md
    STATE.md
    CONTRACTS.md
    TESTING.md
  features/
  decisions/
    INDEX.md
  reference/
    .gitkeep
    DESIGN_SYSTEM.md (se aplicável)
```

## TBDs em docs/core/CONTEXT.md

```text
TBD-001: Definir comando oficial de teste (dotnet test com quais projetos).
TBD-002: Confirmar estratégia de testes de integração no pipeline.
```

## CONTRACTS (somente nomenclatura + paths)

```text
- API controllers: src/Api/Controllers/
- Application handlers: src/Application/**/Handlers/
- DTOs: src/Application/**/Dtos/
- Infra persistence: src/Infrastructure/Persistence/
```

## UI_KIT (quando aplicável)

```text
Não aplicável para Tipo BE.
```
