import {Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, finalize, Observable, Subject, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpQueueService {
  private queue: BehaviorSubject<(() => Observable<any>)[]>
  private runQueue: boolean = false;


  constructor() {
    this.queue = new BehaviorSubject([]);

  }

  addToQueue(requests: (() => Observable<any>)[]) {
    const queue = [...this.queue.getValue()]
    console.warn('QUEUE ', queue)
    for (const request of requests) {
      queue.push(request)
    }
    this.queue.next(queue);
    if (!this.runQueue) {
      this.executeNext()
    }
  }

  private executeNext() {
    this.runQueue = true
    const queue = [...this.queue.getValue()]
    const requestToSend: () => Observable<any> = queue.shift()
    console.warn('EXECUTE', requestToSend)
    if (!requestToSend) {
      this.runQueue = false;
      return
    }
    this.queue.next(queue);
    requestToSend().subscribe(d => {
      this.executeNext()
    })
  }


}
