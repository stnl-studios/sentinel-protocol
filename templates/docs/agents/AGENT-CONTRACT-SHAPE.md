# Shape Canônico de Contrato de Agent Base

## Propósito
Definir o shape mínimo e canônico que todo agent base do Sentinel precisa explicitar, inclusive quando houver especialização por projeto.

Esse contrato inclui metadata canônica parseável no topo do arquivo. Essa metadata faz parte do contrato gerável e auditável consumível pela futura skill de especialização e pelos fluxos futuros de drift, compatibilidade e overwrite seguro.

## Metadata canônica parseável
Todo agent base em `templates/agents/*.agent.md` deve carregar frontmatter YAML curto, estável e parseável no topo do arquivo.

Campos canônicos do agent base:

- `agent_id`
- `agent_kind: base`
- `agent_version`
- `contract_schema_version`
- `workflow_protocol_version`
- `reading_scope_class`

Regras:

- `agent_id` identifica o agent canônico e permanece estável entre base e especializado.
- `agent_kind` distingue molde canônico de materialização especializada.
- `agent_version` versiona o contrato canônico do agent base.
- `contract_schema_version` versiona o shape contratual parseado e consumido pelas ferramentas.
- `workflow_protocol_version` versiona o protocolo e a ordem de gates que o agent segue.
- `reading_scope_class` replica a classe canônica de leitura já aprovada para o agent e deve permanecer consistente com o corpo do arquivo.

Exemplo conceitual de metadata de agent base:

```yaml
---
name: Orchestrator
description: ...
agent_id: orchestrator
agent_kind: base
agent_version: 1.0.0
contract_schema_version: 1.0.0
workflow_protocol_version: 1.0.0
reading_scope_class: broad-controlled
---
```

## Campos obrigatórios
Todo agent base precisa explicitar:

- missão
- quando entra
- entrada obrigatória
- entrada opcional
- saída obrigatória
- status que pode emitir
- stop conditions
- proibições
- handoff para o próximo agent
- quando escalar para o DEV
- o que pode virar memória durável
- o que nunca pode tocar
- reading scope
- reading order
- source of truth hierarchy
- do not scan broadly unless
- mandatory completion gate
- evidence required before claiming completion
- area-specific senior risk checklist
- specialization slots
- non-overridable protocol invariants
- parte fixa do protocolo
- parte especializável por projeto

Além do corpo contratual, o frontmatter parseável acima também é obrigatório e integra o contrato consumível.

## Parte fixa do protocolo
É a parte canônica que define o contrato do agent base no ecossistema Sentinel. Inclui seu papel, seus limites, os status que pode emitir, seus gatilhos de entrada e saída, sua classe de leitura, suas condições de escalonamento, seu ownership de artefatos e sua posição no workflow.

## Parte especializável por projeto
É a parte que adapta contexto, heurísticas, exemplos, critérios locais, detalhes operacionais e pontos de leitura local ao projeto, sem quebrar o contrato canônico do agent base.

Ela existe para preencher slots de especialização já previstos no contrato, não para redefinir papel, status, gates, ownership ou arquivo físico.

## Política canônica de leitura
- `broad-controlled`: leitura mais ampla, mas ainda mínima e justificada. Só `orchestrator` e `planner` podem usar esta classe.
- `targeted-local`: leitura restrita ao handoff, ao reading order e ao entorno imediato do alvo.
- `minimal-verification`: leitura restrita ao necessário para verificar, consolidar ou sincronizar um delta já delimitado.
- Fora `orchestrator` e `planner`, nenhum agent pode fazer scan amplo do projeto por padrão.

## Slots de especialização
Os slots de especialização podem preencher, quando fizer sentido:

- docs e caminhos locais prioritários
- heurísticas e exemplos do projeto
- comandos, scripts e ferramentas locais
- convenções, riscos recorrentes e critérios de evidência do projeto
- refinamentos locais de reading order e source of truth, desde que não ampliem a classe canônica de leitura

## Invariantes de protocolo não sobrescrevíveis
A especialização por projeto nunca pode alterar:

- papel central do agent base
- nome físico do arquivo correspondente
- status canônicos que o agent pode emitir
- ownership canônico dos status
- ordem canônica dos gates do workflow
- ownership de artefatos, memória durável e handoffs do protocolo
- classe canônica de leitura do agent

## Regras de especialização por projeto
- A futura especialização sempre roda já dentro do projeto atual.
- A especialização não recebe parâmetro `<PROJECT_ROOT>`.
- A materialização especializada acontece em `./.github/.agents/` do projeto atual.
- A especialização só pode preencher os slots explícitos do contrato.

## Shape esperado para agent especializado
Mesmo sem materializar agora, o shape esperado do arquivo especializado em `./.github/.agents/*.agent.md` já fica definido.

Campos canônicos esperados no frontmatter do agent especializado:

- `agent_id`
- `agent_kind: specialized`
- `base_agent_version`
- `contract_schema_version`
- `workflow_protocol_version`
- `reading_scope_class`
- `specialization_revision`
- `generated_by`
- `generated_from`
- `managed_artifact`

Regras:

- o agent especializado não redefine `agent_version` do base
- o agent especializado referencia o base via `base_agent_version`
- `specialization_revision` versiona apenas a materialização especializada daquele projeto
- `generated_by` identifica a futura skill ou pipeline gerador
- `generated_from` referencia o agent base canônico de origem
- `managed_artifact` distingue artifact gerenciado de customização manual fora do contrato
- `contract_schema_version`, `workflow_protocol_version` e `reading_scope_class` devem permanecer compatíveis com o base correspondente

Exemplo conceitual de metadata de agent especializado:

```yaml
---
name: Orchestrator
description: ...
agent_id: orchestrator
agent_kind: specialized
base_agent_version: 1.0.0
contract_schema_version: 1.0.0
workflow_protocol_version: 1.0.0
reading_scope_class: broad-controlled
specialization_revision: 1
generated_by: sentinel-agent-specializer
generated_from: templates/agents/orchestrator.agent.md
managed_artifact: true
---
```

## Política de versionamento
### `agent_version` do agent base
- `major`: quebra de compatibilidade do contrato canônico do agent, incluindo papel, ownership, status, workflow position, leitura, completion contract, invariantes ou slots de especialização de forma incompatível
- `minor`: evolução compatível do contrato canônico, incluindo novos refinamentos compatíveis em leitura, completion, checklist, slots, heurísticas contratuais ou instruções sem quebrar consumidores válidos
- `patch`: clarificação de wording, exemplos, organização textual ou ajustes editoriais sem mudança real de comportamento contratual

### `specialization_revision` do agent especializado
- começa em `1`
- só incrementa quando o conteúdo materializado mudar de fato
- não incrementa quando a regeneração não produzir diff real
- não substitui nem renomeia a versão do base; apenas registra a revisão local da materialização

## Finalidade auditável desses metadados
Esses metadados existem para permitir futuramente, sem aumentar o peso do protocolo:

- detectar drift entre agent base e agent especializado
- validar compatibilidade antes de overwrite de artifact gerenciado
- auditar a origem e a versão base de um agent materializado
- diferenciar artifact gerenciado de custom manual

Não são um sistema global de versionamento cego. São parte mínima, estável e parseável do contrato para materialização, auditoria e overwrite seguro.

## Regras de preservação
- A especialização por projeto muda conteúdo, não muda o nome físico do arquivo.
- Todo agent especializado do projeto preserva o contrato canônico do agent base correspondente.
- Todo agent do Sentinel é um agent base que pode ser especializado por projeto sem renomeação física.
