import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {

  function changeText(e){
    setCity(e.target.value)

  }
  function checkWeather()
  
{
  fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)   //requesting server to give  response after
  // we provide API and city
    .then(response => response.json())
    .then((response) => {
        console.log(response);
          setcityList([...cityList,response])
    })

}
  const [city,setCity] = useState("")
  const [cityList,setcityList] = useState([])
  const API_KEY = "19212f7cf4574776bd961912201111"



  return (
    <div className="App">
      <input type="text" onChange={(e)=>changeText(e)} value={city}></input>
      <button onClick={checkWeather}>Go to Weather</button>
      {cityList.map(item=>{
        return (
          <div className="desc">
        <div>{item.current.temp_c}</div>
        <div>{item.current.condition.text}</div>
        <img src={item.current.condition.icon} className="img"/>
        <div>{item.location.name}</div>
        </div>
        )
      })}
    </div>
  );
}

export default App;
