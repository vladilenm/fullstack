import {Component, OnInit} from '@angular/core'
import {CategoriesService} from '../shared/services/categories.service'
import {Observable} from 'rxjs/Observable'
import {Category} from '../shared/interfaces'

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()
  }

}
