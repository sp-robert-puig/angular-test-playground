import { Component } from '@angular/core';

@Component({
    selector: 'app-inline-comp',
    template: `<h1>{{title}}<h1>`
})
export class InlineComponent {
    title = 'hello inline comp!';
}

