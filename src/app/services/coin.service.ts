import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Coin } from '../Coin';
import { startOfDay } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  coingecko: string = 'https://api.coingecko.com/api/v3/coins/'

  coins$ = this.http.get<Coin[]>(`${this.coingecko}markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
  `).pipe((tap(console.log)))


  constructor(private http: HttpClient) { }


  getHistoricalData(daysAgo:number, coinId:string){
    let today = new Date().getTime()
    let day = (new Date(today - daysAgo*24*60*60*1000).getTime()/1000).toFixed()
    let todayUnix = (today / 1000).toFixed(0)
    return this.http.get<Coin[]>(`${this.coingecko}${coinId}/market_chart/range?vs_currency=USD&from=${day}&to=${todayUnix}`)
  }


}
