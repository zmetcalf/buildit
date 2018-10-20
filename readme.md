# Buildit

## Front End Engineering Excersise Request

[![devDependency Status](https://david-dm.org/zurb/foundation-zurb-template/dev-status.svg)](https://david-dm.org/zurb/foundation-zurb-template#info=devDependencies)


### About this excersise

#### To Install/Run/Build/Test Page
* Install - `npm install`
* Run     - `npm start`
* Build   - `npm run build`
* Test    - `npm test`

#### My Thought Process
I chose to start my project with a project template from
the Zurb Foundation to expidite the setup process. Also,
their built in styling helped knockout out some mobile layout
setup. I added the Vue.js framework to assist in the application
logic. I used lodash to simplify some of the array and object
handling. Also, instead of using jQuery's ajax methods or
legacy XMLHttpRequest functions, I chose to use the new Fetch API.
When receiving the API, I originally expected a daily high/low;
however, it produced 3 hour blocks, so I grouped them by
day of the week and displayed the most pertantent information.
I also added a very basic location updater input box to change
the default location from Denver. For a CSS3 transition, I
added a hover event on each day of the week.

#### Tradeoffs
The major tradeoff was using a project template for the project.
I generally start from scratch by setting up preprocessors,
transpilers, and other build processes to match the needs of
the project.

#### Additional Dev Time Features
* Design
* Custom build system
* Use of Navigator JS API to locate users devices.
* Weather icons
* Use of Geolocation API to obtain better locations for better results from OpenWeatherMap
* Change backround based on current weather conditions.
