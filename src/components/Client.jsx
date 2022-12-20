function Client({ client }) {
  const { id, nombre, telefono, email, empresa } = client;
  return (
    <tr className=" border-b hover:bg-gray-100">
      <td className="p-6">{id}</td>
      <td className="p-6 space-y-2">
        <p className=" text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>
      <td className="p-6">
        <p className=" text-gray-600">
          <span className=" text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p className=" text-gray-600">
          <span className=" text-gray-800 uppercase font-bold">Tel: </span>
          {telefono}
        </p>
      </td>
      <td className="p-6 flex gap-3">
        <button
          type="button"
          className=" text-blue-600 hover:text-blue-700 font-bold uppercase text-xs"
        >
          Editar
        </button>
        <button
          type="button"
          className=" text-red-600 hover:text-red-700 font-bold uppercase text-xs"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Client;
