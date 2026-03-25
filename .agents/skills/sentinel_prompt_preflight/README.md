# Sentinel Prompt Preflight

Version: 2026.3.1  
Status: Active  
Protocol line: 2026.3

## Propósito

`sentinel_prompt_preflight` existe para transformar um pedido cru em **um único prompt governado de execução**.

Ele não entende o projeto, não lê o repositório e não substitui planejamento com evidência.  
O papel dele é mais estreito e mais útil: **organizar a entrada, aplicar guardrails mínimos, fazer sanity check apenas por existência e preparar o próximo passo do executor**.

---

## Onde ele entra no protocolo

### Trilha curta
**Pedido cru → Prompt Preflight → executor (plano) → `OK {ID}` → executor (execução)**

### Trilha completa
**Docs Bootstrap → Plan Blueprint (`MODE=CREATE`) → Prompt Preflight → executor (plano) → `OK {ID}` → executor (execução) → Phase Closure → Plan Blueprint (`MODE=RECYCLE`)**

> Na prática, o Preflight entrega um prompt para o mesmo agente executor trabalhar em dois momentos: primeiro `PLAN OUTPUT`, depois `EXECUTE OUTPUT` após aprovação.

---

## O que ele faz

1. recebe um pedido ruim, cru, vago ou incompleto
2. reescreve a solicitação em formato operacional
3. aplica guardrails operacionais mínimos
4. faz sanity check somente por existência
5. referencia fontes canônicas apenas por path ou categoria
6. instrui leitura sob demanda para o executor
7. devolve exatamente um único bloco de código Markdown `md`
8. encerra após emitir o prompt final

---

## O que ele não faz

- não lê conteúdo do repositório
- não abre arquivo para resumir docs ou código
- não infere stack, arquitetura, regra de negócio ou escopo real a partir do repo
- não monta plano técnico com base em evidência
- não cria ou recicla `PLAN.md`
- não reorganiza `Escopo ativo`, `Bloco seguinte` ou `Bloco posterior`
- não substitui `sentinel_plan_blueprint`
- não substitui `sentinel_phase_closure`
- não executa nada
- não fecha execução
- não documenta fechamento
- não lê docs nem consolida memória durável
- não instrui o executor a tocar `DONE`, `CONTEXT`, `STATE`, `ADR` ou `PLAN.md`
- não atua como planner de domínio, executor ou auditor

---

## Dois usos práticos

### 1. Organizar pedido cru
Use quando você recebeu uma solicitação vaga, solta ou mal delimitada e quer convertê-la em um prompt operacional bom.

Exemplos:
- “analisa isso e ajusta sem quebrar o resto”
- “quero refatorar esse trecho sem mudar contrato externo”
- “me ajuda a passar isso para o agente executar”

### 2. Empacotar escopo já definido
Use quando já existe um recorte claro e você quer preparar a execução com guardrails, sem replanejar a frente inteira.

Exemplos:
- já existe `Escopo ativo`
- já existe uma tarefa delimitada por arquivos e limites
- você quer só preparar o executor para plano → `OK {ID}` → execução

> Nos dois casos, o Preflight não lê o repo por design.

---

## Entradas

1. pedido do usuário
2. paths citados explicitamente no pedido, quando houver
3. existência dos arquivos canônicos permitidos no sanity check

---

## Saídas

1. um único prompt estruturado em bloco `md`
2. instrução de leitura sob demanda para o executor
3. gates operacionais curtos para `SKIP` e `SKIP-PLAN`, quando aplicável
4. fluxo explícito para `PLAN OUTPUT` → `OK {ID}` → `EXECUTE OUTPUT`

---

## Relação com outras skills

