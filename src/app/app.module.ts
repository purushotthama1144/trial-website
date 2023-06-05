import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthGuard } from './service/auth/auth.guard';
import { SharedModule } from './shared/shared.module';
import { UnlockMiddlewareComponent } from './unlock/unlock-middleware/unlock-middleware.component';
import { HeaderComponent } from './header/header.component';
import { AttentionComponent } from './footer/attention/attention.component';
import { BranchesComponent } from './footer/branches/branches.component';
import { CopyrightComponent } from './footer/copyright/copyright.component';
import { DisclaimerComponent } from './footer/disclaimer/disclaimer.component';
import { FooterAdressComponent } from './footer/footer-adress/footer-adress.component';
import { FooterMenuComponent } from './footer/footer-menu/footer-menu.component';
import { FooterComponent } from './footer/footer.component';
import { UserlinkComponent } from './footer/userlink/userlink.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { MiddlewareComponent } from './middleware/middleware.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserlinkComponent,
    FooterMenuComponent,
    AttentionComponent,
    FooterAdressComponent,
    DisclaimerComponent,
    BranchesComponent,
    MiddlewareComponent,
    CopyrightComponent,
    UnlockMiddlewareComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
