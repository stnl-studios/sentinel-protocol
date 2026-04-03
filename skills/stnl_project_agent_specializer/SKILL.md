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
- quando for preciso revisar ferramentas concedidas no frontmatter `tools` e remover excesso de privilégio

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
- se docs e codebase conflitarem de modo material, não escolher por preferência; nomear o conflito e bloquear se ele impedir uma especialização honesta
- usar `web` só depois da leitura séria do projeto e apenas quando contexto externo atual realmente mudar a qualidade da especialização

## Escopo operacional
- descobrir quais agents locais fazem sentido para o repo alvo
- materializar apenas os agents necessários em `.github/agents/`
- revisar e atualizar agents já existentes em `.github/agents/`
- deletar artifacts gerenciados obsoletos em `.github/` quando estiverem stale, órfãos ou incoerentes com o conjunto decidido
- manter o `orchestrator` alinhado ao conjunto real de agents materializados
- garantir que nenhum agent materializado continue referenciando `.agent.md` inexistente
- garantir frontmatter operacional coerente em cada agent especializado do repo alvo

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
- tratar o frontmatter operacional como source of truth do artifact especializado
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
7. Decidir a política de `model` para a rodada atual, aplicando `model_policy` quando existir e respeitando `allowed_models` quando essa entrada existir.
8. Atualizar ou materializar os agents necessários com frontmatter operacional coerente e shape final normalizado.
9. Deletar artifacts gerenciados obsoletos e qualquer referência local quebrada deixada por eles.
10. Reescrever ou ajustar o `orchestrator` por último, para que ele reflita apenas o conjunto final realmente materializado.
11. Validar o sistema local final: filenames, frontmatter operacional completo, shape normalizado, `target: vscode`, dependências entre agents, coerência de `agents` no `orchestrator`, coerência de `model` com `allowed_models` e `model_policy` quando aplicável, ausência de referências a `.agent.md` inexistente, ausência de `## Tools` residual por default, e ausência de campos legados fora do contrato.

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
  - `target`, `tools`, `agents` e `model` no frontmatter operacional
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
- não assumir `coder-frontend`, `designer`, `validation-eval-designer`, `validation-runner` ou `resync` sem evidência e sem materialização local correspondente
- se `designer` não existir, remover referências normais a `designer.agent.md` e reescrever a lógica local para não pressupor sua entrada
- se um coder não existir, o `orchestrator` não pode rotear trabalho para ele
- se os agents de validação não existirem, o `orchestrator` não pode fingir o workflow completo; bloquear ou ajustar o fluxo local sem inventar um agent substituto
- preservar a ordem canônica dos gates e o ownership definido em `status-gates`

## Como escolher `tools`
`tools` no frontmatter é obrigatório nos agents especializados do repo alvo.

Regras:
- escolher tools por missão real do agent e por least privilege
- `web` nunca é obrigatório por default; só incluir quando a missão do agent realmente precisar consultar contexto externo atual
- `execute` é ferramenta sensível; só incluir quando o agent precise executar testes, scripts, builds, linters, validações ou diagnósticos locais
- `agent` é ferramenta de coordenação; reservar para agents que realmente orquestram outros agents, e torná-la obrigatória no `orchestrator` quando `agents` for usado
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

## Como escolher `model`
- usar `docs/**` e o papel do agent para inferir o tipo de trabalho, não para prometer "o melhor modelo"
- se `model_policy` existir, aplicá-la com precedência sobre heurística implícita
- se `model_policy` não existir mas `allowed_models` existir, preferir uma política conservadora com modelo padrão único ou pequena variação por papel com justificativa operacional clara
- se não existir `allowed_models` nem `model_policy`, `model` pode ser omitido no frontmatter
- `model` pode ser string única ou lista priorizada
- usar lista priorizada apenas quando houver justificativa operacional real e sem criar fallback complexo por imaginação
- se `model` for lista priorizada, manter ordem explícita e compatível com `allowed_models` quando essa entrada existir
- não justificar `model` com texto genérico como "adequado para engenharia"
- não prometer escolha ótima, universal ou provider-agnostic sem política explícita

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
  - todo
  - agent
agents:
  - planner
  - coder-backend
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
- não inventar campos extras fora do necessário

## EXECUTE OUTPUT esperado
- informar se houve materialização, atualização, deleção e normalização
- listar os artifacts criados, atualizados ou removidos
- explicitar quando houve normalização de frontmatter
- explicitar quando houve remoção de `## Tools`
- explicitar quando houve remoção de campos legados, incluindo `agent_version`, quando aplicável
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
- ausência de `## Tools` no corpo quando `tools` já existir no frontmatter, salvo exceção explicitamente justificada
- ausência de campos legados fora do contrato atual, incluindo `agent_version` por default
- ausência de duplicação entre source of truth operacional e texto legado residual
- handoffs coerentes com o conjunto final realmente materializado
- ausência de referências ativas a `.agent.md` inexistente

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
- não espalhar `tools` em dois lugares como source of truth
- não perpetuar `## Tools` no corpo por inércia quando `tools` já estiver no frontmatter
- não introduzir `metadata:` aninhado como base central do runtime
- não reintroduzir `agent_version` como campo canônico do specialized
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

## Fechamento operacional
A skill só está done no repo alvo quando todas as condições abaixo já estiverem satisfeitas pela definição de done acima:
- o conjunto de agents em `.github/agents/` foi decidido por evidência factual do projeto
- apenas os agents necessários foram materializados ou mantidos
- agents gerenciados stale foram atualizados ou deletados conforme necessário
- todo artifact materializado contém frontmatter obrigatório completo, sem campos mandatórios ausentes e sem legado residual fora do contrato
- o `orchestrator` reflete apenas o conjunto real de agents presentes
- nenhum agent local referencia `.agent.md` inexistente
- o contrato canônico dos base agents foi preservado
- `agent-contract-shape` e `status-gates` foram usados como referência, não materializados no repo alvo
- qualquer bloqueio residual foi nomeado explicitamente em vez de mascarado com texto genérico

## Regra final de honestidade
Se a base factual do repo alvo não sustentar com honestidade a decisão sobre o sistema local de agents, parar. O comportamento correto não é preencher lacunas com um kit completo por conveniência; é bloquear e explicar exatamente qual evidência falta.
