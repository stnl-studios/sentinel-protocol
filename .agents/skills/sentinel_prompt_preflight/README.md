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
- Nao executa nada.
- Nao atua como planner real, executor ou auditor.

## O que esta skill faz

- Reescreve a solicitacao do usuario em formato estruturado.
- Aplica guardrails operacionais minimos.
- Verifica apenas existencia de paths canonicos e arquivos core.
- Instrui leitura sob demanda para o executor.
- Mantem a resposta curta, colavel e barata em tokens.

## Sanity check permitido

Somente:

- `docs/INDEX.md`
- `docs/core/RULES.md`
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `docs/core/PLAN.md`
- `PLAN.md`
- PLAN de feature apenas se o texto do usuario permitir identificar um candidato sem abrir arquivos

Nunca:

- abrir arquivo
- ler conteudo
- resumir conteudo
- inferir regra de negocio
- inferir arquitetura
- inferir escopo real a partir do codigo

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
