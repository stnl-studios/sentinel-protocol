---
name: stnl_project_context
description: Levanta contexto factual do projeto e materializa ou ressincroniza docs em docs/core, docs/units e docs/features com modos BOOTSTRAP e RESYNC.
---

# STNL Project Context

## Missão
Levantar contexto factual do projeto e reduzir releitura desnecessária da codebase ao materializar e manter contexto reutilizável em `docs/core/*`, `docs/units/*` e `docs/features/*`.

Esta skill é um utilitário global. Ela não é um agent do workflow e deve continuar útil mesmo fora dele.

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

## Fontes e camadas
Distinga sempre estas três camadas:

1. `templates/docs/*`
Fonte central compartilhada do kit documental. Esta skill pode consultar essa fonte como referência canônica. Não duplique essa fonte por padrão e não mude seu ownership.

2. reference ou bundle local da skill
No estado atual deste repositório, o fluxo explícito via `sentinel.mjs` pode preparar esse apoio local em `reference/docs/` durante `init` e `update`, com suporte de `doctor`. Use-o apenas como apoio instalado quando ele realmente existir e não mude o ownership de `templates/docs/*`.

3. `docs/*` do projeto-alvo
É a materialização consumível por prompts, agents e leituras sob demanda:
- `docs/core/*`
- `docs/units/*`
- `docs/features/*`

Ignore `docs/workflow/*` nesta skill.

## Modos suportados
- `MODE=BOOTSTRAP`
- `MODE=RESYNC`

## Entradas esperadas
### Comuns
- raiz do projeto-alvo
- evidência factual observável no repositório
- contexto documental já existente em `docs/`, se houver
- `templates/docs/*` como referência canônica compartilhada

### `MODE=BOOTSTRAP`
- projeto-alvo a ser levantado
- escopo de leitura inicial suficiente para classificar `core`, `units` e shape do repo

### `MODE=RESYNC`
- `MODE=RESYNC`
- feature alvo explícita
- delta factual explícito ou evidência suficiente para localizar drift documental

## Saídas esperadas
- base factual útil em `docs/core/*`
- `docs/units/*` apenas quando houver `unit` real
- `docs/features/*` apenas quando houver alvo ou evidência clara
- classificação de `repo shape`: `single-unit`, `multi-unit` ou `TBD`
- registro explícito de lacunas reais como `TBD` quando faltarem fatos
- atualização mínima e localizada no `RESYNC`

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

## Heurísticas de `reference`
- `reference` é apoio estável e consulta sob demanda
- não trate `reference` como memória viva principal do projeto
- nesta skill, qualquer bundle local de referência depende do fluxo explícito de install/update do repositório
- não modele a materialização principal desta skill como cópia para `docs/reference`

## Critérios para `repo shape`
- `single-unit`: zero ou uma `unit` canônica
- `multi-unit`: duas ou mais `units` canônicas
- `TBD`: quando não for possível decidir honestamente com a evidência disponível

## Regras de materialização mínima
### `MODE=BOOTSTRAP`
- começar por `docs/core/*`
- garantir a base útil em `core`
- criar `units` somente com evidência suficiente
- criar docs de feature somente com alvo, evidência clara ou necessidade prática real
- não gerar docs vazias só para completar estrutura
- não inflar documentação
- não inventar fatos
- manter blast radius mínimo

## Regras de propagação mínima no `RESYNC`
- começar e terminar na feature alvo
- por padrão, tocar apenas a camada da feature
- subir para `unit` só se a mudança alterar regra, contrato, state ou testing útil daquela `unit`
- subir para `core` só se a mudança alterar regra global, contrato global, convenção global ou shape do projeto
- limite padrão: no máximo 1 camada acima da feature, salvo justificativa explícita
- nunca aproveitar `RESYNC` para refresh amplo
- nunca reescrever documentação inteira se uma edição localizada resolver

## Restrições e proibições
- não puxar nada do legado
- não considerar `docs/workflow/*`
- não inventar templates
- não inventar paths
- não inventar scripts
- não inventar hooks
- não inventar convenções
- não inventar mecanismos além do fluxo explícito já suportado pelo repositório
- não duplicar `templates/docs/*` por padrão
- não tratar hipótese como memória durável
- não tocar áreas fora do escopo sem necessidade direta
- não assumir `units` por padrão
- não assumir `multi-unit` só porque é monorepo
- não reescrever arquivo inteiro se uma edição localizada resolver

## Stop conditions
- não existe evidência suficiente para afirmar o shape do repo e também não é honesto manter `TBD`
- a feature alvo do `RESYNC` não foi explicitada
- o delta factual do `RESYNC` está amplo demais para atualização mínima
- a atualização exigiria inventar comportamento fora do fluxo explícito já suportado pelo repositório
- o pedido deriva para `docs/workflow/*`, legado ou refresh amplo fora do escopo
- a única saída possível seria inferir fatos não sustentados pelo repositório

## Procedimento operacional
### `MODE=BOOTSTRAP`
1. Ler a raiz factual do projeto-alvo e o que já existir em `docs/`.
2. Consultar `templates/docs/*` apenas como fonte central compartilhada de referência.
3. Materializar primeiro `docs/core/*`.
4. Classificar o shape do repo.
5. Criar `docs/units/*` somente se houver evidência suficiente de `unit` real.
6. Criar ou atualizar `docs/features/*` somente quando houver alvo claro, evidência clara ou necessidade prática real.
7. Registrar `TBD` apenas onde a lacuna afeta entendimento durável.

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
- `docs criadas ou atualizadas`
- `units abertas`
- `features abertas ou atualizadas`
- `TBDs relevantes`

### Para `RESYNC`
- `MODE`
- `feature alvo`
- `docs atualizadas`
- `camada adicional tocada`, se houver
- `delta factual sincronizado`
- `limites mantidos`

## Observação sobre install/update
No estado atual deste repositório, `sentinel.mjs` já fornece fluxo explícito de `init`, `update` e `doctor`, e esse fluxo pode preparar o bundle local de apoio em `reference/docs/` sem mudar o ownership de `templates/docs/*`. A instalação não materializa `docs/` no projeto-alvo; a skill continua responsável apenas pela materialização factual mínima quando for acionada.
