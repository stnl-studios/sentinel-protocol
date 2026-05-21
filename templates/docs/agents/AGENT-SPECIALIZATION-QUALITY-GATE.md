# Quality Gate Canonico de Especializacao de Agents

## Proposito
Definir o gate minimo, auditavel e orientado a custo que valida specializeds gerados a partir dos base agents canonicos.

Este gate existe para reduzir:
- drift factual
- drift estrutural
- role drift
- custo operacional ruim concentrado no coordenador
- overclaim de tools, leitura ou autonomia

Ele complementa `AGENT-CONTRACT-SHAPE.md`:
- `AGENT-CONTRACT-SHAPE.md` governa o shape canonico
- este documento governa a validacao pos-geracao desse shape, da fidelidade factual e da disciplina operacional por role class

## Escopo
Aplicar este gate depois da geracao ou atualizacao dos specializeds e antes da conclusao do trabalho.

O gate valida:
- o conjunto materializado de `.github/agents/*.agent.md`
- o conjunto materializado de `.codex/agents/*.toml` quando `target=codex`
- o `.codex/config.toml` materializado quando `target=codex`
- o `AGENTS.md` materializado quando `target=codex`
- o alinhamento com os base agents canonicos
- o alinhamento com `AGENT-CONTRACT-SHAPE.md`
- o alinhamento com o modelo factual intermediario derivado de `docs/**`
- o respeito aos invariantes da role class canonica de cada agent

Este gate nao autoriza scan amplo novo por inercia. Ele deve operar sobre:
- specializeds gerados
- base agents e referencias canonicas
- evidencia factual ja mapeada durante discovery, salvo ambiguidade real que precise ser resolvida honestamente

## Modelo factual intermediario
A especializacao deve passar por um modelo factual intermediario normalizado antes da geracao.

Esse modelo pode ser transitorio, mas deve permitir rastrear:
- a claim
- a classe factual da claim
- evidencias que sustentam a claim
- escopo da claim
- agents impactados

Sem esse modelo, o gate nao consegue julgar fidelidade factual e role drift com rigor suficiente.

## Role classes canonicas
O gate deve primeiro classificar cada specialized em uma role class canonica:
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

Se a materializacao implicar role class diferente da canonica, o verdict minimo e `BLOCKED`.

## Checks obrigatorios

### 1. Structural shape check
Verificar:
- frontmatter obrigatorio
- headings e secoes obrigatorias com naming canonico
- shape compativel com `AGENT-CONTRACT-SHAPE.md`
- `target: vscode`, `tools`, `model`, `agents` no `orchestrator`, `base_agent_version`, `specialization_revision` e `managed_artifact: true`
- ausencia de `reasoning_effort`, `thinking_effort`, `model_reasoning_effort` ou equivalente no frontmatter VS Code/GitHub
- limite de 30.000 caracteres respeitado para cada prompt Markdown `.agent.md` gerenciado de VS Code/GitHub
- para `target=codex`, cada TOML gerenciado contem `name`, `description`, `model`, `model_reasoning_effort`, `sandbox_mode` e `developer_instructions`
- para `target=codex`, o conjunto gerenciado esperado contem `.codex/agents/*.toml`, `.codex/config.toml` e `AGENTS.md`
- para `target=codex`, `.codex/config.toml` contem `[agents].max_depth = 1`
- para `target=codex`, `AGENTS.md` contem Explicit Subagent Invocation Contract
- para `target=codex`, `AGENTS.md` contem contrato de main/root Codex session como human-visible workspace entrypoint, proibe spawn automatico de custom subagents, diferencia skill/workflow request (`Use stnl_spec_manager`, `Use stnl_project_context`, `Use stnl_project_agent_specializer`) de custom subagent request por exact agent name, contem `SUBAGENT_AUTH_REQUIRED`, preserva Codex Parent-Mediated Routing Contract quando `Use orchestrator` for explicito, `ROUTE_PACKET` compacto, native custom subagent spawning por root/main e exact agent name apos autorizacao explicita/`ROUTE_PACKET` valido, nao dependencia de full-history fork, payload minimo/task-scoped e bloqueio de emulacao por contrato completo no prompt, `codex exec`, shell, subprocesso, script ou continuacao local
- para `target=codex`, `orchestrator` permanece materializado como routing controller explicitamente invocavel e route decision owner do fluxo Sentinel no Codex, contem hardening contra full-contract prompt replay, `codex exec`, shell/subprocess/script/local continuation, role absorption, runtime sem agent thread nativa e root/main incapaz de spawnar owner nomeado, bloqueando com `ROUTING_RUNTIME_BLOCKED`, e nao absorve papeis especialistas nem spawna downstream owners diretamente
- para `target=codex`, agents nao-orchestrator nao spawnam downstream Sentinel agents e retornam artifact/status/formal handoff signal ao root/main para roteamento mediado por `orchestrator`
- para `target=codex`, `AGENTS.md` e cada `.codex/agents/*.toml` contem `Compact Agent Return Contract`, `return only the minimum needed for the parent to decide the next gate`, `Do not repeat the full Sentinel contract`, `Do not paste full SPEC, checklist, logs, or diffs`, `return artifact path plus compact summary`, `Expand only on blocker, failure, critical validation evidence, or explicit human request` e `main chat focused on routing/status deltas`
- para `target=codex`, `AGENTS.md` preserva `Local Notes` compactas quando houver notas locais, sem duplicar contrato Sentinel, SPEC, checklists, logs, diffs ou artifacts grandes
- para `target=codex`, `tools` nao e serializado no TOML controlado
- remocao de campos legados nao permitidos
- remocao de `## Tools` residual quando o frontmatter ja e a source of truth
- existencia de `output surface contract` ou `Compact Agent Return Contract` claro quando o papel puder poluir o chat principal
- existencia de `chat budget` explicito quando o papel tiver superficie curta relevante
- retorno default compacto preservado em todos os agents materializados, sem artifacts completos, SPEC, checklist, logs ou diffs despejados no chat por default

