import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelVendedor } from './panel-vendedor';

describe('PanelVendedor', () => {
  let component: PanelVendedor;
  let fixture: ComponentFixture<PanelVendedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelVendedor],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelVendedor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
