import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from 'react-router-dom';
import Formulario from '../components/Form';
import { getClient, updateClient } from '../data/clients';
import Error from '../components/Error';

export async function loader({ params }) {
  const client = await getClient(params.clientId);
  if (Object.values(client).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No hay resultados',
    });
  }
  return client;
}

export async function action({ request, params }) {
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
  // update client
  await updateClient(params.clientId, data);
  return redirect('/');
}
function ClientEdit() {
  const errors = useActionData();
  const navigate = useNavigate();
  const client = useLoaderData();

  return (
    <>
      <h1 className=" font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className=" mt-3">
        A continuación podrás modificar los datos de un cliente
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
          <Formulario client={client} />
          <input
            className=" mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            type="submit"
            value="Actualizar"
          />
        </Form>
      </div>
    </>
  );
}

export default ClientEdit;
