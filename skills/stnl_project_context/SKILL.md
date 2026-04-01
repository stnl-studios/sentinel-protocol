---
name: stnl_project_context
description: Levanta contexto factual do projeto e materializa ou ressincroniza docs em docs/core, docs/units e docs/features com modos BOOTSTRAP e RESYNC.
---

# STNL Project Context

## Missão
Levantar contexto factual mínimo do projeto e materializar memória durável reutilizável em `docs/INDEX.md`, `docs/core/*`, `docs/units/*` e `docs/features/*`.

Esta skill é um utilitário global. Ela não é um agent de workflow e deve continuar útil fora dele.

## Quando usar
- quando for preciso bootstrapar a base documental factual mínima de um projeto
- quando for preciso ressincronizar uma feature explícita com delta documental mínimo
- quando prompts ou agents precisarem de contexto reutilizável em `docs/`
- quando a releitura ampla da codebase estiver custosa e a base documental ainda estiver ausente, incompleta ou em drift

## Quando não usar
- para tocar `docs/workflow/*`
- para conduzir planning, execução, validação ou fechamento de rodada como agent de workflow
- para reescrever documentação inteira por conveniência
- para abrir `units` sem evidência suficiente
- para criar features arbitrárias sem alvo claro
- para transformar hipótese, intenção ou recomendação em memória durável

## Modos suportados
- `MODE=BOOTSTRAP`
- `MODE=RESYNC`

## Escopo operacional
- materializar apenas o kit factual mínimo em `docs/INDEX.md`, `docs/core/*`, `docs/units/*` e `docs/features/*`
- seguir a ordem `core -> units -> features`
- usar o kit documental canônico disponível no ambiente apenas como apoio de materialização
- ignorar `docs/workflow/*`

## Saídas esperadas
- navegação mínima factual em `docs/INDEX.md`
- base factual útil em `docs/core/*`
- `docs/units/*` apenas quando houver `unit` real
- `docs/features/*` apenas quando houver alvo ou evidência clara
- classificação de `repo shape`: `single-unit`, `multi-unit` ou `TBD`
- registro explícito de lacunas reais como `TBD` quando faltarem fatos
- atualização mínima e localizada no `RESYNC`

## Princípios
- discovery guiado por evidência da codebase, docs existentes e paths reais
- `TBD` no lugar de inferência
- blast radius mínimo
- memória durável curta, factual e reutilizável
- bootstrap para criar o que falta; resync para atualizar o que já existe

## Heurísticas de `core`
- `docs/core/*` é a base global do projeto e sempre vem primeiro
- materialize apenas o mínimo útil para entendimento global
- registre objetivo, escopo, superfícies, contratos, testing e estado global apenas por evidência
- quando faltar fato global relevante, registre `TBD` em vez de inferir

## Heurísticas de `units`
- `units` é camada condicional
- não assuma `units` por padrão
- monorepo não implica `multi-unit`
- só promover uma área a `unit` quando houver papel próprio claro e pelo menos 2 sinais fortes

Sinais fortes:
- entrypoint ou runtime próprio
- deploy, build ou package próprio
- contratos próprios
- testing ou harness próprio
- regras locais próprias

Se não houver evidência suficiente, trate como superfície ou área do projeto, não como `unit`.

## Heurísticas de `features`
- `docs/features/*` é contexto local
- feature não substitui `core`
- feature também não substitui `unit` quando `unit` existir
- só criar ou atualizar feature quando houver alvo explícito, evidência clara ou necessidade prática real
- não abrir features arbitrariamente

## Critérios para `repo shape`
- `single-unit`: zero ou uma `unit` canônica
- `multi-unit`: duas ou mais `units` canônicas
- `TBD`: quando não for possível decidir honestamente com a evidência disponível

## `MODE=BOOTSTRAP`
`BOOTSTRAP` é create-only absoluto.

Regras obrigatórias:
- antes de criar qualquer doc alvo, verificar se ele já existe
- se existir, não editar e registrar `SKIPPED`
- não usar `BOOTSTRAP` para refresh de docs existentes
- usar `RESYNC` quando a necessidade for atualização mínima localizada
- não gerar docs vazios só para completar estrutura
- tratar `docs/INDEX.md` como navegação mínima do kit base, não como expansão de escopo

Matriz do que pode ser criado:
- sempre que faltar: `docs/INDEX.md`
- sempre que faltar: `docs/core/CONTEXT.md`, `docs/core/RULES.md`, `docs/core/STATE.md`, `docs/core/CONTRACTS.md`, `docs/core/TESTING.md`
- somente com `unit` real evidenciada: `docs/units/<unit-slug>/CONTEXT.md`, `RULES.md`, `STATE.md`, `CONTRACTS.md`, `TESTING.md`
- somente com evidência clara de superfície visual própria: `docs/units/<unit-slug>/UI_KIT.md`
- somente com feature alvo clara ou feature inicial com evidência suficiente: `docs/features/<feature-path>/CONTEXT.md`
- quando a feature for criada: `docs/features/<feature-path>/done/.gitkeep`

