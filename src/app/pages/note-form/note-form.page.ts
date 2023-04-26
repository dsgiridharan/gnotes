import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonModal, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.page.html',
  styleUrls: ['./note-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [ApiService, EventService],
})
export class NoteFormPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal | any;
  updateId: any;
  title: string = '';
  note: string = '';
  labels: any = [];
  labelsCopy: any = [];
  searchKey: string = '';
  searchKeyLength: any;
  isNewLabel: boolean = false;
  existingLabel: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private event: EventService,
    private navcntrl: NavController
  ) {
    var state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.updateId = state['updateId'];
    }
    if (this.updateId) {
      this.getNoteById();
    }
  }

  ngOnInit() {
    this.getLabels();
  }

  ionViewWillLeave() {
    if (this.title.length != 0 && this.note.length != 0) {
      let postData = {
        title: this.title,
        content: this.note,
        label_id: this.existingLabel.id ?? null,
      };
      this.updateId ? this.updateNote(postData) : this.createNote(postData);
    }
  }

  createNote(postData: any) {
    this.api.createNote(postData).subscribe({
      next: (v: any) => {
        console.log(v);
        this.event.publishNoteEvent({
          notes: v,
        });
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  updateNote(postData: any) {
    this.api.updateNote(postData, this.updateId).subscribe({
      next: (v: any) => {
        this.event.publishNoteEvent({
          notes: v,
        });
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  getNoteById() {
    this.api.getNoteById(this.updateId).subscribe({
      next: (v: any) => {
        this.title = v.title;
        this.note = v.content;
        this.existingLabel = v.label;
      },
    });
  }

  getLabels() {
    this.api.labels().subscribe({
      next: (v: any) => {
        this.labels = v;
        this.labelsCopy = v;
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  chooseLabel(label: any) {
    this.modal.dismiss();
    let postData = {
      title: this.title,
      content: this.note,
      label_id: label.id,
    };
    this.api.updateNote(postData, this.updateId).subscribe({
      next: (v: any) => {
        this.getNoteById();
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  removeLabel() {
    let postData = {
      title: this.title,
      content: this.note,
      label_id: null,
    };
    this.api.updateNote(postData, this.updateId).subscribe({
      next: (v: any) => {
        this.getNoteById();
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  searchLabel(ev: any) {
    var key = ev.detail.value.toLowerCase();
    if (this.searchKeyLength > key.length) {
      this.labels = this.labelsCopy;
    }

    this.searchKeyLength = key.length;

    if (key && key.trim() !== '') {
      this.labels = this.labels.filter((item: any) => {
        return item.name.toLowerCase().includes(key.toLowerCase());
      });
    }

    if (key === '') {
      this.labels = this.labelsCopy;
    }

    if (this.labels.length == 0) {
      this.isNewLabel = true;
      this.searchKey = ev.detail.value;
    } else {
      this.isNewLabel = false;
    }
  }

  createLabel() {
    let postData = {
      name: this.searchKey,
    };

    this.api.createLabel(postData).subscribe({
      next: (v: any) => {
        this.getLabels();
        this.isNewLabel = false;
        this.searchKey = '';
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  deleteNote() {
    this.api.moveToTrash(this.updateId).subscribe({
      next: (v: any) => {
        console.log(v);
        this.navcntrl.back();
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
}
