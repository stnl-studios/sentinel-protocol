---
name: stnl_project_agent_specializer
description: Descobre, materializa, revisa, atualiza e remove o conjunto minimo util de agents especializados de um repo alvo ja preparado por stnl_project_context.
---

# STNL Project Agent Specializer

## Missão
Ler o contexto factual consolidado de um repo alvo já preparado por `stnl_project_context`, construir um modelo factual intermediário normalizado e materializar, com validação e repair controlado, o conjunto mínimo útil de agents locais em `.github/agents/`.

Esta skill também revisa, atualiza e deleta artifacts locais obsoletos em `.github/` quando forem parte do conjunto gerenciado, mantendo o `orchestrator` alinhado ao conjunto real de agents presentes e sem referências quebradas para `.agent.md` inexistente.

Esta skill é um utilitário global. Ela não é um agent do workflow do projeto alvo.

## Quando usar
- quando o repo alvo já passou por `stnl_project_context` e precisa do primeiro conjunto de agents especializados
- quando `.github/agents/` não existe, está incompleto, está em drift, ou contém artifacts gerenciados stale
- quando os docs do projeto evoluíram e os agents locais precisam refletir novos boundaries, stacks, comandos, superfícies ou ferramentas
- quando o `orchestrator` local precisa voltar a refletir apenas os agents realmente materializados
- quando for preciso revisar ferramentas concedidas no frontmatter `tools`, remover excesso de privilégio e eliminar drift factual ou estrutural

## Quando não usar
- antes de executar `stnl_project_context` no repo alvo
- para inventar especialistas, workflows, boundaries ou integrações sem evidência suficiente
- para alterar os base agents canônicos, seu contrato, seus status, seus gates ou o versionamento do Sentinel
- para materializar `agent-contract-shape`, `agent-specialization-quality-gate` ou `status-gates` no repo alvo na v1
- para criar GitHub Actions, arquivos em `.github/workflows/`, ou qualquer automação confundida com workflow de agents
- para acoplar o conjunto especializado a um projeto específico de referência em vez do repo alvo atual

## Pré-condições
- o workspace atual já é o repo alvo da especialização
- `stnl_project_context` já rodou anteriormente no repo alvo
- existe base factual mínima séria em `docs/**`, especialmente `docs/INDEX.md`, `docs/TBDS.md` quando existir, `docs/core/*`, e os recortes de `docs/units/*` ou `docs/features/*` relevantes
- a base factual é suficiente para entender com honestidade as camadas reais do projeto, os principais boundaries e o shape mínimo do workflow local
- existe permissão para criar, atualizar e deletar artifacts gerenciados em `.github/agents/` e, se necessário, limpar artifacts gerenciados obsoletos em `.github/`

## Inputs esperados no repo alvo
- `docs/**` como source of truth factual principal, com prioridade especial para o material consolidado por `stnl_project_context`
- `docs/core/TESTING.md`, quando existir, como source of truth factual da matriz local de harness/checks para `validation-eval-designer` e `validation-runner`
- `.github/agents/*.agent.md` quando já existirem, para revisão de drift, coerência de frontmatter operacional, metadata e stale artifacts
- a codebase do repo alvo apenas quando os docs precisarem de confirmação, complemento ou desempate factual
- manifests de stack, scripts, testes, configs e entrypoints reais quando forem necessários para especializar comandos, provas, boundaries ou superfícies
- `allowed_models` opcional quando o uso da skill quiser restringir a escolha de `model` dos agents especializados
- `model_policy` opcional para governar a preferência de `model` por perfil de agent, usando apenas:
  - `reasoning_default`
  - `coding_default`
  - `execution_default`

## Source of truth e ordem de evidência
Usar esta ordem de precedência no repo alvo:

1. `docs/**`, especialmente o kit consolidado por `stnl_project_context`
2. referências canônicas da skill e templates/base agents canônicos
3. codebase do repo alvo, apenas quando necessário para validar ou completar entendimento
4. `web`, apenas como apoio para especializar stack, integrações, frameworks, padrões ou contexto técnico externo atual
5. `web` nunca substitui evidência factual do projeto alvo

Regras complementares:
- `docs/**` descreve a verdade factual do projeto alvo; `.github/agents/` descreve a materialização operacional local e não substitui essa verdade factual
- `docs/core/TESTING.md`, quando existir, é a referência factual primária para comandos canônicos, paths manuais aceitos, pré-requisitos e limites reais de harness dos agents de validação
- se docs e codebase conflitarem de modo material, não escolher por preferência; nomear o conflito e bloquear se ele impedir uma especialização honesta
- usar `web` só depois da leitura séria do projeto e apenas quando contexto externo atual realmente mudar a qualidade da especialização
- o quality gate pós-geração valida contra o modelo factual intermediário e as referências já mapeadas; ele não é licença para um scan amplo novo por inércia

## Escopo operacional
- descobrir quais agents locais fazem sentido para o repo alvo
- construir um modelo factual intermediário normalizado antes de gerar qualquer specialized
- materializar apenas os agents necessários em `.github/agents/`
- revisar e atualizar agents já existentes em `.github/agents/`
- deletar artifacts gerenciados obsoletos em `.github/` quando estiverem stale, órfãos ou incoerentes com o conjunto decidido
- manter o `orchestrator` alinhado ao conjunto real de agents materializados
- garantir que nenhum agent materializado continue referenciando `.agent.md` inexistente
- garantir frontmatter operacional coerente em cada agent especializado do repo alvo
- aplicar um quality gate pós-geração separado do framing da geração
- reparar apenas os arquivos sinalizados pelo gate e revalidar antes de concluir

## Agents canônicos que esta skill sabe gerir
- `coder-backend`
- `coder-frontend`
- `coder-ios`
- `designer`
- `finalizer`
- `orchestrator`
- `planner`
- `reviewer`
- `resync`
- `validation-eval-designer`
- `validation-runner`

## Role classes canônicas que a skill deve impor
Antes de especializar qualquer agent, a skill deve classificá-lo em uma role class canônica:

- `router`: `orchestrator`
- `planning`: `planner`
- `proof-design`: `validation-eval-designer`
- `executor`: `coder-backend`, `coder-frontend`, `coder-ios`, `designer`
- `semantic-review`: `reviewer`
- `proof-execution`: `validation-runner`
- `closure`: `finalizer`
- `sync`: `resync`

Para cada role class, a skill deve impor no mínimo:
- tools permitidas
- tools proibidas
- classe de leitura permitida
- budget operacional padrão
- regras anti-role-drift
- tipos de output esperados

Regras:
- especialização local pode restringir mais, nunca relaxar os invariantes centrais da role class
- o custo principal de leitura e execução pertence à classe `executor`
- `router` e `planning` devem ficar deliberadamente mais fracos que os executors em leitura e ferramentas
- `proof-execution`, `closure` e `sync` não podem compensar gaps upstream com rediscovery amplo

## Referências canônicas que esta skill usa, mas não materializa no repo alvo na v1
- `agent-contract-shape`
- `agent-specialization-quality-gate`
- `execution-lifecycle`
- `status-gates`

Quando disponíveis no ambiente instalado da skill, preferir estas referências locais:
- `reference/agents/*.agent.md`
- `reference/docs/agents/AGENT-CONTRACT-SHAPE.md`
- `reference/docs/agents/AGENT-SPECIALIZATION-QUALITY-GATE.md`
- `reference/docs/workflow/EXECUTION-LIFECYCLE.md`
- `reference/docs/workflow/STATUS-GATES.md`

