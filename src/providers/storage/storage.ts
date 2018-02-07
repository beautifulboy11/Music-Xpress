import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const localStorageAdapter = {
  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  },

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}; 

@Injectable()
export class StorageProvider {
  

  constructor(public http: HttpClient) {
    console.log('Hello StorageProvider Provider');
  }

}
