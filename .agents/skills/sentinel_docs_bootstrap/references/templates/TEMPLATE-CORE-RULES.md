# RULES

## Objetivo
Regras invioláveis e stop conditions.
Este arquivo é curto e tem peso alto.

## Invariáveis
Liste as regras que nunca podem ser violadas.

Exemplos
Não inferir contratos externos sem evidência.
Não criar novos padrões globais sem ADR.
Não duplicar conteúdo de Reference em Core ou Feature.

## Evidência obrigatória
Toda afirmação crítica deve ter evidência.
Formato
path do arquivo
trecho curto ou referência de seção

Se não houver evidência
registrar TBD no CONTEXT core
parar antes de implementar

## Stop conditions
Pare imediatamente se ocorrer
1. conflito entre duas fontes canônicas
2. ambiguidade que muda comportamento do usuário
3. necessidade de alterar contrato externo sem confirmação
4. necessidade de mudar arquitetura ou padrão global sem ADR
5. falta de evidência para item crítico

Ao parar
1. registrar TBD com ID no CONTEXT core
2. sugerir próximo passo para obter evidência

## Escopo de mudança
Classifique toda mudança como
Local
impacta apenas a feature e arquivos próximos

Transversal
impacta múltiplas features, mas sem mudar arquitetura

Estrutural
muda arquitetura, contratos globais, padrões, convenções ou diretórios

Regras
Local pode seguir com Feature Pack
Transversal exige atualização de STATE e revisão do Core Pack
Estrutural exige ADR antes

## Política de tokens e contexto
Regra
usar o menor pacote de contexto possível

Nunca incluir Reference por padrão
Reference só entra por gatilho

Se a execução exigir Reference repetidamente
dividir a fase

## Colaboração
Core muda pouco e sempre via PR com revisão
Feature é onde o trabalho diário acontece
Evitar editar o mesmo arquivo Core em paralelo

## Atualização obrigatória ao concluir fase
1. criar DONE da feature
2. atualizar CONTEXT da feature
3. atualizar STATE apenas se global mudou
4. ADR se estrutural
