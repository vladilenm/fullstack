import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {CategoriesService} from '../../shared/services/categories.service'
import {switchMap} from 'rxjs/operators/switchMap'
import {of} from 'rxjs/observable/of'
import {MaterialService} from '../../shared/classes/material.service'
import {Category} from '../../shared/interfaces'

@Component({
  selector: 'app-product-form-page',
  templateUrl: './product-form-page.component.html',
  styleUrls: ['./product-form-page.component.css']
})
export class ProductFormPageComponent implements OnInit {

  @ViewChild('input') input: ElementRef
  form: FormGroup
  image: File
  imagePreview = ''

  isNew = true

  category: Category

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
      .pipe(switchMap((params: Params) => {
        if (params['id']) {
          this.isNew = false
          return this.categoriesService.getById(params['id'])
        }
        return of(null)
      }))
      .subscribe(
        category => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: this.category.name
            })
            this.imagePreview = this.category.imageSrc
            MaterialService.updateTextInput()
          }
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }

    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Изменения сохранены')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

  deleteCategory() {
    const decision = window.confirm('Вы уверены, что хотите удалить категорию?')
    if (decision) {
      this.categoriesService.delete(this.category._id).subscribe(
        response => MaterialService.toast(response.message),
        error => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/categories'])
      )
    }
  }

  onFileSelect(event) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  triggerClick() {
    this.input.nativeElement.click()
  }
}
