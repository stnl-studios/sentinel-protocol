SCOPE: unit
UNIT: <unit-slug>
LAST UPDATED: YYYYMMDD

# Rules

## 1. Regras invioláveis da unit
Liste regras que valem apenas para esta unit.

- `<regra local 1>`
- `<regra local 2>`

## 2. Stop rules locais
Registre quando é necessário parar antes de alterar esta unit.

- `<stop rule local 1>`
- `<stop rule local 2>`

## 3. Boundaries locais
Defina o que pertence a esta unit e o que deve ficar fora dela.

- `<boundary local 1>`
- `<boundary local 2>`

## 4. Regras de arquitetura
Use esta seção para leis de dependência entre camadas e restrições locais.

### Dependência entre camadas
- `<camada A>` não chama `<camada B>` diretamente.
- `UI` chama apenas `<camada canônica>`.
- `<camada de persistência>` não contém `<tipo de regra>`.

### Fronteiras locais
- `<módulo>` não acessa `<módulo ou serviço>` fora de `<boundary>`.
- `<integração>` passa apenas por `<adapter | service | facade | TBD>`.

### Exceções aprovadas
- `<exceção com evidência>`

## 5. Convenções locais
Registre somente padrões detectados nesta unit.

- `<convenção local 1>`
- `<convenção local 2>`

## 6. Regras de mudança
Liste o que pode ser alterado com segurança e o que exige decisão.

- `<mudança segura>`
- `<mudança que exige decisão>`

## 7. Dependências sensíveis
- `<dependência sensível 1>`
- `<dependência sensível 2>`

## 8. Referências
- `docs/core/RULES.md`
- `docs/units/<unit-slug>/CONTEXT.md`
- `docs/units/<unit-slug>/CONTRACTS.md` quando existir
