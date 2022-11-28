import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { formatRut, validateRut } from "rutlib";
import { validatorRegion, validatorComuna } from "./validators.js";
import UsersCollection from "../api/UsersCollection";
import Locations from "./jsonLocalities";
import Swal from "sweetalert2";

export default FormUsers = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { region: false, comuna: false },
  });
  const [dataForPruebas, setDataForPruebas] = useState({});
  const watchRegion = watch("region");
  const watchComuna = watch("comuna");

  const onHandleSubmit = (data) => {
    setDataForPruebas(data);
    let rutFormat = formatRut(data.rut);
    let rutOnUse = UsersCollection.find({ rut: rutFormat }).fetch();
    if (rutOnUse.length !== 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El rut ya está en uso",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Usuario agregado",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        UsersCollection.insert({
          nombres: data.nombres,
          apellidoPaterno: data.apellidoPaterno,
          apellidoMaterno: data.apellidoMaterno,
          rut: rutFormat,
          region: data.region,
          comuna: data.comuna,
          codigoPostal: data.codigoPostal,
        });
      }, 1500);
      reset();
    }
  };

  const comunasForSelect =
    Locations[
      Locations.indexOf(Locations.find((e) => e.region === watchRegion))
    ]?.comunas || [];

  return (
    <div className=" flex items-center flex-col py-10">
      <div className="shadow-md bg-sky-700 rounded px-8 pt-6 pb-8 mb-4 w-96 flex flex-col">
        <div className="mb-4">
          <form
            className="flex flex-col justify-center"
            onSubmit={handleSubmit((data) => {
              onHandleSubmit(data);
            })}
          >
            <input
              autoComplete="off"
              className="focus:border-green-100 focus:outline-none shadow appearance-none focus:border-4 rounded w-full py-2 px-3 my-5 text-grey-darker"
              type="text"
              name="nombres"
              placeholder="Nombres"
              {...register("nombres", {
                required: true,
                maxLength: 25,
                pattern: /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
              })}
            />
            {errors.nombres?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Este campo es requerido
              </span>
            )}
            {errors.nombres?.type === "maxLength" && (
              <span className="text-red-400 text-xs italic">
                Ingrese nombres válidos
              </span>
            )}
            {errors.nombres?.type === "pattern" && (
              <span className="text-red-400 text-xs italic">
                Solo se permiten letras
              </span>
            )}
            <input
              autoComplete="off"
              className="focus:border-sky-500 focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker"
              {...register("apellidoPaterno", {
                required: true,
                maxLength: 10,
                pattern: /^[a-zA-ZÀ-ÿ\s]{1,15}$/,
              })}
              name="apellidoPaterno"
              placeholder="Apellido Paterno"
            />
            {errors.apellidoPaterno?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Este campo es requerido
              </span>
            )}
            {errors.apellidoPaterno?.type === "maxLength" && (
              <span className="text-red-400 text-xs italic">
                Ingrese un apellido válido
              </span>
            )}
            {errors.apellidoPaterno?.type === "pattern" && (
              <span className="text-red-400 text-xs italic">
                Solo se permiten letras
              </span>
            )}
            <input
              autoComplete="off"
              className="focus:border-sky-500 focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker"
              {...register("apellidoMaterno", {
                required: true,
                maxLength: 10,
                pattern: /^[a-zA-ZÀ-ÿ\s]{1,15}$/,
              })}
              name="apellidoMaterno"
              placeholder="Apellido Materno"
            />
            {errors.apellidoMaterno?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Este campo es requerido
              </span>
            )}
            {errors.apellidoMaterno?.type === "maxLength" && (
              <span className="text-red-400 text-xs italic">
                Ingrese un apellido válido
              </span>
            )}
            {errors.apellidoMaterno?.type === "pattern" && (
              <span className="text-red-400 text-xs italic">
                Solo se permiten letras
              </span>
            )}
            <input
              autoComplete="off"
              className="focus:border-sky-500 focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker"
              {...register("rut", {
                required: true,
                validate: validateRut,
                minLength: 8,
              })}
              placeholder="Rut"
            />
            {errors.rut?.type === "minLength" && (
              <span className="text-red-400 text-xs italic">
                Ingrese un rut válido
              </span>
            )}
            {errors.rut?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Este campo es requerido
              </span>
            )}
            {errors.rut?.type === "validate" && (
              <span className="text-red-400 text-xs italic">
                Ingrese un rut válido
              </span>
            )}
            <ul>
              <li className=" bg-white group dropdown focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker">
                <a value={null}>{watchRegion || "Seleccione Región"}</a>
                <div className="group-hover:block dropdown-menu p-0 absolute hidden h-auto z-10">
                  <ul className="top-0 w-full bg-white shadow px-6 py-8 z-10">
                    {Locations.map((e, index) => {
                      return (
                        <li
                          className="hover:bg-gray-200 cursor-pointer w-full"
                          {...register("region", {
                            required: true,
                            validate: validatorRegion,
                          })}
                          key={index}
                          onClick={() => {
                            register().onChange({
                              target: { value: e.region, name: "region" },
                            });
                          }}
                        >
                          {e.region}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            </ul>
            {errors.region?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Seleccione una región
              </span>
            )}
            {errors.region?.type === "validate" && (
              <span className="text-red-400 text-xs italic">
                Seleccione una región
              </span>
            )}

            {watchRegion && watchRegion !== false && (
              <div>
                <ul>
                  <li className=" bg-white group dropdown focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker">
                    <a value={null} className="text-grey-darker">
                      {watchComuna || "Seleccione Comuna"}
                    </a>
                    <div className="group-hover:block dropdown-menu absolute hidden h-auto z-10">
                      <ul className="top-0 w-full bg-white shadow px-6 py-8">
                        {comunasForSelect.map((e, index) => {
                          return (
                            <li
                              className="hover:bg-gray-200 cursor-pointer w-full"
                              {...register("comuna", {
                                required: true,
                                validate: validatorRegion,
                              })}
                              key={index}
                              onClick={() => {
                                register().onChange({
                                  target: { value: e, name: "comuna" },
                                });
                              }}
                            >
                              {e}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            )}
            {errors.comuna?.type === "required" && (
              <span className="text-red-400 text-xs italic">
                Seleccione una comuna
              </span>
            )}
            <input
              autoComplete="off"
              className="focus:border-sky-500 focus:outline-none shadow appearance-none border rounded w-full py-2 px-3 my-5 text-grey-darker"
              {...register("codigoPostal", { pattern: /^[0-9]{1,15}$/ })}
              name="codigoPostal"
              placeholder="Código Postal"
            />
            {errors.codigoPostal?.type === "pattern" && (
              <span className="text-red-400 text-xs italic">
                Ingresar solo números
              </span>
            )}
            <button className="group relative self-center h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
              <div className="absolute inset-0 w-3 bg-lime-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative text-black group-hover:text-white">
                Crear Usuario
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
