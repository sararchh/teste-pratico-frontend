# React + TypeScript + Vite

## Como rodar o servidor

Inicie o servidor `JSON.SERVE` com o seguinte comando:
```sh
yarn db:serve
```

## Como rodar em desenvolvimento

Inicie a aplicação em modo de desenvolvimento com o seguinte comando:
```sh
yarn dev
```

## Como rodar em produção

Para rodar a aplicação em produção, siga os seguintes passos:

1. Faça o build da aplicação:
    ```sh
    yarn build
    ```

2. Inicie a aplicação em modo de preview:
    ```sh
    yarn preview
    ```

## Variável de Ambiente

Você pode informar a variável de ambiente `VITE_API_URL` para definir a URL base da API. Caso não seja informada, o valor padrão será `http://localhost:3333`.