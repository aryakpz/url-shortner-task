
import { DisplayComponent } from './components/displaycomponent';
import { Routes, Route, BrowserRouter, UNSAFE_getPatchRoutesOnNavigationFunction } from 'react-router-dom';
import { UserLogin } from './components/userLogin';
import { MainPage } from './components/MainPage';

function App() {
  console.log("app")
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UNSAFE_getPatchRoutesOnNavigationFunction/>}/>
        <Route path='/home' element={<MainPage />} />
        <Route path='/display' element={<DisplayComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
                                 


