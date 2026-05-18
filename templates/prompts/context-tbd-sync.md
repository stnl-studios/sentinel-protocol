Use `stnl_project_context`.
MODE=TBD_SYNC

TBD alvo:
- TBD_ID: TBD-<NNN>
- Identificador ou título no `docs/TBDS.md`: [copiar o suficiente para localizar sem ambiguidade]

Escopo:
- TARGET_SCOPE: [core | unit:<unit-slug> | feature:<feature-path>]
- Onde o TBD aparece: [docs/TBDS.md e doc/trecho local que referencia a lacuna]

Fonte de verdade autorizada:
- SOURCE_OF_TRUTH: [paths reais, docs, PR/issue/decisão explícita ou evidência autorizada para resolver o TBD]

Critério de resolução esperado:
- [resolver por evidência factual | resolver por decisão explícita | manter investigating/open com delimitação melhor]

Atualização autorizada:
- [atualizar apenas o TBD alvo em docs/TBDS.md | atualizar também estes docs relacionados: <paths>, porque <motivo>]

Regra de parada:
- Não inventar resolução de TBD.
- Não transformar TBD_SYNC em RESYNC amplo.
- Não atualizar docs relacionados sem declarar quais e por quê.
- Se TARGET_SCOPE ou SOURCE_OF_TRUTH não forem suficientes para resolver com segurança, parar e pedir exatamente o dado faltante.

Restrições excepcionais:
- [somente se houver]
