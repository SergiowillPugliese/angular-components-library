import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SweetService {

  constructor() { }


  showToast(text: string, icon: 'error' | 'success' | 'info' | 'question' | 'warning', timer: number = 2000) {
    Swal.fire({
      icon: icon,
      toast: true,
      timer: timer,
      iconColor: 'white',
      text: text,
      width: 'auto',
      position: 'top-right',
      showConfirmButton: false,
      customClass: {
        popup: 'colored-toast'
      },
    })
  }

  showDialog(title: string, message: string, icon: 'error' | 'success' | 'info' | 'question' | 'warning', confirmButtonText: string = 'Esci', showCancelButton: boolean = true) {
    return Swal.fire({
      title: title,
      icon: icon,
      html: message,
      showCancelButton: showCancelButton,
      heightAuto: false,
      focusConfirm: true,
      confirmButtonText: confirmButtonText,
      iconColor: 'var(--ion-color-primary)',
      confirmButtonColor: 'var(--ion-color-secondary)',
      cancelButtonColor: 'var(--ion-color-primary)',
      cancelButtonText: 'Annulla',
      reverseButtons: true
    })
  }

}
