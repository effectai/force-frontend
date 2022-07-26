![example workflow](https://github.com/effectai/force-frontend-new/actions/workflows/ci.yml/badge.svg)

# Force Frontend

# Production Deploy

Add remote: `git remote add prd git@github.com:effectai/force-frontend-prd.git`  
Switch to branch mainnet-config `git checkout mainnet-config`  
make sure to switch default remote for this branch to prd: `git push -u prd mainnet-config`  (you might have to do a `git pull prd mainnet-config` first)  
now whenever you push mainnet-config to the remote prd, it will be deployed to production. (for example, you want to deploy the latest change on main branch), you swith to mainnet-config `git checkout mainnet-config` , pull the changes from main origin (`git pull origin main`) and then a `git push`  (which will push to prd remote)  

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
