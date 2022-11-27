import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const UsersCollection = new Mongo.Collection('users');

UsersCollection.schema = new SimpleSchema({
    nombres: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    rut: String,
    region: String,
    comuna: String,
    codigoPostal: Number,

})

export default UsersCollection;