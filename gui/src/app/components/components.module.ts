import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { MatIconModule } from '@angular/material/icon';
import { computeMsgId } from '@angular/compiler';

const components = [
  HamburgerComponent,
]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [...components]
})
export class ComponentsModule { }
