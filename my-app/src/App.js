// import Register from "./Register";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom"
// import Users from "./Users";
import Register from "./components/register/Register";
import Users from "./components/users/Users";
import Nav from "./components/nav/Nav";
//import Navigation from "./components/navigation/Navigation";
//import Navigation from './components/navigatiore/Navigation';

function App() {
  
    
  return (
    <div className="App">
    
      <BrowserRouter>
      <Nav/>
        <Routes>
          
          
          <Route path="/" element={<Register/>}/>
          <Route path="/users" element={<Users/>}/>
          
          
                                                                     
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
