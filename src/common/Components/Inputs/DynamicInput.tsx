import { FieldArray, useFormikContext, type FormikErrors, type FormikTouched } from "formik";
import React, { useState } from "react";
import { Icons } from "../../Constants/Icons";
import type { Contact } from "../../Interfaces/ContactInterface";
import type { DynamicInputProps } from "./interfaces/DynamicInputInterface";
import type { Column } from "../Tables/TableInterface";

const DynamicInput: React.FC<DynamicInputProps> = ({
  arrayName,
  columns,
  elements,//required
  handleChange,//required
  clearObject,
}) => {
  // Obtenemos acceso a "errors", "touched", "handleBlur", etc.
  const {
    errors,
    touched,
    handleChange: formikHandleChange,
    handleBlur
  } = useFormikContext<any>();

  // Para controlar la confirmación al borrar
  const [confirmationIndex, setConfirmationIndex] = useState<number | null>(null);
  
  return (
    <FieldArray
      name={arrayName}
      render={(arrayHelpers) => (
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium text-teal-800/80">
                {columns.map((c: Column, i: number) => (
                  <th key={'H' + i}>{c.label}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {elements.map((element: Contact, index: number) => (
                <tr key={'R' + index} className="relative array-row">
                  {columns.map((c: Column<Contact>, j) => {
                    // path de este campo en formik
                    const fieldName = `${arrayName}.${index}.${c.atr}`;

                    // Extraer error y touched específicos
                    const fieldError = (errors?.[arrayName] as FormikErrors<Contact>[] | undefined)?.[index]?.[c.atr] || undefined;
                    const fieldTouched = (touched?.[arrayName] as FormikTouched<Contact>[] | undefined)?.[index]?.[c.atr] || undefined;

                    return (
                      <td key={'C' + j} className="align-top">
                        <input
                          className="flex w-full h-10 px-4 py-2 mb-1 font-semibold text-gray-800 duration-150 border rounded-md outline-none focus:border-teal-500 hover:border-teal-500 focus:ring-2 focus:ring-teal-200"
                          type="text"
                          value={element[c.atr] || ""}
                          name={fieldName}
                          // Usa handleChange de Formik para setear el valor
                          onChange={handleChange || formikHandleChange}
                          // Maneja el blur para que se marque "touched"
                          onBlur={handleBlur}
                        />
                        {/* Muestra el error si existe y si el campo fue tocado */}
                        {fieldError && fieldTouched && (
                          <div className="text-xs text-red-500">
                            {fieldError.toString()}
                          </div>
                        )}
                      </td>
                    );
                  })}
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirmationIndex === index) {
                          setConfirmationIndex(null);
                        } else {
                          setConfirmationIndex(index);
                        }
                      }}
                      className="p-2 bg-gray-200 rounded-r-lg text-zinc-700 "
                    >
                      <Icons.Trash />
                    </button>

                    <div
                      className={`absolute bg-gray-100 min-w-0 shadow-lg z-10 ${
                        confirmationIndex === index ? "block" : "hidden"
                      }`}
                    >
                      <button
                        className="block w-full px-3 py-2 bg-transparent border-none outline-none cursor-pointer hover:bg-gray-300"
                        onClick={(e) => {
                          e.preventDefault();
                          if (elements.length === 1) {
                            // Si solo hay un contacto, resetea los campos
                            arrayHelpers.replace(index, clearObject);
                          } else {
                            // Elimina el contacto
                            arrayHelpers.remove(index);
                          }
                          setConfirmationIndex(null);
                        }}
                      >
                        <Icons.Done />
                      </button>
                      <button
                        className="block w-full px-3 py-2 bg-transparent border-none outline-none cursor-pointer hover:bg-gray-300"
                        onClick={(e) => {
                          e.preventDefault();
                          if (confirmationIndex === index) {
                            setConfirmationIndex(null);
                          } else {
                            setConfirmationIndex(index);
                          }
                        }}
                      >
                        <Icons.Cancel />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* BOTÓN PARA AÑADIR NUEVO CONTACTO */}
          <div className="flex justify-end py-1">
            <button
              type="button"
              onClick={() => arrayHelpers.push(clearObject)}
              className="w-8 h-8 text-white bg-teal-500 rounded-lg total-center normal-button"
            >
              <Icons.Plus size="16px" />
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default DynamicInput;
