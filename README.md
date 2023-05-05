# Svelte-Chatbot

A re-write of [chatbot-ui-lite](https://github.com/mckaywrigley/chatbot-ui-lite/blob/main/README.md) in Svelte.js. It also uses [window.ai](https://github.com/alexanderatallah/window.ai) to handle the openAI api key, which also means you can connect local models (alpaca, etc).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
