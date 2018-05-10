//INDEXCONTROLLER START
import idb from 'idb';
var dbPromise = idb.open('restrev',1,function(upgradeDb){
  var restOverviewsStore = upgradeDb.createObjectStore('restOverviews');
  restOverviewsStore.put('hier komen de JSON waarden.','JSON');
});

dbPromise.then(function(db) {
  var tx = db.transaction('restOverviews');
  var restOverviewsStore = tx.objectStore('restOverviews');
  return restOverviewsStore.get('JSON')
}).then((val) => console.log('returned value is '+ val));
