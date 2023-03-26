//import logo from './logo.svg';
import React from "react";
import { Provider } from "react-redux";
import store from './store/store.js';
import Header from "./layouts/Header.js";
import Home from "./pages/Home.js";


function App() {
  return (
    <Provider store={store}>
      <div>
        <Header/>
        <Home/>
      </div>
    </Provider>

  );
}

export default App;
