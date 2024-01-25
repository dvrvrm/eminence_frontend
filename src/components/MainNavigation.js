import { NavLink, Form, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {token && <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>}
          {!token && (<li>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              SignIn
            </NavLink>
          </li>)}
         {!token && (<li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              SignUp
            </NavLink>
          </li>)}

          {token && (<li>
            <Form action='/logout' method='post'>
            <button>Logout</button>
            </Form>
          </li>)}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
