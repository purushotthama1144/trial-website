import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FaqService } from '../service/faq/faq.service';
import { HtmlPageService } from '../service/html-page/html-page.service';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.scss'],
	
})
export class LandingPageComponent implements OnInit {
	faqs: any[] = [];
	config: boolean = false;
	landing_page :any

	constructor(private meta: Meta, private title: Title, private faqservice: FaqService, private router: Router, private htmlService: HtmlPageService) { }

	ngOnInit(): void {
		this.getfaq()
		this.getHtmlData()

		this.meta.addTags([
			{ name: 'title', content: 'Alice Blue - Lowest brokerage Online Trading account in India' },
			{ property: 'og:title', content: 'Alice Blue - Lowest brokerage Online Trading account in India' },
			{ name: 'description', content: 'Alice Blue - India Best stock broker offering Lowest brokerage fee in Stock market Industry. We offer Commodity trading, Equity Trading, Futures Trading.' },
			{ property: 'og:description', content: 'Alice Blue - India Best stock broker offering Lowest brokerage fee in Stock market Industry. We offer Commodity trading, Equity Trading, Futures Trading.' },
			{ property: 'og:image', content: 'https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1630645487842.png' },
			{ property: 'og:image:height', content: '294' },
			{ property: 'og:image:width', content: '400' },
			{ property: 'og:site_name', content: 'Alice Blue' },
			{ property: 'og:type', content: 'Website' },
			{ property: 'og:url', content: 'https://aliceblueonline.com' },
			{ name: 'twitter:title', content: 'Alice Blue - Lowest brokerage Online Trading account in India' },
			{ name: 'twitter:card', content: '' },
			{ name: 'twitter:site', content: '@aliceblue_india' },
			{ name: 'twitter:description', content: 'Alice Blue - India Best stock broker offering Lowest brokerage fee in Stock market Industry. We offer Commodity trading, Equity Trading, Futures Trading.' },
			{ name: 'twitter:image', content: 'https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1630645487842.png' },
			{ name: 'twitter:creator', content: '@aliceblue_india' },
			{ name: 'twitter:url', content: '' },
			{ name: 'twitter:type', content: 'summary' },
			{ name: 'robots:text', content: 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large' },
		]);
		this.title.setTitle('Alice Blue - Lowest brokerage Online Trading account in India');
	}

	toggle(index: number) {
		if (!this.config) {
			this.faqs.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
		}
		this.faqs[index].active = !this.faqs[index].active;
	}

	getfaq() {
		const data = {
			"page_url": this.router.url
		}
		this.faqservice.fetchsinglePagefaq(data).subscribe((response: any) => {
			this.faqs = response[0] == 'No Data' ? [] : response;
		}, (error) => {
			console.log(error)
		})
	}

	getHtmlData() {
		const data = {
			"page_url": this.router.url.split('/landing-page/')[1]
		}
		this.htmlService.fetchHtmlData(data).subscribe((response) => {
			this.landing_page = response[0] == 'No Data' ? [] : response;
		},(error) => {

		})
	}
}