## Princípios
- especializar por evidência, não por simetria
- materializar o conjunto mínimo útil, não o conjunto máximo possível
- preservar o contrato canônico dos base agents
- preservar a role class canônica de cada base agent
- tratar o frontmatter operacional como source of truth do artifact especializado
- aplicar least privilege em tools, leitura e execução
- preferir disciplina operacional a flexibilidade quando houver conflito
- materializar disciplina de superfície curta por default, não narrativa operacional
- preservar artifacts ricos no fluxo interno sem despejá-los no chat principal
- revisar o sistema de agents como um conjunto coerente, não como arquivos isolados
- preferir atualização de agent existente válido a recriação cega
- deletar stale artifacts gerenciados quando eles deixarem o sistema incoerente
- separar descoberta factual, geração, validação e repair
- bloquear em vez de inventar quando a base factual não sustentar a decisão

## Modelo factual intermediário obrigatório
Antes de gerar ou revisar specializeds, a skill deve construir um modelo factual intermediário normalizado a partir de `docs/**`.

Esse modelo pode ser transitório e não precisa virar artifact persistido no repo alvo, mas a etapa é obrigatória. A geração e o quality gate devem operar sobre ele, não sobre improviso textual.

O modelo intermediário deve capturar, no mínimo:
- superfícies reais do sistema
- boundaries, ownerships e integrações relevantes
- stack, runtime, harness, comandos e entrypoints sustentados por evidência
- presença ou ausência de front-end, back-end, design/UI, validação estruturada e necessidade de `resync`
- TBDs, exceções documentadas, padrões locais, exemplos de projeto e checks manuais presentes nas docs
- evidência de onde cada afirmação veio, com paths de docs e, quando necessário, referências complementares da codebase
- quais agents do conjunto canônico cada fato realmente impacta

Forma mínima sugerida por claim do modelo:
- `claim`
- `class`
- `evidence_refs`
- `scope`
- `affected_agents`
- `confidence`
- `notes`

Regras:
- cada afirmação relevante que for parar nos specializeds deve poder ser rastreada a uma entrada do modelo factual intermediário
- o modelo deve preservar semântica e escopo, não só resumir por conveniência
- quando uma informação for fraca, local, condicional ou aberta, o modelo deve carregar essa fraqueza explicitamente
- se a skill não conseguir classificar honestamente um ponto importante, bloquear ou rebaixar a força da linguagem em vez de promover inferência

## Classes factuais e política anti-overclaim
Toda afirmação operacional ou contextual relevante deve ser classificada em uma destas classes factuais antes de entrar nos specializeds:

- `confirmed_fact`
  - fato confirmado ou regra global sustentada por evidência forte nas docs
- `scoped_pattern`
  - padrão local, contextual ou limitado a boundary, camada, fluxo, feature, unidade, runtime ou recorte específico
- `project_example`
  - exemplo ilustrativo do projeto, útil para orientar leitura ou decisão, mas não normativo
- `open_tbd`
  - TBD, pergunta aberta, decisão pendente ou ponto sem fechamento factual
- `documented_exception`
  - exceção documentada que limita, qualifica ou invalida uma regra mais ampla em contexto específico
- `manual_check`
  - instrução de checagem manual nas docs, condição de verificação ou ponto que não pode virar afirmação factual fechada sem conferência

Regras operacionais:
- `project_example` nunca pode virar regra global
- `scoped_pattern` nunca pode ser promovido a convenção global sem evidência adicional forte
- `open_tbd` deve preservar seu conteúdo semântico específico; não pode virar texto genérico esvaziado
- `documented_exception` não pode desaparecer quando for relevante para um agent impactado
- `manual_check` deve permanecer claramente marcado como checagem, não como fato já provado
- linguagem absoluta como `all`, `always`, `must`, `the project uses`, `the project never`, `the standard is` ou equivalentes só pode ser usada quando a classificação e a evidência sustentarem esse grau de certeza
- na dúvida, rebaixar a linguagem para pattern, example, open question ou check-docs

## Modelo de materialização local
- output canônico: `.github/agents/`
- naming físico: preservar o nome físico dos base agents correspondentes, agora materializados sob `.github/agents/*.agent.md`
- não renomear o agent para outro papel só porque o projeto é diferente
- manter a parte fixa do protocolo, os status canônicos, o ownership dos gates e o papel central de cada base agent
- usar `agent-contract-shape` como referência de governança do shape especializado
- tratar o artifact final como shape normalizado canônico vigente, não como "base agent + remendos históricos"
- manter o frontmatter operacional especializado compatível com o contrato canônico e com a materialização local:
  - `name`
  - `description`
  - `target: vscode`
  - `tools`
  - `agents` no `orchestrator`
  - `model` quando aplicável
  - `base_agent_version`
  - `specialization_revision`
  - `managed_artifact: true`
- `specialization_revision` começa em `1` na primeira materialização gerenciada do repo alvo
- `managed_artifact: true` é a marca de overwrite seguro e da deleção segura de artifacts gerenciados
- quando fizer sentido, preservar `reading_scope_class` somente como hint compatível com o contrato base; nunca usá-lo para expandir a classe permitida
- `tools` no frontmatter é obrigatório nos agents especializados materializados e é a source of truth operacional
- `## Tools` no corpo deve ser removido por default quando `tools` existir no frontmatter
- `## Tools` só pode permanecer por ordem humana explícita e com justificativa humana clara
- mesmo quando `## Tools` permanecer como exceção explícita, ele nunca pode ser tratado como source of truth, requisito operacional, critério de validação ou base para drift detection
- todo specialized materializado deve conter `name`, `description`, `target: vscode`, `tools`, `base_agent_version`, `specialization_revision` e `managed_artifact: true`
- o `orchestrator.agent.md` deve conter adicionalmente `agents`
- `agents` no frontmatter é reservado ao `orchestrator` e deve listar apenas subagents realmente materializados em `.github/agents/`
- `model` no frontmatter é suportado como string única ou lista priorizada quando houver justificativa operacional clara, política explícita ou restrição por `allowed_models`
- qualquer outro campo no frontmatter especializado final deve ser tratado como ausente por default e removido na normalização, salvo instrução humana explícita em sentido contrário
- `agent_version` deve ser removido do frontmatter especializado final por default; não faz parte do shape endurecido preservado por esta skill
- se qualquer campo obrigatório faltar no artifact final, a skill ainda não está done

## Normalização final do artifact
- ao materializar ou atualizar um specialized, sempre gerar o frontmatter final no shape canônico vigente
- a entrega esperada é um artifact final normalizado, limpo, operacional e auditável
- não preservar resíduos legados só por inércia, compatibilidade aparente ou herança do base agent
- update também é cleanup: além de corrigir drift factual, a skill deve remover seções redundantes e campos legados fora do contrato vigente
- a normalização também deve preservar `surface discipline`, `delta-only communication`, `no operational narration`, `no artifact dump into main chat`, e `delegate-first` quando o papel exigir isso
- o frontmatter especializado final normalizado contém apenas:
  - `name`
  - `description`
  - `target: vscode`
  - `tools`
  - `agents` no `orchestrator`
  - `model` quando aplicável
  - `base_agent_version`
  - `specialization_revision`
  - `managed_artifact: true`
  - `reading_scope_class` apenas quando fizer sentido e continuar compatível com o contrato
