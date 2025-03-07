import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export enum BUTTON_COLOR {
  SUCCESS = "#1AAA3E",
  INFO = "#3088fb",
  WARNING = "#ffc107",
  DELETE = "#d33",
  DANGER = "#ff5757"
}

export interface AlertParams {
  title?: string;
  html?: string;
  icon?: SweetAlertIcon;
  confirmButtonColor?: BUTTON_COLOR | string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  cancelButtonColor?: BUTTON_COLOR | string;
  showCancelButton?: boolean;
}

export class Alerts {
  private constructor() {}

  static show(params: AlertParams): Promise<SweetAlertResult> {
    return Swal.fire({
      title: params.title || 'Notificación',
      html: params.html || '',
      icon: params.icon || 'info',
      confirmButtonText: params.confirmButtonText || 'Aceptar',
      confirmButtonColor: params.confirmButtonColor || BUTTON_COLOR.INFO,
      cancelButtonText: params.cancelButtonText || 'Cancelar',
      cancelButtonColor: params.cancelButtonColor || BUTTON_COLOR.DELETE,
      showCancelButton: params.showCancelButton || false
    });
  }
}
