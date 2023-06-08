import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChrisListComponent } from './chris-list.component';

describe('ChrisListComponent', () => {
  let component: ChrisListComponent;
  let fixture: ComponentFixture<ChrisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChrisListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChrisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