- qualquer campo fora dessa lista deve ser tratado como legado residual e removido durante a normalização, salvo instrução humana explícita
- o corpo especializado final deve preservar headings e seções canônicas do base agent, inclusive `## Handoff`, sem variantes frouxas de naming ou shape
- a normalização final deve eliminar duplicação entre source of truth operacional no frontmatter e texto legado residual no corpo

## Política de `allowed_models` e `model_policy`
- a skill aceita uma entrada opcional `allowed_models`
- a skill aceita uma entrada opcional `model_policy` com `reasoning_default`, `coding_default` e `execution_default`
- se `allowed_models` for fornecido, toda escolha de `model` para specializeds deve ficar restrita a essa lista
- a skill não pode materializar `model` fora de `allowed_models`
- se `model_policy` for fornecido, ele tem precedência sobre heurística implícita
- agents de coordenação, síntese e planejamento tendem a usar `reasoning_default`
- agents de implementação tendem a usar `coding_default`
- agents de execução, prova e validação tendem a usar `execution_default`
- se `model_policy` indicar valor fora de `allowed_models`, a skill deve bloquear ou escolher alternativa segura explicitando isso no output
- quando só `allowed_models` existir, preferir política conservadora: usar um modelo padrão único para o conjunto ou variar por papel apenas quando houver justificativa operacional clara
- se não existir `allowed_models` nem `model_policy`, a skill pode omitir `model` no frontmatter e deixar o runtime usar o model picker atual
- não afirmar que um modelo é "o melhor" sem política explícita
- não inventar ranking universal, fallback complexo, matriz excessiva por agent ou policy especulativa de modelos
- lista priorizada de `model` só deve ser usada quando houver justificativa operacional real, ordem explícita e todos os itens estiverem contidos em `allowed_models` quando essa entrada existir

## Procedimento operacional
1. Validar as pré-condições e confirmar que o repo alvo realmente já passou por `stnl_project_context`.
2. Fazer discovery sério de `docs/**`, com prioridade para `docs/INDEX.md`, `docs/core/*`, `docs/TBDS.md` quando existir, e os `units` ou `features` relevantes.
3. Construir o modelo factual intermediário normalizado, classificando claims, escopo, evidência e agents impactados.
4. Classificar cada agent canônico em sua role class e carregar os invariantes obrigatórios dessa classe antes de gerar qualquer specialized.
5. Ler os templates/base agents canônicos e as referências `agent-contract-shape`, `agent-specialization-quality-gate`, `execution-lifecycle` e `status-gates`.
6. Revisar `.github/agents/` atual, classificando cada artifact local como:
   - `managed and current`
   - `managed but drifted`
   - `managed but obsolete`
   - `unmanaged / ambiguous`
7. Decidir o conjunto alvo mínimo e coerente de agents para o repo usando o modelo factual intermediário, não completude estética.
8. Decidir a política de `model` para a rodada atual, aplicando `model_policy` quando existir e respeitando `allowed_models` quando essa entrada existir.
9. Gerar ou atualizar os specializeds necessários a partir do modelo factual intermediário e dos invariantes da role class, com frontmatter operacional coerente e shape final normalizado.
10. Deletar artifacts gerenciados obsoletos e qualquer referência local quebrada deixada por eles.
11. Reescrever ou ajustar o `orchestrator` por último, para que ele reflita apenas o conjunto final realmente materializado e respeite o budget de router.
12. Executar um quality gate pós-geração separado do framing da geração.
13. Se o gate retornar `NEEDS_FIX`, reparar somente os arquivos sinalizados, reexecutar o gate e concluir apenas quando o conjunto estiver consistentemente validado ou honestamente bloqueado.

## Discovery sério de `docs/**`
O discovery deve ser suficiente para montar o modelo factual intermediário sem virar scan amplo por inércia.

Leitura mínima esperada:
- `docs/INDEX.md`
- `docs/core/*` relevantes para boundaries, stack, runtime, regras e testing
- `docs/TBDS.md` quando existir
- `docs/units/*` e `docs/features/*` apenas nos recortes que realmente alimentam a decisão do conjunto de agents ou a especialização dos artifacts

Durante o discovery:
- mapear fatos confirmados, padrões locais, exemplos, TBDs, exceções e checks manuais
- quando `validation-eval-designer` ou `validation-runner` entrarem no conjunto, ler `docs/core/TESTING.md` se ele existir e mapear comandos canônicos, suites, manual paths aceitos, confiança do harness, gaps e pré-requisitos para o modelo factual intermediário
- mapear, quando houver evidência suficiente, quais surfaces ou change classes do projeto costumam ativar trilhas condicionais de `security`, `performance`, `migration/schema` ou `observability/release safety`
- preservar path e contexto de cada evidência importante
- não diluir um TBD específico em resumo genérico
- não apagar exceção documentada que qualifica uma regra
- não promover um exemplo ou padrão local a convenção do projeto sem sustentação forte

## Heurística para decidir quais agents gerar
Decidir por evidência factual do projeto alvo, não por completude estética.

### Espinha dorsal mínima
Se a especialização puder prosseguir honestamente, o conjunto local normalmente precisa de uma espinha dorsal coerente:
- `orchestrator`
- `planner`
- `finalizer`

Adicionar `resync` quando o projeto mantém memória factual fora da feature e essa sync local fizer sentido. Em repos já preparados por `stnl_project_context`, isso tende a ser a escolha padrão, mas ainda deve ser confirmado pela existência real de `docs/**` como memória viva.

### Agents por superfície real
- materializar `coder-backend` quando houver APIs, serviços, domínio, persistência, jobs, integrações, auth, runtime server-side ou equivalentes
- não materializar `coder-backend` quando o projeto for genuinamente sem camada server-side relevante
- materializar `coder-frontend` apenas quando houver front-end web, web app, browser client UI, pages, screens, design system, ou outra superfície client-side tradicional real
- não materializar `coder-frontend` em projetos sem front-end
- materializar `coder-ios` apenas quando houver boundary nativo iOS real no workflow local, centrado em Swift e SwiftUI, com superfície materializada em navegação do app, state/view models, async/await, networking, persistência local, integrações do app, ou testes iOS
- tratar `UIKit interop` como evidência complementar para `coder-ios`, não como centro default do papel; ele só entra quando o repo já o materializa ou quando o cut exigir compatibilidade real
- não materializar `coder-ios` em projetos sem app iOS nativo real, e não presumir que todo mobile pertence a `coder-frontend`

### Política de materialização de `designer`
Classificar `designer` em um destes níveis:

- `REQUIRED`
  - materializar obrigatoriamente quando `Tipo: APP`
  - materializar obrigatoriamente quando houver evidência de design system próprio, UI library compartilhada, tokens, catálogo de componentes, múltiplos apps frontend, ou quando a superfície visual principal do produto fizer parte relevante do boundary do repo
- `DEFAULT`
  - materializar por padrão quando `Tipo: FE`
  - materializar por padrão quando `Tipo: FS` com frontend relevante
  - só excluir em `DEFAULT` se houver evidência explícita de que a UI é meramente utilitária, sem complexidade de fluxo, sem componentização relevante, e sem preocupação recorrente com responsividade, acessibilidade ou consistência visual
- `ON_DEMAND`
  - não materializar por padrão quando `Tipo: BE`
  - não materializar por padrão quando o frontend for incidental, técnico ou residual
  - nesses casos, `designer` só entra por gatilho explícito no cut ou no workflow local:
    - mudança de fluxo
    - componente novo ou reutilizável
    - estado de tela complexo
    - responsividade
    - acessibilidade
    - inconsistência visual
    - dúvida de UX

