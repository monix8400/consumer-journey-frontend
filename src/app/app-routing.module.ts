import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductDescriptionComponent} from "./product-description/product-description.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ProductListComponent} from "./product-list-component/product-list.component";


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'product-description/:productName',
    component: ProductDescriptionComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  }
  // Add other routes here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
