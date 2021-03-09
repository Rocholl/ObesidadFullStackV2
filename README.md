![enter image description here](https://img.shields.io/badge/Author-Carlos_Rocholl-cyan)
![enter image description here](https://img.shields.io/badge/Author-Sergio_Peñate-cyan)

# Proyecto Obesidad

 <p align="center"> <img src="https://i2.wp.com/www3.gobiernodecanarias.org/medusa/edublog/ieselrincon/wp-content/uploads/sites/137/2019/10/cropped-sin-titulo-4.png?fit=512%2C512" width="350"/></p> 

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Data Model](#datamodel)
4. [Use case](#user-case)
5. [User requirements](#user-requirements)
6. [Intefaces](#interfaces)
7. [Installation instructions](#installation-instructions)
8. [Tech Stack](#tech-stack)
9. [Technology comparison](#technologycomparison)
10. [Planning](#planning)
11. [Repositories](#repositories)
12.  [Conclusion](#conclusion)
13.  [Links and references](#linksandreferences)

### General Info
***

This project is an initiative to implement an obesity control system in educational centers to prevent future obesity in the city. 

## Technologies
***
A list of technologies used within the project:
 * [Ionic](https://ionicframework.com/): Version 5
 * [Angular Js](https://angular.io/): Version 10
 * [Node JS](https://nodejs.org/es/): Version 14.15.1 LTS
 * [Sequelize ORM](https://sequelize.org/): Version 6
 * [MySQL](https://www.mysql.com/): Version 10.1.40
## Data Model
Here we will see about the data model
### Introducion
 In the database we have 6 tables:
 * usuario: idUsuarios as primary key, user, password, name, lastname, idCentro refers to the id of the Centro table.
 * centro:idCentro as primary key, name, postal_code, lat, long, idDistrito refers to the id of the Distrito table.
 * health:idHealths as primary key, age, sex,num_lista, idCentro refers to the id of the Centro table and idCurso refers to the id of the Curso table.
 * healt_extend: id as primary key ,date,peso,percent_Grasa,percent_Hidratacion,peso_Muscular,peso_Muscular,masa_Muscular,peso_Oseo,kilocalorias,edad_Metabolica,altura,masa_Viseral,perimetro_Abdominal,actividad_Fisica,idHealt refers to Health.
 * municipio: idMunicipio as primary key, name, island.
 * distrito: idDistrito as primary key , name
 * class: idCurso as primary key, name.
 * user_class:idUsuario and idCurso.

### Relations
#### one to many
 - a usuario has a centro and a centro has many usuario.
 -  a centro has a district and a district has many centro
 - a health has a centro and a centro has many health
 - a health has a curso and a curso has many health

#### many to many
 - a usuario has many cursos and a curso has many usuario

### E/R Diagram
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/formInvalid.png?raw=true" width="500"/>  </p> 

### Relational Model
Usuario(**IdUsuario**,Username,Password,Email,Nombre,Apellidos,Rol,IdCentro*)

 - idCentro foreign key Centro

Usuario_Cursos(**IdUsu,IdCurso**)*

 - idUsu foreign key Usuario
 - idCurso foreign key Curso

Healt(**idHealts**,idHealths as primary key, age, sex,num_lista, idCentro*,idCurso*)

 - idCentro foreign key Centro
 - idCurso foreign key Curso

Curso(**idCurso**,nombre,letra)

Centro(**Id_Centro**,nombre,lat,long,codigo_Postal,IdDistrito*)

 - IdDistrito foreign key IdDistrito

Municipio(**Id_Municipio**,Nombre,Isla)
Distrito(**Id_distrito**,Nombre,idMunicipio*)
 - idMunicipio foreign key idMunicipio
### Class diagram
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/class-diagram.png?raw=true" width="500"/>  </p> 

### Sql Code

[Sql link](https://github.com/Rocholl/ObesidadFullStack/blob/Tests/obesidadsql.sql)
## User requirements

 - Platform:
 - - The application will be hybrid, that is, it will work for web and mobile environments.
- The main function of the application will be to be able to visualize a map where you can see the educational centers and relative information about obesity.
 - There is also a function where teachers can login and add data.
  - Only teachers can access the menu to add a record.
 - All those who access the application will be able to view the map.


## Use case
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/use_case.png?raw=true" width="500"/> </p> 
## User Class Diagram
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/Screenshot_1.png?raw=true" width="500"/> </p> 


## Technical specifications

 - Backend:  it communicates with a MySQL database, uses NodeJs technology to create requests and pass them on to the client, it also uses an ORM called sequelize to create models and create queries.
 - Frontend:  It communicates through a RESTful service with the server, the technology used is Ionic Framework + Angular JS

## Interfaces
### Color palette.
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/paleta_colores.png?raw=true" width="500"/>  </p> 


### Usability
  
After gathering information for the application I decided to use a color palette that is pleasing to the eye.
Where the buttons and texts acquire the desired colors by changing the global values ​​of the application.[Variables.scss](https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Frontend/myApp/src/theme/variables.scss)
There are 2 menus visible all the time that serve different functions.
Tab menu:
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/menus.png?raw=true" width="350"/>  </p> 
  
It is easy to use and pleasant for the user, there is no need to register to view the map and we keep it in mind at all times in the tab menu.
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/Mapa.png?raw=true"/>  </p> 
 The user can interact with the map and look at the data inside it, it is easy to guess by the colors the severity of obesity in each school.
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/mapaCartel.png?raw=true"/>  </p> 
  
In the matter of errors they are controlled through pop-up windows.
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/notlogin.png?raw=true"/>  </p> 
 And each form is validated so that if you do not enter the desired values ​​you cannot submit to the buttons.
  <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/formhealthmenuinvalid.png?raw=true"/>  </p> 
   <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/formInvalid.png?raw=true"/>  </p> 
  
When a teacher adds a student, the interface lets him create several, keeping the initial options:
   <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/healthcreated.png?raw=true"/>  </p> 
   Regarding security, it is checked every time a page is entered if the user is logged in or not

When applying a filter a loading window will appear so as not to confuse.
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/Screenshot_2.png?raw=true"/>  </p> 
 The map interface has two buttons available that allow to remove the markers and the polygon from the map to make the data visualization more comfortable.

 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/Screenshot_3.png?raw=true"/> </p> 
The data display changes the select lists in order to do more like the display of options to choose from.

  <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/Screenshot_3.png?raw=true"/>  </p> 
The user is able at all times to access the entire application through two implemented navigation methods.

Tab Menu:
  <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/Screenshot_5.png?raw=true"/>  </p> 
Slide menu:
  <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/Screenshot_6.png?raw=true"/>  </p> 

##  User Manual

When starting the application we will not find a welcome page where we will have various buttons to navigate the pages.
 <p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/usu1.png?raw=true"/>  </p> 

To view the data and the map we will have available the tab bar in which we can move to these tabs.
To view the data in a table you have to go to the Data tab.
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/usu2.png?raw=true"/>  </p> 
By default you will get some preloaded data.
To use the filters you must click the Filter button and select the one you want.
Then the data will be displayed.
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/usu3.png?raw=true"/>  </p> 

To view the map you must go to the map tab. There you can choose whether or not to see the centers and municipalities.
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/usu2.png?raw=true"/>  </p> 

To add records as Professor you must go to the login tab using the slide menu
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/usu5.png?raw=true"/>  </p> 
Then you must register with your teacher credentials.
You will access the Teacher window where you will have the possibility to view a report and add records.
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/usu6.png?raw=true"/>  </p>
To add a record you must click on Add record.

And the class window will open where you must choose the class to which you will take the data.
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/usu5.png?raw=true"/>  </p>

You must choose a student and press the button add record.
Then the data collection window will open

You must fill in the data. Don't worry because you will get a signal when you have something wrong.
Then press the create button.
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/usu8.png?raw=true"/>  </p>
A window will appear that will say that the record was created successfully and will redirect you to the class window with the class you had previously chosen.
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Master/Documentacion/v2/usu9.png?raw=true"/>  </p>

##  Installation instructions
### Prerequisites
You need a working environment with:

-   [Git](https://git-scm.com/)  - You can install it from  [https://git-scm.com/downloads](https://git-scm.com/downloads).
-   [MySQL](https://www.mysql.com/)  - You can install it from  [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/).
-   [Node.js](https://nodejs.org/)  - Install node.js from  [https://nodejs.org/es/download/](https://nodejs.org/es/download/). It's advisable to install the LTS version.
- ## General Installation instructions

The best option to start with this project is cloning it in your PC:

```
git clone https://github.com/Rocholl/ObesidadFullStack.git

```

This project contains 2 different parts:

-   Frontend
-   Backend

You need a node.js working environment. The LTS is recommended:  [https://nodejs.org/es/](https://nodejs.org/es/)

Once you have cloned the project install all dependencies.

```
cd frontend/myapp
npm install

cd backend
npm install

```

-   For your backend part:

1.  You need a Ionic5NodeAuthBasic/backend/.env file with a key for the JWT and the data for the connection to your MySQL Server:

```
MYSQL_DATABASE=obesidadsql
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
DB_HOST=localhost
NODE_ENV=development
AUTH_SECRET=trololo
AUTH_EXPIRES=1d
AUTH_ROUNDS=10

```

2.  You need a mysql server working.
    
3.  Create the mysql database, that in our case is "obesidadsql". You can import it from the file obesidadsql.sql included in this project.  [https://github.com/tcrurav/Ionic5NodeAuthBasic/blob/master/backend/db_motorbikes_dev.sql](https://github.com/tcrurav/Ionic5NodeAuthBasic/blob/master/backend/db_motorbikes_dev.sql)
    
For the frontend part:
go to myApp/index.html
then follow the next tutorial:
[http://www.rubenalcaraz.es/pinakes/informatica/como-obtener-una-clave-api-para-google-maps/](http://www.rubenalcaraz.es/pinakes/informatica/como-obtener-una-clave-api-para-google-maps/)
<p align="center"> <img src="https://github.com/Rocholl/ObesidadFullStack/blob/Tests/Documentacion/googlekey.png?raw=true"/>  </p> 
Then put the code in that line.

Finally to start enjoying this project.

```
cd Ionic5NodeAuthBasic/backend
npm start

cd Ionic5NodeAuthBasic/frontend
ionic serve
From the frontend i created 3 users to test:
user:prueba
password:tiburcio
user:prueba1
password:tiburcio
user:prueba2
password:tiburcio

Enjoy!!!
```
## Tech Stack ⚙️

### Ionic

 - Ionic is an open source, front-end SDK for developing Hybrid Mobile Applications using web technologies such as HTML, CSS and JavaScript. It provides mobile optimised web technology based components as well as native APIs using Cordova and Ionic Native.

### Angular JS

 - AngularJS is a client side JavaScript MVC framework to develop a dynamic web application. ... It extends the ability of HTML by adding built-in attributes and components and also provides an ability to create custom attributes using simple JavaScript.
 
### Node JS
 - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.
### Sequelize ORM
 - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

### MySQL

 - MySQL is a relational database management system based on **SQL** – **S**tructured **Q**uery **L**anguage. The application is used for a wide range of purposes, including data warehousing, e-commerce, and logging applications.
## Technology comparison
<p align="center"> <img src="https://www.raona.com/wp-content/uploads/2017/10/infografia_articulo-1.png"/>  </p> 

## Planning
 - [Trello](https://trello.com/b/DHpZELkW/app-obesidad)
 
## Repositories
 - [Obesidad FullStack by Carlos Rocholl](https://github.com/Rocholl/ObesidadFullStack)
## Conclusion
El desarrollo basado en frameworks en de javascript me parecio increible tanto node como ionic tienen mucho apoyo de la comunidad y su documentacion es muy facil de entender.

### En cuanto al desarrollo de ionic:
- Hay que tener en cuenta las promesas y los observables ya que tuve algunos problemas a la hora de mostrar datos por pantalla.
- Ionic Storage es una buena herramienta para guarda datos(objetos en mi caso) el cual me facilito mucho a la hora de no invadir al servidor con demasiadas peticiones. Por ejemplo cuando te logueas vas a una pagina de presentacion del usuario, al entrar a esa pagina retiro los datos del storage y llamo a los servicios de centro y curso para luego guardarlos de nuevo y no tener que volver a llamarlos a la hora de crear un registro.
- Al poder importar cualquier libreria de javascript y angular facilita el tema de validar formularios. Por ejemplo la api de google maps para js.
### En cuanto al desarrollo con nodeJS:
- Aprendi un monton de las llamadas asincronas.
- El ORM sequelize te permite hacer un monton de cosas y casi no utilice ninguna Raw Query(por tema de tiempo), te permite crear validaciones en el propio servidor y crear relaciones complejas(Ej: relacion many to many de usuario y cursos que con un simple metodo usuario.getCursos me devuelve un array con los cursos del usuario)
- Poder ver en tiempo real las peticiones al servidor me ayudo bastante a la hora de encontrar fallos.
### En cuanto a la base de datos:
- Mysql es problamente el sistema gestor de bases de datos mas utilizado en el mundo.
- Tiene un monton de herramientas para crear las bases de datos asi como su relaciones.
- Tiene compatibilidad con todo.
### Cosas que cambiaria o que me haya faltado tiempo para implementarlas.
- Añadir filtros al mapa.
- Controlar que todo este cargado antes de iniciar una pagina a travez de un loading.
- Implementar ion-picker en vez de ion-select ya que seria mas comodo para dispositivos moviles.
- Controlar con ionic guards las sesiones.(De esto me entero ya avanzado en el desarrollo).
- Mejorar la pagina Home.
## Links and references
 - [Ionic Team Github](https://github.com/ionic-team/ionic-framework)
 - [Code Swag Channel](https://www.youtube.com/channel/UCNqICCv46r3o4sRlmzStfVQ)
 - [StackOverFlow](https://stackoverflow.com/)
 - [Simon Grimm Channel](https://www.youtube.com/user/saimon1924)

