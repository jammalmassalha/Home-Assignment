import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AppServiceService } from '../app-service.service';

import { PatientQuestionsComponent } from './patient-questions.component';

describe('PatientQuestionsComponent', () => {
  let component: PatientQuestionsComponent;
  let fixture: ComponentFixture<PatientQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule, MatCardModule,
        MatRadioModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [AppServiceService],
      declarations: [PatientQuestionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#generateFormGroup should return  FormGroup', () => {
    const mFormGroup = new FormGroup({});
    const rFormGroup = component.generateFormGroup(mFormGroup, [], '');
    expect(rFormGroup).toEqual(mFormGroup);

  });
});
