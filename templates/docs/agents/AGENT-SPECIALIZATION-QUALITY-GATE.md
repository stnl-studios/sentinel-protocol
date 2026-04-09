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
- `executor`: `coder-backend`, `coder-frontend`, `designer`
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
- `target: vscode`, `tools`, `agents` no `orchestrator`, `base_agent_version`, `specialization_revision` e `managed_artifact: true`
- remocao de campos legados nao permitidos
- remocao de `## Tools` residual quando o frontmatter ja e a source of truth
- existencia de `output surface contract` claro quando o papel puder poluir o chat principal
- existencia de `chat budget` explicito quando o papel tiver superficie curta relevante

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
- `validation-runner` ou `finalizer` com leitura alem de `minimal-verification`
- `resync` com leitura mais ampla que `targeted-local`
- leakage estrutural entre `closure` e `sync`, mesmo quando o specialized parecer correto no restante do shape

### 3. Cross-reference / handoff consistency check
Verificar no minimo:
- `orchestrator.agents` referencia apenas subagents realmente materializados
- handoffs nao apontam para `.agent.md` inexistente
- agents ausentes nao continuam implicitos no workflow local
- nao ha contradicao interna relevante entre agents sobre boundaries, routing, harness ou fluxo
- politica de paralelizacao segura aparece apenas onde fizer sentido e nao transforma singleton em worker paralelo por acidente
- o `orchestrator` trata paralelizacao como politica de coordenacao, nao como promessa de runtime
- rich artifacts e precondicoes de handoff continuam alinhados com os owners corretos

Hard fails:
- `orchestrator.agents` lista agent nao materializado
- qualquer handoff canonico referencia arquivo inexistente ou owner que nao existe no conjunto atual
- singleton role aparece como paralelizavel por acidente
- contradicao material entre specializeds torna o fluxo local internamente incoerente

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

### 8. Executor ownership check
Verificar em `coder-backend`, `coder-frontend`, `designer` e equivalentes:
- leitura profunda e custo principal da execucao pertencem a essa classe
- `targeted-local` preservado
- capability gate explicito
- `read-only runtime is not execution` explicito quando houver risco
- `READY` apenas com evidencia real de mudanca aplicada
- `BLOCKED` cedo quando faltar base ou capacidade
- wording nao transforma executor em planner, router, runner ou finalizer

Hard fails:
- executor sem tool de edicao quando sua funcao for implementar codigo
- executor aceitando `READY` descritivo sem diff, changed paths ou evidencia equivalente
- executor incentivando discovery amplo como substituto de implementacao

### 9. Proof-execution, closure, and sync containment check
Verificar em `validation-runner`, `finalizer` e `resync`:
- leitura curta e focada no delta ja delimitado
- ausencia de rediscovery amplo
- ausencia de wording que compense erro upstream com scan novo
- `validation-runner` permanece minimal-verification
- `finalizer` permanece minimal-verification
- `resync` permanece targeted-local
- `finalizer` nao instrui sync direto em shared docs ou source-of-truth compartilhada; apenas detecta impacto, pede `resync` e passa delta factual minimo
- referencias a `docs/TBDS.md` ou shared docs no `finalizer` aparecem, no maximo, como superficie impactada para o handoff de `resync`, nunca como acao direta do proprio `finalizer`

Hard fails:
- runner validando sem artifact executor validavel
- finalizer ou resync reabrindo discovery amplo como comportamento normal
- `finalizer` sugerindo update direto em `docs/TBDS.md` ou outro shared target que pertence a `resync`
- leakage de ownership entre `finalizer` e `resync`, mesmo sem erro estrutural aparente em outras secoes

### 10. Execution protocol hardening check
Verificar:
- o `orchestrator` explicita que nunca implementa fallback depois de handoff para executor
- o `orchestrator` nunca absorve execucao apos `APPROVED_EXECUTION`
- o `orchestrator` so aceita do executor `READY` com evidencia de alteracao aplicada, ou `BLOCKED` com causa exata
- gap material de capability de editar ou executar aparece como blocker pre-execucao
- resposta narrativa, descritiva, pseudo-plano, leitura ampla adicional, ou sem diff aplicado e tratada como handoff invalido
- reentrada do mesmo executor sem diff aplicado, `BLOCKED` formal, ou mudanca real de gate, escopo ou autorizacao e rejeitada como erro operacional
- executors `READY` exigem changed paths ou evidencia equivalente, checks rodados ou explicitamente nao rodados, e risco residual
- `validation-runner` so entra com artifact validavel do executor

### 11. Early-discovery wording check
Verificar:
- ausencia de listas amplas de leitura obrigatoria incompatíveis com o papel
- ausencia de wording que convide discovery precoce sem condicao forte
- ausencia de "check before routing" amplo no router
- ausencia de "understand better" como licenca para abrir codigo, contratos ou testes cedo demais

### 12. Tool-discipline check
Verificar:
- ferramentas condizem com a role class
- perfis de tool nao favorecem ruido operacional
- `todo` nao entra por default em `orchestrator`, `planner` ou `validation-eval-designer`
- tools proibidas pela role class nao aparecem sem justificativa explicita e auditavel

### 13. Factual fidelity check
Verificar:
- TBDs relevantes continuam semanticamente preservados
- excecoes documentadas continuam visiveis quando relevantes
- afirmacoes globais so existem quando a evidencia sustenta
- scoped patterns continuam scoped
- exemplos continuam exemplos
- checks manuais continuam marcados como checagem

### 14. Overclaim and certainty check
Verificar linguagem absoluta sem sustentacao suficiente, incluindo:
- `all`
- `always`
- `must`
- `the project uses`
- `the project never`
- `the standard is`

Quando a evidencia nao sustentar esse grau de certeza, rebaixar a claim para pattern, example, TBD ou check manual.

### 15. Coverage check
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
