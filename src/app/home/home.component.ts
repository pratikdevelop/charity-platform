import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor() {
    AOS.init({
      once: true, // Animation triggers only once
      offset: 100, // Trigger animations 100px before element is in view
    });
    }

}
