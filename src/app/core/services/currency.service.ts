import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private http = inject(HttpClient);
  exchangeRates: WritableSignal<{ [key: string]: number }> = signal({}); // 🔥 Guardamos las tasas en caché
  private lastUpdated: number | null = null;

  constructor() {
    this.loadExchangeRates(); // 🔥 Carga inicial
  }

  async loadExchangeRates() {
    const now = Date.now();
    if (this.lastUpdated && now - this.lastUpdated < 3600000) return; // 🔥 Solo actualiza si han pasado más de 1 hora

    const response = await firstValueFrom(this.http.get<any>('https://api.exchangerate-api.com/v4/latest/USD'));
    this.exchangeRates.set(response.rates);
    this.lastUpdated = now;
  }

  convert(amount: number, from: string, to: string): number {
    if (!this.exchangeRates()[from] || !this.exchangeRates()[to]) return amount; // 🔥 Si no hay datos, retorna el monto original
    return (amount / this.exchangeRates()[from]) * this.exchangeRates()[to];
  }
}

