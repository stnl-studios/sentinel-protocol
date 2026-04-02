SCOPE: core
PROJECT: <project-name>
LAST UPDATED: YYYYMMDD

# Core Rules

## Objetivo
Registrar regras globais do projeto e limites operacionais relevantes com densidade factual alta, sem duplicar contexto factual nem simular inventário estrutural total.

## Regras invioláveis
- sem evidência, não inventar; registrar `TBD` no contexto correto
- evidência parcial precisa ser marcada como parcial; profundidade não autoriza inferência
- usar `principais pontos observados` quando a amostragem for forte, mas não exaustiva
- documentação durável precisa viver nos docs canônicos do projeto e nas ADRs aplicáveis
- mudanças de comportamento, estrutura, contrato ou restrição real precisam ser refletidas na documentação correspondente
- toda lacuna relevante precisa ser registrada explicitamente, sem ser mascarada por abstração vaga

## Registro de lacunas e decisões
- quando faltar decisão de produto, arquitetura, integração ou operação, explicitar a pendência no documento correto
- quando uma mudança exigir decisão formal, apontar a dependência sem assumir conclusão implícita
- diferenciar fato observado, hipótese de trabalho e decisão já tomada

## Consistência documental
- `docs/core/*` define o contexto global e não deve ser contradito por docs locais
- `docs/units/*` e `docs/features/*` especializam o recorte local sem reescrever regras globais
- notas transitórias, alinhamentos informais ou rascunhos não devem virar fonte de verdade durável

## Mudança estrutural ou normativa
- mudança estrutural, normativa, arquitetural, de fronteira relevante ou de contrato externo relevante exige tratamento explícito
- quando aplicável, registrar ADR
- não normalizar breaking change silenciosa

## Restrições de manutenção
- não ampliar escopo por conveniência
- não usar documento transitório ou nota informal como fonte de verdade durável
- não reescrever docs factuais fora da área impactada sem necessidade real
- quando faltar profundidade sustentável numa área, registrar a lacuna em vez de preencher com abstração vaga

## Referências
- `docs/INDEX.md`
- `docs/core/CONTEXT.md`
- `docs/core/STATE.md`
- `docs/core/CONTRACTS.md`
- `docs/core/TESTING.md`
- docs operacionais complementares do projeto, se existirem
