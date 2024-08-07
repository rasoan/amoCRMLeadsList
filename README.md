## Инструкция

---

# ВНИМАНИЕ!!
Запросы к [amoCRM](https://www.amocrm.ru) замокал в [файле (47 строка)](backend/src/Leads/leads.service.ts),
поэтому при запуске приложения будет получен фейковый JSON и этого достаточно.  
Однако, что бы посылать настоящие запросы, вам нужно зарегистрироваться в [amocrm](https://www.amocrm.ru),
вставить в [конфигурационный файл](backend/utils/constants.ts) ваши данные и раскомментировать
код `return new Api()` в [файле (47 строка)](backend/src/Leads/leads.service.ts).
---

#### Как запустить проект:
1. зайти в папку [backend](backend) и запустить:
```bash
pnpm install
```
2. зайти в папку [frontand](frontand) и запустить ту же команду:
```bash
pnpm install
```
3. в корневой директори репозитория выполнить 2 команды в разных терминалах (что бы запустить backend и frontend части приложения):
```bash
pnpm run start:f
```
```bash
pnpm run start:b
```
4. открыть в браузере [вкладку](http://localhost:8080/)


# Тестовое задание для JavaScript FullStack разработчика

# Тестовое задание

**Ожидаемый результат:** необходимо разработать API-приложение для доступа к сделкам и их контактам amoCRM (read-only), а также сделать небольшое *представление,* которое будет использовать данный API

## Backend

- Приложение необходимо сделать на платформе [NodeJS](https://nodejs.org/en/), с использованием NestJS (предпочтительно) или Express. **Typescript обязателен!**
- Разрабатываемому приложению будет достаточно одного GET-эндпоинта (например, `/api/leads`)
- Эндпоинт по-умолчанию отдаёт все сделки и прикреплённые к ним контакты, но при наличии GET-параметра `query` (от трёх символов) отдача должна производиться с учётом фильтрации

    <aside>
    💡 **Подсказка**
    Не нужно изобретать свои алгоритмы фильтрации, воспользуйтесь [имеющимися возможностями amoCRM](https://www.amocrm.ru/developers/content/crm_platform/api-reference)

    </aside>

- Разработанное API-приложение не подразумевает **собственной** авторизации/аутентификации, то есть backend должен возвращать ответ на любой "анонимный" запрос

## Frontend

- Vue 3, c обязательным использованием **Typescript**
- Желательно использовать UI-kit [Antd](https://www.antdv.com/) или любой другой
- HTML-рендер можно осуществлять как на сервере, так и на клиенте (полный или частичный, в любых "пропорциях")
- Главное - минимальный user-friendly интерфейс и чтобы ваше представление отображало всю необходимую информацию (как в примере). Одним словом, нужно "сделать красиво" ~~и поиграться со шрифтами~~, чувство прекрасного **очень приветствуется**, но сильно не переусердствуйте с дизайном хотя бы для экономии своего времени 😉

## Пример

Ознакомиться с примером работы можно [здесь](https://test-task.rocket.red) (работает 24/7, но это не точно)

## Подсказки

- Демо-аккаунт

  Для выполнения тестового задания необходим аккаунт в amoCRM, зарегистрировать демо-аккаунт можно [здесь](https://www.amocrm.ru/) (нажмите на кнопку "Пробная версия"), триал длится 14 дней, этого должно хватить 😉

    - Создание интеграции

  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/b5db5aaf-627a-4bcb-a49a-bcd42dd33b27/f45ab0ec-dbba-42e4-8579-cc8257601b13/Untitled.png)

- Упрощённая авторизация amoCRM (для запросов к API)

  Для существенной экономии времени, при разработке приложения используйте [упрощённый способ авторизации](https://www.amocrm.ru/developers/content/oauth/easy-auth)

- Фильтрация сущностей

  Для фильтрации сущностей, используйте GET-параметр `query`. Этот параметр необходимо слать на ваше API-приложение, которое, в свою очередь, аналогично будет использовать его в качестве параметра при формировании запроса к API amoCRM

  !https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6182b59c-e96c-4bb3-aeee-b8b279bcd324/Untitled.png

- Статусы сделок

  Чтобы узнать название воронки и статусов сделок, воспользуйтесь [данным методом](https://www.amocrm.ru/developers/content/crm_platform/leads_pipelines) API amoCRM

- Ответственные менеджеры

  Чтобы узнать имя ответственного менеджера, воспользуйтесь [данным методом](https://www.amocrm.ru/developers/content/crm_platform/users-api) API amoCRM


## Формат сдачи

Исходники можно поместить в любое, удобное для вас, хранилище:

1. GitHub
2. GitLab

## Материалы

1. [Документация для разработчиков amoCRM](https://amocrm.ru/developers/content/crm_platform/api-reference)
    - [Упрощённая авторизация](https://www.amocrm.ru/developers/content/oauth/easy-auth)
    - [Сделки](https://www.amocrm.ru/developers/content/crm_platform/leads-api)
    - [Контакты](https://www.amocrm.ru/developers/content/api/recommendations)
    - [Воронки и этапы](https://www.amocrm.ru/developers/content/crm_platform/leads_pipelines)
    - [Пользователи](https://www.amocrm.ru/developers/content/crm_platform/users-api)
