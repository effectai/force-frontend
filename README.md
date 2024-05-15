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

### Add Local Version of Effect SDK

1. Clone the GitHub repository: https://github.com/effectai/effect-js/
2. Install & build SDK: ```bun install && bun build```
3. Run inside the SDK folder:

```bash 
bun run link
```

4. Navigate back to frontend folder:

```bash 
bun link @effectai/sdk
```

Running the sdk with `bun dev` will automatically build & reload whenever a change occurs. 

Note: if you've ran the frontend before without linking, it's important to clear the cache inside of the node_modules & .nuxt folders.