### 2. Role-class integrity check
Verificar:
- o agent especializado respeita a role class canonica do base correspondente
- `reading_scope_class` esta compativel com a role class
- wording de missao, proibicoes, handoff e protocol-fixed part nao empurra o papel para outra classe
- especializacao local nao relaxou invariantes centrais da role class
- `finalizer` permanece closure-only: detecta impacto factual fora da feature, pede `resync` e carrega apenas delta factual minimo, sem leakage para ownership de sync
- `resync` permanece owner do sync factual fora da feature e nao delega esse ownership de volta ao `finalizer`

Hard fails:
- `orchestrator` fora de `routing-minimal`
- `planner` fora de `bounded-context`
- `reviewer` fora de `review-minimal`
- `validation-runner` ou `finalizer` com leitura alem de `minimal-verification`
- `resync` com leitura mais ampla que `targeted-local`
- leakage estrutural entre `closure` e `sync`, mesmo quando o specialized parecer correto no restante do shape

### 3. Cross-reference / handoff consistency check
Verificar no minimo:
- `orchestrator.agents` referencia apenas subagents realmente materializados
- handoffs nao apontam para `.agent.md` inexistente
- agents ausentes nao continuam implicitos no workflow local
- quando o fluxo local usa coders, `execution-package-designer` esta presente no conjunto materializado e no roteamento do `orchestrator`
- o fluxo passa por `validation-eval-designer -> execution-package-designer -> coder(s)` antes de execução; em Codex, quando `Use orchestrator` for explicito, `root/main` entra por `orchestrator`, o `orchestrator` decide owners por exact custom agent name e retorna `ROUTE_PACKET`, e o `root/main` spawna o owner indicado como sibling/root-level native custom subagent
- nao ha contradicao interna relevante entre agents sobre boundaries, routing, harness ou fluxo
- politica de paralelizacao segura aparece apenas onde fizer sentido e nao transforma singleton em worker paralelo por acidente
- o `orchestrator` trata paralelizacao como politica de coordenacao, nao como promessa de runtime
- rich artifacts e precondicoes de handoff continuam alinhados com os owners corretos
- handoff inválido de executor não pode parecer sucesso operacional: handoff ausente, implícito, ambíguo, intermediário, narrativo, log operacional, promessa, diff parcial ou `READY` sem evidência aplicada deve bloquear como `EXECUTOR_HANDOFF_INVALID`
- `validation-runner` só pode aparecer depois de artifact validável produzido por executor `READY` válido
- protocol-fixed blocks sao non-compressible: executor terminal handoff contract, partial-edit blocking, invalid terminal forms, orchestrator `EXECUTOR_HANDOFF_INVALID`, validation-runner entry evidence gate, finalizer closure ledger, e separacao entre status do finalizer `READY/BLOCKED` e verdict do runner `PASS/PARTIAL/FAIL/BLOCKED`
- os specializeds finais devem preservar esses blocos por copia dos templates/base agents ou por preservacao semanticamente verificavel pelos marcadores obrigatorios; versao resumida que perca hardening e hard fail mesmo quando metadata, tools, modelos e referencias estejam corretos

