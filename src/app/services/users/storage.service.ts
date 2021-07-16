import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /** Function to create new session if user log */
  createSession(data: any) {
    if (data) {
      this.saveSession(data);
      return true
    }
    return
  }

  /** Function to check session if exists */
  sessionExists(): boolean {
    const abnexsession = sessionStorage.getItem("abnex");
    if (abnexsession) {
      return true;
    }

    return false;
  }

  /** Function to remove session */
  removeSession(sessionname: string): boolean {
    if (sessionname) {
      sessionStorage.removeItem(sessionname);
      return true;
    }
    return false;
  }

  /** This function called for each session created */
  private saveSession(user: any) {
    sessionStorage.setItem("abnex", JSON.stringify(user))
  }
}
