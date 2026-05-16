Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/ ou docs/features/<feature>/SPEC/

Modo:
- execução auto-guiada e bounded da SPEC até o próximo gate legítimo, bloqueio real ou prontidão honesta para teste humano/manual.

Objetivo:
- ler a SPEC inteira;
- identificar o que já está implementado;
- validar o que já existe;
- identificar o que ainda falta;
- escolher autonomamente o próximo recorte executável;
- rotear os agentes necessários;
- validar e finalizar cada rodada pelo fluxo Sentinel;
- continuar o loop sem pedir aprovação do DEV após cada slice.
- manter o `orchestrator` como roteador canônico, sem absorver planejamento, execução, validação ou fechamento.

Regras:
- não pare após concluir apenas uma slice quando houver próxima slice elegível e nenhum gate canônico bloqueante;
- depois de cada rodada finalizada pelo `finalizer`, retome a orquestração;
- inspecione o escopo restante da SPEC;
- selecione o próximo recorte executável;
- continue até a SPEC inteira estar honestamente pronta para teste humano/manual ou até surgir blocker real;
- não altere o escopo aprovado da SPEC;
- não invente comportamento fora da SPEC;
- não crie status fora do conjunto canônico do protocolo;
- não feche slice, rodada ou SPEC sem passagem terminal pelo `finalizer`;
- não marque trabalho como pronto sem evidência e validação compatíveis com o cut;
- não entre em loop autônomo infinito: após cada fechamento, avance apenas para a próxima slice elegível ou pare no gate canônico/blocker real;
- quando possível, infira decisões seguras a partir da SPEC, do código existente e das convenções do projeto.

Regra de autonomia e parada:
- avance sozinho quando a decisão for reversível, inferível pelo contexto, já coberta pela SPEC/docs/contratos ou de baixa consequência;
- tente resolver lacunas usando contratos, docs, SPEC, artifacts do fluxo e convenções existentes antes de pedir input;
- pare somente quando houver blocker real, risco de inventar requisito, conflito entre fontes, ausência de informação obrigatória ou decisão de produto/arquitetura não inferível;
- quando parar, peça apenas a informação mínima necessária para destravar o próximo gate legítimo;
- se não houver blocker real, avance até o próximo gate canônico que realmente exija DEV, validação, finalização ou resync.

Restrições de ambiente:
- não aplique nada em emulator, ambiente remoto, produção ou serviços externos;
- não execute ações destrutivas;
- use apenas validações locais seguras disponíveis no projeto, como lint, typecheck, testes unitários, smoke tests ou comandos equivalentes;
- o DEV fará os testes manuais/emulator somente depois que a SPEC estiver concluída e as validações locais possíveis estiverem passando.

Critérios de parada:

Declare prontidão para teste humano/manual somente quando:
- a SPEC inteira estiver implementada;
- o que já existia tiver sido validado;
- os recortes pendentes tiverem sido concluídos;
- as validações locais seguras tiverem passado ou qualquer validação pulada estiver explicitamente justificada;
- a SPEC estiver pronta para teste humano/manual.

Use `BLOCKED` somente quando:
- houver blocker real;
- houver decisão crítica de produto impossível de inferir;
- houver dependência ausente que impeça avanço seguro;
- continuar exigiria inventar escopo fora da SPEC.

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
