
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGMDModule } from './ngmd.module';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NGMDModule,
    MessagesComponent
],
})
export class AppComponent {
  title = 'Tour of Heroes';
}
