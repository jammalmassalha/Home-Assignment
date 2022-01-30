import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Questions } from './interfaces/questions.model';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private http: HttpClient) {}
  /**
   * function to send data form to server
   * **/
  saveFormData(values: any) {
    console.log('Sending data to server');
    //debugger
    console.log(values);
  }
 /**
   * function to get Question data 
   * **/
  getPatientQuestions(): Observable<Questions> {
    return this.http.get<Questions>('/assets/Questions.json');
  }
}
