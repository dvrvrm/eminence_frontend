import { redirect } from "react-router-dom";

export async function action({request}) {
    const token = localStorage.getItem('token');

    await fetch('http://localhost:8080/signout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
      }
    });
  
    localStorage.removeItem('token'); 
    return redirect('/');
  }