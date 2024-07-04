# Effect Force Frontend

## Local Development

### Setup

1. Clone the repo
`git clone git@github.com:effectai/force-frontend.git`

2. [Install bun](https://bun.sh/docs/installation)

3. Install dependencies
```bash
bun install
```
4. Run in dev mode
```bash
bun dev
```

### Docker

It's also possible to run the frontend using Docker.
1. Make sure you have Docker and Docker Compose installed on your system.
2. `git clone git@github.com:effectai/force-frontend.git`
3. `docker compose up --build`

#### `docker compose up --build`

- `--build`: Forces the image to be rebuilt.
This command will:
- Build the Docker image as defined in the Dockerfile.
- Create and start the containers as defined in the `docker-compose.yml` file.


### Add Local Version of Effect SDK

1. Clone the GitHub repository: https://github.com/effectai/effect-js/
2. Install & build SDK: ```bun install && bun sdk:build```
3. Run inside the SDK (`src`) folder:

```bash 
cd src
bun run link
```

4. Navigate back to frontend folder:

```bash 
bun link @effectai/sdk
```

Running the SDK with `bun dev` will automatically build & reload whenever a change occurs. 

Note: if you've ran the frontend before without linking, it's important to clear the cache inside of the `node_modules/` & `.nuxt/` folders.

