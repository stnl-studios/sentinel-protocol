---
name: stnl_project_foundation
description: Estrutura a fundacao documental Sentinel de projetos greenfield, inception ou repos novos a partir de documentacao bruta, decisoes explicitas e contratos declarados, priorizando docs/features e preparando handoff futuro para stnl_project_context sem inventar fatos de codebase.
---

# STNL Project Foundation

## Missao
Materializar a fundacao documental duravel de um projeto greenfield, inception ou repo novo quando a principal fonte de verdade ainda e documentacao bruta, decisao humana explicita, contrato formal ou direcao declarada, e a codebase ainda nao sustenta discovery factual forte.

Esta skill prepara `docs/**` no padrao Sentinel para consumo posterior por humanos, agents e `stnl_project_agent_specializer`, sem se passar por discovery factual de codebase, spec manager, planner, orchestrator ou executor.

## Fronteira canonica com `stnl_project_context`
- `stnl_project_foundation` opera enquanto documentacao, contratos declarados e decisoes humanas sao a principal fonte de verdade.
- `stnl_project_context` opera quando a codebase, scripts, testes, paths e runtime reais passam a ser evidencia factual dominante.
- a transicao de autoridade deve ser explicita em `MODE=HANDOFF`, registrando quais docs ainda sao declaradas, quais pontos ja foram observados no repo e quais lacunas precisam de discovery factual posterior.
- esta skill nao substitui `stnl_project_context`; ela cobre o estagio anterior ao discovery factual forte.
- quando codebase e documentacao conflitarem, nao arbitrar por preferencia; registrar conflito em `docs/TBDS.md` e, se material, bloquear ou preparar handoff para `stnl_project_context`.

## Quando usar
- quando o repo e novo, greenfield, inception ou ainda tem pouca codebase confiavel
- quando a principal evidencia vier de PRD, user stories, RFC, ADR, OpenAPI, schema, proto, Figma notes, backlog agrupado, README inicial, decisoes no prompt ou docs de produto
- quando for preciso organizar `docs/**` antes de materializar agents especializados
- quando features, jornadas, capabilities ou boundaries de negocio ja estiverem claros o suficiente para virar memoria duravel
- quando for preciso registrar lacunas, conflitos e hipoteses de trabalho sem transformar isso em fato observado
- quando houver stack declarada e isso precisar orientar docs praticas sem inventar estrutura implementada

## Quando nao usar
- para fazer discovery factual profundo de repo ja existente; usar `stnl_project_context`
- para ressincronizar delta factual de uma feature implementada; usar `stnl_project_context` em `MODE=RESYNC`
- para tratar `TBD_ID` ja registrado a partir de evidencia de codebase; usar `stnl_project_context` em `MODE=TBD_SYNC`
- para amadurecer uma ideia isolada em SPEC executavel; usar `stnl_spec_manager`
- para planejar, implementar, validar, fechar rodada ou conduzir workflow
- para materializar, revisar ou especializar agents; isso pertence a `stnl_project_agent_specializer`
- para inventar arquitetura, unidades, endpoints, modulos, comandos, testes, pastas ou fluxos como se ja existissem
- para criar `docs/units/*` por simetria tecnica, camada interna ou preferencia abstrata
- para transformar backlog generico em arvore documental ornamental

## Modos publicos
- `MODE=FOUNDATION`
- `MODE=REFINE`
- `MODE=HANDOFF`

## Entradas aceitas
- decisoes explicitas do usuario no prompt
- documento marcado como canonico pelo usuario ou pelo proprio repo
- contratos formais: `OpenAPI`, JSON Schema, GraphQL schema, proto, AsyncAPI, migration contract, event contract ou equivalente
- ADRs, RFCs e registros de decisao existentes
- PRD, product brief, user stories, acceptance criteria, jornada, flow map ou backlog agrupado
- notas de design, Figma notes, design system notes, accessibility notes ou guideline visual concreta
- README inicial, docs de setup, docs de stack, scaffold declaration ou estrutura inicial do repo
- codebase apenas como evidencia secundaria e limitada, para separar `observado` de `declarado`

