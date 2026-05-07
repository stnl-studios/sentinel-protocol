---
name: stnl_project_agent_specializer
description: Descobre, materializa, revisa, atualiza e remove o conjunto minimo util de agents especializados de um repo alvo ja preparado por stnl_project_context ou, em greenfield, por stnl_project_foundation.
---

# STNL Project Agent Specializer

## Missão
Ler a base documental consolidada de um repo alvo já preparado por `stnl_project_context` ou, em greenfield, por `stnl_project_foundation`, construir um modelo factual intermediário normalizado e materializar, com validação e repair controlado, o conjunto mínimo útil de agents locais no runtime indicado por `target`.

Esta skill também revisa, atualiza e deleta artifacts locais obsoletos no output gerenciado do `target` quando forem parte do conjunto gerenciado, mantendo o `orchestrator` alinhado ao conjunto real de agents presentes e sem referências quebradas para artifacts de agent inexistentes.

Esta skill é um utilitário global. Ela não é um agent do workflow do projeto alvo.

## Quando usar
- quando o repo alvo já passou por `stnl_project_context` ou, em greenfield, por `stnl_project_foundation`, e precisa do primeiro conjunto de agents especializados
- quando o output de agents do `target` não existe, está incompleto, está em drift, ou contém artifacts gerenciados stale
- quando os docs do projeto evoluíram e os agents locais precisam refletir novos boundaries, stacks, comandos, superfícies ou ferramentas
- quando o `orchestrator` local precisa voltar a refletir apenas os agents realmente materializados
- quando for preciso revisar ferramentas concedidas na metadata operacional `tools`, remover excesso de privilégio e eliminar drift factual ou estrutural

## Quando não usar
- antes de executar `stnl_project_context` no repo alvo, ou `stnl_project_foundation` quando o repo ainda for greenfield/inception
- para inventar especialistas, workflows, boundaries ou integrações sem evidência suficiente
- para alterar os base agents canônicos, seu contrato, seus status, seus gates ou o versionamento do Sentinel
- para materializar `agent-contract-shape`, `agent-specialization-quality-gate` ou `status-gates` no repo alvo na v1
- para criar GitHub Actions, arquivos em `.github/workflows/`, ou qualquer automação confundida com workflow de agents
- para acoplar o conjunto especializado a um projeto específico de referência em vez do repo alvo atual

## Pré-condições
- o workspace atual já é o repo alvo da especialização
- `stnl_project_context` já rodou anteriormente no repo alvo, ou `stnl_project_foundation` já materializou uma fundação greenfield séria
- existe base documental mínima séria em `docs/**`, especialmente `docs/INDEX.md`, `docs/TBDS.md` quando existir, `docs/core/*`, e os recortes de `docs/units/*` ou `docs/features/*` relevantes
- a base documental é suficiente para entender com honestidade as camadas reais ou declaradas do projeto, os principais boundaries e o shape mínimo do workflow local
- existe permissão para criar, atualizar e deletar artifacts gerenciados no output do `target` escolhido e, se necessário, limpar referências gerenciadas obsoletas desse mesmo runtime

## Inputs esperados no repo alvo
- `docs/**` como source of truth principal, com prioridade especial para o material consolidado por `stnl_project_context` ou, em greenfield, por `stnl_project_foundation`
- `docs/core/TESTING.md`, quando existir, como referência principal da matriz local de harness/checks para `validation-eval-designer` e `validation-runner`; quando a base vier de `stnl_project_context`, pode representar realidade factual observada, e quando a base vier de `stnl_project_foundation`, deve ser lido como estratégia declarada, expectativa de validação ou baseline documental até evidência observada na codebase
- `target` opcional, com suporte mínimo a `vscode` e `codex`; quando omitido, usar `vscode` para preservar compatibilidade com o comportamento atual
- artifacts gerenciados já existentes no output do `target`, quando existirem, para revisão de drift, coerência operacional, metadata e stale artifacts
- a codebase do repo alvo apenas quando os docs precisarem de confirmação, complemento ou desempate factual
- manifests de stack, scripts, testes, configs e entrypoints reais quando forem necessários para especializar comandos, provas, boundaries ou superfícies
- `allowed_models` opcional quando o uso da skill quiser restringir a escolha de `model` dos agents especializados
- `model_policy` opcional para governar a preferência de `model` por agent, role fina ou defaults de compatibilidade:
  - `reasoning_default`
  - `coding_default`
  - `execution_default`
  - `agents`
  - `roles`

## Source of truth e ordem de evidência
Usar esta ordem de precedência no repo alvo:

1. `docs/**`, especialmente o kit consolidado por `stnl_project_context` ou, em greenfield, por `stnl_project_foundation`
2. referências canônicas da skill e templates/base agents canônicos
3. codebase do repo alvo, apenas quando necessário para validar ou completar entendimento
4. `web`, apenas como apoio para especializar stack, integrações, frameworks, padrões ou contexto técnico externo atual
5. `web` nunca substitui evidência factual do projeto alvo

Regras complementares:
- `docs/**` descreve a verdade documental do projeto alvo; artifacts gerenciados de agents descrevem a materialização operacional local do `target` e não substituem essa verdade documental
- o Sentinel não usa storage persistente externo para agents; o único estado persistente permitido é durable documentation em canonical docs under `docs/**`
- nenhum agent Sentinel, template gerenciado ou reference agent pode criar, atualizar, depender, autorizar ou mencionar storage externo de fatos fora de `docs/**`, incluindo caminhos externos de memória de repo ou canais persistentes equivalentes
- estado de feature deve ser tratado como `Feature CONTEXT` em `docs/features/<feature>/CONTEXT.md`; documentação compartilhada deve ser tratada como shared canonical docs em `docs/core/*`, `docs/TBDS.md`, `docs/INDEX.md` e superfícies canônicas equivalentes já existentes
- vocabulário de materialização deve usar durable documentation, canonical docs under `docs/**`, `Feature CONTEXT`, shared canonical docs e documentation targets; não introduzir contrato paralelo de memória
- quando a base vier de `stnl_project_foundation`, preservar nos agents a diferenca entre `declarado`, `observado`, `hipotese` e `TBD`; nao transformar contrato esperado em implementacao existente
- `docs/core/TESTING.md`, quando existir, é a referência primária para comandos canônicos, paths manuais aceitos, pré-requisitos e limites de harness dos agents de validação; tratar como factual observado quando a base vier de `stnl_project_context`, e como estratégia declarada quando a base vier de `stnl_project_foundation` até confirmação na codebase
- se docs e codebase conflitarem de modo material, não escolher por preferência nem por conveniência; nomear o conflito e bloquear quando ele impedir especialização honesta
- em conflito material envolvendo base de `stnl_project_foundation`, seguir rota canônica: se a direção ainda for documental, encaminhar para `stnl_project_foundation MODE=REFINE`; se a autoridade estiver migrando para a codebase, encaminhar para `stnl_project_foundation MODE=HANDOFF` e depois para `stnl_project_context` quando aplicável
- na dúvida sobre qual fonte deve prevalecer, bloquear a especialização; esta skill não arbitra conflito estrutural entre docs fundacionais e codebase nascente por conta própria
- usar `web` só depois da leitura séria do projeto e apenas quando contexto externo atual realmente mudar a qualidade da especialização
- o quality gate pós-geração valida contra o modelo factual intermediário e as referências já mapeadas; ele não é licença para um scan amplo novo por inércia

## Escopo operacional
- descobrir quais agents locais fazem sentido para o repo alvo
- construir um modelo factual intermediário normalizado antes de gerar qualquer specialized
- materializar apenas os agents necessários no output final do `target`
- revisar e atualizar agents já existentes no output final do `target`
- deletar artifacts gerenciados obsoletos no output final do `target` quando estiverem stale, órfãos ou incoerentes com o conjunto decidido
- manter o `orchestrator` alinhado ao conjunto real de agents materializados
- garantir que nenhum agent materializado continue referenciando artifact de agent inexistente no mesmo `target`
- garantir shape operacional coerente com o `target` em cada agent especializado do repo alvo
- aplicar um quality gate pós-geração separado do framing da geração
- reparar apenas os arquivos sinalizados pelo gate e revalidar antes de concluir

## Agents canônicos que esta skill sabe gerir
- `coder-backend`
- `coder-frontend`
- `coder-ios`
- `designer`
- `execution-package-designer`
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
- `execution-package-design`: `execution-package-designer`
- `executor`: `coder-backend`, `coder-frontend`, `coder-ios`
- `design-contributor`: `designer`
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
- a inteligência executável pertence a `execution-package-design`; coders continuam especialistas por stack/projeto, mas executam pacotes explícitos
- o custo principal de execução pertence aos coders dentro do pacote autorizado; broad discovery não é custo normal do coder
- `router` e `planning` devem ficar deliberadamente mais fracos que os executors em leitura e ferramentas
- `proof-execution`, `closure` e `sync` não podem compensar gaps upstream com rediscovery amplo

## Referências canônicas que esta skill usa, mas não materializa no repo alvo na v1
- `agent-contract-shape`
- `agent-specialization-quality-gate`
- `execution-lifecycle`
- `status-gates`

