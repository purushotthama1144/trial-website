import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.component.html',
  styleUrls: ['./term-conditions.component.scss'],
  
})
export class TermConditionsComponent implements OnInit {
  docLink: string = "";
  legalDocs = [
    {
      "question":"Terms & Conditions",
      "answer":"Use of Internet Trading at <a target='_blank' href='https://ant.aliceblueonline.com'>https://ant.aliceblueonline.com</a> is subject to the Rules and Regulations mentioned on This website. Your logging in amounts to an acceptance of these Terms and Conditions.",
      "link":"/legal-documentation/terms-and-conditions"
    },
    {
      "question":"Privacy Policy",
      "answer":`This Privacy Policy statement is applicable to Alice Blue. Alice Blue does not collect personal information about individuals except when such individuals specifically provide such information on a voluntary basis. The privacy and protection of your data and information provided to us are of vital importance, we are strongly committed to protecting the personal and financial information that you submit to us.
               <br><br> Personal information of individual users will not be sold or otherwise transferred to unaffiliated third parties without your approval at the time of collection.
               <br><br>To enable us to serve you better, it is necessary that your personal information available with us is updated and accurate. You can also send us an e-mail to askus@aliceblueindia.com and we shall ensure that your information is updated and protected from any misuse or unauthorized revelation.
               <br><br>We share information as part of normal business operations, such as providing you with any services to which you subscribe, any activity related to these services and informing you about these services.
               <br><br>Our website contains links to other websites, and Alice Blue would not be responsible for the privacy practices or the content of such Web sites.`,
      "link":"/legal-documentation/privacy-policy"
    },
    {
      "question":"Disclaimer",
      "answer":`<p>Investment in securities markets are subject to market risks, read all the related documents carefully before investing. Brokerage will not exceed SEBI prescribed limit.</p>
      <p><b>SEBI Registration No.</b>: INZ000156038 (NSE, BSE, MCX)<br>
      <b>NSE Trading Member Code</b>: 90112<br>
      <b>BSE Clearing Number</b>: 6670<br>
      <b>MCX Member Code</b>: 56710 <br>
      <b>CDSL DP ID</b>: 12085300, DP SEBI REG: IN-DP-364-2018 </p>
      <p><b>Corporate Office Address</b>: 153, MRB Arcade, Bagalur Main Road, Yelahanka, Bengaluru- 560063<br>
      <b>Compliance Officer</b>: Mr. Rakhesh Raghunath<br>
      <b>Ph</b>-  <a href="tel:08035215000">08035215000</a><br>
      <b>Email</b>: <a href="mailto:compliance@aliceblueindia.com">compliance@aliceblueindia.com.</a></p>
      <p>
         <strong>Disclaimer</strong>: Alice Blue Financial Services Pvt Ltd is a financial services intermediary and is engaged as Stock Broker since 2017. Alice Blue and/or any of its affiliates do not provide any tips, advisory, solicitation, opinions or portfolio management services regarding buying, selling and trading of any securities, directly or indirectly, in any manner. Information displayed or laid out by Alice Blue, including social media, are purely for either educational, informational, or discussion purposes and should not be construed as direct or indirect recommendation to invest, trade or speculate in the markets. Alice Blue would welcome and appreciate immediate notification or notice, if any person would come across any such tips, advisory, solicitation, opinions or related services regarding buying, selling and trading of any securities, directly or indirectly, in any manner from any person or platform which is believed to be or likely to be believed as Alice Blue. Please contact compliance@aliceblueindia.com for any of your queries with regard to the same. In no event shall Alice Blue be liable for any investments, trades or speculative activities performed by any person based on any such information or content and all such activities shall be solely at their own risk.
      </p>
      <p>
         Customers need to check products &amp; features before investing since the contours of the product rates may change from time to time. Alice Blue Financial Services is not liable for any loss or damage of any kind arising out of investments in these products.
      </p>
      <p>Investments in Equity, Currency, Futures &amp; Options, and Commodities are subject to market risk.</p>
      <p>Clients should read the Risk Disclosure Document issued by SEBI &amp; relevant exchanges &amp; the <a rel="noreferrer" href="https://aliceblueonline.com/assets/downloads/T&amp;C_General.pdf" download=""><b>T&amp;C</b></a> on <a rel="noreferrer" href="https://aliceblueonline.com/" target="_blank">aliceblueonline.com</a> before investing. </p>`,
      "link":"/legal-documentation/disclaimer"
    },
    {
      "question":"Disclosure",
      "answer":`The site, including any content or information contained within it or any site linked to the site, or any product or service licensed or purchased through the site, is provided on an "as is" basis and without warranties of any kind, either express or implied, including, but not limited to warranties of title or non-infringement or warranties of merchantability and fitness for a particular purpose, other than those warranties which are implied by and incapable of exclusion, restriction or modification under the laws applicable to this agreement. The website is owned, operated and maintained by Alice Blue Financial Services Pvt Ltd (hereinafter referred to as “Alice Blue”), a Company incorporated under the Companies Act, 2013 having CIN: U65929TZ2017PTCO28583, and having its Registered Office at #153, MRB Arcade, Bagalur Main Road, Yelahanka, Bangalore - 560063
      <br><br>
      You acknowledge that any warranty that is provided in connection with any of the products or services described herein is provided solely by the owner, advertiser, manufacturer or supplier of that product and/or service, and not by Alice Blue. Alice Blue does not warrant that your access to the site and/or related services will be uninterrupted or error-free, that defects will be corrected, or that this site or the server provided herein is free of viruses or other harmful components. Access to and use of this site and the information provided herein is at your own risk and Alice Blue does not undertake any accountability for any irregularities, viruses or damage to any computer that results from accessing, availing or downloading of any information from this site. Alice Blue does not warrant or make any representations regarding the use of or any consequences resulting from the use of any product and/or service purchased in terms of its compatibility, correctness, accuracy, and reliability or otherwise. You assume total responsibility and risk for your use of this site and all site-related services.
      <br><br>
      You agree that, except as provided under the Alice Blue return policy, Alice Blue and its directors, officers, employees, agents, sponsors, consultants, business partners or other representatives ('service providers') shall not be responsible or liable for any direct, indirect, incidental, consequential, special, exemplary, punitive or any other damages (including without limitation loss of profits, loss or corruption of data, loss of goodwill, work stoppage, computer failure or malfunction, or interruption of business) under any contract, negligence, strict liability or any other theory arising out of or relating in any way with the use of the site or in reliance of the information available on the site, site-related services, or any products or services offered or sold or displayed on the Alice Blue’s site.
      <br><br>
      If the foregoing limitation is held to be unenforceable, the maximum liability of Alice Blue and its service providers to you shall not exceed the amount of fees paid by you for the products or services that you have ordered through the site.
      <br><br>
      The possibility exists that the site could include inaccuracies or errors. Additionally, the possibility exists that unauthorized additions, deletions or alterations could be made by third parties to the site. Although Alice Blue attempts to ensure the highest level of integrity, correctness and authenticity of the site, it makes no guarantees whatsoever as to its completeness, correctness or accuracy. In the event that any inaccuracy arises, please inform Alice Blue so that it can be corrected.
      <br><br>
      The price and value of investments and the income derived from them can increase or decrease and you may not get back the amount you invest. Changes in the rate of exchange may have an adverse effect on the value, price and income of investments in deposits other than your own. Past performance is not necessarily an indicator of future performance. The services and investments referred to in our site may have tax consequences and it is important to bear in mind that Alice Blue does not provide tax advice. The level of taxation depends on individual circumstances and such levels and bases of taxation can change. You should consult your own tax advisor in order to understand any applicable tax consequences.
      <br><br>
      Alice Blue does not make any personal recommendations. The information on our Internet site is provided solely to enable investors to make their own investment decisions and does not constitute a recommendation to buy, sell or otherwise deal in investments. The services and the securities we offer may not be suitable for all customers. If you have any doubts, you should seek advice from an independent financial adviser.
      <br><br>
      No market analysis, research report or any other information, on the web site is to be construed as a representation with respect to shares, securities or other investments.
      <br><br>
      You understand and agree that no joint venture, partnership, employment or agency relationship exists between you and us as a result of this agreement or on account of use of our web site.
      <br><br>
      Price and availability of products and services offered on the site are subject to change without prior notice. To the extent that we provide information on the availability of products or services you should not rely on such information. Alice Blue.com will not be liable for any lack of availability of products and services you may order through the site.
      <br><br>
      <b>Disclaimer and Limitation of Liability</b>
      <br><br>
      Disclaimer: Alice Blue and/or any of its affiliates do not provide any tips, advisory, solicitation, opinions or portfolio management services regarding buying, selling and trading of any securities, directly or indirectly, in any manner. Information displayed or laid out by Alice Blue, including social media, are purely for either educational, informational, or discussion purposes and should not be construed as direct or indirect recommendation to invest, trade or speculate in the markets. Alice Blue would welcome and appreciate immediate notification or notice, if any person would come across any such tips, advisory, solicitation, opinions or related services regarding buying, selling and trading of any securities, directly or indirectly, in any manner from any person or platform which is believed to be or likely to be believed as Alice Blue. Please contact compliance@aliceblueindia.com for any of your queries with regard to the same. In no event shall Alice Blue be liable for any investments, trades or speculative activities performed by any person based on any such information or content and all such activities shall be solely at their own risk.
      <br><br>
      Transactions between you and Alice Blue shall be governed by and construed in accordance with the laws of India, without regard to any conflicts of laws of other nations. Any litigation regarding this agreement or any transaction between customer and Alice Blue.com or any action at law or in equity arising out of or relating to these agreement or transaction shall be filed only in the Competent Courts of Bangalore alone and the customer hereby agrees, consents and submits to the jurisdiction of such courts for the purpose of litigating any such action.
      <br><br>
      The Stock exchanges are not in any manner answerable, responsible or liable to any person or persons for any acts of omissions or commission, errors, mistakes and/or partners, agents’ associates etc., of any of the Rules, regulations, bye-laws of the Stock Exchanges, SEBI Act or any other laws in force from time to time. The Stock Exchanges is not answerable, responsible or liable for any information on this website or for any services rendered by us, our employees and our servants.
      <br><br>
      Please note that any of your personal details; including but not limited to, your registered contact number, password, login information, email ID, date of birth, bank account, address etc., is strictly not shared with any third party ,i.e. any non affiliate of Alice Blue, without your express consent.
      <br><br>
      Alice Blue or any of it’s affiliates, employees, agents or any other representatives would never contact you and ask you for your personal details such as your login information, password, Aadhaar OTP, bank account details and such other related information. Please do not provide any details to queries from calls where such information is asked by the caller who impersonates to be an affiliate of Alice Blue. For reporting any such information or for further queries with regard to this, please contact compliance@aliceblueindia.com`,
      "link":"/legal-documentation/disclosure"
    },
    {
      "question":"Rules and Regulations",     
      "answer":`<b> A) Introduction </b>
      <br>
      This document contains important information regarding the terms and conditions, which apply to your Net -Trading Account with Alice Blue Financial Services (P) Ltd. PLEASE READ THIS DOCUMENT CAREFULLY and retain it for future reference. Please note that the information contained herein is subject to change without notice.
      <br><br>
      <b>Opening your Trading Account</b>
      <br>
      To start Net trading with Alice Blue Financial Services (P) Ltd. you need to open a trading account and a Depository (or Demat shares) Account with Alice Blue Financial Services (P) Ltd.  All receipts and payments for buying and selling of shares and all commissions and charges will be posted to your trading account. Shares that you buy and sell through the trading account will be received in or delivered from your Demat account. Trading account refers to the account of the client maintained by Alice Blue Financial Services (P) Ltd in their books of accounts. Demat account refers to the account opened by you with Depository for holding securities in electronic form. For the purpose of Net-Trading through Alice Blue Financial Services (P) Ltd. Demat account refers to the account opened by a client with "Central Depository Services Ltd" (CDSL) through Alice Blue Financial Services (P) Ltd. as Depository Participants (DP).
      If you already have a Demat Account with Alice Blue Financial Services (P) Ltd., then the same Account can be linked to your Net trading Account. Just give us your Account details at the time of becoming a Net trading customer. Before we can make your Account operative, we require that you fill and sign all forms/agreements which form part of your Account opening kit, and supply us with all the relevant legal documents and financial information which law requires us to maintain. You warrant and represent that the information that you supply in your Account Application is accurate and truthful. please check with our Privacy Policy.
      You also expressly authorize Alice Blue Securities (P) Ltd. to obtain reports concerning your credit standing and business conduct. If your application is approved, Alice Blue Financial Services (P) Ltd. will open a Net trading Account (an “Account”) for you. We reserve the absolute right to either accept or reject your application on any grounds whatsoever and you agree that you shall not dispute the result in any manner whatsoever.
      <br><br>
      <b>B) Investment advice</b>
      You acknowledge that while Alice Blue Financial Services (P) Ltd. does provide advice regarding the suitability or profitability of a Scrip or investment, or any other tax or legal advice it may add on from time to time, You assume full responsibility with respect to transactions in or for your Account and your investment decisions. Alice Blue Financial Services (P) Ltd. and its officers, directors, employees, agents, and affiliates will have no liability with respect to transactions in or for your Account and your investment decisions.
      <br><br>
      <b>C) Applicable rules and regulations</b>
      All transactions in your Account shall be subject to the constitution, rules, regulations, customs and usage of the exchange or market, and its clearinghouse, if any, where the transactions are executed by Alice Blue Financial Services (P) Ltd. or its agents, including Alice Blue Financial Services (P) Ltd subsidiaries and affiliates. Also, where applicable, the transactions shall be subject to the provisions of the Securities and Contracts Regulations Act (SCRA), as amended, and to the rules and regulations of the Securities and Exchange Board of India (SEBI), National Securities Depository Limited (NSDL), the exchanges where Alice Blue Financial Services (P) Ltd will facilitate trading, and any applicable self-regulatory organization
      <br><br>
      <b>D) Who is eligible</b>
      You can open these Accounts if you are over 18 years and if you will operate this on an individual basis. It is open to resident Indians only. Indian regulations require us to maintain basic financial details about each client. You need to provide us the details of your bank account. Your signatures on the Account opening form need to be the same, as maintained in the bank records. All Resident Individuals need to provide us Income Tax returns details – IT PAN/GIR number, during your Account opening process
      <br><br>
      <b>E) Commissions and fees</b>
      As mutually agreed and subject to the maximum prescribed by SEBI
      <br><br>
      <b>F) Depository Account</b>
      <br>
      <b>1. Joint Accounts</b>
      <br>
      Your Demat Account can be held jointly with other people (typically relatives). For your Demat Account, an instruction given to us by someone who knows your password will be necessary and sufficient condition to effect a transaction. Please note that normally regulations require both the Account holders to sign on instruction but that you are agreeable to any transactions on such Account being executed in the manner outlined above.
      <br>
      <b>2. Nomination</b>
      <br>
      You can also nominate someone in your Demat Account, who becomes the beneficiary of the shares held in the Account in the unfortunate event of your demise.
      <br><br>
      <b>H) Digital contract notes</b>
      <br>
      Contract notes, as per the prevailing rules and regulations, shall be issued within the stipulated time limit by e-mail to the address submitted by you.
      <br><br>
      <b>I) Exposure Limit</b>
      <br>
      Exposure is subject to the peak margin requirement prescribed SEBI and Different scrips attract different margins.
      <br><br>
      <b>J) Compliance action</b>
      <br>
      We may initiate compliance action in case of any default in payments of any dues receivable by us from the client. A. Compliance action includes but not limited to – –
      <br>
      Squaring off of outstanding transactions.
      <br>
      We have full LIEN ON CASH AND SECURITIES BALANCES in trading account /depository account of the client and may sell such securities lying with us or stock lying in client depository account with us. Any loss arising out of squaring off or sale of securities will be to the client account and we will not be liable for any cost or damage or any consequences thereof. Locking / suspending client account and no further transactions will be allowed till the time all dues are settled or till the time as may deem fit by us. Withholding payout of securities bought by the client against any dues receivable by us. Levy of interest @24 p.a. for any delay in receipt of our dues, which includes pay in amount, margin amount, fees, commission, or pay other charges and please check with our Privacy Policy. We may take any one or all compliance actions as mentioned above and will intimate to the client on compliance action being taken and details thereof.`,
      "link":"/legal-documentation/rules-and-regulations"
    }
  ]
  legalDoc: any = {};
  constructor(private activatedRoute: ActivatedRoute , private router: Router , private meta: Meta , private seoService: SeoService , private title: Title) { }

