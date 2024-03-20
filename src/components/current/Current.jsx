import './Current.css'
import { useState } from 'react';


function Current() {
  
  const [imgURL, setImgURL] = useState('');

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
  const response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
  const data = await response.json()
  console.log(data[0].url)
  setImgURL(data[0].url)
  }

  return (
    <div className='current-container'>
      <h1> Veni Vici!</h1>
      <p>Discover cats from your wildest dreams?</p>
      <button onClick={newCat}>Discover!</button>
      <img src={imgURL} />
    </div>
  )
}
  
export default Current
  