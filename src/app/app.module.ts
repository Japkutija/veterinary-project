import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PetManagementComponent } from './components/pet-management/pet-management.component';
import { PetEditComponent } from './components/pet-management/pet-edit/pet-edit.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { sl_SI } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import sl from '@angular/common/locales/sl';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzListModule, NzListPaginationComponent } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LoginImageComponent } from "./components/login/login-image/login-image.component";
import { NzInputModule } from 'ng-zorro-antd/input';

registerLocaleData(sl);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        PetManagementComponent,
        PetEditComponent,
        HeaderComponent,
        FooterComponent,
        MainComponent,
        LoginFormComponent,
        LoginImageComponent
    ],
    providers: [
        { provide: NZ_I18N, useValue: sl_SI }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        NzButtonModule,
        NzTypographyModule,
        NzListModule,
        NzTableModule,
        NzPaginationModule,
        NzInputModule
    ]
})
export class AppModule { }
