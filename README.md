# Effect Force Frontend

## Local Development

### Setup

1. Clone the repo
`git clone git@github.com:effectai/force-frontend.git`

2. [Install bun](https://bun.sh/docs/installation)

3. Install dependencies 
`bun install`

4. Run
`bun dev`

### Link SDK

In order to develop efficiently, it's recommended to locally build the SDK and link it using before proceeding.

1. Clone The [SDK](https://github.com/effectai/effect-js)

2. Install dependencies 
`bun install`

3. Build the SDK
`bun build`
or
`bun dev`

4. Create a link
`bun link`

5. Navigate back to the frontend folder:
`cd force-frontend && bun link @effectai/effect-js`
 