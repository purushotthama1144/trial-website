import { EventEmitter, Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class InteractionService {
  interactionSelected = new EventEmitter<boolean>(false);
}