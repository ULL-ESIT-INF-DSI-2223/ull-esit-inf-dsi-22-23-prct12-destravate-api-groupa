# Práctica 12 - Destravate

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-groupa/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-groupa?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-groupa&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-groupa)

## Introducción

El objetivo de esta práctica es implementar un API REST, haciendo uso de Node/Express, que permita llevar a cabo operaciones de creación, lectura, modificación y borrado (Create, Read, Update, Delete - CRUD) de un registro de actividades deportivas.

Podríamos decir que otro objetivo de la práctica es trabajar en grupo de manera conjunta de tal modo que todos aportemos nuestro conocimiento para cumplir con el objetivo, enunciado y requisitos, todo esto gracias a la comunicación adecuada, al trabajo en grupo y también a herramientas muy útiles que vimos en prácticas anteriores como LiveShare para poder estar todos los componentes del grupo trabjando en el código a la vez.

## Desarrollo

### Tracks

Los requisitos que se nos pedían para las Rutas son los siguientes:

1. ID único de la ruta.

2. Nombre de la ruta.

3. Geolocalización del inicio (coordenadas).

4. Geolocalización del final de la ruta (coordenadas).

5. Longitud de la ruta en kilómetros.

6. Desnivel medio de la ruta.

7. Usuarios que han realizado la ruta (IDs).

8. Tipo de actividad: Indicador si la ruta se puede realizar en bicicleta o corriendo.

9. Calificación media de la ruta.

#### Código

### Usuarios

Los requisitos que se nos pedían para los usuarios son los siguientes:

1. ID único del usuario (puede ser un username creado por el usuario en el registro o un valor generado automáticamente por el sistema).

2. Nombre del usuario.

3. Actividades que realiza: Correr o bicicleta.

4. Amigos en la aplicación: Colleción de IDs de usuarios con los que interacciona.

5. Grupos de amigos: Diferentes colecciones de IDs de usuarios con los que suele realizar rutas.

6. Estadísticas de entrenamiento: Cantidad de km y desnivel total acumulados en la semana, mes y año.

7. Rutas favoritas: IDs de las rutas que el usuario ha realizado con mayor frecuencia.

8. Retos activos: IDs de los retos que el usuario está realizando actualmente.

9. Histórico de rutas: Los usuarios deben almacenar el historial de rutas realizadas desde que se registraron en el sistema. La información almacenada en esta estructura de datos deberá contener la información de la fecha y el ID de la ruta realizada. Nótese que un usuario puede realizar más de una ruta al día y está decisión puede afectar al tipo de estructura en el que se almacena la información.

#### Código

### Grupos

Los requisitos para grupos son los siguientes:

1. ID único del grupo.

2. Nombre del grupo.

3. Participantes: IDs de los miembros del grupo.

4. Estadísticas de entrenamiento grupal: Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año.

5. Clasificación de los usuarios: Ranking de los usuarios que más entrenamientos han realizado históricamente dentro del grupo, es decir, ordenar los usuarios por la cantidad de km totales o desnivel total que han acumulado.

6. Rutas favoritas del grupo: Rutas que los usuarios del grupo han realizado con mayor frecuencia en sus salidas conjuntas.

7. Histórico de rutas realizadas por el grupo: Información similar que almacenan los usuarios pero en este caso referente a los grupos. Nótese que un usuario puede realizar rutas con un grupo y/o de manera individual el mismo día. Es decir, a modo de simplificación, asumimos que todos los usuarios de un grupo realizan la actividad cuando se planifica. Aunque, también pueden realizar otras actividades de manera individual.

#### Código

### Estadística

#### Código

### Retos

Los requisitos para los retos son los siguientes:

1. ID único del reto.

2. Nombre del reto.

3. Rutas que forman parte del reto.

4. Tipo de actividad del reto: bicicleta o correr.

5. Km totales a realizar (como la suma de los kms de las rutas que lo engloban).

6. Usuarios que están realizando el reto.

#### Código

### Gestor

Cuyo enunciado nos indicaba lo siguiente:

Por último, deberá crear una clase Gestor que permita gestionar el tratamiento de la información del sistema.

Para el funcionamiento de la clase Gestor, también necesitará hacer uso de Inquirer.js. En concreto, un usuario podrá:

Registrarse en el sistema. Un usuario que se conecte por primera vez al sistema deberá poder incluir su información para ser almacenada en el sistema. Asimismo, un usuario podrá visualizar el listado de usuarios existentes dentro del sistema y añadir/borrar amigos.

Visualizar todas las rutas existentes dentro del sistema. En este apartado se deben poder consultar el listado de rutas así como acceder a la información completa de cada una de ellas.

Unirse a un grupo existente. Este apartado considera la opción de un usuario que desea incluirse dentro de un grupo ya existente en el sistema.

Visualizar, crear y borrar grupos. Un usuario podrá borrar un grupo, pero solo si esta ha sido creado por él, es decir, no se podrá borrar un grupo pre-cargado en el sistema. Por otro lado, los grupos se podrán guardar usando el mismo sistema empleado para guardar la información cargada en el sistema. Por último, considere que en posteriores conexiones al sistema, el usuario podrá desear borrar un grupo que haya creado anteriormente. Debido a esto, se deberá distinguir entre los grupos creados por el usuario y los creados por el sistema con el objetivo de evitar borrar información sin permiso.

#### Código

## Pruebas y cubrimiento

Han sido realiazadas pruebas con mucha y chai con el fin de verificar el correcto funcionamiento de todos y cada uno de los ficheros del proyecto. A continuación se muestras las pruebas realizadas para cada parte:

-

Y como podemos ver a continuación todas las pruebas fueron superadas con éxito:

También podemos comprobar el cubrimiento de código con Istanbul y Coveralls:

Así que por último mostramos su funcionamiento por terminal:

## Conclusión

Ha sido una práctica con cierto nivel de complejidad pero que nos a ayudado no a saber trabajar en equipo por separado si no a usar herramientas como LiveShare en VSC que ha sido de gran ayuda. Cabe destacar que en esta práctica hemos alcanzado nuestro objetivo que era acabar con algo funcional, gracias al uso de todos los conocimientos adquiridos en la asignatura hasta esta semana. Incluso utilizamos patrones como `Singleton` por ejemplo. También tuvimos en cuenta y respetamos los principios Solid.

## Elementos Bibliográficos:

- Guión de la práctica 12, https://ull-esit-inf-dsi-2223.github.io/prct12-destravate-api/.

- Principios SOLID, https://profile.es/blog/principios-solid-desarrollo-software-calidad/.

- Adam Freeman - Essential TypeScript 4: From Beginner to ProURL,https://www.oreilly.com/library/view/essential-typescript-4/9781484270110/html/Part_1.xhtml .
