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
HOST=app-marcel-nijland-db-mysql-do-user-9742335-0.b.db.ondigitalocean.com
PORT=25060

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

### Run in strapi db
```sql
SET SQL_REQUIRE_PRIMARY_KEY = false;
SET @ORIG_SQL_REQUIRE_PRIMARY_KEY = @@SQL_REQUIRE_PRIMARY_KEY;
SET GLOBAL sql_require_primary_key = 0;

SELECT /*+ SET_VAR(sql_require_primary_key = 0)

```


## Test docker image
asdfasd