SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Rules

## Objetivo
Registrar regras reais do projeto em formato simples, direto e operacional. Use regras confirmadas pela codebase ou por decisão explícita; deixe seeds apenas na seção própria.

## Regras invioláveis
- `<regra global confirmada que precisa ser preservada>`
- `<regra global confirmada que precisa ser preservada>`
- mudança contratual, de boundary ou de integração crítica exige revisão explícita dos consumidores relevantes
- regra crítica não fica espalhada por helper genérico, adapter opportunista ou camada de borda por conveniência

## Stop rules
- parar quando a mudança exigir quebrar uma boundary sem decisão explícita
- parar quando a solução empurrar regra crítica para controller, endpoint, UI, adapter ou helper genérico
- parar quando houver breaking change contratual sem validação dos consumidores relevantes
- parar quando a evidência local não sustentar a regra que seria registrada aqui

## Regras de mudança estrutural
- mudança de contrato, schema, payload, DTO ou evento exige revisão explícita de compatibilidade
- mudança na boundary de persistência, integração externa, auth ou autorização exige revisão arquitetural explícita
- mudança que move regra crítica entre camadas exige confirmar o ponto canônico antes da implementação

## Regras de arquitetura

### Dependência entre camadas
- controller, endpoint, route ou handler não concentra regra de negócio crítica
- application, service ou use case orquestra o fluxo quando essa camada existir
- domain não conhece infra, transporte nem detalhes de persistência
- repository não concentra regra de negócio crítica
- integração externa passa pela boundary canônica prevista pelo projeto

### Fronteiras entre units
- `<unit A>` não acessa `<unit B>` diretamente fora do contrato previsto
- integração cross-unit respeita boundary estável e não contorna contrato canônico
- comunicação crítica entre units não depende de helper compartilhado sem dono claro

### Regras por superfície detectada

#### API / controller / endpoint
- preencher só se essa superfície existir no projeto
- controller, endpoint, route ou minimal API fica fino e delega a orquestração
- auth, claims, permission check e validação acontecem na borda apropriada

#### application / service / use case
- preencher só se essa superfície existir no projeto
- service ou use case orquestra fluxo e coordena dependências sem absorver detalhe de transporte
- regra crítica fica aqui ou no domínio, não em controller, repository ou adapter

#### domain
- preencher só se essa superfície existir no projeto
- domínio não conhece infra, framework nem client externo
- invariantes de negócio não ficam dependentes de utilitário genérico sem dono semântico

#### data / repository / infra
- preencher só se essa superfície existir no projeto
- acesso a dados passa pela boundary prevista
- repository e infra não concentram regra de negócio crítica

#### UI / design system
- preencher só se essa superfície existir no projeto
- UI não chama repository ou client de infra diretamente fora da boundary prevista
- componente, tela, page ou screen não concentra regra de negócio crítica
- design system, tokens e primitives seguem o kit local quando ele existir

#### jobs / workers / schedulers
- preencher só se essa superfície existir no projeto
- job, worker ou scheduler orquestra fluxo e não vira depósito de regra crítica
- payload sensível, retry e idempotência respeitam a boundary prevista

#### adapters / integrations
- preencher só se essa superfície existir no projeto
- integração externa fica encapsulada em adapter ou boundary canônica
- regra crítica não fica escondida em mapper, helper de client ou wrapper genérico

### Exceções aprovadas
- `<exceção real observada e sustentada por evidência>`

## Convenções globais
- registrar só convenções estáveis que valem para o repo inteiro
- `<convenção global confirmada por recorrência ou decisão explícita>`
- `<convenção global confirmada por recorrência ou decisão explícita>`

## Seeds por stack ou superfície
Use apenas quando faltar evidência local suficiente. Seed precisa ser operacional, ajustável e nunca vira regra confirmada sem base observável.

### .NET / API / BFF
- controller, endpoint handler ou minimal API não concentra regra de negócio
- service ou use case orquestra fluxo quando essa camada existir
- auth, claims e permission check acontecem na borda apropriada

### Angular / React / Next / UI
- UI não chama repository diretamente
- componente não concentra regra de negócio crítica
- efeitos colaterais não ficam espalhados na camada visual

### Node / Nest / Express
- rota ou controller fica fino
- regra crítica fica em service ou use case
- validação acontece na borda apropriada

### Jobs / workers / schedulers
- job orquestra fluxo, não vira depósito de regra crítica
- payload sensível não muda silenciosamente
- retry e idempotência respeitam a boundary prevista

### Persistência / ORM / banco
- persistência segue a boundary definida
- repository não concentra regra de negócio
- convenção de schema ou mapping que impacta compatibilidade exige revisão explícita

## Relação com TBDs
- lacuna que bloqueia decisão arquitetural, contratual ou de boundary abre item em `docs/TBDS.md`
- `RULES.md` não vira backlog de pendências
- referencie TBD aqui só quando a lacuna afetar regra ativa deste documento

## Referências
- `docs/INDEX.md`
- `docs/TBDS.md`
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `docs/core/CONTRACTS.md`
- `docs/core/TESTING.md`
- ADRs e docs operacionais complementares do projeto, se existirem
