!function(e){e(['jquery'],function(e){return function(){function t(e,t,n){return g({type:O.error,iconClass:m().iconClasses.error,message:e,optionsOverride:n,title:t});}function n(t,n){return t||(t=m()),v=e('#'+t.containerId),v.length?v:(n&&(v=d(t)),v);}function o(e,t,n){return g({type:O.info,iconClass:m().iconClasses.info,message:e,optionsOverride:n,title:t});}function s(e){C=e;}function i(e,t,n){return g({type:O.success,iconClass:m().iconClasses.success,message:e,optionsOverride:n,title:t});}function a(e,t,n){return g({type:O.warning,iconClass:m().iconClasses.warning,message:e,optionsOverride:n,title:t});}function r(e,t){var o=m();v||n(o),u(e,o,t)||l(o);}function c(t){var o=m();return v||n(o),t&&0===e(':focus',t).length?void h(t):void(v.children().length&&v.remove());}function l(t){for(var n=v.children(),o=n.length-1;o>=0;o--)u(e(n[o]),t);}function u(t,n,o){var s=!(!o||!o.force)&&o.force;return!(!t||!s&&0!==e(':focus',t).length)&&(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t);}}),!0);}function d(t){return v=e('<div/>').attr('id',t.containerId).addClass(t.positionClass),v.appendTo(e(t.target)),v;}function p(){return{tapToDismiss:!0,toastClass:'toast',containerId:'toast-container',debug:!1,showMethod:'fadeIn',showDuration:300,showEasing:'swing',onShown:void 0,hideMethod:'fadeOut',hideDuration:1e3,hideEasing:'swing',onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:1e3,iconClasses:{error:'toast-error',info:'toast-info',success:'toast-success',warning:'toast-warning'},iconClass:'toast-info',positionClass:'toast-top-right',timeOut:5e3,titleClass:'toast-title',messageClass:'toast-message',escapeHtml:!1,target:'body',closeHtml:'<button type="button">&times;</button>',closeClass:'toast-close-button',newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:'toast-progress',rtl:!1};}function f(e){C&&C(e);}function g(t){function o(e){return null==e&&(e=''),e.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}function s(){c(),u(),d(),p(),g(),C(),l(),i();}function i(){var e='';switch(t.iconClass){case'toast-success':case'toast-info':e='polite';break;default:e='assertive';}I.attr('aria-live',e);}function a(){E.closeOnHover&&I.hover(H,D),!E.onclick&&E.tapToDismiss&&I.click(b),E.closeButton&&j&&j.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),E.onCloseClick&&E.onCloseClick(e),b(!0);}),E.onclick&&I.click(function(e){E.onclick(e),b();});}function r(){I.hide(),I[E.showMethod]({duration:E.showDuration,easing:E.showEasing,complete:E.onShown}),E.timeOut>0&&(k=setTimeout(b,E.timeOut),F.maxHideTime=parseFloat(E.timeOut),F.hideEta=(new Date).getTime()+F.maxHideTime,E.progressBar&&(F.intervalId=setInterval(x,10)));}function c(){t.iconClass&&I.addClass(E.toastClass).addClass(y);}function l(){E.newestOnTop?v.prepend(I):v.append(I);}function u(){if(t.title){var e=t.title;E.escapeHtml&&(e=o(t.title)),M.append(e).addClass(E.titleClass),I.append(M);}}function d(){if(t.message){var e=t.message;E.escapeHtml&&(e=o(t.message)),B.append(e).addClass(E.messageClass),I.append(B);}}function p(){E.closeButton&&(j.addClass(E.closeClass).attr('role','button'),I.prepend(j));}function g(){E.progressBar&&(q.addClass(E.progressClass),I.prepend(q));}function C(){E.rtl&&I.addClass('rtl');}function O(e,t){if(e.preventDuplicates){if(t.message===w)return!0;w=t.message;}return!1;}function b(t){var n=t&&E.closeMethod!==!1?E.closeMethod:E.hideMethod,o=t&&E.closeDuration!==!1?E.closeDuration:E.hideDuration,s=t&&E.closeEasing!==!1?E.closeEasing:E.hideEasing;if(!e(':focus',I).length||t)return clearTimeout(F.intervalId),I[n]({duration:o,easing:s,complete:function(){h(I),clearTimeout(k),E.onHidden&&'hidden'!==P.state&&E.onHidden(),P.state='hidden',P.endTime=new Date,f(P);}});}function D(){(E.timeOut>0||E.extendedTimeOut>0)&&(k=setTimeout(b,E.extendedTimeOut),F.maxHideTime=parseFloat(E.extendedTimeOut),F.hideEta=(new Date).getTime()+F.maxHideTime);}function H(){clearTimeout(k),F.hideEta=0,I.stop(!0,!0)[E.showMethod]({duration:E.showDuration,easing:E.showEasing});}function x(){var e=(F.hideEta-(new Date).getTime())/F.maxHideTime*100;q.width(e+'%');}var E=m(),y=t.iconClass||E.iconClass;if('undefined'!=typeof t.optionsOverride&&(E=e.extend(E,t.optionsOverride),y=t.optionsOverride.iconClass||y),!O(E,t)){T++,v=n(E,!0);var k=null,I=e('<div/>'),M=e('<div/>'),B=e('<div/>'),q=e('<div/>'),j=e(E.closeHtml),F={intervalId:null,hideEta:null,maxHideTime:null},P={toastId:T,state:'visible',startTime:new Date,options:E,map:t};return s(),r(),a(),f(P),E.debug&&console&&console.log(P),I;}}function m(){return e.extend({},p(),b.options);}function h(e){v||(v=n()),e.is(':visible')||(e.remove(),e=null,0===v.children().length&&(v.remove(),w=void 0));}var v,C,w,T=0,O={error:'error',info:'info',success:'success',warning:'warning'},b={clear:r,remove:c,error:t,getContainer:n,info:o,options:{},subscribe:s,success:i,version:'2.1.4',warning:a};return b;}();});}('function'==typeof define&&define.amd?define:function(e,t){'undefined'!=typeof module&&module.exports?module.exports=t(require('jquery')):window.toastr=t(window.jQuery);});
//# sourceMappingURL=toastr.js.map

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
			console.log('found restaurants = '+ restaurants);
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
							console.log('restaurants die we ontvingen via fetch:' + restaurants);
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
		//	  if (restaurant.photograph){

		return (`/img/${restaurant.photograph}`);

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

