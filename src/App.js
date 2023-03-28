import React from "react";
import { Provider } from "react-redux";
import store from './store/store.js';
import Header from "./layouts/Header.js";
import Home from "./pages/Home.js";
import { Route, Routes } from 'react-router-dom';
import AddForm from "./pages/AddForm.js";
import NotFound from "./pages/NotFound.js";
import DetailsPage from "./pages/DetailsPage.js";
import Footer from "./layouts/Footer.js";



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
            <Route exact path="/not-Found" element={<NotFound />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
          <Footer/>
      </div>
    </Provider>

  );
}

export default App;
