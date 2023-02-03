import "./styles/App.css"
import React, {Suspense, useState} from "react";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import {Route, Router, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import Header from "./components/header/Header";
function App() {


  return (
      <Provider store={store}>
          <Header variant={324324} name={"Терновский Илья"}/>
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/login" element={<LoginPage />}/>
        </Routes>
      </Provider>
  );
}

export default App;
