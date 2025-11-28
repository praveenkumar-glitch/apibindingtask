import React, { useContext } from 'react'
import { langContext } from '../App'
import { Button } from 'react-bootstrap'

const Langg = () => { 
        const {content,toogleLanguage,lang}=useContext(langContext)
  return (
    <div>
        <h1>choosed lang -----{content[lang].language}</h1>
       <h2>{content[lang].text}</h2>
       <Button onClick={toogleLanguage}>{content[lang].btntext}</Button>
    </div>
  )
}
export default Langg
