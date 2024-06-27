import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { NodeService } from '../../data/services/node.service';
import { Node } from '../../data/models/node';

@Component({
  selector: 'app-nodes-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './nodes-map.component.html',
  styleUrl: './nodes-map.component.css'
})
export class NodesMapComponent implements OnInit{

  nodes: Node [] =  [];
  markers: any = [];
  
  center_Init = {
    lat: 2.43823 ,
    lng: -76.61316 
  }

  constructor(private nodeService : NodeService){}

  ngOnInit(): void {
    this.loadNodes();
  }

  loadMarkers() : void {
    this.markers = this.nodes.map(node => ({
      position: { lat: node.coordinate.valueX, lng: node.coordinate.valueY },
      label: { color: 'black', text: node.name },
      title: node.name,
      
    }));

  }

  loadNodes(): void {
    this.nodeService.listNodes().subscribe(
      (nodes: Node[]) => {
        this.nodes = nodes;
        this.loadMarkers();
      });
  }

}
