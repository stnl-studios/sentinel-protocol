# Sentinel Plan Blueprint

Version: 2026.3.1  
Status: Active  
Protocol line: 2026.3

## Propósito

`sentinel_plan_blueprint` é a skill dona do ciclo de vida do `PLAN.md` no Sentinel Protocol.

Ela existe para abrir o primeiro plano quando ainda não há `PLAN.md` da unidade alvo e para reciclar o plano após o fechamento da execução, sempre mantendo horizonte curto e detalhando apenas o `Escopo ativo`.

---

## Onde entra no fluxo

Fluxo canônico:

1. `sentinel_plan_blueprint MODE=CREATE`
2. `sentinel_prompt_preflight`
3. executor (Plano) -> `PLAN OUTPUT`
4. `OK {ID}`
5. executor (Execução) -> `EXECUTE OUTPUT`
6. `sentinel_phase_closure`
7. `sentinel_plan_blueprint MODE=RECYCLE`
8. `sentinel_prompt_preflight`
9. executor

> O Blueprint não executa implementação. Ele prepara e recompõe o `PLAN.md` para o ciclo correto.

---

## O que faz

`sentinel_plan_blueprint`:

1. cria o `PLAN.md` inicial em `MODE=CREATE`
2. recicla o `PLAN.md` em `MODE=RECYCLE`
3. reorganiza `Escopo ativo`, `Bloco seguinte` e `Bloco posterior`
4. detalha apenas o `Escopo ativo`
5. mantém horizonte curto
6. trata `PLAN.md` na raiz apenas como fallback provisório
7. é o único dono do ciclo de vida do `PLAN.md`

---

## O que não faz

Não faz:

1. execução
2. fechamento da execução
3. criação de `DONE`
4. atualização principal de `CONTEXT`, `STATE` ou ADR
5. replanejamento completo da feature
6. backlog longo ou histórico longo
7. consolidação documental pós-execução

---

## Quando usar

### Use `MODE=CREATE` quando

- ainda não existe `PLAN.md` para a unidade alvo
- a demanda já pede recorte operacional curto
- você precisa abrir o primeiro ciclo formal do plano

### Use `MODE=RECYCLE` quando

- já houve execução e `sentinel_phase_closure`
- o fluxo continua na mesma frente
- o próximo ciclo precisa de novo `Escopo ativo`

---

## Entradas e saídas

### Entradas

1. demanda ou frente que precisa de plano
2. `PLAN.md` existente da unidade alvo, quando houver recycle
3. fechamento anterior da execução, quando houver `MODE=RECYCLE`
4. evidências suficientes para resolver a unidade alvo ou assumir fallback provisório

### Saídas

1. `PLAN.md` inicial em `MODE=CREATE`
2. `PLAN.md` reciclado em `MODE=RECYCLE`
3. plano recomposto com o novo `Escopo ativo` detalhado
4. resultado `SKIPPED` ou `BLOCKED` quando as pré-condições não forem satisfeitas

---

## Modos operacionais

### `MODE=CREATE`

Usar quando não existe `PLAN.md` para a unidade alvo.

Regras:

1. organizar a demanda em horizonte curto
2. detalhar o `Escopo ativo`
3. manter `Bloco seguinte` curto
4. usar `Bloco posterior` apenas se houver base suficiente
5. criar exatamente 1 `PLAN.md`
6. se o plano alvo já existir, devolver `SKIPPED`

### `MODE=RECYCLE`

Usar após `sentinel_phase_closure`.

Regras:

1. usar esta precedência de base: `PLAN.md` atual -> último `PHASE CLOSURE OUTPUT` -> último `DONE` referenciado ou mais recente -> `CONTEXT.md` da feature só se ainda faltar base
2. ao abrir `CONTEXT.md`, ler primeiro o bloco `## Snapshot de recycle`
3. sem snapshot, fazer fallback dirigido: topo -> seções críticas -> trecho final ou histórico recente
4. não assumir que só as primeiras linhas bastam
5. não ler o `CONTEXT.md` inteiro por padrão
6. recompor a estrutura do plano sem replanejar a feature inteira
7. remover ou resumir o escopo concluído do centro do plano
8. subir `Bloco seguinte` para `Escopo ativo` somente quando o fechamento permitir
9. detalhar o novo `Escopo ativo`
10. preparar o plano para o próximo ciclo
11. `DONE` e `done/` são evidência complementar de fechamento; não substituem automaticamente o `CONTEXT`
12. se não houver base suficiente para recycle seguro, devolver `BLOCKED`

---

## Contrato mínimo de um `PLAN.md` válido

Este bloco não substitui as regras completas da skill.
Ele existe para responder rapidamente: “esse output do Blueprint ficou bom o suficiente?”

### Em `MODE=CREATE`

Um `PLAN.md` válido em `MODE=CREATE`:

- cria exatamente 1 `PLAN.md` para a unidade alvo, ou usa fallback provisório apenas quando a unidade real ainda não foi resolvida
- organiza a demanda em horizonte curto
- detalha somente o `Escopo ativo`
- mantém `Bloco seguinte` curto
- usa `Bloco posterior` apenas se houver base suficiente
- não transforma risco, ideia solta ou backlog longo em bloco detalhado
- devolve `SKIPPED` em vez de duplicar plano quando o plano alvo já existir

