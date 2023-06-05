import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerificationComponent } from './email/email-verification/email-verification.component';
import { EmailVerifiedComponent } from './email/email-verified/email-verified.component';
import { RiseTicketMailComponent } from './email/rise-ticket-mail/rise-ticket-mail.component';
import { MiddlewareComponent } from './middleware/middleware.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnlockMiddlewareComponent } from './unlock/unlock-middleware/unlock-middleware.component';

export const rootRouterConfig: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'about-us-best-brokerage-firm', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'ant', loadChildren: () => import('./ant/products/products.module').then(m => m.ProductsModule) },
  { path: 'margin-calculator', loadChildren: () => import('./tools/margin-calculator/margin-calculator.module').then(m => m.MarginCalculatorModule) },
  { path: 'brokerage-calculator', loadChildren: () => import('./tools/brokerage-calculator/brokerage-calculator.module').then(m => m.BrokerageCalculatorModule) },
  { path: 'pricing', loadChildren: () => import('./pricing/pricing.module').then(m => m.PricingModule) },
  { path: 'business-partner', loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule) },
  { path: 'antiq', loadChildren: () => import('./blog/blog-list/blog-list.module').then(m => m.BlogListModule), data: { breadcrumb: 'AntIq' } },
  { path: 'antiq/author-blog/:author_url', loadChildren: () => import('./blog/author-blog/author-blog.module').then(m => m.AuthorBlogModule) },
  { path: 'antiq/category/:subcategory', loadChildren: () => import('./blog/blog-category/blog-category.module').then(m => m.BlogCategoryModule) },
  { path: 'antiq/:subcategory/:title', loadChildren: () => import('./blog/blog-detail/blog-detail.module').then(m => m.BlogDetailModule) },
  { path: 'locate-us/:branch', loadChildren: () => import('./locate-us/locate-us.module').then(m => m.LocateUsModule) },
  { path: 'careers', loadChildren: () => import('./careers/careers.module').then(m => m.CareersModule) },
  { path: 'digilink-client-version', loadChildren: () => import('./digilink/digilink-client/digilink-client.module').then(m => m.DigilinkClientModule) },
  { path: 'digilink-for-partner', loadChildren: () => import('./digilink/digilink-partner/digilink-partner.module').then(m => m.DigilinkPartnerModule) },
  { path: 'helpdesk', loadChildren: () => import('./helpdesk/helpdesk.module').then(m => m.HelpDeskModule) },
  { path: 'downloads', loadChildren: () => import('./downloads/downloads.module').then(m => m.DownloadsModule) },
  { path: 'support', loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
  { path: 'how-to-videos', loadChildren: () => import('./howto/howto.module').then(m => m.HowToModule) },
  { path: 'ant-plus', loadChildren: () => import('./ant/ant-plus-page/ant-plus.module').then(m => m.AntPlusModule) },
  { path: 'ant-mobi', loadChildren: () => import('./ant/ant-mobi/ant-mobi.module').then(m => m.AntMobiModule) },
  // { path: 'ant-desk', loadChildren: () => import('./ant/ant-desk/ant-desk.module').then(m => m.AntDeskModule) },
  { path: 'ant-web', loadChildren: () => import('./ant/ant-web/ant-web.module').then(m => m.AntWebModule) },
  { path: 'rms-live-updates', loadChildren: () => import('./rms-update/rms-update.module').then(m => m.RmsUpdateModule) },
  { path: 'trade-link', loadChildren: () => import('./tradelink/tradelink.module').then(m => m.TradelinkModule) },
  { path: 'pivot-points', loadChildren: () => import('./pivot-points/pivot-points.module').then(m => m.PivotPointsModule) },
  { path: 'privacy-policy', loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
  { path: 'contact-us', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'open-account-fill-kyc-request-call-back', loadChildren: () => import('./open-account/open-account.module').then(m => m.OpenAccountModule) },
  { path: 'open-an-account', loadChildren: () => import('./open-account/capture-lead-open-account/capture-lead-open-account.module').then(m => m.CaptureLeadOpenAccountModule) },
  { path: 'link-generation', loadChildren: () => import('./link-generation/link-generation.module').then(m => m.LinkGenerationModule) },
  { path: 'legal-documentation', loadChildren: () => import('./legal-documentation/legal-documentation.module').then(m => m.LegalDocumentationModule) },
  { path: 'ebook', loadChildren: () => import('./ebook/ebook.module').then(m => m.EbookModule) },
  { path: 'digipromo', loadChildren: () => import('./digipromo/digipromo.module').then(m => m.DigipromoModule) },
  { path: 'circulars', loadChildren: () => import('./circulars/circulars.module').then(m => m.CircularsModule) },
  { path: 'trading-holidays-2022', loadChildren: () => import('./circulars/trading-holiday/trading-holiday.module').then(m => m.TradingHolidayModule) },
  { path: 'refer-us', loadChildren: () => import('./refer-us/refer-us.module').then(m => m.ReferUsModule) },
  { path: 'ab-store', loadChildren: () => import('./app-store/app-store.module').then(m => m.AppStoreModule) },
  { path: 'feedback', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule) },
  { path: 'site-map', loadChildren: () => import('./site-map/site-map.module').then(m => m.SiteMapModule) },
  { path: 'achievements', loadChildren: () => import('./achievements/achievements.module').then(m => m.AchievementsModule) },
  { path: 'call-trade', loadChildren: () => import('./dealing-desk/dealing-desk.module').then(m => m.DealingDeskModule) },
  { path: 'bank-details', loadChildren: () => import('./bank-details/bank-details.module').then(m => m.BankDetailsModule) },
  { path: 'fund-transfer-upi', loadChildren: () => import('./bank-details/fund-transfer/fund-transfer.module').then(m => m.FundTransferModule) },
  // { path: 'economic-calender', loadChildren: () => import('./econmic-calender/economic-calender.module').then(m => m.EconomicCalenderModule) },
  { path: 'ekyc-guidelines', loadChildren: () => import('./ekyc-guidelines/ekyc-guidelines.module').then(m => m.EkycGuidelinesModule) },
  { path: 'aliceblue-cares', loadChildren: () => import('./ab-cares/ab-cares.module').then(m => m.AbCaresModule) },
  { path: 'annual-returns', loadChildren: () => import('./annual-returns/annual-returns.module').then(m => m.AnnualReturnsModule) },
  { path: 'investor-charter', loadChildren: () => import('./investor-charter/investor-charter.module').then(m => m.InvestorCharterModule) },
  { path: 'directors-bio/:name', loadChildren: () => import('./director/director.module').then(m => m.DirectorModule) },
  { path: 'antmobi/2-sided-referral', loadChildren: () => import('./digilink/digilink-client/digilink-client.module').then(m => m.DigilinkClientModule) },
  { path: 'unlock', loadChildren: () => import('./unlock/unlock/unlock.module').then(m => m.UnlockModule) },
  { path: 'aspiring-investor-program', loadChildren: () => import('./aspiring-investors/aspiring-investors.module').then(m => m.AspiringInvestorsModule) },
  { path: 'landing-page/:url', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'login', loadChildren: () => import('./unlock/login/login.module').then(m => m.LoginModule) },
  { path: 'antplus2', loadChildren: () => import('./ant/api/api.module').then(m => m.ApiModule) },
  { path: 'unlock-middleware', component: UnlockMiddlewareComponent },
  { path: 'email-verification-successful', component: EmailVerificationComponent },
  { path: 'email-already-verified', component: EmailVerifiedComponent },
  { path: 'askus@aliceblueonline.com', component: RiseTicketMailComponent },
  { path: 'lic-ipo', loadChildren: () => import('./landing-page/lic-ipo/lic-ipo.module').then(m => m.LicIpoModule) },
  { path: 'page-not-found', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
  { path: '**', component: MiddlewareComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(rootRouterConfig, {
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
