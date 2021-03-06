let restaurants,
	neighborhoods,
	cuisines;
var map;
var markers = [];




/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */


enableServiceWorker = () =>{
	if (!navigator.serviceWorker) return;
	navigator.serviceWorker.register('sw.js').then(function(resp) {
		console.log('ServiceWorker enabled!! ');
	}).catch(function(err) {
		console.log('SW >> Dooh!' + err);
	});

};









/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
	DBHelper.fetchNeighborhoods((error, neighborhoods) => {
		if (error) { // Got an error
			console.error(error);
		} else {
			self.neighborhoods = neighborhoods;
			console.log('filling neighborhoods');
			fillNeighborhoodsHTML();
		}
	});
};

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
	const select = document.getElementById('neighborhoods-select');
	neighborhoods.forEach(neighborhood => {
		const option = document.createElement('option');
		option.innerHTML = neighborhood;
		option.value = neighborhood;
		select.append(option);
	});
};

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
	DBHelper.fetchCuisines((error, cuisines) => {
		if (error) { // Got an error!
			console.error(error);
		} else {
			self.cuisines = cuisines;
			fillCuisinesHTML();
		}
	});
};

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
	const select = document.getElementById('cuisines-select');

	cuisines.forEach(cuisine => {
		const option = document.createElement('option');
		option.innerHTML = cuisine;
		option.value = cuisine;
		select.append(option);
	});
};

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
	let loc = {
		lat: 40.722216,
		lng: -73.987501
	};
	self.map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: loc,
		scrollwheel: false
	});

	// remove tabindex items


//	updateRestaurants();
};


/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
	const cSelect = document.getElementById('cuisines-select');
	const nSelect = document.getElementById('neighborhoods-select');

	const cIndex = cSelect.selectedIndex;
	const nIndex = nSelect.selectedIndex;

	const cuisine = cSelect[cIndex].value;
	const neighborhood = nSelect[nIndex].value;

	DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
		if (error) { // Got an error!
			console.error(error);
		} else {
			resetRestaurants(restaurants);
			fillRestaurantsHTML();

		}
	});
};

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
	// Remove all restaurants
	self.restaurants = [];
	const ul = document.getElementById('restaurants-list');
	ul.innerHTML = '';

	// Remove all map markers
	self.markers.forEach(m => m.setMap(null));
	self.markers = [];
	self.restaurants = restaurants;
};

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
	const ul = document.getElementById('restaurants-list');
	restaurants.forEach(restaurant => {
		ul.append(createRestaurantHTML(restaurant));
		$('.lazy').Lazy({
			afterLoad: function(element){console.log(element + ' loaded...');},
			onError: function(element) {		console.log('error loading ' + element.data('src'));},
			beforeLoad: function(element) {console.log(element + ' about to be loaded...')},
			effect: 'fadeIn',
			visibleOnly: true,
		});
	});

	addMarkersToMap();

};

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
	console.log(JSON.stringify(restaurant))
	const li = document.createElement('li');

	const image = document.createElement('img');
	image.className = 'restaurant-img lazy';
	image.src = '/img/404.webp';//DBHelper.imageUrlForRestaurant(restaurant)+'-small.jpg';
	image.setAttribute('alt',`Picture of the restaurant: ${restaurant.name}`);
	image.setAttribute('data-src',DBHelper.imageUrlForRestaurant(restaurant)+'-small.webp' );
	li.append(image);

	const name = document.createElement('h3');
	const restlink = document.createElement('a');
	restlink.innerHTML = restaurant.name;
	restlink.href = DBHelper.urlForRestaurant(restaurant);
	name.appendChild(restlink);

	li.append(name);

	const neighborhood = document.createElement('p');
	neighborhood.innerHTML = restaurant.neighborhood;
	li.append(neighborhood);

	const address = document.createElement('p');
	address.innerHTML =  restaurant.address;
	li.append(address);


	return li;
};

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
	restaurants.forEach(restaurant => {
		// Add marker to the map
		const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
		google.maps.event.addListener(marker, 'click', () => {
			window.location.href = marker.url;
		});
		self.markers.push(marker);
	});
};
