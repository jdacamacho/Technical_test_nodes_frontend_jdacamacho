import { Component, Input, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { UploadOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NodeDTO } from '../../../data/DTORequest/node-dto';
import { NodeService } from '../../../data/services/node.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Node } from '../../../data/models/node';
import { CoordinateDTO } from '../../../data/DTORequest/coordinate-dto';
import { Coordinate } from '../../../data/models/coordinate';


@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [CommonModule, NzModalModule, NzIconModule,
    FormsModule],
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.css'
})
export class ModalUpdateComponent  implements OnInit{
  
  @Input() node!: Node;
  newNode: NodeDTO = new NodeDTO();
  isVisible = false;

  constructor(private nodeService: NodeService,
              private iconService: NzIconService,
              private router: Router){
    this.iconService.addIcon(UploadOutline);
  }

  ngOnInit(): void {
    this.newNode.coordinate = new Coordinate();
    this.mapModelToDTO(this.node);
  }

  public updateNode(): void {
    this.nodeService.updateNode(this.node.id , this.newNode).pipe(
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
      response => {
        swal.fire('Update node', `${response.name} successfully updated!`, 'success');
        this.isVisible = false;
        setTimeout(() => {
          this.router.navigate(['/nodes']).then(() => {
            window.location.reload();
          });
        }, 2000);
      }
    );
  }


  mapModelToDTO(node : Node): void {
    this.newNode.name = node.name;
    this.newNode.description = node.description;
    this.newNode.coordinate.valueX = node.coordinate.valueX;
    this.newNode.coordinate.valueY = node.coordinate.valueY;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
