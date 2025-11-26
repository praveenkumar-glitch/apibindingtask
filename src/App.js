import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from './Components/Validation';
import Game from './Components/Game';
import Nav from './Components/Nav';
import Loan from './Components/Loan';
import Balance from './Components/Balance';
import Bind from './Components/Tas/Bind';
import Getdata from './Components/Tas/Getdata';
import Client from './Components/Tas/Client';
import Student from './Components/Api/Student';
import Category from './Components/Api/Category';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/game' element={<Game/>} />
        <Route path='/validation' element={<Validation/>} />
        <Route path='loan' element={<Loan />}/>
        <Route path='/balance' element={<Balance/>}/>
        <Route path='/bind' element={<Bind/>}/>
        <Route path='/get' element={<Getdata/>}/>
        <Route path='client'element={<Client/>}/>
        <Route path='/Student' element={<Student/>}/>
        <Route path='/Category' element={<Category/>}/>
      </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;
