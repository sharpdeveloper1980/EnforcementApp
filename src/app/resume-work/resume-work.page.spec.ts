import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResumeWorkPage } from './resume-work.page';

describe('ResumeWorkPage', () => {
  let component: ResumeWorkPage;
  let fixture: ComponentFixture<ResumeWorkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeWorkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeWorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
