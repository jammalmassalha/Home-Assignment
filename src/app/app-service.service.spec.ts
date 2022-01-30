import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { AppServiceService } from './app-service.service';
import { Questions } from './interfaces/questions.model';

describe('AppServiceService', () => {
  let service: AppServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppServiceService]
    });
    service = TestBed.inject(AppServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#getPatientQuestions should return Observable<Questions>',
    async () => {
      const result = await service.getPatientQuestions();
      expect(result).toEqual(jasmine.objectContaining(Object.assign({}, {} as Questions)));
    });
});
