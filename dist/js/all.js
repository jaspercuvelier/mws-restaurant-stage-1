/**
 * Common database helper functions.
 */
class DBHelper {

	/**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
	static get DATABASE_URL() {
		const port = 1337; // Change this to your server port
		return `http://localhost:${port}/restaurants/`;
	}

	/**
   * Fetch all restaurants.
   */
	static fetchRestaurants(callback) {
		/*ALS DIT NIET IN DE INDEXEDDB ZIT, FETCH IT, ANDERS OPHALEN UIT INDEXEDDB */
		let xhr = new XMLHttpRequest();
		xhr.open('GET', DBHelper.DATABASE_URL);
		xhr.onload = () => {
			if (xhr.status === 200) { // Got a success response from server!

				const json = JSON.parse(xhr.responseText);

				const restaurants = json;//.restaurants;
				//  console.log(restaurants);
				dbPromise.then(function(db) {
					var tx = db.transaction('restOverviews');
					var restOverviewsStore = tx.objectStore('restOverviews');
					return restOverviewsStore.get('JSON');
				}).then((val) => console.log('returned value is '+ val));

				callback(null, restaurants);
			} else { // Oops!. Got an error from server.
				const error = (`Request failed. Returned status of ${xhr.status}`);
				callback(error, null);
			}
		};
		xhr.send();
	}

	/**
   * Fetch a restaurant by its ID.
   */
	static fetchRestaurantById(id, callback) {
		/* ALS HET NIET IN INDEXEDDB ZIT, OPHALEN, anders laden uit INDEXEDDB*/
		// fetch all restaurants with proper error handling.
		DBHelper.fetchRestaurants((error, restaurants) => {
			if (error) {
				callback(error, null);
			} else {
				const restaurant = restaurants.find(r => r.id == id);
				if (restaurant) { // Got the restaurant
					callback(null, restaurant);
				} else { // Restaurant does not exist in the database
					callback('Restaurant does not exist', null);
				}
			}
		});
	}

	/**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
	static fetchRestaurantByCuisine(cuisine, callback) {
		// Fetch all restaurants  with proper error handling
		DBHelper.fetchRestaurants((error, restaurants) => {
			if (error) {
				callback(error, null);
			} else {
				// Filter restaurants to have only given cuisine type
				const results = restaurants.filter(r => r.cuisine_type == cuisine);
				callback(null, results);
			}
		});
	}

	/**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
	static fetchRestaurantByNeighborhood(neighborhood, callback) {
		// Fetch all restaurants
		DBHelper.fetchRestaurants((error, restaurants) => {
			if (error) {
				callback(error, null);
			} else {
				// Filter restaurants to have only given neighborhood
				const results = restaurants.filter(r => r.neighborhood == neighborhood);
				callback(null, results);
			}
		});
	}

	/**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
	static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
		// Fetch all restaurants
		DBHelper.fetchRestaurants((error, restaurants) => {
			if (error) {
				callback(error, null);
			} else {
				let results = restaurants;
				if (cuisine != 'all') { // filter by cuisine
					results = results.filter(r => r.cuisine_type == cuisine);
				}
				if (neighborhood != 'all') { // filter by neighborhood
					results = results.filter(r => r.neighborhood == neighborhood);
				}
				callback(null, results);
			}
		});
	}

	/**
   * Fetch all neighborhoods with proper error handling.
   */
	static fetchNeighborhoods(callback) {
		// Fetch all restaurants
		DBHelper.fetchRestaurants((error, restaurants) => {
			if (error) {
				callback(error, null);
			} else {
				// Get all neighborhoods from all restaurants
				const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
				// Remove duplicates from neighborhoods
				const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
				callback(null, uniqueNeighborhoods);
			}
		});
	}

	/**
   * Fetch all cuisines with proper error handling.
   */
	static fetchCuisines(callback) {
		// Fetch all restaurants
		DBHelper.fetchRestaurants((error, restaurants) => {
			if (error) {
				callback(error, null);
			} else {
				// Get all cuisines from all restaurants
				const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
				// Remove duplicates from cuisines
				const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
				callback(null, uniqueCuisines);
			}
		});
	}

	/**
   * Restaurant page URL.
   */
	static urlForRestaurant(restaurant) {
		return (`./restaurant.html?id=${restaurant.id}`);
	}

