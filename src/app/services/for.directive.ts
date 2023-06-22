import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFor]'
})
export class ForDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {

  }

  @Input() set appFor(num: number){
    for (let i = 0; i < num; i++)
      this.viewContainer.createEmbeddedView(this.templateRef, {index: i});
  }
}