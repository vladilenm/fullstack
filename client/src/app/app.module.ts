import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {AppComponent} from './app.component'
import {LoginPageComponent} from './login-page/login-page.component'
import {RegistrationPageComponent} from './registration-page/registration-page.component'
import {AppRoutingModule} from './app.routing-module'
import {EmptyLayoutComponent} from './shared/layouts/empty-layout/empty-layout.component'
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component'
import {OverviewPageComponent} from './overview-page/overview-page.component'
import {AnalyticsPageComponent} from './analytics-page/analytics-page.component'
import {HistoryPageComponent} from './history-page/history-page.component'
import {NewOrderPageComponent} from './new-order-page/new-order-page.component'
import {ProductsPageComponent} from './products-page/products-page.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {AuthService} from './shared/services/auth.service'
import {AuthGuard} from './shared/classes/auth.guard'
import {ProductFormPageComponent} from './products-page/product-form-page/product-form-page.component'
import {CategoriesService} from './shared/services/categories.service'
import {TokenInterceptor} from './shared/classes/token.interceptor'
import {PositionsFormComponent} from './products-page/product-form-page/positions-form/positions-form.component'
import {PositionsService} from './shared/services/positions.service'
import {OrderCategoriesComponent} from './new-order-page/order-categories/order-categories.component'
import {OrderProductionComponent} from './new-order-page/order-production/order-production.component'
import {OrdersService} from './shared/services/orders.service'
import {HistoryListComponent} from './history-page/history-list/history-list.component'
import {HistoryFilterComponent} from './history-page/history-filter/history-filter.component'
import {LoaderComponent} from './shared/components/loader/loader.component'
import {AnalyticsService} from './shared/services/analytics.service'


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    EmptyLayoutComponent,
    SiteLayoutComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    NewOrderPageComponent,
    ProductsPageComponent,
    ProductFormPageComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderProductionComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CategoriesService,
    PositionsService,
    OrdersService,
    AnalyticsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
