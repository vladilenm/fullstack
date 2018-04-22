import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {PositionsService} from '../../../shared/services/positions.service'
import {Position} from '../../../shared/interfaces'
import {IMaterialInstance, MaterialService} from '../../../shared/classes/material.service'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Subscription} from 'rxjs/Subscription'

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef
  @Input() categoryId: string

  pSub: Subscription

  modal: IMaterialInstance = null
  form: FormGroup

  positions: Position[]
  positionId: string = null
  loading = true

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.pSub = this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open()
    MaterialService.updateTextInput()
  }

  addPosition() {
    this.positionId = null
    this.form.patchValue({
      name: null,
      cost: null
    })
    this.modal.open()
    MaterialService.updateTextInput()
  }

  removePosition(event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm('Вы уверены, что хотите удалить позицию?')
    if (decision) {
      this.positionsService.remove(position._id).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id !== position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onCancel() {
    this.modal.close()
    this.form.reset({name: '', cost: 0})
  }

  onSubmit() {
    this.form.disable()

    const position: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    if (this.positionId) {
      position._id = this.positionId
      this.positionsService.update(position).subscribe(
        pos => {
          const idx = this.positions.findIndex(p => p._id === pos._id)
          this.positions[idx] = pos
          MaterialService.toast('Изменения сохранены')
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        () => {
          this.modal.close()
          this.form.reset({name: '', cost: 0})
          this.form.enable()
        }
      )
    } else {
      this.positionsService.create(position).subscribe(
        pos => {
          this.positions.push(pos)
          MaterialService.toast('Изменения сохранены')
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        () => {
          this.modal.close()
          this.form.reset({name: '', cost: 0})
          this.form.enable()
        }
      )
    }
  }

}