Regra de desempate:
- em projeto `APP` ou `FE`, na ausência de evidência forte para excluir, preferir `DEFAULT => materializar`

### Exemplos canônicos
- `Tipo: APP` com navegação, componentes próprios e superfície visual principal do produto -> `REQUIRED`
  - a UI pertence estruturalmente ao boundary do repo; materializar `designer` no projeto é obrigatório
- `Tipo: FE` com múltiplas telas, componentes reutilizáveis e fluxo de usuário relevante -> `DEFAULT`
  - materializar por padrão; a existência do agent no projeto não depende de gatilho excepcional
- `Tipo: FE` administrativo simples, com UI utilitária e baixo risco de UX -> `DEFAULT`
  - excluir só com evidência explícita de baixa complexidade visual, baixa variabilidade de estados e ausência de preocupação recorrente com acessibilidade, responsividade ou consistência visual
- `Tipo: FS` com backend dominante, mas frontend relevante no produto -> `DEFAULT`
  - backend forte não elimina a necessidade recorrente de direção de UI quando o frontend tem papel real no boundary
- `Tipo: BE` sem UI real no repo -> `ON_DEMAND`
  - não materializar por padrão quando a camada visual não pertence ao boundary do projeto
- repo técnico com dashboard residual, tela incidental ou interface apenas operacional -> `ON_DEMAND`
  - materializar apenas se o cut exigir fluxo, componente, estado complexo, acessibilidade, responsividade, inconsistência visual ou dúvida real de UX

Nota operacional:
- materializar `designer` no projeto não implica acioná-lo em todo round
- em classificações `DEFAULT`, ausência de evidência forte para excluir não é justificativa válida para omissão

### Agents de validação
Tratar `validation-eval-designer` e `validation-runner` como um par por padrão.

Materializar o par quando houver evidência de pelo menos um destes sinais:
- harness ou testes relevantes
- necessidade recorrente de provar comportamento, contrato, UX ou integração
- risco suficiente para exigir desenho explícito de validação antes de executar
- fluxo local em que a distinção entre desenhar prova e executar prova faz sentido operacional

Evitar materializar só um deles sem justificativa forte e explicitada.

Se o projeto for tão simples que a separação de design de validação e run de validação não se sustente por evidência, não inventar versões cosméticas desses agents. Nesses casos, bloquear ou reduzir o conjunto com justificativa factual clara, sem deixar handoffs quebrados.

### Agent de review semântico
Materializar `reviewer` quando o workflow local se beneficia de review técnico cut-scoped além da proof do runner, especialmente em mudanças estruturais, boundary-sensitive, refactors relevantes, impacto transversal ou alteração importante de contratos internos.

O `reviewer` não substitui `validation-runner`, não substitui `finalizer` e não deve ser inventado como ornamento para cuts triviais.

## Trilhas condicionais de risco
A skill deve preservar, nos specializeds materializados, o suporte a trilhas condicionais de `security`, `performance`, `migration/schema` e `observability/release safety` sem criar novos agents obrigatórios nem novos status.

Regras:
- reconhecer e propagar uma trilha apenas quando o cut ou o contexto local evidenciar risco material correspondente
- não universalizar essas trilhas para todo cut e não inflar o workflow com review ou proof decorativos
- fazer o `orchestrator` explicitar a trilha ativa no handoff e no desenho da rodada, sem transformar o router em analista pesado ou executor dessa trilha
- fazer o `validation-eval-designer` converter a trilha ativa em obrigações cut-scoped de prova dentro do `VALIDATION PACK`, sem virar registry genérico de risco
- fazer o `reviewer` verificar se risco estrutural material dessas trilhas foi ignorado, sem transformá-lo em especialista dedicado nem em substituto do runner
- preservar o ownership atual de `VALIDATION PACK`, `validation-runner` e `reviewer`

### Regra de coerência sistêmica
Não omitir um agent se essa omissão deixar outros agents com referências quebradas ou exigir distorção do contrato canônico para compensar.

Antes de remover um agent canônico do conjunto local:
- procurar referências a esse `.agent.md` nos demais specializeds
- remover ou adaptar essas referências de forma coerente com o papel do agent restante
- se a remoção exigir redefinir o protocolo local ou inventar um substituto não ancorado, não remover

## Como revisar e atualizar agents existentes
- revisar o conteúdo atual de `.github/agents/*.agent.md` contra:
  - `docs/**`
  - o modelo factual intermediário
  - templates/base agents canônicos
  - `agent-contract-shape`
  - `agent-specialization-quality-gate`
  - `status-gates`
- atualizar quando houver drift em:
  - stack ou frameworks reais
  - boundaries e superfícies do projeto
  - comandos, scripts ou harness local
  - matriz factual de harness/checks registrada em `docs/core/TESTING.md`
  - expectativas de validação
  - TBDs, exceções, padrões locais e escopo factual
  - `target`, `tools`, `agents` e `model` no frontmatter operacional
  - headings canônicos, inclusive `## Handoff`
  - handoffs ou referências a agents presentes ou ausentes
- ao revisar artifacts gerenciados existentes, normalizar o shape final e remover resíduos legados, mesmo quando o drift factual for pequeno
- remover `## Tools` do corpo por default quando `tools` já existir no frontmatter, salvo exceção humana explícita e justificada
- remover campos legados não canônicos do frontmatter especializado final, incluindo `agent_version`, salvo instrução humana explícita em sentido contrário
- preferir update em cima do agent local quando ele já for um artifact gerenciado válido
- quando a divergência for grande, regenerar o agent inteiro com base canônica + especialização factual local em vez de tentar patch incoerente
- ao alterar materialmente um agent gerenciado, incrementar `specialization_revision`

## Política para artifacts locais existentes
- se o arquivo já estiver em `.github/agents/`, tiver shape compatível e indicar `managed_artifact: true`, tratar como artifact gerenciado e atualizar com overwrite seguro
- se o arquivo existir mas estiver ambíguo, sem metadata suficiente, ou com sinais fortes de autoria humana fora do fluxo gerenciado, não sobrescrever cegamente
- se um artifact local não gerenciado conflitar com o conjunto que a skill precisa manter, bloquear e explicitar o conflito em vez de apagar ou substituir silenciosamente

## Quando deletar
Deletar apenas quando houver evidência suficiente de que o artifact local gerenciado se tornou obsoleto.

Casos típicos:
- o projeto não possui mais a superfície que justificava aquele agent
- o agent local ficou fora do conjunto mínimo útil decidido por evidência
- o agent local referencia um fluxo ou outro `.agent.md` que deixou de existir e isso não é mais justificável
- há duplicação de responsabilidade sem base factual
- o `orchestrator` aponta para um agent que não deve mais existir

Regras:
- priorizar deleção de artifacts gerenciados em `.github/agents/`
- permitir limpeza de referência stale em `.github/` apenas quando ficar claro que ela pertence ao sistema local gerenciado pela skill
- nunca tocar `.github/workflows/` por confusão de naming
- nunca deletar artifact ambíguo ou manual sem explicitar o conflito

