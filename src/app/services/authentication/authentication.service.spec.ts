import {TestBed, inject} from '@angular/core/testing';

import {AuthentificationService} from './authentification.service';

describe('AuthentificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthentificationService]
    });
  });

  it('should ...', inject([AuthentificationService], (service: AuthentificationService) => {
    expect(service).toBeTruthy();
  }));
});
