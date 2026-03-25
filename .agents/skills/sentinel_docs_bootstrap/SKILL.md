---
name: sentinel_docs_bootstrap
description: Bootstrap de documentação (create only) para projeto existente usando discovery do repo + entrevista guiada mínima. Centraliza TBD no Core Context. Não toca em PLAN.md.
---

# Sentinel Docs Bootstrap

Executar bootstrap documental mínimo em projeto existente e sem documentação, em modo create only absoluto.

## Regras críticas

1. Aplicar create only absoluto: antes de criar qualquer arquivo no projeto alvo, verificar existência. Se existir, não editar e registrar `SKIPPED`.
2. Proibir qualquer alteração em `PLAN.md` ou `plan.md`: não criar, editar, mover, nem renomear.
3. Não inventar stack, regras, decisões, fluxos, comandos, paths, nomenclatura, contratos, endpoints, entidades, campos. Usar apenas evidências com paths reais.
4. Ler arquivos do repo para discovery sem executar comandos; não alterar código da aplicação.
5. Limitar entrevista guiada a no máximo 2 rodadas por documento, sempre após discovery com evidências citadas.
6. Não usar `TODO` nos docs gerados; toda lacuna vira `TBD` canônico em `docs/core/CONTEXT.md` com ID.

## Addendum — Feature roots, container e subfeature (aditivo)

Aplicar sem remover o fluxo atual:
1. Detectar roots por heurística e evidência de paths reais (ex.: `src/app/main`, `src/app/modules`).
2. Tratar diretório de primeiro nível da root como container.
3. Tratar subdiretórios dentro de coleções (`pages`, `use-cases`, `routes`, `features`, `modules`, `screens`) como subfeatures quando houver confiança.
4. Mapeamento canônico de docs:
   - container: `docs/features/<root-slug>/<container-slug>/`
   - subfeature: `docs/features/<root-slug>/<container-slug>/<collection>/<subfeature-slug>/`
5. Quando não houver coleção clara para subfeature, usar `items` como default.
6. Se confiança for baixa, não materializar subfeature; registrar `TBD` no contexto da unidade.
7. Mesmo quando a unidade resolvida for aninhada, o `CONTEXT.md` da unidade deve usar `SCOPE: feature`; a hierarquia fica no path e em `FEATURE`, nunca em `SCOPE: subfeature`.

## Saída esperada no projeto alvo

Criar somente o que faltar, sempre em create only:

1. `README.md` na raiz.
2. `docs/INDEX.md`.
3. `docs/core/` com:
   - `docs/core/CONTEXT.md`
   - `docs/core/RULES.md`
   - `docs/core/STATE.md`
   - `docs/core/CONTRACTS.md`
   - `docs/core/TESTING.md`
   - `docs/core/UI_KIT.md` apenas se `Tipo` for `APP`, `FE` ou `FS`
4. `docs/features/`:
   - criar a pasta mesmo sem features detectadas
   - criar de 1 a 3 features iniciais só com evidência clara ou confirmação do usuário
   - para cada feature criada:
     - `docs/features/<feature_slug>/CONTEXT.md`
     - `docs/features/<feature_slug>/done/.gitkeep`
5. `docs/decisions/INDEX.md`:
   - não criar ADR automaticamente
   - template ADR existe apenas dentro desta skill
6. Reference
- Criar sempre a pasta `docs/reference/` (create-only) e `docs/reference/.gitkeep`.
- Criar `docs/reference/DESIGN_SYSTEM.md` somente se houver evidência de design system próprio ou se o usuário pedir explicitamente.
- `docs/reference/*` é referência fria: não entra no contexto por padrão; só incluir por gatilho (mudança visual/tokens/arquitetura de UI).

## Templates

A fonte de verdade dos templates é `references/templates` desta skill.
Ao criar docs no projeto alvo, renderizar conteúdo a partir do template correspondente sem copiar templates para o projeto.
Se template necessário estiver vazio, parar e pedir conteúdo ao usuário para evitar documentos em branco.

## Tipo do projeto

A fonte de verdade é a primeira linha de `docs/core/CONTEXT.md`:

`Tipo: APP | FE | BE | FS | TBD`

Fluxo:
1. Inferir tipo por evidência.
2. Se não for possível, perguntar ao usuário.
3. Se usuário não souber, criar `docs/core/CONTEXT.md` com `Tipo: TBD`, criar `docs/INDEX.md` e parar.

## TBD centralizado

Centralizar lacunas e perguntas pendentes apenas em `docs/core/CONTEXT.md` com IDs (`TBD-001`, `TBD-002`, ...).
`docs/INDEX.md`, `docs/core/STATE.md` e demais docs não devem duplicar lista de TBD; apenas referenciar a seção canônica.

## Conteúdo por documento

- `INDEX`: navegação e bundles de contexto; apontar Core, Features e Decisions; não listar TBD.
- `CORE CONTEXT`: stack e evidências; escopo e fora de escopo; perguntas pendentes e TBD com IDs; nunca usar TODO.
- `RULES`: regras invioláveis e stop rules; proibição de tocar em PLAN.md; sem inventar; lacunas viram TBD.
- `STATE`: índice curto do que existe e onde está, com paths; sem narrativa; sem duplicar regras/contracts/design system; lacunas viram TBD.
- `CONTRACTS`: apenas nomenclatura e localização de padrões; não catalogar endpoints/models/interfaces; lacunas viram TBD.
- `TESTING`: como rodar e validar só com evidência; sem evidência, registrar TBD; sem TODO.
- `UI_KIT`: catálogo operacional curto de componentes e status; sem duplicar design system; sem TODO.
- `FEATURE CONTEXT`: memória curta por feature com snapshot curto de recycle no topo, seguido de cabeçalho durável (`SCOPE: feature`, `FEATURE: <feature-path>`, `STATUS: active | in-progress`) e memória local curta; pode linkar DONE existente sem duplicar; lacunas viram TBD no Core Context.

