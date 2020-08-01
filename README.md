# TP-Objetos
Trabajo practico con fecha de entrega el 02-08-20.

Descripcion del Proyecto


El siguiente proyecto simula el proceso de iniciar sesion, crear nueva cuenta,
cambiar nombre de usuario, contraseña, mail; así como el almacenamiento de dichos datos en un registro,
almacenando los datos de cada usuario por separado.


Descripcion de la Libreria


Bcrypt es una libreria que se utiliza para encriptar contraseñas. 
Al igual que todas las librerias, debe ser instalada (npm install bcrypt), 
y a continuacion se debe generar un require: const bcrypt = require('bcrypt'); .

Bcrypt consta de varias definiciones: salt, saltRound, hash, entre otras.
*salt se puede definir como los caracteres aleatorios que posteriormente se utilizan para encriptar una contraseña.
*saltRounds es el factor de tiempo que se necesita para hacer un hash. mientras mas saltRounds, mas seguro es el hash.
*hash es el resultado de la combinacion de salt y la contraseña.

Una de las formas de utilizar esta libreria:

//definir la cantidad de saltRounds
const saltRounds = 10;

//definir salt con sus saltRounds
const salt = bcrypt.genSaltSync(saltRounds);

//contraseña a encriptar
let password = "contraseña1";

//generar un hash con la contraseña y salt
let hash = bcrypt.hashSync(password, salt);

//y por ultimo comparar la contraseña con el hash de la misma, de ser correcta devuelve true.
let boolean = bcrypt.compareSync(password, hash);

