const permianBtn = document.querySelector('#permian');
const eagleFordBtn = document.querySelector('#eagleFord');
const haynesvilleBtn = document.querySelector('#haynesville');
const montneyBtn = document.querySelector('#montney');
const bakkenBtn = document.querySelector('#bakken');
const allBtns = document.querySelectorAll('.map-nav-button');

const textEl = document.querySelector('#basin-details');
const closeTextEl = document.querySelector('.basin-info-close');

let isAtStart = true;

const montneyCo = [-120.32775833872057,56.04609956040986];
const permianCo = [-102.43377851007966,32.405757140653705];
const eagleFordCo = [-98.20306800845617,28.832262656177562];
const haynesvilleCo = [-94.33183743533806,31.08855985869478];
const bakkenCo = [-102.98693735375872,48.232890934816425];

function fly(target) {
  if(isAtStart === false) {
    textEl.classList.remove('show');
  }
  isAtStart = !isAtStart;

  map.flyTo({
    ...target,
    speed: 2,
    curve: 2,
    easing(t) {
      return t;
    }
  });
  
  map.on('moveend', function(e){
    if (isAtStart === false) {
      textEl.classList.add('show');
    }
  });
}

function deactivateButtons() {
  allBtns.forEach((element) => {
    element.classList.remove('active');
  });
}

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yaXNsaW5kaG91dCIsImEiOiJjbG1pMHRrZWMyZ2NnM2tscGxmb25wZWR0In0.5z8RhWNo2il4w6ohxJVTZg';

const start = {
  center: [-100, 38],
  zoom: 4.75,
  pitch: 40,
  bearing: 0
};
const permianEnd = {
  center: permianCo,
  zoom: 6,
  bearing: 75,
  pitch: 65
};
const eagleFordEnd = {
  center: eagleFordCo,
  zoom: 8,
  bearing: 50,
  pitch: 65
};
const haynesvilleEnd = {
  center: haynesvilleCo,
  zoom: 8,
  bearing: 60,
  pitch: 65
};
const montneyEnd = {
  center: montneyCo,
  zoom: 8,
  bearing: 250,
  pitch: 75
};
const bakkenEnd = {
  center: bakkenCo,
  zoom: 8,
  bearing: 200,
  pitch: 75
};

closeTextEl.addEventListener('click', () => {
  deactivateButtons();
  fly(start);
  textEl.classList.remove('show');
  map.fitBounds([
    [-118.499997,10.895345], // southwestern corner of the bounds
    [-79.098706,61.300583] // northeastern corner of the bounds
  ]);
});

permianBtn.addEventListener('click', () => {
  const target = isAtStart ? permianEnd : start;
  fly(target);
  //deactivateButtons();
  permianBtn.classList.add('active');
});

eagleFordBtn.addEventListener('click', () => {
  const target = isAtStart ? eagleFordEnd : start;
  fly(target);
  //deactivateButtons();
  eagleFordBtn.classList.add('active');
});

haynesvilleBtn.addEventListener('click', () => {
  const target = isAtStart ? haynesvilleEnd : start;
  fly(target);
  //deactivateButtons();
  haynesvilleBtn.classList.add('active');
});

montneyBtn.addEventListener('click', () => {
  const target = isAtStart ? montneyEnd : start;
  fly(target);
  //deactivateButtons();
  montneyBtn.classList.add('active');
});

bakkenBtn.addEventListener('click', () => {
  const target = isAtStart ? bakkenEnd : start;
  fly(target);
  //deactivateButtons();
  bakkenBtn.classList.add('active');
});


const map = new mapboxgl.Map({
  container: 'basins',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  // style: 'mapbox://styles/jorislindhout/clo3as20l001o01qvexih34uv',
  style: 'mapbox://styles/jorislindhout/clo7b0ezk00lc01qs07dfc113',
  //antialias: true,
  ...start
});

map.scrollZoom.disable();

map.on('style.load', () => {
  // Custom atmosphere styling
  /*map.setFog({
    'high-color': 'rgb(0,0,255)', // upper atmosphere
    'color': 'rgb(12,14,18)', // lower atmosphere
    'horizon-blend': 0.2 // Exaggerate atmosphere (default is .1)
  });*/

  /*map.setTerrain({
    'source': 'mapbox-dem',
    'exaggeration': 1.5
  });*/

});

map.on('load', function(){

  var options = {
    steps: 80,
    units: 'kilometers'
  };

  var fill = {
    "fill-color": "#00f",
    "fill-opacity": 0 
  };

  var outline = {
    "line-color": "#00f",
    "line-opacity": 0.5,
    "line-width": 5,
    "line-offset": 5
  };

  var permianCenter = turf.point(permianCo);
  var permianRadius = 150;
  var permian = turf.circle(permianCenter, permianRadius, options);

  map.fitBounds([
    [-118.499997,10.895345], // southwestern corner of the bounds
    [-79.098706,61.300583] // northeastern corner of the bounds
  ]);

  /* map.addLayer({
      "id": "permian-fill",
      "type": "fill",
      "source": {
          "type": "geojson",
          "data": permian
      },
      "paint": fill
  });
  map.addLayer({
      "id": "permian-outline",
      "type": "line",
      "source": {
          "type": "geojson",
          "data": permian
      },
      "paint": outline
  });

  var eagleFordCenter = turf.point(eagleFordCo);
  var eagleFordRadius = 40;
  var eagleFord = turf.circle(eagleFordCenter, eagleFordRadius, options);

  map.addLayer({
      "id": "eagleFord-fill",
      "type": "fill",
      "source": {
          "type": "geojson",
          "data": eagleFord
      },
      "paint": fill
  });
  map.addLayer({
      "id": "eagleFord-outline",
      "type": "line",
      "source": {
          "type": "geojson",
          "data": eagleFord
      },
      "paint": outline
  });

  var haynesvilleCenter = turf.point(haynesvilleCo);
  var haynesvilleRadius = 50;
  var haynesville = turf.circle(haynesvilleCenter, haynesvilleRadius, options);

  map.addLayer({
      "id": "haynesville-fill",
      "type": "fill",
      "source": {
          "type": "geojson",
          "data": haynesville
      },
      "paint": fill
  });
  map.addLayer({
      "id": "haynesville-outline",
      "type": "line",
      "source": {
          "type": "geojson",
          "data": haynesville
      },
      "paint": outline
  });

  var montneyCenter = turf.point(montneyCo);
  var montneyRadius = 100;
  var montney = turf.circle(montneyCenter, montneyRadius, options);

  map.addLayer({
      "id": "montney-fill",
      "type": "fill",
      "source": {
          "type": "geojson",
          "data": montney
      },
      "paint": fill
  });
  map.addLayer({
      "id": "montney-outline",
      "type": "line",
      "source": {
          "type": "geojson",
          "data": montney
      },
      "paint": outline
  });

  var bakkenCenter = turf.point(bakkenCo);
  var bakkenRadius = 80;
  var bakken = turf.circle(bakkenCenter, bakkenRadius, options);

  map.addLayer({
      "id": "bakken-fill",
      "type": "fill",
      "source": {
          "type": "geojson",
          "data": bakken
      },
      "paint": fill
  });
  map.addLayer({
      "id": "bakken-outline",
      "type": "line",
      "source": {
          "type": "geojson",
          "data": bakken
      },
      "paint": outline
  }); */

});
