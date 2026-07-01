# Hub de Inteligência Comercial — Grupo Dom Bosco

Projeto React + Vite para GitHub Pages.

## Como rodar no GitHub Codespaces

```bash
npm install
npm run dev
```

## Ajustes incluídos nesta versão

- Ações Internas com bloco de agendamento de visitas às escolas.
- Calendário Comercial 2026 com data, custo, total de leads e leads por unidade.
- Calendário 2027 na área de Operação.
- Negócios com demandas, responsáveis, próximas ações, prazos e eventos por negócio.
- Novo negócio: Policlínica UNDB, com espaço para lançamento do produto Clube de Benefícios.
- Eventos com tabela por mês, data, evento, negócio, responsável, status, custo, total de leads e observações.
- Datas em texto no formato recomendado: dd/mm/aaaa.
- Fontes e campos reduzidos para caber melhor dentro das tabelas.
- Campo “Tipo” renomeado para “Categoria do card”.

## Como publicar no GitHub Pages

No `vite.config.js`, confirme o `base` com o nome do repositório:

```js
base: '/hub-inteligencia-comercial/'
```

Rode:

```bash
npm run build
```

Depois configuramos o deploy no GitHub Pages.
