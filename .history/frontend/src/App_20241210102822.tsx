
import { DisplayComponent } from './components/displaycomponent';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { UserSignin } from './components/userSignin';
import { UserLogin } from './components/UserLogin';
import { Dashboard } from './components/dashboard';
import { AuthProvider } from './components/auth';

function App() {
  console.log("app")
  return (
   <AuthProvider>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserSignin/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/home' element={} />
        <Route path='/display' element={<DisplayComponent />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
   </AuthProvider>
  );
}

export default App;