## Saidas canonicas
- `docs/INDEX.md`
- `docs/TBDS.md`
- `docs/core/CONTEXT.md`
- `docs/core/RULES.md`
- `docs/core/STATE.md`
- `docs/core/CONTRACTS.md`
- `docs/core/TESTING.md`
- `docs/features/<feature-path>/CONTEXT.md`
- `docs/features/<feature-path>/done/.gitkeep` quando uma feature for materializada
- `docs/units/<unit-slug>/*` apenas para units estruturais claramente decididas e estaveis
- `docs/decisions/INDEX.md` e `docs/decisions/ADR-*.md` apenas para decisoes duraveis e transversais
- `docs/reference/*` apenas com evidencia concreta e valor de consulta real

## Classes de proveniencia e confianca
Toda afirmacao material em `docs/**` deve caber em uma classe explicita:

- `DECISAO_EXPLICITA`: escolha humana consciente, expressa no prompt ou em documento de decisao
- `CONTRATO_CANONICO`: contrato formal versionavel ou documento explicitamente marcado como canonico
- `DIRECAO_DECLARADA`: intencao, arquitetura alvo, stack ou comportamento declarado sem implementacao comprovada
- `HIPOTESE_DE_TRABALHO`: inferencia operacional temporaria, util para avancar a documentacao, mas pendente de confirmacao
- `OBSERVADO_NO_REPO`: fato visto em arquivo, path, script, teste, config ou runtime real
- `TBD_OU_CONFLITO`: lacuna, ambiguidade, dependencia externa, decisao ausente ou conflito entre fontes

Regras:
- nunca misturar `declarado` com `observado`
- nunca escrever `o repo possui`, `existe`, `implementa`, `usa` ou equivalente sem `OBSERVADO_NO_REPO`
- preferir `estrutura alvo declarada`, `contrato esperado`, `direcao declarada`, `se confirmado` ou `hipotese de trabalho` quando a implementacao nao foi observada
- toda hipotese relevante precisa apontar a fonte que a tornou plausivel e o criterio de confirmacao
- conflitos materiais vao para `docs/TBDS.md`; nao escolher no chute

## Precedencia de confianca
Usar esta ordem quando fontes entrarem em conflito:

1. decisao explicita do usuario
2. documento marcado como canonico
3. contrato formal: `OpenAPI`, schema, proto, migration contract, event contract ou equivalente
4. ADR ou RFC
5. documentacao de produto, design ou backlog agrupado
6. inferencia estrutural
7. codebase inicial, quando ainda for parcial, scaffold ou inconclusiva

Regras complementares:
- codebase observada pode corrigir afirmacao declarada apenas se a evidencia for direta e material
- se a codebase inicial parecer scaffold, exemplo ou placeholder, registrar isso como limite; nao promover a source of truth dominante
- quando duas fontes de mesma precedencia divergirem, registrar `TBD_OU_CONFLITO`
- quando uma fonte mais fraca divergir de uma mais forte, preservar a fonte forte e registrar a divergencia se ela puder afetar implementacao futura

## Modelo documental alvo
- `docs/core/CONTEXT.md`: problema, motivacao, dominio, direcao declarada, boundaries globais e limites de confianca; nao transforma hipotese em fato
- `docs/core/RULES.md`: regras decididas, stop rules, guidelines provisorias separadas e relacao com TBDs
- `docs/core/STATE.md`: estado atual observavel do repo, estrutura alvo declarada e areas ainda nao materializadas
- `docs/core/CONTRACTS.md`: contratos esperados, familias contratuais, origem e nivel de confianca, mesmo sem implementacao
- `docs/core/TESTING.md`: estrategia minima de validacao coerente com o estagio greenfield, sem fingir que a suite ja existe
- `docs/TBDS.md`: lacunas, conflitos, dependencias externas, ambiguidades relevantes e ausencia de decisao
- `docs/features/*/CONTEXT.md`: contexto operacional de capability, fluxo, jornada ou boundary de negocio, com fontes e confianca
- `docs/units/*`: suporte estrutural para pecas arquiteturais ja decididas, nao eixo narrativo principal
- `docs/decisions/*`: decisoes duraveis transversais
- `docs/reference/*`: referencia concreta, util e sustentada por fonte real

## Heuristicas de materializacao
- materializar `docs/features/*` quando houver capability, fluxo, jornada, recorte funcional ou boundary de negocio suficientemente claro
- manter em `docs/core/*` o que ainda for transversal, global ou nao decomposto o bastante para virar feature
- abrir `docs/TBDS.md` mesmo quando houver poucos itens; o arquivo e o consolidado canonico de lacunas relevantes
- nao gerar docs vazios para completar estrutura
- nao duplicar volume; docs locais apontam para `core`, `units`, `decisions`, `reference` e fontes originais quando isso for mais util
- usar slugs estaveis e conservadores; se o nome ainda nao estiver claro, registrar candidato em `docs/TBDS.md` em vez de criar path ruim
- preferir menos arquivos mais confiaveis a muitos arquivos especulativos
- sempre registrar fonte, classe de confianca e limite de leitura quando a afirmacao orientar agents

