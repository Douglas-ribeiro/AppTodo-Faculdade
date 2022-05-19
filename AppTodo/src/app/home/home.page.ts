import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // adicionando uma lista de tarefas( um array de objetos para a tarefa)
  tarefas: any[] = [];

  constructor(private alertCrtl: AlertController, private toastCtrl: ToastController) {
  
    let tarefaSalva = localStorage.getItem('tarefaUsuario');
  
  if (tarefaSalva != null) {
    this.tarefas = JSON.parse(tarefaSalva);
  }


  }


   


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
        handler: (form) => {
          this.adicionaTarefa(form.tarefa1);
        },
      },
    ],
  });

  await alert.present();
}

// método para adicionar uma tarefa no local storage
async adicionaTarefa(novaTarefa: string) {
  // definição de uma variável com a estrutura da nossa tarefa
  const tarefa = { nome:novaTarefa, realizada: false };
  // adiciona a tarefa em uma lista de tarefas
  this.tarefas.push(tarefa);

  //depois de atualizar a nossa lista de tarefa, chama a função para salvar no Local Storage
  this.salvaLocalStorage();

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

salvaLocalStorage(){
  localStorage.setItem('tarefaUsuario', JSON.stringify(this.tarefas));
}

}