SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# Unit Rules

## Objetivo
Registrar invariantes, boundaries obrigatórias, proibições arquiteturais e stop rules locais da unit sem contrariar `docs/core/RULES.md`.

## Como preencher
- registrar aqui apenas regras reais da unit, decisões locais vigentes e restrições que precisam ser preservadas
- quando ainda não houver confirmação local suficiente, usar os seeds abaixo como base de trabalho e ajustar, confirmar ou remover por evidência
- não usar este documento para explicar artefatos documentais, lacunas de discovery ou governança genérica

## Invariantes locais
- `<invariante local 1>`
- `<invariante local 2>`

## Boundaries obrigatórias locais
- `<boundary local entre presentation, application, domínio, dados, integrações ou similar>`
- `<boundary local entre módulos ou responsabilidades>`

## Proibições locais
- `<atalho ou acoplamento que esta unit não admite>`
- `<regra crítica não pode ficar neste ponto>`

## Seeds iniciais por classe da unit

### `app | admin | mobile`
- componente, page, screen ou container não concentra regra de negócio crítica
- UI não chama repository, client de infra ou acesso a dados diretamente sem boundary prevista
- estado de apresentação e orquestração de caso de uso precisam ter separação clara quando o projeto usar essas camadas

### `api | bff`
- controller, route, endpoint handler ou minimal API não concentra regra de negócio crítica
- validação de entrada acontece na borda apropriada
- acesso a dados e integrações externas seguem a boundary definida pela unit

### `worker`
- job, consumer ou scheduler orquestra fluxo, mas não vira depósito de regra crítica
- side effects externos, retry e idempotência ficam encapsulados conforme a boundary prevista
- payload sensível não muda silenciosamente quando houver consumidores relevantes

### `package`
- API pública da package precisa ter fronteira clara e compatibilidade explícita quando houver consumidores externos
- utilitário compartilhado não deve absorver regra de domínio que pertence a uma superfície específica

## Mudanças sensíveis que exigem revisão explícita
- mudança em contrato local exige revisar consumidores e producers relevantes
- mudança em regra crítica exige confirmar ponto canônico de implementação
- mudança em autorização, persistência ou integração externa exige verificar se a boundary continua íntegra

## Stop rules locais
- parar quando a mudança atravessar boundary local sem decisão explícita
- parar quando a solução empurrar regra crítica para UI, borda ou adapter por conveniência
- parar quando houver quebra contratual local sem revisão dos consumidores relevantes
- parar quando a validação exigida pelo risco da mudança não puder ser sustentada

## Referências
- `docs/core/RULES.md`
- `docs/core/CONTRACTS.md`
- `docs/units/<unit-slug>/CONTEXT.md`
- `docs/units/<unit-slug>/STATE.md`
- `docs/units/<unit-slug>/CONTRACTS.md` quando existir