Contrato obrigatório do bundle interno:
- antes de ler qualquer base agent, template ou contrato interno da skill, ler primeiro `reference/MANIFEST.md`
- usar somente os paths explícitos listados em `reference/MANIFEST.md` e necessários para a rodada
- não descobrir base agents, templates ou contratos internos por busca ampla, regex, glob, inspeção de árvore ou scan textual
- não usar fallback em `templates/**`, `skills/**`, `~/.agents/**`, filesystem externo ou qualquer cópia fora do bundle instalado da própria skill
- se `reference/MANIFEST.md` estiver ausente, bloquear com `BLOCKED_REFERENCE_BUNDLE_MISSING`
- se qualquer arquivo obrigatório listado em `reference/MANIFEST.md` estiver ausente, bloquear com `BLOCKED_REFERENCE_BUNDLE_MISSING`
- o bloqueio deve reportar a skill `stnl_project_agent_specializer`, o arquivo ausente e a ação sugerida: `node sentinel.mjs update` e `node sentinel.mjs doctor`
- nunca reconstruir, adivinhar, simplificar ou procurar substituto para base agent, template ou contrato interno ausente

Referências internas esperadas devem vir do manifest instalado, incluindo:
- base agents canônicos em `reference/agents/`
- template Codex em `reference/templates/codex/AGENTS.md`
- contratos de agent em `reference/docs/agents/`
- contratos de workflow em `reference/docs/workflow/`

## Contrato de `target`
`target` define o runtime operacional para o qual a skill vai materializar artifacts no repo alvo.

Targets suportados:
- `vscode`: comportamento compatível com a v1 atual; materializa agents em `.github/agents/*.agent.md`
- `codex`: materializa agents em `.codex/agents/*.toml` e materializa também `AGENTS.md` na raiz do repo alvo

Regras:
- quando `target` for omitido, usar `vscode`
- `target` sempre pertence ao repo alvo, nunca ao repo Sentinel Protocol
- o repo Sentinel Protocol mantém somente source of truth e templates internos; ele não é local válido para artifacts finais de nenhum target
- a semântica dos agents é target-agnostic e deve preservar missão, ownership, gates, role class, sequencing, status, handoffs e política de tools
- a semântica dos agents é target-agnostic também para terminal handoff: nenhum `target` (`vscode` ou `codex`) pode relaxar executor `READY/BLOCKED`, consumer-side rejection de handoff inválido, runner apenas com artifact validável, ou finalizer com ledger explícito de `DONE` e resync
- a serialização final varia por target, mas a geração deve sempre partir dos templates internos da skill e das referências canônicas
- `vscode` usa o shape Markdown com frontmatter operacional em `.github/agents/*.agent.md`
- `codex` usa arquivos TOML em `.codex/agents/*.toml` com o shape próprio de custom agent do Codex, não como espelho do frontmatter endurecido de `vscode`
- o shape mínimo obrigatório nativo do custom agent TOML para `codex` contém:
  - `name`
  - `description`
  - `developer_instructions`
- `sandbox_mode` é campo opcional documentado do runtime Codex; por política Sentinel, todo custom agent Codex materializado deve serializar `sandbox_mode`
- `sandbox_mode` deve ser derivado da role class e da capability real do agent:
  - `read-only` para agents que apenas leem, analisam, roteiam, revisam ou desenham
  - `workspace-write` para agents que precisam editar ou executar comandos locais
- `workspace-write` só libera a capacidade técnica mínima exigida pelo papel; não autoriza absorver responsabilidade fora da role
- `validation-runner` usa `workspace-write` por necessidade de execução local de checks, mas suas `developer_instructions` continuam proibindo edição, fix, redesign de prova, replanning ou closure
- `finalizer` e `resync` usam `workspace-write` porque o contrato atual permite `edit` para durable documentation em canonical docs under `docs/**`
- `tools`, `agents`, `target`, `model`, `base_agent_version`, `specialization_revision`, `managed_artifact` e `reading_scope_class` não fazem parte do shape mínimo obrigatório nativo de `codex`
- qualquer campo adicional em `.codex/agents/*.toml` só pode ser emitido quando for opcional, compatível com a configuração suportada pelo runtime Codex e explicitamente separado do shape mínimo nativo
- se o Sentinel preservar metadata própria para `codex`, essa metadata é convenção interna opcional do protocolo, nunca requisito nativo do runtime Codex, e deve ser omitida quando houver risco de incompatibilidade com o runtime
- `codex` usa também `AGENTS.md` como instrução de workspace do runtime Codex
- `AGENTS.md` do target `codex` deve nascer do template interno `reference/templates/codex/AGENTS.md`; nunca criar ou manter um `AGENTS.md` final no repo Sentinel como source paralela
- referências internas entre agents devem usar o identificador lógico do agent e ser serializadas no formato físico do `target`; não fixar `.agent.md` quando `target=codex`
- target desconhecido deve bloquear a materialização antes de qualquer escrita

## Princípios
- especializar por evidência, não por simetria
- materializar o conjunto mínimo útil, não o conjunto máximo possível
- preservar o contrato canônico dos base agents
- preservar a role class canônica de cada base agent
- tratar o shape operacional do `target` como source of truth do artifact especializado
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
- output canônico depende de `target`
- `vscode`: output de agents em `.github/agents/*.agent.md`
- `codex`: output de agents em `.codex/agents/*.toml` e output complementar em `AGENTS.md`
- naming lógico: preservar o ID canônico do base agent, derivado do basename físico do arquivo, nunca o display label nem nome humanizado
- naming físico:
  - `vscode`: `<agent>.agent.md`
  - `codex`: `<agent>.toml`
- identidade operacional em `vscode`: `basename` do arquivo sem `.agent.md` == `frontmatter.name` == referência em `orchestrator.agents`
- em `vscode`, `frontmatter.name` é ID lógico canônico operacional em kebab-case; nunca usar title-case, display label ou versão humanizada nesse campo
- nos templates fonte `templates/agents/*.agent.md` e no bundle instalado `reference/agents/*.agent.md`, `frontmatter.name` também deve ser exatamente o basename sem `.agent.md`; labels humanos pertencem somente ao heading Markdown, descrição ou corpo
- não renomear o agent para outro papel só porque o projeto é diferente
- manter a parte fixa do protocolo, os status canônicos, o ownership dos gates e o papel central de cada base agent
- usar `agent-contract-shape` como referência de governança do shape especializado
- tratar o artifact final como shape normalizado canônico vigente, não como "base agent + remendos históricos"
- para `vscode`, manter frontmatter operacional especializado compatível com o contrato canônico e com a materialização local:
  - `name`
  - `description`
  - `target`
  - `tools`
  - `agents` no `orchestrator`
  - `model` quando aplicável
  - `base_agent_version`
  - `specialization_revision`
  - `managed_artifact: true`
- para `codex`, preservar o shape mínimo nativo próprio do runtime:
  - `name`
  - `description`
  - `developer_instructions`
- para `codex`, o shape Sentinel materializado adiciona obrigatoriamente `sandbox_mode` como campo opcional suportado pelo runtime e obrigatório por política Sentinel
- em `codex`, `developer_instructions` é o lugar obrigatório para carregar a missão especializada, role class, ownership, gates, sequencing, handoffs, disciplina de superfície, limites de leitura e regras operacionais derivadas dos base agents e do modelo factual intermediário
- em `vscode`, `specialization_revision` começa em `1` na primeira materialização gerenciada do repo alvo
- em `vscode`, `managed_artifact: true` é a marca de overwrite seguro e da deleção segura de artifacts gerenciados
- em `codex`, qualquer marca de gerenciamento do Sentinel é convenção interna opcional e não faz parte do shape mínimo obrigatório do runtime; se for serializada, deve ser compatível com Codex e claramente distinguida de requisito nativo
- quando fizer sentido, preservar `reading_scope_class` somente como hint compatível com o contrato base; nunca usá-lo para expandir a classe permitida
- em `vscode`, `tools` no frontmatter operacional é obrigatório nos agents especializados materializados e é a source of truth operacional
- em `codex`, `tools` não é obrigatório nem deve ser serializado no TOML controlado; a política de tools e least privilege deve ser preservada semanticamente em `developer_instructions` e em `sandbox_mode`
- `## Tools` no corpo deve ser removido por default quando `tools` existir como metadata operacional suportada pelo target
- `## Tools` só pode permanecer por ordem humana explícita e com justificativa humana clara
- mesmo quando `## Tools` permanecer como exceção explícita, ele nunca pode ser tratado como source of truth, requisito operacional, critério de validação ou base para drift detection
- todo specialized `vscode` materializado deve conter `name`, `description`, `target`, `tools`, `base_agent_version`, `specialization_revision` e `managed_artifact: true`
- todo specialized `vscode` materializado deve serializar `name` a partir da mesma fonte de verdade usada para o nome físico do arquivo; exemplo: `.github/agents/planner.agent.md` deve conter `name: planner`
- o `orchestrator` em `vscode` deve conter adicionalmente `agents`
- `agents` no frontmatter operacional é reservado ao `orchestrator` em `vscode` e deve listar apenas os `frontmatter.name` canônicos dos subagents realmente materializados no output de agents do mesmo target
- em `codex`, `agents` não é campo obrigatório do TOML do `orchestrator`; o conjunto de subagents e o roteamento devem aparecer em `developer_instructions` e no `AGENTS.md` gerado, salvo suporte explícito do runtime para campo equivalente opcional
- `model` na metadata operacional é suportado como string única ou lista priorizada quando houver justificativa operacional clara, política explícita, restrição por `allowed_models` e compatibilidade com o target
- qualquer campo fora do shape mínimo nativo ou dos campos opcionais suportados e adotados pela política Sentinel do target deve ser tratado como ausente por default e removido na normalização, salvo instrução humana explícita ou compatibilidade opcional comprovada
- `agent_version` deve ser removido da metadata operacional final por default; não faz parte do shape endurecido preservado por esta skill nem do shape mínimo de `codex`
- se qualquer campo obrigatório faltar no artifact final, a skill ainda não está done

