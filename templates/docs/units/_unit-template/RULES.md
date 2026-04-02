SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# Unit Rules

## Objetivo
Registrar regras locais da unit em formato simples e operacional, sem contrariar `docs/core/RULES.md`. Use só regras confirmadas pela codebase ou por decisão explícita; deixe seeds na seção própria.

## Regras invioláveis
- `<regra local confirmada que precisa ser preservada>`
- `<regra local confirmada que precisa ser preservada>`
- contrato, boundary ou integração crítica desta unit não muda sem revisão explícita dos consumidores relevantes

## Stop rules
- parar quando a mudança atravessar boundary local sem decisão explícita
- parar quando a solução empurrar regra crítica para controller, endpoint, UI, adapter ou helper genérico por conveniência
- parar quando houver quebra contratual local sem revisão dos consumidores relevantes
- parar quando a evidência local não sustentar a regra que seria registrada aqui

## Regras de mudança estrutural
- mudança em contrato, schema, payload ou DTO da unit exige revisão explícita de compatibilidade
- mudança em persistência, auth, autorização ou integração externa da unit exige rever a boundary local
- mudança que move regra crítica entre superfícies da unit exige confirmar o ponto canônico antes da implementação

## Regras de arquitetura

### Dependência entre camadas
- controller, endpoint, route ou handler não concentra regra de negócio crítica
- application, service ou use case orquestra o fluxo quando essa camada existir
- domain não conhece infra, transporte nem persistência
- repository não concentra regra de negócio crítica
- integração externa passa pela boundary canônica definida para a unit

### Fronteiras entre units
- esta unit não acessa outra unit diretamente fora do contrato previsto
- integração cross-unit respeita o boundary canônico e não contorna contrato estável
- utilitário compartilhado não absorve regra que pertence claramente a esta unit

### Regras por superfície detectada

#### API / controller / endpoint
- preencher só se essa superfície existir na unit
- controller, route, endpoint handler ou minimal API fica fino e delega a orquestração
- validação, auth e permission check acontecem na borda apropriada

#### application / service / use case
- preencher só se essa superfície existir na unit
- service ou use case orquestra o fluxo e coordena dependências
- regra crítica fica aqui ou no domínio, não em controller, repository ou adapter

#### domain
- preencher só se essa superfície existir na unit
- domínio não conhece infra, framework nem client externo
- invariantes críticas não ficam diluídas em helper genérico

#### data / repository / infra
- preencher só se essa superfície existir na unit
- acesso a dados passa pela boundary prevista
- repository e infra não concentram regra de negócio crítica

#### UI / design system
- preencher só se essa superfície existir na unit
- UI não chama repository ou client de infra diretamente fora da boundary prevista
- componente, tela, page ou screen não concentra regra de negócio crítica
- design system, tokens e primitives seguem o kit local quando ele existir

#### jobs / workers / schedulers
- preencher só se essa superfície existir na unit
- job, worker ou scheduler orquestra fluxo e não vira depósito de regra crítica
- payload sensível, retry e idempotência respeitam a boundary prevista

#### adapters / integrations
- preencher só se essa superfície existir na unit
- integração externa fica encapsulada na boundary canônica
- regra crítica não fica escondida em mapper, helper de client ou wrapper genérico

### Exceções aprovadas
- `<exceção local real observada e sustentada por evidência>`

## Convenções locais
- registrar só convenções estáveis que valem para toda a unit
- `<convenção local estável observada>`
- `<convenção local estável observada>`

## Seeds por stack ou superfície
Use apenas quando faltar evidência local suficiente. Seed precisa ser operacional, ajustável e nunca vira regra confirmada sem base observável.

### `api | bff | .net`
- controller não concentra regra de negócio
- service ou use case orquestra fluxo
- auth, claims e permission check acontecem na borda apropriada

### `app | admin | mobile | ui`
- UI não chama repository diretamente
- componente não concentra regra de negócio crítica
- efeitos colaterais não ficam espalhados na camada visual

### `node | nest | express`
- rota ou controller fica fino
- regra crítica fica em service ou use case
- validação acontece na borda apropriada

### `worker | scheduler | consumer`
- job orquestra fluxo, não vira depósito de regra crítica
- payload sensível não muda silenciosamente
- retry e idempotência respeitam a boundary prevista

### `repository | orm | persistence`
- persistência segue a boundary definida
- repository não concentra regra de negócio
- convenção de schema ou mapping que impacta compatibilidade exige revisão explícita

## Relação com TBDs
- lacuna que bloqueia decisão arquitetural, contratual ou de boundary abre item em `docs/TBDS.md`
- `RULES.md` não vira backlog de pendências
- referencie TBD aqui só quando a lacuna afetar regra ativa desta unit

## Referências
- `docs/core/RULES.md`
- `docs/TBDS.md`
- `docs/core/CONTRACTS.md`
- `docs/units/<unit-slug>/CONTEXT.md`
- `docs/units/<unit-slug>/STATE.md`
- `docs/units/<unit-slug>/CONTRACTS.md` quando existir
