# Sentinel Prompt Preflight

Skill para transformar um pedido bruto em um prompt governado de execucao.

## Contrato

- Entrada: pedido ruim, cru, vago ou incompleto.
- Operacao permitida: reescrita estruturada + sanity check somente por existencia.
- Saida: exatamente um unico bloco de codigo Markdown `md`.
- Encerramento: o Preflight para apos emitir o prompt final.

## O que esta skill nao faz

- Nao le conteudo do repositorio.
- Nao le ou resume docs.
- Nao exporta regras das docs para o prompt.
- Nao monta plano tecnico com base em evidencia.
- Nao cria ou recicla `PLAN.md`.
- Nao promove fase nem reorganiza a fila do plano.
- Nao executa nada.
- Nao atua como planner real, executor ou auditor.

## O que esta skill faz

- Reescreve a solicitacao do usuario em formato estruturado.
- Aplica guardrails operacionais minimos.
- Verifica apenas existencia de paths canonicos e arquivos core.
- Instrui leitura sob demanda para o executor.
- Mantem a resposta curta, colavel e barata em tokens.

## Relacao com o plano

- O ciclo de vida do `PLAN.md` pertence exclusivamente a `sentinel_plan_blueprint`.
- Fechamento de fase pertence exclusivamente a `sentinel_phase_closure`.
- O Preflight apenas prepara o prompt do executor para o ciclo atual.
- Quando a unidade alvo for identificavel, o plano principal do fluxo e o `PLAN.md` dessa unidade.
- `PLAN.md` na raiz e o unico fallback real quando nao houver resolucao melhor da unidade alvo, mas permanece provisiorio.
- `PLAN.md` raiz nao e a casa canonica de `DONE`, `CONTEXT` ou outros artefatos duraveis.
- `docs/core/PLAN.md` nao e fallback utilizavel nem alternativa operacional de plano.

## Sanity check permitido

Somente:

- `docs/INDEX.md`
- `docs/core/RULES.md`
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `PLAN.md` da unidade alvo, apenas se o texto do usuario permitir identificar um candidato sem abrir arquivos
- `PLAN.md` na raiz, apenas como fallback real e provisiorio

Nunca:

- abrir arquivo
- ler conteudo
- resumir conteudo
- inferir regra de negocio
- inferir arquitetura
- inferir escopo real a partir do codigo

Se o prompt final precisar usar `PLAN.md` raiz, o executor deve trata-lo como plano provisiorio e resolver a unidade real antes do fechamento e da gravacao de artefatos duraveis.

## Estrutura do prompt gerado

1) `TAREFA`
2) `MODO`
3) `SANITY CHECK`
4) `FONTES CANONICAS`
5) `LEITURA SOB DEMANDA`
6) `LIMITES`
7) `SAIDA ESPERADA DO EXECUTOR`
8) `DOCSYNC`

## Regra de formato

Nao pode existir texto fora do bloco final iniciado com ` ```md `.
