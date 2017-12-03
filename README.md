# Summary API Server
## Описание
Код к [видео урокам](https://www.youtube.com/playlist?list=PLagB2DCVvgKn5XYysf5FpLQBbswAuJUwd) по написанию приложения по поиску разработчиков на javascript. Api сервер.

## Основные библиотеки
* [Babel](https://babeljs.io/)
* [Koa](http://koajs.com/)
* [Koa-router](https://github.com/alexmingoia/koa-router)
* [Mongoose](https://github.com/Automattic/mongoose)

## Настройка
Перед запуском приложения нужно передать в него `MONGO_URI`.
Сдеалать это можно 3 способами.

Передав их при запуске приложения 
```sh
MONGO_URI=mongodb://localhost/my_database yarn dev 
```

Добавив в `./config/default.json`
```
"mongo": {
  "uri": "mongodb://localhost/my_database"
},
```
Или создать файл `.env`
```
MONGO_URI=mongodb://localhost/my_database
```

Для тестов можно создать отдельный файл настроек `./config/test.json` и передать в него `MONGO_URI` для тестирования 

## Использование
```sh
# Install dependencies
yarn install
```

```sh
# Run server
yarn start
```

```sh
# Run server with nodemon
yarn dev
```

```sh
# Run lint
yarn lint
```

```sh
# fix lint errors
yarn lint:fix
```

```sh
# test
yarn test
```