## Normalização final do artifact
- ao materializar ou atualizar um specialized, sempre gerar o artifact final no shape canônico vigente do `target`
- a entrega esperada é um artifact final normalizado, limpo, operacional e auditável
- não preservar resíduos legados só por inércia, compatibilidade aparente ou herança do base agent
- update também é cleanup: além de corrigir drift factual, a skill deve remover seções redundantes e campos legados fora do contrato vigente
- a normalização também deve preservar `surface discipline`, `delta-only communication`, `no operational narration`, `no artifact dump into main chat`, e `delegate-first` quando o papel exigir isso
- a metadata especializada final normalizada de `vscode` contém apenas:
  - `name`
  - `description`
  - `target`
  - `tools`
  - `agents` no `orchestrator`
  - `model` quando aplicável
  - `base_agent_version`
  - `specialization_revision`
  - `managed_artifact: true`
  - `reading_scope_class` apenas quando fizer sentido e continuar compatível com o contrato
- o custom agent TOML final normalizado de `codex` contém obrigatoriamente:
  - `name`
  - `description`
  - `sandbox_mode`
  - `developer_instructions`
- `sandbox_mode` é obrigatório por política Sentinel no TOML Codex final, não por fazer parte do shape mínimo nativo Codex
- o custom agent TOML final normalizado de `codex` pode conter campos opcionais adicionais somente quando forem suportados pelo runtime e não confundidos com requisito nativo mínimo
- convenções internas opcionais do Sentinel em `codex`, quando existirem, devem ser claramente classificadas como internas e removíveis sem quebrar o custom agent TOML mínimo
- qualquer campo fora do shape do target deve ser tratado como legado residual e removido durante a normalização, salvo instrução humana explícita ou compatibilidade opcional comprovada
- em `vscode`, o corpo especializado final deve preservar headings e seções canônicas do base agent, inclusive `## Handoff`, sem variantes frouxas de naming ou shape
- em `codex`, `developer_instructions` deve preservar a semântica operacional dessas seções sem exigir headings Markdown no TOML
- a normalização final deve eliminar duplicação entre source of truth operacional do target e texto legado residual

## Blocos protocol-fixed non-compressible
Os blocos abaixo são parte fixa do protocolo, não são conteúdo local do projeto e não podem ser resumidos, removidos, enfraquecidos, reescritos do zero prático ou substituídos por paráfrase incompleta durante a especialização:
- executor terminal handoff contract, incluindo `Terminal handoff contract`, `No other terminal handoff is valid`, exigência de status terminal explícito `READY` ou `BLOCKED`, evidência real de mudança aplicada para `READY`, e rejeição de handoff ausente, implícito, ambíguo, intermediário, narrativo, log operacional, promessa ou diff parcial
- executor partial-edit blocking, incluindo `Partial-edit blocking`, `BLOCKED` obrigatório quando houve edição parcial sem conclusão segura, motivo objetivo, arquivos tocados, parcialidade restante, e decisão inspectable/reusable-or-discard/reexecute
- executor invalid terminal forms, incluindo `Invalid terminal forms`
- orchestrator consumer-side rejection, incluindo `EXECUTOR_HANDOFF_INVALID`, rejeição forte de handoff ausente, implícito, ambíguo, intermediário, narrativo, log operacional, promessa, diff parcial ou `READY` sem evidência aplicada, e bloqueio da rodada sem chamar `validation-runner`
- validation-runner entry evidence gate, incluindo `Entry evidence gate`, exigência de valid executor `READY` handoff com evidência aplicada, e preservação de que output inválido não é validation target
- finalizer closure ledger, incluindo `closure ledger`, `DONE: yes` ou `DONE: no`, racional da decisão de `DONE`, `resync: yes` ou `resync: no`, racional da decisão de resync, delta factual quando resync for necessário, e `Invalid closure forms`
- separação explícita entre status terminal do finalizer (`READY`/`BLOCKED`) e verdict do runner (`PASS`/`PARTIAL`/`FAIL`/`BLOCKED`), preservando o verdict como input e sem transformar `DONE` em obrigatório; obrigatória é a decisão explícita `DONE: yes` ou `DONE: no`

Estratégia obrigatória de especialização:
- a skill pode especializar stack, paths, docs, models, TBDs, targets, constraints locais, comandos canônicos, owners e leitura local
- a skill não pode reescrever do zero prático os blocos protocol-fixed nem compactá-los para "equivalentes" genéricos
- a materialização deve copiar o bloco fixo do template/base agent ou preservá-lo semanticamente de forma verificável pelos marcadores obrigatórios acima
- em `vscode`, os marcadores protocol-fixed devem permanecer no corpo final do agent materializado
- em `codex`, os marcadores protocol-fixed devem permanecer em `developer_instructions`
- se um invariant protocol-fixed obrigatório não couber no formato final, a skill deve bloquear a materialização antes de escrever ou reparar imediatamente o artifact e revalidar; nunca entregar agent fraco com hardening resumido
- se uma regra local do projeto entrar em tensão com bloco protocol-fixed, a regra local perde; se a tensão impedir materialização honesta, bloquear em vez de relaxar o protocolo

O quality gate final deve validar os artifacts materializados finais contra esses invariantes protocol-fixed. Validar só frontmatter, shape, `model`, tools, ausência de TODO ou referências a agents ausentes não basta.

## Política de `allowed_models` e `model_policy`
- a skill aceita uma entrada opcional `allowed_models`
- a skill aceita uma entrada opcional `model_policy` granular e compatível
- chaves novas aceitas:
  - `agents`: mapa por agent lógico, por exemplo `coder-backend`
  - `roles`: mapa por role fina, por exemplo `specialist_executor`, `proof_execution`, `closure`
- chaves legadas continuam aceitas:
  - `reasoning_default`
  - `coding_default`
  - `execution_default`
- se `allowed_models` for fornecido, toda escolha de `model` para specializeds deve ficar restrita a essa lista
- a skill não pode materializar `model` fora de `allowed_models`
- se `model_policy` for fornecido, ele tem precedência sobre heurística implícita
- precedência de resolução:
  1. `model_policy.agents[agent_name]`
  2. `model_policy.roles[fine_role]`
  3. defaults de compatibilidade por perfil
  4. heurística conservadora somente quando não houver policy explícita
- role fina sugerida:
  - `round_coordinator`: `orchestrator`
  - `cut_planning`: `planner`
  - `proof_design`: `validation-eval-designer`
  - `execution_package_design`: `execution-package-designer`
  - `specialist_executor`: `coder-backend`, `coder-frontend`, `coder-ios`
  - `ux_direction`: `designer`
  - `semantic_review`: `reviewer`
  - `proof_execution`: `validation-runner`
  - `closure`: `finalizer`
  - `sync`: `resync`
- fallback de compatibilidade:
  - `reasoning_default`: `orchestrator`, `planner`, `validation-eval-designer`, `execution-package-designer`, `reviewer`, e `designer` quando materializado como contributor de direção UX/design
  - `coding_default`: `coder-backend`, `coder-frontend`, `coder-ios`
  - `execution_default`: `validation-runner`, `finalizer`, `resync`
- se `model_policy` indicar valor fora de `allowed_models`, a skill deve bloquear ou escolher alternativa segura explicitando isso no output
- quando só `allowed_models` existir, preferir política conservadora: usar um modelo padrão único para o conjunto ou variar por papel apenas quando houver justificativa operacional clara
- se não existir `allowed_models` nem `model_policy`, a skill pode omitir `model` na metadata operacional e deixar o runtime usar o model picker atual
- não afirmar que um modelo é "o melhor" sem política explícita
- não inventar ranking universal, fallback complexo, matriz excessiva por provider ou policy especulativa de modelos
- lista priorizada de `model` só deve ser usada quando houver justificativa operacional real, ordem explícita e todos os itens estiverem contidos em `allowed_models` quando essa entrada existir

## Procedimento operacional
1. Validar as pré-condições e confirmar que o repo alvo realmente já passou por `stnl_project_context` ou, em greenfield, por `stnl_project_foundation`.
2. Resolver `target`; se omitido, assumir `vscode`; se for desconhecido, bloquear antes de escrever.
3. Fazer discovery sério de `docs/**`, com prioridade para `docs/INDEX.md`, `docs/core/*`, `docs/TBDS.md` quando existir, e os `units` ou `features` relevantes.
4. Construir o modelo factual intermediário normalizado, classificando claims, escopo, evidência e agents impactados.
5. Classificar cada agent canônico em sua role class e carregar os invariantes obrigatórios dessa classe antes de gerar qualquer specialized.
6. Ler primeiro `reference/MANIFEST.md`; depois ler apenas os templates/base agents canônicos, o template `reference/templates/codex/AGENTS.md` quando `target=codex`, e as referências `agent-contract-shape`, `agent-specialization-quality-gate`, `execution-lifecycle` e `status-gates` que estiverem listados no manifest e forem necessários para a rodada.
7. Revisar o output atual do `target`, classificando cada artifact local como:
   - `managed and current`
   - `managed but drifted`
   - `managed but obsolete`
   - `unmanaged / ambiguous`
8. Decidir o conjunto alvo mínimo e coerente de agents para o repo usando o modelo factual intermediário, não completude estética.
9. Decidir a política de `model` para a rodada atual, aplicando `model_policy` quando existir e respeitando `allowed_models` quando essa entrada existir.
10. Gerar ou atualizar os specializeds necessários a partir do modelo factual intermediário e dos invariantes da role class, com metadata operacional coerente e shape final normalizado para o `target`.
11. Quando `target=codex`, gerar ou atualizar `AGENTS.md` do repo alvo a partir do template interno e do conjunto final de agents materializados.
12. Deletar artifacts gerenciados obsoletos e qualquer referência local quebrada deixada por eles.
13. Reescrever ou ajustar o `orchestrator` por último, para que ele reflita apenas o conjunto final realmente materializado e respeite o budget de router.
14. Executar um quality gate pós-geração separado do framing da geração.
15. Se o gate retornar `NEEDS_FIX`, reparar somente os arquivos sinalizados, reexecutar o gate e concluir apenas quando o conjunto estiver consistentemente validado ou honestamente bloqueado.

