# Production Guide for DevOps
Guide for setting up and testing infrastructure.

## Database
### DO
Create MySQL8 database in DO. Choose location: Amsterdam.

### IP
Whitelist developer ip's and production domain.

### Application User
Create a user: `strapi` and use `Legacy – MySQL 5.x` password encryption.

### Check with PHPMyAdmin
```sh
HOST=host
PORT=port

docker run \
  --name myadmin \
  -e PMA_HOST=$HOST \
  -e PMA_PORT=$PORT \
  -p 8090:80 \
  phpmyadmin
```
### Login to PHPmyadmin
Go to https://localhost:8090
```sh
server: 
user: doadmin
password: yourpass
```

## Test docker image

## Delete potential previous image & container
```
docker rm -f app-strapi-c && docker rmi -f app-strapi
```

## Test prod
Create `.env.prod` and use the production database settings.
Make sure your ip is whitelisted.


## Builds
```
docker build -t app-strapi .
```

```
docker run -p 8080:8080 --name app-strapi-c --env-file ./.env.prod app-strapi
```