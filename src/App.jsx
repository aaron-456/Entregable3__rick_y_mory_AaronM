import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './componets/LocationInfo'
import ResidentInfo from './componets/ResidentInfo'
import getRamdomLocation from './utils/getRamdomloc'

function App() {

  const [saveUbication, setSaveUbication] = useState()
  const [ramLocation, setRamLocation] = useState(getRamdomLocation())
  const [hasError, setHasError] = useState(false)
  const [listUser, setListUser] = useState()
  const [listLocation, setListLocation] = useState()
  const [isShow, setIsShow] = useState(false)
  const [getValue, setGetValue] = useState()


  useEffect (() => {
    const url = `https://rickandmortyapi.com/api/location/${ramLocation}`
    axios.get(url)

    .then(res=>{
      setSaveUbication(res.data)
      setHasError(false)
      setIsShow(false)
    })
    
    .catch(err=>{
      console.log(err)
      setHasError(true)
      setIsShow(false)
    })
  },[ramLocation])

  const handleSubmit = e => {
    e.preventDefault()
    if(e.target.ubicinput.value.trim().length=== 0) {
      setRamLocation(getRamdomLocation())
    }else{
      setRamLocation(e.target.ubicinput.value.trim())
    }
    e.target.ubicinput.value=e.target.ubicinput.value.trim()
  }

  const handleChange=e =>{
    clearSelectValue()
    const inputValue = e.target.value.trim();
    if (inputValue) {
      const url = `https://rickandmortyapi.com/api/location/?name=${inputValue}`;
      axios.get(url)
      .then(res=>setListUser(res.data.results))
      .catch(err=>console.log(err))
      setIsShow(true);
    } else {
      setListLocation([]);
      setIsShow(false);
    }
  }

  const handleFocus = e => {
    e.target.value = ""
  }
  
  const clearSelectValue = () => {
    setGetValue(null);
  };

  const handleClickList = (loc) => {
    setRamLocation(loc.id)
    setGetValue(loc.name)
  }
  


console.log(isShow);



  return (
    <div className="app" onClick={() => setIsShow(false)}>
      <img className='title__img' src="/pngegg.png" alt="" />
    {

    <form className='form' onSubmit={handleSubmit}>
      <input 
        className='form__inp'
        id='ubicinput'
        type="text"
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder='Write the location...'
        />
      <button className='form__button'>Serch</button>
      
    {isShow &&
    <ul className='sugs'>
        {
          listUser?.map(loc=>(
            <li className='list'  onClick={()=> handleClickList(loc)} key={loc.id}>{loc.name} </li>
          ))
        }
      </ul>
      } 
    </form>
    }

    {
    hasError?
      <div>
        <h2 className='app__error'>Hey! you must provide an id from 1to 126 :/ </h2>
        <img className='err__img' src="/3i3n.gif" alt="" />
      </div>
      

      :
      <>
      <LocationInfo
      location= {saveUbication}/>
      <div className='population__container'>
        {
          saveUbication?.residents.map(url=>(
            <ResidentInfo
            key={url}
            url={url}/>
          ))
        }
      </div>
      </>

      
    }
    
    </div>
  )
}

export default App