## Discovery sério de `docs/**`
O discovery deve ser suficiente para montar o modelo factual intermediário sem virar scan amplo por inércia.

Leitura mínima esperada:
- `docs/INDEX.md`
- `docs/core/*` relevantes para boundaries, stack, runtime, regras e testing
- `docs/TBDS.md` quando existir
- `docs/units/*` e `docs/features/*` apenas nos recortes que realmente alimentam a decisão do conjunto de agents ou a especialização dos artifacts

Durante o discovery:
- mapear fatos confirmados, padrões locais, exemplos, TBDs, exceções e checks manuais
- quando `validation-eval-designer` ou `validation-runner` entrarem no conjunto, ler `docs/core/TESTING.md` se ele existir e mapear comandos canônicos, suites, manual paths aceitos, confiança do harness, gaps e pré-requisitos para o modelo factual intermediário, qualificando a força semântica pelo tipo de base (`stnl_project_context`: observado/factual; `stnl_project_foundation`: declarado/estratégico até observação)
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

Adicionar `resync` quando o projeto mantém shared canonical docs fora da feature e essa sync local fizer sentido.
- em repos já preparados por `stnl_project_context`, `resync` costuma fazer sentido, mas ainda depende de evidência real de documentação canônica viva e recorrente fora do fluxo imediato da feature
- em repos greenfield preparados por `stnl_project_foundation`, `resync` não é default e não deve ser materializado só porque `docs/**` existe
- em base `stnl_project_foundation`, só materializar `resync` quando houver evidência concreta de shared canonical docs contínuas cross-feature/cross-round, com necessidade real de factual sync fora da feature e updates documentais transversais previsíveis
- em base `stnl_project_foundation`, não considerar sinal suficiente por si só: existência de `docs/core/*`, existência de `docs/TBDS.md`, organização inicial de `features/units`, ou simples possibilidade futura de drift
- se o projeto ainda estiver em bootstrap documental, inception inicial ou fundação pouco estabilizada, não materializar `resync`
- na dúvida, não materializar `resync`; ausência desse agent nesse estágio não é falha do conjunto local

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

### Agent de pacote de execução
Materializar `execution-package-designer` sempre que o conjunto local materializar qualquer coder (`coder-backend`, `coder-frontend` ou `coder-ios`) junto com `validation-eval-designer`.

Esse agent ocupa a etapa canônica entre `validation-eval-designer` e os coders. Ele:
- recebe `EXECUTION BRIEF` e `VALIDATION PACK`
- produz `EXECUTION PACKAGE`
- suporta 1..N work packages
- não coordena coders
- não chama agents
- não implementa
- não substitui o `orchestrator`

Não materializar `execution-package-designer` como ornamento quando o conjunto local não tiver coders executores. Se coders existirem sem package designer, o conjunto fica incoerente porque obriga coders baratos a reinterpretar arquitetura, boundaries e proof.

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

## Gate condicional de harness por risco
A skill deve materializar de forma explícita a diferença entre falta de testes em mudança simples/local e falta de testes em mudança com risco relevante.

Regras:
- mudança simples, local e de baixo acoplamento pode seguir sem testes novos quando build, lint, smoke, manual path ou outra evidência leve realmente bastarem para o cut
- ausência de specs existentes, sozinha, não bloqueia automaticamente um cut simples/local
- quando o cut tocar superfície de risco relevante, a suficiência do harness deixa de ser mera limitação de evidência e vira gate pré-execução do DEV
- tratar como superfície de risco relevante, no mínimo:
  - lógica de negócio
  - state, store, sinais ou estado derivado
  - services, facades, repositories ou data access
  - guards, resolvers ou interceptors
  - contratos compartilhados ou libs compartilhadas
  - autenticação, autorização, segurança, PIN, token ou sessão
  - fluxos assíncronos ou multi-step
  - comportamento com risco de regressão transversal entre apps ou módulos
- nesses casos, ausência de testes relevantes existentes ou de outro harness minimamente confiável para a superfície tocada deve gerar `NEEDS_DEV_DECISION_HARNESS`
- build, lint, smoke ou evidência manual podem continuar documentados no `VALIDATION PACK`, mas não bastam sozinhos para marcar o cut como execution-ready quando a prova crítica da superfície de risco continua sem cobertura mínima
- quando o gate ocorrer, o specialized final deve deixar explícitas apenas estas saídas legítimas do DEV:
  - criar testes focados na SPEC agora
  - aceitar seguir sem testes novos, assumindo conscientemente evidência parcial
  - reduzir o corte para uma parte validável com o harness atual
- após a decisão do DEV, o fluxo deve voltar ao owner canônico do artifact afetado antes de qualquer approval ou execução
- se o DEV escolher testes focados e o boundary do cut permanecer materialmente o mesmo, o specialized deve voltar ao `validation-eval-designer` para atualizar o `VALIDATION PACK`; se a decisão alterar materialmente o cut, deve voltar primeiro ao `planner` para atualizar o `EXECUTION BRIEF` e só depois ao `validation-eval-designer`
- se o DEV escolher evidência parcial explícita, o specialized deve voltar ao `validation-eval-designer` para registrar no `VALIDATION PACK` a limitação aceita, a prova faltante, a evidência substituta, o risco residual e que a escolha foi decisão explícita do DEV
- se o DEV escolher reduzir o cut, o specialized deve invalidar readiness ou approval derivados do cut anterior, voltar obrigatoriamente ao `planner` para recortar o novo cut e depois regenerar o `VALIDATION PACK`
- "testes focados na SPEC" significa cobrir apenas a touch surface alterada e os fluxos críticos prometidos pela SPEC; nunca significa planejar ou montar a suíte inteira do projeto

### Regra de coerência sistêmica
Não omitir um agent se essa omissão deixar outros agents com referências quebradas ou exigir distorção do contrato canônico para compensar.

Antes de remover um agent canônico do conjunto local:
- procurar referências ao artifact desse agent nos demais specializeds do mesmo `target`
- remover ou adaptar essas referências de forma coerente com o papel do agent restante
- se a remoção exigir redefinir o protocolo local ou inventar um substituto não ancorado, não remover

## Como revisar e atualizar agents existentes
- revisar o conteúdo atual dos artifacts gerenciados do `target` contra:
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
  - matriz local de harness/checks registrada em `docs/core/TESTING.md`, com força factual condicionada à origem da base documental
  - expectativas de validação
  - TBDs, exceções, padrões locais e escopo factual
  - campos operacionais suportados pelo target, como `target`, `tools`, `agents` e `model` em `vscode`, ou `developer_instructions` em `codex`
  - headings canônicos, inclusive `## Handoff`
  - handoffs ou referências a agents presentes ou ausentes
- ao revisar artifacts gerenciados existentes, normalizar o shape final e remover resíduos legados, mesmo quando o drift factual for pequeno
- remover `## Tools` do corpo por default quando `tools` já existir na metadata operacional suportada pelo target, salvo exceção humana explícita e justificada
- remover campos legados não canônicos da metadata operacional final, incluindo `agent_version`, salvo instrução humana explícita em sentido contrário
- preferir update em cima do agent local quando ele já for um artifact gerenciado válido
- quando a divergência for grande, regenerar o agent inteiro com base canônica + especialização factual local em vez de tentar patch incoerente
- ao alterar materialmente um agent gerenciado em `vscode`, incrementar `specialization_revision`; em `codex`, só incrementar metadata equivalente se ela existir como convenção interna opcional compatível

## Política para artifacts locais existentes
- se o arquivo já estiver no output gerenciado do `target`, tiver shape compatível e indicar `managed_artifact: true`, tratar como artifact gerenciado e atualizar com overwrite seguro
- se o arquivo existir mas estiver ambíguo, sem metadata suficiente, ou com sinais fortes de autoria humana fora do fluxo gerenciado, não sobrescrever cegamente
- se um artifact local não gerenciado conflitar com o conjunto que a skill precisa manter, bloquear e explicitar o conflito em vez de apagar ou substituir silenciosamente

## Quando deletar
Deletar apenas quando houver evidência suficiente de que o artifact local gerenciado se tornou obsoleto.

Casos típicos:
- o projeto não possui mais a superfície que justificava aquele agent
- o agent local ficou fora do conjunto mínimo útil decidido por evidência
- o agent local referencia um fluxo ou outro artifact de agent que deixou de existir e isso não é mais justificável
- há duplicação de responsabilidade sem base factual
- o `orchestrator` aponta para um agent que não deve mais existir

Regras:
- priorizar deleção de artifacts gerenciados no output de agents do `target`
- permitir limpeza de referência stale no output do `target` apenas quando ficar claro que ela pertence ao sistema local gerenciado pela skill
- nunca tocar `.github/workflows/` por confusão de naming
- nunca deletar artifact ambíguo ou manual sem explicitar o conflito

