# Índice de Documentação

## Objetivo
Organizar a leitura da documentação do projeto e indicar a ordem prática de navegação sem substituir os docs factuais.

## Papel de cada documento
- `CONTEXT.md` explica o que o projeto ou recorte é, qual domínio cobre, quais superfícies existem e quais lacunas factuais ainda permanecem.
- `RULES.md` registra regras ativas do projeto: invariantes reais, stop rules, mudança estrutural, dependência entre camadas, fronteiras e seeds separados das regras confirmadas.
- `STATE.md` mapeia o que existe hoje: entrypoints, paths, módulos, jobs, pipelines, testes e superfícies observáveis.
- `CONTRACTS.md` registra padrões, convenções e localização dos contratos relevantes sem virar catálogo massivo.
- `TESTING.md` define estratégia de validação, níveis de teste, mínimos por tipo de mudança e política de regressão.
- `TBDS.md` consolida lacunas arquiteturais, contratuais ou de boundary que ainda pedem decisão explícita. Ele é o consolidado canônico, mas não precisa ser leitura obrigatória em toda demanda normal.

`docs/INDEX.md` não substitui nenhum desses documentos; ele só organiza a leitura.

## Precedência documental
Use esta ordem quando houver dúvida sobre onde ler primeiro:

1. [`docs/core/*`](./core/CONTEXT.md) define a base global do projeto.
   Aqui ficam o contexto global, as regras globais, o estado global, os padrões de contrato e a estratégia global de validação.
2. `docs/units/*` especializa áreas documentadas sem contrariar `core`.
   Em `repo shape = single-unit`, a ausência de `docs/units/*` pode ser a forma correta do projeto e não indica incompletude.
3. `docs/features/*` contextualiza recortes ativos sem substituir `core` ou `units`.
   Features abertas funcionam como pontos de entrada funcionais priorizados para manutenção e evolução, sem absorver regras, contratos ou política de teste estável.

## Navegação sugerida

### Visão global
1. [`docs/core/CONTEXT.md`](./core/CONTEXT.md)
2. [`docs/core/RULES.md`](./core/RULES.md)
3. [`docs/core/STATE.md`](./core/STATE.md)
4. [`docs/core/CONTRACTS.md`](./core/CONTRACTS.md)
5. [`docs/core/TESTING.md`](./core/TESTING.md)

### Visão por unit
Quando existir uma unit documentada, leia a sequência equivalente em `docs/units/<unit-slug>/`:

1. `docs/units/<unit-slug>/CONTEXT.md`
2. `docs/units/<unit-slug>/RULES.md`
3. `docs/units/<unit-slug>/STATE.md`
4. `docs/units/<unit-slug>/CONTRACTS.md`
5. `docs/units/<unit-slug>/TESTING.md`

Se o projeto não tiver `docs/units/*`, siga pela visão global em `docs/core/*`.

### Pontos de entrada funcionais
Quando existir feature documentada, priorize a leitura de `docs/features/<feature-path>/CONTEXT.md` para entrar pelo recorte funcional mais próximo da tarefa.

### Consulta dirigida
- começar por `docs/core/CONTEXT.md` para entender o domínio e o escopo observável
- ler `docs/core/RULES.md` para saber o que precisa ser preservado
- usar `docs/core/STATE.md` para localizar paths, entrypoints e testes existentes
- consultar `docs/core/CONTRACTS.md` para padrões e localizações de contrato
- usar `docs/core/TESTING.md` para decidir como validar a mudança
- consultar [`docs/TBDS.md`](./TBDS.md) em discovery, bootstrap, resync ou quando houver ambiguidade arquitetural, conflito de padrão, lacuna contratual ou dúvida de boundary
- descer para `docs/units/*` quando houver fronteira local clara
- usar `docs/features/*` para fluxos funcionais específicos
