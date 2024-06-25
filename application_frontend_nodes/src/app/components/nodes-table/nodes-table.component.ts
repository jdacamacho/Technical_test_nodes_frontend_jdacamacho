import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../data/services/node.service';
import { Node } from '../../data/models/node';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzIconService } from 'ng-zorro-antd/icon';
import { EyeOutline, DeleteOutline, EditOutline } from '@ant-design/icons-angular/icons';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@Component({
  selector: 'app-nodes-table',
  standalone: true,
  imports: [CommonModule, NzIconModule,NzPaginationModule],
  templateUrl: './nodes-table.component.html',
  styleUrl: './nodes-table.component.css'
})
export class NodesTableComponent implements OnInit {
  
  nodes: Node[] = [];
  currentNodes: Node[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(private NodeService : NodeService, private iconService: NzIconService){
    this.iconService.addIcon(EyeOutline); 
    this.iconService.addIcon(DeleteOutline);
    this.iconService.addIcon(EditOutline); 
  }
  
  ngOnInit(): void {
    this.loadNodes();
  }

  loadNodes(){
    this.NodeService.listNodes().subscribe(
                  (nodes: Node[]) => {
                    this.nodes = nodes;
                    this.totalItems = this.nodes.length;
                    this.currentPage = 1;
                    this.updateCurrentNodes();
                  });
  }

  updateCurrentNodes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentNodes = this.nodes.slice(startIndex, endIndex);
  }

  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.updateCurrentNodes();
  }

}
