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
import Studentmark from './Components/Api/Studentmark';
import { createContext, useState } from 'react';
import Langg from './Components/Langg';
import Gettt from './Components/Oneee/Gettt';
import Photo from './Components/Oneee/Photo';

export const langContext=createContext()

function App() {

  let [lang,setLang]=useState('en')

  function toogleLanguage(){

    setLang(prv=>prv=='en'?'ta':'en')
    console.log(lang);
    
  }

  let content={
    'en':{
      'language':'english',
      'text':'welcome Praveen',
      'btntext':'switch to tamil'
    },
    'ta':{
  "language": "ஆங்கிலம்",
  "text": "வரவேற்கிறோம் ப்ரவேன்",
  "btntext": "தமிழுக்கு மாறவும்"
}

  }
  return (
    <div className="App">
   <langContext.Provider value={{content,toogleLanguage,lang}}>

       <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/game' element={<Game/>} />
        <Route path='/validation' element={<Validation/>} />
        <Route path='/loan' element={<Loan />}/>
        <Route path='/balance' element={<Balance/>}/>
        <Route path='/bind' element={<Bind/>}/>
        <Route path='/get' element={<Getdata/>}/>
        <Route path='/client'element={<Client/>}/>
        <Route path='/Student' element={<Student/>}/>
        <Route path='/Category' element={<Category/>}/>
        <Route path='/Studentmark' element={<Studentmark/>}/>
        <Route path='/langcontext' element={<Langg />} />
        <Route path='/gett' element={<Gettt/>}/>
        <Route path='/php' element={<Photo/>}/>
      </Routes>
      </BrowserRouter>
   </langContext.Provider>
   
     </div>
  );
}

export default App;
