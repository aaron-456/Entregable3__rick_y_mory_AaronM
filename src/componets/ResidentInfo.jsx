import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./styles/residentinflo.css"

const ResidentInfo = ({url}) => {

    const [population, setPopulation] = useState()

    useEffect(()=>{
        axios.get(url)
        .then(res=>setPopulation(res.data))
        .catch(err=>console.log(err))
    },[])



  return (
    <article className='resident'>
        <header className='resident__header'>
            <img className='resisdent__img' src={population?.image} alt="" />
            <div className='resident__container-status'>
                <span className={`resident__circle ${population?.status}`}></span>
                <span className='resident__status'>{population?.status} </span>
            </div>
        </header>
        <section className='resident__body'>
            <h3 className='resident__name'>{population?.name}</h3>
            <hr className='hr'/>
            <ul className='resident__list'>
                <li className='resident__item'><span className='resident__label'>Specie: </span>{population?.species}</li>
                <li className='resident__item'><span className='resident__label'>Origin: </span>{population?.origin.name} </li>
                <li className='resident__item'><span className='resident__label'>Eppisodes were appear: </span>{population?.episode.length} </li>
            </ul>
        </section>
    </article>
  )
}

export default ResidentInfo