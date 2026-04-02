SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Rules

## Objetivo
Registrar invariantes do projeto, proibições arquiteturais, boundaries obrigatórias e stop rules reais. Este documento não deve virar guia de documentação nem inventário estrutural.

## Como preencher
- registrar aqui apenas regras reais do projeto, decisões arquiteturais vigentes e restrições que precisam ser preservadas
- quando ainda não houver confirmação local suficiente, usar os seeds abaixo apenas como base de trabalho e ajustar, confirmar ou remover por evidência
- não promover seed genérico a fato do projeto sem sustentação observável

## Invariantes globais
- `<invariante de domínio, arquitetura ou operação que deve permanecer verdadeiro>`
- `<invariante de domínio, arquitetura ou operação que deve permanecer verdadeiro>`
- mudanças de contrato, boundary ou integração sensível exigem revisão explícita dos consumidores relevantes

## Boundaries obrigatórias
- `<boundary que separa apresentação, aplicação, domínio, dados, integrações ou outra fronteira obrigatória>`
- validação de entrada acontece na borda apropriada
- acesso a infra segue as boundaries previstas e não contamina camadas acima sem mediação clara

## Proibições arquiteturais
- `<acoplamento ou atalho que o projeto não admite>`
- não concentrar regra crítica de negócio em controllers, rotas, telas, componentes ou adapters de borda
- não espalhar regra crítica entre múltiplos adapters ou integrações sem ponto claro de orquestração
- não introduzir breaking change contratual silenciosa

## Seeds iniciais por stack ou superfície

### UI web, Angular, React ou Next
- UI não chama repository, client de infra ou acesso a dados diretamente sem boundary prevista
- componente, page, screen ou route não concentra regra de negócio crítica
- presentation, application e data precisam ter fronteira clara quando o projeto usar essas camadas

### Backend em geral
- validação de entrada acontece na borda apropriada antes de a regra avançar para camadas internas
- contratos não quebram silenciosamente; mudança relevante pede revisão de compatibilidade e consumidores
- integrações externas ficam encapsuladas em boundary própria, não espalhadas pela lógica central

### .NET, APIs ou BFFs
- controller, endpoint handler ou minimal API não concentra regra de negócio crítica
- regra de negócio não fica em camada de borda nem em mapeamentos ad hoc
- acesso a dados segue a boundary definida pelo projeto, sem atalhos a partir da borda

### Jobs, workers ou consumers
- job, consumer ou scheduler orquestra fluxo, mas não vira depósito de regra de negócio
- payload de entrada e saída precisa ter dono claro e compatibilidade explícita quando houver consumidores externos
- efeitos externos, retry e idempotência precisam respeitar a boundary prevista pelo projeto

## Mudanças sensíveis que exigem revisão explícita
- mudança de contrato exige revisar consumidores, producers, schemas, DTOs ou payloads afetados
- mudança em regra crítica exige confirmar ponto canônico de implementação e evitar duplicação acidental
- mudança em acesso a dados, integração externa ou autorização exige verificar se a boundary prevista continua íntegra

## Stop rules reais
- parar quando a mudança exigir quebrar uma boundary sem decisão explícita
- parar quando a solução espalhar regra crítica por borda, adapter ou UI por conveniência
- parar quando houver breaking change contratual sem validação dos consumidores relevantes
- parar quando a validação exigida pelo risco da mudança não puder ser sustentada

## Referências
- `docs/INDEX.md`
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `docs/core/CONTRACTS.md`
- `docs/core/TESTING.md`
- ADRs e docs operacionais complementares do projeto, se existirem
