import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NzGridModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
