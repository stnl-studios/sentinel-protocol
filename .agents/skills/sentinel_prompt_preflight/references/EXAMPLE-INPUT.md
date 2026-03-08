# Exemplos de Entrada

## 1) Pedido bruto com acao e artefatos
Preciso implementar uma feature para exportar relatório CSV de vendas no painel admin. Escopo IN: endpoint GET /admin/reports/sales.csv e botão "Exportar CSV" na tela de relatórios. Escopo OUT: PDF, filtros avançados, mudanças em autenticação. Restrições: manter contrato atual dos endpoints existentes e não alterar comportamento de telas fora de admin/reports. Critérios de aceite: download funciona com paginação atual, colunas data/cliente/valor, e teste automatizado cobrindo caso com 0 e com N registros. Permissões: permitido criar endpoint novo e campo calculado no payload do CSV; proibido alterar contratos existentes e proibido refatoração ampla.

## 2) Pedido ambíguo
Ajusta a parte de cobrança porque está meio ruim e aproveita para melhorar a API e a UI também.

## 3) Refactor sem permissao explicita
Quero reorganizar o módulo de usuários para ficar mais limpo e padronizado. Não tenho definição de escopo detalhada ainda.

## 4) Pedido com path explicito
Implementar paginação em `src/app/modules/perimeters/pages/categories` sem alterar outros módulos.

## 5) Pedido com feature ou container parcial
Melhorar fluxo de registro em `registration`, sem decidir subfeature ainda.

## 6) Pedido de mudanca transversal
Padronizar permissões em `src/app/main/registration` e `src/app/modules/perimeters`.