## Regras para `features`
- em greenfield, `features` sao o eixo principal de organizacao
- feature representa capability, jornada, fluxo, recorte funcional, boundary de negocio ou area de produto
- feature pode existir antes da implementacao, desde que a fonte declarada seja clara e a doc marque isso
- feature nao e camada tecnica, framework, package, tabela, DTO, endpoint isolado ou nome de pasta
- materializar feature quando ela tiver objetivo, atores ou consumers, comportamento esperado, limites e dependencias suficientes para orientar trabalho futuro
- nao exigir que a feature ja tenha paths implementados; quando nao houver paths, escrever `paths observados: none` ou `TBD` conforme o caso
- quando houver OpenAPI, design flow ou backlog agrupado, agrupar por capability e jornada antes de agrupar por endpoint ou tela
- feature criada deve apontar fontes originais e lacunas criticas em vez de absorver PRD inteiro
- se uma candidata for util mas fraca, registrar em `FEATURES CANDIDATAS NAO ABERTAS` no output e, se material, em `docs/TBDS.md`

## Regras para `units`
- `units` sao suporte estrutural, nao eixo principal em greenfield
- nao assumir `docs/units/*` por padrao
- materializar unit apenas quando representar peca arquitetural decidida, boundary estavel ou runtime/artefato estrutural claro
- exemplos aceitaveis quando declarados ou observados com clareza: `backend-api`, `frontend-web`, `mobile-app`, `firebase-functions`, `backoffice`, `worker`, `shared-contracts`
- monorepo com `BE + FE`, `BE + APP`, `FE + Firebase Functions` ou combinacao equivalente pode justificar units estruturais iniciais
- mesmo quando units existirem, a narrativa principal continua centrada em `features`
- nao promover decomposicao tecnica especulativa a unit
- nao abrir unit para `Domain`, `Application`, `Infrastructure`, `Components`, `Hooks`, `Repositories`, `Services` ou camadas internas sem boundary estrutural estavel
- se a arquitetura declarada for vaga, manter a estrutura em `docs/core/STATE.md` como alvo declarado e registrar a lacuna em `docs/TBDS.md`

## Regras para `docs/core`
### `docs/core/CONTEXT.md`
- registrar problema, motivacao, publico, dominio, direcao declarada e boundaries globais
- separar `decidido`, `declarado`, `hipotese` e `observado`
- nao tratar proposta, desejavel ou inferencia como fato do repo
- quando houver divergencia entre docs de produto e contrato formal, registrar o conflito

### `docs/core/RULES.md`
- distinguir `Regras decididas` de `Guidelines provisorias`
- regra decidida exige `DECISAO_EXPLICITA`, `CONTRATO_CANONICO`, ADR/RFC aceito ou evidencia observada forte
- guideline provisoria pode orientar agents, mas precisa vir marcada como provisoria e ter criterio de confirmacao
- nao registrar slogans abstratos; usar bullets operacionais e verificaveis

### `docs/core/STATE.md`
- separar obrigatoriamente:
  - estado atual observavel do repo
  - estrutura alvo declarada
  - areas ainda nao materializadas
- usar `none` quando a ausencia for observada e `TBD` quando nao houve evidencia suficiente
- nao afirmar existencia de pasta, modulo, endpoint, suite ou pipeline sem leitura real

### `docs/core/CONTRACTS.md`
- consolidar contratos esperados mesmo sem implementacao
- para cada contrato relevante, registrar origem e nivel de confianca
- diferenciar contrato formal, contrato declarado, contrato inferido e contrato ainda ausente
- nao copiar especificacoes longas; apontar o arquivo fonte e resumir o que orienta implementacao

### `docs/core/TESTING.md`
- definir estrategia minima coerente com o estagio greenfield
- nao fingir que suite, comando, fixture, pipeline ou harness ja existe
- registrar comandos apenas quando observados ou explicitamente decididos
- se a stack declarar expectativa de testes, registrar como direcao ou checklist de lacuna, nao como harness existente
- destacar validacoes iniciais esperadas para contratos, UI, integrações e fluxos criticos

