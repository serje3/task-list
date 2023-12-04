import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Mode, Note} from "@app/views/tasks/common/models/small-note";

@Component({
  selector: 'app-small-note',
  templateUrl: './small-note.component.html',
  styleUrls: ['./small-note.component.scss']
})
export class SmallNoteComponent implements OnInit {

  @Input() note: Note

  @Input() showFullText = false;

  @Output() edit: EventEmitter<Note> = new EventEmitter<Note>();

  protected readonly Mode = Mode;

  constructor() {
  }

  get isMobile() {
    return window.innerWidth < 960;
  }

  ngOnInit(): void {
  }

  switchMode() {
    if (this.note.mode === Mode.VIEW) {
      this.note.mode = Mode.EDIT;
    } else {
      this.note.mode = Mode.VIEW;
    }
  }

  onEditSubmit() {
    this.edit.emit(this.note);
  }
}
