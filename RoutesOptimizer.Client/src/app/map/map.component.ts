import { Component, Input, OnChanges, OnInit } from '@angular/core';

declare var L: any;
import 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements OnInit, OnChanges {
  map: any;

  @Input() fromStop: any;
  @Input() toStop: any;

  stopIcon = L.icon({
    iconUrl: 'stop-main.svg',
    iconSize: [25, 25],
  });

  ngOnInit(): void {

    this.map = L.map('map').setView([42.6977, 23.3219], 13); // Coordinates for Sofia, Bulgaria

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);
  }

  ngOnChanges(): void {
    if (this.fromStop && this.toStop) {

      L.marker([this.fromStop.latitude, this.fromStop.longitude], { icon: this.stopIcon })
        .bindPopup(this.fromStop.name)
        .addTo(this.map);

      L.marker([this.toStop.latitude, this.toStop.longitude], { icon: this.stopIcon })
        .bindPopup(this.toStop.name)
        .addTo(this.map);

      L.Routing.control({
        waypoints: [L.latLng(this.fromStop.latitude, this.fromStop.longitude), L.latLng(this.toStop.latitude, this.toStop.longitude)],
        lineOptions: {
          styles: [
            {
              color: 'magenta',
              weight: 5,
              opacity: 0.7
            }
          ]
        },
        createMarker: function () { return null; }
      }).addTo(this.map);
    }
  }
}
