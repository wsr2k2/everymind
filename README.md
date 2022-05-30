## Api Everymind

Pequeno projeto realizado para a empresa Everymind.

Utilizado: 

* NodeJS
* NestJS
* TypeOrm
* PostgreSQL
* Docker
* Swagger
* JWT



------



Para testar essa aplicação, faça o clone do repositório em sua máquina (utilizei WSL2 em ambiente Windows 10), após o projeto ser baixado por completo, execute o comando no terminal: ``npm i`` e aguarde o término da instalação das dependências do projeto.



Ao final, execute o comando: ``npm run start:dev`` para rodas a aplicação.



Todas as rotas e requisições podem ser testadas utilizando clientes API, como por exemplo: Insomnia, PostMan, ApiRestfull, ThunderClient, entre outros. Escolha o que mais goste e realize os testes.



Podemos também, realizar os teste utilizando o Swagger, seguindo abaixo as orientações.



###### Obs.: Uma pequena introdução ao que foi necessário alterar para que o Swagger funcionasse como gostaríamos. (o comando de instalação, para esse projeto não há necessidade de executar, uma vez que já foi instalado com o comando ``npm i``, porém, caso aconteça algum erro, pode-se executar o comando afim de consertar o problema)



Para realizar os testes de nossa aplicação iremos utilizar o Swagger, para instalar vamos utilizar o seguinte comando no terminal: 

 ``npm install --save @nestjs/swagger swagger-ui-express``



Após a instalação precisamos fazer algumas alterações no projeto:

Precisamos alterar o arquivo ``main.ts`` para que o Swagger possa rodar normalmente, então o arquivo ficará assim:

```javascript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('Everymind - Api Users') //nome do projeto
  .setDescription('Api para cadastro e login de usuários para teste da Everymind')//descrição para o projeto
  .setVersion('1.0') //versão do projeto
  .addBearerAuth() //método para poder utilizar o token recebido no login
  .addTag('Users')//tag usada para separar as rotas de USERS
  .addTag('Auth')//tag usada para seprar as rotas de AUTH
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('home', app, document);//caminho da página inicial ficando localhost:3000/home

  await app.listen(3000);
}
bootstrap();
```

Para poder criar um modelo do que a aplicação espera que o usuário coloque nos campos permitidos, iremos utilizar um decorator do Swagger no arquivo ``create-user.dto.ts`` dentro da pasta users/dto, chamado ``@ApiProperty()`` , utilizamos outros decorators do ``class-validator`` afim de deixar nossa aplicação mais segura, pois, não serão permitidos cadastros que não atendas as necessidades conforme cada decorator (exemplo: campos em branco não são permitidos, máximo ou mínimo de caracteres, senha com itens obrigatórios, tipo de dados esperado, entre outros), com o qual os campos com esse decorator irão aparecer na tela do Swagger e podemos ir mais além, adicionando mensagens e modelos pré preenchidos do que espera a aplicação conforme abaixo:

