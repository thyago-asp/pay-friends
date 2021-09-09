import { Injectable } from '@angular/core';
import { EmptyReferences } from '../../models/enums/emptyReferences';

@Injectable({
  providedIn: 'root'
})
export class FilterState {

  states = {
    filterFields: EmptyReferences.OBJECT,
    paginationNumber: 1,
    ordination: {
      fieldNameSort: null,
      isDesc: null
    }
  };

  constructor() { }

  resetState() {
    this.states = {
      filterFields: EmptyReferences.OBJECT,
      paginationNumber: 1,
      ordination: {
        fieldNameSort: null,
        isDesc: null
      }
    };
  }
}
