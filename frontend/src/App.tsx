import { DisplayComponent } from './components/displaycomponent';
import { MainPage } from './components/MainPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  console.log("app")
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/display' element={<DisplayComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
                                 


