---
name: sentinel_plan_blueprint
description: Gera 1 PLAN rico (Fase 1 detalhada, Fase 2 esboço forte, Fase 3 esboço leve) quando não existe PLAN no repo, usando discovery por paths e entrevista curta com modo estendido opcional.
---
# Sentinel Plan Blueprint

## O que esta skill faz
Criar exatamente 1 PLAN rico quando não existir PLAN no repositório.

## Regras invioláveis da skill (runtime)
1) Create only absoluto
   - Se o PLAN já existir, não editar e registrar SKIPPED.
2) Proibido criar, editar, mover, renomear PLAN existente.
3) Sem alucinação
   - Só afirmar com evidência do repo (paths). Sem evidência vira TBD.
4) Entrevista (padrão e estendido)
   - Padrão: no máximo 2 rodadas e no máximo 7 perguntas no total.
   - Estendido: apenas se houver flag explícita `INTERVIEW: EXTENDED` no pedido. Aí permitir até 4 rodadas e até 12 perguntas.
   - Preferir perguntas fechadas e com opções.
5) Saída curta e operacional
   - Foco em passos, arquivos e critérios de pronto. Sem texto longo.

## Detecção de PLAN existente (runtime)
Considerar PLAN existente se qualquer um existir:
1) `PLAN.md` (raiz)
2) `docs/features/*/PLAN.md`

Se existir, encerrar com:
- STATUS: SKIPPED
- PLAN detected at: <path(s)>
- Files created: none
- Questions asked: X/Y

## Onde criar o PLAN (runtime)
Criar exatamente 1 arquivo:
1) Default: `docs/features/<feature_slug>/PLAN.md`
2) Fallback: `PLAN.md` (raiz), somente quando não for possível resolver `feature_slug` com evidência + entrevista curta.

## Addendum — Roots, containers e subfeatures (aditivo)

Aplicar sem remover o fluxo atual:
1) Quando houver path explícito com root/container/subfeature, resolver a unidade nesse formato.
2) Path canônico preferencial:
   - container: `docs/features/<root>/<container>/PLAN.md`
   - subfeature: `docs/features/<root>/<container>/<collection>/<subfeature>/PLAN.md`
3) Coleções reconhecidas: `pages`, `use-cases`, `routes`, `features`, `modules`, `screens` e `items` (default).
4) O mesmo resolvedor deve ser compatível com o preflight para evitar criação de PLAN em unidade errada.

## Como resolver feature_slug (runtime, com evidência)
Ordem:
1) Se existir exatamente 1 diretório em `docs/features/`, usar esse slug.
2) Se existirem múltiplos slugs em `docs/features/`, perguntar ao usuário para escolher 1 (pergunta fechada com opções).
3) Se `docs/features/` não existir ou estiver vazio:
   - não inventar slug; usar fallback `PLAN.md` (raiz) com FEATURE = TBD.

## Como preencher o PLAN (runtime)
Base: `references/templates/TEMPLATE-PLAN.md`

Preencher automaticamente:
1) STATUS: draft
2) LAST UPDATED: YYYYMMDD (hoje)
3) FEATURE: <feature_slug> ou TBD
4) OWNER: se usuário informar; senão TBD
5) Core/Feature/Evidence/Reference Packs:
   - listar apenas arquivos que existirem (paths reais).
   - se não houver evidência, registrar TBD.

Fases:
- Fase 1: detalhada e executável em uma rodada do executor.
- Fase 2: esboço forte (macro passos, dependências, decisões pendentes, riscos).
- Fase 3: esboço leve (norte + principal dependência/risco).

## Integração com Preflight (contrato)
O Preflight considera PLAN presente se existir:
- `PLAN.md` OU `docs/features/*/PLAN.md`

Esta skill garante que, quando não existe nenhum PLAN, ela cria exatamente 1 PLAN em um desses formatos.

## Critério de pronto (da implementação desta skill)
1) `.agents/skills/sentinel_plan_blueprint/SKILL.md` existe.
2) `.agents/skills/sentinel_plan_blueprint/references/templates/TEMPLATE-PLAN.md` existe e não está vazio.
3) Nada foi sobrescrito; se existia, foi SKIPPED.
