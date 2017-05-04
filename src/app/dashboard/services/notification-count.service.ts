import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class NotificationCountService {

    private notificationCountSubject: BehaviorSubject<number>;
    private count;
    private updateFlag = true;

    constructor() {
        this.notificationCountSubject = new BehaviorSubject<number>(0);
        this.count = 0;
    }

    setCount(count: number) {
        this.count = count;

        if(this.updateFlag) {
            this.notificationCountSubject.next(this.count);
        }
    }

    addToCount(num: number) {
        this.count += num;

        if(this.updateFlag) {
            this.notificationCountSubject.next(this.count);
        }
    }

    setUpdateFlag(val: boolean) {
        this.updateFlag = val;
    }

    getSubscription() {
        return this.notificationCountSubject
        .asObservable()
        .share()
        .distinctUntilChanged();
    }
}
