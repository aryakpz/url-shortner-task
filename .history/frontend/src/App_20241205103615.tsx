
import { DisplayComponent } from './components/displaycomponent';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { UserSignin } from './components/userSignin';

function App() {
  console.log("app")
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserSignin/>}/>
        <Rout
        <Route path='/home' element={<MainPage />} />
        <Route path='/display' element={<DisplayComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
                                 


