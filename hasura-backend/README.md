# Hasura GraphQL backend

## Installation

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
