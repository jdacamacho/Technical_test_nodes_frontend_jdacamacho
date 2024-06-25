import { Routes } from '@angular/router';
import { LayoutComponent } from './components/common/layout/layout.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/nodes', pathMatch: 'full'
    },{
        path: "nodes",
        component: LayoutComponent
    }
];