## Como alinhar o `orchestrator`
- sempre revisar ou regenerar o artifact do `orchestrator` depois de decidir o conjunto final de agents
- o `orchestrator` deve referenciar apenas os agents realmente presentes no output de agents do `target`
- em `vscode`, o artifact do `orchestrator` deve conter `agents` e listar ali apenas os subagents realmente materializados no mesmo target
- em `vscode`, se `agents` estiver presente no `orchestrator`, `agent` deve estar presente em `tools`
- em `vscode`, o conjunto em `agents` deve bater exatamente com o conjunto real de subagents materializados que o `orchestrator` coordena
- em `codex`, o TOML do `orchestrator` não precisa conter `agents`; o conjunto roteável deve ficar claro em `developer_instructions` e no `AGENTS.md` gerado, salvo campo opcional equivalente suportado pelo runtime
- o `orchestrator` não pode declarar subagent ausente, stale ou ainda não materializado
- o `orchestrator` materializado deve operar como `status router only`, com `delegate-first`, `chat budget` explícito, `reading_scope_class: routing-minimal`, e sem narrativa operacional
- o `orchestrator` não pode carregar `vscode`, `vscode/memory`, `edit`, `execute` ou `todo` por default
- o `orchestrator` não pode abrir implementação por default antes do primeiro handoff
- o `orchestrator` deve ter budget operacional explícito antes do primeiro handoff
- o `orchestrator` só pode publicar delta mínimo suficiente no chat principal; artifacts ricos e evidência completa ficam no handoff interno por default
- depois de `APPROVED_EXECUTION` ou `SKIP_EXECUTION_APPROVAL`, o `orchestrator` nunca pode absorver implementação ou fallback de execução
- ao receber a decisão do DEV para `NEEDS_DEV_DECISION_HARNESS`, o `orchestrator` deve seguir somente a trilha canônica correspondente e nunca converter essa decisão diretamente em execução
- se a decisão for adicionar testes focados, o `orchestrator` volta ao `validation-eval-designer` quando o cut permanece materialmente o mesmo, ou ao `planner` antes quando o cut muda materialmente
- se a decisão for aceitar evidência parcial explícita, o `orchestrator` volta ao `validation-eval-designer` para registrar o compromisso no `VALIDATION PACK` antes de qualquer gate normal de execução
- se a decisão for reduzir o cut, o `orchestrator` volta obrigatoriamente ao `planner` e invalida qualquer readiness ou approval derivado do cut anterior
- depois de um `VALIDATION PACK` `READY`, o `orchestrator` deve rotear para `execution-package-designer` antes de qualquer coder
- o `execution-package-designer` não coordena, não chama coders e não decide sequência; ele devolve `EXECUTION PACKAGE` para o `orchestrator`
- o `orchestrator` só decide sequência ou paralelização de coders depois que `WORK_PACKAGE_ID`, `OWNED_PATHS`, `DEPENDS_ON`, `DO_NOT_TOUCH` e `BLOCK_IF` estiverem estáveis
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
- não assumir `coder-frontend`, `coder-ios`, `designer`, `execution-package-designer`, `reviewer`, `validation-eval-designer`, `validation-runner` ou `resync` sem evidência e sem materialização local correspondente
- se `designer` não existir, remover referências normais ao `designer` e reescrever a lógica local para não pressupor sua entrada
- se `coder-ios` não existir, remover referências normais ao `coder-ios` e reescrever a lógica local para não presumir executor nativo iOS
- se `reviewer` não existir, remover referências normais ao `reviewer` e reescrever a lógica local para não pressupor review semântico dedicado
- se `execution-package-designer` não existir, remover referências normais a coders executores ou bloquear o conjunto; não fazer coders substituírem package design
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
- `orchestrator`: status router only; devolver apenas status atual, blocker real, decisão DEV necessária, próximo agent ou passo, delta novo realmente relevante, e trilhas condicionais de risco quando materialmente ativas; nunca absorver implementação, rejeitar handoff descritivo do executor, não auto-empurrar execução quando houver `NEEDS_DEV_DECISION_HARNESS`, e só liberar runner com artifact validável
- `planner`: manter `EXECUTION BRIEF` rico, mas devolver só status do brief, grupos de cut em alto nível quando aplicável, dependências críticas, riscos vivos e sinal de paralelização segura
- `validation-eval-designer`: manter `VALIDATION PACK` rico, mas devolver só `READY` ou gate, obrigações de prova abertas e decisão DEV necessária se existir; o pack deve classificar a suficiência do harness pelo risco do cut, carregar checks determinísticos relevantes ao cut e classificá-los como `required`, `optional`, `not_applicable` ou `blocked_by_harness`, converter trilhas condicionais materialmente ativas em prova cut-scoped, emitir `NEEDS_DEV_DECISION_HARNESS` quando uma superfície de risco relevante ficar sem cobertura mínima para a SPEC, registrar operacionalmente no pack qualquer compromisso explícito do DEV sobre evidência parcial, refletir no pack a exigência de testes focados antes da execução, e exigir retorno ao `planner` quando a decisão do DEV alterar materialmente o recorte
- `execution-package-designer`: manter `EXECUTION PACKAGE` rico no handoff, mas devolver só `READY` ou `BLOCKED`, ids de pacotes, ordem/dependência, elegibilidade de paralelização e causa exata de bloqueio; não coordenar coders, não chamar agents, não implementar e não virar planner
- `coder-backend`, `coder-frontend` e `coder-ios`: devolver só `READY` com paths alterados ou evidência equivalente, checks rodados ou explicitamente não rodados, e risco residual; executar apenas o `WORK_PACKAGE_ID` autorizado, com leitura local suficiente para segurança. Quando faltar capacidade real de editar ou executar, quando o pacote for insuficiente, ou quando o cut não puder ser implementado com segurança dentro de `OWNED_PATHS`, devolver `BLOCKED` cedo com causa exata. No caso de `coder-ios`, o default deve permanecer Swift + SwiftUI, com `UIKit interop` apenas como capacidade condicional baseada em evidência real
- terminal handoff de executor nunca pode ser implícito: progresso intermediário, log de comando, narrativa operacional, promessa de mudança, diff parcial ou resposta sem status terminal claro não conta como `READY` nem como `BLOCKED`
- quando um executor editou parcialmente mas não concluiu com segurança, `BLOCKED` é obrigatório e deve preservar motivo objetivo, arquivos tocados, o que ficou parcial, e se o estado parcial é inspecionável/reaproveitável ou deve ser descartado/reexecutado
- `reviewer`: devolver review curto e delta-only do artifact implementado, distinguindo risco estrutural material, melhoria recomendada não-bloqueante e observação cosmética; reconhecer quando trilha material de risco foi ignorada, sem virar especialista dedicado; não reimplementar, não redesenhar o plano, não rerodar proof, e não transformar preferência subjetiva em bloqueio duro sem risco técnico real
- `validation-runner`: executar e julgar a prova funcional e os checks determinísticos do pack no escopo do cut; distinguir falha validada, bloqueio de harness, check obrigatório ausente e green irrelevante; check obrigatório ausente ou falho nunca vira detalhe cosmético
- `finalizer`: consumir evidência e verdict do runner para closure; não fazer review técnico substituto, rerun de checks, nem julgamento substituto do `validation-runner`; preservar o verdict do runner como input e emitir somente `READY` ou `BLOCKED` próprios
- `finalizer` só pode fechar `READY` com closure ledger explícito: runner verdict preservado ou bloqueio pré-validação preservado, reviewer signal preservado quando houver, artifacts de documentation/context alterados, `DONE` yes/no com racional, resync yes/no com racional, e delta factual quando resync for necessário

Se o specialized reabrir verbosity, execution log ou narrativa operacional como comportamento default, a materialização falhou.

## Política canônica de paralelização controlada
Tratar paralelização como política de orquestração e coordenação, nunca como promessa de runtime.

Singletons obrigatórios:
- `orchestrator`
- `planner`
- `validation-eval-designer`
- `execution-package-designer`
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
`tools` na metadata operacional é obrigatório apenas para specializeds `vscode`.

Para `codex`, `tools` não faz parte do shape mínimo obrigatório nativo do custom agent TOML e não deve ser serializado nos TOMLs controlados. A política de tools continua sendo uma obrigação semântica da especialização e deve aparecer nas `developer_instructions`, com hardening runtime via `sandbox_mode`.

Regras:
- escolher tools por missão real do agent e por least privilege
- `web` nunca é obrigatório por default; só incluir quando a missão do agent realmente precisar consultar contexto externo atual
- `execute` é ferramenta sensível; só incluir quando o agent precise executar testes, scripts, builds, linters, validações ou diagnósticos locais
- `agent` é ferramenta de coordenação; reservar para agents que realmente orquestram outros agents, e torná-la obrigatória no `orchestrator` de `vscode` quando `agents` for usado
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
- `execution-package-design`
  - permitidas: `read`, `search`
  - proibidas por default: `agent`, `edit`, `execute`, `todo`, `vscode`, `vscode/memory`, `web`
- `semantic-review`
  - permitidas: `read`, `search`
  - proibidas por default: `agent`, `edit`, `execute`, `todo`, `vscode`, `vscode/memory`, `web`
- `executor`
  - base permitida: `read`, `search`
  - coders especialistas-executores normalmente adicionam `edit`, `execute`
  - coders não recebem `todo` por default; incluir só com justificativa humana explícita e auditável
- `design-contributor`
  - permitidas: `read`, `search`
  - `todo` só quando houver justificativa operacional forte, explícita e auditável
  - `designer` é contributor de direção UX/design paralelo ou on-demand conforme política local; não é executor nem coder
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
- `coder-backend`: `read`, `search`, `edit`, `execute`
- `coder-frontend`: `read`, `search`, `edit`, `execute`
- `coder-ios`: `read`, `search`, `edit`, `execute`
- `designer`: `read`, `search`
  - `todo` apenas quando o cut ou o workflow local exigir decomposição multi-etapa de UX/design com justificativa explícita
- `validation-eval-designer`: `read`, `search`
- `execution-package-designer`: `read`, `search`
- `validation-runner`: `read`, `search`, `execute`

Incluir `web` apenas quando o contexto do projeto indicar dependência real de conhecimento externo atual para aquele papel, e nunca como substituto para `docs/**`.

