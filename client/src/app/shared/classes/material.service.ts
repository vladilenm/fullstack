import {ElementRef} from '@angular/core'

declare var M

export interface IMaterialInstance {
  open?()
  destroy?()
  close?()
}

export interface IMaterialDatepicker extends IMaterialInstance {
  toString?()
  setDate?(value: Date)
  date?: Date
}

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static tapTarget(ref: ElementRef): IMaterialInstance {
    return M.TapTarget.init(ref.nativeElement)
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInput() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): IMaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static initDatepicker(ref: ElementRef, onClose?: () => void): IMaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      showClearBtn: true,
      format: 'dd.mm.yyyy',
      onClose
    })
  }

  static initTooltip(ref: ElementRef): IMaterialInstance {
    return M.Tooltip.init(ref.nativeElement)
  }
}
