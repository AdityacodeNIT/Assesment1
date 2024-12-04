import { useState } from "react";
import { Provider } from "react-redux";
import store from "./app/store.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./Components/DashBoard.jsx";
import Home from "./Components/Home.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/tasks" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
