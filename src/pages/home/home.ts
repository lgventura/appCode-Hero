import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MarvelServiceProvider } from '../../providers/marvel-service/marvel-service';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  heroes : Array<any> = [];
  data;
  offset;
  actualPage;
  secondPage;
  thirtyPage;
  searchString;
  serch : boolean = false; 

  constructor(
    public navCtrl: NavController,
    public marvelService : MarvelServiceProvider
    ) {
      
      this.actualPage = 1;
      this.secondPage = 2;
      this.thirtyPage = 3;

      this.getHeroes();
  }

  getHeroes(){
    this.marvelService.getHeroes(this.offset).subscribe(
      data => {
        
        this.data = data['data'];
        this.heroes = this.data['results'];
        console.log(this.heroes)
        console.log(this.data)
        
        if(this.heroes.length <= 0){
          this.heroes = [];
          this.offset = 0;
          this.actualPage = 1;
          this.secondPage = 2;
          this.thirtyPage = 3;

          this.getHeroes();
        }
      },
      erro => {
        console.log(erro);
      }
    );    
  }

  nextPage(page){
    if(page != 0){
      this.heroes = [];

      this.actualPage = page;
      this.secondPage = page + 1;
      this.thirtyPage = page + 2;

      this.offset = (this.actualPage*4)-4;

      this.getHeroes(); 
    }else {
      let lastPage = this.data.total/4;
      lastPage = lastPage+0.75;

      this.actualPage = lastPage;
      this.secondPage = 1;
      this.thirtyPage = 2;

      this.offset = (this.actualPage*4)-4;

      this.getHeroes(); 
    }
  }

  searchHero(){
    this.heroes = [];
    this.offset = 0;
    this.actualPage = 1;
    this.secondPage = 2;
    this.thirtyPage = 3;

    if(this.searchString.length <= 0){
      this.getHeroes()
      this.serch = false;
    }else {
      this.serch = true;
      this.marvelService.searchHeroes(this.searchString).subscribe(
        data => {
          this.data = data['data'];
          this.heroes = this.data['results'];
        },
        erro => {
          console.log(erro);        
        }
      )
    }

  }

  selectHero(id){
    this.navCtrl.push(DetailsPage, {
      id : id
    });
  }

}
