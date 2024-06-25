import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NodeDTO } from '../../../data/DTORequest/node-dto';
import { NodeService } from '../../../data/services/node.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert2';
import { CoordinateDTO } from '../../../data/DTORequest/coordinate-dto';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [CommonModule, NzModalModule, NzIconModule,
            FormsModule],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent implements OnInit {
  
  node: NodeDTO = new NodeDTO();
  isVisible = false;

  constructor(private nodeService: NodeService,
              private iconService: NzIconService,
              private router: Router){
    this.iconService.addIcon(PlusOutline);
  }

  ngOnInit(): void {
    this.node.coordinate = new CoordinateDTO();
  }

  public createNode(): void {
    this.nodeService.createNode(this.node).pipe(
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
        swal.fire('New node', `${response.name} successfully created!`, 'success');
        this.isVisible = false;
        setTimeout(() => {
          this.router.navigate(['/nodes']).then(() => {
            window.location.reload();
          });
        }, 4000);
      }
    );
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
