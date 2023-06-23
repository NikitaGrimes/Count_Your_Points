import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appForReverse]'
})
export class ForReverseDirective {
  constructor(private templateRef: TemplateRef<unknown>, private viewContainer: ViewContainerRef) {

  }

  @Input() set appForReverse(num: number){
    this.viewContainer.clear();
    for (let i = num - 1; i >= 0; i--)
      this.viewContainer.createEmbeddedView(this.templateRef, {index: i});
  }

}