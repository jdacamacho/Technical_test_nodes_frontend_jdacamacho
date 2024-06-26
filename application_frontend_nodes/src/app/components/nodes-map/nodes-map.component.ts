import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-nodes-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './nodes-map.component.html',
  styleUrl: './nodes-map.component.css'
})
export class NodesMapComponent {

  center_Init = {
    lat: 2.43823 ,
    lng: -76.61316 
  }

}
