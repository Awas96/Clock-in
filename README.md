Aplicación Clock-In
Jose A. Roselló López

Desde hace un par de años, realizar un fichaje dentro de un centro de trabajo es completamente obligatorio, esta es una medida establecida en el Real Decreto Ley 8/2019 que reforma varios artículos dentro del estatuto de los trabajadores, está consolidada con el objetivo de combatir la precariedad laboral y las horas extras no remuneradas.

Esta situación ha hecho que muchas empresas busquen una solución a esta nueva ley mediante el desarrollo de aplicaciones con el propósito de llevar una gestión de los horarios de los trabajadores.

Dicho esto, mi proyecto está orientado a solventar esta medida para PYMES en España añadiendo además funcionalidad extra de “calidad de vida” como la visualización del horario para tener un informe de cuando tiene que venir a trabajar y así, la empresa poder contar con la aplicación para gestionar los horarios de los empleados y los fichajes en su totalidad.


La aplicación contará con un control inteligente de los fichajes dentro de la empresa mediante unos denominados eventos que, con una fecha, podrá manejar los diferentes turnos de los trabajadores y que estos no se solapen.
 
El usuario con rol (ROLE_EMPLEADO) podrá ver sus diferentes días de trabajo y fichar dentro de la aplicación. Este también gestiona sus incidencias en caso de tener alguna a resolver. Aparte, este puede autogestionar su contraseña y cambiar su nombre de usuario a alguno que no esté ya ocupado.

Junto al Rol de Empleado, existirá un rol de gestor (ROLE_GESTOR) que pueda manejar todos los eventos y modificar los horarios en caso de ser necesario. Este también hace una gestión de las incidencias y puede mostrar un histórico tanto de cada usuario como global.

    Tanto eventos como históricos podrán ser exportados a pdf/excel por parte del gestor para así poder utilizarlos fuera de la aplicación e imprimir cuadrantes de horarios

Por último el Rol de Administrador (ROLE_ADMINISTRATOR) contará con la capacidad de altas bajas y modificaciones de usuarios si esto fuera necesario, sin embargo, al no ser este un trabajador, no hereda de gestor. (los roles no son hereditarios pero tampoco son exclusivos).

Interfaces de la aplicación

Control de seguridad:
Este control se utiliza para gestionar el login, el logout y el Registro del cliente, es la parte más genérica del software.
El Registro del cliente tendrá un sistema de mailer para activar al usuario.

Control de Usuario:
Este control tiene las posibilidades ver tu perfil (en caso de estar logueado)
también te permite modificar ciertos datos del usuario dadas las condiciones de que no sean campos únicos y/o no estén ya usados por otros usuarios.
También puedes recuperar el usuario en caso de haber olvidado la contraseña y resetear la contraseña
Este sistema de recuperación de contraseñas se utilizará mediante el sistema de mailer ya establecido.

Control de Fichajes:
Control de empleados que se utiliza para realizar acciones respecto a los eventos de Fichar, La aplicación puede:
Ver Histórico de fichajes propios
Puedes ver los fichajes anteriores que has realizado para tener una idea de como funciona tu horario.
Ver Horario
Mediante un cálculo de los próximos fichajes de los siguientes días, mostrar un calendario de la semana con los próximos días a trabajar.
Fichar
Realizar un evento de tipo fichar para cumplir con las obligaciones del horario de trabajo
Ver Historial completo (solo gestores)
Dada la situación en que el rol gestor este dado para el usuario logueado, podrá ver el histórico entero de los eventos para así poder crear un horario para la semana siguiente.
Modificar Horario (solo gestores)
Dada la situación en que el rol gestor este dado para el usuario logueado, este podrá modificar el horario de la semana y manejar los eventos de los usuarios.


Control de Incidencias:
Control que se utiliza para incidencias dentro de la app:
Una incidencia es una anomalía dentro del horario/ incumplimiento de un evento.
Los controles dentro de incidencias son:
Justificar una incidencia (rol empleados)
Dada la situación de que la app te haya notificado de que tienes una notificación incumplida dentro de los eventos, un empleado deberá justificar esta anomalía.
Ver incidencia (rol gestor)
El gestor podrá ver las incidencias que están incumplidas de los diferentes usuarios (creado con la intención de que ese gestor lo comente con el empleado de manera independiente de la aplicación.
Resolver incidencia (rol gestor)
Se le da al gestor una interfaz mediante la cual puede ver las justificaciones de los eventos de los empleados y aceptar el motivo para resolverlas, o echarlas atrás si no está convencido del motivo.
Ver Histórico (rol gestor)
El gestor tendrá acceso a un control donde puede ver todas las incidencias tanto por global como por usuario.

Control de Gestión 
Un administrador de la app podrá gestionar los usuarios de la aplicación en caso de ser estrictamente necesario.
Listar Usuarios
Muestra un listado de usuarios de la aplicacion, nada mas
Modifica Usuarios
El administrador podrá modificar los datos de los usuarios en caso de ser terminantemente necesario por motivos de pérdida de cuenta o similares.
Eliminar Usuario
Dada la naturaleza de histórico de app, un sistema de eliminación de usuarios no es necesario del todo, sin embargo la aplicación va a disponer de ella en caso de tener la necesidad de usarla.



Tecnologías que se van a usar

El Back-end de la aplicación se realizará en Symfony, ya que es un sistema versátil y robusto para el manejo de datos y de seguridad. 
ORM mediante Doctrine, para el manejo de datos
Twig para las plantillas HTML, para hacer las más básicas y luego escribir el resto mediante elementos del frontend
Una facilidad para enviar y recibir los datos del ORM mediante JSON para su uso a posteriori en el frontend
No estamos limitados a elementos de windows
Completamente compatible con apache2

El Back end de la aplicación será mediante Vainilla JavaScript con partes de JQuery Y Bootstrap
JavaScript siendo uno de los lenguajes de front-end más utilizados actualmente, facilita mucho el proceso de recogida de datos.
Es Versátil para la recogida de datos mediante JSON y también para devolverlos
JQuery ya no es totalmente necesario, pero es útil para algunas dependencias tales como Bootstrap
Bootstrap se utilizará para aplicarle estilos que luego se modificaran mediante CSS.
Se utilizrá CSS vanilla como tecnología de hojas de estilo.
