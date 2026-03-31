# DONE Template

## Objetivo
Registrar a entrega consolidada de uma rodada que gerou marco real. `DONE` é memória durável e só deve existir quando houver uma entrega verificável que valha ser preservada.

## Convenção de arquivo
- Nome real futuro: `DONE-YYYYMMDD-<entrega-real>.md`
- O slug deve representar a entrega real, nunca numeração operacional da rodada.

## Template
```md
# DONE - <entrega consolidada>

FEATURE: <feature-path>
ENTREGA CONSOLIDADA: <entrega-real>
VEREDITO DO RUNNER: PASS | PARTIAL
DATA: YYYYMMDD

## Objetivo do corte executado
- O que este corte entregou de forma concreta.

## Veredito da rodada
- Registrar o veredito consumido no fechamento (`PASS` ou, em exceção explícita, `PARTIAL`) com uma frase objetiva de justificativa.

## Evidência principal
- Artefato, diff, validação ou referência factual que comprova o marco.

## Validação / eval executada
- Check principal executado e respectivo resultado.

## Desvios / TBDs / observações
- Limite conhecido, desvio assumido ou pendência remanescente.

## Impacto documental
- Docs duráveis atualizadas, criadas ou confirmadas.

## Próximo passo lógico
- Próximo passo natural após este marco, sem transformar o `DONE` em plano detalhado.
```

## Regras de uso
- Abrir `DONE` apenas quando houver marco real.
- `DONE` normalmente nasce de rodada com `PASS`; `PARTIAL` só cabe quando o próprio marco estiver provado e a parcialidade remanescente for claramente secundária.
- Rodadas `FAIL` ou `BLOCKED` não devem abrir `DONE`.
- Manter o texto curto, verificável e durável.
- `DONE` não substitui `Feature CONTEXT`.
