import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-keyword-control',
  templateUrl: './keyword-control.component.html',
  styleUrls: ['./keyword-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KeywordControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => KeywordControlComponent),
      multi: true
    }
  ]
})
export class KeywordControlComponent implements ControlValueAccessor, OnDestroy, OnInit {
  disabled: boolean;
  keywordGroup: FormGroup;
  @Input() keywords: string[] = [];
  @Input() placeholder = 'Palabras Clave';
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.setupForm();

    this.subscriptions.push(
      this.keywordGroup.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(_: FormControl) {
    return this.keywordGroup.valid ? null : { keywordGroup: { valid: false } };
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.keywordGroup.reset();
    }
  }

  // Custom public methods

  addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.keywords.push(value.trim());

      this.keywordsCtrl.patchValue(this.keywords.join(','));
    }

    if (input) {
      input.value = '';
    }
  }

  removeKeyword(keyword: any) {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }

    this.keywordsCtrl.patchValue(this.keywords.join(','));
  }

  // Custom private methods

  private setupForm() {
    this.keywordGroup = this.fb.group({
      keywords: null
    });

    if (this.keywords) {

    }
  }

  private setValidation(value: boolean) {
    if (value) {
      this.keywordsCtrl.setValidators(Validators.required);
    } else {
      this.keywordsCtrl.clearValidators();
    }

    this.keywordsCtrl.updateValueAndValidity();
  }

  // Getters and setters

  get keywordsCtrl() {
    return this.keywordGroup.get('keywords');
  }

  set required(value: boolean) {
    this.setValidation(value);
  }

  get value() {
    return this.keywordGroup.value;
  }

  set value(value) {
    this.keywords = value ? value.keywords.split(',') : [];
    this.keywordGroup.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

}
