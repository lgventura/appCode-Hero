import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class MarvelServiceProvider {
  
    private_key : string;
    public_key  : string;
    timestamp   : any;
    hash        : any;
    url         : string;
    data        : any;

  constructor(public http: HttpClient) {
    console.log('Hello MarvelServiceProvider Provider');
    
    this.private_key = '18c72d592f03c617820a0b701e24ce05df4fc1e6';
    this.public_key = '7f07f20574d1917c503b81589cbe29f8';
    this.timestamp = Number(new Date());
    this.hash = Md5.hashStr(this.timestamp+this.private_key+this.public_key);
    //this.url = 'http://gateway.marvel.com/v1/public/comics?ts='+timestamp+'&apikey='+public_key+'&hash='+hash;

    this.url = 'https://gateway.marvel.com:443/v1/public/characters';
  }

  getHeroes(offset){
    var url = this.url+`?ts=${this.timestamp}&orderBy=name&limit=4&offset=${offset}&apikey=${this.public_key}&hash=${this.hash}`;
    var response;
    response = this.http.get(url);
    
    return response;
  }

  searchHeroes(searchString){
    var url = this.url+`?ts=${this.timestamp}&nameStartsWith=${searchString}&orderBy=name&apikey=${this.public_key}&hash=${this.hash}`;
    var response;
    response = this.http.get(url);
    
    return response;
  }

  getHero(id){
    var url = this.url+`/${id}?ts=${this.timestamp}&&apikey=${this.public_key}&hash=${this.hash}`;
    var response;
    response = this.http.get(url);
    
    return response;
  }

}
