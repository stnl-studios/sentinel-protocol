SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Testing

## Objetivo
Registrar a política e a estratégia global de validação do projeto: quais níveis de teste existem, quando usar cada um, quais mínimos seguir por tipo de mudança, quando smoke ou teste manual bastam e como a CI participa da prova. Este documento não deve virar catálogo exaustivo de suites ou harness.

## Política de validação
- a prova deve ser proporcional ao risco da mudança
- comportamento determinístico pede validação determinística quando houver harness viável
- smoke, teste manual ou evidência operacional só bastam quando o risco for compatível com esse nível de prova
- falta de harness não autoriza fingir cobertura; a limitação precisa ficar explícita
- CI ajuda a sustentar o mínimo reprodutível, mas não substitui análise de risco nem prova local adequada

## Níveis de validação
| Nível | Quando usar | Prova esperada |
| --- | --- | --- |
| `unit` | `<regras locais, branching, comportamento isolado>` | `<suite curta e determinística>` |
| `integration` | `<integração entre módulos, persistência, infra encapsulada>` | `<teste com boundaries reais ou doubles controlados>` |
| `contract` | `<mudança de DTO, endpoint, evento, schema ou integração>` | `<validação de compatibilidade, consumer ou producer>` |
| `e2e | smoke | manual` | `<fluxo crítico, prova operacional ou falta de harness>` | `<roteiro compatível com o risco>` |

## Mínimos por tipo de mudança
- bugfix pede cobertura de regressão quando viável
- mudança contratual pede validação dos consumidores relevantes e compatibilidade explícita
- mudança em regra crítica pede prova compatível com o risco, não apenas smoke
- refactor sem mudança funcional ainda precisa provar que o comportamento sensível foi preservado
- mudança operacional, pipeline ou infra pede validação do caminho afetado e do fallback quando houver

## Seeds iniciais por stack ou superfície

### Angular, React, Next ou UI web
- mudanças visuais simples podem aceitar smoke ou teste manual objetivo quando o risco for baixo
- mudança de estado, fluxo de formulário, permissões, carregamento ou erro pede prova de interação e comportamento
- boundary entre UI, application e data precisa ser exercitada ao menos no nível mais barato que detecte regressão real

### Backend em geral, Node ou .NET
- regra de negócio pede prova em service, use case ou handler canônico
- mudança de endpoint, DTO ou schema pede validação contratual além de teste puramente interno
- integração externa sensível pede cobertura de sucesso, erro e fallback compatível com o risco

### Jobs, workers e consumers
- mudanças em retry, idempotência, ordenação ou efeitos externos pedem prova desses comportamentos
- payload de entrada e saída precisa ser validado quando houver producer ou consumer relevante
- smoke isolado não basta para fluxos assíncronos críticos

## Quando smoke basta
- mudança pequena e local, sem alteração de contrato, regra crítica, autorização, persistência ou integração sensível
- ajuste cosmético ou operacional de baixo risco com comportamento principal preservado

## Quando smoke não basta
- mudança em regra de negócio, autorização, persistência, contrato, integração externa ou fluxo crítico
- bugfix que já demonstrou regressão reproduzível
- alteração cujo impacto não pode ser observado honestamente com um roteiro superficial

## Quando teste manual é aceitável
- quando não houver harness viável e o risco estiver controlado por escopo, roteiro objetivo e evidência observável
- quando a checagem necessária for exploratória, visual ou operacional e a automação não se pagar ainda
- sempre registrar limites do teste manual quando ele não cobrir regressão de forma reprodutível

## Quando faltar harness
- definir o menor conjunto honesto de prova: check simples, smoke, contrato parcial ou roteiro manual verificável
- explicitar o que ficou sem cobertura e qual risco residual permanece
- quando a ausência de harness bloquear validação recorrente importante, registrar isso como dívida ou marco separado

## Suites, comandos e paths principais
Registrar apenas comandos, pipelines e paths realmente existentes.

- `<comando, script, pipeline ou suite principal>`
- `<comando, script, pipeline ou suite principal>`

## CI e validação reprodutível
- pipeline principal: `<path, job ou comando>`
- gatilhos obrigatórios ou recomendados: `<quando CI precisa rodar>`
- observação curta sobre cobertura real da CI: `<o que a CI garante e o que não garante>`

## Lacunas e limites de prova
- `<lacuna real de harness, cobertura, regressão ou repetibilidade>`

## Referências
- `docs/INDEX.md`
- `docs/core/STATE.md`
- `docs/core/CONTRACTS.md`
- docs de unit aplicáveis
- docs operacionais complementares do projeto, se existirem
