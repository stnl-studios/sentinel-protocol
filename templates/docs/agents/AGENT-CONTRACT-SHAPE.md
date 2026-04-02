# Shape Canônico de Contrato de Agent Base

## Propósito
Definir o shape mínimo e canônico que todo agent base do Sentinel precisa explicitar, inclusive quando houver especialização por projeto.

Esse contrato inclui metadata canônica parseável no topo do arquivo. Essa metadata continua mínima e existe para indicar a versão base usada, expor uma classificação parseável de leitura para tooling e, no futuro materializado, suportar revisão local simples e overwrite seguro.

## Metadata canônica parseável
Todo agent base em `templates/agents/*.agent.md` deve carregar frontmatter YAML curto, estável e parseável no topo do arquivo.

Campos canônicos do agent base:

- `agent_version`
- `reading_scope_class`

Regras:

- `agent_version` indica a versão do Sentinel Protocol ou base canônica usada por aquele agent.
- `reading_scope_class` é uma classificação parseável de alto nível da política de leitura do agent.
- `reading_scope_class` serve como hint estável para tooling, validação rápida e guardrails.
- `reading_scope_class` não substitui o `Reading contract`.
- `reading_scope_class` não substitui `Reading order`, `Source of truth hierarchy` ou `Do not scan broadly unless`.
- `reading_scope_class` não autoriza scan amplo sozinho.
- Se houver conflito, o source of truth continua sendo o corpo contratual do agent e as docs canônicas.
- Só `orchestrator` e `planner` podem usar `broad-controlled`.
- Se `name` e `description` já fizerem parte do padrão do arquivo, podem permanecer.
- A metadata mínima não é source of truth comportamental.
- O comportamento do agent continua sendo definido pelo corpo contratual do arquivo e pelas docs canônicas.

Exemplo conceitual de metadata de agent base:

```yaml
---
name: Orchestrator
description: ...
agent_version: 2026.4
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

- `base_agent_version`
- `specialization_revision`
- `managed_artifact`

Regras:

- o agent especializado referencia o base via `base_agent_version`
- `specialization_revision` versiona apenas a materialização especializada daquele projeto
- `specialization_revision` começa em `1`
- `managed_artifact: true` identifica artifact gerenciado pela futura skill
- a metadata mínima do specialized também não é source of truth comportamental
- o comportamento do specialized continua sendo definido pelo corpo contratual materializado, derivado do base e das docs canônicas

Exemplo conceitual de metadata de agent especializado:

```yaml
---
name: Orchestrator
description: ...
base_agent_version: 2026.4
specialization_revision: 1
managed_artifact: true
---
```

## Finalidade auditável desses metadados
Esses metadados existem para permitir futuramente, sem aumentar o peso do protocolo:

- saber de qual base o specialized nasceu
- controlar overwrite seguro de artifacts gerenciados
- manter uma revisão local simples do materializado

Não são source of truth comportamental e não substituem o corpo contratual dos agents ou as docs canônicas. São apenas metadata mínima, estável e parseável para versionamento base, revisão local do materializado e overwrite seguro.

## Regras de preservação
- A especialização por projeto muda conteúdo, não muda o nome físico do arquivo.
- Todo agent especializado do projeto preserva o contrato canônico do agent base correspondente.
- Todo agent do Sentinel é um agent base que pode ser especializado por projeto sem renomeação física.