  ngOnInit(): void {
    this.getSeoData()
    this.activatedRoute.params.subscribe(
      params => {
        this.docLink = params['doc'];
        if(this.docLink){
          this.legalDoc = this.legalDocs.find((doc)=>doc.link == `/legal-documentation/${this.docLink}`)
        }
      }
    )
  }

  getSeoData() {
    const data = {
      "page_url": `https://aliceblueonline.com${this.router.url}` 
    }
    this.seoService.createCanonicalURL();
    this.seoService.fetchSeoData(data).subscribe((response) => {
      
    this.meta.addTags([
      // { name: 'title' , content : response.meta_title ? response.meta_title : '' },
      { property: 'og:title' , content : response.og_title ? response.og_title : '' },
      { name: 'description' , content : response.meta_desc ? response.meta_desc : '' },
      { property: 'og:description', content: response.og_desc ? response.og_desc : '' },
      { property: 'og:image', content: response.og_image ? response.og_image : '' },
      { property: 'og:image:height', content: response.og_image_height ? response.og_image_height : '' },
      { property: 'og:image:width', content: response.og_image_width ? response.og_image_width : '' },
      { property: 'og:site_name', content: response.og_site ? response.og_site : '' },
      { property: 'og:type', content: response.og_type ? response.og_type : '' },
      { property: 'og:url', content: response.og_url ? response.og_url : '' },
      { name: 'twitter:title', content: response.twitter_title ? response.twitter_title : '' },
      { name: 'twitter:card', content: response.twitter_type ? response.twitter_type : '' },
      { name: 'twitter:site', content: response.twitter_site ? response.twitter_site : '' },
      { name: 'twitter:description', content: response.twitter_description ? response.twitter_description : '' },
      { name: 'twitter:image', content: response.twitter_image ? response.twitter_image : '' },
      { name: 'twitter:creator', content: response.twitter_handle ? response.twitter_handle : '' },
      { name: 'twitter:url', content: response.twitter_url ? response.twitter_url : '' },
    ]);
    this.title.setTitle(response.title);
    } , (error) => {
      console.log(error)
    })
  }
}
