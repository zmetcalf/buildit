import $ from 'jquery';
import 'isomorphic-fetch';
import whatInput from 'what-input';
import Vue from 'vue';

window.$ = $;

import Foundation from 'foundation-sites';

import WeatherComponent from './WeatherComponent';

var vm = new Vue({
  el: '#app',
  render(h) {
    return h("div", [h(WeatherComponent)])
  },
  components: {
    'weather-component': WeatherComponent,
  }
});