Sinal de boa saída:
quem lê o plano entende imediatamente qual é o recorte executável agora, sem precisar transformar o `PLAN.md` em backlog.

### Em `MODE=RECYCLE`

Um `PLAN.md` válido em `MODE=RECYCLE`:

- parte do fechamento real do ciclo anterior
- recompõe o plano sem replanejar a frente inteira
- remove ou resume do centro o que já saiu do foco
- detalha somente o novo `Escopo ativo`
- mantém o restante como `Bloco seguinte` curto e `Bloco posterior` opcional e curto
- só promove `Bloco seguinte` quando o fechamento e a base realmente permitirem
- não promove automaticamente o próximo bloco em caso de `PARTIAL`
- não promove artificialmente o próximo bloco em caso de `BLOCKED`
- devolve `BLOCKED` se não houver base suficiente para recycle seguro

Sinal de boa saída:
o plano fica pronto para o próximo ciclo sem inflar horizonte, sem histórico longo e sem virar replanejamento completo da frente.

### Regra de bolso

Se a dúvida for “o plano está bom o suficiente?”:

- existe um `Escopo ativo` claro e executável?
- só ele está detalhado?
- o restante ficou curto?
- o output respeitou `CREATE` ou `RECYCLE` sem misturar papéis?
- o Blueprint evitou virar backlog manager?

Se a resposta for “sim”, o plano está no formato certo para seguir o fluxo.

---

## Autoridade exclusiva sobre o plano

Somente o Blueprint pode:

1. criar `PLAN.md`
2. reciclar `PLAN.md`
3. reorganizar `Escopo ativo`, `Bloco seguinte` e `Bloco posterior`
4. promover ou absorver blocos quando houver base suficiente
5. resumir ou remover escopo concluído do bloco ativo
6. detalhar o `Escopo ativo` pronto para execução

Nem `sentinel_phase_closure`, nem `sentinel_prompt_preflight`, nem o executor devem fazer isso.

---

## Regras invioláveis

1. `PLAN.md` é descartável
2. conhecimento durável não fica no plano
3. apenas o `Escopo ativo` pode ser detalhado
4. o horizonte máximo do plano é: `Escopo ativo` detalhado, `Bloco seguinte` curto e `Bloco posterior` opcional e curto somente quando houver base suficiente
5. recycle não é fechamento
6. recycle não é execução
7. recycle não é replanejamento completo da feature
8. o Blueprint não pode virar backlog manager

---

## Papel do `PLAN.md` raiz

1. `PLAN.md` na raiz é apenas fallback provisório quando a unidade real ainda não foi resolvida com segurança
2. ele não define a casa canônica dos artefatos duráveis
3. `DONE`, `CONTEXT` e demais artefatos duráveis vivem em `docs/features/<unidade_resolvida>/...`
4. se o fluxo começou no fallback raiz e a unidade foi resolvida no fechamento, o próximo `MODE=RECYCLE` deve passar a usar o `PLAN.md` canônico dessa unidade
5. depois disso, `PLAN.md` raiz deixa de ser o plano principal daquele fluxo

---

## Tratamento por status no recycle

### Se `CLOSED`

1. remover ou resumir o escopo concluído
2. subir `Bloco seguinte` para `Escopo ativo` quando houver base
3. detalhar o novo `Escopo ativo`
4. manter `Bloco seguinte` e `Bloco posterior` curtos

### Se `PARTIAL`

1. não promover automaticamente o próximo bloco
2. recompor o restante do recorte atual como novo `Escopo ativo`
3. manter os demais blocos apenas como esboço curto quando fizer sentido

### Se `BLOCKED`

1. não promover artificialmente o próximo bloco
2. reciclar apenas se isso fizer sentido operacional
3. refletir o bloqueio explicitamente no novo `Escopo ativo` quando houver recycle
4. se não houver base para recycle seguro, manter a estrutura atual e devolver `BLOCKED`

---

## Relação com as outras skills

- `sentinel_docs_bootstrap` prepara a base documental mínima, mas não toca no plano
- `sentinel_prompt_preflight` prepara o prompt de execução sobre um `Escopo ativo` ou tarefa já definida
- `sentinel_phase_closure` fecha a execução e deixa o próximo recycle para o Blueprint
- executor, preflight e closure não podem criar, reciclar, promover, resumir nem detalhar `PLAN.md`

---

## Leitura rápida

Se a dúvida for "quem pode mexer no `PLAN.md`?", a resposta é: **só o Blueprint**.

Se a dúvida for "quando ele entra?", a resposta é:

- no começo do ciclo formal com `MODE=CREATE`
- depois do fechamento, com `MODE=RECYCLE`

Se a dúvida for "o que ele entrega?", a resposta é:

- `PLAN.md` criado ou recomposto
- sempre com horizonte curto
- sempre com apenas o `Escopo ativo` detalhado
