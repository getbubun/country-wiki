import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";
import { AppService } from "./app.service";
import { CountryModule } from "./country/country.module";
import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { SingleCountryComponent } from "./country/single-country/single-country.component";
import { AllCountriesComponent } from "./country/all-countries/all-countries.component";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CountryModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "*", component: HomeComponent },
      { path: "**", component: HomeComponent },
      {
        path: "allCountry/:firstLevel/:secondLevel/:thirdLevel",
        component: AllCountriesComponent
      },
      { path: "country/:countryName", component: SingleCountryComponent }
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}