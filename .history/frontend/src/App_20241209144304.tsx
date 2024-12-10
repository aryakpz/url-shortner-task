
// import { DisplayComponent } from './components/displaycomponent';
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import { MainPage } from './components/MainPage';
// import { UserSignin } from './components/userSignin';
// import { UserLogin } from './components/UserLogin';
// import { Dashboard } from './components/dashboard';

// function App() {
//   console.log("app")
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<UserSignin/>}/>
//         <Route path='/login' element={<UserLogin/>}/>
//         <Route path='/home' element={<MainPage />} />
//         <Route path='/display' element={<DisplayComponent />} />
//         <Route path='/dashboard' element={<Dashboard/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
                                 

// import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DisplayComponent } from "./components/displaycomponent";
import { MainPage } from "./components/MainPage";
import { UserSignin } from "./components/userSignin";
import { UserLogin } from "./components/UserLogin";
import { Dashboard } from "./components/dashboard";

const isAuthenticated = (): boolean => {
  return !!sessionStorage.getItem("token"); 
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated() ? <UserSignin /> : <Navigate to="/home"  />}
        />
        <Route
          path="/login"
          element={!isAuthenticated() ? <UserLogin /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/home"
          element={isAuthenticated() ? <MainPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/display"
          element={isAuthenticated() ? <DisplayComponent /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
