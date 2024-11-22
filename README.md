# AngularTaskflow

- Projecto de prueba para FusePong

pagina web:

http://taskflow-test8.s3-website-us-east-1.amazonaws.com/

## Descripción

Aplicación que permite crear un usuario vinculandolo a una compañia, permite loguearse a ese usuario y entrar al dashboard.

En el dasboard en el sidebar, al entrar a Tickets permite ver una lista de Tickets la cual se puede ordenar por fecha de creacion ademas de filtrar por su estado 

al dar click en el item de proyectos permite ver los diferentes proyectos de la compañia, estos permiten acceder a una tabla con las diferentes historias de usuario del proyecto.

En la tabla de historias de usuario, al dar click en un item permite ver los tickets asociados a esta, el usuario puede editar y crear tanto historias de usuario como tickets, puede cambiar el estado del ticket y borrarlo de ser necesario

En terminos de seguridad utiliza una autenticacion basica con jwt y roles, los roles no se estan utilizando para facilitar las pruebas, al expirar el token envia al usuario a la pagina de login para que entre nuevamente

## Tecnologias

Las tecnologias utilizadas son:

- En la parte de Frontend se utilizo Typescript Angular junto con tailwind

- Para el Backend se utilizo Java springboot y como database MongoDb

- para el despliegue se monto el backend en un ec2, para la DB se utilizo Mongo Atlas, y por el lado del frontend se almaceno en un S3 como web estatica