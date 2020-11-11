import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import deleteicon from "./trash-alt-solid.svg";

function App() {
  function changeText(e) {
    setCity(e.target.value);
  }
  function checkWeather() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setcityList([...cityList, response]);
        setCity("");
      });
  }

  function remove(index) {
    let arr = cityList;
    arr = arr.filter((item, index1) => {
      return index1 !== index;
    });
    setcityList(arr);
  }
  const [city, setCity] = useState("");
  const [cityList, setcityList] = useState([]);
  const API_KEY = "19212f7cf4574776bd961912201111";

  const colormapping = {
    Fog: "fog",
    Cloudy: "cloudy",
    "Partly cloudy": "partly_cloudy",
    Sunny: "sunny",
    Mist: "mist",
    Rain: "rainy",
    Clear: "clear",
    Overcast: "overcast",
  };

  return (
    <div className="App">
      <h1>CHECK WEATHER</h1>
      <input
        type="text"
        onChange={(e) => changeText(e)}
        value={city}
        className="input_box"
        placeholder="Enter city name"
      ></input>
      <button onClick={checkWeather} className="btn_click">
        Go to Weather
      </button>
      <div className="container">
        {cityList.map((item, index) => {
          return (
            <div
              className={"desc " + colormapping[item.current.condition.text]}
            >
              <div className="temp">{item.current.temp_c} &#8451;</div>
              <div>{item.current.condition.text}</div>
              <img src={item.current.condition.icon} className="img" />
              <div>{item.location.name}</div>
              <img
                src={deleteicon}
                onClick={(e) => remove(index)}
                className="btn_remove"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
