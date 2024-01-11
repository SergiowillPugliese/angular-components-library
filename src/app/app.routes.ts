import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { NavController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { SweetService } from './core/sweet.service';
import { User, UserRole } from './login/interface/auth.interface';
import { AuthService } from './login/services/auth.service';

function checkTempPassowrd(checkTemporaryPassword: boolean, loggedUser: User, sweetService: SweetService) {
  if (checkTemporaryPassword && loggedUser.temporaryPassword) {
    sweetService.showDialog("Gestisci Password", "La tua password è temporanea, vai nella sezione profilo per aggiornarla!", "info", "Chiudi", false);
  }
}

const AuthGaurd = async (route: ActivatedRouteSnapshot, routSnap: RouterStateSnapshot) => {
  const navCtrl = inject(NavController);
  const authService = inject(AuthService);
  const sweetService = inject(SweetService);
  const roles: UserRole[] = route.data['roles'] ?? [];
  const checkTemporaryPassword: boolean = route.data['checkPassword'];
  const token = authService.getToken();
  if (token && authService.getAuthUserValue() && !roles.length) {
    const loggedUser = await lastValueFrom(authService.getUserFromToken());
    checkTempPassowrd(checkTemporaryPassword, loggedUser, sweetService);
    return true;
  }
  if (token && authService.getAuthUserValue() && roles.length) {
    const loggedUser = await lastValueFrom(authService.getUserFromToken());
    checkTempPassowrd(checkTemporaryPassword, loggedUser, sweetService);
    const check = roles.includes(loggedUser.role);
    if (!check) {
      sweetService.showToast("Non si hanno le autorizzazioni necessarie per accedere alla pagina", "warning");
      navCtrl.navigateRoot("/home");
      return false;
    }
    return true;
  }
  navCtrl.navigateRoot("/login");
  return false;
}

export const routes: Routes = [
  {
    path: '/something',
    canActivate: [AuthGaurd],
    data: { roles: [UserRole.ADMIN, UserRole.COMMERCIALE, UserRole.AMMINISTRAZIONE, UserRole.HR, UserRole.SUPPORTO, UserRole.SUPPORTO_SPECIAL] },
    title: 'Title',
    loadComponent: () => import('').then(m => m.ComponentInstance)
  },
];