Hard fails:
- `orchestrator.agents` lista agent nao materializado
- qualquer handoff canonico referencia arquivo inexistente ou owner que nao existe no conjunto atual
- coders materializados sem `execution-package-designer` quando o fluxo exigir pacote executavel
- `orchestrator` sem handoff explicito para `execution-package-designer` antes dos coders
- singleton role aparece como paralelizavel por acidente
- contradicao material entre specializeds torna o fluxo local internamente incoerente
- `orchestrator` permitindo entrada do `validation-runner` sem artifact validável de executor
- specialized tratando handoff de executor ausente, implícito, intermediário ou narrativo como sucesso
- artifact final materializado sem bloco protocol-fixed aplicavel ao papel
- target Codex sem `.codex/config.toml` com `[agents].max_depth = 1`
- target Codex que exige ou documenta `[agents].max_depth = 2` como padrao vigente
- target Codex cujo `AGENTS.md` auto-spawne `orchestrator` para todo trabalho Sentinel-governed
- target Codex que trate `Use stnl_spec_manager` como autorizacao para `orchestrator`
- target Codex que use custom subagent sem pedido humano explicito por nome exato
- target Codex que nao tenha `SUBAGENT_AUTH_REQUIRED` para tarefa que exige subagent sem autorizacao explicita
- target Codex cujo `AGENTS.md` mande `root/main` spawnar automaticamente o owner canonico direto como fluxo Sentinel padrao
- target Codex em que `orchestrator` spawna downstream owners diretamente no fluxo visual padrao
- target Codex em que root/main escolhe owner sem `ROUTE_PACKET` valido do `orchestrator` ou pedido humano explicito por exact custom agent name
- target Codex que volta para root-to-owner direto livre como fluxo Sentinel padrao
- target Codex que cria nested owner threads sob `orchestrator` em vez de siblings sob root/main
- target Codex que nao bloqueia quando root/main nao consegue spawnar owner indicado por `ROUTE_PACKET` valido
- target Codex cujo contrato exija full-history fork como requisito de handoff Sentinel
- target Codex que permita colar contrato completo no prompt como fallback
- target Codex que declare que sem fork mais contrato completo no prompt preserva handoff nativo
- target Codex que continue localmente como outro papel Sentinel apos falha de spawn nativo
- target Codex que nao bloqueie com `ROUTING_RUNTIME_BLOCKED` quando a runtime nao criar agent thread nativa para o custom subagent necessario
- target Codex cujo `AGENTS.md` permita emular handoff via `codex exec`, shell, subprocesso, script ou continuacao local
- target Codex que incentive retorno de artifact completo no chat, logs completos quando validacao passou, diff completo, SPEC/checklist completo, contrato Sentinel completo ou output intermediario bruto como retorno default de subagent
- `orchestrator` Codex sem `ROUTING_RUNTIME_BLOCKED` para falta de native custom subagent spawning, depth/config bloqueado ou agent nomeado ausente
- agent nao-orchestrator Codex que tente spawnar downstream Sentinel agents diretamente em vez de retornar formal handoff signal ao root/main para roteamento mediado por `orchestrator`

### 4. Surface discipline check
Verificar no minimo:
- ausencia de narrativa operacional desnecessaria
- ausencia de frases de log de execucao, preambulo operacional ou filler
- ausencia de republicacao integral de artifacts ricos no chat principal por default
- preservacao de `delta-only` quando o papel tiver artifact rico ou handoff rico
- `delegate-first` explicito no `orchestrator`
- `chat budget` explicito quando o papel exigir superficie curta
- `orchestrator` preserva explicitamente o trio `routing-minimal`, `delegate-first` e `delta-only` junto da superficie curta
- `orchestrator` nao incentiva leitura de implementacao antes da delegacao quando o owner ja esta claro
- `planner` e `validation-eval-designer` preservam artifact rico interno, mas devolvem superficie curta no chat
- specializeds nao reabrem verbosity ou execution-log behavior como comportamento normal

Hard fails:
- papel de superficie curta incentiva narrativa operacional como modo normal
- papel com artifact rico pede dump integral no chat principal por default
- `orchestrator` perde `delegate-first` ou incentiva leitura de implementacao antes da delegacao quando o owner ja esta claro
- `orchestrator` de superficie curta fica sem `chat budget` explicito no contrato especializado
- `planner` ou `validation-eval-designer` deixam de preservar artifact rico interno com superficie curta para o chat

