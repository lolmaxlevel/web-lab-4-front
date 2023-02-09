import "./styles/App.css"
import React from "react";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import Header from "./components/Header/Header";
import NotFoundPage from "./components/NotFoundPage";
function App() {


  return (
      <Provider store={store}>
          <Header variant={324324} name={"Терновский Илья"}/>
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/*" element={<NotFoundPage/>} />
        </Routes>
      </Provider>
  );
}

export default App;
