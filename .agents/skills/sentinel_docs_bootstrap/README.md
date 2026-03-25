# Sentinel Docs Bootstrap

Version: 2026.3.1  
Status: Active  
Protocol line: 2026.3

## O que é

O **Sentinel Docs Bootstrap** prepara a base documental mínima do protocolo para **projeto já existente**.

Ele existe para organizar o chão antes do ciclo operacional começar:
- faz discovery documental do repo sem executar código;
- cria apenas o que estiver faltando;
- centraliza lacunas como `TBD` no Core Context;
- prepara a base para uso posterior de **Plan Blueprint**, **Prompt Preflight** e **Phase Closure**.

> O Bootstrap não abre ciclo de execução, não substitui o Blueprint e não toca em `PLAN.md`.

---

## Quando usar

Use esta skill quando:
- o repo ainda não tem base canônica suficiente do Sentinel;
- a documentação está muito incompleta ou espalhada;
- você quer preparar o mínimo necessário para operar o protocolo com mais segurança;
- a equipe precisa começar de forma mais organizada, sem sair criando docs no improviso.

Use com abordagem mais **lean** quando:
- o repo já é relativamente organizado;
- faltam poucas peças canônicas;
- o objetivo é criar só a base mínima e seguir.

Use com abordagem mais **completa** quando:
- o projeto é maior ou mais bagunçado;
- faltam referências básicas de contexto, regras e estado;
- existe risco real de o agente inferir stack, regra, path ou estrutura errada.

---

## Quando não usar

Não use o Bootstrap para:
- criar, editar, mover ou reciclar `PLAN.md`;
- executar implementação;
- fechar execução;
- alterar código da aplicação;
- inventar stack, contratos, regras, decisões, paths ou nomenclatura sem evidência.

Se a necessidade já for abrir ou recompor um plano curto, a skill correta é **Sentinel Plan Blueprint**.

---

## O que ele faz

1. Faz discovery documental do repo sem executar código.
2. Cria apenas o que estiver faltando, em **create-only absoluto**.
3. Monta a base mínima de docs canônicos do Sentinel.
4. Centraliza lacunas como `TBD` em `docs/core/CONTEXT.md`.
5. Prepara a base documental para uso posterior do protocolo.
6. Pode criar contextos iniciais de feature quando houver evidência suficiente.

---

## O que ele não faz

1. Não toca em `PLAN.md` ou `plan.md`.
2. Não executa implementação.
3. Não altera comportamento do projeto.
4. Não cria `DONE`.
5. Não vira backlog manager.
6. Não substitui Blueprint, Preflight nem Closure.

---

## Entradas

O Bootstrap trabalha com três fontes principais:

1. **Estrutura real do repo**, lida apenas para discovery.
2. **Evidências de paths, stack e padrões existentes**.
3. **Entrevista guiada mínima**, somente quando o discovery não bastar.

---

## Saídas

Em create-only, a skill pode criar somente o que faltar na base documental mínima, incluindo:

- `README.md` raiz, se faltar
- `docs/INDEX.md`
- `docs/core/CONTEXT.md`
- `docs/core/RULES.md`
- `docs/core/STATE.md`
- `docs/core/CONTRACTS.md`
- `docs/core/TESTING.md`
- `docs/core/UI_KIT.md`, quando aplicável
- `docs/decisions/INDEX.md`
- `docs/reference/` em create-only e `docs/reference/DESIGN_SYSTEM.md`, quando aplicável
- `docs/features/` e features iniciais apenas com evidência suficiente

---

## Regras críticas

1. **Create-only absoluto**: se o arquivo já existir, registrar `SKIPPED`.
2. **Proibido tocar em `PLAN.md`**: não criar, editar, mover nem renomear.
3. **Toda lacuna vira `TBD` canônico** em `docs/core/CONTEXT.md`.
4. **Não usar `TODO`** nos docs gerados.
5. **Não executar implementação** nem alterar comportamento do projeto.
6. **Não inventar nada sem evidência**.