### 5. Router cost and tool check
Verificar no `orchestrator`:
- ferramentas default limitadas ao papel de router
- ausencia de tool de edicao, execucao, IDE ou pseudo-gerenciamento por default
- ausencia de `vscode`, `vscode/memory`, `edit`, `execute` e `todo` por default
- ausencia de leitura ampla obrigatoria antes do primeiro handoff
- budget operacional explicito antes do primeiro handoff
- regra explicita de handoff imediato quando o owner ja esta claro
- regra explicita de parar para blocker ou DEV em vez de continuar lendo indefinidamente

Hard fails:
- `orchestrator` com `edit`, `execute`, `vscode`, `vscode/memory`, `todo` ou `web` por default sem justificativa estrutural fortissima e explicita
- `orchestrator` exigindo leitura ampla de code, contracts, tests ou docs antes do primeiro handoff

### 6. Planner containment check
Verificar no `planner`:
- leitura menor que um discovery amplo
- ausencia de wording que trate `live code, contracts, tests, nearby boundaries` como checklist default
- budget operacional explicito para framing
- permissao de expansao apenas para estabilizar in-scope versus out-of-scope, boundary, source of truth ou shared contract dependency real
- proibicao explicita de resolver desenho de implementacao local, algoritmo, projection strategy, refactor shape ou query shape
- safe parallelization so afirmada com evidencia real

Hard fails:
- `planner` com `edit`, `execute`, `agent`, `todo`, `vscode` ou `vscode/memory` por default
- wording que permita broad discovery por default "para entender melhor"

### 7. Proof-design locality check
Verificar no `validation-eval-designer`:
- role class `proof-design` preservada
- ausencia de tools excessivas herdadas por acidente
- ausencia de wording que compense leitura que `orchestrator` ou `planner` deixaram de fazer
- `VALIDATION PACK` mantido como artifact local e orientado a prova
- budget operacional local e curto
- consumo explicito de `docs/core/TESTING.md` como base factual de comandos canonicos, paths manuais aceitos, pre-requisitos e limites de harness quando esse doc existir
- a matriz local informa o pack sem ser copiada inteira nem virar checklist universal
- ausencia ou fraqueza da matriz local aparece explicitamente no harness judgment quando relevante
- a suficiência do harness é julgada pelo risco real do cut, não apenas pela existência genérica de specs
- ausência de testes relevantes existentes em mudança simples ou local não vira gate automático
- ausência de testes relevantes existentes em superfície de risco relevante gera `NEEDS_DEV_DECISION_HARNESS`
- quando o gate pede novos testes, o escopo fica limitado a testes focados na SPEC e na surface tocada, nunca à suíte ampla do projeto
- `validation-eval-designer` explicita que é owner do registro operacional do compromisso de harness no `VALIDATION PACK`
- cada uma das 3 opções do DEV após `NEEDS_DEV_DECISION_HARNESS` define o next state canônico: mesmos limites do cut voltam ao `validation-eval-designer`; mudança material de cut volta a `planner` e depois a `validation-eval-designer`
- evidência parcial explícita reabre pelo menos o `validation-eval-designer` para registrar limitação aceita, prova faltante, evidência substituta, risco residual e decisão explícita do DEV no `VALIDATION PACK`
- `READY` só reaparece depois que o `VALIDATION PACK` estiver coerente com a escolha do DEV e com o cut vigente
- trilhas condicionais ativas viram obrigacoes cut-scoped de prova para `security`, `performance`, `migration/schema` e `observability/release safety` quando houver risco material
- ausencia de checklist burocratico universal de trilhas de risco quando o cut nao pedir

Hard fails:
- specialized permite `READY` apoiado apenas em build, lint, smoke ou evidência manual para cut de risco relevante sem cobertura mínima da surface tocada
- specialized transforma o gate de harness em iniciativa de cobertura ampla do projeto em vez de pedir testes focados na SPEC
- o specialized nao define o next state apos cada uma das 3 opcoes legitimas do DEV em `NEEDS_DEV_DECISION_HARNESS`
- o specialized nao deixa explicito quem atualiza `EXECUTION BRIEF` e quem atualiza `VALIDATION PACK` apos mudanca de prova ou de cut
- o specialized permite `READY`, approval ou execucao direta apos a escolha do DEV sem brief ou pack coerentes

