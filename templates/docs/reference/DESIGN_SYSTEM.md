LAST UPDATED: YYYYMMDD

## File Purpose Header
- purpose: Referência canônica de design system quando houver base visual própria.
- read_when: Mudança visual, componente, tela ou revisão precisa confirmar tokens, padrões ou fontes de verdade visuais.
- do_not_use_for: Decisão de produto, contrato de API, execução, comandos, validação completa ou substituto de UI kit local.
- canonical_source_for: Fundamentos, tokens, princípios e fontes reais do design system.
- canonical_source_not_for: Padrões visuais específicos de uma unit, regras de arquitetura ou testes.
- update_owner: `stnl_project_foundation` inicialmente; depois owner documental/design do projeto.
- downstream_consumers: `designer`, `coder-frontend`, `coder-ios`, `reviewer`, `validation-eval-designer`.
- token_policy: Ler fundamentos e fontes de verdade; abrir UI kit local para variações da unit.
- related_files: `docs/units/<unit-slug>/UI_KIT.md`, `docs/core/RULES.md`, `docs/TBDS.md`.

# Design System

> Template opcional. Criar apenas quando houver design system próprio, tokens/guidelines institucionalizados ou pedido explícito.

## 1. Objetivo
Descreva o papel deste design system no projeto e quando ele deve ser consultado.

## 2. Fundamentos
Registre apenas as fundações reais do sistema visual.

- Tipografia: `<regra>`
- Cores: `<regra>`
- Espaçamento: `<regra>`
- Grid / layout: `<regra>`
- Ícones: `<regra>`
- Motion: `<regra ou N/A>`

## 3. Princípios de uso
- `<consistência>`
- `<acessibilidade>`
- `<responsividade>`
- `<semântica visual>`

## 4. Componentização
Descreva apenas a visão macro da biblioteca visual.

- `<famílias de componentes>`
- `<fronteiras entre base, composto e padrão>`

## 5. Fontes de verdade
Aponte as fontes reais.

- `<path interno>`
- `<biblioteca>`
- `<documento ou link interno>`

## 6. Escopo e limitações
- Onde este design system vale.
- Onde não vale.
- O que ainda está parcial ou não consolidado.
