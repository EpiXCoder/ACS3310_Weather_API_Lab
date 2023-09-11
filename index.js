async function fetchWeatherData(apikey, path) {
  try {
      const res = await fetch(path);
      if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();

      return {
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          cityName: data.name,
          icon: data.weather[0].icon,
          country: data.sys.country
      };
  } catch (err) {
      console.error(err.message);
      return null;
  }
}

async function getWeatherByZip(apikey, zip, unit = 'imperial') {
  const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${unit}`;
  return await fetchWeatherData(apikey, path);
}

async function getWeatherByCity(apikey, city, unit = 'imperial') {
  const path = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${unit}`;
  return await fetchWeatherData(apikey, path);
}

async function getWeatherByGeo(apikey, lat, lon, unit = 'imperial') {
  const path = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=${unit}`;
  return await fetchWeatherData(apikey, path);
}

export { getWeatherByZip, getWeatherByCity, getWeatherByGeo };
