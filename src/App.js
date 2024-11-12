
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import PrivateComponent from './PrivateComponent';
import Nav from './Nav';
import SignUp from './SignUp';
import Login from './Login';
import Contact from './Contact';
import MyProfile from './MyProfile';
import Team from './Team';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Nav></Nav>
    <Routes>
      <Route element={<PrivateComponent/>}>
      <Route path="/" element={<h1>This is home page</h1>}/>
      <Route path="/home" element={<h1>This is home page</h1>}/>
      <Route path="/about" element={<h1>This is About page</h1>}/>
      <Route path="/findcontact" element={<Contact/>}/>
      <Route path="/myprofile" element={<MyProfile/>}/>
      <Route path="/team" element={<Team/>}/>
      </Route>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>

    </BrowserRouter>
      
    </div>
  );
}

export default App;