### 8. Executor ownership check
Verificar em `coder-backend`, `coder-frontend`, `coder-ios` e equivalentes de coder executor:
- coders recebem e executam `EXECUTION PACKAGE` com `WORK_PACKAGE_ID`
- coders continuam especialistas por stack/projeto, mas nao sao solucionadores locais nem compiladores de pacote
- leitura local e suficiente para executar o pacote substitui broad discovery como custo normal
- `targeted-local` preservado
- capability gate explicito
- `read-only runtime is not execution` explicito quando houver risco
- `READY` apenas com evidencia real de mudanca aplicada
- terminal handoff explícito com exatamente `READY` ou `BLOCKED`; progresso, log, narrativa operacional, promessa, diff parcial ou status implícito não contam como handoff final válido
- `BLOCKED` cedo quando faltar base ou capacidade
- `BLOCKED` cedo quando o pacote for insuficiente, contraditorio, stale ou exigir ampliar scope
- `BLOCKED` obrigatório quando houve edição parcial sem conclusão segura, preservando motivo objetivo, arquivos tocados, o que ficou parcial, e se o estado parcial é inspecionável/reaproveitável ou deve ser descartado/reexecutado
- proibicao explicita de redefinir cut, recompilar pacote, escolher arquitetura estrutural, ampliar scope ou tocar shared files fora de `OWNED_PATHS`
- em `coder-ios`, o wording mantém foco default em Swift + SwiftUI e nao deriva para executor UIKit-heavy sem evidencia do repo ou necessidade real do cut
- wording nao transforma executor em planner, router, runner ou finalizer

Hard fails:
- executor sem tool de edicao quando sua funcao for implementar codigo
- executor aceitando `READY` descritivo sem diff, changed paths ou evidencia equivalente
- executor podendo terminar sem status terminal claro `READY` ou `BLOCKED`
- executor permitindo progresso intermediário, log operacional, promessa, narrativa ou diff parcial como handoff final
- executor com edição parcial sem exigir `BLOCKED` e preservação de arquivos tocados, parcialidade e decisão inspectable/reusable-or-discard/reexecute
- coder incentivando discovery amplo como substituto de pacote executavel
- coder com wording de solucionador local, planejador de arquitetura, ou owner de work-package compilation

### 9. Proof-execution, closure, and sync containment check
Verificar em `validation-runner`, `finalizer` e `resync`:
- leitura curta e focada no delta ja delimitado
- ausencia de rediscovery amplo
- ausencia de wording que compense erro upstream com scan novo
- `validation-runner` permanece minimal-verification
- `validation-runner` executa e julga os checks determinísticos exigidos no `VALIDATION PACK`, sem virar smoke runner repo-wide
- `validation-runner` usa `VALIDATION PACK` para o que provar e `docs/core/TESTING.md` para quais comandos, manual paths e limites de harness são canônicos quando esse doc existir
- `validation-runner` distingue comando canônico indisponível no ambiente, harness inexistente, harness fraco e path manual aceito
- `validation-runner` só entra com artifact validável de executor `READY` válido; promessa, output descritivo, pseudo-implementação, progresso narrativo ou `READY` sem evidência aplicada não é alvo de validação
- a existência da matriz local não expande a run para além do cut
- check obrigatório ausente, falho ou bloqueado por harness afeta verdict e confidence de forma explícita
- `finalizer` permanece minimal-verification
- `finalizer` permanece closure-only e não absorve review técnico, rerun ou re-julgamento do runner
- `finalizer` preserva o sinal do `reviewer` quando ele existir sem absorver seu ownership, e não ignora `reviewer required` pendente nem risco estrutural material explicitado
- `finalizer` não confunde status próprio (`READY`/`BLOCKED`) com verdict do runner (`PASS`/`PARTIAL`/`FAIL`/`BLOCKED`), que deve ser preservado como input
- `finalizer` explicita artifacts de memória/contexto alterados, `DONE: yes` ou `DONE: no`, racional curto da decisão, `resync: yes` ou `resync: no`, racional curto da decisão, e delta factual quando resync for necessário
- `resync` permanece targeted-local
- `finalizer` nao instrui sync direto em shared docs ou source-of-truth compartilhada; apenas detecta impacto, pede `resync` e passa delta factual minimo
- referencias a `docs/TBDS.md` ou shared docs no `finalizer` aparecem, no maximo, como superficie impactada para o handoff de `resync`, nunca como acao direta do proprio `finalizer`

