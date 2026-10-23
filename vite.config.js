import { defineConfig } from 'vite';

// На GitHub Pages сайт лежит по адресу tengizka.fun/kursich/ (подпапка),
// поэтому для production-сборки используем относительный base './' —
// так ассеты подгрузятся и с GitHub Pages, и с любого другого хостинга.
// В dev-режиме остаётся '/' для локальной разработки и превью.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
}));
