import { Component, ViewChild  } from '@angular/core';
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CartAddComponent } from './modules/store/cart-add/cart-add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('cartAdd') cartAdd: CartAddComponent;
  clientName = 'SiticCommerce'
  routes = [
    {
      path: '/store',
      icon: 'mat:home',
      title: 'Tienda'
    },
    {
      path: '/products',
      icon: 'mat:shopping_bag',
      title: 'Productos'
    },
    {
      path: '/orders',
      icon: 'mat:list',
      title: 'Mis compras'
    },
    {
      path: '/about',
      icon: 'mat:info',
      title: 'Acerca de'
    }
  ]

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer) { 
      this.matIconRegistry.addSvgIconResolver(
        (
          name: string,
          namespace: string
        ): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
          switch (namespace) {
            case 'mat':
              return this.domSanitizer.bypassSecurityTrustResourceUrl(
                `assets/img/icons/material-design-icons/two-tone/${name}.svg`
              );
          }        
        }
      );
    }
}
