import {json} from 'react-router-dom';
import { redirect } from 'react-router-dom/dist';
import SignInForm from '../components/SignInForm';

function SignIn() {
  return <SignInForm />;
}

export default SignIn;

export async function action({request}) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }

  const response = await fetch('http://localhost:8080/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({message: 'Could not authenticate user'}, {status: 500});
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  return redirect('/products');
}