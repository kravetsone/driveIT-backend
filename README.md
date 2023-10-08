# driveIT-backend

![image](https://github.com/kravetsone/driveIT-backend/assets/57632712/509339eb-d97c-4a70-b91d-d2a6c67fc554)

Это бекенд для веб-платформы ЦОДД которая занимается стандартизацией данных со внутренних сервисных API в формат GTFS и GTFS-RT с последующей отдачи на фронтенд для визуализации и аналитики 
данных о возникающих внештатных ситуациях и телеметрии речных судов.

Бекенд включает в себя REST API и WEBSOCKET API. Он получает, как только информация о сущностях обновилась от микросервиса, занимающимся очисткой и стандартизацией, и хранит у себя. Далее эти сущности можно удобно получить через REST API.
Касательно WEBSOCKET API этот бекенд получает данные от микросервиса «эмуляции» телеметрии и переводит их в формат GTFS-RT (стандартизированный протобаф) с последующей отдачей по WebSocket на клиент.

### Стек

- [NodeJS](https://nodejs.org/ru) - JS runtime
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [PostgreSQL](https://www.postgresql.org/) - DataBase
- [Prisma](https://prisma.io) - ORM
- [Caddy](https://caddyserver.com/) - ReverseProxy
- [Fastify](https://fastify.dev/) - Web framework

![image](https://github.com/kravetsone/driveIT-backend/assets/57632712/2decb64b-75d8-457a-90d7-9ccb28154432)
