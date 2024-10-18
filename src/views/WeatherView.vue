<template>
  <div class="container">
    <div class="header">
      <h1>Weather App</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input"/>
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>
    
    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

const apikey = "d82681637f577f9628b93cb5fd31a9df"; 

export default {
  name: "WeatherApp",
  data() {
    return {
      city: "", 
      weatherData: null, 
    };
  },
  computed: {
    
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273.15) : null;
    },
    
    iconUrl() {
      return this.weatherData ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png` : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather(); 
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        });
      }
    },
    async searchByCity() {
      if (this.city.trim()) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      } else {
        alert("Please enter a valid city name.");
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
  },
};
</script>

<!-- <style scoped>
.container {
  text-align: center;
  margin-top: 50px;
}

.header {
  margin-bottom: 20px;
}

.search-bar {
  margin-top: 20px;
}

.search-input {
  padding: 10px;
  font-size: 16px;
  width: 300px;
}

.search-button {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
}

main {
  margin-top: 30px;
}

main h2 {
  font-size: 24px;
}

main img {
  width: 100px;
  height: 100px;
}

main p {
  font-size: 24px;
}
</style> -->
