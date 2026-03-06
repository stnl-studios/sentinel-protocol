# Exemplos de Saída

## 1) Saída para pedido completo (curta e forte, sem perguntas)

### 1) Contexto confirmado (do usuário)
- Confirmado: feature de exportar CSV de vendas no admin.
- Confirmado: incluir endpoint GET /admin/reports/sales.csv e botão "Exportar CSV".
- Assumido: manter paginação atual como fonte da consulta.
- TBD: nenhum.

### 2) Objetivo
Entregar exportação CSV de vendas no painel admin, com endpoint e ação de UI, sem alterar contratos existentes.

### 3) Escopo (IN / OUT)
IN:
- Endpoint novo GET /admin/reports/sales.csv.
- Botão "Exportar CSV" em admin/reports.
- Colunas: data, cliente, valor.
- Testes para 0 e N registros.

OUT:
- Exportação PDF.
- Filtros avançados.
- Mudanças em autenticação.
- Alterações fora de admin/reports.

### 4) Restrições e guardrails
- Não alterar contratos existentes.
- Não alterar comportamento observável fora de admin/reports.
- Sem refatoração ampla.

### 5) Fontes de verdade (instruções ao executor para ler nesta ordem, se existirem)
1. README.md (INDEX)
2. docs/INDEX.md (se existir)
3. docs/CONTEXT.md
4. docs/RULES.md
5. docs/CONTRACTS.md (toca dados/validação/integração)
6. docs/UI_KIT.md (toca UI, se existir)
7. docs/TESTING.md (se existir)
8. docs/decisions/INDEX.md e ADRs relevantes (se existirem)
9. docs/PLAN.md (se existir; opcional)

### 6) Prompt do Executor (PLAN + AGENT)
Classificação da tarefa: Feature.
Permissões efetivas:
- Permitido: criar endpoint novo; criar campo calculado no CSV.
- Proibido: alterar contratos existentes; refatoração ampla; mudanças fora do escopo.
- Condicional: qualquer alteração de comportamento fora de admin/reports (exigir confirmação).

Instruções de execução:
- Primeiro, ler fontes de verdade na ordem definida.
- Não ler repositório fora dos docs listados.
- Elaborar plano curto e executar apenas o necessário para entregar o escopo IN.
- Aplicar stop rules:
  - Se TBD relevante afetar execução, parar e perguntar.
  - Se doc obrigatório indicado pelo INDEX não existir, parar e perguntar.
  - Se houver conflito entre docs, parar e perguntar.
  - Se execução exigir algo proibido, parar e perguntar.

### 7) Critérios de pronto e validações
- Endpoint retorna CSV com colunas data/cliente/valor.
- Botão dispara download funcional no admin/reports.
- Cenário com 0 registros e com N registros cobertos por teste.
- Nenhum contrato existente alterado.

### 8) TBDs
TBD
- o que falta: nenhum.
- quem decide: n/a.
- evidência necessária: n/a.
- gatilho para revisitar: n/a.

---

## 2) Saída para pedido ambíguo (com perguntas objetivas)

### Perguntas de elicitação (rodada 1)
1. O objetivo principal é corrigir bug de cobrança, criar feature ou ambos?
2. Classifique a prioridade: cobrança backend, API pública, UI, ou tudo igual.
3. Escopo IN: quais componentes exatos entram (nomes de módulo/tela/endpoint)?
4. Escopo OUT: o que não pode ser tocado nesta entrega?
5. É permitido criar endpoint novo?
6. É permitido alterar contrato de endpoint existente?
7. É permitido refatorar amplo?
8. Quais critérios de aceite objetivos validam a entrega?

### 1) Contexto confirmado (do usuário)
- Confirmado: há insatisfação com cobrança; pedido inclui API e UI.
- Assumido: existe possível mistura de bugfix com melhoria.
- TBD: objetivo específico, escopo exato, permissões e critérios.

### 2) Objetivo
Transformar o pedido em execução focada, com fronteiras e validação mensurável.

### 3) Escopo (IN / OUT)
IN:
- TBD após respostas da rodada 1.

OUT:
- Qualquer item não confirmado explicitamente.

### 4) Restrições e guardrails
- Deny-by-default para criação/alteração estrutural sem autorização.
- Sem extrapolar para áreas não confirmadas.

### 5) Fontes de verdade (instruções ao executor para ler nesta ordem, se existirem)
1. README.md (INDEX)
2. docs/INDEX.md (se existir)
3. docs/CONTEXT.md
4. docs/RULES.md
5. docs/CONTRACTS.md (se tocar dados/validação/integração)
6. docs/UI_KIT.md (se tocar UI, se existir)
7. docs/TESTING.md (se existir)
8. docs/decisions/INDEX.md e ADRs relevantes (se existirem)
9. docs/PLAN.md (se existir; opcional)

