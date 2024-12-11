
import { DisplayComponent } from './components/displaycomponent';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UserLogin } from './components/userLogin';
import { MainPage } from './components/MainPage';
import { UserSignin } from './components/userSignin';

function App() {
  console.log("app")
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserSignin/>}/>
        <Route path='/home' element={<MainPage />} />
        <Route path='/display' element={<DisplayComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
                                 