- O ciclo de vida do `PLAN.md` pertence exclusivamente a `sentinel_plan_blueprint`.
- Fechamento da execução pertence exclusivamente a `sentinel_phase_closure`.
- O handoff durável via `CONTEXT.md` da feature pertence exclusivamente a Closure e Blueprint.
- `sentinel_docs_bootstrap` prepara a base documental quando o repositório ainda não tem base canônica suficiente.
- O Preflight apenas prepara o prompt do executor para o ciclo atual, sobre `Escopo ativo` ou tarefa já definida.
- O executor implementa e valida; não toca artefatos duráveis.
- O fechamento documental real acontece em `sentinel_phase_closure`.
- Quando a unidade alvo for identificável, o plano principal do fluxo é o `PLAN.md` dessa unidade.
- `PLAN.md` na raiz é o único fallback real quando não houver resolução melhor da unidade alvo, mas permanece provisório.
- `PLAN.md` raiz não é a casa canônica de `DONE`, `CONTEXT` ou outros artefatos duráveis.
- `docs/core/PLAN.md` não é fallback utilizável nem alternativa operacional de plano.

---

## Sanity check permitido

Somente:

- `docs/INDEX.md`
- `docs/core/RULES.md`
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `PLAN.md` da unidade alvo, apenas se o texto do usuário permitir identificar um candidato sem abrir arquivos
- `PLAN.md` na raiz, apenas como fallback real e provisório

Nunca:

- abrir arquivo
- ler conteúdo
- resumir conteúdo
- inferir regra de negócio
- inferir arquitetura
- inferir escopo real a partir do código

Se o prompt final precisar usar `PLAN.md` raiz, o executor deve tratá-lo como plano provisório e resolver a unidade real antes do fechamento documental.

---

## Handoff real do Preflight

O Preflight não entrega “execução direta”.  
Ele entrega um prompt para o executor operar em dois momentos:

1. **Executor (plano)**
    - lê apenas o mínimo necessário
    - devolve `PLAN OUTPUT` curto
    - para e aguarda `OK {ID}`

2. **Executor (execução)**
    - executa somente após aprovação
    - devolve `EXECUTE OUTPUT` curto, objetivo e verificável

3. **Pós-execução**
    - o próximo passo canônico é `sentinel_phase_closure`

---

## Posição no fluxo canônico

1. `sentinel_docs_bootstrap`, quando faltar base documental
2. `sentinel_plan_blueprint`, quando a demanda exigir um `PLAN.md` curto
3. `sentinel_prompt_preflight`
4. executor (`PLAN OUTPUT`)
5. `OK {ID}`
6. executor (`EXECUTE OUTPUT`)
7. `sentinel_phase_closure`
8. `sentinel_plan_blueprint MODE=RECYCLE`, quando houver novo ciclo

---

## Estrutura do prompt gerado

1. `TAREFA`
2. `MODO`
3. `SANITY CHECK`
4. `FONTES CANONICAS`
5. `LEITURA SOB DEMANDA`
6. `LIMITES`
7. `SAIDA ESPERADA DO EXECUTOR`
8. `POS-EXECUCAO`

---

## Regra de formato

Não pode existir texto fora do bloco final iniciado com ` ```md `.

A resposta da skill deve ser sempre:
- exatamente um único bloco Markdown `md`
- sem análise fora do bloco
- sem relatório
- sem diff
- sem explicação adicional

---

## Saída esperada do executor

O prompt gerado pelo Preflight deve conduzir o executor a:

1. responder com `PLAN OUTPUT` curto
2. não executar nada antes de `OK` com o ID correto: `OK {ID}`
3. responder depois com `EXECUTE OUTPUT` curto, objetivo e verificável
4. encerrar apontando o próximo passo canônico em `sentinel_phase_closure`

---

## Resumo rápido

Use `sentinel_prompt_preflight` quando você precisa **melhorar a qualidade da entrada antes da execução**, sem abrir leitura ampla do repo e sem invadir o papel de Blueprint ou Closure.

Ele existe para uma coisa só:  
**transformar pedido cru em prompt operacional bom, com handoff claro para plano e execução.**
