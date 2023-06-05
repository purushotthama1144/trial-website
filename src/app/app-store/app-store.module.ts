import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStoreRoutingModule } from './app-store-routing.module';
import { AppStoreComponent } from './app-store.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AppStoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppStoreRoutingModule
  ]
})

export class AppStoreModule { }