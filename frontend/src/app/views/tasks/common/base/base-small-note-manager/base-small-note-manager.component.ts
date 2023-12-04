import {Component, OnInit} from '@angular/core';
import {ParticipantsService} from "@app/views/tasks/participants/services/participants.service";
import {TranslatorService} from "@app/views/tasks/participants/services/translator.service";
import {Mode, Note} from "@app/views/tasks/common/models/small-note";

@Component({
  selector: 'app-base-small-note-manager',
  templateUrl: './base-small-note-manager.component.html',
  styleUrls: ['./base-small-note-manager.component.scss']
})
export abstract class BaseSmallNoteManagerComponent implements OnInit {

  textareaNotes: Note[] = [];

  protected constructor(public participantService: ParticipantsService,
                        public translator: TranslatorService) {

  }

  ngOnInit(): void {
  }

  getTextareaNoteOrCreate(id: number, note: string) {
    if (typeof id !== 'number') {
      return null
    }
    const textareaNote = this.textareaNotes.find(t => t.id === id);
    if (textareaNote)
      return textareaNote;
    this.textareaNotes.push({
      id,
      mode: Mode.VIEW,
      content: note
    });
    return this.getTextareaNoteOrCreate(id, note);
  }

  onNoteEdited(note: Note) {
    if (note.content.length === 0) {
      return;
    }
    this.participantService.updateParticipant(note.id, {note: note.content}).subscribe({
      next: p => {
        console.log(p.id, 'note is updated')
        const note = this.textareaNotes.find(n => n.id === p.id)
        note.content = p.note;
      },
      error: err => this.createTextareaNotes()
    })
  }

  protected abstract createTextareaNotes();

}
