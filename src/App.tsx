import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { RequireAuth, useAuth } from "./auth/AuthProvider";
import { LoginPage } from "./auth/LoginPage";

const Layout = () => {
  const auth = useAuth();
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="empty">Empty</Link>
          </li>
          {!auth.user ? (
            <li>
              <Link to="login">Login</Link>
            </li>
          ) : null}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

const Home = () => {
  const [counter, setCounter] = useState(0);
  const auth = useAuth();
  console.log(auth);
  return (
    <main>
      <h1>Home</h1>
      <h2>{counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
      <button onClick={() => auth.signout(() => console.log(auth))}>
        logout
      </button>
    </main>
  );
};

const About = () => {
  return (
    <section>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        perferendis ratione similique est fugit reprehenderit suscipit
        blanditiis sunt nisi maxime laudantium molestiae exercitationem dolores
        officia, doloribus aut enim inventore quas. Expedita, tempore.
        Reiciendis delectus, ea dolores officiis corporis eius magni dolorem
        facilis, rerum, sit neque recusandae tempore numquam laudantium illum.
      </h3>
      <input type="text" />
    </section>
  );
};

const Empty = () => {
  return <div>empty page</div>;
};

function App() {
  return (
    <div>
      <h3>Basic example of react router dom</h3>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="about"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Empty />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