## Como alinhar o `orchestrator`
- sempre revisar ou regenerar `orchestrator.agent.md` depois de decidir o conjunto final de agents
- o `orchestrator` deve referenciar apenas os agents realmente presentes em `.github/agents/`
- o `orchestrator.agent.md` deve conter `agents` e listar ali apenas os subagents realmente materializados em `.github/agents/`
- se `agents` estiver presente no `orchestrator`, `agent` deve estar presente em `tools`
- o conjunto em `agents` deve bater exatamente com o conjunto real de subagents materializados que o `orchestrator` coordena
- o `orchestrator` não pode declarar subagent ausente, stale ou ainda não materializado
- o `orchestrator` materializado deve operar como `status router only`, com `delegate-first`, `chat budget` explícito, `reading_scope_class: routing-minimal`, e sem narrativa operacional
- o `orchestrator` não pode carregar `vscode`, `vscode/memory`, `edit`, `execute` ou `todo` por default
- o `orchestrator` não pode abrir implementação por default antes do primeiro handoff
- o `orchestrator` deve ter budget operacional explícito antes do primeiro handoff
- o `orchestrator` só pode publicar delta mínimo suficiente no chat principal; artifacts ricos e evidência completa ficam no handoff interno por default
- depois de `APPROVED_EXECUTION` ou `SKIP_EXECUTION_APPROVAL`, o `orchestrator` nunca pode absorver implementação ou fallback de execução
- antes de rotear um executor, o `orchestrator` deve tornar explícito se o agent materializado tem capacidade real de editar e executar o cut; gap material vira blocker operacional antes da execução
- o `orchestrator` só pode aceitar do executor `READY` com evidência de alteração aplicada, ou `BLOCKED` com causa exata
- resposta narrativa, descritiva, analítica, pseudo-plano ou sem diff aplicado deve ser tratada como handoff inválido do executor, com parada explícita da rodada
- reentrada do mesmo executor na mesma rodada sem diff aplicado, `BLOCKED` formal, ou mudança real de gate, escopo ou autorização deve virar erro operacional explícito
- após execução, o próximo gate canônico é `validation-runner`, com prova do artifact implementado e quality proof definido no `VALIDATION PACK`
- o `validation-runner` só pode entrar quando existir artifact validável do executor; promessa de mudança não basta
- o `orchestrator` deve reconhecer quando o cut ativa trilha material de `security`, `performance`, `migration/schema` ou `observability/release safety` e explicitá-la no handoff
- o `orchestrator` não pode inventar trilha por reflexo nem transformar todo cut em `high risk` por default
- o `reviewer` só pode entrar com artifact implementado real e classificação explícita `required` ou `advisory`
- o `reviewer` não substitui a verdade de proof do `validation-runner`; ele agrega review semântico/arquitetural antes do fechamento
- ausência de `reviewer` `required` ou risco estrutural material não resolvido impede closure limpa
- não assumir `coder-frontend`, `coder-ios`, `designer`, `reviewer`, `validation-eval-designer`, `validation-runner` ou `resync` sem evidência e sem materialização local correspondente
- se `designer` não existir, remover referências normais a `designer.agent.md` e reescrever a lógica local para não pressupor sua entrada
- se `coder-ios` não existir, remover referências normais a `coder-ios.agent.md` e reescrever a lógica local para não presumir executor nativo iOS
- se `reviewer` não existir, remover referências normais a `reviewer.agent.md` e reescrever a lógica local para não pressupor review semântico dedicado
- se um coder não existir, o `orchestrator` não pode rotear trabalho para ele
- se os agents de validação não existirem, o `orchestrator` não pode fingir o workflow completo; bloquear ou ajustar o fluxo local sem inventar um agent substituto
- preservar a ordem canônica dos gates e o ownership definido em `status-gates`
- se gate, owner, boundary ou capability continuarem incertos após o budget de router, bloquear ou escalar em vez de continuar lendo

## Política canônica de superfície e retorno
Todo specialized gerado por esta skill deve herdar o contrato do base agent e preservar disciplina de superfície auditável.

Checks obrigatórios de materialização:
- `surface discipline`
- `delta-only communication`
- `no operational narration`
- `no artifact dump into main chat`
- `delegate-first` para `orchestrator`
- `chat budget` explícito quando o papel tiver superfície curta relevante no chat principal

Aplicação por papel:
- `orchestrator`: status router only; devolver apenas status atual, blocker real, decisão DEV necessária, próximo agent ou passo, delta novo realmente relevante, e trilhas condicionais de risco quando materialmente ativas; nunca absorver implementação, rejeitar handoff descritivo do executor, e só liberar runner com artifact validável
- `planner`: manter `EXECUTION BRIEF` rico, mas devolver só status do brief, grupos ou packages quando aplicável, dependências críticas, riscos vivos e sinal de paralelização segura
- `validation-eval-designer`: manter `VALIDATION PACK` rico, mas devolver só `READY` ou gate, obrigações de prova abertas e decisão DEV necessária se existir; o pack deve carregar checks determinísticos relevantes ao cut e classificá-los como `required`, `optional`, `not_applicable` ou `blocked_by_harness`, além de converter trilhas condicionais materialmente ativas em prova cut-scoped
- `coder-backend`, `coder-frontend` e `coder-ios`: devolver só `READY` com paths alterados ou evidência equivalente, checks rodados ou explicitamente não rodados, e risco residual; quando faltar capacidade real de editar ou executar, ou quando o cut não puder ser implementado com segurança, devolver `BLOCKED` cedo com causa exata. No caso de `coder-ios`, o default deve permanecer Swift + SwiftUI, com `UIKit interop` apenas como capacidade condicional baseada em evidência real
- `reviewer`: devolver review curto e delta-only do artifact implementado, distinguindo risco estrutural material, melhoria recomendada não-bloqueante e observação cosmética; reconhecer quando trilha material de risco foi ignorada, sem virar especialista dedicado; não reimplementar, não redesenhar o plano, não rerodar proof, e não transformar preferência subjetiva em bloqueio duro sem risco técnico real
- `validation-runner`: executar e julgar a prova funcional e os checks determinísticos do pack no escopo do cut; distinguir falha validada, bloqueio de harness, check obrigatório ausente e green irrelevante; check obrigatório ausente ou falho nunca vira detalhe cosmético
- `finalizer`: consumir evidência e verdict do runner para closure; não fazer review técnico substituto, rerun de checks, nem julgamento substituto do `validation-runner`

Se o specialized reabrir verbosity, execution log ou narrativa operacional como comportamento default, a materialização falhou.

## Política canônica de paralelização controlada
Tratar paralelização como política de orquestração e coordenação, nunca como promessa de runtime.

Singletons obrigatórios:
- `orchestrator`
- `planner`
- `validation-eval-designer`
- `validation-runner`
- `finalizer`
- `resync`

Singleton condicional:
- `reviewer` quando materializado e usado no workflow local para review semântico/arquitetural real; ele permanece singleton quando entra, mas não deve ser materializado ou roteado como ornamento para cuts triviais

Papéis paralelizáveis:
- `coder-backend`
- `coder-frontend`
- `coder-ios`
- `designer` quando aplicável

Limite:
- no máximo 3 instâncias ativas por papel paralelizável

Só permitir paralelização quando existir pacote de trabalho com:
- boundaries claros
- ownership de paths
- dependências mapeadas
- shared-contract risks explícitos
- merge order ou coordenação mínima

Se houver arquivo compartilhado ou contrato compartilhado sem owner claro, não paralelizar.

## Como escolher `tools`
`tools` no frontmatter é obrigatório nos agents especializados do repo alvo.

