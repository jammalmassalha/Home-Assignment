import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { Questions } from '../interfaces/questions.model';
import { UUID } from 'uuid-generator-ts';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Question } from '../interfaces/question.model';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-patient-questions',
  templateUrl: './patient-questions.component.html',
  styleUrls: ['./patient-questions.component.css'],
})
export class PatientQuestionsComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  uuid = new UUID();
  constructor(
    private appService: AppServiceService,
    private formBuilder: FormBuilder
  ) {
    this.patientForm = this.formBuilder.group({});
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
  QuestionsData = {} as Questions; // Question  from json data
  Questions = [] as Question[]; /// form question
  loading: boolean = false;
  patientForm = {} as FormGroup; // form controls

  ngOnInit(): void {
    this.loading = true;
    this.getPatientQuetions();

  }
  /**
   * function to get questions from server or JSON
   *
   *
   */
  getPatientQuetions() {
    this.appService.getPatientQuestions().subscribe(
      (response) => {
        console.log('response received');
        this.QuestionsData = response;
        console.log(this.QuestionsData);
        this.generateFormControls();
        this.loading = false;
      },
      (error) => {
        console.error('Request failed with error');
        this.loading = false;
      }
    );
  }
  /**
   * function to render form question
   *
   *
   */
  generateFormControls() {
    const baseForm = this.formBuilder.group({});
    for (var i = 0; i < this.QuestionsData.patientQuestions.length; i++) {
      let element = this.QuestionsData.patientQuestions[i];
      if (element.childItems) {
        baseForm.addControl(element.QuestionControl, new FormControl(''));
        let q = {} as Question;
        q.title = element.title;
        q.QuestionControl = element.QuestionControl;
        q.type = element.type;
        q.answersLabel = element.answersLabel;
        q.answersValue = element.answersValue;
        q.options = element.options;
        q.ConrolsToReset = element.ConrolsToReset;
        this.Questions.push(q);
        this.generateFormGroup(baseForm, element, element.QuestionControl);
      } else {
        baseForm.addControl(element.QuestionControl, new FormControl(''));
        let q = {} as Question;
        q.title = element.title;
        q.type = element.type;
        q.QuestionControl = element.QuestionControl;
        q.answersLabel = element.answersLabel;
        q.answersValue = element.answersValue;
        q.options = element.options;
        q.ConrolsToReset = element.ConrolsToReset;
        this.Questions.push(q);
      }
    }
    baseForm.addControl('uuid', new FormControl(this.uuid['str'], null));
    console.log(this.Questions);
    console.log(baseForm.controls);
    this.patientForm = baseForm;
    this.patientForm.valueChanges
      .pipe(
        switchMap(async () =>
          this.appService.saveFormData(this.patientForm.value)
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => console.log('Saved'));
  }
  /**
   * function to render relative form question
   *
   * baseForm param is form controls
   * field param is the element to check if has childItems
   * parentControl param is the parent related to
   */
  generateFormGroup(
    baseForm: FormGroup,
    field: any,
    parentControl: string
  ): FormGroup {
    if (field.childItems) {
      baseForm.addControl(field.QuestionControl, new FormControl(''));

      for (var i = 0; i < field.childItems.length; i++) {
        let element = field.childItems[i];
        let q = {} as Question;
        q.title = element.title;
        q.type = element.type;
        q.answersLabel = element.answersLabel;
        q.QuestionControl = element.QuestionControl;
        q.answersValue = element.answersValue;
        q.RelativeToControlName = parentControl;
        q.ParentAns = element.parentAnswer;
        q.options = element.options;
        q.ConrolsToReset = element.ConrolsToReset;
        this.Questions.push(q);
        if (element.childItems) {
          this.generateFormGroup(baseForm, element, element.QuestionControl);
        } else {
          baseForm.addControl(element.QuestionControl, new FormControl(''));
        }
      }
      return baseForm;
    } else {
      let q = {} as Question;
      q.title = field.title;
      q.type = field.type;
      q.answersLabel = field.answersLabel;
      q.QuestionControl = field.QuestionControl;
      q.answersValue = field.answersValue;
      q.options = field.options;
      q.ConrolsToReset = field.ConrolsToReset;
      this.Questions.push(q);
      baseForm.addControl(field.QuestionControl, new FormControl(''));
    }
    return baseForm;
  }

  /**
   * function to handel form submit
   *
   */
  onSubmit() {
    this.appService.saveFormData(this.patientForm.value)
    console.log(this.patientForm.value);
    this.uuid = new UUID();
    this.QuestionsData = {} as Questions;
    this.Questions = [] as Question[];
    this.getPatientQuetions();
    // debugger
  }

  /**
   * function to handel radio button cahnge
   *
   * element param  is the triger element
   */
  radioChange(element: any, controlsToReset: string[]) {
    console.log(element.value);
    console.log(this.patientForm.value);
    for (var i = 0; i < controlsToReset.length; i++) {
      let control = controlsToReset[i];
      this.patientForm.value[control] = '';
      this.patientForm.get(control)?.reset();
    }
  }
  /**
   * function to handel radio button cahnge
   *
   * element param  is the triger element
   */
  selectChange(element: any, controlsToReset: string[]) {
    console.log(element.value);
    console.log(this.patientForm.value);
    for (var i = 0; i < controlsToReset.length; i++) {
      let control = controlsToReset[i];
      this.patientForm.value[control] = '';
      this.patientForm.get(control)?.reset();
    }
  }
}
