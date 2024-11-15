import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PetManagementComponent } from './components/pet-management/pet-management.component';
import { PetEditComponent } from './components/pet-management/pet-edit/pet-edit.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { sl_SI } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import sl from '@angular/common/locales/sl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { OwnerManagementComponent } from './components/owner-management/owner-management.component';
import { OwnerEditComponent } from './components/owner-management/owner-edit/owner-edit.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { PetModalComponent } from './components/pet-modal/pet-modal.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';

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
        LoginImageComponent,
        OwnerManagementComponent,
        OwnerEditComponent,
        PetModalComponent
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
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
        NzInputModule,
        NzModalModule,
        NzSelectModule,
        NzFormModule,
        NzDatePickerModule,
        NzRadioModule,
        NzSpinModule,
    ]
})
export class AppModule { }
