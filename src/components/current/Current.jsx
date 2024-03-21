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
  
  const [excludedList, setExcludedList] = useState([])

  function updateExcludedList(newList) {
    setExcludedList(newList);
  }

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
    let currentCountry
    while (!isFound) {
      const response = await fetch(URL, requestOptions)
      const data = await response.json()
      currentBreed = data[0].breeds[0].name
      currentCountry = data[0].breeds[0].origin

      if (!excludedList.includes(currentBreed) && !excludedList.includes(currentCountry)) {
        console.log(data[0])
        setImgURL(data[0].url)
        setBreed(currentBreed)
        setWeight(data[0].breeds[0].weight.imperial)
        setAge(data[0].breeds[0].life_span)
        setCountry(currentCountry)
        isFound = true
      }
    }
  }

  const excludeBreed = () => {
    if (!excludedList.includes(breed)) {
      setExcludedList([...excludedList, breed])
    }
  }

  const excludeCountry = () => {
    if (!excludedList.includes(country)) {
      setExcludedList([...excludedList, country])
    }
  }

  return (
    <>
    <BanList excludedList={excludedList} updateExcludedList={updateExcludedList}/>
    <div className='current-container'>
      <h1> Veni Vici!</h1>
      <p>Discover cats from your wildest dreams?</p>
      <div className='details-container'>
        {breed == '' ? <></> : <button onClick={excludeBreed} className='details'>{breed}</button>}
        {country == '' ? <></> : <button onClick={excludeCountry} className='details'>{country}</button>}
        {age == '' ? <></> : <button className='details-no-click'>{age} years</button>}
        {weight == '' ? <></> : <button className='details-no-click'>{weight} lbs</button>}
      </div>
      <img src={imgURL} />
      <button className='discover' onClick={newCat}>Discover!</button>
    </div>
    </>
  )
}
  
export default Current
  