## Regras para `docs/TBDS.md`
- usar para lacunas, conflitos, dependencias externas, ausencia de decisao, ambiguidade de boundary e risco de contrato
- nao usar como backlog generico
- cada item deve ter origem rastreavel e proxima acao sugerida
- registrar conflito quando fontes de precedencia equivalente discordarem
- registrar ausencia de decisao quando materializar a doc exigiria escolher arquitetura, unit, contrato ou regra sem base suficiente
- status validos continuam `open`, `investigating` e `resolved`
- `resolved` exige decisao explicita ou evidencia suficiente; refinamento textual nao resolve item

## Regras para `docs/decisions`
- criar `docs/decisions/INDEX.md` apenas quando houver ao menos uma decisao duravel transversal ou quando o usuario pedir explicitamente governanca de decisoes
- criar `docs/decisions/ADR-*.md` apenas para decisao arquitetural, contratual, normativa, boundary relevante ou escolha duravel de stack
- nao usar ADR para backlog, nota temporaria, TODO ou preferencia fraca
- decisao em ADR deve indicar fonte, status, impacto e trade-off
- quando a decisao veio do usuario, registrar como decisao humana explicita, nao como descoberta da skill

## Regras para `docs/reference`
- criar apenas com evidencia concreta e valor de consulta real
- exemplos aceitaveis: design system declarado, guia de API externo, matriz de integrações, glossary canonico, domain model aprovado, Figma notes consolidadas
- nao criar referencia ornamental, catalogo vazio ou copia extensa de documento bruto
- `docs/reference/DESIGN_SYSTEM.md` so deve existir quando houver design system proprio, tokens/guidelines institucionalizados ou pedido explicito

## Heuristicas stack-aware
Aplicar apenas quando a stack estiver declarada, contratada ou observada. A stack orienta riscos e lacunas a registrar, mas nao autoriza inventar estrutura.

Formulações preferidas:
- `pela stack declarada, e importante registrar...`
- `se confirmado por fonte canonica, estruturar...`
- `nao assumir <X> sem decisao explicita`
- `contrato esperado pela direcao declarada, ainda sem implementacao observada`

### Backend .NET / ASP.NET Core
- sinais: `.sln`, `.csproj`, `Program.cs`, controllers, minimal APIs, EF Core, `DbContext`, migrations, `ProblemDetails`, auth policies
- registrar cedo contratos HTTP, auth/claims, erro, persistencia, migration strategy e ownership de regras de negocio
- nao assumir Clean Architecture, CQRS, repository pattern, MediatR ou camadas `Domain/Application/Infrastructure` sem evidencia
- lacunas tipicas: estrategia de versionamento, envelope de erro, policy de auth, migracoes, testing de API e contract tests

### Frontend Angular
- sinais: `angular.json`, `@angular/*`, modules, standalone components, routes, services, interceptors, guards, NgRx ou signals
- registrar guidelines para rotas, componentes, state, services de API, guards, forms e design system quando declarados
- nao assumir NgRx, standalone-only, modularizacao por feature ou design system sem fonte
- lacunas tipicas: ownership de state, padrao de API client, validação de forms, acessibilidade, i18n e testes de componente/e2e

### Frontend React / Next
- sinais: `react`, `react-dom`, `next`, `next.config*`, `app/`, `pages/`, `app/api`, server actions, hooks, stores
- diferenciar `app router`, `pages router`, API routes e server actions apenas por evidencia
- registrar boundaries entre UI, data fetching, mutations, client/server components, auth e design system quando houver base
- nao assumir Redux, Zustand, React Query, server actions ou SSR/ISR sem fonte
- lacunas tipicas: ownership de data fetching, error/loading states, access control, component testing, e2e, SEO e accessibility

### Mobile React Native / Flutter
- sinais React Native: `react-native`, Metro, Expo, native folders, navigation libs
- sinais Flutter: `pubspec.yaml`, `lib/`, widgets, routes, platform channels
- registrar jornadas mobile, navigation, offline/sync, permissions, push, storage local e release targets quando declarados
- nao assumir Expo, bare workflow, bloc, provider, Riverpod, native modules ou offline-first sem evidencia
- lacunas tipicas: device permissions, deep links, offline behavior, crash reporting, accessibility, store release e testes em device