## DONE (padrão, não criar automaticamente)

Não criar arquivos DONE nesta skill.
Padrão oficial para execução futura:
- `docs/features/<feature_slug>/done/DONE-YYYYMMDD-<entrega-real>.md`
- o slug descreve a entrega consolidada, nunca numeracao operacional da rodada
- Feature Context referencia DONEs por link, sem duplicar conteúdo.

## Snapshot canônico do FEATURE CONTEXT

Quando esta skill cria `docs/features/<feature>/CONTEXT.md`, o arquivo deve nascer com este bloco no topo:

`## Snapshot de recycle`
- `LAST DONE: <path-ou-TBD>`
- `LAST DECISION: CLOSED | PARTIAL | BLOCKED | TBD`
- `LAST MILESTONE: <frase-curta-ou-TBD>`
- `OPEN THREADS:`
  - `<item curto ou TBD>`
- `NEXT RECYCLE BASIS: <frase curta sobre o que habilita o próximo recycle>`
- `LAST UPDATED: YYYYMMDD`

Regras:
1. manter curto e estável
2. não virar mini-`PLAN.md`
3. não virar mini-`DONE`
4. `OPEN THREADS` pode ficar só com `- TBD` quando não houver base melhor
5. o restante do arquivo continua sendo memória durável curta da feature

## Heurísticas de discovery por stack

Aplicar somente com evidência.

### Heurística geral

- Detectar monorepo por `apps`, `packages`, `libs`, `pnpm-workspace`, `nx`, `turbo`.
- Coletar evidências sempre com paths reais.
- Se houver padrões concorrentes, registrar TBD e não decidir no chute.

### Angular FE

Detectores:
- `angular.json`
- `package.json` com `@angular`

Buscar evidências em:
- `src/app`
- `features`, `pages`, `modules`
- `core`, `shared`
- `services`, `facades`, `repositories`
- uso de `HttpClient`
- `validators`
- testes `spec.ts`

Aplicar:
- preencher Core Context com stack/versão (se evidenciado)
- preencher CONTRACTS com termos canônicos e paths reais
- preencher RULES conforme padrão encontrado

### React FE

Detectores:
- `package.json` com `react` e `react-dom`

Buscar evidências em:
- `components`, `pages`, `screens`, `routes`, `features`
- hooks `useX`
- estado `redux`/`zustand`
- schemas `zod`/`yup`
- testes `spec`/`test`

Aplicar:
- Core Context com stack
- CONTRACTS com nomenclatura e paths
- RULES apenas com padrões detectados

### Next.js FE ou FS

Detectores:
- `package.json` com `next`
- `next.config`

Roteamento:
- app router se existir `app/` com `page`/`layout`
- pages router se existir `pages/`
- se ambos, registrar TBD

Detectar FS:
- `app/api` ou `pages/api`
- server actions por evidência

Aplicar:
- sugerir `Tipo FE` ou `FS` e perguntar se incerto
- registrar padrões em CONTRACTS apenas com evidência

### Node TypeScript BE

Detectores:
- `package.json` com `typescript` e framework evidenciado

Buscar evidências em:
- `controllers`, `routes`, `handlers`
- `services`, `usecases`
- validação
- `db`, migrations
- testes e ferramenta

Aplicar:
- CONTRACTS com nomenclatura e localização
- TESTING com evidência
- RULES com camadas detectadas

### CSharp .NET BE

Detectores:
- `.sln` ou `.csproj`

Buscar evidências em:
- `controllers` ou minimal API em `Program.cs`
- handlers `MediatR`
- `services`, `dtos`, `validators`, migrations
- projetos de teste

Aplicar:
- CONTRACTS com nomenclatura e localização
- TESTING com frameworks detectados
- RULES com camadas detectadas

## Entrevista guiada mínima

Perguntar apenas o que faltar após discovery; no máximo 2 rodadas por documento.
Perguntas permitidas:
- objetivo do projeto em 1 frase
- tipo (`APP`, `FE`, `BE`, `FS`) se incerto
- 1 a 3 features prioritárias se não houver evidência
- como rodar e testar se não houver evidência
- existência de design system próprio (`sim`/`não`)

## Ordem de geração no projeto alvo

1. `docs/core/CONTEXT.md`
2. `docs/INDEX.md`
3. `README.md`
4. `docs/core/RULES.md`
5. `docs/core/CONTRACTS.md`
6. `docs/core/TESTING.md`
7. `docs/core/STATE.md`
8. `docs/core/UI_KIT.md` (se aplicável)
9. `docs/decisions/INDEX.md`
10. `docs/reference/DESIGN_SYSTEM.md` (se aplicável)

## Saída final da execução

Sempre imprimir ao final:
- arquivos criados
- arquivos `SKIPPED`
- lista de IDs `TBD` apontando para `docs/core/CONTEXT.md`
- proximo passo sugerido: executar skill separada de geracao de `PLAN.md`
