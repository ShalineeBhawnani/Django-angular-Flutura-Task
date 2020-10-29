import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MenuBarComponent } from '../components/menu-bar/menu-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedRoutes } from './shared.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, MenuBarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule, 
    MatSnackBarModule,
    RouterModule.forChild(SharedRoutes),
  ],
  exports:
  [
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    MenuBarComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule, 
    MatSnackBarModule,
    CommonModule,
  ],
})
export class SharedModule { }
