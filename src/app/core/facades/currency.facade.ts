import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyFacade {
  private currencyService = inject(CurrencyService);

  selectedCurrency: WritableSignal<string> = signal('COP'); // 🔥 Moneda seleccionada globalmente

  /**
   * Permite cambiar la moneda globalmente
   */
  setSelectedCurrency(currency: string) {
    console.log('📌 Moneda cambiando en CurrencyFacade:', currency)
    this.selectedCurrency.set(currency);
  }

  /**
   * Retorna la moneda seleccionada actualmente
   */
  getSelectedCurrency(): string {
    return this.selectedCurrency();
  }

  /**
   * Convierte un monto usando tasas de cambio en caché
   */
  convertToUserCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    console.log(amount, fromCurrency, toCurrency);

    return this.currencyService.convert(amount, fromCurrency, toCurrency);
  }
}

