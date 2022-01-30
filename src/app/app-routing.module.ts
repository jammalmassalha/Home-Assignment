import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientQuestionsComponent } from './patient-questions/patient-questions.component';

const routes: Routes = [
  { path: '', component: PatientQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
