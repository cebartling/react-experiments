# Hasura GraphQL backend

## Installation

### Hasura Engine and PostgreSQL

Followed the [directions](https://docs.hasura.io/1.0/graphql/manual/getting-started/docker-simple.html#step-1-get-the-docker-compose-file) to obtain the Hasura Engine and PostgreSQL as Docker containers by using docker-compose.

### Hasura CLI

Followed the [directions](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html#install-hasura-cli) to install the CLI...

```bash
sudo curl -L https://github.com/hasura/graphql-engine/raw/master/cli/get.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   139  100   139    0     0    301      0 --:--:-- --:--:-- --:--:--   300
100  3476  100  3476    0     0   4334      0 --:--:-- --:--:-- --:--:--  4334
--> Getting latest version...
--> Latest version is v1.0.0-beta.2
--> Downloading hasura for linux-amd64 to /tmp/cli-hasura-linux-amd64
######################################################################## 100.0%
--> Download complete!
--> 
--> Path '/usr/local/bin' requires root access to write.
--> This script will attempt to execute the move command with sudo.
--> Are you ok with that? (y/N)
--> 
--> Moving cli from /tmp/cli-hasura-linux-amd64 to /usr/local/bin
--> 
--> hasura cli installed to /usr/local/bin
--> 
INFO Help us improve Hasura! The cli collects anonymized usage stats which
allow us to keep improving Hasura at warp speed. To opt-out or read more,
visit https://docs.hasura.io/1.0/graphql/manual/guides/telemetry.html
 
INFO hasura cli is up to date                      version=1.0.0-beta.2
INFO hasura cli                                    version=v1.0.0-beta.2
```


## Running Hasura

Being that Hasura is distributed as a _docker-compose YAML file_, running it is pretty simple: `docker-compose up -d`. Note that you do have to have a rather recent version of docker-compose installed
to get this to work. If you need to install or upgrade docker-compose, go [here](https://docs.docker.com/compose/overview/) for more information.

This technique worked out of the box for my MacBook Pro system, but my Ubuntu system has some minor issues with the default `docker-compose.yaml` file that Hasura is distributing...

```bash
hasura-backend_postgres_1 is up-to-date
Recreating hasura-backend_graphql-engine_1 ... error

ERROR: for hasura-backend_graphql-engine_1  Cannot start service graphql-engine: driver failed programming external connectivity on endpoint hasura-backend_graphql-engine_1 (e2ae180732480bf59ffbd8848895528a1408e4087bedcfc8936b9e1eaaffeb1c): Error starting userland proxy: listen tcp 0.0.0.0:8080: bind: address already in use

ERROR: for graphql-engine  Cannot start service graphql-engine: driver failed programming external connectivity on endpoint hasura-backend_graphql-engine_1 (e2ae180732480bf59ffbd8848895528a1408e4087bedcfc8936b9e1eaaffeb1c): Error starting userland proxy: listen tcp 0.0.0.0:8080: bind: address already in use
ERROR: Encountered errors while bringing up the project.
```

I ended up setting the port forwarding to port 18080 on my Ubuntu system and everything works fine now...

```yaml
  graphql-engine:
    image: hasura/graphql-engine:v1.0.0-beta.2
    ports:
    - "18080:8080"
```

