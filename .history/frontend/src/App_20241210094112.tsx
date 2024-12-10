
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
   <AuthProvider></AuthProvider>
  );
}

export default App;

