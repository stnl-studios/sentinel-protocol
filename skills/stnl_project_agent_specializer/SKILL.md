---
name: stnl_project_agent_specializer
description: Descobre, materializa, revisa, atualiza e remove o conjunto minimo util de agents especializados de um repo alvo ja preparado por stnl_project_context.
---

# STNL Project Agent Specializer

## Missão
Ler o contexto factual consolidado de um repo alvo já preparado por `stnl_project_context` e materializar o conjunto mínimo útil de agents locais em `.github/agents/`.

Esta skill também revisa, atualiza e deleta artifacts locais obsoletos em `.github/` quando forem parte do conjunto gerenciado, mantendo o `orchestrator` alinhado ao conjunto real de agents presentes e sem referências quebradas para `.agent.md` inexistente.

Esta skill é um utilitário global. Ela não é um agent do workflow do projeto alvo.

## Quando usar
- quando o repo alvo já passou por `stnl_project_context` e precisa do primeiro conjunto de agents especializados
- quando `.github/agents/` não existe, está incompleto, está em drift, ou contém artifacts gerenciados stale
- quando os docs do projeto evoluíram e os agents locais precisam refletir novos boundaries, stacks, comandos, superfícies ou ferramentas
- quando o `orchestrator` local precisa voltar a refletir apenas os agents realmente materializados
- quando for preciso revisar ferramentas concedidas em `## Tools` e remover excesso de privilégio

## Quando não usar
- antes de executar `stnl_project_context` no repo alvo
- para inventar especialistas, workflows, boundaries ou integrações sem evidência suficiente
- para alterar os base agents canônicos, seu contrato, seus status, seus gates ou o versionamento do Sentinel
- para materializar `agent-contract-shape` ou `status-gates` no repo alvo na v1
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
- `.github/agents/*.agent.md` quando já existirem, para revisão de drift, coerência, `## Tools`, metadata e stale artifacts
- a codebase do repo alvo apenas quando os docs precisarem de confirmação, complemento ou desempate factual
- manifests de stack, scripts, testes, configs e entrypoints reais quando forem necessários para especializar comandos, provas, boundaries ou superfícies

## Source of truth e ordem de evidência
Usar esta ordem de precedência no repo alvo:

1. `docs/**`, especialmente o kit consolidado por `stnl_project_context`
2. referências canônicas da skill e templates/base agents canônicos
3. codebase do repo alvo, apenas quando necessário para validar ou completar entendimento
4. `web`, apenas como apoio para especializar stack, integrações, frameworks, padrões ou contexto técnico externo atual
5. `web` nunca substitui evidência factual do projeto alvo

Regras complementares:
- `docs/**` descreve a verdade factual do projeto alvo; `.github/agents/` descreve a materialização operacional local e não substitui essa verdade factual
- se docs e codebase conflitarem de modo material, não escolher por preferência; nomear o conflito e bloquear se ele impedir uma especialização honesta
- usar `web` só depois da leitura séria do projeto e apenas quando contexto externo atual realmente mudar a qualidade da especialização

## Escopo operacional
- descobrir quais agents locais fazem sentido para o repo alvo
- materializar apenas os agents necessários em `.github/agents/`
- revisar e atualizar agents já existentes em `.github/agents/`
- deletar artifacts gerenciados obsoletos em `.github/` quando estiverem stale, órfãos ou incoerentes com o conjunto decidido
- manter o `orchestrator` alinhado ao conjunto real de agents materializados
- garantir que nenhum agent materializado continue referenciando `.agent.md` inexistente
- introduzir `## Tools` explicitamente em cada agent especializado do repo alvo

## Agents canônicos que esta skill sabe gerir
- `coder-backend`
- `coder-frontend`
- `designer`
- `finalizer`
- `orchestrator`
- `planner`
- `resync`
- `validation-eval-designer`
- `validation-runner`

## Referências canônicas que esta skill usa, mas não materializa no repo alvo na v1
- `agent-contract-shape`
- `status-gates`

Quando disponíveis no ambiente instalado da skill, preferir estas referências locais:
- `reference/agents/*.agent.md`
- `reference/docs/agents/AGENT-CONTRACT-SHAPE.md`
- `reference/docs/workflow/STATUS-GATES.md`

