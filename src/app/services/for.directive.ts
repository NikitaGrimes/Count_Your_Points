import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFor]'
})
export class ForDirective {
  constructor(private templateRef: TemplateRef<unknown>, private viewContainer: ViewContainerRef) {

  }

  @Input() set appFor(num: number){
    this.viewContainer.clear();
    for (let i = 0; i < num; i++)
      this.viewContainer.createEmbeddedView(this.templateRef, {index: i});
  }
}