## Como escolher `model`
- usar `docs/**`, o modelo factual intermediário e o papel do agent para inferir o tipo de trabalho, não para prometer "o melhor modelo"
- se `model_policy` existir, aplicá-la com precedência sobre heurística implícita
- aplicar a precedência granular: agent override, role override, defaults de compatibilidade, heurística conservadora
- usar `model_policy.agents` para exceções explícitas por agent
- usar `model_policy.roles` para grupos finos como `round_coordinator`, `cut_planning`, `proof_design`, `execution_package_design`, `specialist_executor`, `semantic_review`, `proof_execution`, `closure` e `sync`
- preservar compatibilidade com `reasoning_default`, `coding_default` e `execution_default`
- se `model_policy` não existir mas `allowed_models` existir, preferir uma política conservadora com modelo padrão único ou pequena variação por papel com justificativa operacional clara
- se não existir `allowed_models` nem `model_policy`, `model` pode ser omitido quando o target suportar essa omissão
- `model` pode ser string única ou lista priorizada
- usar lista priorizada apenas quando houver justificativa operacional real e sem criar fallback complexo por imaginação
- se `model` for lista priorizada, manter ordem explícita e compatível com `allowed_models` quando essa entrada existir
- em `codex`, só serializar `model` no TOML se esse campo for suportado pelo runtime; caso contrário, tratar a escolha de modelo como política externa ao shape mínimo obrigatório
- não justificar `model` com texto genérico como "adequado para engenharia"
- não prometer escolha ótima, universal ou provider-agnostic sem política explícita

## Quality gate pós-geração
Após gerar ou atualizar os specializeds, executar um quality gate independente do framing da geração.

O gate consome:
- o conjunto materializado no output de agents do `target`
- `AGENTS.md` materializado no repo alvo quando `target=codex`
- o modelo factual intermediário
- os base agents canônicos e o contrato `agent-contract-shape`
- a referência `agent-specialization-quality-gate`
- `execution-lifecycle`
- `status-gates`
- apenas as refs de docs e codebase já mapeadas como evidência, salvo bloqueio por ambiguidade real

Checks obrigatórios:

### Structural shape check
Verificar:
- metadata ou campos obrigatórios do target presentes e completos
- shape canônico consistente com `agent-contract-shape`
- quando `target=vscode`, artifacts de agents estão em `.github/agents/*.agent.md`, headings e seções obrigatórias do base agent existem com naming canônico, e o frontmatter contém `target`, `tools`, `agents` no `orchestrator`, `base_agent_version`, `specialization_revision` e `managed_artifact: true`
- quando `target=codex`, artifacts de agents estão em `.codex/agents/*.toml`, cada TOML contém `name`, `description`, `sandbox_mode` e `developer_instructions`, e `AGENTS.md` foi gerado a partir do template interno da skill
- quando `target=codex`, `developer_instructions` preserva a missão, role class, ownership, gates, sequencing, handoffs e regras operacionais do specialized que em `vscode` ficariam no corpo Markdown
- quando `target=codex`, `tools`, `agents`, `target`, `base_agent_version`, `specialization_revision`, `managed_artifact` e `reading_scope_class` não são tratados como campos obrigatórios do TOML
- quando `target=codex`, `sandbox_mode` é tratado como obrigatório pela política Sentinel e não como requisito nativo mínimo do Codex; qualquer outro campo opcional é compatível com o runtime e não é apresentado como requisito nativo do Codex
- remoção de campos legados não permitidos, incluindo `agent_version`
- ausência de `## Tools` residual por default quando `tools` já existe na metadata operacional suportada pelo target
- presença de contrato explícito de surface discipline quando o papel tiver risco real de poluir o chat principal
- presença de `chat budget` explícito quando o papel tiver superfície curta relevante no chat principal

### Role-class integrity check
Verificar:
- cada specialized foi classificado na role class canônica correta
- `reading_scope_class` está compatível com a role class
- wording de missão, proibicoes, handoff e protocol-fixed part não empurra o papel para outra classe
- especialização local não relaxou invariantes centrais da role class
- `execution-package-designer` permanece package-design only: produz `EXECUTION PACKAGE`, não coordena coders, não chama agents, não implementa e não substitui o `orchestrator`

Hard fails:
- `orchestrator` fora de `routing-minimal`
- `planner` fora de `bounded-context`
- `reviewer` fora de `review-minimal`
- `validation-runner` ou `finalizer` fora de `minimal-verification`
- `resync` com leitura mais ampla que `targeted-local`
- `execution-package-designer` com papel de router, executor, planner ou runner

### Execution-package-design check
Verificar no `execution-package-designer`:
- role class `execution-package-design` preservada
- `EXECUTION PACKAGE` contém contrato leve e operacional com `WORK_PACKAGE_ID`, `GOAL`, `OWNED_PATHS`, `SEARCH_ANCHORS`, `EDIT_ANCHORS`, `DEPENDS_ON`, `DO_NOT_TOUCH`, `CHANGE_RULES`, `RUN_COMMANDS`, `ACCEPTANCE_CHECKS` e `BLOCK_IF`
- pacote suporta 1..N work packages sem criar segundo orchestrator
- ausência de tools excessivas herdadas por acidente
- leitura local menor que executor e voltada só a anchors, paths, comandos e boundaries do pacote
- não implementa, não executa, não valida, não revisa, não fecha e não faz resync
- não seleciona, chama, sequencia, paraleliza ou gerencia coders

Hard fails:
- `execution-package-designer` chamando coders ou usando `agent` por default
- `execution-package-designer` com `edit`, `execute`, `todo`, `vscode`, `vscode/memory` ou `web` por default
- pacote sem campos mínimos ou sem `BLOCK_IF` explícito
- pacote virando plano prolixo, pseudo-implementação ou arquitetura nova

### Router cost and tool check
Verificar no `orchestrator`:
- ferramentas compatíveis com `router` quando o target tiver campo operacional de tools
- em `vscode`, ausência de `edit`, `execute`, `todo`, `vscode`, `vscode/memory` e `web` por default
- em `codex`, `developer_instructions` não concede nem sugere execução, edição, todo ou web por default como responsabilidade do `orchestrator`; não exigir campo TOML `tools`
- ausência de leitura ampla obrigatória antes do primeiro handoff
- budget operacional explícito antes do primeiro handoff
- regra explícita de handoff imediato quando o owner já está claro
- regra explícita de parar para blocker ou DEV em vez de continuar lendo indefinidamente
- reconhecimento explícito de trilhas condicionais de `security`, `performance`, `migration/schema` e `observability/release safety` apenas quando houver risco material
- trilha material ausente no handoff é tratada como defeito de roteamento, sem universalizar `high risk` por default
- handoff canônico para `execution-package-designer` depois de `VALIDATION PACK READY` e antes de coders
- decisão de sequência/paralelização de coders só depois de `EXECUTION PACKAGE` estável

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
- consumo explícito de `docs/core/TESTING.md` como base de comandos canônicos, paths manuais aceitos, pré-requisitos e limites de harness quando esse doc existir, preservando semântica observada em base `stnl_project_context` e semântica declarada/estratégica em base `stnl_project_foundation` até evidência na codebase
- a matriz local informa o pack sem ser copiada inteira nem virar checklist universal
- ausência ou fraqueza da matriz local aparece explicitamente no harness judgment quando relevante
- a suficiência do harness é classificada pelo risco real do cut, não apenas pela presença ou ausência genérica de specs
- ausência de testes relevantes existentes em mudança simples/local não vira bloqueio automático
- ausência de testes relevantes existentes em superfície de risco relevante gera `NEEDS_DEV_DECISION_HARNESS`
- pedido de novos testes fica explicitamente limitado a testes focados na SPEC e na touch surface alterada, nunca a cobertura ampla do projeto
- o `validation-eval-designer` explicita que é owner do registro operacional do compromisso de harness no `VALIDATION PACK`
- o specialized define o next state canônico após cada uma das 3 opções do DEV em `NEEDS_DEV_DECISION_HARNESS`
- quando a decisão do DEV altera materialmente o cut, o specialized reabre `planner -> validation-eval-designer` em vez de improvisar novo cut localmente
- `READY` só reaparece depois que o `VALIDATION PACK` estiver coerente com a escolha do DEV e com o cut vigente
- trilhas condicionais ativas viram obrigações cut-scoped de prova para `security`, `performance`, `migration/schema` e `observability/release safety` quando houver risco material
- ausência de checklist burocrático universal de trilhas de risco quando o cut não pedir

Hard fails:
- o specialized não define o next state após cada uma das 3 opções do DEV em `NEEDS_DEV_DECISION_HARNESS`
- o specialized não deixa explícito quem atualiza `EXECUTION BRIEF` e quem atualiza `VALIDATION PACK` quando a decisão do DEV muda prova ou boundary
- o specialized permite `READY`, approval ou execução direta após a escolha do DEV sem brief ou pack coerentes

### Executor ownership check
Verificar em `coder-backend`, `coder-frontend`, `coder-ios`, `designer` e equivalentes:
- coders recebem e executam `EXECUTION PACKAGE` com `WORK_PACKAGE_ID`
- coders continuam especialistas por stack/projeto, mas não são solucionadores locais nem compiladores de pacote
- leitura local suficiente para executar o pacote substitui broad discovery como custo normal
- `targeted-local` preservado
- capability gate explícito
- `read-only runtime is not execution` explícito quando houver risco
- `READY` apenas com evidência real de mudança aplicada
- terminal handoff explícito com exatamente `READY` ou `BLOCKED`; handoff ausente, implícito, ambíguo, intermediário, narrativo, log de comando, promessa ou diff parcial não é output final válido
- `BLOCKED` cedo quando faltar base ou capacidade
- `BLOCKED` cedo quando pacote for insuficiente, contraditório, stale ou exigir ampliar scope
- `BLOCKED` obrigatório quando houve edição parcial sem conclusão segura, preservando motivo objetivo, arquivos tocados, o que ficou parcial, e decisão de reaproveitar/inspecionar ou descartar/reexecutar o estado parcial
- proibição explícita de redefinir cut, recompilar pacote, escolher arquitetura estrutural, ampliar scope ou tocar shared files fora de `OWNED_PATHS`
- em `coder-ios`, o wording mantém foco default em Swift + SwiftUI e não deriva para executor UIKit-heavy sem evidência do repo ou necessidade real do cut
- wording não transforma executor em planner, router, runner ou finalizer