Hard fails:
- `validation-runner` validando promessa, output descritivo, pseudo-implementação, progresso narrativo ou `READY` sem evidência aplicada
- `finalizer` reemitindo `PASS`, `PARTIAL` ou `FAIL` como status próprio em vez de preservar o verdict do runner
- `finalizer READY` sem `DONE` yes/no explícito ou sem resync yes/no explícito
- `finalizer READY` sem preservar reviewer signal quando review entrou na rodada
- runner validando sem artifact executor validavel
- finalizer ou resync reabrindo discovery amplo como comportamento normal
- `finalizer` sugerindo update direto em `docs/TBDS.md` ou outro shared target que pertence a `resync`
- leakage de ownership entre `finalizer` e `resync`, mesmo sem erro estrutural aparente em outras secoes

### 10. Semantic-review containment check
Verificar em `reviewer`:
- `reviewer` permanece `review-minimal`
- a leitura continua cut-scoped e nao vira rediscovery amplo
- o wording nao transforma `reviewer` em executor, `validation-runner` ou `finalizer`
- o output separa risco estrutural material, melhoria recomendada e observacao cosmetica ou irrelevante
- o `reviewer` nao reimplementa, nao reroda proof e nao assume closure
- o `reviewer` reconhece quando risco estrutural material de `security`, `performance`, `migration/schema` ou `observability/release safety` foi ignorado, sem virar especialista dedicado

### 11. Execution protocol hardening check
Verificar:
- o `orchestrator` explicita que nunca implementa fallback depois de handoff para executor
- o `orchestrator` nunca absorve execucao apos `APPROVED_EXECUTION`
- o `orchestrator` nao roteia aprovacao de execucao nem executor com `NEEDS_DEV_DECISION_HARNESS` ainda ativo
- o `orchestrator` roteia a decisão do DEV em `NEEDS_DEV_DECISION_HARNESS` apenas pela trilha canônica correspondente e nunca converte a decisão diretamente em execução
- escolha de adicionar testes focados sem mudança material de cut volta ao `validation-eval-designer`; com mudança material de cut volta a `planner` antes do `validation-eval-designer`
- escolha de evidência parcial explícita volta ao `validation-eval-designer` para atualizar o `VALIDATION PACK` antes de qualquer gate normal de execução
- escolha de estreitar ou alterar materialmente o cut invalida readiness ou approval anteriores e volta obrigatoriamente a `planner` antes de regenerar o pack
- o `orchestrator` so aceita do executor `READY` com evidencia de alteracao aplicada, ou `BLOCKED` com causa exata
- gap material de capability de editar ou executar aparece como blocker pre-execucao
- resposta narrativa, descritiva, pseudo-plano, leitura ampla adicional, ou sem diff aplicado e tratada como handoff invalido
- reentrada do mesmo executor sem diff aplicado, `BLOCKED` formal, ou mudanca real de gate, escopo ou autorizacao e rejeitada como erro operacional
- executors `READY` exigem changed paths ou evidencia equivalente, checks rodados ou explicitamente nao rodados, e risco residual
- `validation-runner` so entra com artifact validavel do executor
- `reviewer` so entra com artifact implementado real e classificacao explicita `required` ou `advisory`
- ausencia de review `required` ou risco estrutural material nao resolvido impede closure limpa

Hard fails:
- o specialized reaproveita implicitamente readiness ou execution approval derivados de um cut anterior depois de mudanca material do boundary

### 12. Early-discovery wording check
Verificar:
- ausencia de listas amplas de leitura obrigatoria incompatíveis com o papel
- ausencia de wording que convide discovery precoce sem condicao forte
- ausencia de "check before routing" amplo no router
- ausencia de "understand better" como licenca para abrir codigo, contratos ou testes cedo demais

### 13. Tool-discipline check
Verificar:
- ferramentas condizem com a role class
- perfis de tool nao favorecem ruido operacional
- `todo` nao entra por default em `orchestrator`, `planner` ou `validation-eval-designer`
- `todo` nao entra por default em `coder-backend`, `coder-frontend`, `coder-ios` ou `validation-runner`
- `execution-package-designer` fica por default em `read` e `search`, sem `edit`, `execute`, `agent`, `todo`, `vscode`, `vscode/memory` ou `web`
- tools proibidas pela role class nao aparecem sem justificativa explicita e auditavel

Hard fails:
- coders com `todo` por default sem justificativa humana explicita e auditavel
- `validation-runner` com `todo` por default sem justificativa humana explicita e auditavel
- `execution-package-designer` com ferramenta de coordenacao, edicao ou execucao por default

