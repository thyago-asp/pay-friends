import { TestBed } from '@angular/core/testing';
import { FilterState } from './FilterState';

describe('FilterState', () => {
  let service: FilterState;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FilterState] });
    service = TestBed.inject(FilterState);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
