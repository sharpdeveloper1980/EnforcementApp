import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkLogPage } from './work-log.page';

describe('WorkLogPage', () => {
  let component: WorkLogPage;
  let fixture: ComponentFixture<WorkLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
