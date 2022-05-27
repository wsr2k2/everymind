Para iniciar a aplicação, precisamos instalar o NestJS com o seguinte comando no terminal:
npm i -g @nestjs/cli

após a instalação da CLI do NestJS, podemos criar nosso projeto com o comando:

nest new nomeDoProjeto (aqui o nome será everymind)

Agora acessamos a pasta do projeto:
cd everymind

Após a criação do projeto, iremos ter uma estrutura parecida com essa:

IMAGEM ESTRUTURA DO PROJETO

Podemos excluir os arquivos: app.controller.spec.ts , app.controlle.ts , app.service.ts e excluir a paste test inteira , pois, esses arquivos não serão utilizado em nossa aplicação.
Obs.: lembre-se se remover os imports no arquivo app.modules.ts

Agora vamos configurar o Postgresql com o Docker

criando o arquivo docker-compose.yml na raiz do projeto

Após criar o arquivo, temos que rodas o comando docker-compose up -d para subir o nosso container

agora vamos conectar com banco de dados utilizando o TypeORM
npm i --save typeorm @nestjs/typeorm pg

Agora dentro da src iremos criar uma pasta configs e dentro dela um arquivo typeorm.config.ts onde ficarão as configurações do nosso banco de dados
aqui nosso banco de dados terá o nome de everymind

agora temos que importar as configurações no app.modules ficando assim:


Agora vamos rodar nossa aplicação para ver se está tudo ok:
npm run start:dev

Agora iremos criar o modulo de usuários para criação do primeiro endpoint, para tanto, usaremos o comando:

nest g module users

Dentro da pasta users, vamos criar um arquivo com as informações que nosso usuário irá receber ao cadastrar, usando como base para o TypeORM gerar a tabela no banco de dados.


Ficando como na imagem.

Agora vamos rodar novamente nossa aplicação para criar a tabela no banco de dados.
npm run start:dev

Abrindo o adminer, teremos a tabela de users como abaixo:

Criamos agora nosso repositório, na pasta users crie um arquivo com o nome: users.repository.ts

ficando assim:

Precisamos agora adicionar nosso repositório no user.modules.ts ficando assim:


Agora podemos criar nossa camada de serviço do módulo com o comando: nest g service users --no-spec (assim não criando os arquivos de testes *--no-spec) e automaticamente adiciona o arquivo no user.module.ts

Agora vamos criar uma pasta em users chamada DTOS e dentro dessa pasta o arquivo create-user.dto.ts

ficando assim:

Após as alterações o nosso user.repository.ts ficará assim:

Agora vamos chamar esse método no service para a criação do usuário


Por último vamos criar a rota que irá realizar o processo, criamos o user.controller com o comando
nest g controller users --no-spec

Vamos criar um dto para retornar o usuário criado;

Dentro de DTOS criar um novo arquivo com o nome: return-user.dto.ts