Ordem operacional:
1. ler a raiz do projeto e o `docs/` já existente
2. classificar stack, superfícies e `repo shape`
3. materializar primeiro `docs/core/*`
4. materializar `docs/INDEX.md` como navegação mínima do kit base
5. abrir `units` reais, se houver
6. abrir features iniciais apenas quando houver alvo claro ou evidência suficiente
7. encerrar com saída verificável de criados, `SKIPPED` e `TBD`

## Regras de propagação mínima no `RESYNC`
`RESYNC` é o modo de atualização mínima localizada.

- começar e terminar na feature alvo
- por padrão, tocar apenas a camada da feature
- subir para `unit` só se a mudança alterar regra, contrato, state ou testing útil daquela `unit`
- subir para `core` só se a mudança alterar regra global, contrato global, convenção global ou shape do projeto
- limite padrão: no máximo 1 camada acima da feature, salvo justificativa explícita
- nunca aproveitar `RESYNC` para refresh amplo
- nunca reescrever documentação inteira se uma edição localizada resolver

## Heurísticas práticas por stack
Aplicar somente com evidência. Se os sinais forem conflitantes ou insuficientes, registrar `TBD`.

### Angular
- detectar por `angular.json` e/ou dependências `@angular/*`
- buscar evidências em `src/app`, `modules`, `pages`, `shared`, `core`, `services`, `facades`, `repositories`, `validators` e `*.spec.ts`
- registrar apenas padrões, contratos e regras realmente observáveis

### React
- detectar por `react` e `react-dom`
- buscar evidências em `components`, `pages`, `screens`, `routes`, `features`, hooks `use*`, stores, schemas e testes
- registrar organização, termos canônicos e estratégia de validação sem inventar convenções

### Next.js
- detectar por dependência `next` e/ou `next.config*`
- diferenciar `app router` e `pages router` por evidência
- verificar `app/api`, `pages/api` e server actions para distinguir FE de FS
- se coexistirem padrões concorrentes, registrar `TBD`

### Node TypeScript
- detectar por `package.json` com `typescript` e runtime/backend evidenciado
- buscar evidências em `controllers`, `routes`, `handlers`, `services`, `use-cases`, validação, `db`, migrations, scripts e testes
- registrar contratos, camadas e testing apenas quando existirem com path real

### C#/.NET
- detectar por `.sln` ou `.csproj`
- buscar evidências em `Program.cs`, `controllers`, minimal APIs, `services`, `dtos`, `validators`, handlers, migrations e projetos de teste
- registrar arquitetura e testing com base no que a codebase realmente expõe

## Entrevista guiada mínima
Perguntar só depois do discovery e apenas para fechar lacunas relevantes que bloqueiem a materialização factual mínima.

Limites:
- no máximo 2 rodadas curtas por execução
- no máximo o necessário para fechar tipo do projeto, objetivo, prioridade de feature ou forma de testar
- se a resposta não vier ou continuar inconclusiva, registrar `TBD` e seguir dentro do escopo seguro

## Restrições e proibições
- não considerar `docs/workflow/*`
- não inventar templates
- não inventar paths
- não inventar scripts
- não inventar hooks
- não inventar convenções
- não inventar mecanismo fora do contrato da skill e do ambiente disponível
- não duplicar o kit documental canônico por padrão
- não tratar hipótese como memória durável
- não tocar áreas fora do escopo sem necessidade direta
- não assumir `units` por padrão
- não assumir `multi-unit` só porque é monorepo
- não reescrever arquivo inteiro se uma edição localizada resolver

## Stop conditions
- falta informação estrutural sem a qual qualquer decisão viraria chute
- a feature alvo do `RESYNC` não foi explicitada
- o delta factual do `RESYNC` está amplo demais para atualização mínima
- o pedido deriva para `docs/workflow/*` ou refresh amplo fora do escopo
- a única saída possível seria inferir fatos não sustentados pela codebase

## Procedimento operacional
### `MODE=BOOTSTRAP`
1. Ler a raiz factual do projeto-alvo e o que já existir em `docs/`.
2. Fazer discovery guiado por evidência para classificar stack, superfícies e `repo shape`.
3. Antes de cada criação, verificar existência; se existir, registrar `SKIPPED`.
4. Criar primeiro `docs/core/*`.
5. Criar `docs/INDEX.md` quando faltar.
6. Criar `docs/units/*` somente para `units` reais.
7. Criar `docs/features/*` somente para features com alvo claro ou evidência suficiente.
8. Registrar `TBD` apenas onde a lacuna afeta entendimento durável.

### `MODE=RESYNC`
1. Confirmar a feature alvo explícita.
2. Ler apenas a feature alvo e o mínimo necessário ao redor dela.
3. Corrigir o drift factual na feature.
4. Propagar no máximo uma camada acima apenas se a mudança afetar `unit` ou `core`.
5. Encerrar sem refresh amplo.

## Formato de saída operacional da skill
Use saída curta, verificável e factual.

### Para `BOOTSTRAP`
- `MODE`
- `repo shape`
- `docs criadas`
- `docs SKIPPED`
- `navegação mínima criada`, se houver
- `units abertas`
- `features abertas`
- `TBDs relevantes`

### Para `RESYNC`
- `MODE`
- `feature alvo`
- `docs atualizadas`
- `camada adicional tocada`, se houver
- `delta factual sincronizado`
- `limites mantidos`