### 6) Prompt do Executor (PLAN + AGENT)
Classificação da tarefa: Bugfix (provisório; confirmar após respostas).
Permissões efetivas:
- Permitido: apenas ajustes estritamente necessários e explicitamente aprovados.
- Proibido: criar campo, endpoint, model/entidade, alterar contrato, refatorar amplo, alterar comportamento fora do pedido.
- Condicional: qualquer item estrutural depende de confirmação explícita.

Instruções de execução:
- Primeiro, ler fontes de verdade na ordem definida.
- Não ler repositório fora dos docs listados.
- Planejar execução mínima após fechamento dos TBDs críticos.
- Aplicar stop rules padrão por TBD, ausência de docs obrigatórios, conflito de docs e violação de permissões.

### 7) Critérios de pronto e validações
- Critérios objetivos definidos e aprovados pelo solicitante.
- Escopo IN/OUT fechado.
- Permissões explícitas registradas.

### 8) TBDs
TBD
- o que falta: objetivo final e fronteira de escopo.
- quem decide: solicitante.
- evidência necessária: resposta objetiva das perguntas 1-4.
- gatilho para revisitar: antes de iniciar execução.

TBD
- o que falta: permissões estruturais (endpoint/contrato/refactor).
- quem decide: solicitante.
- evidência necessária: respostas 5-7.
- gatilho para revisitar: ao definir plano final.

TBD
- o que falta: critérios de aceite mensuráveis.
- quem decide: solicitante.
- evidência necessária: resposta 8.
- gatilho para revisitar: antes de concluir execução.

---

## 3) Saída para pedido de refactor sem permissão (com pergunta de autorização)

### Perguntas de elicitação (rodada 1)
1. Você autoriza refatoração ampla no módulo de usuários? (sim/não)
2. Escopo IN: quais arquivos/camadas entram no refactor?
3. Escopo OUT: quais áreas ficam congeladas?
4. É permitido alterar comportamento observável? (sim/não)
5. É permitido alterar contratos existentes? (sim/não)
6. Quais critérios objetivos definem “mais limpo e padronizado”?

### 1) Contexto confirmado (do usuário)
- Confirmado: intenção de refactor no módulo de usuários.
- Assumido: objetivo principal é melhorar organização e padronização.
- TBD: autorização explícita para refatoração ampla e limites.

### 2) Objetivo
Executar refactor controlado do módulo de usuários sem mudança funcional não autorizada.

### 3) Escopo (IN / OUT)
IN:
- TBD até definição explícita de áreas permitidas.

OUT:
- Qualquer alteração fora do módulo definido.
- Mudança funcional sem autorização.

### 4) Restrições e guardrails
- Deny-by-default para alterações estruturais sem autorização explícita.
- Não alterar contrato nem comportamento observável sem consentimento.

### 5) Fontes de verdade (instruções ao executor para ler nesta ordem, se existirem)
1. README.md (INDEX)
2. docs/INDEX.md (se existir)
3. docs/CONTEXT.md
4. docs/RULES.md
5. docs/CONTRACTS.md (se tocar dados/validação/integração)
6. docs/UI_KIT.md (se tocar UI, se existir)
7. docs/TESTING.md (se existir)
8. docs/decisions/INDEX.md e ADRs relevantes (se existirem)
9. docs/PLAN.md (se existir; opcional)

### 6) Prompt do Executor (PLAN + AGENT)
Classificação da tarefa: Refactor.
Permissões efetivas:
- Permitido: melhorias locais explicitamente autorizadas.
- Proibido: refatoração ampla sem aprovação; alterar contrato; alterar comportamento fora do pedido.
- Condicional: qualquer mudança estrutural maior depende de confirmação.

Instruções de execução:
- Primeiro, ler fontes de verdade na ordem definida.
- Não ler repositório fora dos docs listados.
- Construir plano incremental e validar cada alteração contra restrições.
- Aplicar stop rules padrão por TBD, ausência de docs obrigatórios, conflito de docs e violação de permissões.

### 7) Critérios de pronto e validações
- Escopo fechado e autorizado.
- Nenhuma mudança funcional não autorizada.
- Critérios de padronização definidos e atendidos.

### 8) TBDs
TBD
- o que falta: autorização explícita para refatoração ampla.
- quem decide: solicitante.
- evidência necessária: resposta da pergunta 1.
- gatilho para revisitar: antes de executar alterações estruturais.

TBD
- o que falta: limites IN/OUT detalhados.
- quem decide: solicitante.
- evidência necessária: respostas 2 e 3.
- gatilho para revisitar: antes de finalizar plano.

---

## 4) Saída para path completo de subfeature (resolução explícita)

### 1) Contexto confirmado (do usuário)
- Confirmado: path alvo `src/app/modules/perimeters/pages/categories`.
- Assumido: escopo local na subfeature `categories`.
- TBD: nenhum.