### 14. Model-policy compatibility check
Verificar:
- todo artifact gerenciado materializa `model`
- todo Codex agent gerenciado materializa `model_reasoning_effort`
- VS Code/GitHub agents nao materializam campos operacionais de effort no frontmatter
- `model_policy` aceita configuracao nova por agent ou por papel fino
- precedencia esta explicita: `model_policy.agents[agent]` primeiro, depois `model_policy.roles[role]`, depois defaults de compatibilidade, depois regra interna por role class baseada em `allowed_models`
- defaults de compatibilidade `reasoning_default`, `coding_default` e `execution_default` continuam aceitos
- policy nova permite modelos fortes para `orchestrator`, `planner`, `validation-eval-designer`, `execution-package-designer` e `reviewer`
- policy nova permite modelos mais baratos para `coder-backend`, `coder-frontend` e `coder-ios`
- `validation-runner` e `finalizer` podem ficar em faixa intermediaria ou explicitamente definidos
- qualquer valor escolhido continua subordinado a `allowed_models` quando essa entrada existir
- ausencia de `model_policy` nao bloqueia quando `allowed_models`, target e role class bastam para resolver o modelo
- se nao houver base concreta para escolher `model`, o fluxo bloqueia; nao herda picker/default implicito

Hard fails:
- artifact gerenciado sem `model`
- Codex agent gerenciado sem `model_reasoning_effort`
- VS Code/GitHub agent com `reasoning_effort`, `thinking_effort`, `model_reasoning_effort` ou equivalente no frontmatter
- model policy nova sem fallback compativel com `reasoning_default`, `coding_default` e `execution_default`
- precedencia ambigua entre configuracao por agent, por role e defaults de compatibilidade

### 14b. Consistency without legacy propagation check
Verificar:
- o bloco `## Consistency without legacy propagation` existe no template/base agent canonico, no `reference/agents/*.agent.md` usado pela skill e no artifact final materializado do target
- o artifact final materializado contem exatamente uma ocorrencia de `## Consistency without legacy propagation`
- o artifact final materializado nao contem a variante legada `Consistency without legacy propagation:`
- o artifact final materializado contem as frases sentinela `Do not copy fragile, duplicated, insecure, accidental, or legacy project patterns into new code just because they exist.` e `This policy does not authorize broad refactors`
- em `target=codex`, essas frases sentinela estao dentro de `developer_instructions`, nao apenas em fonte intermediaria
- em `target=vscode` ou GitHub, essas frases sentinela estao no corpo final de `.github/agents/*.agent.md`
- antes do gate final, a geracao/materializacao deve aplicar normalizacao protocol-fixed limitada: converter uma linha isolada `Consistency without legacy propagation:` em `## Consistency without legacy propagation`, sem reescrever o bloco, sem duplicar heading, sem alterar metadata ou campos TOML operacionais
- compactacao para limite de 30.000 caracteres remove ou reduz apenas conteudo local repetitivo/explicativo; nunca remove bloco protocol-fixed
- o specialized preserva contratos, comportamento publico, interoperabilidade, schema, APIs, rotas, fluxos e compatibilidade
- codigo novo e instrucoes de execucao favorecem melhor pratica segura compativel com a stack atual do projeto
- padroes existentes so sao tratados como normativos quando forem contrato real, interoperabilidade necessaria, decisao arquitetural documentada, requisito explicito do pacote ou consistencia local necessaria para nao quebrar comportamento
- padroes ruins, frageis, duplicados, inseguros, acidentais ou legados nao sao propagados so porque existem no repo
- o guidance nao autoriza refactor amplo, reescrita arquitetural, troca de stack, modernizacao oportunista, quebra de contrato publico, alteracao de schema/API sem autorizacao ou mudanca de comportamento nao solicitada

Hard fails:
- bloco `Consistency without legacy propagation` presente na fonte canonica mas ausente do artifact final materializado
- artifact final materializado com zero ou mais de uma ocorrencia de `## Consistency without legacy propagation`
- artifact final materializado contendo a variante legada `Consistency without legacy propagation:`
- frases sentinela de consistencia presentes no template/base ou reference agent mas ausentes de `developer_instructions` em Codex
- frases sentinela de consistencia presentes no template/base ou reference agent mas ausentes do corpo final VS Code/GitHub
- compactacao ou normalizacao remove bloco protocol-fixed para caber no limite de 30.000 caracteres
- specialized instrui copiar um padrao ruim ou legado sem necessidade de contrato
- specialized transforma melhoria local segura em refactor amplo escondido
- reviewer deixa de reprovar propagacao desnecessaria de divida tecnica quando ela afeta qualidade ou contrato
- finalizer transforma divida descoberta em alteracao escondida em vez de follow-up

