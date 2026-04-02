# Índice de Documentação

## Objetivo
Organizar a leitura da documentação operacional criada e indicar a ordem prática de navegação do projeto sem substituir os docs factuais.

## Precedência documental
Use esta ordem quando houver dúvida sobre onde ler primeiro:

1. [`docs/core/*`](./core/CONTEXT.md) define o contrato global do projeto.
   Esta é a base global profunda: contexto, regras, estado, contratos e testing observáveis.
2. [`docs/units/*`](./units/_unit-template/CONTEXT.md) especializa a unit sem contrariar `core`.
   Em `repo shape = single-unit`, a ausência de `docs/units/*` pode ser a forma correta do projeto e não indica incompletude.
3. `docs/features/*` contextualiza recortes ativos sem substituir `core` ou `units`.
   Features abertas funcionam como pontos de entrada funcionais priorizados para execução.
4. `docs/decisions/*`, quando existir, registra decisões duráveis já formalizadas.
5. `docs/reference/*`, quando existir, funciona como apoio factual sob gatilho.

`docs/INDEX.md` não substitui os docs de `core`, `units` ou `features`; ele só organiza a leitura da documentação operacional criada.

## Navegação sugerida

### Visão global
1. [`docs/core/CONTEXT.md`](./core/CONTEXT.md)
2. [`docs/core/RULES.md`](./core/RULES.md)
3. [`docs/core/STATE.md`](./core/STATE.md)
4. [`docs/core/CONTRACTS.md`](./core/CONTRACTS.md)
5. [`docs/core/TESTING.md`](./core/TESTING.md)

### Visão por unit
Quando existir uma unit real, leia a sequência equivalente em `docs/units/<unit-slug>/`.
No kit base, use o template:

1. [`docs/units/_unit-template/CONTEXT.md`](./units/_unit-template/CONTEXT.md)
2. [`docs/units/_unit-template/RULES.md`](./units/_unit-template/RULES.md)
3. [`docs/units/_unit-template/STATE.md`](./units/_unit-template/STATE.md)
4. [`docs/units/_unit-template/CONTRACTS.md`](./units/_unit-template/CONTRACTS.md)
5. [`docs/units/_unit-template/TESTING.md`](./units/_unit-template/TESTING.md)

### Pontos de entrada funcionais
Quando existir feature aberta, priorize a leitura do `CONTEXT.md` da feature alvo para entrar pelo recorte funcional mais próximo da tarefa.

### Consulta dirigida
- `docs/decisions/*`, se o projeto mantiver esse conjunto
- `docs/reference/*`, se o projeto mantiver esse conjunto
