import './Current.css'
import { useState } from 'react';


function Current() {
  
  const [imgURL, setImgURL] = useState('')
  const [breed, setBreed] = useState('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [country, setCountry] = useState('')

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
    const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=1&order=RANDOM&page=0&limit=1", requestOptions)
    const data = await response.json()
    console.log(data[0])
    setImgURL(data[0].url)
    setBreed(data[0].breeds[0].name)
    setWeight(data[0].breeds[0].weight.imperial)
    setAge(data[0].breeds[0].life_span)
    setCountry(data[0].breeds[0].origin)
  }

  return (

    <div className='current-container'>
      <h1> Veni Vici!</h1>
      <p>Discover cats from your wildest dreams?</p>
      <button onClick={newCat}>Discover!</button>
      <div className='details-container'>
        <button className='details'>{breed}</button>
        <button className='details'>{age}</button>
        <button className='details'>{weight}</button>
        <button className='details'>{country}</button>
      </div>
      <img src={imgURL} />
    </div>
  )
}
  
export default Current
  