'use strict';

(function() {
	function toArray(arr) {
		return Array.prototype.slice.call(arr);
	}

	function promisifyRequest(request) {
		return new Promise(function(resolve, reject) {
			request.onsuccess = function() {
				resolve(request.result);
			};

			request.onerror = function() {
				reject(request.error);
			};
		});
	}

	function promisifyRequestCall(obj, method, args) {
		var request;
		var p = new Promise(function(resolve, reject) {
			request = obj[method].apply(obj, args);
			promisifyRequest(request).then(resolve, reject);
		});

		p.request = request;
		return p;
	}

	function promisifyCursorRequestCall(obj, method, args) {
		var p = promisifyRequestCall(obj, method, args);
		return p.then(function(value) {
			if (!value) return;
			return new Cursor(value, p.request);
		});
	}

	function proxyProperties(ProxyClass, targetProp, properties) {
		properties.forEach(function(prop) {
			Object.defineProperty(ProxyClass.prototype, prop, {
				get: function() {
					return this[targetProp][prop];
				},
				set: function(val) {
					this[targetProp][prop] = val;
				}
			});
		});
	}

	function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
		properties.forEach(function(prop) {
			if (!(prop in Constructor.prototype)) return;
			ProxyClass.prototype[prop] = function() {
				return promisifyRequestCall(this[targetProp], prop, arguments);
			};
		});
	}

	function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
		properties.forEach(function(prop) {
			if (!(prop in Constructor.prototype)) return;
			ProxyClass.prototype[prop] = function() {
				return this[targetProp][prop].apply(this[targetProp], arguments);
			};
		});
	}

	function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
		properties.forEach(function(prop) {
			if (!(prop in Constructor.prototype)) return;
			ProxyClass.prototype[prop] = function() {
				return promisifyCursorRequestCall(this[targetProp], prop, arguments);
			};
		});
	}

	function Index(index) {
		this._index = index;
	}

	proxyProperties(Index, '_index', [
		'name',
		'keyPath',
		'multiEntry',
		'unique'
	]);

	proxyRequestMethods(Index, '_index', IDBIndex, [
		'get',
		'getKey',
		'getAll',
		'getAllKeys',
		'count'
	]);

	proxyCursorRequestMethods(Index, '_index', IDBIndex, [
		'openCursor',
		'openKeyCursor'
	]);

	function Cursor(cursor, request) {
		this._cursor = cursor;
		this._request = request;
	}

	proxyProperties(Cursor, '_cursor', [
		'direction',
		'key',
		'primaryKey',
		'value'
	]);

	proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
		'update',
		'delete'
	]);

	// proxy 'next' methods
	['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
		if (!(methodName in IDBCursor.prototype)) return;
		Cursor.prototype[methodName] = function() {
			var cursor = this;
			var args = arguments;
			return Promise.resolve().then(function() {
				cursor._cursor[methodName].apply(cursor._cursor, args);
				return promisifyRequest(cursor._request).then(function(value) {
					if (!value) return;
					return new Cursor(value, cursor._request);
				});
			});
		};
	});

	function ObjectStore(store) {
		this._store = store;
	}

	ObjectStore.prototype.createIndex = function() {
		return new Index(this._store.createIndex.apply(this._store, arguments));
	};

	ObjectStore.prototype.index = function() {
		return new Index(this._store.index.apply(this._store, arguments));
	};

	proxyProperties(ObjectStore, '_store', [
		'name',
		'keyPath',
		'indexNames',
		'autoIncrement'
	]);

	proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
		'put',
		'add',
		'delete',
		'clear',
		'get',
		'getAll',
		'getKey',
		'getAllKeys',
		'count'
	]);

	proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
		'openCursor',
		'openKeyCursor'
	]);

	proxyMethods(ObjectStore, '_store', IDBObjectStore, [
		'deleteIndex'
	]);

	function Transaction(idbTransaction) {
		this._tx = idbTransaction;
		this.complete = new Promise(function(resolve, reject) {
			idbTransaction.oncomplete = function() {
				resolve();
			};
			idbTransaction.onerror = function() {
				reject(idbTransaction.error);
			};
			idbTransaction.onabort = function() {
				reject(idbTransaction.error);
			};
		});
	}

	Transaction.prototype.objectStore = function() {
		return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
	};

	proxyProperties(Transaction, '_tx', [
		'objectStoreNames',
		'mode'
	]);

	proxyMethods(Transaction, '_tx', IDBTransaction, [
		'abort'
	]);

	function UpgradeDB(db, oldVersion, transaction) {
		this._db = db;
		this.oldVersion = oldVersion;
		this.transaction = new Transaction(transaction);
	}

	UpgradeDB.prototype.createObjectStore = function() {
		return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
	};

	proxyProperties(UpgradeDB, '_db', [
		'name',
		'version',
		'objectStoreNames'
	]);

	proxyMethods(UpgradeDB, '_db', IDBDatabase, [
		'deleteObjectStore',
		'close'
	]);

	function DB(db) {
		this._db = db;
	}

	DB.prototype.transaction = function() {
		return new Transaction(this._db.transaction.apply(this._db, arguments));
	};

	proxyProperties(DB, '_db', [
		'name',
		'version',
		'objectStoreNames'
	]);

	proxyMethods(DB, '_db', IDBDatabase, [
		'close'
	]);

	// Add cursor iterators
	// TODO: remove this once browsers do the right thing with promises
	['openCursor', 'openKeyCursor'].forEach(function(funcName) {
		[ObjectStore, Index].forEach(function(Constructor) {
			Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
				var args = toArray(arguments);
				var callback = args[args.length - 1];
				var nativeObject = this._store || this._index;
				var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
				request.onsuccess = function() {
					callback(request.result);
				};
			};
		});
	});

	// polyfill getAll
	[Index, ObjectStore].forEach(function(Constructor) {
		if (Constructor.prototype.getAll) return;
		Constructor.prototype.getAll = function(query, count) {
			var instance = this;
			var items = [];

			return new Promise(function(resolve) {
				instance.iterateCursor(query, function(cursor) {
					if (!cursor) {
						resolve(items);
						return;
					}
					items.push(cursor.value);

					if (count !== undefined && items.length == count) {
						resolve(items);
						return;
					}
					cursor.continue();
				});
			});
		};
	});

	var exp = {
		open: function(name, version, upgradeCallback) {
			var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
			var request = p.request;

			request.onupgradeneeded = function(event) {
				if (upgradeCallback) {
					upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
				}
			};

			return p.then(function(db) {
				return new DB(db);
			});
		},
		delete: function(name) {
			return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
		}
	};

	if (typeof module !== 'undefined') {
		module.exports = exp;
		module.exports.default = module.exports;
	}
	else {
		self.idb = exp;
	}
}());

