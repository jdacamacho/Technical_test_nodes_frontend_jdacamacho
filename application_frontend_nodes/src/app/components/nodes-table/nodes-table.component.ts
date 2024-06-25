import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../data/services/node.service';
import { Node } from '../../data/models/node';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzIconService } from 'ng-zorro-antd/icon';
import { EyeOutline, DeleteOutline, EditOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-nodes-table',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  templateUrl: './nodes-table.component.html',
  styleUrl: './nodes-table.component.css'
})
export class NodesTableComponent implements OnInit {
  
  nodes: Node[] = [];

  constructor(private NodeService : NodeService, private iconService: NzIconService){
    this.iconService.addIcon(EyeOutline); 
    this.iconService.addIcon(DeleteOutline);
    this.iconService.addIcon(EditOutline); 
  }
  
  ngOnInit(): void {
    this.loadNodes();
  }

  loadNodes(){
    this.NodeService.listNodes()
                    .subscribe((nodes: Node[]) => {
                    this.nodes = nodes;
                  });
  }

}
