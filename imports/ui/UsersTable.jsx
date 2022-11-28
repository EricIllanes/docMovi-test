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
    "Borrar Usuario",
  ];

  const deleteUser = (value) => {
    UsersCollection.remove(value._id);
  };

  return (
    <div className=" w-full flex justify-center pb-12">
      {users.length !== 0 ? (
        <table className="w-2/3 leading-normal pb-8">
          <thead className="px-5 py-3 h-16 border-b-2 border-blue-200 rounded-lg bg-gray-200 text-center text-pink-500 text-xs font-semibold text-gray-600 uppercase tracking-wider  ">
            <tr>
              {valuesTable.map((value, index) => {
                return <th className="text-base" key={index}>{value}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {users.map((value, index) => {
              return (
                <tr key={index} className="border rounded-lg">
                  <td className="px-5 py-5 border-b border-blue-200 text-center  bg-slate-50 text-sm text-sky-900">
                    {value.nombres}
                  </td>
                  <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                    {value.apellidoPaterno}
                  </td>
                  <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                    {value.apellidoMaterno}
                  </td>
                  <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                    {value.rut}
                  </td>
                  <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                    {value.region}
                  </td>
                  <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                    {value.comuna}
                  </td>
                  <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm text-sky-900">
                    {value.codigoPostal}
                  </td>
                  <td className="px-5 py-5 border-b border-blue-200 text-center bg-slate-50 text-sm">
                    <button
                      className="group relative h-12 w-28 overflow-hidden rounded-lg bg-slate-50 text-lg shadow"
                      onClick={() => {
                        deleteUser(value);
                      }}
                    >
                      <div className="absolute inset-0 w-3 bg-red-300 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                      <span className="relative text-black group-hover:text-white my-5">
                        Borrar
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h2 className=" flex justify-center text-sky-800 text-xl font-semibold">
          No hay usuarios registrados!{" "}
        </h2>
      )}
    </div>
  );
};
