import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [ApiService, EventService],
})
export class NotesPage implements OnInit {
  notes: any;
  viewMode: any = 'grid';

  constructor(
    private api: ApiService,
    private router: Router,
    private event: EventService
  ) {}

  ngOnInit() {
    this.event.getPublishedNote().subscribe((v: any) => {
      this.notes = v;
    });
    this.getNodesList();
    if (localStorage.getItem('viewMode')) {
      this.viewMode = localStorage.getItem('viewMode');
    }
  }

  getNodesList() {
    this.api.notes().subscribe({
      next: (v: any) => {
        this.notes = v;
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  toggleViewMode(mode: string) {
    if (mode == 'grid') {
      this.viewMode = 'list';
      localStorage.setItem('viewMode', this.viewMode);
    } else {
      this.viewMode = 'grid';
      localStorage.setItem('viewMode', this.viewMode);
    }
  }

  addNote() {
    this.router.navigate(['note-form']);
  }

  editNote(note: any) {
    this.router.navigate(['note-form'], {
      state: { updateId: note.id },
    });
  }
}
