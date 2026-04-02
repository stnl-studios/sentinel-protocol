---
name: stnl_project_context
description: Levanta contexto factual do projeto e materializa ou ressincroniza docs em docs/core, docs/units e docs/features com modos BOOTSTRAP e RESYNC.
---

# STNL Project Context

## Missão
Levantar contexto factual profundo e honesto do projeto e materializar memória durável reutilizável em `docs/INDEX.md`, `docs/core/*`, `docs/units/*` e `docs/features/*`.

Esta skill é um utilitário global. Ela não é um agent de workflow e deve continuar útil fora dele.

## Quando usar
- quando for preciso bootstrapar uma base documental operacional profunda a partir de evidência real
- quando for preciso ressincronizar uma feature explícita com delta factual denso e edição localizada
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
- materializar documentação factual e operacional profunda apenas em `docs/INDEX.md`, `docs/core/*`, `docs/units/*` e `docs/features/*`
- seguir a ordem `core -> units -> features`
- usar o kit documental canônico disponível no ambiente apenas como apoio de materialização
- ignorar `docs/workflow/*`

## Saídas esperadas
- navegação simples e útil em `docs/INDEX.md`, organizada para leitura operacional
- base factual profunda em `docs/core/*`, com paths, entrypoints, contratos observáveis, testing, hot paths e lacunas reais quando houver evidência suficiente
- `docs/units/*` apenas quando houver especialização útil de `unit` além do que cabe em `core`
- `docs/features/*` apenas quando houver alvo explícito ou feature canônica descoberta com evidência forte
- classificação de `repo shape`: `single-unit`, `multi-unit` ou `TBD`
- registro explícito de lacunas reais como `TBD` quando faltarem fatos
- atualização localizada no `RESYNC`, com alta densidade factual no delta tocado

## Princípios
- discovery guiado por evidência da codebase, docs existentes e paths reais
- profundidade máxima sustentável sob evidência, sem superficializar por contrato
- `TBD` ou marcação explícita de parcialidade no lugar de inferência
- blast radius mínimo
- memória durável factual, operacional e reutilizável para agents
- bootstrap para criar o que falta; resync para atualizar localmente o que já existe

## Regras de profundidade honesta e anti-alucinação
- profundidade não autoriza inventar
- quando houver evidência parcial, marcar isso explicitamente no texto
- não simular completude, inventário total ou cobertura total sem base observável
- quando a leitura vier de amostragem forte, preferir `principais pontos observados`, `paths principais` ou formulação equivalente
- quando uma área não sustentar profundidade factual suficiente, registrar a lacuna em vez de preencher com abstração vaga
- não promover hipótese fraca, convenção presumida ou naming provável a memória durável
- exaustividade só pode ser sugerida quando a evidência realmente sustentar isso

## Heurísticas de `core`
- `docs/core/*` é a base global profunda do projeto e sempre vem primeiro
- materializar a maior densidade factual útil que a evidência sustentar para entendimento global
- registrar objetivo, escopo, superfícies, paths principais, entrypoints, contratos observáveis, testing, estado global, hot paths e lacunas reais apenas por evidência
- quando faltar fato global relevante, registrar `TBD`, parcialidade ou limite de exaustividade em vez de inferir

## Heurísticas de `units`
- `units` é camada condicional
- não assuma `units` por padrão
- classificar `repo shape` e materializar `docs/units/*` são decisões separadas
- `single-unit` significa apenas zero ou uma `unit` canônica possível; não obriga abrir `docs/units/*`
- materializar `docs/units/*` exige evidência adicional de especialização factual útil que não caiba adequadamente em `docs/core/*`
- em `repo shape = single-unit`, preferir por padrão apenas `docs/INDEX.md` e `docs/core/*`
- se a única `unit` candidata coincidir essencialmente com o nome do app, serviço, API principal ou entrypoint, isso por si só não basta para abrir `unit`
- monorepo não implica `multi-unit`
- não confundir `unit` com projeto técnico, assembly, camada interna ou particionamento arquitetural
- não abrir `unit` só porque existem múltiplos projetos técnicos, pastas ou assemblies `Api`, `Application`, `Domain`, `Data`, `IoC`, `Tests`, camadas de implementação ou um entrypoint principal com nome próprio
- esses sinais podem sustentar entendimento de arquitetura global e devem ir para `docs/core/*`, mas não bastam por si só para abrir `docs/units/*`
- só promover uma área a `unit` quando houver especialização factual útil, documentalmente distinta do `core`, sustentada por pelo menos um sinal forte claro; em casos limítrofes, corroborar com mais de um sinal

Evidência suficiente para abrir `unit`:
- fronteira funcional ou de domínio claramente distinta
- superfície própria com regras, contratos, state ou testing que mereçam especialização fora de `core`
- bounded context ou módulo canônico reconhecível e recorrente
- separação que faça sentido documental e não apenas estrutural ou técnica

