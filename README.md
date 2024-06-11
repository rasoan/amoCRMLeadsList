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
