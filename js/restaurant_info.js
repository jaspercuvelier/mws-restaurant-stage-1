let restaurant;
var map;





/**
 * Registering a Service Worker if supported.
 */
if ('serviceWorker' in navigator) {
	var serviceWorkerRegistration = navigator.serviceWorker.register('sw.js');
}
/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
	if (self.restaurant) { // restaurant already fetched!
		callback(null, self.restaurant);
		return;
	}
	const id = getParameterByName('id');
	if (!id) { // no id found in URL
		error = 'No restaurant id in URL';
		callback(error, null);
	} else {
		DBHelper.fetchRestaurantById(id, (error, restaurant) => {
			self.restaurant = restaurant;
			if (!restaurant) {
				console.error(error);
				return;
			}
			fillRestaurantHTML();
			callback(null, restaurant);
		});
	}
};

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
	const name = document.getElementById('restaurant-name');
	name.innerHTML = restaurant.name;

	const address = document.getElementById('restaurant-address');
	address.innerHTML =  restaurant.address;

	const image = document.getElementById('restaurant-img');
	image.className = 'restaurant-img lazy';
	image.src = DBHelper.imageUrlForRestaurant(restaurant);
	image.setAttribute('alt',`Picture of the restaurant: ${restaurant.name}`);
	$('#restaurant-img-medium').attr('srcset',DBHelper.imageUrlForRestaurant(restaurant)+'-medium.webp');
	$('#restaurant-img-large').attr('srcset',DBHelper.imageUrlForRestaurant(restaurant)+'-large.webp');
	$('#restaurant-img-small').attr('src',DBHelper.imageUrlForRestaurant(restaurant)+'-small.webp');
	$('.lazy').Lazy({
		afterLoad: function(element){console.log(element + ' loaded...');},
		onError: function(element) {		console.log('error loading ' + element.data('src'));},
		beforeLoad: function(element) {console.log(element + ' about to be loaded...')},
		effect: 'fadeIn',
		visibleOnly: true,
	});


	const cuisine = document.getElementById('restaurant-cuisine');
	cuisine.innerHTML = restaurant.cuisine_type;

	// fill operating hours
	if (restaurant.operating_hours) {
		fillRestaurantHoursHTML();
	}
	// fill reviews
	fillReviewsHTML();
};

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
};

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
		console.log(self.restaurant);
		return;
	}
	const ul = document.getElementById('reviews-list');
	reviews.forEach(review => {
		ul.appendChild(createReviewHTML(review));
	});
	container.appendChild(ul);
};

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
	const li = document.createElement('li');
	const title = document.createElement('div');
	title.className ='review-title';
	const name = document.createElement('p');
	name.className = 'review-name';
	name.innerHTML = review.name;
	const date = document.createElement('p');
	date.className = 'review-date';
	const formattedDate = new Date(review.createdAt);
	date.innerHTML = formattedDate.getDate() + '/' + parseInt(formattedDate.getMonth()+1) +'/'+ formattedDate.getFullYear();
	title.appendChild(name);
	title.appendChild(date);
	li.appendChild(title);


	//  li.appendChild(date);
	const reviewcontent = document.createElement('div');
	reviewcontent.className='review-content';
	const rating = document.createElement('div');

	rating.className = 'review-rating';
	const ratingHolder = document.createElement('div');
	ratingHolder.className = 'review-stars';

	let ratinghtml = 'RATING: ';
	for (let i=0;i<review.rating;i++)
	{
		ratinghtml = ratinghtml + '★';
	}
	for (let i=0;i<(5-review.rating);i++)
	{
		ratinghtml = ratinghtml + '☆';
	}


	ratingHolder.innerHTML = ratinghtml;// `Rating: ${review.rating}`;
	rating.appendChild(ratingHolder);
	reviewcontent.appendChild(rating);



	const comments = document.createElement('div');
	comments.className = 'review-comments';
	comments.innerHTML = review.comments;
	reviewcontent.appendChild(comments);
	li.appendChild(reviewcontent);

	return li;
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
	const breadcrumb = document.getElementById('breadcrumb');
	breadcrumb.setAttribute('aria-label','Breadcrumb');
	const li = document.createElement('li');
	li.innerHTML = restaurant.name;
	li.setAttribute('aria-current','page');
	breadcrumb.appendChild(li);
};

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
};

/*fetch all reviews*/
/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = () => {

	const container = document.getElementById('reviews-container');

	DBHelper.fetchReviewsForARestaurant(self.restaurant.id, (error, reviews) => {
		if (error) { // Got an error!
			console.error(error);
			const noReviews = document.createElement('p');
			noReviews.innerHTML = 'No reviews yet!';
			container.appendChild(noReviews);
		} else {

			const ul = document.getElementById('reviews-list');

			let reviewsByDate = [];
			//console.log(reviews);
			for (const review of reviews) {
				reviewsByDate.push(review);
			}
			reviewsByDate.forEach(review => {
				ul.appendChild(createReviewHTML(review));
			});

		}
	});
};

sendOrSaveReview = () => {
	console.log('Submit event fired');

	event.preventDefault();
	const  name = $('#form-review-name').val();
	const  rating = $('#form-review-rating').val();
	const  comments = $('#form-review-comment').val();
	const  restaurant_id = parseInt(self.restaurant.id);
	const reviewData = {restaurant_id, name, rating, comments};
	DBHelper.postReview(reviewData, (hasFailed, review) => {
		if (hasFailed) {
			serviceWorkerRegistration
				.then(registration => navigator.serviceWorker.ready)
				.then(registration => {
					registration.sync.register('offlineReviewAdded').then(() => {
						console.log('Post review sync registered');
					});
					toastr.error('There is no internet connection, but your review is saved and will be synced as soon as there is an active connection...','Bummer!');
					$('#reviews-list').append(createReviewHTML(review))
				});
		}
		else {
			$('#reviews-list').append(createReviewHTML(review));
			toastr.success('Saving review...','Saving...');
			$('#review-form').slideUp();
		}

	});

};
