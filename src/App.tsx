import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { RequireAuth, useAuth } from "./auth/AuthProvider";
import { LoginPage } from "./auth/LoginPage";
import Layout from "./components/Layout";
import styles from "./index.css"

const NotFound = () => {
  return <h1>empty</h1>;
};

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">Hello world!</h1> 
      <h3 className="text-3xl">Basic example of react router dom</h3>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          {/* <Route
            path="about"
            element={
              <RequireAuth>
              </RequireAuth>
            }
          /> */}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
