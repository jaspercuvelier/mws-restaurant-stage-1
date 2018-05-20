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
