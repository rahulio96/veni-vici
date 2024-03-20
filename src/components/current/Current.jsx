import './Current.css'
import { useState } from 'react';
import BanList from '../ban-list/BanList';

function Current() {
  const URL = "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=1&order=RANDOM&page=0&limit=1"

  const [imgURL, setImgURL] = useState('')
  const [breed, setBreed] = useState('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [country, setCountry] = useState('')
  
  const [excludedBreed, setExcludedBreed] = useState([])

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY
  });

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  const newCat = async () => {
    let isFound = false
    let currentBreed
    while (!isFound) {
      const response = await fetch(URL, requestOptions)
      const data = await response.json()
      currentBreed = data[0].breeds[0].name
      if (!excludedBreed.includes(currentBreed)) {
        console.log(data[0])
        setImgURL(data[0].url)
        setBreed(currentBreed)
        setWeight(data[0].breeds[0].weight.imperial)
        setAge(data[0].breeds[0].life_span)
        setCountry(data[0].breeds[0].origin)
        isFound = true
      }
    }
  }

  const exclude = () => {
    if (!excludedBreed.includes(breed)) {
      setExcludedBreed([...excludedBreed, breed])
    }
  }

  return (
    <>
    <BanList />
    <div className='current-container'>
      <h1> Veni Vici!</h1>
      <p>Discover cats from your wildest dreams?</p>
      <div className='details-container'>
        {breed == '' ? <></> : <button onClick={exclude} className='details'>{breed}</button>}
        {age == '' ? <></> : <button className='details'>{age} years</button>}
        {weight == '' ? <></> : <button className='details'>{weight} lbs</button>}
        {breed == '' ? <></> : <button className='details'>{country}</button>}
      </div>
      <img src={imgURL} />
      <button className='discover' onClick={newCat}>Discover!</button>
    </div>
    </>
  )
}
  
export default Current
  