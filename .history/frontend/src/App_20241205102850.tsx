
import { DisplayComponent } from './components/displaycomponent';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UserLogin } from './components/userLogin';
import { MainPage } from './components/MainPage';

function App() {
  console.log("app")
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<UserLogin/>}/>
        <Route path='/display' element={<DisplayComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
                                 


