import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom';
import ApplicationList from './components/ApplicationList';
import ApplicationPage from './components/ApplicationPage'
import ResourceList from './components/ResourceList';
import ResourcePage from './components/ResourcePage';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
<Route  path="/applications" element={<ApplicationList/>}/>
<Route  path="/resources" element={<ResourceList/>}/>
<Route path="/applications/:name" element={<ApplicationPage />} />
<Route path="/resources/:name" element={<ResourcePage />} />

      </Routes>
    </div>
  );
}

export default App;
