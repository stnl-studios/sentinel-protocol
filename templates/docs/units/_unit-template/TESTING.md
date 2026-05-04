SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# Unit Testing

## Objetivo
Registrar como validar mudanças nesta unit: quais níveis de prova usar, quais mínimos seguir por tipo de mudança, quando smoke ou teste manual bastam, como a CI entra na validação local e quais limitações ainda existem. Este documento não deve virar catálogo exaustivo de suites ou harness.

## Política local de validação
- a prova precisa ser proporcional ao risco e ao impacto desta unit
- comportamento determinístico pede validação determinística quando houver harness viável
- falta de harness precisa ficar explícita; não fingir cobertura local
- smoke ou teste manual só bastam quando o risco local for compatível com esse nível de prova

## Níveis de prova usados na unit
| Nível | Quando usar | Prova esperada |
| --- | --- | --- |
| `unit` | `<lógica isolada, branching, transformação>` | `<suite curta e determinística>` |
| `integration` | `<módulos locais, persistência, infra encapsulada>` | `<teste com boundaries reais ou doubles controlados>` |
| `contract` | `<endpoint, payload, evento, schema ou interface pública>` | `<validação de compatibilidade local>` |
| `smoke | manual` | `<fluxo local simples ou ausência de harness>` | `<roteiro compatível com o risco>` |

## Mínimos por tipo de mudança local
- bugfix pede cobertura de regressão quando viável
- mudança contratual pede validação dos consumidores locais ou adjacentes relevantes
- mudança em regra crítica pede prova compatível com o risco, não apenas smoke
- refactor local sem mudança funcional ainda precisa provar preservação do comportamento sensível

## Seeds iniciais por classe da unit

### `app | admin | mobile`
- mudança de fluxo, estado, formulário, permissão ou erro pede prova de comportamento, não só render estático
- ajuste visual simples pode aceitar smoke ou teste manual objetivo quando o risco for baixo

### `api | bff`
- regra de negócio pede prova em service, use case ou handler canônico
- mudança de endpoint, request, response ou validação pede checagem contratual além de teste puramente interno

### `worker`
- mudança em retry, idempotência, ordenação, agendamento ou efeito externo pede prova desses comportamentos
- smoke isolado não basta para fluxo assíncrono crítico

### `package`
- API pública compartilhada pede prova de compatibilidade e comportamento esperado pelos consumidores
- helper interno pequeno pode aceitar suite unitária curta quando o risco for baixo

## Quando smoke basta
- ajuste pequeno e local, sem impacto em contrato, regra crítica, autorização, persistência ou integração sensível
- mudança cujo comportamento principal pode ser verificado honestamente com um roteiro curto e objetivo

## Quando smoke ou manual não bastam
- mudança em regra crítica, contrato, persistência, autorização, integração externa ou fluxo assíncrono sensível
- bugfix com regressão reproduzível
- alteração cujo impacto não pode ser observado honestamente com um roteiro superficial

## Quando faltar harness
- definir o menor conjunto honesto de prova local: check simples, contrato parcial, smoke ou roteiro manual verificável
- registrar o risco residual e o que ficou sem cobertura
- quando a ausência de harness bloquear validação recorrente importante, registrar a lacuna explicitamente

## Suites, comandos e paths principais
- `<comando, script, pipeline ou suite principal>`
- `<comando, script, pipeline ou suite principal>`

## CI e validação local reprodutível
- pipeline ou job relevante: `<path, job ou comando>`
- quando esta unit precisa passar em CI: `<situação>`
- observação curta sobre o que a CI local realmente cobre: `<obs>`

## Lacunas e limites de prova
- `<lacuna local de harness, cobertura, regressão ou repetibilidade>`

## Referências
- `docs/core/TESTING.md`
- `docs/units/<unit-slug>/RULES.md`
- `docs/units/<unit-slug>/STATE.md`
