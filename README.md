# Hub de Inteligência Comercial — Grupo Dom Bosco

Projeto React + Vite para GitHub Pages.

## Como rodar no GitHub Codespaces

```bash
npm install
npm run dev
```

## Como publicar no GitHub Pages

1. No `vite.config.js`, confirme o `base` com o nome do repositório:

```js
base: '/hub-inteligencia-comercial/'
```

Se o repositório for `planejamento-comercial-gdb`, troque para:

```js
base: '/planejamento-comercial-gdb/'
```

2. Rode:

```bash
npm run build
```

3. Publique o conteúdo da pasta `dist` ou configure GitHub Actions para deploy.

## Dados

O Hub salva alterações no navegador via localStorage.
Também permite:
- exportar JSON;
- importar JSON;
- configurar links CSV publicados de planilhas em Configurações;
- sincronizar CSVs.

## Páginas

- Visão Geral
- Calendário Comercial
- Escola Dom Bosco
- UNDB Graduação
- Pós-Graduação
- Medicina
- Eventos
- Ações Internas
- Ações Externas
- Reunião Comercial
- Configurações
