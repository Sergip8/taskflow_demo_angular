import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { ViewComponent } from "./view.component";
import { AdminRoutingModule } from "./view-routing.module";
import { LayoutsModule } from "./layouts/layouts.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RequestsInterceptor } from "../../common/interceptors/requests.interceptor";

@NgModule({
  declarations: [ViewComponent],
  imports: [CommonModule, AdminRoutingModule, LayoutsModule],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: RequestsInterceptor, multi: true },
  ],
})
export class ViewModule {}