```javascript
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @ApiProperty({example: 'User name'})//exemplo do que preencher
  @IsNotEmpty({message: 'The name must be informed'})
  @MaxLength(200, {message: 'Name must be less than 200 characters',})
  @IsString()
  name: string;
  
  @ApiProperty({example: 'email@email.com'})//exemplo do que preencher
  @IsNotEmpty({message: 'Email cannot be empty'})
  @IsEmail({message: 'Use an valid email'})
  @MaxLength(200, {message: 'Email address must be less than 200 characters',})
  @IsString()
  email: string;

  @ApiProperty({example: '11912345678'})//exemplo do que preencher
  @IsNotEmpty({message: 'Phone number cannot be empty'})
  @IsPhoneNumber("BR")
  @MinLength(11)
  @IsString()
  phone: string;

  @ApiProperty({example: 'Street name'})//exemplo do que preencher
  @IsNotEmpty({message: 'The street must be informed'})
  @MaxLength(200, {message: 'Street must be less than 200 characters',})
  @IsString()
  street: string;

  @ApiProperty({example: '123'})//exemplo do que preencher
  @IsNotEmpty({message: 'The number must be informed'})
  @MaxLength(7, {message: 'Number must be less than 7 characters'})
  @IsNumberString()
  number: string;

  @ApiProperty({example: 'Complement description'})//exemplo do que preencher
  @IsNotEmpty({message: 'The Complement must be informed'})
  @MaxLength(200, {message: 'Complement must be less than 200 characters',})
  @IsString()
  complement: string;

  @ApiProperty({example: 'District name'})//exemplo do que preencher
  @IsNotEmpty({message: 'The District must be informed'})
  @MaxLength(200, {message: 'District must be less than 200 characters',})
  @IsString()
  district: string;

  @ApiProperty({example: 'City name'})//exemplo do que preencher
  @IsNotEmpty({message: 'The City must be informed'})
  @MaxLength(200, {message: 'City must be less than 200 characters',})
  @IsString()
  city: string;

  @ApiProperty({example: 'State name'})//exemplo do que preencher
  @IsNotEmpty({message: 'The State must be informed'})
  @MaxLength(200, {message: 'State must be less than 200 characters',})
  @IsString()
  state: string;

  @ApiProperty({example: 'Password123#'})//exemplo do que preencher
  @IsNotEmpty({ message: 'Password number cannot be empty'})
  @MinLength(6,{message: 'Password must be between 6 and 64 characters long',})
  @MaxLength(60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=]).*$/, {
  message:'Password must be 1 special character and uppercase and lowercase letter',})
  @IsString()
  password: string;

  @ApiProperty({example: 'Password123#'})//exemplo do que preencher
  @IsNotEmpty({message: 'Password number cannot be empty'})
  @MinLength(6)
  @MaxLength(60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=]).*$/, {
  message: 'Password confirmation must be the same as password',})
  @IsString()
  passwordConfirmation: string;
}
```

Ao abrir o Swagger será mostrado assim:

FOTO SW 3



No arquivo ``users.controller.ts`` iremos colocar o decorator ``@ApiTags('Users')`` logo acima do ``@Controller`` assim quando rodar a aplicação, o Swagger irá separar uma aba com todas as rotas de Users. Faremos também essa alteração no arquivo ``auth.controller.ts`` colocando o decorator ``@ApiTags('Auth')`` ficando todas as rotas dentro dessa aba.



Agora iremos mostrar como realizar todas as requisições na aplicação:



* Rodar a aplicação com o comando: ``npm run start:dev``
* Abrir o navegador e acessar o endereço: ``localhost:3000/home``

Ao acessar, será exibida essa tela:



FOTO SW 1



Agora iremos cadastrar um novo usuário, clicando em irá abrir essa tela:



FOTO SW 2



Agora clicar em ``try it out`` e inserir os dados de usuário para cadastrar:

Exemplo:

FOTO CADASTRO DE USUARIO



Se todas as informações estiverem corretas, ao clicar em ``Execute`` o usuário será salvo no banco de dados.

FOTO RETORNO DE CADASTRO



Agora podemos realizar o ``login`` com as informações do usuário cadastrado:

Clicar em ``auth/signin`` logo em seguida em ``Try it out`` e irá mostrar uma tela assim:

FOTO LOGIN



Insira os dados de login conforme solicita e clique em ``Execute``

No retorno será exibido o token para o usuário, copie esse token para poder acessar a rota de ``logged`` a seguir:

FOTO TOKEN



Agora para acessar as informações desse usuário e conferir se todas as informações que foram passadas estão salvas corretamente, clicar em ``auth/logged`` logo em seguida em ``Try it out`` , sendo mostrado essa tela:

FOTO LOGGED

Agora clique em ``execute`` e .... deu erro!

FOTO NÃO AUTORIZADO

Como essa rota está protegida, você precisa adicionar o token gerado no ``signin`` para poder acessar os dados cadastrados.



Então no topo da página, canto direito, clique em ``Authorize`` e no campo ``Value`` insira o token copiado previamente e clique em ``Authorize e depois em close``. Agora podemos novamente realizar a requisição no ``auth/logged`` e veremos que nessa chamada irá correr tudo ok!



FOTO LOGGED



Retornando os dados do usuário logado, podendo confirmar que os dados foram salvos com exatidão.



Com isso finalizamos os testes dessa aplicação.



