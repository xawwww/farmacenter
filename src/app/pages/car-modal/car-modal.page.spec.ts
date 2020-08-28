import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarModalPage } from './car-modal.page';

describe('CarModalPage', () => {
  let component: CarModalPage;
  let fixture: ComponentFixture<CarModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