	/**
   * Restaurant image URL.
   */
	static imageUrlForRestaurant(restaurant) {
		//returns only filename without the file extension...
		//  if (restaurant.photograph){

		return (`/img/${restaurant.photograph}`);
		//  }
		//   else{
		//      return (`/img/5`);

		//    }
	}

	/**
   * Map marker for a restaurant.
   */
	static mapMarkerForRestaurant(restaurant, map) {
		const marker = new google.maps.Marker({
			position: restaurant.latlng,
			title: restaurant.name,
			url: DBHelper.urlForRestaurant(restaurant),
			map: map,
			animation: google.maps.Animation.DROP}
		);
		return marker;
	}

}

//INDEXCONTROLLER START
var idb = import('idb');
var dbPromise = idb.open('restrev',1,function(upgradeDb){
	var restOverviewsStore = upgradeDb.createObjectStore('restOverviews');
	restOverviewsStore.put('hier komen de JSON waarden.','JSON');
});

dbPromise.then(function(db) {
	var tx = db.transaction('restOverviews');
	var restOverviewsStore = tx.objectStore('restOverviews');
	return restOverviewsStore.get('JSON');
}).then((val) => console.log('returned value is '+ val));

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
		console.log('ServiceWorker enabled!! >> ' +resp);
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


	updateRestaurants();
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
	});
	addMarkersToMap();
};

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
	const li = document.createElement('li');

	const image = document.createElement('img');
	image.className = 'restaurant-img';
	image.src = DBHelper.imageUrlForRestaurant(restaurant)+'-small.jpg';
	image.setAttribute('alt',`Picture of the restaurant: ${restaurant.name}`);
	li.append(image);

	const name = document.createElement('h3');
	const restlink = document.createElement('a');
	restlink.innerHTML = restaurant.name;
	restlink.href = DBHelper.urlForRestaurant(restaurant);
	name.appendChild(restlink);

	li.append(name);

	const neighborhood = document.createElement('p');
	neighborhood.innerHTML = '<i class="material-icons">place</i>' + restaurant.neighborhood;
	li.append(neighborhood);

	const address = document.createElement('p');
	address.innerHTML =  restaurant.address;
	li.append(address);

	/*const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  li.append(more)*/

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

let restaurant;
var map;




/**
 * Initialize Google map, called from HTML.
   
window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
}
*/

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = '<i class="material-icons">place</i>' + restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
    image.setAttribute("alt",`Picture of the restaurant: ${restaurant.name}`);
  $("#restaurant-img-medium").attr("srcset",DBHelper.imageUrlForRestaurant(restaurant)+"-medium.jpg");
  $("#restaurant-img-large").attr("srcset",DBHelper.imageUrlForRestaurant(restaurant)+"-large.jpg");
$("#restaurant-img-small").attr("src",DBHelper.imageUrlForRestaurant(restaurant)+"-small.jpg");

    //const image_medium = document.getElementsByTagName[0]('source');
  //image_medium.className = 'TESTKLAS'//setAttribute("srcset","TESTMAN.jpg");



  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  const title = document.createElement('div')
  title.className ='review-title'
  const name = document.createElement('p')
  name.className = 'review-name';
  name.innerHTML = review.name;
  const date = document.createElement('p');
  date.className = 'review-date';
  date.innerHTML = review.date;
  title.appendChild(name)
  title.appendChild(date)
  li.appendChild(title);


//  li.appendChild(date);
  const reviewcontent = document.createElement('div');
  reviewcontent.className='review-content';
  const rating = document.createElement('div');

  rating.className = "review-rating";
  const ratingHolder = document.createElement('div');
  ratingHolder.className = 'review-stars'

  let ratinghtml = 'RATING: ';
  for (let i=0;i<review.rating;i++)
    {
      ratinghtml = ratinghtml + '<i class="material-icons smallicons">star</i>'
    }
  for (let i=0;i<(5-review.rating);i++)
      {
        ratinghtml = ratinghtml + '<i class="material-icons smallicons">star_border</i>'
      }


    ratingHolder.innerHTML = ratinghtml// `Rating: ${review.rating}`;
    rating.appendChild(ratingHolder);
  reviewcontent.appendChild(rating);



  const comments = document.createElement('div');
  comments.className = 'review-comments'
  comments.innerHTML = review.comments;
  reviewcontent.appendChild(comments)
  li.appendChild(reviewcontent);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  breadcrumb.setAttribute("aria-label","Breadcrumb");
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  li.setAttribute("aria-current","page");
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
