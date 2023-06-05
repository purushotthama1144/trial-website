import { Renderer2, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
 
/**
* Service to automate creation of JSON-LD Microdata.
*/@Injectable({
    providedIn: 'root'
})
export class ScriptService {
 
  constructor(
    @Inject(DOCUMENT) private _document: Document
  ) { }
  
  /**
  * Set JSON-LD Microdata on the Document Body.
  *
  * @param renderer2 The Angular Renderer
  * @param data The data for the JSON-LD script
  * @returns Void
  */
  public setJsonLd(renderer2: Renderer2, data: any,type:any): void {
    let script = renderer2.createElement('script');
    script.type = type;
    script.text = `${data}`;
    renderer2.appendChild(this._document.head, script);
  }

  addJsToElement(src: string,renderer: Renderer2): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    renderer.appendChild(document.body, script);
    return script;
  }
}