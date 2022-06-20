export interface Sparkline {
  price: Array<number>;
}

export interface Coin {
    id:string;
    name: string;
    symbol: string;
    image : string;
    market_cap: number;
    current_price: number;
    total_volume: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d_in_currency: number;
    sparkline_in_7d: Sparkline;
    ath_date: string;
    max_supply : string;
    high_24h : number;
    low_24h : number;
    circulating_supply: number;
  }

  export interface NewCoin {
    prices : number[][];
    market_caps: number[];
    total_volumes: number[];
  }

  export interface ChartData{
    name: string;
    series: SeriesObject[]
  }

  export interface SeriesObject {
    name: string,
    value: number
  }
