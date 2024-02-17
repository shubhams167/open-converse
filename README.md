# OpenConverse

OpenConverse is an open-source [Next.js](https://nextjs.org/) based ChatGPT-like web app which runs LLMs locally on linux/MacOS using [Ollama](https://ollama.com).

## Getting Started with Docker

Download and install [Docker](https://docker.com) (skip if already installed)

Clone the repository

```bash
git clone https://github.com/shubhams167/open-converse.git
```

Go to `open-converse` directory

```bash
cd open-converse
```

Run docker compose to spin up services

```bash
docker compose up
```

The web app will be available at [localhost:5000](http://localhost:5000)

## Add LLM models

Add new models by appending `command` in `open-converse-ollama-setup` service of `docker-compose.yml`.

For instance, change from `command: /bin/bash -c "ollama pull llama2-uncensored:7b && ollama pull mistral"` to `command: /bin/bash -c "ollama pull llama2-uncensored:7b && ollama pull mistral && ollama pull llama2:7b"`

Go to `src/app/api/chat.ts` and change `model` property for the `ollama.chat` function.

## Development Guide

Download and install [Ollama](https://ollama.com)

Clone the repository

```bash
git clone https://github.com/shubhams167/open-converse.git
```

Go to `open-converse` directory

```bash
cd open-converse
```

Install all Next.js dependencies

```bash
npm ci
```

Start the server

```bash
npm run dev
```

Pull a model like `ollama pull llama2:7b` and make sure to update accordingly in `src/app/api/chat/route.ts`

The web app will be available at [localhost:3000](http://localhost:3000)
