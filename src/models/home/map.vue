<template>
  <div id="map" class="w-full h-full relative"></div>
  <Transition name="fade" mode='out-in'>
    <div id="popup" ref="popup" v-show="popupVisible">
      <MapPopup v-if="places.selected != null" :place="places.all.find(x => x.id == places.selected)" />
    </div>
  </Transition>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue';
import 'ol/ol.css'; // Ensure OpenLayers CSS is imported
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import Overlay from 'ol/Overlay';

import { places } from '@/store/places.store';
import MapPopup from '@/models/home/map-popup.vue';

const popupVisible = ref(false);
const popup = ref(null);
const vectorSource = new VectorSource();

const addMarkers = (markers) => {
  vectorSource.clear();
  markers.forEach(marker => {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([marker.lon, marker.lat])),
      name: marker.id,
    });

    iconFeature.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: './pin.png',
        scale: 0.5
      }),
    }));

    vectorSource.addFeature(iconFeature);
  });
};

onMounted(async () => {
  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([38.7689, 55.0938]),
      zoom: 13,
    }),
    controls: []
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  map.addLayer(vectorLayer);

  const overlay = new Overlay({
    element: popup.value ? popup.value : undefined,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [190, 20]
  });
  map.addOverlay(overlay);

  map.on('singleclick', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });

    console.log(places.selected)

    if (feature) {
      // @ts-ignore
      const coordinates = feature.getGeometry().getCoordinates() ?? [0, 0];
      overlay.setPosition(coordinates);
      popupVisible.value = true;
      places.selected = feature.get('name');
    } else {
      popupVisible.value = false;
    }
  });

  // Initial marker addition
  addMarkers(places.all.map(x => ({
    lon: x.location.lon,
    lat: x.location.lat,
    id: x.id
  })));

  // Watch for changes in places store
  watch(() => places.all, (newPlaces) => {
    addMarkers(newPlaces.map(x => ({
      lon: x.location.lon,
      lat: x.location.lat,
      id: x.id
    })));
  }, { deep: true });
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
