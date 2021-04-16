import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { FilterPipe } from "./filter.pipe";
import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
