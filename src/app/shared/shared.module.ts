import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgxPaginationModule } from "ngx-pagination";
import { ShareButtonModule } from "ngx-sharebuttons/button";
import { ShareIconsModule } from "ngx-sharebuttons/icons";
import { SwiperModule } from "swiper/angular";
import { CommentsModalComponent } from "../blog/blog-detail/comments-modal/comments-modal.component";
import { BlogRightBlockComponent } from "../blog/blog-right-block/blog-right-block.component";
import { BlogComponent } from "../blog/blog.component";
import { ContactComponent } from "../contact/contact.component";
import { TCComponent } from "../digilink/t-c/t-c.component";
import { DownloadAppComponent } from "../download-app/download-app.component";
import { PopupComponent } from "../home/popup/popup.component";
import { LazyloadingDirective } from "../lazy-loading/lazyloading.directive";
import { MaterialModule } from "../material.module";
import { RiseTicketComponent } from "../rise-ticket/rise-ticket.component";
import { SanitizePipe } from "../sanitize.pipe";
import { SearchFilterPipe } from "../search.pipe";
import { SubscribeComponent } from "../subscribe/subscribe.component";
import { TrendingToolsComponent } from "../tools/trending-tools/trending-tools.component";
import { EnumeratePipe } from "./enumerate.pipe";

@NgModule({
    declarations: [
        BlogComponent,
        TrendingToolsComponent,
        SubscribeComponent,
        DownloadAppComponent,
        BlogRightBlockComponent,
        SanitizePipe,
        EnumeratePipe,
        RiseTicketComponent,
        PopupComponent,
        CommentsModalComponent,
        TCComponent,
        ContactComponent,
        LazyloadingDirective,
        SearchFilterPipe,
    ],
    imports: [
        CommonModule,
        CarouselModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SwiperModule,
        NgxPaginationModule,
        HttpClientModule,
        ShareButtonModule,
        ShareIconsModule,
        Ng2SearchPipeModule,
    ],
    exports: [
        BlogComponent,
        TrendingToolsComponent,
        SubscribeComponent,
        DownloadAppComponent,
        BlogRightBlockComponent,
        SanitizePipe,
        CarouselModule,
        MaterialModule,
        FormsModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        ShareButtonModule,
        ShareIconsModule,
        EnumeratePipe,
        RiseTicketComponent,
        PopupComponent,
        CommentsModalComponent,
        TCComponent,
        ContactComponent,
        LazyloadingDirective,
        SearchFilterPipe,
        Ng2SearchPipeModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }