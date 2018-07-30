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
		return `http://localhost:${port}/`;
	}

	static dbPromise(){
		return idb.open('restrev',1,function(upgradeDb){
			upgradeDb.createObjectStore('restaurants');
			upgradeDb.createObjectStore('allReviews', {keyPath:'id'}).createIndex('restaurant_id','restaurant_id');
			upgradeDb.createObjectStore('offlineReviews', {autoIncrement:true, keyPath:'id'}).createIndex('restaurant_id','restaurant_id');
		});
	}



	/**
   * Fetch all restaurants.
   */
	static fetchRestaurants(callback) {

		DBHelper.dbPromise().then(function(db) {if (!db){return;}

			const tx= db.transaction('restaurants');
			const store= tx.objectStore('restaurants');
			console.log('Opened DB...');
			return store.getAll();
		}).then(restaurants => {
		//	console.log('found restaurants = '+ restaurants);
			if(restaurants && restaurants.length > 10){
				console.log('Found restaurants in indexedDB and returning them...');
				return callback(null, restaurants);
			}
			else {
				console.log('Sending network request for restaurants...');
				fetch(`${DBHelper.DATABASE_URL}restaurants`).then( response => {
					if (response.status !== 200){
						const error = 'Error! code:' + response.status;
						return callback(error,null);
					}
					response.json().then(restaurants => {
						DBHelper.dbPromise().then(db => {
							console.log('Saving to idb => restaurants...');
							if(!db){return;}
							const tx = db.transaction('restaurants','readwrite');
							const store = tx.objectStore('restaurants');
							//console.log('restaurants die we ontvingen via fetch:' + restaurants);
							for (let restaurant of restaurants)
							{
								store.put(restaurant,restaurant.name);
							}
						});
						return callback(null,restaurants);
					});
				}).catch(error => {console.log('Error while fetching: ' + error);});
			}
		});
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
			  if (restaurant.photograph){

		return (`/img/${restaurant.photograph}`);
		}
		else {
			return '/img/404.webp';
		}
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

	/**
	   * Fetch all reviews for a restaurant.
	   */
	static fetchReviewsForARestaurant(restaurantID, callback) {

		DBHelper.dbPromise().then(function(db) {
			if (!db) return;

			const tx = db.transaction('allReviews');
			const store = tx.objectStore('allReviews');
			const restaurantIDIndex = store.index('restaurant_id');

			return restaurantIDIndex.getAll(restaurantID);
		}).then(reviews => {
			if(reviews && reviews.length >= 1) {
				return callback(null, reviews);
			} else {
				fetch(`${DBHelper.DATABASE_URL}reviews/?restaurant_id=${restaurantID}`)
					.then(
						function(response) {
							if (response.status !== 200) {
								console.log('Looks like there was a problem. Status Code: ' + response.status);
								return callback(error, null);
							}

							response.json().then(function(reviews) {
								DBHelper.dbPromise().then(function(db) {
									if (!db) return;
									const tx = db.transaction('allReviews', 'readwrite');
									const store = tx.objectStore('allReviews');
									//Saving reviews in allReviews-store...
									for (let review of reviews) {
										store.put(review);
									}
								});
								return callback(null, reviews);
							});
						}
					)
					.catch(function(errmessage) {
						console.log('fetchprobleem bij ophalen van reviews voor restaurant met id '+restaurantID+ '! '+ errmessage);
					});
			}
		});
	}


	/**
   * Post a review.
   */
	static postReview(reviewData, callback) {

		fetch('http://localhost:1337/reviews/', {
			method: 'POST',
			body: JSON.stringify(reviewData),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(response => {
			if (response.status !== 201) {
				const error = 'Looks like there was a problem. Status Code: ' + response.status;
				console.log(error);
			}
			response.json().then(function(review) {
				DBHelper.dbPromise().then(function(db) {
					if (!db) return;

					const tx = db.transaction('allReviews', 'readwrite');
					const store = tx.objectStore('allReviews');
					store.put(review);
				});
				return callback(false, review);
			});
		}).catch(function(err) {
			console.log('Fetch Error :-S', err);

			reviewData.createdAt = reviewData.updatedAt = new Date();
			DBHelper.dbPromise().then(function(db) {
				if (!db) return;

				const tx = db.transaction('offlineReviews', 'readwrite');
				const store = tx.objectStore('offlineReviews');
				store.put(reviewData);
			});
			return callback(true, reviewData);
		});
	}

}
