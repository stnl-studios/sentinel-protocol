# UI KIT

## Objetivo
Catálogo operacional de UI.
Ele lista componentes, status e padrões de composição.
Ele não duplica tokens completos do Design System.

## Fonte canônica
Se houver Design System completo, apontar para ele.
Se não houver, este arquivo é a fonte operacional mínima.

## Inventário de componentes
Tabela sugerida
Nome
Status planned, in progress, done, deprecated
Responsável
Onde fica no código
Notas curtas

## Padrões de composição
Regras curtas de como combinar componentes.
Exemplo
Cards com Header e Body
Listas com Empty State
Modais com ações padrão

## Tokens e estilos
Não duplicar tokens completos aqui.
Registrar apenas decisões operacionais, por exemplo
escala de espaçamento usada
tipos de botão
raios de borda padrão
Aponte para DESIGN_SYSTEM quando existir.

## Processo para criar componente novo
1. preencher uma especificação curta
2. definir status planned
3. ao implementar, atualizar status e path
4. registrar decisões relevantes no CONTEXT da feature
