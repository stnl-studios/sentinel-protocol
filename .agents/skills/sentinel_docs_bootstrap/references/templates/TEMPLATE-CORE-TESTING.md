# TESTING

## Objetivo
Descrever como validar o projeto e a feature.
Este arquivo precisa ser executável, não aspiracional.

## Smoke mínimo do projeto
Lista curta de verificações que sempre rodam.
Exemplo
build
lint
test básico
abrir app e navegar em rota principal

## Estratégia
Unit
quando regras de negócio ou funções puras

Integration
quando juntar camadas, repositórios, APIs internas

E2E
quando fluxo usuário crítico

## Gatilhos
Se a mudança for
Estrutural
exigir smoke completo e testes adicionais

Contrato externo
exigir teste de integração ou mock validado

UI crítica
exigir snapshot ou checklist visual

## Como rodar
Comandos
Paths
Ambiente

## Evidências
Ao concluir fase, registrar no DONE o que foi rodado e o resultado.
