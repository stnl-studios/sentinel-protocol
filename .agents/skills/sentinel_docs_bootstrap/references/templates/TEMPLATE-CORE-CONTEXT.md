# CONTEXT

Este template serve para Context core e Context de feature.
Use o cabeçalho para indicar o escopo.

## Cabeçalho
SCOPE
core ou feature

FEATURE
preencha apenas se SCOPE for feature
use um slug curto, por exemplo agenda, payments, onboarding

OWNER
quem mantém este contexto

STATUS
draft ou stable

LAST UPDATED
YYYYMMDD

## Objetivo
Descreva o problema e o resultado esperado.
Evite detalhes de implementação aqui.

## Escopo
### Inclui
Liste o que está dentro do escopo.

### Não inclui
Liste o que está fora do escopo.

## Restrições e suposições proibidas
### Restrições
Stack, plataforma, bibliotecas obrigatórias, limites de performance, etc.

### Suposições proibidas
Liste o que a IA não pode inferir.
Exemplo contratos externos sem evidência, payloads, regras de negócio ambíguas.

## Fluxos e casos de borda
Descreva apenas o necessário para executar sem inventar.
Se o fluxo for grande, preferir um resumo e apontar para docs específicos.

## Entidades e conceitos
Glossário mínimo.
Aponte para CONTRACTS quando existir.

## Evidências
Para afirmar que algo existe, cite evidência.
Formato recomendado
path do arquivo
e um trecho curto ou referência de seção

Se não houver evidência, registrar TBD.

## Perguntas e TBD
Regra
TBD canônico mora aqui.
PLAN só referencia IDs.

Formato
TBD-001
Pergunta
Impacto baixo, médio, alto
Bloqueia sim ou não
Sugestão de como obter resposta

## Decisões locais da feature
Se SCOPE for feature, registrar decisões específicas aqui.
Se afetar o projeto todo, criar ADR.

## Links
Links internos do repositório e referências externas.
