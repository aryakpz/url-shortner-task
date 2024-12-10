
import { DisplayComponent } from './components/displaycomponent';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { UserSignin } from './components/userSignin';
import { UserLogin } from './components/UserLogin';
import { Dashboard } from './components/dashboard';
import { AuthProvider } from './components/auth';
import { ProtectedRoute } from './components/protectedroute';

function App() {
  console.log("app")
  return (
   <AuthProvider>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserSignin/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/home' element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path='/display' element={<ProtectedRoute><DisplayComponent /></ProtectedRoute>} />
        <Route path='/dashboard' element={<}/>
      </Routes>
    </BrowserRouter>
   </AuthProvider>
  );
}

export default App;
