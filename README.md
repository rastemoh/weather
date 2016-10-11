# Weather
a simple HTML/JS app based on AngularJS v1 which, when you open the site, asks for a permission to read your current location, and then uses the http://openweathermap.org/current public API to fetch the weather for that location and displays it.
If the user denies to share the location, a little input form is shown for entering postcode or country, and then the weather based on that location is displayed.

The openweathermap API is served as HTTP and not HTTPS, so if you serve this site on https, weather requests might have problems and could not fetch weather data
Visit https://rastemoh.github.io/weather/