### Proof-execution, closure, and sync containment check
Verificar em `validation-runner`, `finalizer` e `resync`:
- leitura curta e focada no delta já delimitado
- ausência de rediscovery amplo
- ausência de wording que compense erro upstream com scan novo
- `validation-runner` permanece minimal-verification
- `validation-runner` executa e julga os checks determinísticos exigidos no `VALIDATION PACK`, sem virar smoke runner repo-wide
- `validation-runner` usa `VALIDATION PACK` para o que provar e `docs/core/TESTING.md` para quais comandos, manual paths e limites de harness são canônicos quando esse doc existir, preservando semântica observada em base `stnl_project_context` e semântica declarada/estratégica em base `stnl_project_foundation` até evidência na codebase
- `validation-runner` distingue comando canônico indisponível no ambiente, harness inexistente, harness fraco e path manual aceito
- `validation-runner` só entra com artifact validável de executor `READY` válido; promessa, output descritivo, pseudo-implementação, progresso narrativo ou `READY` sem evidência aplicada não é alvo de validação
- a existência da matriz local não expande a run para além do cut
- check obrigatório ausente, falho ou bloqueado por harness afeta verdict e confidence de forma explícita
- `finalizer` permanece minimal-verification
- `finalizer` permanece closure-only e não absorve review técnico, rerun ou re-julgamento do runner
- `finalizer` não confunde status próprio (`READY`/`BLOCKED`) com verdict do runner (`PASS`/`PARTIAL`/`FAIL`/`BLOCKED`), que deve ser preservado como input
- `finalizer` explicita `DONE: yes` ou `DONE: no`, racional curto da decisão, `resync: yes` ou `resync: no`, racional curto da decisão, e delta factual quando resync for necessário
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
- o `orchestrator` não roteia aprovação de execução nem executor enquanto `NEEDS_DEV_DECISION_HARNESS` continuar ativo
- o `orchestrator` roteia a decisão do DEV em `NEEDS_DEV_DECISION_HARNESS` apenas pela trilha canônica correspondente e nunca a converte diretamente em execução
- adicionar testes focados sem mudança material de cut volta ao `validation-eval-designer`; com mudança material de cut volta a `planner` antes do `validation-eval-designer`
- evidência parcial explícita volta ao `validation-eval-designer` para atualizar o `VALIDATION PACK` antes de qualquer gate normal de execução
- estreitar ou alterar materialmente o cut invalida readiness ou approval anteriores e volta obrigatoriamente a `planner` antes de regenerar o pack
- `validation-eval-designer READY` segue para `execution-package-designer`, não diretamente para coders
- `execution-package-designer READY` devolve `EXECUTION PACKAGE` para o `orchestrator`, não para coders
- coders só entram com `WORK_PACKAGE_ID` explícito do pacote vigente
- o `orchestrator` só aceita do executor `READY` com evidência de alteração aplicada, ou `BLOCKED` com causa exata
- o `orchestrator` trata handoff ausente, implícito, ambíguo, intermediário, narrativo, log operacional, promessa, diff parcial ou `READY` sem evidência aplicada como `EXECUTOR_HANDOFF_INVALID`
- o `orchestrator` bloqueia a rodada em `EXECUTOR_HANDOFF_INVALID` e não chama `validation-runner` sem artifact validável
- gap material de capability de editar ou executar aparece como blocker pré-execução
- resposta narrativa, descritiva, pseudo-plano, leitura ampla adicional, ou sem diff aplicado é tratada como handoff inválido
- reentrada do mesmo executor sem diff aplicado, `BLOCKED` formal, ou mudança real de gate, escopo ou autorização é rejeitada como erro operacional
- executors `READY` exigem changed paths ou evidência equivalente, checks rodados ou explicitamente não rodados, e risco residual
- `validation-runner` só entra com artifact validável do executor
- `reviewer` só entra com artifact implementado real e classificação explícita `required` ou `advisory`
- ausência de review `required` ou risco estrutural material não resolvido impede closure limpa

Hard fails:
- o specialized reaproveita implicitamente readiness ou execution approval derivados de um cut anterior depois de mudança material do boundary
- o specialized pula `execution-package-designer` quando coders entram no fluxo
- coder aceita ampliar scope, recompilar pacote ou escolher arquitetura estrutural em vez de bloquear
- executor podendo terminar sem status terminal claro `READY` ou `BLOCKED`
- executor permitindo progresso intermediário, log operacional, promessa, narrativa ou diff parcial como handoff final
- executor com edição parcial sem exigir `BLOCKED` e preservação de arquivos tocados, parcialidade e decisão inspectable/reusable-or-discard/reexecute
- orchestrator permitindo `validation-runner` após `EXECUTOR_HANDOFF_INVALID`
- finalizer emitindo `READY` sem `DONE` yes/no e resync yes/no explícitos

### Tool-discipline check
Verificar:
- `execution-package-designer`: `read`, `search`
- `coder-backend`: `read`, `search`, `edit`, `execute`
- `coder-frontend`: `read`, `search`, `edit`, `execute`
- `coder-ios`: `read`, `search`, `edit`, `execute`
- `validation-runner`: `read`, `search`, `execute`
- `todo` ausente por default em coders e runner
- ferramentas proibidas pela role class ausentes sem justificativa humana explícita e auditável

Hard fails:
- coders com `todo` por default
- `validation-runner` com `todo` por default
- `execution-package-designer` com `edit`, `execute`, `agent`, `todo`, `vscode`, `vscode/memory` ou `web` por default

### Model-policy compatibility check
Verificar:
- precedência clara: `model_policy.agents[agent]`, depois `model_policy.roles[role]`, depois defaults de compatibilidade
- compatibilidade mantida com `reasoning_default`, `coding_default` e `execution_default`
- defaults de compatibilidade mapeiam roles fortes para reasoning, coders para coding, e runner/finalizer/resync para execution quando não houver override granular
- `allowed_models`, quando fornecido, continua restringindo qualquer escolha por agent, role ou default

Hard fails:
- policy granular sem fallback de compatibilidade
- conflito ou ambiguidade entre agent override, role override e defaults de compatibilidade

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

### `target=vscode`

#### `.github/agents/orchestrator.agent.md`
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
  - validation-eval-designer
  - execution-package-designer
  - coder-backend
  - validation-runner
  - reviewer
  - finalizer
  - resync
model: <default-model>
base_agent_version: "2026.4"
specialization_revision: 1
managed_artifact: true
---
```

#### `.github/agents/coder-backend.agent.md`
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
model:
  - <coding-model>
  - <shared-default-model>
base_agent_version: "2026.4"
specialization_revision: 1
managed_artifact: true
---
```

### `target=codex`

#### `.codex/agents/orchestrator.toml`
```toml
name = "orchestrator"
description = "Orquestra o fluxo local do projeto usando apenas os agents realmente materializados."
sandbox_mode = "read-only"
developer_instructions = '''
Coordinate the local Sentinel workflow as a lightweight router.

Preserve the canonical gate order, role class `router`, ownership boundaries, handoff validity, and status sequencing defined by the specialized Sentinel contract.

Route only to agents that are actually materialized for Codex in `.codex/agents/` and reflected in the generated `AGENTS.md`. Do not implement, do not absorb execution, do not write validation packs or execution packages, and do not treat absent agents as available.

Keep the main chat surface short: return only the current gate, next owner, blocker, DEV decision need, or routing delta that matters.
'''
```

#### `.codex/agents/coder-backend.toml`
```toml
name = "coder-backend"
description = "Implementa mudanças backend do projeto respeitando arquitetura, contratos e harness local."
sandbox_mode = "workspace-write"
developer_instructions = '''
Execute the authorized server-side work package from the Sentinel execution package, execution brief, and validation pack.

Preserve role class `executor`, targeted-local reading constrained to package anchors, capability gates, smallest-correct-change discipline, and the required distinction between `READY` with real implementation evidence and `BLOCKED` with an exact cause.

Do not become planner, execution-package-designer, orchestrator, validation runner, reviewer, or finalizer. Do not redefine the cut, recompile the package, choose structural architecture, widen scope, or return analysis as if implementation happened.

Report only the execution delta needed downstream: changed paths or equivalent implementation evidence, checks run or not run, residual risk, and exact blocker when blocked.
'''
```

