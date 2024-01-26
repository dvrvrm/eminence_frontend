import { json } from 'react-router-dom';
import { redirect, useNavigate } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import { createPortal } from 'react-dom';

function SignIn() {
  let navigate = useNavigate();

  function closePop() {
    navigate('/');
  };

  return createPortal(<SignInForm closePop={closePop} />, document.getElementById("modal"));
}

export default SignIn;

export async function action({ request }) {
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
    throw json({ message: 'Could not authenticate user' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  return redirect('/products');
}