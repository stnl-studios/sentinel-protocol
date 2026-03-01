# Exemplos de Entrada

## 1) Pedido completo (não deve gerar perguntas)
Preciso implementar uma feature para exportar relatório CSV de vendas no painel admin. Escopo IN: endpoint GET /admin/reports/sales.csv e botão "Exportar CSV" na tela de relatórios. Escopo OUT: PDF, filtros avançados, mudanças em autenticação. Restrições: manter contrato atual dos endpoints existentes e não alterar comportamento de telas fora de admin/reports. Critérios de aceite: download funciona com paginação atual, colunas data/cliente/valor, e teste automatizado cobrindo caso com 0 e com N registros. Permissões: permitido criar endpoint novo e campo calculado no payload do CSV; proibido alterar contratos existentes e proibido refatoração ampla.

## 2) Pedido ambíguo (deve gerar 6-8 perguntas)
Ajusta a parte de cobrança porque está meio ruim e aproveita para melhorar a API e a UI também.

## 3) Refactor sem permissão explícita (deve perguntar autorização)
Quero reorganizar o módulo de usuários para ficar mais limpo e padronizado. Não tenho definição de escopo detalhada ainda.