Regras:
- escolher tools por missão real do agent e por least privilege
- `web` nunca é obrigatório por default; só incluir quando a missão do agent realmente precisar consultar contexto externo atual
- `execute` é ferramenta sensível; só incluir quando o agent precise executar testes, scripts, builds, linters, validações ou diagnósticos locais
- `agent` é ferramenta de coordenação; reservar para agents que realmente orquestram outros agents, e torná-la obrigatória no `orchestrator` quando `agents` for usado
- `edit` só entra quando o agent precisa materializar, modificar ou sincronizar artifacts locais
- `read` e `search` são a base da maioria dos agents; `read/readFile` só deve entrar quando o runtime diferenciar isso de forma útil
- `vscode` e `vscode/memory` são proibidas por default em specializeds gerados por esta skill; só entram com justificativa estrutural fortíssima, explícita e compatível com a role class
- `todo` não entra por default; só incluir quando houver justificativa factual forte e explícita de que a missão do agent depende de controlar trabalho multi-etapa real
- no `orchestrator`, `planner` e `validation-eval-designer`, qualquer `todo` deve ser tratado como sinal de ruído operacional salvo exceção humana explícita

Perfis mínimos por role class:
- `router`
  - permitidas: `read`, `search`, `agent`
  - proibidas por default: `edit`, `execute`, `todo`, `vscode`, `vscode/memory`, `web`
- `planning`
  - permitidas: `read`, `search`
  - proibidas por default: `agent`, `edit`, `execute`, `todo`, `vscode`, `vscode/memory`, `web`
- `proof-design`
  - permitidas: `read`, `search`
  - proibidas por default: `agent`, `edit`, `execute`, `todo`, `vscode`, `vscode/memory`, `web`
- `semantic-review`
  - permitidas: `read`, `search`
  - proibidas por default: `agent`, `edit`, `execute`, `todo`, `vscode`, `vscode/memory`, `web`
- `executor`
  - base permitida: `read`, `search`
  - coders normalmente adicionam `edit`, `execute`, `todo`
  - `designer` pode omitir `edit` e `execute`, mas continua responsável por custo local do seu boundary
- `proof-execution`
  - permitidas: `read`, `search`, `execute`
  - `todo` só quando houver justificativa operacional forte
- `closure`
  - permitidas: `read`, `search`, `edit`
  - `todo` só quando houver justificativa operacional forte
- `sync`
  - permitidas: `read`, `search`, `edit`
  - `todo` só quando houver justificativa operacional forte

Perfis mínimos sugeridos por papel, sempre ajustáveis por evidência:
- `orchestrator`: `read`, `search`, `agent`
- `planner`: `read`, `search`
- `reviewer`: `read`, `search`
- `finalizer`: `read`, `search`, `edit`, `todo`
- `resync`: `read`, `search`, `edit`, `todo`
- `coder-backend`: `read`, `search`, `edit`, `execute`, `todo`
- `coder-frontend`: `read`, `search`, `edit`, `execute`, `todo`
- `coder-ios`: `read`, `search`, `edit`, `execute`, `todo`
- `designer`: `read`, `search`, `todo`
- `validation-eval-designer`: `read`, `search`
- `validation-runner`: `read`, `search`, `execute`, `todo`

Incluir `web` apenas quando o contexto do projeto indicar dependência real de conhecimento externo atual para aquele papel, e nunca como substituto para `docs/**`.

## Como escolher `model`
- usar `docs/**`, o modelo factual intermediário e o papel do agent para inferir o tipo de trabalho, não para prometer "o melhor modelo"
- se `model_policy` existir, aplicá-la com precedência sobre heurística implícita
- se `model_policy` não existir mas `allowed_models` existir, preferir uma política conservadora com modelo padrão único ou pequena variação por papel com justificativa operacional clara
- se não existir `allowed_models` nem `model_policy`, `model` pode ser omitido no frontmatter
- `model` pode ser string única ou lista priorizada
- usar lista priorizada apenas quando houver justificativa operacional real e sem criar fallback complexo por imaginação
- se `model` for lista priorizada, manter ordem explícita e compatível com `allowed_models` quando essa entrada existir
- não justificar `model` com texto genérico como "adequado para engenharia"
- não prometer escolha ótima, universal ou provider-agnostic sem política explícita

## Quality gate pós-geração
Após gerar ou atualizar os specializeds, executar um quality gate independente do framing da geração.

O gate consome:
- o conjunto materializado em `.github/agents/`
- o modelo factual intermediário
- os base agents canônicos e o contrato `agent-contract-shape`
- a referência `agent-specialization-quality-gate`
- `execution-lifecycle`
- `status-gates`
- apenas as refs de docs e codebase já mapeadas como evidência, salvo bloqueio por ambiguidade real

Checks obrigatórios:

### Structural shape check
Verificar:
- frontmatter obrigatório presente e completo
- headings e seções obrigatórias do base agent presentes com naming canônico
- shape canônico consistente com `agent-contract-shape`
- `target: vscode`, `tools`, `agents` no `orchestrator`, `base_agent_version`, `specialization_revision` e `managed_artifact: true`
- remoção de campos legados não permitidos, incluindo `agent_version`
- ausência de `## Tools` residual por default quando `tools` já existe no frontmatter
- presença de contrato explícito de surface discipline quando o papel tiver risco real de poluir o chat principal
- presença de `chat budget` explícito quando o papel tiver superfície curta relevante no chat principal

### Role-class integrity check
Verificar:
- cada specialized foi classificado na role class canônica correta
- `reading_scope_class` está compatível com a role class
- wording de missão, proibicoes, handoff e protocol-fixed part não empurra o papel para outra classe
- especialização local não relaxou invariantes centrais da role class

Hard fails:
- `orchestrator` fora de `routing-minimal`
- `planner` fora de `bounded-context`
- `reviewer` fora de `review-minimal`
- `validation-runner` ou `finalizer` fora de `minimal-verification`
- `resync` com leitura mais ampla que `targeted-local`

### Router cost and tool check
Verificar no `orchestrator`:
- ferramentas compatíveis com `router`
- ausência de `edit`, `execute`, `todo`, `vscode`, `vscode/memory` e `web` por default
- ausência de leitura ampla obrigatória antes do primeiro handoff
- budget operacional explícito antes do primeiro handoff
- regra explícita de handoff imediato quando o owner já está claro
- regra explícita de parar para blocker ou DEV em vez de continuar lendo indefinidamente
- reconhecimento explícito de trilhas condicionais de `security`, `performance`, `migration/schema` e `observability/release safety` apenas quando houver risco material
- trilha material ausente no handoff é tratada como defeito de roteamento, sem universalizar `high risk` por default

### Planner containment check
Verificar no `planner`:
- leitura menor que um discovery amplo
- ausência de wording que trate `live code, contracts, tests, nearby boundaries` como checklist default
- budget operacional explícito para framing
- expansão permitida apenas para estabilizar in-scope versus out-of-scope, boundary, source of truth ou shared contract dependency real
- ausência de resolução de desenho de implementação local, algoritmo, refactor shape, projection strategy ou query shape
- safe parallelization só afirmada com evidência real

