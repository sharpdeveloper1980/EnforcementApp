import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecialTicketPage } from './special-ticket.page';

describe('SpecialTicketPage', () => {
  let component: SpecialTicketPage;
  let fixture: ComponentFixture<SpecialTicketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialTicketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
