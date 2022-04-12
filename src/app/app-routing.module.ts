import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./screens/detail/detail.module').then((m) => m.DetailPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'akun-baru',
    loadChildren: () => import('./screens/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'options',
    loadChildren: () => import('./screens/options/options.module').then( m => m.OptionsPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./screens/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'data-transaksi',
    loadChildren: () => import('./screens/data-transaksi/data-transaksi.module').then( m => m.DataTransaksiPageModule)
  },
  {
    path: 'laporan',
    loadChildren: () => import('./screens/laporan/laporan.module').then( m => m.LaporanPageModule)
  },
  {
    path: 'new-menu',
    loadChildren: () => import('./screens/new-menu/new-menu.module').then( m => m.NewMenuPageModule)
  },
  {
    path: 'new-menu/:id',
    loadChildren: () => import('./screens/new-menu/new-menu.module').then( m => m.NewMenuPageModule)
  },
  {
    path: 'struke',
    loadChildren: () => import('./screens/struke/struke.module').then( m => m.StrukePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
