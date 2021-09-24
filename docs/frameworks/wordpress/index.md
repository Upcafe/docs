# Wordpress
This is Upcafe's documentation to create a local environment for a Wordpress website.
This environment should <ins>not</ins> to be used in production.


## Tools
- Docker
- MySQL
- PHPMyAdmin
- Wordpress

## Getting Started

### Step 1
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

### Step 2
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


### Step 3
Now it's finally time to config our Wordpress server with our database. 