import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertCrtl: AlertController, private toastCtrl: ToastController) {}



async showAdd() {
  const alert = await this.alertCrtl.create({
    cssClass: 'my-custom-class',
    header: 'O que você deseja fazer?',
    inputs: [
      {
        name: 'tarefa1',
        type: 'text',
        placeholder: 'Digite o que deseja fazer.',
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Cancelado com sucesso!')
        },
      },
      {
        text: 'Adicionar',
        handler: () => {
          this.adicionaTarefa(form.tarefa1);
        },
      },
    ],
  });

  await alert.present();
}

// método para adicionar uma tarefa no local storage
async adicionaTarefa(novaTarefa: string) {
  //verifica se a variável está vazia ou não
  if (novaTarefa.trim().length < 1) {
    //caso a variável esteja vazia, irá apresentar uma mensagem no topo da tela
    const toast = await this.toastCtrl.create({
      message: 'Por favor, digite a tarefa! ',
      // duração da mensagem( 2 segundos neste exemplo)
      duration: 2000,
      // posição da mensagem, neste caso será no topo.
      position: 'top',
    });

  toast.present();
  return;

  }
}

}