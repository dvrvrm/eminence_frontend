import { Form, useActionData, useNavigation } from 'react-router-dom';

import classes from './SignUpForm.module.css';

function SignUpForm(props) {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  return (
    <>
      <div className={classes.popup}>
        <div className={classes.popupInner}>
          <h2>Sign Up</h2>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => {
                return <li className={classes.error} key={err}>{err}</li>
              })}
            </ul>
          )}
          {data && data.message && <p className={classes.error}>{data.message}</p>}
          <Form method="post">
            <label>
              Username:
              <input id="email" type="email" name="email" required />
            </label>
            <label>
              Password:
              <input id="password" type="password" name="password" required />
            </label>
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Sign Up'}</button>
          </Form>
          <button type="button" onClick={props.closePop}>Close</button>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
