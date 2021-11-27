import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, DoCheck, ElementRef, forwardRef, HostBinding, HostListener, Input, NgModule, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
	selector: '[hitInputText]'
})
export class InputTextDirective implements DoCheck {

	constructor(public el: ElementRef, @Optional() public ngModel: NgModel, private cd: ChangeDetectorRef) { }

	ngAfterViewInit() {
		this.updateFilledState();
		this.cd.detectChanges();
	}

	ngDoCheck() {
		this.updateFilledState();
	}

	@HostListener('input')
	onInput() {
		this.updateFilledState();
	}

	@HostBinding('class')
	class = 'hit-inputtext';

	@HostBinding('class.hit-filled')
	filled: boolean = false;

	updateFilledState(): void {
		this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
	}
}

export const InputText_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => InputText),
	multi: true
};
@Component({
	selector: 'hit-input-text',
	templateUrl: './input-text.html',
	providers: [InputText_VALUE_ACCESSOR],
	styleUrls: ['../../../styles.css', './input-text.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class InputText {

	@Input()
	disabled: boolean = false;

	@Input()
	label: string = "";

	@Input()
	placeholder: string = "";

	@Input()
	icon: string = "";

	inputgroupClass = "";

	hasIcon() {
		return this.icon != "";
	}

	labelPriority(): string {
		if (this.label != "") {
			return "";
		} else {
			return this.placeholder;
		}
	}

	toggleInputgroupClass() {
		return this.hasIcon() ? 'hit-inputgroup-withIcon' : 'hit-inputgroup';
	}

}

@NgModule({
	imports: [CommonModule],
	exports: [InputTextDirective, InputText],
	declarations: [InputTextDirective, InputText]
})
export class InputTextModule { }