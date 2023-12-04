import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private readonly debug: boolean;
  constructor() {
    this.debug = !environment.production;
    if (!this.debug){
      console.info('Logger disabled. Application in production mode');
    }
  }

  log(...data: any[]){
    if (this.debug){
      console.log(...data)
    }
  }

  logByComponent(name: string, ...data: any[]) {
    this.log(`[${name}]: ${data.join(' ')}`);
  }
}
