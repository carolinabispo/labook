Api labook
Este repositório contém a lógica de negócios para gerenciar operações relacionadas a usuários, como criação de usuário, login, recuperação, atualização e exclusão.

Recursos
1. Cadastro
Endpoint: /signup
Cria um novo usuário com um ID único, nome, email e senha hash.
Gera um token JWT para o usuário recém-criado.
2. Login
Endpoint: /login
Valida as credenciais do usuário (email e senha).
Gera um token JWT para o usuário autenticado.
3. Obter Usuários
Endpoint: /getUsers
Recupera uma lista de usuários com base em parâmetros de consulta.
Requer uma função de administrador para acesso.
4. Criar Usuário
Endpoint: /createUser
Cria um novo usuário com um ID, nome, email, senha e função especificados.
5. Atualizar Usuário
Endpoint: /updateUser
Atualiza as informações de um usuário existente com base nos parâmetros fornecidos.
6. Excluir Usuário
Endpoint: /deleteUser
Exclui um usuário existente com base no ID fornecido.
Tecnologias Utilizadas
Node.js: O ambiente de execução para executar JavaScript no servidor.
Typescript: Um superset do JavaScript que adiciona tipagem estática à linguagem.
Express: Um framework de aplicativo web para Node.js.
JWT: Tokens Web JSON para autenticação segura.
Bcrypt: Uma biblioteca para fazer hash de senhas de forma segura.
TypeORM: Uma biblioteca de Mapeamento Objeto-Relacional (ORM) para TypeScript e JavaScript.
Configuração
Clone o repositório.
Instale as dependências com npm install.
Configure a conexão com o banco de dados na classe UserDatabase.
Execute a aplicação com npm start.
Uso
Utilize os endpoints fornecidos com métodos HTTP e cargas úteis apropriadas.
Garanta autenticação e autorização adequadas para operações seguras.