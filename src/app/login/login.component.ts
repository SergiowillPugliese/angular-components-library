import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { SweetService } from '../core/sweet.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  showPassword: boolean = false;
  formLogin: FormGroup = new FormGroup({
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    password: new FormControl<string>("", [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private menuCtrl: MenuController,
    private sweetService: SweetService,
    private authService: AuthService,
    private navCtrl: NavController) { }

  ngOnInit(): void {
    this.menuCtrl.swipeGesture(false);
    this.menuCtrl.enable(false);
  }

  async login() {
    if (this.formLogin.invalid) {
      return;
    }
    try {
      this.isLoading = true;
      const formValue = { ...this.formLogin.value };
      this.formLogin.disable();
      await lastValueFrom(this.authService.login(formValue));
      this.navCtrl.navigateRoot("/home");
    } catch (e: any) {
      if (e.status === 401) {
        this.sweetService.showToast("Credenziali errate!", "error");
        return;
      }
      this.sweetService.showToast("Si è verificato un'errore di connessione, riprova più tardi!", "error");
    } finally {
      this.isLoading = false;
      this.formLogin.enable();
    }
  }


  showPasswordLost() {
    this.sweetService.showDialog("Password dimenticata?", "Contatta l'amministratore per il reset della tua password", "question", "Chiudi", false);
  }

}