## Princípios
- especializar por evidência, não por simetria
- materializar o conjunto mínimo útil, não o conjunto máximo possível
- preservar o contrato canônico dos base agents
- tratar `## Tools` como parte explícita do desenho do agent
- aplicar least privilege em tools, leitura e execução
- revisar o sistema de agents como um conjunto coerente, não como arquivos isolados
- preferir atualização de agent existente válido a recriação cega
- deletar stale artifacts gerenciados quando eles deixarem o sistema incoerente
- bloquear em vez de inventar quando a base factual não sustentar a decisão

## Modelo de materialização local
- output canônico: `.github/agents/`
- naming físico: preservar o nome físico dos base agents correspondentes, agora materializados sob `.github/agents/*.agent.md`
- não renomear o agent para outro papel só porque o projeto é diferente
- manter a parte fixa do protocolo, os status canônicos, o ownership dos gates e o papel central de cada base agent
- usar o `agent-contract-shape` como referência de governança do shape especializado
- manter a metadata especializada mínima compatível com o contrato canônico:
  - `name`
  - `description`
  - `base_agent_version`
  - `specialization_revision`
  - `managed_artifact: true`
- `specialization_revision` começa em `1` na primeira materialização gerenciada do repo alvo
- `managed_artifact: true` é a marca de overwrite seguro e da deleção segura de artifacts gerenciados
- quando fizer sentido, preservar `reading_scope_class` somente como hint compatível com o contrato base; nunca usá-lo para expandir a classe permitida
- inserir `## Tools` explicitamente no agent especializado, de forma visível e auditável
- preferir posicionar `## Tools` logo após o título principal do agent e antes de `## Mission`

## Procedimento operacional
1. Validar as pré-condições e confirmar que o repo alvo realmente já passou por `stnl_project_context`.
2. Ler `docs/**` com prioridade para `docs/INDEX.md`, `docs/core/*`, `docs/TBDS.md` quando existir, e os `units` ou `features` relevantes.
3. Derivar uma matriz factual mínima do projeto:
   - superfícies reais do sistema
   - presença ou ausência de front-end
   - presença ou ausência de design/UI como preocupação real
   - presença de APIs, jobs, integrações, persistência, runtime ou outras camadas de back-end
   - expectativas reais de validação, harness e resync factual
4. Ler os templates/base agents canônicos e as referências `agent-contract-shape` e `status-gates`.
5. Revisar `.github/agents/` atual, classificando cada artifact local como:
   - `managed and current`
   - `managed but drifted`
   - `managed but obsolete`
   - `unmanaged / ambiguous`
6. Decidir o conjunto alvo mínimo e coerente de agents para o repo.
7. Atualizar ou materializar os agents necessários.
8. Deletar artifacts gerenciados obsoletos e qualquer referência local quebrada deixada por eles.
9. Reescrever ou ajustar o `orchestrator` por último, para que ele reflita apenas o conjunto final realmente materializado.
10. Validar o sistema local final: filenames, `## Tools`, metadata mínima, dependências entre agents e ausência de referências a `.agent.md` inexistente.

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
- materializar `coder-frontend` apenas quando houver front-end, web app, client UI, pages, screens, design system, ou outra superfície client-side real
- não materializar `coder-frontend` em projetos sem front-end
- materializar `designer` apenas quando houver sinais reais de UI, interação, acessibilidade, responsividade, design system, jornadas ou risco UX
- não materializar `designer` em projetos sem UI real ou quando a camada visual não for parte relevante do boundary do repo

### Agents de validação
Tratar `validation-eval-designer` e `validation-runner` como um par por padrão.

Materializar o par quando houver evidência de pelo menos um destes sinais:
- harness ou testes relevantes
- necessidade recorrente de provar comportamento, contrato, UX ou integração
- risco suficiente para exigir desenho explícito de validação antes de executar
- fluxo local em que a distinção entre desenhar prova e executar prova faz sentido operacional

Evitar materializar só um deles sem justificativa forte e explicitada.

Se o projeto for tão simples que a separação de design de validação e run de validação não se sustente por evidência, não inventar versões cosméticas desses agents. Nesses casos, bloquear ou reduzir o conjunto com justificativa factual clara, sem deixar handoffs quebrados.

### Regra de coerência sistêmica
Não omitir um agent se essa omissão deixar outros agents com referências quebradas ou exigir distorção do contrato canônico para compensar.

