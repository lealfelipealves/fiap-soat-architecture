<p align="center">
  <img src="https://github.com/user-attachments/assets/5016809a-9f26-4624-b1ce-1fc191482fb9" width="420" alt="Fiap + Alura" />
</p>

<p align="center">Software Architecture Tech Challenge - Fase 1</p>

## 📄 Descrição

Este projeto é parte do **Software Architecture Tech Challenge - Fase 1**. Ele engloba o desenvolvimento de uma aplicação backend monolítica utilizando **NestJS** e seguindo boas práticas de **DDD (Domain-Driven Design)**, **Arquitetura Hexagonal** e **Docker** para uma implementação robusta e escalável.

## 🚀 Instruções para Instalação

Clone o repositorio para seu ambiente

```bash
$ git clone git@github.com:lealfelipealves/fiap-soat-architecture.git
```

Acesse o repositorio

```bash
$ cd fiap-soat-architecture/
```

Copie o arquivo .env.example para .env

```bash
$ cp .env.example .env
```

Subir o ambiente completo:

```bash
$ docker-compose up -d
```

Aplicar migrações do Prisma na base de dados:

```bash
$ npx prisma migrate deploy
```

Popular a base com dados iniciais (Seed):

```bash
$ npx prisma db seed
```

[Link para acessar o swagger: localhost:3333/docs](http://localhost:3333/docs)

## ▶️ Executar o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🧪 Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### 🛠 Tecnologias Utilizadas

- Node.js
- NestJS
- Prisma ORM
- Docker e Docker Compose
- PostgreSQL
- Swagger (Documentação de APIs)

### 🌐 Recursos Adicionais

- Documentação do NestJS
- Prisma ORM
- Docker Documentation

## Entregáveis FASE 1:

<ol type="1">
  <li>
    Documentação do sistema (DDD) com Event Storming, incluindo todos os
    passos/tipos de diagrama mostrados na aula 6 do módulo de DDD, e utilizando
    a linguagem ubíqua, dos seguintes fluxos:
    <ol type="a">
      <li>Realização do pedido e pagamento;</li>
      <li>Preparação e entrega do pedido.</li>
    </ol>
    É importante que os desenhos sigam os padrões utilizados na explicação.
  </li>
  <li>
    <p>
      Uma aplicação para todo o sistema de backend (monolito) que deverá ser
      desenvolvido seguindo os padrões apresentados nas aulas:
    </p>
    <ol>
      <li>Utilizando arquitetura hexagonal</li>
      <li>
        APIs:
        <ol>
          <li>Cadastro do Cliente;</li>
          <li>Identificação do Cliente via CPF;</li>
          <li>Criar, editar e remover produtos;</li>
          <li>Buscar produtos por categoria;</li>
          <li>
            Fake checkout, apenas enviar os produtos escolhidos para a fila. O
            checkout é a finalização do pedido;
          </li>
          <li>Listar os pedidos.</li>
        </ol>
        <p>Disponibilizar também o Swagger para consumo dessas APIs</p>
      </li>
      <li>
        <p>Banco de dados à sua escolha</p>
        <ol>
          <li>
            Inicialmente deveremos trabalhar e organizar a fila dos pedidos
            apenas em banco de dados
          </li>
        </ol>
      </li>
    </ol>
  </li>
  <li>
    A aplicação deve ser entregue com um Dockerfile configurado para executá-la
    corretamente, e um docker-compose.yml para subir o ambiente completo. É
    muito importante seguir boas práticas de segurança e melhorias para que a
    inicialização seja feita de forma rápida.
  </li>
  <li>
    <p>Para validação da POC, temos a seguinte limitação de infraestrutura:</p>
    <ol>
      <li>1 instância para banco de dados;</li>
      <li>1 instâncias para executar aplicação;</li>
      <li>Obrigatório utilizar no mínimo um Dockerfile.</li>
    </ol>
  </li>
  <li>
    Link para vídeo demonstrando a arquitetura desenvolvida localmente.
    <ol>
      <li>
        O vídeo deve ser postado no Youtube, Vimeo ou compartilhado via Google
        Drive/One Drive.
      </li>
      <li>Não esqueça de deixá-lo público ou não listado.</li>
      <li>
        O vídeo de demonstração sobre a execução da aplicação e banco através do
        Docker Compose, deve conter informações relevantes sobre o projeto e
        quais passos são necessários para que a aplicação funcione.
      </li>
    </ol>
  </li>
</ol>

## 📊 Diagrama:

![ddd](https://github.com/user-attachments/assets/1b5ee2fe-113a-44c2-a68a-c904e79b5f02)

### Autor

---

<a href="https://github.com/lealfelipealves">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/17007124?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Felipe Leal</b></sub></a> <a href="https://github.com/lealfelipealves" title="Felipe Leal Profile">🚀</a>

Feito por Felipe Leal 👋🏽

[![Gmail Badge](https://img.shields.io/badge/-contato@felipeleal.eng.br-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:contato@felipeleal.eng.br)](mailto:contato@felipeleal.eng.br)
