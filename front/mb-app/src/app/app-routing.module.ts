import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard';

const routes: Routes = [
  { path: '',
    loadChildren: `./modules/layout.module#LayoutModule` },
  { path: 'login',
    loadChildren: `./modules/login.module#LoginModule` },
  { path: 'register',
    loadChildren: `./modules/register.module#RegisterModule` },
  { path: 'remind-password',
    loadChildren: `./modules/remind-password.module#RemindPasswordModule` },
  { path: 'user/:username',
    loadChildren: `./modules/profile.module#ProfileModule` },
  { path: 'settings',
    loadChildren: `./modules/settings.module#SettingsModule`, canActivate: [AuthGuard] },
  { path: 'profile',
    loadChildren: `./modules/user-profile.module#UserProfileModule`, canActivate: [AuthGuard] },
  { path: 'post/:id',
    loadChildren: `./modules/post-detail.module#PostDetailModule` },
  { path: 'page404',
    loadChildren: `./modules/page404.module#Page404Module` },
  { path: '**', redirectTo: '/page404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
