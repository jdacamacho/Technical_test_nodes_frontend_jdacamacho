import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { NodeService } from '../../data/services/node.service';
import { Node } from '../../data/models/node';
import { ModalUpdateComponent } from '../modals/modal-update/modal-update.component';
import { Coordinate } from '../../data/models/coordinate';

@Component({
  selector: 'app-nodes-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule,ModalUpdateComponent],
  templateUrl: './nodes-map.component.html',
  styleUrl: './nodes-map.component.css'
})
export class NodesMapComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  nodes: Node[] = [];
  markers: any[] = [];
  selectedMarkerName: string = '';
  selectedMarkerInfo: string = '';

  center_Init = {
    lat: 2.43823,
    lng: -76.61316
  };

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
    this.loadNodes();
  }

  loadMarkers(): void {
    this.markers = this.nodes.map(node => ({
      position: { lat: node.coordinate.valueX, lng: node.coordinate.valueY },
      label: { color: 'black', text: node.name },
      title: node.name,
      description: node.description,
      idNode : node.id
    }));
  }

  loadNodes(): void {
    this.nodeService.listNodes().subscribe(
      (nodes: Node[]) => {
        this.nodes = nodes;
        this.loadMarkers();
      });
  }

  openInfoWindow(marker: any, mapMarker: MapMarker): void {
    this.selectedMarkerName = marker.title;
    this.selectedMarkerInfo = marker.description;
    this.infoWindow.open(mapMarker);
  }
}