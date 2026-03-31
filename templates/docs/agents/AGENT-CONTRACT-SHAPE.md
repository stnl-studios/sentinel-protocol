# Shape Canônico de Contrato de Agent Base

## Propósito
Definir o shape mínimo e canônico que todo agent base do Sentinel precisa explicitar, inclusive quando houver especialização por projeto.

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
- parte fixa do protocolo
- parte especializável por projeto

## Parte fixa do protocolo
É a parte canônica que define o contrato do agent base no ecossistema Sentinel. Inclui seu papel, seus limites, os status que pode emitir, seus gatilhos de entrada e saída e suas condições de escalonamento.

## Parte especializável por projeto
É a parte que adapta contexto, heurísticas, exemplos, critérios locais e detalhes operacionais ao projeto, sem quebrar o contrato canônico do agent base.

## Regras de preservação
- A especialização por projeto muda conteúdo, não muda o nome físico do arquivo.
- Todo agent especializado do projeto preserva o contrato canônico do agent base correspondente.
- Todo agent do Sentinel é um agent base que pode ser especializado por projeto sem renomeação física.
