//import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import { Provider } from "react-redux";
import store from './store/store.js';
import Header from "./layouts/Header.js";
import Home from "./pages/Home.js";
import { Route, Routes } from 'react-router-dom';
import AddForm from "./pages/AddForm.js";
import NotFound from "./pages/NotFound.js";
import DetailsPage from "./pages/DetailsPage.js";



function App() {


  return (
    <Provider store={store}>
      <div>
        <Header/>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/add-content" element={<AddForm />}/>
            <Route path="/series/:id" Component={DetailsPage}/>
            <Route path="/movie/:id" Component={DetailsPage}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
      </div>
    </Provider>

  );
}

export default App;
