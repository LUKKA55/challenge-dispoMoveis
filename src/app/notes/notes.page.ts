import { Component } from '@angular/core';
import { INote } from '../interfaces/note';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
  styleUrls: ['notes.page.scss', '../app.component.scss'],
  standalone: false,
})
export class NotesPage {
  private notes: INote[] = []

  showSearchBar!:boolean;
  filteredNotes: INote[] = []

  constructor(
    private alertController: AlertController, 
    private router: Router
  ) {}

  ngOnInit(){
    this.router.events.subscribe(event => {
      if (
        event instanceof NavigationEnd && 
        event.urlAfterRedirects.includes('/notes')
      ){
        this.notes = (JSON.parse(localStorage.getItem("notes") ?? "[]") as INote[])
        this.filteredNotes = this.notes
        this.showSearchBar = this.filteredNotes.length > 0
      }
    });
  }

  async editNote(slidingItem: IonItemSliding, note: INote){
    const alert = await this.alertController.create({
      header: "Edit Note",
      buttons: [
        { text: "Cancel" },
        {
          text: "Confirm",
          handler: (data) => {
            if(data.title.length >= 3 && data.text.length >= 3){
              const editNote : INote = {
                ...note,
                title: data.title,
                text: data.text
              }

              let idx = this.notes.findIndex(a => a.id === note.id)
              this.notes[idx] = editNote

              localStorage.setItem("notes", JSON.stringify(this.notes))

              idx = this.filteredNotes.findIndex(a => a.id === note.id)
              this.filteredNotes[idx] = editNote

              return true
            }

            return false
          }
        }
      ],
      inputs: [
        { name: "title", placeholder: "Title note", value: note.title, type: "textarea" },
        { name: "text", placeholder: 'Text note', value: note.text, type: "textarea" }
      ]
    })

    await alert.present()

    alert.onWillDismiss().then(async() => {
      await slidingItem.close()
    })
  }

  async deleteNote(slidingItem: IonItemSliding, idNote: number){
    const notes = this.notes.filter(a => a.id !== idNote)
    this.notes = notes
    localStorage.setItem("notes", JSON.stringify(this.notes))

    const notesFiltered = this.filteredNotes.filter(a => a.id !== idNote)
    this.filteredNotes = notesFiltered
    this.showSearchBar = this.filteredNotes.length > 0

    await slidingItem.close()
  }

  async expandNote(note: INote){
    const alert = await this.alertController.create({
      header: note.title,
      subHeader: "by: " + note.titleBook,
      message: note.text,
      buttons: [{ text: "Close" }]
    })

    await alert.present()
  }

  filterNotes(event: Event){
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredNotes = this.notes.filter(n => n.titleBook.toLowerCase().includes(searchTerm));
  }		
}