---

## Como o Bootstrap se encaixa no fluxo

Posição canônica no fluxo mais completo:

1. `sentinel_docs_bootstrap`
2. confirmar e completar o contexto mínimo necessário
3. quando a demanda exigir um `PLAN.md` curto, usar `sentinel_plan_blueprint MODE=CREATE`
4. `sentinel_prompt_preflight`
5. executor (Plano)
6. executor (Execução)
7. `sentinel_phase_closure`
8. `sentinel_plan_blueprint MODE=RECYCLE`

### Handoff desta skill

**Recebe**
- repo existente sem base documental suficiente;
- evidências reais do projeto;
- respostas mínimas do usuário, se discovery não bastar.

**Entrega**
- base documental mínima do Sentinel;
- lacunas centralizadas como `TBD`;
- terreno pronto para o próximo passo do protocolo.

**Próximo passo canônico**
- confirmar a base mínima;
- resolver os `TBD` necessários no contexto;
- quando a demanda pedir ciclo curto com plano, usar **Sentinel Plan Blueprint**.

---

## Relação com as outras skills

### Sentinel Plan Blueprint
Assume o ciclo de vida do `PLAN.md` depois que a base documental mínima estiver suficiente.

### Sentinel Prompt Preflight
Prepara prompt de execução sobre `Escopo ativo` ou tarefa já definida. Não substitui o Bootstrap.

### Sentinel Phase Closure
Entra apenas depois de uma execução concluída. Não participa do bootstrap.

---

## Convenções importantes

### CONTEXT de feature
Quando esta skill cria `docs/features/<feature>/CONTEXT.md`, ele nasce com cabeçalho durável:
- `## Snapshot de recycle`
- `LAST DONE: <path-ou-TBD>`
- `LAST DECISION: CLOSED | PARTIAL | BLOCKED | TBD`
- `LAST MILESTONE: <frase-curta-ou-TBD>`
- `OPEN THREADS` com itens curtos ou `- TBD`
- `NEXT RECYCLE BASIS: <frase curta sobre o que habilita o próximo recycle>`
- `LAST UPDATED: YYYYMMDD`
- `SCOPE: feature`
- `FEATURE: <feature-path>`
- `STATUS: active | in-progress`

Mesmo para unidades aninhadas, a hierarquia vive no path e em `FEATURE`; o Bootstrap não usa `SCOPE: subfeature`.
O restante do arquivo continua sendo memória durável curta da feature, sem virar mini-`PLAN.md` nem mini-`DONE`.

### DONE futuro
O Bootstrap não cria `DONE`, mas o padrão esperado para fechamento posterior é:
- `docs/features/<feature_slug>/done/DONE-YYYYMMDD-<entrega-real>.md`

---

## Perfis de uso

O coração da skill não muda, mas a adoção pode ser mais leve ou mais completa.

Perfis comuns:
- repo simples
- app modular
- monorepo
- adoção lean
- adoção mais completa

A diferença está em **quanto contexto mínimo você precisa estabilizar agora**, não em mudar as regras da skill.

---

## Exemplo rápido

### Cenário
Repo existente, sem base canônica suficiente, com documentação espalhada e pouca confiança para iniciar execução diretamente.

### Skill acionada
`sentinel_docs_bootstrap`

### Saída esperada
- `docs/INDEX.md`
- docs centrais em `docs/core/`
- `docs/features/` inicial quando houver evidência
- lacunas registradas como `TBD` no Core Context

### Próximo passo
Se a base mínima já estiver suficiente e a demanda exigir um plano curto, seguir com **Sentinel Plan Blueprint**.

---

## Importante

- O Bootstrap é para **projeto existente**.
- Ele opera em **create-only absoluto**.
- Ele prepara a base, mas **não inicia o ciclo de execução**.
- Ele não concorre com Blueprint, Preflight ou Closure.
- Ele reduz improviso sem transformar a adoção em cerimônia obrigatória maior do que o projeto precisa.
