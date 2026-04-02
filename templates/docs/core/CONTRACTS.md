SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Contracts

## Objetivo
Registrar apenas padrões de contrato realmente úteis para navegação e implementação. Este arquivo deve mostrar onde os contratos vivem, quais convenções importam e quais contratos são sensíveis, sem virar dump de DTOs, endpoints, interfaces ou payloads.

## Como usar este arquivo
- documentar o padrão e a localização dos contratos; quando houver volume alto, apontar o path em vez de copiar tudo
- registrar convenções estruturais, naming, versionamento e compatibilidade apenas quando forem recorrentes ou sensíveis
- destacar só contratos críticos, representativos ou especialmente sensíveis
- agrupar por família contratual quando isso reduzir releitura da codebase e melhorar a consulta rápida

## Navegação rápida por família
| Família contratual | Onde procurar primeiro | O que registrar aqui | Quando aprofundar |
| --- | --- | --- | --- |
| `HTTP / API` | `<path de routes, controllers, handlers, clients ou schemas HTTP>` | shape das superfícies, versionamento, headers, rotas ou clients representativos | quando o contrato muda compatibilidade externa ou é amplamente consumido |
| `Auth / RBAC / claims / permissões` | `<path de auth, guards, middlewares, policies, claims ou permission maps>` | origem das claims, enforcement, escopo de roles e boundaries sensíveis | quando erro aqui muda acesso, segurança ou comportamento cross-surface |
| `Envelopes de resposta e erro` | `<path de response helpers, problem details, error mappers ou exceptions>` | formato de sucesso/erro, campos estáveis, códigos e convenções de serialização | quando clientes dependem fortemente do envelope |
| `DTOs / payloads / requests / responses` | `<path de DTOs, schemas, contracts, validators ou serializers>` | naming, ownership, validação e exemplos curtos representativos | quando houver padrão recorrente, compatibilidade sensível ou muitos consumers |
| `Persistência / ORM / banco` | `<path de entities, models, migrations, repositories ou mapping>` | convenções de persistência que afetam leitura/escrita e compatibilidade de dados | quando schema, naming ou mapping forem parte do contrato operacional |
| `Integrações externas` | `<path de clients, adapters, webhooks, queues ou providers>` | contrato consumido/publicado, autenticação, retries, shape de payload e risco | quando houver dependência de terceiros ou integração entre sistemas |
| `Boundaries internas relevantes` | `<path de interfaces internas, use-cases, commands, events ou facades>` | pontos de acoplamento estável entre camadas ou módulos | quando a boundary orientar mudanças frequentes ou sensíveis |
| `Compatibilidade / versionamento / contratos sensíveis` | `<path de versioning, changelog contratual, adapters ou bridges>` | regra de evolução, backward compatibility, migração e contratos de alto risco | quando a mudança exige rollout cuidadoso ou coordenação entre consumidores |

## Mapa dos contratos principais
| Família | Path principal | O que governa | Escopo | Notas de consulta |
| --- | --- | --- | --- | --- |
| `HTTP / API` | `<path>` | `<rotas, clients, actions, handlers ou schemas de transporte>` | `global | unit:<unit-slug>` | `<onde começar a leitura>` |
| `Auth / RBAC / claims` | `<path>` | `<claims, papéis, guards, permission maps ou middleware>` | `global | unit:<unit-slug>` | `<boundary de enforcement>` |
| `DTOs / payloads / responses` | `<path>` | `<DTOs, schemas, serializers ou validators>` | `global | unit:<unit-slug>` | `<ownership e consumo principal>` |
| `Persistência / ORM` | `<path>` | `<entities, models, mappings, repositories ou migrations>` | `global | unit:<unit-slug>` | `<convenção operacional relevante>` |
| `Integrações externas` | `<path>` | `<clients, adapters, webhooks, queues ou providers>` | `global | unit:<unit-slug>` | `<sistema externo ou consumer principal>` |
| `Boundary interna sensível` | `<path>` | `<commands, events, interfaces, services ou facades>` | `global | unit:<unit-slug>` | `<por que merece atenção>` |

## Famílias contratuais e padrões observados

### HTTP / API
- superfícies principais: `<rotas, controllers, handlers, app/api, pages/api, RPC, GraphQL ou client HTTP observável>`
- paths ou módulos de referência: `<path principal 1>`, `<path principal 2>`
- contrato útil de registrar: `<versionamento, headers, naming de rotas, shape de query/body/path params, paginação ou filtros>`
- exemplo representativo: `<request/response ou rota curta que sintetiza o padrão>`

