import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesMapComponent } from './nodes-map.component';

describe('NodesMapComponent', () => {
  let component: NodesMapComponent;
  let fixture: ComponentFixture<NodesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodesMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NodesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
