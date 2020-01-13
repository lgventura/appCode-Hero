import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MarvelServiceProvider } from '../../providers/marvel-service/marvel-service';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  id;
  hero;
  loader: boolean = false;
  title = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public marvelService : MarvelServiceProvider
  ) {

    this.id = this.navParams.get('id');

    this.getHero();
  }

  getHero(){
    this.marvelService.getHero(this.id).subscribe(
      data => {
        this.hero = data['data'].results['0'];

        this.title = this.hero.name;
        this.loader = true;
      },
      erro => {
        console.log(erro);
        
      }
    )
  }


}
