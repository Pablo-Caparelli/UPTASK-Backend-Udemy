Instalaciones:
1- npm init --y (crea el package.json)
2- npm i express
3- npm i -D @types/express
4- npm i -D nodemon ts-node typescript
5- npm i colors

mongodb atlas

- user: pablocaparelli_db_user
- password: XQ8uyXjpCHsA0K11
  mongodb+srv://pablocaparelli_db_user:XQ8uyXjpCHsA0K11@cluster0.ooxasbc.mongodb.net/

mongoose (es un ODM)
-Al igual que Sequelize se utilizan modelos para diseñar los tipos de datos

npm i mongoose dotenv

-Arquitectura MVC (model view controller)
se utiliza en cualquier lenguaje de programación
-mejor orden y escalabilidad en tu proyecto.
-Modelo: todo lo relacionado a los datos, base de datos, el modelo está muy relacionado a tu ORM u ODM.
Consulta a la base de datos
-View: muestra los resultados de la consulta a la base de datos
Se encarga de todo lo que se ve en pantalla(HTML).
-Controller: es el encargado de llamar al Modelo, es el controlador el que le comunica a la vista los datos.
1 pieza más: el Router
que es el encargado de registrar todas las URL's o Endpoints que soporta nuestra aplicación

-npm i express-validator

//Nest Resource Routing
("Enrutamiento de recursos anidados")
es un patrón especialmente en API's RESTFUL
