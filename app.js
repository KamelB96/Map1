// Get the user's coordinates:
async function getCoords(){
  pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
  });
  return [pos.coords.latitude, pos.coords.longitude]
}

//created a load up window
// On load, build ads:
window.onload = async () => {
  myMap = L.map('map',{
      center: await getCoords(),
      zoom:12,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: '15',
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a>'
      }).addTo(myMap);

      //geolocation marker
      const marker = L.marker([pos.coords.latitude, pos.coords.longitude]);
      marker.addTo(myMap).bindPopup('<p>You Are Here</p>').openPopup();
};


//Create an event to ask for the user location
document.querySelector('#submit').addEventListener('click', async (event) =>{
  event.preventDefault()
  let business = document.querySelector('#business').value;
  let latlong = await getCoords()
  let lat = latlong[0]
  let long = latlong[1]
  let data = await getFourSquare(business, lat, long);
  let response = data.json();
  console.log(response)
  //myMap.businesses = processBusinesses(response);
  //myMap.addMarkers();

});

async function getFourSquare(business, lat, long){
const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'fsq3c439Uf+e7R8k3HHmz6ja6t4W7OX7FcFwWKsVlq6Ea/A='
  }
  };

  // let params = new URLSearchParams({
  //     query: business,
  //     ll: ${lat},${long},
  //     limit: 5 
  // });
  



  return await fetch('https://api.foursquare.com/v3/places/search?&${params}', options)

}