### Proof-design locality check
Verificar no `validation-eval-designer`:
- role class `proof-design` preservada
- ausência de tools excessivas herdadas por acidente
- ausência de wording que compense leitura que `orchestrator` ou `planner` deixaram de fazer
- `VALIDATION PACK` mantido como artifact local e orientado a prova
- consumo explícito de `docs/core/TESTING.md` como base factual de comandos canônicos, paths manuais aceitos, pré-requisitos e limites de harness quando esse doc existir
- a matriz local informa o pack sem ser copiada inteira nem virar checklist universal
- ausência ou fraqueza da matriz local aparece explicitamente no harness judgment quando relevante
- trilhas condicionais ativas viram obrigações cut-scoped de prova para `security`, `performance`, `migration/schema` e `observability/release safety` quando houver risco material
- ausência de checklist burocrático universal de trilhas de risco quando o cut não pedir

### Executor ownership check
Verificar em `coder-backend`, `coder-frontend`, `coder-ios`, `designer` e equivalentes:
- leitura profunda e custo principal da execução pertencem a essa classe
- `targeted-local` preservado
- capability gate explícito
- `read-only runtime is not execution` explícito quando houver risco
- `READY` apenas com evidência real de mudança aplicada
- `BLOCKED` cedo quando faltar base ou capacidade
- em `coder-ios`, o wording mantém foco default em Swift + SwiftUI e não deriva para executor UIKit-heavy sem evidência do repo ou necessidade real do cut
- wording não transforma executor em planner, router, runner ou finalizer

### Proof-execution, closure, and sync containment check
Verificar em `validation-runner`, `finalizer` e `resync`:
- leitura curta e focada no delta já delimitado
- ausência de rediscovery amplo
- ausência de wording que compense erro upstream com scan novo
- `validation-runner` permanece minimal-verification
- `validation-runner` executa e julga os checks determinísticos exigidos no `VALIDATION PACK`, sem virar smoke runner repo-wide
- `validation-runner` usa `VALIDATION PACK` para o que provar e `docs/core/TESTING.md` para quais comandos, manual paths e limites de harness são canônicos quando esse doc existir
- `validation-runner` distingue comando canônico indisponível no ambiente, harness inexistente, harness fraco e path manual aceito
- a existência da matriz local não expande a run para além do cut
- check obrigatório ausente, falho ou bloqueado por harness afeta verdict e confidence de forma explícita
- `finalizer` permanece minimal-verification
- `finalizer` permanece closure-only e não absorve review técnico, rerun ou re-julgamento do runner
- `resync` permanece targeted-local

### Semantic-review containment check
Verificar em `reviewer`:
- `reviewer` permanece `review-minimal`
- a leitura continua cut-scoped e não vira rediscovery amplo
- o wording nao transforma `reviewer` em executor, `validation-runner` ou `finalizer`
- o output separa risco estrutural material, melhoria recomendada e observacao cosmetica ou irrelevante
- o `reviewer` nao reimplementa, nao reroda proof e nao assume closure
- o `reviewer` reconhece quando risco estrutural material de `security`, `performance`, `migration/schema` ou `observability/release safety` foi ignorado, sem virar especialista dedicado

### Execution protocol hardening check
Verificar:
- o `orchestrator` explicita que nunca implementa fallback depois de handoff para executor
- o `orchestrator` nunca absorve execução após `APPROVED_EXECUTION`
- o `orchestrator` só aceita do executor `READY` com evidência de alteração aplicada, ou `BLOCKED` com causa exata
- gap material de capability de editar ou executar aparece como blocker pré-execução
- resposta narrativa, descritiva, pseudo-plano, leitura ampla adicional, ou sem diff aplicado é tratada como handoff inválido
- reentrada do mesmo executor sem diff aplicado, `BLOCKED` formal, ou mudança real de gate, escopo ou autorização é rejeitada como erro operacional
- executors `READY` exigem changed paths ou evidência equivalente, checks rodados ou explicitamente não rodados, e risco residual
- `validation-runner` só entra com artifact validável do executor
- `reviewer` só entra com artifact implementado real e classificação explícita `required` ou `advisory`
- ausência de review `required` ou risco estrutural material não resolvido impede closure limpa

### Factual fidelity, certainty, and coverage check
Verificar:
- TBDs continuam semanticamente preservados quando relevantes
- exceções documentadas continuam visíveis quando limitam uma regra ou guidance local
- afirmações globais só existem quando a evidência sustenta
- scoped patterns continuam scoped e não viram convenção global
- exemplos do projeto continuam marcados como exemplos
- checks manuais continuam marcados como checagem
- `validation-eval-designer` e `validation-runner` não ignoram nem contradizem `docs/core/TESTING.md` sem justificativa factual, qualificação de escopo ou conflito explicitado
- linguagem absoluta perigosa é rebaixada quando a evidência não sustenta
- o conjunto cobre stack, superfícies, boundaries, harness, hotspots, TBDs e exceções relevantes sem espalhar tudo em todo agent

## Verdict interno do quality gate
O verdict do gate é interno à skill e não se confunde com os verdicts do `validation-runner.agent.md`.

Usar exatamente estes estados:
- `PASS`
  - todos os checks críticos passaram e o conjunto está consistente
- `PASS_WITH_WARNINGS`
  - o conjunto está honesto e consistente, mas restam warnings não críticos que não pedem repair obrigatório
- `NEEDS_FIX`
  - existem problemas reparáveis em arquivos específicos; a skill deve reparar somente os arquivos sinalizados e revalidar
- `BLOCKED`
  - falta evidência, existe conflito material, artifact ambíguo ou inconsistência séria que impede conclusão honesta

Regras:
- `NEEDS_FIX` dispara repair
- `BLOCKED` impede conclusão honesta
- a skill só pode considerar o trabalho done quando o estado final do gate for `PASS` ou `PASS_WITH_WARNINGS`

## Repair loop controlado
Quando o gate retornar `NEEDS_FIX`:
- corrigir somente os arquivos sinalizados pelo gate
- preservar os arquivos já aprovados sempre que não houver dependência real de ajuste
- reexecutar o gate completo depois do repair
- não abrir loop infinito; fazer no máximo uma ou poucas iterações conscientes
- se a falha séria persistir após as tentativas razoáveis de repair, promover o resultado para `BLOCKED` com relatório honesto

O repair loop existe para autocorreção localizada, não para esconder fraqueza factual com reescrita ilimitada.

## Exemplos canônicos de shape esperado

### `orchestrator.agent.md`
```yaml
---
name: orchestrator
description: Orquestra o fluxo local do projeto usando apenas os agents realmente materializados.
target: vscode
tools:
  - read
  - search
  - agent
agents:
  - planner
  - coder-backend
  - reviewer
  - validation-eval-designer
  - validation-runner
  - finalizer
  - resync
model: <default-model>
base_agent_version: "2026.4"
specialization_revision: 1
managed_artifact: true
---
```

### `coder-backend.agent.md`
```yaml
---
name: coder-backend
description: Implementa mudanças backend do projeto respeitando arquitetura, contratos e harness local.
target: vscode
tools:
  - read
  - search
  - edit
  - execute
  - todo
model:
  - <coding-model>
  - <shared-default-model>
base_agent_version: "2026.4"
specialization_revision: 1
managed_artifact: true
---
```