### 2) Objetivo
Executar mudança na subfeature alvo sem ampliar escopo para outras áreas.

### 3) Escopo (IN / OUT)
IN:
- `src/app/modules/perimeters/pages/categories/**`.

OUT:
- Alterações fora de `modules/perimeters/pages/categories`.

### 4) Restrições e guardrails
- Não inventar path, campos ou contratos.
- Não puxar contexto de features não relacionadas.

### 5) Fontes de verdade (instruções ao executor para ler nesta ordem, se existirem)
1. docs/core/CONTEXT.md
2. docs/core/RULES.md
3. docs/core/STATE.md
4. docs/features/modules/perimeters/pages/categories/CONTEXT.md (se existir)

### 6) Prompt do Executor (PLAN + AGENT)
Classificação da tarefa: Feature local.
Permissões efetivas:
- Permitido: alteração dentro da subfeature alvo.
- Proibido: expansão de escopo sem confirmação.

Instruções de execução:
- Resolver escopo como `root=modules`, `container=perimeters`, `collection=pages`, `subfeature=categories`.
- Aplicar stop rule se path real divergir do path informado.

### 7) Critérios de pronto e validações
- Mudança entregue somente na subfeature alvo.
- Sem alterações fora do path resolvido.

### 8) TBDs
TBD
- o que falta: nenhum.
- quem decide: n/a.
- evidência necessária: n/a.
- gatilho para revisitar: n/a.

---

## 5) Saída para pedido com apenas container (subfeature opcional)

### 1) Contexto confirmado (do usuário)
- Confirmado: container `registration`.
- Assumido: escopo inicial no container.
- TBD: subfeature específica apenas se execução exigir.

### 2) Objetivo
Planejar no nível de container com contexto mínimo, evitando decidir subfeature cedo demais.

### 3) Escopo (IN / OUT)
IN:
- Unidade de container `registration`.

OUT:
- Subfeatures não relacionadas sem confirmação.

### 4) Restrições e guardrails
- Perguntar subfeature somente se houver impacto em execução.
- Não inventar coleção quando não houver evidência.

### 5) Fontes de verdade (instruções ao executor para ler nesta ordem, se existirem)
1. docs/core/CONTEXT.md
2. docs/core/RULES.md
3. docs/core/STATE.md
4. docs/features/main/registration/CONTEXT.md (se existir)

### 6) Prompt do Executor (PLAN + AGENT)
Classificação da tarefa: Feature.
Permissões efetivas:
- Permitido: planejar no escopo do container.
- Condicional: detalhar subfeature somente com confirmação ou evidência.

Instruções de execução:
- Resolver escopo inicial como `unit_level=container`.
- Se precisar subfeature, perguntar e parar.

### 7) Critérios de pronto e validações
- Escopo de container fechado.
- Sem inferência de subfeature sem evidência.

### 8) TBDs
TBD
- o que falta: subfeature alvo, se necessária.
- quem decide: solicitante.
- evidência necessária: confirmação explícita.
- gatilho para revisitar: ao detalhar plano de execução.

---

## 6) Saída para mudança transversal entre roots

### 1) Contexto confirmado (do usuário)
- Confirmado: mudança em `src/app/main/registration` e `src/app/modules/perimeters`.
- Assumido: escopo transversal.
- TBD: estrutural ou não, depende de impacto em contratos/regras globais.

### 2) Objetivo
Padronizar permissões entre roots sem quebrar contratos existentes.

### 3) Escopo (IN / OUT)
IN:
- `src/app/main/registration/**`
- `src/app/modules/perimeters/**`

OUT:
- Áreas não citadas.

### 4) Restrições e guardrails
- Não alterar contratos globais sem autorização.
- Se virar estrutural, exigir ADR antes de executar.

### 5) Fontes de verdade (instruções ao executor para ler nesta ordem, se existirem)
1. docs/core/RULES.md
2. docs/core/CONTRACTS.md
3. docs/core/STATE.md
4. docs/features/main/registration/CONTEXT.md (se existir)
5. docs/features/modules/perimeters/CONTEXT.md (se existir)

### 6) Prompt do Executor (PLAN + AGENT)
Classificação da tarefa: Transversal (provisória).
Permissões efetivas:
- Permitido: padronização dentro das áreas citadas.
- Condicional: mudança estrutural só com ADR aprovado.

Instruções de execução:
- Tratar roots separadas no mesmo plano.
- Aplicar stop rule para qualquer expansão fora das duas áreas.

### 7) Critérios de pronto e validações
- Padronização aplicada nas duas áreas.
- Sem regressão de permissão.
- Sem alteração global não autorizada.

### 8) TBDs
TBD
- o que falta: confirmação se há mudança estrutural.
- quem decide: solicitante.
- evidência necessária: impacto real em contratos/regras globais.
- gatilho para revisitar: antes de EXECUTE.