### Backend Node / Nest
- sinais: `nestjs`, `express`, `fastify`, controllers, routes, modules, providers, DTOs, schemas, validators
- registrar contracts HTTP/RPC, validation boundary, dependency injection, adapters, jobs, env e error model quando evidenciados
- nao assumir Nest modules, Prisma, TypeORM, class-validator, layered architecture ou monorepo package layout sem fonte
- lacunas tipicas: validation pipe, auth guards, DTO/schema ownership, integration tests, queue/retry semantics e env contract

### Firebase Functions
- sinais: `firebase.json`, `functions/`, triggers, callable functions, Firestore rules, storage rules, emulators
- registrar triggers, callable/http functions, auth context, Firestore/Storage rules, emulator strategy, idempotencia e deploy boundaries
- nao assumir region, runtime, rules shape, emulator coverage ou trigger semantics sem fonte
- lacunas tipicas: rules ownership, indexes, emulator validation, retry/idempotency, secrets, deploy targets e contract with clients

### Python API
- sinais: FastAPI, Flask, Django, `pyproject.toml`, `requirements.txt`, routers, serializers, pydantic, migrations
- registrar API contracts, schema generation, dependency injection ou service boundaries quando declarados
- nao assumir FastAPI, Pydantic v2, Celery, SQLAlchemy, Django apps ou pytest sem fonte
- lacunas tipicas: schema versioning, migration ownership, validation, async boundaries, dependency management e test harness

### Java / Spring
- sinais: `pom.xml`, `build.gradle`, Spring Boot, controllers, services, repositories, JPA, migrations, security config
- registrar contracts HTTP, DTOs, validation, transaction boundaries, persistence, security e error model quando sustentados
- nao assumir Hexagonal Architecture, Lombok, MapStruct, Spring Security config, JPA ou Flyway/Liquibase sem fonte
- lacunas tipicas: transaction rules, exception mapping, validation groups, auth policies, migration strategy e integration tests

## Modos
### `MODE=FOUNDATION`
Bootstrap inicial de projeto novo a partir de documentacao.

Contrato:
- criar ou atualizar apenas a fundacao documental necessaria em `docs/**`
- priorizar features como eixo principal
- criar units apenas quando a arquitetura declarada tornar isso claramente util e estavel
- registrar `docs/core/*`, `docs/TBDS.md` e `docs/INDEX.md` com separacao de confianca
- usar docs brutas como fonte, mas transformar em memoria operacional curta e auditavel

Ordem operacional:
1. ler os insumos declarados e o `docs/` existente
2. classificar fontes por precedencia e confianca
3. identificar problema, motivacao, stack declarada, contratos e boundaries globais
4. decidir features candidatas a partir de capabilities, jornadas e recortes funcionais
5. decidir se ha units estruturais claras; por default nao ha
6. materializar `docs/core/*`, `docs/TBDS.md` e `docs/INDEX.md`
7. materializar `docs/features/*` para candidatas fortes
8. materializar `docs/units/*`, `docs/decisions/*` e `docs/reference/*` apenas quando as regras acima sustentarem
9. encerrar com output auditavel de docs criadas, alteradas, skipped, features, units, TBDs e limites

### `MODE=REFINE`
Refino incremental apos chegada de novas docs, decisoes, contratos ou conflitos.

Contrato:
- editar apenas docs afetadas pelo novo insumo
- preservar classificacao de confianca e fontes anteriores
- subir para `core` apenas quando a nova informacao mudar regra global, contrato global, stack, boundary ou testing strategy
- abrir ou atualizar feature quando o novo insumo trouxer capability, fluxo ou boundary funcional claro
- abrir unit nova apenas se a nova evidencia transformar uma peca estrutural em boundary estavel
- registrar conflitos em `docs/TBDS.md`; nao resolver por inferencia

### `MODE=HANDOFF`
Preparar transicao para a fase em que a codebase passa a dominar a verdade factual.

Contrato:
- revisar `docs/core/STATE.md` para separar o que foi observado no repo do que segue declarado
- revisar `docs/core/CONTRACTS.md` e `docs/core/TESTING.md` para marcar contratos/harness esperados versus reais
- listar em `docs/TBDS.md` lacunas que `stnl_project_context` deve confirmar ou corrigir
- registrar explicitamente que a autoridade futura deve passar para `stnl_project_context` quando houver codebase suficiente
- nao executar discovery amplo; apenas preparar a fronteira de handoff com base no que ja esta documentado e observado pontualmente

