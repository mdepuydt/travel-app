import {TestBed, inject} from '@angular/core/testing';

import {PhotosService} from './photos.service';

describe('PhotosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotosService]
    });
  });

  it('should ...', inject([PhotosService], (service: PhotosService) => {
    expect(service).toBeTruthy();
  }));
});