//INDEXCONTROLLER START
//import idb from 'idb';


/*
	var dbPromise = idb.open('restrev',1,function(upgradeDb){
		var restOverviewsStore = upgradeDb.createObjectStore('restOverviews');
    console.log("RestOverviews >> OS created")
  return upgradeDb;

});
else{

  let xhr = new XMLHttpRequest();
  xhr.open('GET', DBHelper.DATABASE_URL);
  xhr.onload = () => {
    if (xhr.status === 200) { // Got a success response from server!

      const json = JSON.parse(xhr.responseText);

      const restaurants = json;//.restaurants;
      //  console.log(restaurants);
      var dbPromise = idb.open('restrev',1,function(db){
        var restOverviewsStore = db.createObjectStore('restOverviews');
        restOverviewsStore.put(restaurants,'JSON');
        callback(null, restaurants);
      });








    } else { // Oops!. Got an error from server.
      const error = (`Request failed. Returned status of ${xhr.status}`);
      callback(error, null);
    }
  };
  xhr.send();
}
}
);
}














*/

/*! jQuery & Zepto Lazy v1.7.8 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2018 Daniel 'Eisbehr' Kern */
!function(t,e){"use strict";function r(r,a,i,u,l){function f(){L=t.devicePixelRatio>1,i=c(i),a.delay>=0&&setTimeout(function(){s(!0)},a.delay),(a.delay<0||a.combined)&&(u.e=v(a.throttle,function(t){"resize"===t.type&&(w=B=-1),s(t.all)}),u.a=function(t){t=c(t),i.push.apply(i,t)},u.g=function(){return i=n(i).filter(function(){return!n(this).data(a.loadedName)})},u.f=function(t){for(var e=0;e<t.length;e++){var r=i.filter(function(){return this===t[e]});r.length&&s(!1,r)}},s(),n(a.appendScroll).on("scroll."+l+" resize."+l,u.e))}function c(t){var i=a.defaultImage,o=a.placeholder,u=a.imageBase,l=a.srcsetAttribute,f=a.loaderAttribute,c=a._f||{};t=n(t).filter(function(){var t=n(this),r=m(this);return!t.data(a.handledName)&&(t.attr(a.attribute)||t.attr(l)||t.attr(f)||c[r]!==e)}).data("plugin_"+a.name,r);for(var s=0,d=t.length;s<d;s++){var A=n(t[s]),g=m(t[s]),h=A.attr(a.imageBaseAttribute)||u;g===N&&h&&A.attr(l)&&A.attr(l,b(A.attr(l),h)),c[g]===e||A.attr(f)||A.attr(f,c[g]),g===N&&i&&!A.attr(E)?A.attr(E,i):g===N||!o||A.css(O)&&"none"!==A.css(O)||A.css(O,"url('"+o+"')")}return t}function s(t,e){if(!i.length)return void(a.autoDestroy&&r.destroy());for(var o=e||i,u=!1,l=a.imageBase||"",f=a.srcsetAttribute,c=a.handledName,s=0;s<o.length;s++)if(t||e||A(o[s])){var g=n(o[s]),h=m(o[s]),b=g.attr(a.attribute),v=g.attr(a.imageBaseAttribute)||l,p=g.attr(a.loaderAttribute);g.data(c)||a.visibleOnly&&!g.is(":visible")||!((b||g.attr(f))&&(h===N&&(v+b!==g.attr(E)||g.attr(f)!==g.attr(F))||h!==N&&v+b!==g.css(O))||p)||(u=!0,g.data(c,!0),d(g,h,v,p))}u&&(i=n(i).filter(function(){return!n(this).data(c)}))}function d(t,e,r,i){++z;var o=function(){y("onError",t),p(),o=n.noop};y("beforeLoad",t);var u=a.attribute,l=a.srcsetAttribute,f=a.sizesAttribute,c=a.retinaAttribute,s=a.removeAttribute,d=a.loadedName,A=t.attr(c);if(i){var g=function(){s&&t.removeAttr(a.loaderAttribute),t.data(d,!0),y(T,t),setTimeout(p,1),g=n.noop};t.off(I).one(I,o).one(D,g),y(i,t,function(e){e?(t.off(D),g()):(t.off(I),o())})||t.trigger(I)}else{var h=n(new Image);h.one(I,o).one(D,function(){t.hide(),e===N?t.attr(C,h.attr(C)).attr(F,h.attr(F)).attr(E,h.attr(E)):t.css(O,"url('"+h.attr(E)+"')"),t[a.effect](a.effectTime),s&&(t.removeAttr(u+" "+l+" "+c+" "+a.imageBaseAttribute),f!==C&&t.removeAttr(f)),t.data(d,!0),y(T,t),h.remove(),p()});var m=(L&&A?A:t.attr(u))||"";h.attr(C,t.attr(f)).attr(F,t.attr(l)).attr(E,m?r+m:null),h.complete&&h.trigger(D)}}function A(t){var e=t.getBoundingClientRect(),r=a.scrollDirection,n=a.threshold,i=h()+n>e.top&&-n<e.bottom,o=g()+n>e.left&&-n<e.right;return"vertical"===r?i:"horizontal"===r?o:i&&o}function g(){return w>=0?w:w=n(t).width()}function h(){return B>=0?B:B=n(t).height()}function m(t){return t.tagName.toLowerCase()}function b(t,e){if(e){var r=t.split(",");t="";for(var a=0,n=r.length;a<n;a++)t+=e+r[a].trim()+(a!==n-1?",":"")}return t}function v(t,e){var n,i=0;return function(o,u){function l(){i=+new Date,e.call(r,o)}var f=+new Date-i;n&&clearTimeout(n),f>t||!a.enableThrottle||u?l():n=setTimeout(l,t-f)}}function p(){--z,i.length||z||y("onFinishedAll")}function y(t,e,n){return!!(t=a[t])&&(t.apply(r,[].slice.call(arguments,1)),!0)}var z=0,w=-1,B=-1,L=!1,T="afterLoad",D="load",I="error",N="img",E="src",F="srcset",C="sizes",O="background-image";"event"===a.bind||o?f():n(t).on(D+"."+l,f)}function a(a,o){var u=this,l=n.extend({},u.config,o),f={},c=l.name+"-"+ ++i;return u.config=function(t,r){return r===e?l[t]:(l[t]=r,u)},u.addItems=function(t){return f.a&&f.a("string"===n.type(t)?n(t):t),u},u.getItems=function(){return f.g?f.g():{}},u.update=function(t){return f.e&&f.e({},!t),u},u.force=function(t){return f.f&&f.f("string"===n.type(t)?n(t):t),u},u.loadAll=function(){return f.e&&f.e({all:!0},!0),u},u.destroy=function(){return n(l.appendScroll).off("."+c,f.e),n(t).off("."+c),f={},e},r(u,l,a,f,c),l.chainable?a:u}var n=t.jQuery||t.Zepto,i=0,o=!1;n.fn.Lazy=n.fn.lazy=function(t){return new a(this,t)},n.Lazy=n.lazy=function(t,r,i){if(n.isFunction(r)&&(i=r,r=[]),n.isFunction(i)){t=n.isArray(t)?t:[t],r=n.isArray(r)?r:[r];for(var o=a.prototype.config,u=o._f||(o._f={}),l=0,f=t.length;l<f;l++)(o[t[l]]===e||n.isFunction(o[t[l]]))&&(o[t[l]]=i);for(var c=0,s=r.length;c<s;c++)u[r[c]]=t[0]}},a.prototype.config={name:"lazy",chainable:!0,autoDestroy:!0,bind:"load",threshold:500,visibleOnly:!1,appendScroll:t,scrollDirection:"both",imageBase:null,defaultImage:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",placeholder:null,delay:-1,combined:!1,attribute:"data-src",srcsetAttribute:"data-srcset",sizesAttribute:"data-sizes",retinaAttribute:"data-retina",loaderAttribute:"data-loader",imageBaseAttribute:"data-imagebase",removeAttribute:!0,handledName:"handled",loadedName:"loaded",effect:"show",effectTime:0,enableThrottle:!0,throttle:250,beforeLoad:e,afterLoad:e,onError:e,onFinishedAll:e},n(t).on("load",function(){o=!0})}(window);

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
	$('.lazy').Lazy({
		onLoad: function(element){console.log(element.src + ' loaded...');}
	});
};

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
	const li = document.createElement('li');

	const image = document.createElement('img');
	image.className = 'restaurant-img lazy';
	image.src = '/img/404.jpg';//DBHelper.imageUrlForRestaurant(restaurant)+'-small.jpg';
	image.setAttribute('alt',`Picture of the restaurant: ${restaurant.name}`);
	image.setAttribute('data-src',DBHelper.imageUrlForRestaurant(restaurant)+'-small.jpg' );
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
	address.innerHTML = '<i class="material-icons">place</i>' + restaurant.address;

	const image = document.getElementById('restaurant-img');
	image.className = 'restaurant-img';
	image.src = DBHelper.imageUrlForRestaurant(restaurant);
	image.setAttribute('alt',`Picture of the restaurant: ${restaurant.name}`);
	$('#restaurant-img-medium').attr('srcset',DBHelper.imageUrlForRestaurant(restaurant)+'-medium.jpg');
	$('#restaurant-img-large').attr('srcset',DBHelper.imageUrlForRestaurant(restaurant)+'-large.jpg');
	$('#restaurant-img-small').attr('src',DBHelper.imageUrlForRestaurant(restaurant)+'-small.jpg');

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
		ratinghtml = ratinghtml + '<i class="material-icons smallicons">star</i>';
	}
	for (let i=0;i<(5-review.rating);i++)
	{
		ratinghtml = ratinghtml + '<i class="material-icons smallicons">star_border</i>';
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
			console.log(reviews);
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
				});
		}
		else {
			$('#reviews-list').append(createReviewHTML(review));
			toastr.success('Saving review...','Saving...');
		}

	});

};
