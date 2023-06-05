import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
  
})
export class DirectorComponent implements OnInit {
  pageloader: boolean = true;
  directors_bio = [
    {
      "name":`Sidhavelayutham Mohanamoorthy`,
      "titleUrl": "sidha-velayutham",
      "designation":`Founder & CEO, Alice Blue`,
      "education":`<b>MBF</b> (Management of Business Finance)
                  <br>
                  <b>Master's Degree</b> - IIM Bangalore
                  <br>
                  <b>Specialization</b> - Management Program for Enterpreneurs and Family`,
      "image":`https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/ceo.png`,
      "fb_link":`https://www.facebook.com/sidhavelayutham`,
      "twitter_link":`https://twitter.com/sidhavelayutham`,
      "instagram_link":`https://www.instagram.com/sidhavelayutham/`,
      "telegram_link":``,
      "bold_text":`Alice Blue to become the Best Broking House - South Region by MCX in 2019`,
      "vision":`Vision is to transform <span style="color: #276bb4;"><b>Alice
                Blue</b></span> as <b>one of India's biggest financial facilitators
                and one of the Top 10 financial companies in India</b>`,
      "description":`<span class="italic-text"><span class="bold-text">S</span>idhavelayutham Mohan</span> is the founder &amp; CEO of Alice Blue, one of the leading online stock
                      broking firms in India. Born in a farming family, he started his entrepreneurial journey in a small
                      southern town of Erode in Tamil Nadu. He has steered Alice Blue from a team of 10 people in
                      XXXX to pan India Company today, employing over 1000 people with presence across 20 major
                      cities, with over 12000 channel partners.
                      <br><br>
                      He holds an MBF (Management of Business Finance) from the Indian Finance Institute a Master&#39;s
                      Degree from the IIM Bangalore, specialising in Management Program for Entrepreneurs and
                      Family Businesses.
                      As the CEO, Sidhu is oversees the operations, new product development with special focus on risk
                      management initiatives. With expertise in analytics and strategic planning, he leads a team of
                      experienced professionals in capital markets, asset management and associated financial
                      services.
                      <br><br>
                      He has been active in propagating the concept of professional marketing of brokerage services. He
                      has been the forerunner in promoting discount brokering in the sector which has traditionally been
                      operating on fixed brokerage charges.
                      <br><br>
                      He has been actively embracing innovative concepts and adapting newer technologies to enable
                      trading on the go. His ideas have enabled the company to grow exponentially, acquire new
                      customers, especially millennials who have embraced this tech led investment options with ease.
                      <br><br>
                      His Involvement in trading and passion to use technology that enables his customers in stock
                      market has led Alice Blue to be recognised as the Best Broking House – South Region by MCX
                      (Multi Commodity Exchange) in 2019. Along with his Directors, his vision is to transform Alice Blue
                      as one of India’s biggest financial facilitators and one of the Top 10 financial companies in India.`
    },
    {
      "name":`Rajesh K`,
      "titleUrl": "rajesh-kanakavel",
      "designation":`Director - Alice Blue`,
      "education":``,
      "image":`https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/rajesh-director.png`,
      "fb_link":`https://www.facebook.com/skrajesh.bbe`,
      "twitter_link":`https://twitter.com/krajeshmbm?t=jnHbmeMBjoTfdu8HAoaeEw&s=08`,
      "instagram_link":`https://www.instagram.com/skrajeshbbe/`,
      "telegram_link":``,
      "bold_text":``,
      "vision":``,
      "description":`<span class="italic-text"><span class="bold-text">R</span>ajesh</span> is a true pioneer when it comes to the advancement of Alice Blue. He graduated from Kamaraj University with a Masters’ in Banking Management. In addition to this, he also holds a certification in Strategic Analysis of Competitive Advantage from IIM Bangalore.
                    <br><br>
                    He works as a Director of Alice Blue and has implemented many new strategies towards sales development and customer-centric process flow. His countless efforts resulted in Alice Blue being the Best Broking House - South Region by MCX in 2019. 
                    <br><br>
                    He had a very humble beginning in the industry as a Relationship Manager 15 years ago. He climbed the corporate ladder on his merit to become Assistant Branch Manager in no time, finally leading Alice Blue.
                    <br><br>
                    Rajesh recognizes that leadership is more than just having power; it is the art of getting along with people, and his exceptional team-building abilities can evidence this. He's put together a number of teams in various departments throughout the years that have yielded significant corollaries.
                    <br><br>
                    He shares a common vision alongside other Directors to make Alice Blue the best Financial Enabler and one of the Top 10 in India.
                    <br><br>
                    Rajesh is a genuine people leader known for keeping a fun working environment and never letting a dull moment sky over his team. He enjoys playing badminton and basketball and regularly organizes outdoor events for the same.`
    },
    // {
    //   "name":`Muthuraj prabhu`,
    //   "titleUrl": "muthuraj-prabhu",
    //   "designation":`Director - Alice Blue`,
    //   "education":``,
    //   "image":`https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/muthuraj-director.png`,
    //   "fb_link":`https://www.facebook.com/rmuthuraj.prabhupillai`,
    //   "twitter_link":`https://twitter.com/MuthurajPrabhu`,
    //   "instagram_link":`https://www.instagram.com/muthurajprabhu/`,
    //   "telegram_link":``,
    //   "bold_text":``,
    //   "vision":``,
    //   "description":`<span class="italic-text"><span class="bold-text">M</span>uthuraj Prabhu</span> is one of the founding members of Alice Blue who has tirelessly worked to elevate the brand to its current level. He has a Master's degree in Business Development and a Certificate in Digital Marketing for Business Growth from IIM Bangalore. 
    //                 <br><br>
    //                 Muthuraj Prabhu serves as a Director at Alice Blue and is responsible for the company's maneuver in online stockbroking through the use of digital marketing. His efforts have emanated in the acquisition of new customers, which is stirring at an exponential rate.
    //                 <br><br>
    //                 In the form of avant-garde campaigns, Muthuraj Prabhu earnestly instigates sales and business development strategy and has a deep professional alliance with major clientele and partners. He has conducted sundry tutelage courses for his team natheless handling pan-Indian operations and ushered them to the coveted results.
    //                 <br><br>
    //                 Along with the other Directors, he has the vision to make Alice Blue the greatest Financial Enabler and one of the top ten in India.
    //                 <br><br>
    //                 He yearns to play chess whenever he gets the chance. He reckons all work and no play makes Jack a dull boy, and hence advocates taking out time to pursue hobbies.`
    // },
  ]
  bio: any= {}
  constructor(private meta: Meta, 
    private seoService: SeoService, 
    private title: Title, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getSeoData();
    this.activatedRoute.snapshot.params['name']
    this.getDirector(this.activatedRoute.snapshot.params['name']);
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
  
  getDirector(name){
    this.bio = this.directors_bio.find((director)=>director.titleUrl == name);
  }
}
