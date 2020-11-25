# MeetingFy - Client

Cliente para sistema MeetingFy. Disponível em: https://meetingfy.netlify.app/

## Como Utilizar localmente
- Clone este repositório:

```git clone git@github.com:NickNish09/MeetingfyFront.git```

- Entre na pasta dele:

```cd MeetingfyFront```

- Execute o yarn install para instalar dependências:

```yarn install```

- Rode o yarn start:

```yarn start```

o site deve abrir em http://localhost:3000/ (ou http://localhost:3001/ caso o servidor da API esteja
rodando já). Por padrão este projeto está buscando dados da API de produção (https://meetingfy-api.herokuapp.com/v1)
. Caso queira trocar para API de desenvolvimento, basta trocar na linha 7 do arquivo
src/services/api.js a variável baseURL para dev_url:

export const baseURL = dev_url;

## Features e Breve Descrição
As features são as mesmas descritas no repositório da API (https://github.com/NickNish09/MeetingfyApi).

Como usuário autenticado, é possível criar salas, editar salas, deletar salas, ver 
uma sala específica e marcar reuniões nela através de um calendário.

Há uma tela de Login/Cadastro para realizar a autenticação no sistema. Ressalta-se que existe um **usuário padrão**
com acesso ao sistema já com email e senha colocados no formulário de login, para facilitar os testes.

**Usuário Padrão: email: user@test.com // senha: 123456**
## Tecnologias Utilizadas
- **React** 17.0.1
- **Axios** para requisições
- **React-Big-Calendar** para View de calendário
- **AntDesign** para componentes de User Interface (UI)
- **Sass** para estilizações
- **Netlify** para hospedagem 
