<template>
  <main>
    <h1>5 Day Weather Forcast in {{ location }}</h1>
    <div class="grid-x grid-margin-x" data-equalizer data-equalize-on="medium" id="test-eq">
      <div v-for='(list, day) in weather' :key='day.id' class="cell medium-2">
        <div class="callout" data-equalizer-watch>
          <h3>{{ day }}</h3>
          <div v-for='item in list' :key='item.id'>
            <p>{{ getHour(item.dt) }}: {{ getWeatherStatus(item) }} {{ getTemp(item) }}&deg;F</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import _ from 'lodash';

const WEATHER_API_KEY = '2fa8331228125104dfc0478c0e13d10a';

export default {
  name: 'weather-component',
  data() {
    return {
      location: 'Denver',
      weather: [],
    };
  },
  methods: {
    hydrate() {
      const self = this;
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.location}&units=imperial&APPID=${WEATHER_API_KEY}`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          if(json && json.list) self.setWeather(json.list);
        })
        .catch(e => {
          console.error(e);
        }); 
    },
    
    getHour(dt) {
      return (new Date(dt * 1000)).toLocaleDateString(
      'en-US',
      { 
        hour: 'numeric', 
        hour12: true,
      })
      .split(', ')[1];
    },
    
    setWeather(list) {
      this.weather = _.groupBy(list, item => (new Date(item.dt * 1000)).toLocaleDateString(
        'en-US',
        { 
          weekday: 'long',
        })
      );
    },

    getWeatherStatus(item) {
      return item.weather && _.first(item.weather).main;
    },
    
    getTemp(item) {
      return item.main && Math.round(item.main.temp);
    }
  },
    
  mounted() {
    this.hydrate();
  },
};
</script>