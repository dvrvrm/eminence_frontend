import { json } from 'react-router-dom';
import { redirect, useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import { createPortal } from 'react-dom';

function SignUp() {
  let navigate = useNavigate();

  function closePop() {
    navigate('/');
  };

  return createPortal(<SignUpForm closePop={closePop} />, document.getElementById("modal"));
}

export default SignUp;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }

  const response = await fetch('http://localhost:8080/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if (response.status === 422 || response.status === 401 || response.status === 409) {
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