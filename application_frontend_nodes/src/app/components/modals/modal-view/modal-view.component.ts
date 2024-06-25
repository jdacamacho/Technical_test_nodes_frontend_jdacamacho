import { Component, Input } from '@angular/core';
import { Node } from '../../../data/models/node';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconService } from 'ng-zorro-antd/icon';
import { EyeOutline} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-modal-view',
  standalone: true,
  imports: [CommonModule, NzModalModule,NzDescriptionsModule,
            NzIconModule],
  templateUrl: './modal-view.component.html',
  styleUrl: './modal-view.component.css'
})
export class ModalViewComponent {
  @Input() node!: Node;
  isVisible = false;

  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(EyeOutline); 
  }

  showModal(data: Node): void {
    this.node = { ...data };
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
