import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NodeService } from '../../data/services/node.service';
import { Node } from '../../data/models/node';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzIconService } from 'ng-zorro-antd/icon';
import { DeleteOutline, EditOutline, SearchOutline } from '@ant-design/icons-angular/icons';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ModalViewComponent } from '../modals/modal-view/modal-view.component';
import swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalUpdateComponent } from '../modals/modal-update/modal-update.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-nodes-table',
  standalone: true,
  imports: [CommonModule, NzIconModule,NzPaginationModule,
            ModalViewComponent, ModalUpdateComponent,NzInputModule,
          FormsModule, NzButtonModule],
  templateUrl: './nodes-table.component.html',
  styleUrl: './nodes-table.component.css'
})
export class NodesTableComponent implements OnInit {
  
  nodes: Node[] = [];
  currentNodes: Node[] = [];
  searchValue: string = '';
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(private NodeService : NodeService,
              private iconService: NzIconService,
              private router: Router){
    this.iconService.addIcon(DeleteOutline);
    this.iconService.addIcon(EditOutline); 
    this.iconService.addIcon(SearchOutline);
  }
  
  ngOnInit(): void {
    this.loadNodes();
  }

  loadNodesName(value: string): void {
    this.NodeService.listNodesByName(value).subscribe(
      (nodes: Node[]) => {
        this.nodes = nodes;
        this.totalItems = this.nodes.length;
        this.currentPage = 1;
        this.updateCurrentNodes();
      });
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

  deleteNode(id: number): void {
    swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this node!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleteNode(id);
      }
    });
  }

  private onDeleteNode(id: number): void {
    this.NodeService.deleteNode(id).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
  
        swal.fire('Error', errorMessage, 'error');
        
        return throwError(() => new Error(errorMessage));
      })
    ).subscribe(
      (success: boolean) => {
        if (success) {
          swal.fire('Node Deleted', 'The node was successfully deleted!', 'success');
        } else {
          swal.fire('Error', 'Failed to delete node', 'error');
        }
        setTimeout(() => {
          this.router.navigate(['/nodes']).then(() => {
            window.location.reload();
          });
        }, 2000);
      },
    )
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