Notas para os exemplos:
- os valores acima são apenas exemplos de shape, não prescrição fixa de provider ou modelo
- `model` pode ser string única ou lista priorizada
- o valor real de `model` deve respeitar `allowed_models` quando essa entrada existir
- quando `model_policy` existir, ele governa a preferência de escolha por papel
- se não existir `allowed_models` nem `model_policy`, a skill pode omitir `model` e deixar o runtime usar o model picker atual
- os exemplos representam o artifact final normalizado, sem `## Tools` no corpo e sem campos legados como `agent_version`
- os exemplos de frontmatter não substituem o contrato endurecido do corpo; `orchestrator` e executors continuam obrigados a explicitar capability gate, validade do handoff e regra de runner só com artifact validável
- não inventar campos extras fora do necessário

## EXECUTE OUTPUT esperado
- informar se houve materialização, atualização, deleção, normalização, validação e repair
- listar os artifacts criados, atualizados ou removidos
- explicitar quando houve normalização de frontmatter
- explicitar quando houve remoção de `## Tools`
- explicitar quando houve remoção de campos legados, incluindo `agent_version`, quando aplicável
- informar o verdict final do quality gate e, se houve repair, quais arquivos ele sinalizou
- nomear qualquer exceção humana explícita que tenha mantido resíduo legado por decisão consciente
- se houver bloqueio, separar claramente o que foi normalizado do que ficou pendente

## Definição de done
- frontmatter operacional coerente em cada specialized materializado
- ausência de frontmatter parcial tratado como aceitável
- artifacts finais normalizados no shape canônico vigente
- `target: vscode` presente em todos os `.agent.md` materializados
- `tools` presente no frontmatter de todos os specializeds materializados
- `agents` presente no `orchestrator.agent.md`
- `agents` do `orchestrator` bate exatamente com o conjunto real de subagents materializados
- `agent` presente em `tools` do `orchestrator` quando `agents` for usado
- `model` coerente com `allowed_models` e `model_policy` quando essas entradas tiverem sido fornecidas
- role class canônica respeitada em todos os specializeds materializados
- `orchestrator` materializado com `routing-minimal` e sem tools indevidas
- `planner` materializado com `bounded-context` e sem wording de broad discovery por default
- `reviewer` materializado com `review-minimal` e sem drift para execução, validação ou closure
- ausência de `## Tools` no corpo quando `tools` já existir no frontmatter, salvo exceção explicitamente justificada
- ausência de campos legados fora do contrato atual, incluindo `agent_version` por default
- ausência de duplicação entre source of truth operacional e texto legado residual
- surface discipline explícita e coerente com o papel
- ausência de narrativa operacional e artifact dump no chat principal como comportamento default
- `chat budget` explícito quando aplicável
- `delegate-first` explícito no `orchestrator`
- o `orchestrator` explicita que nunca implementa fallback nem absorve execução após handoff
- o `orchestrator` tem budget operacional explícito antes do primeiro handoff
- gaps materiais de capability aparecem como blockers pré-execução
- executors materializados restringem a saída a `READY` real ou `BLOCKED` real
- executors materializados carregam a maior parte do custo operacional da rodada
- resposta descritiva do executor sem alteração aplicada é rejeitada como handoff inválido
- reentrada do mesmo executor sem diff, `BLOCKED`, ou mudança real de gate, escopo ou autorização é tratada como erro operacional
- `validation-runner` só é habilitado com artifact validável do executor
- `validation-eval-designer` e `validation-runner` permanecem coerentes com `docs/core/TESTING.md` quando esse doc existir, sem substituir o `VALIDATION PACK`
- `reviewer` só é habilitado com artifact implementado real e classificação explícita `required` ou `advisory`
- `reviewer` distingue risco estrutural material de melhoria recomendada e observação cosmética sem drift para executor, runner ou finalizer
- trilhas condicionais de `security`, `performance`, `migration/schema` e `observability/release safety` entram apenas quando há risco material e permanecem amarradas a handoff, proof e review sem checklist universal
- política de paralelização segura restrita aos workers paralelizáveis e limitada a 3 instâncias por papel
- handoffs coerentes com o conjunto final realmente materializado
- ausência de referências ativas a `.agent.md` inexistente
- TBDs, exceções, scoped patterns, exemplos e checks manuais preservados com a força factual correta onde forem relevantes
- quality gate final em `PASS` ou `PASS_WITH_WARNINGS`

## O que não fazer
- não inventar papel, boundary, contrato, fluxo ou integração sem evidência suficiente
- não gerar todos os agents por default
- não materializar especialistas cosméticos
- não alterar base agents
- não alterar o contrato canônico dos base agents sem ordem humana explícita
- não depender de `.agent.md` inexistente
- não deixar o `orchestrator` apontando para agents ausentes
- não usar `web` como source of truth factual do projeto
- não tratar `.github/agents/` como a fonte factual principal do repo
- não materializar `agent-contract-shape`, `agent-specialization-quality-gate` e `status-gates` no repo alvo na v1
- não criar docs do repo alvo por imaginação
- não espalhar `tools` em dois lugares como source of truth
- não perpetuar `## Tools` no corpo por inércia quando `tools` já estiver no frontmatter
- não introduzir `metadata:` aninhado como base central do runtime
- não reintroduzir `agent_version` como campo canônico do specialized
- não reabrir execution log, narrativa operacional ou artifact dump no chat principal
- não transformar exemplo local em regra global
- não transformar pattern scoped em convenção global sem evidência forte
- não resumir `open_tbd` de modo genérico que apague seu conteúdo factual
- não esconder `documented_exception` atrás de linguagem absoluta
- não criar dependência em `.github/workflows/`
- não prometer escolha "ótima" de modelo sem política explícita
- não criar arquivos auxiliares supérfluos

## Critérios de bloqueio
Bloquear a especialização quando ocorrer qualquer um destes casos:
- a base factual mínima estiver ausente ou insuficiente mesmo após leitura séria de `docs/**`
- o boundary do projeto for impossível de entender com honestidade
- faltar evidência mínima para distinguir quais agents fazem sentido
- existir conflito factual relevante entre docs e codebase sem base suficiente para resolver
- o pedido exigir invenção de especialistas sem ancoragem factual
- existir artifact local ambíguo ou manual em `.github/agents/` cujo overwrite ou delete não seja seguro
- a remoção de um agent exigiria quebrar o protocolo local ou deixar referências órfãs sem alternativa honesta
- o quality gate detectar inconsistência séria de shape, referência ou fidelidade factual que não seja reparável com segurança

## Fechamento operacional
A skill só está done no repo alvo quando todas as condições abaixo já estiverem satisfeitas pela definição de done acima:
- o conjunto de agents em `.github/agents/` foi decidido por evidência factual do projeto
- o modelo factual intermediário foi construído e usado como base de geração e validação
- apenas os agents necessários foram materializados ou mantidos
- agents gerenciados stale foram atualizados ou deletados conforme necessário
- todo artifact materializado contém frontmatter obrigatório completo, sem campos mandatórios ausentes e sem legado residual fora do contrato
- o `orchestrator` reflete apenas o conjunto real de agents presentes
- nenhum agent local referencia `.agent.md` inexistente
- o contrato canônico dos base agents foi preservado
- `agent-contract-shape`, `agent-specialization-quality-gate` e `status-gates` foram usados como referência, não materializados no repo alvo
- o verdict final do quality gate é `PASS` ou `PASS_WITH_WARNINGS`
- qualquer bloqueio residual foi nomeado explicitamente em vez de mascarado com texto genérico

## Regra final de honestidade
Se a base factual do repo alvo não sustentar com honestidade a decisão sobre o sistema local de agents, parar. O comportamento correto não é preencher lacunas com um kit completo por conveniência; é bloquear e explicar exatamente qual evidência falta.
