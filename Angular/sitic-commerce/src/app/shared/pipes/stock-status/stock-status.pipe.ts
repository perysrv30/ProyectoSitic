import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus'
})
export class StockStatusPipe implements PipeTransform {

  transform(currentStock: number, minStock: number, maxStock: number): string {
    if ( currentStock <= minStock){
      return 'bg-red-500 text-white';
    } else if (currentStock <= (maxStock * 0.5)){
      return 'bg-yellow-300 text-black';
    }else if(currentStock >= (maxStock * 0.5)){
      return 'bg-green-500 text-white';
    }else{
      return 'bg-gray-600/10 text-gray-600';
    }
  }
  // Rojo (crítico): Cuando el currentStock es menor o igual al minStock . Esto indica que el producto está en niveles bajos o
  // agotado.
  // Amarillo (advertencia): Cuando el currentStock está entre el minStock y el 50% del maxStock . Esto indica que hay
  // existencias, pero podría agotarse pronto.
  // Verde (suficiente): Cuando el currentStock está por encima del 50% del maxStock . Esto indica que hay suficiente stock
  // disponible
}
