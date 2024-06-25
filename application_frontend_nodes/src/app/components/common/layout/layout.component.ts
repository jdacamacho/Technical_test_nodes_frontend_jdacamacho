import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NodesTableComponent } from '../../nodes-table/nodes-table.component';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { ModalFormComponent } from '../../modals/modal-form/modal-form.component';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, BreadCrumbComponent, FooterComponent,
            NzTabsModule, NzCardModule,CommonModule,
            NodesTableComponent, NzIconModule, ModalFormComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  indexTab = 0;

  

}
