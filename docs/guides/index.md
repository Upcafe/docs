# Guides
Upcafe's guides for setting up complete projects.

## Vite + Vue
Guide for setting up a Vite Vue3 frontend.
- Node 14.x
- VueNext
- Yarn 1.22.x
- React Snap

### Setup
This guide will walk you through creating a Vite project from scratch.

Go to the directory where you want to create to repository and
run the following commands.

```sh
yarn create @vitejs/app

# Add store
yarn add vuex@4

# Add router
yarn add vue-router@4

# Add react-snap for prerendering HTML.
yarn add --dev react-snap
```

#### Add postbuild
```json
// package.json

"scripts": {
  "postbuild": "react-snap"
},
"reactSnap": {
  "source": "dist",
  "minifyHtml": {
    "collapseWhitespace": false,
    "removeComments": false
  }
}
```

#### Resolve @ as alias to src

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  }
})
```

#### Set volar
Install Volar from VSCode Extensions and 
run `Volar: Switch TS Plugin on/off` from VSCode command palette.

#### Use Environment Variables
Vite exposes env variables on the special import.meta.env object. Some built-in variables are available in all cases:
<br/>

To prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_` are exposed to your Vite-processed code. e.g. the following file:
<br/>

[docs](https://vitejs.dev/guide/env-and-mode.html#env-files)

## Strapi
Guide for setting up a Strapi backend.
- Node 14.x
- Yarn 1.22.x
- Docker
- MySQL 8
- PHPMyAdmin

### Project Guide
This guide will walk you through creating a Strapi backend from scratch.
This documentation uses the official [Strapi Docs](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html).

```sh
yarn create strapi-app my-project --quickstart
```

#### Docker Compose

```yml
version: '1'

services:

  db:
    image: mysql:8.0.17
    environment:
      MYSQL_ROOT_PASSWORD: somestrapi
      MYSQL_DATABASE: strapi
      MYSQL_USER: strapi
      MYSQL_PASSWORD: strapi
    ports:
      - "3306:3306"

  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8081:80
    environment:
      PMA_HOST: db
      PMA_PORT: 3306
      PMA_ARBITRARY: 1
    links:
      - db
    volumes:
      - my-datavolume:/var/lib/mysql

volumes:
  my-datavolume:
```

#### Creating an environment
Create a new file `.env.example`

```sh
ADMIN_JWT_SECRET=
STRAPI_HOST=
STRAPI_PORT=

CLIENT=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
```

### Getting Started
Guide on how to run the strapi app.

#### Run the containers
```sh
docker login
docker compose up
```

Navigate to PHPMyAdmin [http://localhost:8081](http://localhost:8081) and login with the following credentials:
```
server: 
username:   root
password:   somestrapi
```

If all is well, you should see a functional PHPMyAdmin UI. 

#### Supporting NativeSQL Passwords.
Next, we must replace `Caching SHA-2 Pluggable Authentication`. This is a newer feature from MySQL that isn't widely supported yet.

Use `docker ps` to find the id of the mysql container and login to the container.

Note: use `//bin//bash` for windows.

```sh
docker exec -it {containerId} /bin/bash
```

Next login to MySQL as root
```sh
mysql --user=root --password=somestrapi
```

Then run the following sql to replace the password.
```sql
ALTER USER  'strapi'@'%' IDENTIFIED WITH mysql_native_password BY 'strapi';
```

Allright, now run `exit` twice to return to your terminal.

#### Run the app
Next, we should configure Strapi to use the development database.
Copy and paste `.env.example` and rename it to 
```
.env
```

Use the following values
```sh
ADMIN_JWT_SECRET=secret
STRAPI_HOST=0.0.0.0
STRAPI_PORT=1337

CLIENT=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
```

Now we can run Strapi.
```
yarn install
yarn develop
```

[docs](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#login)


## Wordpress
This is Upcafe's documentation to create a local environment for a Wordpress website.
This environment should <ins>not</ins> to be used in production.

### Tools
- Docker
- MySQL
- PHPMyAdmin
- Wordpress

### Getting Started

#### Step 1
Create a `docker-compose.yml` with the following content.

```yml
version: '1'

services:

  db:
    image: mysql:8.0.17
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    ports:
      - "3306:3306"
      
  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8081:80
    environment:
      PMA_HOST: db
      PMA_PORT: 3306
      PMA_ARBITRARY: 1
    links:
      - db
    volumes:
      - my-datavolume:/var/lib/mysql

volumes:
  my-datavolume:
```

If all is well, you should be able to login to PHPMyadmin on `localhost:8081` with the following credentials:
```
server: 
username:   root
password:   somewordpress
```

#### Step 2
Next, we must replace `Caching SHA-2 Pluggable Authentication`. This is a newer feature from MySQL that Wordpress
doesn't support yet.

Login to the db container
```sh
docker exec -it {containerId} /bin/bash/
```

Login to MySQL as root
```sh
mysql --user=root --password=somewordpress
```

Then run
```sql
ALTER USER 'wordpress'@'%' IDENTIFIED WITH mysql_native_password BY 'wordpress';
```

Allright, now run `exit` twice to return to your terminal.


#### Step 3
Now it's finally time to config our Wordpress server with our database. 