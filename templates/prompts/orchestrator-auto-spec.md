Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Modo:
- MODE=standard
- FLOW=autonomous
- RUN=execute

Objetivo:
- executar a SPEC de forma auto-guiada e bounded até o próximo gate canônico, blocker real ou prontidão honesta para teste humano/manual.
- identificar estado real da SPEC, slices concluídas/pendentes e próxima slice elegível usando `spec_slices.md` para dependências/readiness.
- rotear os agentes necessários sem o `orchestrator` absorver planejamento, package design, execução, validação, review ou fechamento.
- para cada rodada, preservar o fluxo Sentinel: `EXECUTION BRIEF`, `VALIDATION PACK`, `EXECUTION PACKAGE`, execução por coder, validação, review quando aplicável e fechamento pelo `finalizer`.
- continuar sem pedir aprovação do DEV após cada slice quando não houver gate/blocker legítimo.

Regras:
- não pare após concluir apenas uma slice quando houver próxima slice elegível e nenhum gate canônico bloqueante.
- depois de cada rodada finalizada pelo `finalizer`, retome a orquestração a partir do estado real.
- não altere o escopo aprovado da SPEC.
- não crie status fora do conjunto canônico do protocolo.
- não feche slice, rodada ou SPEC sem passagem terminal pelo `finalizer`.
- não marque trabalho como pronto sem evidência e validação compatíveis com o cut.
- não entre em loop autônomo infinito: avance apenas para a próxima slice elegível ou pare no gate canônico/blocker real.
- respeitar `Planning Interface`; não executar slice deferred/blocked para planejamento.
- todo handoff para coder deve preservar `EXECUTION PACKAGE` e `WORK_PACKAGE_ID`.

Autonomia e parada:
- avance sozinho apenas em decisões locais, reversíveis, inferíveis pelo escopo aprovado e de baixo risco.
- não inferir produto, contrato, schema, auth, arquitetura, persistência, payload, permissão ou regra de negócio.
- em ambiguidade material, conflito entre fontes ou ausência de informação obrigatória, pare no gate canônico e peça somente a informação mínima necessária.
- se não houver blocker real, avance até o próximo gate canônico que realmente exija DEV, validação, finalização ou resync.

Restrições de ambiente:
- não usar emulator, ambiente remoto, produção ou serviços externos.
- não executar ações destrutivas.
- usar apenas validações locais seguras disponíveis no projeto, como lint, typecheck, testes unitários, smoke tests ou comandos equivalentes.
- o DEV fará os testes manuais/emulator somente depois que a SPEC estiver concluída e as validações locais possíveis estiverem passando.

Formato final obrigatório:

## READY

Prontidão humana/manual: yes

- Resumo do que foi implementado
- O que já existia e foi validado
- O que faltava e foi implementado
- Arquivos/áreas alteradas
- Validações executadas
- O que o DEV deve testar manualmente
- Riscos ou observações restantes
- Última rodada fechada pelo `finalizer`

Ou, em caso de bloqueio:

## BLOCKED

- Motivo exato do bloqueio
- Onde o bloqueio foi encontrado
- O que já foi feito antes do bloqueio
- Informação mínima necessária para destravar