## Stop conditions
- ausencia de insumo suficiente para definir ao menos problema, motivacao ou direcao inicial
- pedido exige escolher stack, arquitetura, unit, contrato ou regra sem decisao explicita
- fontes canonicas entram em conflito material e a decisao afetaria estrutura documental ou implementacao futura
- o usuario pede execucao, planejamento, validacao ou materializacao de agents
- o repo ja tem codebase suficiente para discovery factual forte e o pedido e bootstrap/resync factual; usar `stnl_project_context`
- a unica saida possivel seria inventar paths, endpoints, suites, scripts, componentes ou modulos

## Procedimento operacional
1. Confirmar o modo publico ou inferir `MODE=FOUNDATION` quando o pedido for bootstrap greenfield claro.
2. Ler `docs/` existente e os insumos brutos citados.
3. Classificar cada fonte por precedencia e cada afirmacao relevante por classe de proveniencia.
4. Montar mapa curto de `features` candidatas, `units` estruturais candidatas e lacunas.
5. Materializar ou refinar docs com blast radius minimo.
6. Garantir que toda afirmacao implementacional esteja marcada como `observada` ou rebaixada para `declarada`, `hipotese` ou `TBD`.
7. Validar que features continuam eixo principal e units continuam condicionais.
8. Encerrar com output operacional curto e verificavel.

## Formato de saida operacional
Use saida curta, factual e auditavel. Listar paths relativos completos.

### Para `FOUNDATION`
```text
MODE: FOUNDATION
DOCS CRIADAS:
- docs/core/CONTEXT.md
DOCS ALTERADAS:
- docs/INDEX.md
DOCS SKIPPED:
- none
FEATURES ABERTAS:
- docs/features/<feature-path>/CONTEXT.md
UNITS ABERTAS:
- none
DECISIONS/REFERENCE:
- docs/decisions/ADR-001-<slug>.md
TBDS RELEVANTES:
- TBD-001 - <titulo curto>
LIMITES DE CONFIANCA:
- <limite declarativo ou observacional mantido>
```

### Para `REFINE`
```text
MODE: REFINE
INSUMOS PROCESSADOS:
- <doc ou decisao>
DOCS ALTERADAS:
- docs/features/<feature-path>/CONTEXT.md
FEATURES IMPACTADAS:
- <feature-path>
UNITS IMPACTADAS:
- none
TBDS ABERTOS OU ATUALIZADOS:
- TBD-002 - <titulo curto>
LIMITES DE CONFIANCA:
- <limite mantido>
```

### Para `HANDOFF`
```text
MODE: HANDOFF
DOCS ALTERADAS:
- docs/core/STATE.md
- docs/TBDS.md
AUTORIDADE TRANSICIONADA:
- de: documentacao declarada e contratos esperados
- para: discovery factual futuro por stnl_project_context
PONTOS A CONFIRMAR NO CONTEXT:
- <path, contrato, feature, unit ou harness a confirmar>
TBDS PARA DISCOVERY FACTUAL:
- TBD-003 - <titulo curto>
LIMITES MANTIDOS:
- sem discovery amplo
- sem promover declarado a observado
```

## Exemplos canonicos de uso
### Bootstrap a partir de PRD e OpenAPI
```text
Use stnl_project_foundation.
MODE=FOUNDATION
Fontes:
- docs/raw/PRD.md
- docs/raw/openapi.yaml
- decisao do usuario: stack alvo React + ASP.NET Core
```
Resultado esperado: `docs/core/*`, `docs/TBDS.md`, `docs/INDEX.md`, features por capability do PRD/OpenAPI, contracts esperados com fonte e confianca, units apenas se `backend-api` e `frontend-web` estiverem decididos.

### Refino com nova decisao de arquitetura
```text
MODE=REFINE
Decisao explicita: o MVP usara Firebase Functions para notificacoes e React web para backoffice.
```
Resultado esperado: atualizar core e talvez abrir `unit:firebase-functions` ou `unit:backoffice` somente se a decisao tornar a boundary estrutural estavel; registrar lacunas de triggers, auth, deploy e emulator strategy.

### Handoff para discovery factual
```text
MODE=HANDOFF
O scaffold inicial ja foi criado e queremos preparar a passagem para stnl_project_context.
```
Resultado esperado: `STATE` separa observado vs alvo declarado, `CONTRACTS` marca contratos implementados vs esperados, `TESTING` marca harness real vs estrategia esperada e `TBDS` lista pontos para discovery factual.
