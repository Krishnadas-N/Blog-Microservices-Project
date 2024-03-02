import { TestBed } from '@angular/core/testing';

import { FeedLoadService } from './feed-load.service';

describe('FeedLoadService', () => {
  let service: FeedLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