Notas para os exemplos:
- os valores acima são apenas exemplos de shape, não prescrição fixa de provider ou modelo
- em `vscode`, `model` pode ser string única ou lista priorizada
- em `vscode`, o valor real de `model` deve respeitar `allowed_models` quando essa entrada existir
- quando `model_policy` existir, ele governa a preferência de escolha por agent, role fina ou default de compatibilidade
- se não existir `allowed_models` nem `model_policy`, a skill pode omitir `model` quando o target suportar esse comportamento e deixar o runtime usar o model picker atual
- em `codex`, o shape mínimo nativo continua sendo `name`, `description` e `developer_instructions`
- em `codex`, `sandbox_mode` aparece nos exemplos porque é campo opcional suportado pelo runtime e obrigatório pela política Sentinel para agents materializados
- em `codex`, `tools`, `agents`, `target`, `base_agent_version`, `specialization_revision` e `managed_artifact` não aparecem nos exemplos porque não fazem parte do shape mínimo nativo do custom agent TOML nem da política Sentinel de serialização Codex
- em `codex`, qualquer campo adicional além de `sandbox_mode` só pode ser usado como opcional compatível com o runtime ou convenção interna opcional do Sentinel, nunca como requisito nativo mínimo
- os exemplos representam o artifact final normalizado, sem `## Tools` no corpo e sem campos legados como `agent_version`
- os exemplos de shape não substituem o contrato operacional especializado; `orchestrator` e executors continuam obrigados a explicitar capability gate, validade do handoff e regra de runner só com artifact validável
- no target `codex`, `AGENTS.md` do repo alvo deve ser gerado a partir de `reference/templates/codex/AGENTS.md` e deve apontar para o conjunto real de `.codex/agents/*.toml`
- não inventar campos extras fora do necessário

## EXECUTE OUTPUT esperado
- informar se houve materialização, atualização, deleção, normalização, validação e repair
- listar os artifacts criados, atualizados ou removidos
- explicitar o `target` usado
- explicitar quando houve normalização do shape operacional do target
- explicitar quando houve remoção de `## Tools`
- explicitar quando houve remoção de campos legados, incluindo `agent_version`, quando aplicável
- quando `target=codex`, explicitar se `AGENTS.md` do repo alvo foi criado ou atualizado a partir do template interno
- informar o verdict final do quality gate e, se houve repair, quais arquivos ele sinalizou
- nomear qualquer exceção humana explícita que tenha mantido resíduo legado por decisão consciente
- se houver bloqueio, separar claramente o que foi normalizado do que ficou pendente

## Definição de done
- `target` resolvido e suportado
- shape obrigatório do target coerente em cada specialized materializado
- ausência de artifact parcial tratado como aceitável
- artifacts finais normalizados no shape canônico vigente
- `target=vscode` materializa agents em `.github/agents/*.agent.md` com `target` correto no frontmatter operacional
- em `vscode`, para cada agent materializado, `basename` do arquivo sem `.agent.md`, `frontmatter.name` e qualquer item correspondente em `orchestrator.agents` são exatamente o mesmo ID canônico em kebab-case
- `target=codex` materializa agents em `.codex/agents/*.toml` com `name`, `description`, `sandbox_mode` e `developer_instructions`, e materializa `AGENTS.md` na raiz do repo alvo
- `AGENTS.md` do target `codex` deriva do template interno `reference/templates/codex/AGENTS.md`
- em `vscode`, `tools` presente no frontmatter operacional de todos os specializeds materializados
- em `vscode`, `agents` presente no artifact do `orchestrator`
- em `vscode`, `agents` do `orchestrator` bate exatamente com o conjunto real de subagents materializados
- em `vscode`, `agent` presente em `tools` do `orchestrator` quando `agents` for usado
- em `codex`, `developer_instructions` de cada agent preserva missão, ownership, gates, role class, sequencing, handoffs e política de tools sem exigir campo TOML `tools`
- em `codex`, `developer_instructions` e `AGENTS.md` refletem o conjunto roteável sem exigir campo TOML `agents` no `orchestrator`
- `model` coerente com `allowed_models`, `model_policy` e compatibilidade do target quando essas entradas tiverem sido fornecidas
- role class canônica respeitada em todos os specializeds materializados
- `orchestrator` materializado com `routing-minimal` e sem tools indevidas
- `planner` materializado com `bounded-context` e sem wording de broad discovery por default
- `reviewer` materializado com `review-minimal` e sem drift para execução, validação ou closure
- ausência de `## Tools` no corpo quando `tools` já existir na metadata operacional suportada pelo target, salvo exceção explicitamente justificada
- ausência de campos legados fora do contrato atual, incluindo `agent_version` por default
- ausência de duplicação entre source of truth operacional do target e texto legado residual
- surface discipline explícita e coerente com o papel
- ausência de narrativa operacional e artifact dump no chat principal como comportamento default
- `chat budget` explícito quando aplicável
- `delegate-first` explícito no `orchestrator`
- o `orchestrator` explicita que nunca implementa fallback nem absorve execução após handoff
- o `orchestrator` tem budget operacional explícito antes do primeiro handoff
- gaps materiais de capability aparecem como blockers pré-execução
- executors materializados restringem a saída a `READY` real ou `BLOCKED` real
- executors materializados não podem terminar com handoff ausente, implícito, ambíguo, intermediário, narrativo, log operacional, promessa ou diff parcial como final
- `BLOCKED` de executor após edição parcial preserva motivo objetivo, arquivos tocados, parcialidade restante e decisão inspectable/reusable-or-discard/reexecute
- artifacts finais materializados preservam todos os blocos protocol-fixed non-compressible aplicáveis ao papel; materialização que perde esses invariantes deve falhar no quality gate, mesmo que shape, tools, modelos e referências estejam corretos
- executors materializados carregam a maior parte do custo operacional da rodada
- resposta descritiva do executor sem alteração aplicada é rejeitada como handoff inválido
- reentrada do mesmo executor sem diff, `BLOCKED`, ou mudança real de gate, escopo ou autorização é tratada como erro operacional
- `validation-runner` só é habilitado com artifact validável do executor
- `finalizer` materializado exige closure ledger explícito com runner verdict preservado, reviewer signal quando houver, artifacts alterados, `DONE` yes/no com racional, resync yes/no com racional, e delta factual quando resync for necessário
- `validation-eval-designer` e `validation-runner` permanecem coerentes com `docs/core/TESTING.md` quando esse doc existir, sem substituir o `VALIDATION PACK`
- `reviewer` só é habilitado com artifact implementado real e classificação explícita `required` ou `advisory`
- `reviewer` distingue risco estrutural material de melhoria recomendada e observação cosmética sem drift para executor, runner ou finalizer
- trilhas condicionais de `security`, `performance`, `migration/schema` e `observability/release safety` entram apenas quando há risco material e permanecem amarradas a handoff, proof e review sem checklist universal
- política de paralelização segura restrita aos workers paralelizáveis e limitada a 3 instâncias por papel
- handoffs coerentes com o conjunto final realmente materializado
- ausência de referências ativas a artifact de agent inexistente no mesmo `target`
- TBDs, exceções, scoped patterns, exemplos e checks manuais preservados com a força factual correta onde forem relevantes
- quality gate final em `PASS` ou `PASS_WITH_WARNINGS`

## O que não fazer
- não inventar papel, boundary, contrato, fluxo ou integração sem evidência suficiente
- não gerar todos os agents por default
- não materializar especialistas cosméticos
- não alterar base agents
- não alterar o contrato canônico dos base agents sem ordem humana explícita
- não depender de artifact de agent inexistente
- não deixar o `orchestrator` apontando para agents ausentes
- não usar `web` como source of truth factual do projeto
- não tratar artifacts gerenciados de agents como a fonte factual principal do repo
- não materializar `agent-contract-shape`, `agent-specialization-quality-gate` e `status-gates` no repo alvo na v1
- não criar artifacts finais no repo Sentinel Protocol; `AGENTS.md`, `.codex/agents/` e `.github/agents/` finais pertencem somente ao repo alvo
- não criar docs do repo alvo por imaginação
- não espalhar `tools` em dois lugares como source of truth
- não perpetuar `## Tools` no corpo por inércia quando `tools` já estiver na metadata operacional suportada pelo target
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
- `target` ausente não puder ser defaultado para `vscode` ou `target` informado não for suportado
- existir conflito factual relevante entre docs e codebase sem base suficiente para resolver
- em conflito material envolvendo base de `stnl_project_foundation`, faltar rota canônica explícita para `MODE=REFINE` (quando a direção ainda for documental) ou `MODE=HANDOFF` seguido de `stnl_project_context` (quando a autoridade estiver migrando para a codebase)
- o pedido exigir invenção de especialistas sem ancoragem factual
- existir artifact local ambíguo ou manual no output do `target` cujo overwrite ou delete não seja seguro
- a remoção de um agent exigiria quebrar o protocolo local ou deixar referências órfãs sem alternativa honesta
- o quality gate detectar inconsistência séria de shape, referência ou fidelidade factual que não seja reparável com segurança

## Fechamento operacional
A skill só está done no repo alvo quando todas as condições abaixo já estiverem satisfeitas pela definição de done acima:
- o conjunto de agents no output do `target` foi decidido por evidência factual do projeto
- o modelo factual intermediário foi construído e usado como base de geração e validação
- apenas os agents necessários foram materializados ou mantidos
- agents gerenciados stale foram atualizados ou deletados conforme necessário
- todo artifact materializado contém o shape obrigatório do target, sem campos mandatórios ausentes e sem legado residual fora do contrato
- o `orchestrator` reflete apenas o conjunto real de agents presentes
- quando `target=codex`, `AGENTS.md` foi gerado a partir do template interno da skill e reflete o conjunto real de `.codex/agents/*.toml`
- nenhum agent local referencia artifact de agent inexistente
- o contrato canônico dos base agents foi preservado
- `agent-contract-shape`, `agent-specialization-quality-gate` e `status-gates` foram usados como referência, não materializados no repo alvo
- o verdict final do quality gate é `PASS` ou `PASS_WITH_WARNINGS`
- qualquer bloqueio residual foi nomeado explicitamente em vez de mascarado com texto genérico

## Regra final de honestidade
Se a base factual do repo alvo não sustentar com honestidade a decisão sobre o sistema local de agents, parar. O comportamento correto não é preencher lacunas com um kit completo por conveniência; é bloquear e explicar exatamente qual evidência falta.
