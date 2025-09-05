import { Component, Input, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';
import { IBook } from 'src/app/interfaces/book';
import { INote as INote } from 'src/app/interfaces/note';

@Component({
  selector: 'app-modal-view-pdf',
  templateUrl: './modal-view-pdf.component.html',
  styleUrls: ['./modal-view-pdf.component.scss', "../../app.component.scss"],
  imports: [IonicModule, PdfViewComponent]
})
export class ModalViewPDFComponent  implements OnInit {
  @Input() book!: IBook;

  constructor(
    private modalController : ModalController, 
    private alertController : AlertController
  ) {}

  ngOnInit() {}

  ngOnChanges(): void {}

	closeModal(){
    this.modalController.dismiss()
	}

  async showAlertAddNote(bookTitle: string){
    const alert = await this.alertController.create({
      header: "Add Note",
      buttons: [
        { text: "Cancel" },
        {
          text: "Add",
          handler: (data) => {
            if(data.title.length >= 3 && data.text.length >= 3){
              const newNote : INote = {
                id: Math.random(),
                idBook: this.book.id,
                title: data.title,
                text: data.text,
                titleBook: bookTitle
              }
      
              const notes = (JSON.parse(localStorage.getItem("notes") ?? "[]") as INote[])
              notes.push(newNote)
      
              localStorage.setItem("notes", JSON.stringify(notes))
              return true
            }

            return false
          }
        }
      ],
      inputs: [
        { name: "title", placeholder: "Title note", type: "textarea" },
        { name: "text", placeholder: 'Text note', type: "textarea" }
      ]
    })

    await alert.present()
  }

  saveBook(book: IBook){
    const saveBooks = (JSON.parse(localStorage.getItem("saveBooks") ?? "[]") as IBook[])
    saveBooks.push(book)

    localStorage.setItem("saveBooks", JSON.stringify(saveBooks))
  }
}