Sinais fortes:
- entrypoint ou runtime próprio
- deploy, build ou package próprio
- contratos próprios
- testing ou harness próprio
- regras locais próprias

Se não houver essa especialização útil, trate como superfície, área ou arquitetura interna do projeto e registre em `docs/core/*`, não como `unit`.

## Heurísticas de `features`
- `docs/features/*` é contexto local
- feature não substitui `core`
- feature também não substitui `unit` quando `unit` existir
- no `MODE=BOOTSTRAP`, mesmo sem alvo explícito, tentar discovery inicial de 0 a 3 features canônicas
- o limite absoluto no `BOOTSTRAP` é 3; abrir 0, 1, 2 ou 3 é válido, e nunca há obrigação de fechar 3
- só materializar as features mais fortes, com evidência forte e não arbitrária
- se não houver feature forte o suficiente, abrir 0 é o comportamento correto
- feature candidata deve representar comportamento funcional, superfície útil ou recorte documental reconhecível; não apenas uma camada técnica
- só criar ou atualizar feature quando houver alvo explícito, evidência clara ou necessidade prática real
- a feature tocada deve concentrar paths principais, contratos observáveis, testing local, hot paths e gaps reais sem virar mini-inventário total
- não abrir features arbitrariamente

Sinais que podem sustentar feature:
- fluxos funcionais recorrentes
- endpoints ou rotas agrupáveis por comportamento
- páginas, screens, routes ou áreas de produto
- services, handlers ou use-cases recorrentes com propósito funcional claro
- testes organizados por comportamento funcional
- contratos, schemas ou integrações que revelem um recorte funcional canônico
- módulos ou bounded contexts realmente reconhecíveis

Sinais que não bastam por si só:
- `Api`, `Application`, `Domain`, `Data`, `IoC`, `Tests`
- nomes de camada técnica
- pastas puramente arquiteturais
- entrypoint principal
- assemblies ou projetos técnicos
- nomes genéricos sem recorte funcional claro

Discovery de feature no `BOOTSTRAP`:
- fazer discovery por evidência real da codebase e de `docs/` existentes, conforme a stack observada
- usar até 3 tentativas internas de discovery para encontrar candidatas fortes antes de desistir
- não inventar agrupamentos nem promover hipótese fraca a feature materializada
- se houver candidatas de confiança média ou baixa, não abrir automaticamente; só registrar no output se isso ajudar sem poluir

## Critérios para `repo shape`
- `single-unit`: zero ou uma `unit` canônica possível
- `multi-unit`: duas ou mais `units` canônicas
- `TBD`: quando não for possível decidir honestamente com a evidência disponível

A classificação de `repo shape` não materializa `docs/units/*` sozinha; ela apenas limita quantas `units` canônicas podem existir.

## `MODE=BOOTSTRAP`
`BOOTSTRAP` é create-only absoluto.

Contrato:
- criar somente docs ausentes
- produzir documentação robusta, factual e operacionalmente útil nos arquivos novos
- buscar profundidade máxima sustentada por evidência dentro do escopo da skill
- limitar o blast radius pelo escopo documental, nunca por superficialização artificial
- poder abrir de 0 a 3 features canônicas quando houver evidência forte

Regras obrigatórias:
- antes de criar qualquer doc alvo, verificar se ele já existe
- se existir, não editar e registrar `SKIPPED`
- não usar `BOOTSTRAP` para refresh de docs existentes
- usar `RESYNC` quando a necessidade for atualização localizada
- não gerar docs vazios só para completar estrutura
- tratar `docs/INDEX.md` como índice simples da documentação operacional criada, não como expansão de escopo

Matriz do que pode ser criado:
- sempre que faltar: `docs/INDEX.md`
- sempre que faltar: `docs/core/CONTEXT.md`, `docs/core/RULES.md`, `docs/core/STATE.md`, `docs/core/CONTRACTS.md`, `docs/core/TESTING.md`
- somente com especialização útil de `unit` evidenciada além do que cabe em `core`: `docs/units/<unit-slug>/CONTEXT.md`, `RULES.md`, `STATE.md`, `CONTRACTS.md`, `TESTING.md`
- somente com evidência clara de superfície visual própria: `docs/units/<unit-slug>/UI_KIT.md`
- somente com feature alvo explícita ou feature inicial canônica com evidência forte: `docs/features/<feature-path>/CONTEXT.md`
- quando a feature for criada: `docs/features/<feature-path>/done/.gitkeep`

