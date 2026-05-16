Use `orchestrator`.

SPEC:
- docs/SPEC/<feature>/

Modo:
- execução automática da SPEC até `READY_FOR_HUMAN_TEST` ou `BLOCKED`.

Objetivo:
- ler a SPEC inteira;
- identificar o que já está implementado;
- validar o que já existe;
- identificar o que ainda falta;
- escolher autonomamente o próximo recorte executável;
- rotear os agentes necessários;
- validar e finalizar cada rodada pelo fluxo Sentinel;
- continuar o loop sem pedir aprovação do DEV após cada slice.

Regras:
- não pare após concluir apenas uma slice;
- depois de cada rodada finalizada, retome a orquestração;
- inspecione o escopo restante da SPEC;
- selecione o próximo recorte executável;
- continue até a SPEC inteira chegar em `READY_FOR_HUMAN_TEST` ou `BLOCKED`;
- não altere o escopo aprovado da SPEC;
- não invente comportamento fora da SPEC;
- quando possível, infira decisões seguras a partir da SPEC, do código existente e das convenções do projeto.

Restrições de ambiente:
- não aplique nada em emulator, ambiente remoto, produção ou serviços externos;
- não execute ações destrutivas;
- use apenas validações locais seguras disponíveis no projeto, como lint, typecheck, testes unitários, smoke tests ou comandos equivalentes;
- o DEV fará os testes manuais/emulator somente depois que a SPEC estiver concluída e as validações locais possíveis estiverem passando.

Critérios de parada:

Use `READY_FOR_HUMAN_TEST` somente quando:
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

## READY_FOR_HUMAN_TEST

- Resumo do que foi implementado
- O que já existia e foi validado
- O que faltava e foi implementado
- Arquivos/áreas alteradas
- Validações executadas
- O que o DEV deve testar manualmente
- Riscos ou observações restantes

Ou, em caso de bloqueio:

## BLOCKED

- Motivo exato do bloqueio
- Onde o bloqueio foi encontrado
- O que já foi feito antes do bloqueio
- Opções possíveis para destravar