Antes de remover um agent canônico do conjunto local:
- procurar referências a esse `.agent.md` nos demais specializeds
- remover ou adaptar essas referências de forma coerente com o papel do agent restante
- se a remoção exigir redefinir o protocolo local ou inventar um substituto não ancorado, não remover

## Como revisar e atualizar agents existentes
- revisar o conteúdo atual de `.github/agents/*.agent.md` contra:
  - `docs/**`
  - templates/base agents canônicos
  - `agent-contract-shape`
  - `status-gates`
- atualizar quando houver drift em:
  - stack ou frameworks reais
  - boundaries e superfícies do projeto
  - comandos, scripts ou harness local
  - expectativas de validação
  - `## Tools`
  - handoffs ou referências a agents presentes ou ausentes
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
- não assumir `coder-frontend`, `designer`, `validation-eval-designer`, `validation-runner` ou `resync` sem evidência e sem materialização local correspondente
- se `designer` não existir, remover referências normais a `designer.agent.md` e reescrever a lógica local para não pressupor sua entrada
- se um coder não existir, o `orchestrator` não pode rotear trabalho para ele
- se os agents de validação não existirem, o `orchestrator` não pode fingir o workflow completo; bloquear ou ajustar o fluxo local sem inventar um agent substituto
- preservar a ordem canônica dos gates e o ownership definido em `status-gates`

## Como escolher `## Tools`
`## Tools` é obrigatório nos agents especializados do repo alvo.

Regras:
- escolher tools por missão real do agent e por least privilege
- `web` nunca é obrigatório por default; só incluir quando a missão do agent realmente precisar consultar contexto externo atual
- `execute` é ferramenta sensível; só incluir quando o agent precise executar testes, scripts, builds, linters, validações ou diagnósticos locais
- `agent` é ferramenta de coordenação; reservar para agents que realmente orquestram outros agents
- `edit` só entra quando o agent precisa materializar, modificar ou sincronizar artifacts locais
- `read` e `search` são a base da maioria dos agents; `read/readFile` só deve entrar quando o runtime diferenciar isso de forma útil
- `vscode` e `vscode/memory` só entram quando houver base factual para o runtime local depender disso
- `todo` entra quando ajudar o agent a controlar trabalho multi-etapa real

Perfis mínimos sugeridos por papel, sempre ajustáveis por evidência:
- `orchestrator`: `read`, `search`, `todo`, `agent`
- `planner`: `read`, `search`, `todo`
- `finalizer`: `read`, `search`, `edit`, `todo`
- `resync`: `read`, `search`, `edit`, `todo`
- `coder-backend`: `read`, `search`, `edit`, `execute`, `todo`
- `coder-frontend`: `read`, `search`, `edit`, `execute`, `todo`
- `designer`: `read`, `search`, `todo`
- `validation-eval-designer`: `read`, `search`, `todo`
- `validation-runner`: `read`, `search`, `execute`, `todo`

Incluir `web` apenas quando o contexto do projeto indicar dependência real de conhecimento externo atual para aquele papel, e nunca como substituto para `docs/**`.

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
- não materializar `agent-contract-shape` e `status-gates` no repo alvo na v1
- não criar docs do repo alvo por imaginação
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

## Definição de done
A skill só está done no repo alvo quando todas as condições abaixo forem verdadeiras:
- o conjunto de agents em `.github/agents/` foi decidido por evidência factual do projeto
- apenas os agents necessários foram materializados ou mantidos
- agents gerenciados stale foram atualizados ou deletados conforme necessário
- cada agent materializado contém `## Tools` explícito e coerente com least privilege
- o `orchestrator` reflete apenas o conjunto real de agents presentes
- nenhum agent local referencia `.agent.md` inexistente
- o contrato canônico dos base agents foi preservado
- `agent-contract-shape` e `status-gates` foram usados como referência, não materializados no repo alvo
- qualquer bloqueio residual foi nomeado explicitamente em vez de mascarado com texto genérico

## Regra final de honestidade
Se a base factual do repo alvo não sustentar com honestidade a decisão sobre o sistema local de agents, parar. O comportamento correto não é preencher lacunas com um kit completo por conveniência; é bloquear e explicar exatamente qual evidência falta.