Regras de decisão para `BOOTSTRAP`:
- a ausência de `docs/units/*` é resultado válido e frequentemente preferível em `repo shape = single-unit`
- em `single-unit`, preferir criar apenas `docs/INDEX.md` e `docs/core/*`
- abrir `docs/units/*` apenas quando houver especialização factual útil fora de `core`
- se a única `unit` identificada coincidir essencialmente com o app, serviço, API principal ou entrypoint, manter em `core` salvo evidência adicional forte
- depois de materializar a base global profunda e decidir `units`, tentar semear de 0 a 3 features canônicas iniciais
- esse feature seeding vale para qualquer stack, inclusive frontend, backend, fullstack, `single-unit`, `multi-unit` e monorepo
- não usar `features` para compensar ausência de `unit`
- não abrir mais que 3 features no total durante o `BOOTSTRAP`
- não abrir feature a partir de camada técnica, assembly, projeto interno ou nome genérico sem recorte funcional forte

Ordem operacional:
1. ler a raiz do projeto e o `docs/` já existente
2. classificar stack, superfícies e `repo shape`
3. materializar primeiro `docs/core/*`
4. materializar `docs/INDEX.md` como navegação simples da base documental criada
5. decidir se existe evidência suficiente para materializar `units` além do `core`
6. se `repo shape = single-unit` e não houver especialização útil clara, seguir sem abrir `units`
7. abrir `units` apenas quando houver especialização factual útil evidenciada
8. fazer feature discovery inicial por evidência, com até 3 tentativas internas de discovery
9. abrir até 3 features canônicas de alta confiança
10. encerrar com saída verificável de criados, `SKIPPED`, `TBD` e candidatas não abertas quando isso for útil

## Regras de propagação controlada no `RESYNC`
`RESYNC` é o modo de atualização localizada.

Contrato:
- produzir a maior densidade factual honesta possível sobre a feature alvo e seu delta
- manter superfície mínima de edição: poucos arquivos e poucos trechos, quando isso bastar
- aprofundar factual e operacionalmente tudo o que tocar
- não reescrever tudo, não fazer refresh amplo e não responder com conteúdo raso só por ser localizado

Regras operacionais:
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
Perguntar só depois do discovery e apenas para fechar lacunas relevantes que bloqueiem a materialização factual honesta.

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
- não abrir `unit` só porque a solução tem múltiplos projetos técnicos ou camadas internas
- não tratar camada técnica ou pasta arquitetural como feature
- não reescrever arquivo inteiro se uma edição localizada resolver

## Stop conditions
- falta informação estrutural sem a qual qualquer decisão viraria chute
- a feature alvo do `RESYNC` não foi explicitada
- o delta factual do `RESYNC` está amplo demais para atualização localizada
- o pedido deriva para `docs/workflow/*` ou refresh amplo fora do escopo
- a única saída possível seria inferir fatos não sustentados pela codebase

## Procedimento operacional
### `MODE=BOOTSTRAP`
1. Ler a raiz factual do projeto-alvo e o que já existir em `docs/`.
2. Fazer discovery guiado por evidência para classificar stack, superfícies e `repo shape`.
3. Antes de cada criação, verificar existência; se existir, registrar `SKIPPED`.
4. Criar primeiro `docs/core/*`.
5. Criar `docs/INDEX.md` quando faltar.
6. Decidir se há ou não evidência suficiente para materializar `docs/units/*` além do `core`.
7. Se `repo shape = single-unit` e não houver especialização útil clara, seguir sem abrir `docs/units/*`; isso não é incompletude.
8. Criar `docs/units/*` somente para `units` com especialização útil evidenciada.
9. Fazer feature discovery inicial por evidência da codebase e `docs/` existentes, com até 3 tentativas internas de discovery.
10. Criar `docs/features/*` somente para feature alvo explícita ou para até 3 features canônicas de alta confiança.
11. Se as candidatas forem fracas, conflitantes ou genéricas, não materializar.
12. Registrar `TBD` apenas onde a lacuna afeta entendimento durável.

### `MODE=RESYNC`
1. Confirmar a feature alvo explícita.
2. Ler a feature alvo e apenas o entorno necessário para sustentar profundidade factual honesta sobre o delta.
3. Corrigir o drift factual nos trechos certos da feature, sem refresh amplo.
4. Propagar no máximo uma camada acima apenas se a mudança afetar `unit` ou `core`.
5. Encerrar com edição localizada e profundidade máxima sustentada no que foi tocado.

## Formato de saída operacional da skill
Use saída curta, verificável e factual.

### Para `BOOTSTRAP`
- `MODE`
- `repo shape`
- `docs criadas`
- `docs SKIPPED`
- `índice criado`, se houver
- `units abertas` ou `none`, quando não houver especialização útil suficiente; isso é especialmente normal em `single-unit`
- `features abertas` ou `none`, quando não houver candidatas fortes o suficiente
- `features candidatas não abertas`, se houver e se isso ajudar sem poluir
- `TBDs relevantes`

### Para `RESYNC`
- `MODE`
- `feature alvo`
- `docs atualizadas`
- `camada adicional tocada`, se houver
- `delta factual sincronizado`
- `limites mantidos`
