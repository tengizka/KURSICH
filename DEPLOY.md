# Деплой КУРСИЧА через GitHub → Telegram Mini App

## Как это работает

```
push в GitHub ──► GitHub Actions (deploy-pages.yml) ──► сборка Vite (dist/)
                                                              │
                                                              ▼
                                          GitHub Pages: https://tengizka.fun/kursich/
                                                              │
                                                              ▼
                                          этот URL указан в BotFather как Web App
                                                              │
                                                              ▼
                                          пользователь открывает мини-апп прямо в Telegram
```

Всё бесплатно: и хостинг GitHub Pages, и GitHub Actions для публичного репозитория.

## Адрес сайта

**https://tengizka.fun/kursich/**

## Если деплой не пошёл (один раз, вручную)

1. Открой репозиторий: https://github.com/tengizka/kursich
2. **Settings → Pages**
3. В блоке **Build and deployment → Source** выбери **GitHub Actions**
   (не «Deploy from a branch»!)
4. Вкладка **Actions** → workflow «Deploy КУРСИЧ to GitHub Pages» → **Run workflow**
5. Через 1–2 минуты сайт будет жить по адресу выше

## Подключение к Telegram (BotFather)

1. В Telegram напиши [@BotFather](https://t.me/BotFather) → `/newbot` → задай имя («КУРСИЧ») и username бота
2. `/setmenubutton` → выбери своего бота
3. Отправь URL: `https://tengizka.fun/kursich/`
4. Отправь текст кнопки: `🎓 Учиться`
5. Открой бота → кнопка меню слева от поля ввода откроет мини-апп

Дополнительно (по желанию):
- `/setdescription` — описание бота
- `/setuserpic` — аватарка (можно вырезать Курсича из приложения, вкладка «Профиль»)

## Обновление приложения

Просто запушь изменения в ветку `arena/b3bf7743-kursich` или `main` — GitHub сам пересоберёт и обновит сайт за 1–2 минуты. Ничего вручную загружать не нужно.

## Локальная разработка

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # проверка production-сборки
```
