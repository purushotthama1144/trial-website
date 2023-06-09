
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {
    private message = new BehaviorSubject('');
    sharedMessage = this.message.asObservable();

    constructor() { }

    nextMessage(message: string) {
        this.message.next(message)
    }
}