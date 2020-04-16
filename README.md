<h1 align="center">
  <img alt="FastFeet" title="FastFeet" src="./server/.github/logo.png" width="300px">
</h1>

<p align="center">
  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361" />
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361" />  

  <p align="center">
    <a href="#about">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#backend">Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#frontend">Frontend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#mobile">Mobile</a>
  </p>
</p>

<img src="./.gihub/front1.png">
</br>

<img src="./.gihub/front2.png">
</br>

<img src="./.gihub/front3.png">
</br>

<img src="./.gihub/mobile1.png">
</br>

<img src="./.gihub/mobile2.png">
</br>

<img src="./.gihub/mobile3.png">
</br>

## :rocket: Sobre o desafio

Este projeto é um serviço de gestão de acompanhamento de encomendas de uma transportadora fictícia FastFeet.

Neste projeto está contida uma aplicação completa envolvendo backend, frontend e mobile. Tudo foi construído com as tecnlologias mais populares de JavaScript.

No backend, em **Node.js**, é uma **API REST** com o intuito de distribuir os dados para as plataformas tanto **WEB** como **MOBILE**, onde também vem integrado o **Sentry** para o monitoriamento dos erros.

No frontend, em **ReactJS**, é onde o administrador pode cadastrar os entregadores, destinatários e as encomendas, podendo assim fazer a gestão das desses mesmos.

No Mobile, **React Native***, é para o entregador visualizar as encomendas e trabalhar nelas, podendo assim filtrar as encomendas (entregues ou pendentes), vizualizar os problemas que ocorreram e cadastrar os mesmos e confimar a entrega enviando uma fota da assinatura.

## 🧰 Ferramentas utilizadas

- :whale: **Docker** - É um software contêiner que fornece uma camada de abstração e automação para virtualização de sistema operacional

Foi utilizado o docker para a criação do banco de dados.

  Criar e startar a base de dados **POSTGRES**:

    docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres

    docker start fastfeet

  Criar e startar a base de dados **REDIS**:

    docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine

    docker start redisfastfeet

- ⚛️ **ReactJs** - Biblioteca Javascript para criar interfaces de usuário.
- ⚛️ **React Native** - Framework para criar apps nativos usando React.
- 💅 **Styled Components** - Biblioteca Javascript pra estilizar componentes.
- 🔁 **Redux** - Biblioteca JavaScript de código aberto para gerenciar o estado do aplicativo.
- 🔂 **Redux Saga** - Biblioteca Javascript que torna os efeitos colaterais do aplicativo mais faceis de gerenciar.
- 📛 **Sentry** - Plataforma para monitoramento de erros e notificação em tempo real.
- 📷 **React-Native-Camera** - Biblioteca React Native para manusear a camera dentro do app mobile. 




## :package: Começando

 ``git clone https://github.com/ricardobron/FastFeet.git``

 ``cd fasfeet``

## :package: Backend

1. ``cd backend``
2. ``yarn``
3. ``Criar o arquivo .env com base no .env.example``
4. ``yarn sequelize db:migrate``
5. ``yarn sequelize db:seed:all`` (
6. ``yarn dev``

Existe um usuário administrador padrão gerado através do seed: admin@fastfeet.com / 123456

## 💻 Frontend

1. ``cd frontend``
2. ``yarn``
3. ``yarn start``

## 📱Mobile Apenas testado em Android)

1. ``cd mobile``
2. ``yarn``
3. ``adb reverse tcp:9090 tcp:9090 (Reactotron)``
4. ``adb reverse tcp:3333 tcp:3333``
5. ``react-native start``
6. ``react-native run-android``

PS: Não inclui os commits devido à estrutura dos repos não devidamente antecipada. :grin:
