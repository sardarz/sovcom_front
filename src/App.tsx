import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";

const Layout = () => {
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
            <Link to="empty">Non existent</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

const Home = () => {
  const [counter, setCounter] = useState(0);

  return (
    <main>
      <h1>Home</h1>
      <h2>{counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>increment</button>
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
          <Route path="about" element={<About />} />
          <Route path="*" element={<Empty />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
