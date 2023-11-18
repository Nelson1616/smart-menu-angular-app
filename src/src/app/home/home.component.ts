import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor() {
    console.log('teste');
  }
  count: number = 0;

  countArray: number[] = [];

  mainImage: string =
    'https://firebasestorage.googleapis.com/v0/b/quick-order-16.appspot.com/o/Screenshot%202023-06-13%20at%2019.32.31.png?alt=media&token=c3711111-18aa-4d2d-b6a1-e41051d8642a';

  onclick() {
    this.count++;
    this.countArray.push(this.count);
  }

  title = 'smart-menu';
}