### Auth / RBAC / claims / permissões
- origem da identidade e das claims: `<auth provider, middleware, token parser, guard ou policy>`
- paths ou módulos de referência: `<path principal 1>`, `<path principal 2>`
- contrato útil de registrar: `<roles, claims, permission checks, tenancy, escopo de acesso ou boundary de enforcement>`
- exemplo representativo: `<claim, permission check ou fluxo curto de autorização>`

### Envelopes de resposta e erro
- paths ou módulos de referência: `<path principal 1>`, `<path principal 2>`
- contrato útil de registrar: `<response envelope, problem details, error code, field errors, exception mapper ou serializer>`
- compatibilidade sensível: `<o que clientes assumem como estável>`
- exemplo representativo: `<shape curto de sucesso ou erro>`

### DTOs / payloads / requests / responses
- paths ou módulos de referência: `<path principal 1>`, `<path principal 2>`
- naming recorrente: `<Request/Response, Input/Output, DTO, Schema, Command/Event ou outro padrão real>`
- ownership e consumo: `<onde nasce e onde costuma ser consumido>`
- exemplo representativo: `<DTO, schema ou payload curto que capture o padrão>`

### Persistência / ORM / convenções de banco
- paths ou módulos de referência: `<path principal 1>`, `<path principal 2>`
- contrato útil de registrar: `<entities, table naming, migrations, soft delete, timestamps, enums, mapping ou repository boundary>`
- risco contratual: `<mudança de schema, shape persistido ou convenção de leitura/escrita sensível>`
- exemplo representativo: `<entity, mapping ou migration curta>`

### Integrações externas
- sistemas ou providers relevantes: `<serviço externo 1>`, `<serviço externo 2>`
- paths ou módulos de referência: `<path principal 1>`, `<path principal 2>`
- contrato útil de registrar: `<payloads publicados/consumidos, autenticação, retries, idempotência, webhook shape ou queue contract>`
- exemplo representativo: `<client call, webhook payload ou event shape curto>`

### Boundaries internas relevantes
- boundaries estáveis: `<interface, facade, use-case, command bus, event contract, service boundary ou adapter>`
- paths ou módulos de referência: `<path principal 1>`, `<path principal 2>`
- contrato útil de registrar: `<quem define, quem consome e o que não deve ser quebrado>`
- exemplo representativo: `<interface, event ou command curto>`

### Compatibilidade / versionamento / contratos sensíveis
- regra observável de evolução: `<versionamento, depreciação, fallback, adapter, bridge ou compatibilidade retroativa>`
- hotspots de mudança sensível: `<path, boundary ou integração que exige coordenação>`
- critérios de cuidado: `<o que precisa ser preservado ou migrado>`
- exemplo representativo: `<caso curto de compatibilidade ou contrato sensível>`

## Padrões e exemplos representativos
| Família | Padrão | Exemplo curto | Onde se aplica | Sensibilidade |
| --- | --- | --- | --- | --- |
| `HTTP / API` | `<padrão recorrente>` | `<exemplo curto e representativo>` | `<superfície ou path>` | `baixa | média | alta` |
| `Auth / RBAC` | `<padrão recorrente>` | `<exemplo curto e representativo>` | `<superfície ou path>` | `baixa | média | alta` |
| `DTOs / payloads` | `<padrão recorrente>` | `<exemplo curto e representativo>` | `<superfície ou path>` | `baixa | média | alta` |
| `Integração / boundary` | `<padrão recorrente>` | `<exemplo curto e representativo>` | `<superfície ou path>` | `baixa | média | alta` |

## Contratos sensíveis
| Contrato ou boundary | Família | Path ou ponto de verdade | Por que é sensível | Mudança exige |
| --- | --- | --- | --- | --- |
| `<contrato sensível>` | `<família>` | `<path>` | `<impacto real>` | `<migração, coordenação, validação extra ou rollout cuidadoso>` |
| `<contrato sensível>` | `<família>` | `<path>` | `<impacto real>` | `<migração, coordenação, validação extra ou rollout cuidadoso>` |

## Ambiguidades, lacunas e limites
- usar `principais contratos observados` quando a evidência vier de amostragem forte
- usar família contratual como agrupador principal quando o volume estiver alto; evitar listagem bruta por arquivo
- se uma família quase não existir, registrar isso em uma linha curta em vez de forçar catálogo artificial
- `TBD-001` — `<ambiguidade real de nomenclatura>`
- `TBD-002` — `<lacuna real de localização ou ownership>`

## Referências
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `docs/core/RULES.md`
- `docs/core/TESTING.md`
