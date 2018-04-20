import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AuthGuard} from './shared/classes/auth.guard'
import {LoginPageComponent} from './login-page/login-page.component'
import {RegistrationPageComponent} from './registration-page/registration-page.component'
import {EmptyLayoutComponent} from './shared/layouts/empty-layout/empty-layout.component'
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component'
import {AnalyticsPageComponent} from './analytics-page/analytics-page.component'
import {HistoryPageComponent} from './history-page/history-page.component'
import {NewOrderPageComponent} from './new-order-page/new-order-page.component'
import {OverviewPageComponent} from './overview-page/overview-page.component'
import {ProductsPageComponent} from './products-page/products-page.component'
import {ProductFormPageComponent} from './products-page/product-form-page/product-form-page.component'
import {OrderCategoriesComponent} from './new-order-page/order-categories/order-categories.component'
import {OrderProductionComponent} from './new-order-page/order-production/order-production.component'

const routes: Routes = [
  {
    path: '', component: EmptyLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'order', component: NewOrderPageComponent, children: [
        {path: '', component: OrderCategoriesComponent},
        {path: ':id', component: OrderProductionComponent}
      ]},
      {path: 'categories', component: ProductsPageComponent},
      {path: 'categories/new', component: ProductFormPageComponent},
      {path: 'categories/:id', component: ProductFormPageComponent},
      {path: 'analytics', component: AnalyticsPageComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
