# INDEX

## Objetivo
Este índice existe para navegação rápida, seleção de contexto e regras de precedência.
Ele não duplica conteúdo de referência.
Ele aponta para a fonte canônica.

## Camadas de documentação
### Core
Sempre entra quando houver trabalho no projeto.
Arquivos curtos e estáveis.

Pasta sugerida
docs/core

Conteúdo típico
Context, Rules, State, Contracts internos, Testing, UI Kit

### Feature
Entra apenas quando a tarefa envolve a feature.
Arquivos curtos por feature.

Pasta sugerida
docs/features/<feature>

Conteúdo típico
Context da feature, Contracts da feature, Plan de execução, Done, testes específicos

### Reference
Biblioteca.
Não entra por padrão em prompts.

Pasta sugerida
docs/reference

Conteúdo típico
Design System completo, Coding Guidelines completas, documentação externa, links e anexos

### Decisions
Registro de decisões estruturais.
Sempre tem peso alto.

Pasta sugerida
docs/decisions

## Precedência
Quando existir conflito, use esta ordem.
1. ADR
2. RULES
3. CONTRACTS internos e externos
4. CONTEXT core
5. CONTEXT da feature
6. PLAN da feature
7. TESTING
8. UI KIT
9. Reference

Se duas fontes canônicas acima divergirem, pare e registre um TBD no CONTEXT core.
Se necessário, crie um ADR.

## Seleção de contexto por tarefa
Regra geral
Use o menor pacote que permita decidir e implementar sem inferir.

### Pacotes
Core Pack
docs/core/CONTEXT.md
docs/core/RULES.md
docs/core/STATE.md
docs/core/CONTRACTS.md
docs/core/TESTING.md
docs/core/UI_KIT.md

Feature Pack
docs/features/<feature>/CONTEXT.md
docs/features/<feature>/CONTRACTS.md quando existir
docs/features/<feature>/TESTING.md quando existir
docs/features/<feature>/done/DONE-YYYYMMDD-<entrega-real>.md

Evidence Pack
Apenas trechos necessários, por exemplo
um diff
um arquivo específico
um contrato externo específico

Reference Pack
Apenas quando houver gatilho.

### Gatilhos para incluir Reference
Inclua Reference apenas se a tarefa exigir pelo menos um dos itens
1. editar o Design System
2. mexer em tokens, tipografia, espaçamento, guidelines visuais
3. alterar Coding Guidelines ou padrões globais
4. alterar contrato externo ou integração
5. resolver conflito entre fontes canônicas

Anti padrão
Se voce precisou incluir Reference repetidamente no mesmo `Escopo ativo`, o escopo esta grande demais.
Divida o escopo.

## Protocolo de atualização
Ao finalizar uma execucao concluida
1. criar um DONE na pasta done da feature
2. atualizar o CONTEXT da feature com fatos duráveis e histórico por entrega
3. atualizar o STATE core apenas se algo global mudou
4. se houve mudança estrutural, criar ADR e atualizar RULES ou CONTRACTS se aplicável

O PLAN e descartavel e pode ser removido apos a execucao.
O conhecimento fica em CONTEXT da feature, DONE e STATE.

## Mapa de arquivos
Core
docs/core/CONTEXT.md
docs/core/RULES.md
docs/core/STATE.md
docs/core/CONTRACTS.md
docs/core/TESTING.md
docs/core/UI_KIT.md
docs/reference/DESIGN_SYSTEM.md quando houver design próprio

Feature
docs/features/<feature>/CONTEXT.md
docs/features/<feature>/CONTRACTS.md opcional
docs/features/<feature>/TESTING.md opcional
docs/features/<feature>/PLAN.md descartável
docs/features/<feature>/done/DONE-YYYYMMDD-<entrega-real>.md

Decisions
docs/decisions/ADR-YYYYMMDD-titulo-curto.md
