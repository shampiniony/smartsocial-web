<template>
  <div id="map" class="map"></div>
</template>

<script>
import { onMounted } from 'vue';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';

export default {
  name: 'Map',
  setup() {
    onMounted(() => {
      // Create the map
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

      // Example markers
      const markers = [
        { lon: -0.09, lat: 51.5, popup: 'Marker 1' },
        { lon: -0.1, lat: 51.51, popup: 'Marker 2' },
      ];

      // Create a vector layer for the markers
      const vectorSource = new VectorSource();

      markers.forEach(marker => {
        const iconFeature = new Feature({
          geometry: new Point(fromLonLat([marker.lon, marker.lat])),
          name: marker.popup,
        });

        iconFeature.setStyle(new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'path/to/your/custom-icon.png', // Path to custom icon
          }),
        }));

        vectorSource.addFeature(iconFeature);
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      map.addLayer(vectorLayer);
    });
  },
};
</script>

<style>
.map {
  height: 100%;
  width: 100%;
  z-index: -10;
}
</style>
