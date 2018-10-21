<template>
  <main>
    <div class='grid-x'>
      <div class='large-auto'>
        <div class="top-bar" id="responsive-menu">
          <div class="top-bar-left">
            <ul class="dropdown menu" data-dropdown-menu>
              <li class="menu-text">5 Day Weather Forcast in {{ location }}</li>
            </ul>
          </div>
          <div class="top-bar-right">
            <ul class="menu">
              <li><input type="search"
                         placeholder="Location"
                         v-model='newLocation'
                         @keyup.enter='updateLocation'></li>
              <li><button type="button"
                          class="button"
                          @click='updateLocation'>Update Location</button></li>
            </ul>
          </div>
        </div>

        <div class="weather-blocks grid-x grid-margin-x" data-equalizer data-equalize-on="medium" id="test-eq">
          <div v-for='(list, day) in weather' :key='day.id' class="cell large-auto">
            <div class="callout" data-equalizer-watch>
              <h4>{{ day }}</h4>
              <div v-for='item in list' :key='item.id'>
                <p>{{ getHour(item.dt) }}: {{ getWeatherStatus(item) }} {{ getTemp(item) }}&deg;F</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';

const WEATHER_API_KEY = '2fa8331228125104dfc0478c0e13d10a';

export default {
  name: 'weather-component',
  data() {
    return {
      location: 'Denver',
      newLocation: '',
      weather: [],
    };
  },
  methods: {
    getLocation() {
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

    updateLocation() {
      this.location = this.newLocation;
      this.getLocation();
    },

    getHour(dt) {
      return moment(dt * 1000).format('h a');
    },

    setWeather(list) {
      this.weather = _.groupBy(list, item =>
				moment(item.dt * 1000).format('dddd'));
			return this.weather; // For tests
    },

    getWeatherStatus(item) {
      return item.weather && _.first(item.weather).main;
    },

    getTemp(item) {
      return item.main && Math.round(item.main.temp);
    }
  },

  mounted() {
    this.getLocation();
  },
};
</script>
