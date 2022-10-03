![example workflow](https://github.com/effectai/force-frontend-new/actions/workflows/ci.yml/badge.svg)

# Force Frontend

# Production Deploy
The [mainnet](https://app.effect.network) and [testnet](https://testnet.effect.network) version of the Force are on two different repo's.

```bash

# Add remote, if you haven't added it already!
git remote add prd git@github.com:effectai/force-frontend-prd.git

# Fetch remote info
git fetch

# Switch to branch prd/deploy
git switch deploy

# Merge changes from your branch
git merge <your-branch>

# Push deploy to prd
git push

# Go to Github and make a Pull Request from deploy to mainnet-config
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
## Add Local Version of Effect SDK
1. Clone the Github repository: https://github.com/effectai/effect-js/
2. Install & build SDK: ```npm i && npm run build```
3. Link effect-js to local install:
```
npm link /path/to/effect-js/
```

When you make changes to the SDK you should run `npm run build:cjs` in that,
after which the force frontend will automatically reload the changes.

# Node version V.16
