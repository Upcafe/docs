# Strapi

## Build Info
Tooling:
- VSCode

Frameworks:
- VueNext
- Yarn
- React Snapv

### Scaffold Script:
```sh
yarn create @vitejs/app
```

### Add store
```sh
yarn add vuex@4
```

### Add router
```sh
yarn add vue-router@4
```

### Add GoTrue
```sh
yarn add gotrue-js
```

### Prerendering
Add [React Snap](https://github.com/stereobooster/react-snap) for prerendering HTML.

```sh
yarn add --dev react-snap
```

```json
// package.json

"scripts": {
  "postbuild": "react-snap"
},
"reactSnap": {
  "source": "dist",
  "minifyHtml": {
    "collapseWhitespace": false,
    "removeComments": false
  }
}
```

### Resolve @ as alias to src

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  }
})
```

### Use Environment Variables
Vite exposes env variables on the special import.meta.env object. Some built-in variables are available in all cases:
<br/>
To prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_` are exposed to your Vite-processed code. e.g. the following file:

<br/>
docs: https://vitejs.dev/guide/env-and-mode.html#env-files


## Getting Started

### Set volar
Install Volar from VSCode Extensions and 
run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### Run with Yarn
Install Yarn if you haven't already
```sh
yarn global add @vue/cli
```

Install dependencies
```sh
yarn install
```

Serve
```sh
yarn dev
```

### useful docs
https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#login

 