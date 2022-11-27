import React from "react";
import { useTracker } from "meteor/react-meteor-data"; // el useEffect (?) de react
import UsersCollection from "../api/UsersCollection";

export default UsersTable = () => {
  const users = useTracker(() => {
    return UsersCollection.find().fetch();
  });
  let valuesTable = [
    "Nombres",
    "Apellido Paterno",
    "Apellido Materno",
    "RUT",
    "Región",
    "Comuna",
    "Cód. Postal",
    "Eliminar",
  ];

  const deleteUser = (value) => {
    UsersCollection.remove(value._id);
  };

  return (
    <div className=" flex justify-center pb-12">
      {users.length !== 0 ? (
        // <div className="bg-sky-500 flex justify-center mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        //<div className=" flex justify-center inline-block min-w-full shadow rounded-lg overflow-hidden my-10">
        <table className="w-3/4 leading-normal pb-8">
          <thead className="px-5 py-3 h-16 border-b-2 border-cyan-300 rounded-lg bg-slate-50 text-center text-sky-900 text-xs font-semibold text-gray-600 uppercase tracking-wider  ">
            <tr>
              {valuesTable.map((value, index) => {
                return <th key={index}>{value}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {users.map((value, index) => {
              return (
                <tr key={index} className="border rounded-lg">
                  <td className="px-5 py-5 border-b border-cyan-300 text-center bg-white text-sm text-sky-900">
                    {value.nombres}
                  </td>
                  <td className="px-5 py-5 border-b border-cyan-300 text-center bg-white text-sm text-pink-700">
                    {value.apellidoPaterno}
                  </td>
                  <td className="px-5 py-5 border-b border-cyan-300 text-center bg-white text-sm text-sky-900">
                    {value.apellidoMaterno}
                  </td>
                  <td className="px-5 py-5 border-b border-cyan-300 text-center bg-white text-sm text-pink-700">
                    {value.rut}
                  </td>
                  <td className="px-5 py-5 border-b border-cyan-300 text-center bg-white text-sm text-sky-900">
                    {value.region}
                  </td>
                  <td className="px-5 py-5 border-b border-cyan-300 text-center bg-white text-sm text-pink-700">
                    {value.comuna}
                  </td>
                  <td className="px-5 py-5 border-b border-cyan-300 text-center bg-white text-sm text-sky-900">
                    {value.codigoPostal}
                  </td>
                  <td className="px-5 py-5 border-b border-cyan-300 text-center bg-white text-sm">
                    <button
                      className="group relative h-12 w-28 overflow-hidden rounded-lg bg-white text-lg shadow"
                      onClick={() => {
                        deleteUser(value);
                      }}
                    >
                      <div className="absolute inset-0 w-3 bg-red-300 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                      <span className="relative text-black group-hover:text-white my-5">
                        Borrar Usuario
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        //</div>
        //</div>
        <h2 className=" flex justify-center text-green-600 font-semibold">
          No hay usuarios registrados!{" "}
        </h2>
      )}
    </div>
  );
};