### 14c. Stack quality guardrail propagation check
Verificar:
- as quatro quality guardrails canonicas existem como skills fonte instalaveis: `stnl_frontend_quality`, `stnl_backend_quality`, `stnl_backend_sql_quality` e `stnl_mobile_ios_swift_quality`
- `EXECUTION-LIFECYCLE.md`, `STATUS-GATES.md` e este quality gate nomeiam as quatro guardrails canonicas sem transforma-las em agents
- `orchestrator`, `planner`, `validation-eval-designer`, `execution-package-designer`, `validation-runner`, `reviewer` e `finalizer` preservam o contrato nominal de ativacao, carregamento, prova, review e closure das guardrails relevantes ao cut
- coders especializados preservam somente as guardrails compatíveis com sua superficie: front-end para `coder-frontend`, backend e SQL/persistencia para `coder-backend`, iOS Swift para `coder-ios`
- o `reference/agents/*.agent.md` instalado e os artifacts finais materializados para VS Code/GitHub e Codex preservam os nomes das guardrails aplicáveis no corpo final ou em `developer_instructions`
- `REQUIRED_QUALITY_GUARDRAILS` permanece metadado operacional por package, nunca lista de agents roteaveis
- a compactacao, normalizacao ou especializacao local nao remove nome de guardrail ativa nem troca a skill por resumo local que enfraqueca autoridade

Hard fails:
- alguma quality guardrail fonte `stnl_*_quality` esperada nao esta instalada ou nao e propagada para os bundles de referencia
- docs canonicos ou artifacts finais omitem uma guardrail canonica aplicavel ao papel
- target VS Code/GitHub ou Codex materializado transforma quality guardrail em agent roteavel, executor substituto, reviewer substituto ou checklist universal
- `REQUIRED_QUALITY_GUARDRAILS` desaparece de package ou executor quando a superficie do cut exige uma guardrail ativa

### 15. Factual fidelity check
Verificar:
- TBDs relevantes continuam semanticamente preservados
- excecoes documentadas continuam visiveis quando relevantes
- afirmacoes globais so existem quando a evidencia sustenta
- scoped patterns continuam scoped
- exemplos continuam exemplos
- checks manuais continuam marcados como checagem
- `validation-eval-designer` e `validation-runner` nao ignoram nem contradizem `docs/core/TESTING.md` sem justificativa factual, qualificacao de escopo ou conflito explicitado

### 16. Overclaim and certainty check
Verificar linguagem absoluta sem sustentacao suficiente, incluindo:
- `all`
- `always`
- `must`
- `the project uses`
- `the project never`
- `the standard is`

Quando a evidencia nao sustentar esse grau de certeza, rebaixar a claim para pattern, example, TBD ou check manual.

### 17. Coverage check
Verificar que o conjunto absorveu, onde fizer sentido:
- stack e superficies relevantes
- boundaries e ownerships importantes
- harness e expectativas de validacao
- hotspots e riscos recorrentes documentados
- TBDs e excecoes relevantes

Coverage nao significa espalhar todo fato em todo agent. Significa cobrir o que afeta decisao, leitura, execucao, handoff e validacao.

## Verdicts internos do gate
O gate usa os seguintes verdicts internos:
- `PASS`
- `PASS_WITH_WARNINGS`
- `NEEDS_FIX`
- `BLOCKED`

Semantica:
- `PASS`: conjunto consistente, honesto e operacionalmente disciplinado
- `PASS_WITH_WARNINGS`: consistente e honesto, com warnings nao criticos
- `NEEDS_FIX`: problemas reparaveis em arquivos especificos
- `BLOCKED`: falta evidencia, existe conflito material ou ha role drift ou custo operacional ruim serio demais para conclusao honesta

## Repair loop
Se o gate retornar `NEEDS_FIX`:
- reparar somente os arquivos sinalizados
- reexecutar o gate
- evitar loop aberto
- bloquear honestamente se a falha seria persistir apos poucas iteracoes conscientes

## Definicao de aprovacao
Uma rodada de especializacao so pode ser considerada concluida quando:
- o gate terminar em `PASS` ou `PASS_WITH_WARNINGS`
- os issues criticos de shape, referencia, fidelidade factual e role class estiverem resolvidos
- nenhum specialized depender de overclaim para parecer coerente
- nenhum specialized depender de narrativa operacional ou artifact dump para parecer informativo
- o custo operacional ruim nao estiver concentrado em `orchestrator` ou `planner`
- executors carregarem explicitamente a maior parte do custo operacional da rodada
