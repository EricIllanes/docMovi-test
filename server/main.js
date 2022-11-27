import { Meteor } from "meteor/meteor";
import UsersCollection from "../imports/api/UsersCollection";

usersPrueba = [
  {
    nombres: "John Jane",
    apellidoPaterno: "Doe",
    apellidoMaterno: "Doe",
    rut: "12345678-9",
    region: "Metropolitana",
    comuna: "Santiago",
    codigoPostal: 123456,
  },
  {
    nombres: "Jane John",
    apellidoPaterno: "Doe",
    apellidoMaterno: "Doe",
    rut: "12355678-9",
    region: "Metropolitana",
    comuna: "Santiago",
    codigoPostal: 123456,
  },
  {
    nombres: "Eric Elías",
    apellidoPaterno: "Illanes",
    apellidoMaterno: "Curiqueo",
    rut: "12355678-9",
    region: "Araucanía",
    comuna: "Padre Las Casas",
    codigoPostal: 123456,
  },
];
const insertUser = async ({
  nombres,
  apellidoPaterno,
  apellidoMaterno,
  rut,
  region,
  comuna,
  codigoPostal,
}) => {
  await UsersCollection.insertAsync({
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    rut,
    region,
    comuna,
    codigoPostal,
    createdAt: new Date(),
  });
};

Meteor.startup(async () => {
  // Creo usuario de prueba para renderizar en la tabla
  // if (await UsersCollection.find().countAsync() === 0) {
  // usersPrueba.forEach((e)=>{
  //   insertUser(e)
  // });
  // }
  console.log("Welcome ma freeends ~(˘▾˘~)");
});
