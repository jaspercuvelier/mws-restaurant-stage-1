let restaurant;
var map;




/**
 * Initialize Google map, called from HTML.
 */
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
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
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
