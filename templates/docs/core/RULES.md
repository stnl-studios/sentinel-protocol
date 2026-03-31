SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Rules

## 1. Regras invioláveis
Liste apenas regras que valem para o projeto inteiro.

- `<regra global 1>`
- `<regra global 2>`
- `PLAN.md` não é alterado pelo Bootstrap.
- Sem evidência, não inventar; registrar `TBD` no `CONTEXT` do escopo correto.

## 2. Stop rules
Liste situações em que o agente deve parar, bloquear ou pedir decisão antes de seguir.

- `<stop rule 1>`
- `<stop rule 2>`

## 3. Regras de mudança estrutural
Defina o que exige ADR, aprovação ou tratamento especial.

- `<mudança estrutural 1>`
- `<mudança estrutural 2>`

## 4. Regras de arquitetura
Use esta seção para leis de dependência entre camadas e fronteiras globais.

### Dependência entre camadas
- `<camada A>` não chama `<camada B>` diretamente.
- `<camada X>` fala apenas com a camada canônica definida em `docs/core/CONTRACTS.md`.

### Fronteiras entre units
- `<unit A>` não acessa `<unit B>` diretamente fora de `<contrato ou boundary>`.
- `<integração crítica>` passa apenas por `<camada ou boundary>`.

### Exceções aprovadas
- `<exceção com evidência>`

## 5. Convenções globais
Liste somente convenções que valem para todo o repo.

- `<convenção global 1>`
- `<convenção global 2>`

## 6. Restrições de execução
Registre proibições ou limites operacionais relevantes ao fluxo.

- `<restrição 1>`
- `<restrição 2>`

## 7. Referências
- `docs/core/CONTEXT.md`
- `docs/core/CONTRACTS.md`
- `docs/decisions/INDEX.md`
