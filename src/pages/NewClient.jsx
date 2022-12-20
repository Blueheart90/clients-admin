import { useNavigate, Form, useActionData, redirect } from 'react-router-dom';
import Formulario from '../components/Form';
import Error from '../components/Error';
import { addClient } from '../data/clients';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get('email');

  // Validations
  const errors = [];
  if (Object.values(data).includes('')) {
    errors.push('Todos los campos son obligatorios');
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
    errors.push('El Email no es valido');
  }

  if (Object.keys(errors).length) {
    return errors;
  }
  await addClient(data);
  return redirect('/');
}
const NewClient = () => {
  const errors = useActionData();
  const navigate = useNavigate();
  return (
    <>
      <h1 className=" font-black text-4xl text-blue-900">Clientes</h1>
      <p className=" mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="bg-blue-800 px-3 py-1 font-bold uppercase text-white"
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errors?.length &&
          errors.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario />
          <input
            className=" mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            type="submit"
            value="Crear"
          />
        </Form>
      </div>
    </>
  );
};

export default NewClient;
