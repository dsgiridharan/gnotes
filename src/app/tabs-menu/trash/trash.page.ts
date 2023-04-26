import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.page.html',
  styleUrls: ['./trash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [ApiService],
})
export class TrashPage implements OnInit {
  trashesList: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getTrashesList();
  }

  getTrashesList() {
    this.api.trashes().subscribe({
      next: (v: any) => {
        this.trashesList = v;
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  restoreNote() {
    this.api.restoreFromTrash(this.trashesList[0].id).subscribe({
      next: (v: any) => {
        console.log(v);
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
}
