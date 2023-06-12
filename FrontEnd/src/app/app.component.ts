import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/* `export class AppComponent` is exporting the `AppComponent` class so that it can be imported and
used in other parts of the application. This allows other components or modules to use the
`AppComponent` class and its properties and methods. */
export class AppComponent {
  title = 'frontEnd';
}
