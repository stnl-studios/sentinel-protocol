# Sentinel Protocol

Nova fase em construção.

## Estado do repositório
Este repositório entrou em uma nova fase focada em:
- geração de agents custom por projeto
- estruturação de templates e overlays
- rastreabilidade arquitetural da evolução

## Legado
A implementação anterior do Sentinel foi preservada em `LEGACY/`.

## Foco atual
O foco atual não é evoluir o pipeline legado.
O foco é construir a base do novo ecossistema.

## Papel do Sentinel
Este repositório é a fábrica do Sentinel Protocol. Ele mantém:
- skills
- templates
- agents base
- installer
- smoke

Ele não é o runtime final dos agents materializados. A materialização acontece sempre no projeto alvo selecionado.

Targets suportados pelo `stnl_project_agent_specializer`:
- `vscode` -> `.github/agents/*.agent.md` no repo alvo
- `codex` -> `.codex/agents/*.toml` no repo alvo
- `codex` -> `AGENTS.md` na raiz do repo alvo

O template de `AGENTS.md` do target `codex` vive internamente na skill, em `skills/stnl_project_agent_specializer/reference/templates/codex/AGENTS.md`. O arquivo `AGENTS.md` operacional não deve existir na raiz do Sentinel; ele só é gerado no repo alvo quando `target=codex`.

## Smoke do Sentinel
Use `node sentinel.mjs smoke` como caminho canônico de self-validation estrutural do Sentinel.

Ele cobre hoje:
- manifests canônicos de install e bundle das skills materializadas
- presença obrigatória dos artifacts endurecidos do protocolo atual
- cobertura dos roots sensíveis para evitar agent/doc canônico fora do bundle por acidente
- ciclo isolado de `init`, `update` e `doctor` em `HOME` temporário
- consistência mínima entre source of truth do repo e artifacts materializados
- materialização controlada de `stnl_project_context` em repo fixture efêmero local
- materialização controlada de `stnl_project_agent_specializer` para `vscode` em `.github/agents/` da fixture
- materialização controlada de `stnl_project_agent_specializer` para `codex` em `.codex/agents/*.toml` e `AGENTS.md` da fixture
- validação mínima de shape dos docs, references, frontmatters `vscode` e TOMLs `codex` gerados, sem snapshot textual grande

O smoke valida materialização em repos efêmeros controlados. Ele não materializa artifacts operacionais finais no próprio Sentinel.

Ele ainda não cobre:
- e2e completo das skills em repositórios reais
- decisão semântica completa de quais docs/features/agents um projeto real deveria materializar
- semântica profunda dos templates ou qualidade de conteúdo além do wiring estrutural e do shape mínimo
- integrações externas ou variações de ambiente fora do smoke local reproduzível

Para manter:
- rode `node sentinel.mjs smoke` antes de fechar mudanças em `sentinel.mjs`, templates cobertos ou wiring das skills
- estenda [`scripts/sentinel-smoke.mjs`](../sentinel-protocol/scripts/sentinel-smoke.mjs) com checks estruturais novos só quando houver novo source of truth ou novo root realmente possuído pelo bundle
- evite asserts cosméticos ou snapshots grandes; priorize presença, cobertura de manifest e coerência materializada
