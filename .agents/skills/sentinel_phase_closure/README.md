# Sentinel Phase Closure

Version: 2026.3.1  
Status: Active  
Protocol line: 2026.3

## Propósito

`sentinel_phase_closure` é a skill de fechamento pós-execução do Sentinel Protocol.

Ela existe para fechar a execução com base em evidência, classificar o resultado como `CLOSED`, `PARTIAL` ou `BLOCKED`, criar o `DONE` da entrega real e consolidar apenas o mínimo de conhecimento durável, sem misturar fechamento com planejamento.

---

## Onde entra no fluxo

Fluxo canônico:

1. `sentinel_docs_bootstrap`, quando faltar base documental
2. `sentinel_plan_blueprint MODE=CREATE`
3. `sentinel_prompt_preflight`
4. executor -> `PLAN OUTPUT`
5. `OK {ID}`
6. executor -> `EXECUTE OUTPUT`
7. `sentinel_phase_closure`
8. `sentinel_plan_blueprint MODE=RECYCLE`

> A Closure entra depois da execução. Ela não implementa, não recicla plano e não substitui o Blueprint.

---

## O que faz

`sentinel_phase_closure`:

1. valida objetivo, DoD e evidências do escopo executado
2. classifica o fechamento como `CLOSED`, `PARTIAL` ou `BLOCKED`
3. cria `DONE` curto na unidade alvo resolvida, com nome baseado na entrega real
4. atualiza `CONTEXT` da unidade alvo com o mínimo durável e mantém o snapshot de recycle no topo
5. atualiza `docs/core/STATE.md` apenas se houver impacto global real
6. cria ou exige ADR apenas quando a mudança for estrutural
7. emite `PHASE CLOSURE OUTPUT` curto e operacional
8. absorve de forma definitiva a consolidação documental pós-execução
9. é a dona do snapshot durável de handoff da feature

---

## O que não faz

Não faz:

1. criação de `PLAN.md`
2. recycle de `PLAN.md`
3. promoção, reordenação ou detalhamento de blocos do plano
4. execução de implementação
5. discovery amplo do repositório
6. fechamento fictício sem evidência suficiente
7. uso de `PLAN.md` raiz como destino de artefatos duráveis

---

## Quando usar

Use `sentinel_phase_closure` quando:

- já existe `EXECUTE OUTPUT`
- você precisa decidir se o ciclo foi `CLOSED`, `PARTIAL` ou `BLOCKED`
- o resultado precisa virar fechamento canônico
- a memória durável mínima precisa ser atualizada

Não use para:

- abrir o primeiro `PLAN.md`
- preparar o próximo `Escopo ativo`
- reciclar ou promover blocos do plano
- substituir a etapa de execução

---

## Entradas e saídas

### Entradas

1. `docs/INDEX.md`
2. `docs/core/RULES.md`
3. `docs/core/STATE.md`
4. `docs/features/<unidade_resolvida>/CONTEXT.md`
5. `docs/features/<unidade_resolvida>/PLAN.md`, ou `PLAN.md` raiz apenas como plano provisório do ciclo atual
6. último `EXECUTE OUTPUT`
7. evidências mínimas associadas à execução
8. último `DONE` da unidade, se existir

### Saídas

1. `PHASE CLOSURE OUTPUT`
2. `docs/features/<unidade_resolvida>/done/DONE-YYYYMMDD-<entrega-real>.md`
3. atualização mínima de `docs/features/<unidade_resolvida>/CONTEXT.md`
4. atualização de `docs/core/STATE.md` apenas se houver impacto global real
5. `docs/decisions/ADR-YYYYMMDD-<slug>.md` apenas se a mudança for estrutural

---

## Significado dos status

### `CLOSED`

Use quando o objetivo do ciclo foi entregue, o DoD relevante foi demonstrado, a validação mínima foi registrada e as docs mínimas de fechamento foram atualizadas.

### `PARTIAL`

Use quando houve avanço real, mas ainda não é seguro afirmar fechamento completo porque parte do objetivo, do DoD ou da evidência segue pendente.

### `BLOCKED`

Use quando existe impedimento real para fechar o ciclo, falta evidência crítica, o DoD não é verificável, há conflito relevante entre fontes ou existe mudança estrutural sem ADR suficiente.

---

## Convenções duráveis de fechamento

1. o `DONE` deve seguir `DONE-YYYYMMDD-<entrega-real>.md`
2. o nome do `DONE` deve refletir a entrega consolidada, não o nome interno da etapa
3. o `CONTEXT` da unidade começa com o snapshot canônico:
   - `LAST DONE`
   - `LAST DECISION`
   - `LAST MILESTONE`
   - `OPEN THREADS`
   - `NEXT RECYCLE BASIS`
   - `SCOPE`
   - `FEATURE`
   - `STATUS`
   - `LAST UPDATED`
4. o snapshot deve permanecer curto, estável e coerente com o `DONE` recém-criado
5. abaixo do snapshot ficam os fatos duráveis da unidade e o histórico resumido por marco, com data e link para `DONE`
6. conhecimento durável fica em `DONE`, `CONTEXT`, `STATE` e ADR quando aplicável, não em `PLAN.md`

---

## Regra para `PLAN.md` raiz

1. `PLAN.md` na raiz é apenas fallback provisório para ciclos que ainda não tinham unidade resolvida
2. antes de gravar `DONE`, `CONTEXT` ou qualquer artefato durável, a skill deve resolver a unidade alvo real com evidência suficiente
3. artefatos duráveis vivem sempre em `docs/features/<unidade_resolvida>/...`
4. se a unidade continuar ambígua, a Closure não inventa diretório canônico e deve retornar `PARTIAL` ou `BLOCKED`

---

## Relação com as outras skills

- `sentinel_docs_bootstrap` prepara a base documental mínima, mas não fecha execução
- `sentinel_plan_blueprint` é o único dono do ciclo de vida do `PLAN.md`; depois da Closure, o passo canônico seguinte, quando houver continuidade, é `MODE=RECYCLE`
- `sentinel_prompt_preflight` apenas prepara o prompt do executor e não participa do fechamento
- o executor implementa e valida, mas não toca artefatos duráveis
- o fechamento documental real acontece aqui

---

## Regras invioláveis

1. fechamento exige evidência suficiente
2. fechamento não é recycle
3. fechamento não é execução
4. fechamento não é replanejamento
5. `PLAN.md` não é casa de memória durável
6. `DONE` e `CONTEXT` precisam refletir a entrega real
7. mudança estrutural sem ADR suficiente não pode ser normalizada como fechamento completo

---

## Leitura rápida

Se a dúvida for "quem fecha a execução e consolida o mínimo durável?", a resposta é: **sentinel_phase_closure**.

Se a dúvida for "quem mexe no `PLAN.md` depois disso?", a resposta é: **sentinel_plan_blueprint MODE=RECYCLE**.

Se a dúvida for "o que a Closure entrega?", a resposta é:

- `PHASE CLOSURE OUTPUT`
- `DONE` da entrega real
- atualização mínima de `CONTEXT`
- atualização de `STATE` só quando houver impacto global real
- ADR apenas quando a mudança for estrutural
