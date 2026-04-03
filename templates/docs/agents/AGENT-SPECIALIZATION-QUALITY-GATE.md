# Quality Gate Canônico de Especialização de Agents

## Propósito
Definir o gate mínimo e auditável que valida specializeds gerados a partir dos base agents canônicos.

Este gate existe para reduzir drift factual, drift estrutural e overclaim na materialização local em `.github/agents/*.agent.md`.

Ele complementa `AGENT-CONTRACT-SHAPE.md`:
- `AGENT-CONTRACT-SHAPE.md` governa o shape canônico
- este documento governa a validação pós-geração desse shape e da fidelidade factual da especialização

## Escopo
Aplicar este gate depois da geração ou atualização dos specializeds e antes da conclusão do trabalho.

O gate valida:
- o conjunto materializado de `.github/agents/*.agent.md`
- o alinhamento com os base agents canônicos
- o alinhamento com `AGENT-CONTRACT-SHAPE.md`
- o alinhamento com o modelo factual intermediário derivado de `docs/**`

Este gate não autoriza scan amplo novo por inércia. Ele deve operar sobre:
- specializeds gerados
- base agents e referências canônicas
- evidência factual já mapeada durante discovery, salvo ambiguidade real que precise ser resolvida honestamente

## Modelo factual intermediário
A especialização deve passar por um modelo factual intermediário normalizado antes da geração.

Esse modelo pode ser transitório, mas deve permitir rastrear:
- a claim
- a classe factual da claim
- evidências que sustentam a claim
- escopo da claim
- agents impactados

Sem esse modelo, o gate não consegue julgar fidelidade factual com rigor suficiente.

## Classes factuais obrigatórias
Toda claim relevante usada nos specializeds deve ser tratada como uma destas classes:
- `confirmed_fact`
- `scoped_pattern`
- `project_example`
- `open_tbd`
- `documented_exception`
- `manual_check`

Regras mínimas:
- `project_example` não vira regra global
- `scoped_pattern` não vira convenção global sem evidência forte
- `open_tbd` preserva seu conteúdo semântico e não pode ser diluído em texto genérico
- `documented_exception` permanece visível quando limita guidance relevante
- `manual_check` continua marcado como checagem manual, não como fato já fechado

## Checks obrigatórios

### 1. Structural shape check
Verificar:
- frontmatter obrigatório
- headings e seções obrigatórias com naming canônico
- shape compatível com `AGENT-CONTRACT-SHAPE.md`
- `target: vscode`, `tools`, `agents` no `orchestrator`, `base_agent_version`, `specialization_revision` e `managed_artifact: true`
- remoção de campos legados não permitidos
- remoção de `## Tools` residual quando o frontmatter já é a source of truth

### 2. Cross-reference check
Verificar:
- `orchestrator.agents` referencia apenas arquivos realmente materializados
- handoffs não apontam para `.agent.md` inexistente
- o sistema local de agents não tem contradições internas relevantes

### 3. Factual fidelity check
Verificar:
- TBDs relevantes continuam semanticamente preservados
- exceções documentadas continuam visíveis quando relevantes
- afirmações globais só existem com evidência suficiente
- patterns scoped continuam scoped
- exemplos continuam exemplos
- checks manuais continuam claramente marcados como checagem

### 4. Overclaim / certainty check
Verificar linguagem absoluta sem sustentação suficiente, incluindo formas como:
- `all`
- `always`
- `must`
- `the project uses`
- `the project never`
- `the standard is`

Quando a evidência não sustentar esse grau de certeza, rebaixar a claim para pattern, example, TBD ou check manual.

### 5. Coverage check
Verificar que o conjunto absorveu, onde fizer sentido:
- stack e superfícies relevantes
- boundaries e ownerships importantes
- harness e expectativas de validação
- hotspots e riscos recorrentes documentados
- TBDs e exceções relevantes

Coverage não significa espalhar todo fato em todo agent. Significa cobrir o que afeta decisão, leitura, execução, handoff e validação.

## Verdicts internos do gate
O gate usa os seguintes verdicts internos:
- `PASS`
- `PASS_WITH_WARNINGS`
- `NEEDS_FIX`
- `BLOCKED`

Semântica:
- `PASS`: conjunto consistente e honesto
- `PASS_WITH_WARNINGS`: consistente e honesto, com warnings não críticos
- `NEEDS_FIX`: problemas reparáveis em arquivos específicos
- `BLOCKED`: falta evidência, existe conflito material ou a inconsistência é séria demais para conclusão honesta

Este verdict não se confunde com os verdicts do `validation-runner.agent.md`.

## Repair loop
Se o gate retornar `NEEDS_FIX`:
- reparar somente os arquivos sinalizados
- reexecutar o gate
- evitar loop aberto
- bloquear honestamente se a falha séria persistir após poucas iterações conscientes

## Definição de aprovação
Uma rodada de especialização só pode ser considerada concluída quando:
- o gate terminar em `PASS` ou `PASS_WITH_WARNINGS`
- os issues críticos de shape, referência e fidelidade factual estiverem resolvidos
- nenhum specialized depender de overclaim para parecer coerente
