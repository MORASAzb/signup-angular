import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

export const JALALI_DATE_FORMATS = {
  parse: {
    dateInput: 'jYYYY/jMM/jDD',
  },
  display: {
    dateInput: 'jYYYY/jMM/jDD',
    monthYearLabel: 'jYYYY jMMMM',
    dateA11yLabel: 'jYYYY/jMM/jDD',
    monthYearA11yLabel: 'jYYYY jMMMM',
  },
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isCancelClicked = false;
  signUpForm: FormGroup;
  isFormFilled: boolean = false;
  validateOnSubmit: boolean = false;
  isSubmitted = false;
  phone: string
  public personType: string = 'individual';
  public individualType: string = 'iranian';

  selectedListItem: string = 'اطلاعات اولیه مودی';

  constructor(private fb: FormBuilder, private router: Router, ) {
    this.signUpForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        nationalCode: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        date1: ['', Validators.required],
        date2: ['', Validators.required],
        date3: ['', Validators.required],
        date4: ['', Validators.required],
        identifier: ['', Validators.required],
        brandName:['', Validators.required]

    });
  }


  // constructor(private fb: FormBuilder, private router: Router) {
  //   this.phone = this.router.getCurrentNavigation()?.extras.state?.['phone'] || '';

  // }

  // ngOnInit(): void {
  //   this.signUpForm = this.fb.group({
  //     name: ['', [Validators.required, Validators.minLength(3)]],
  //     lastName: ['', [Validators.required, Validators.minLength(3)]],
  //     nationalCode: ['', Validators.required],
  //     date1: ['', Validators.required],
  //     date2: ['', Validators.required],
  //     date3: ['', Validators.required],
  //     date4: ['', Validators.required],
  //     identifier: ['', Validators.required],
  //     brandName: ['', Validators.required],
  //     phone: [{ value: this.phone, disabled: true }]
  //   });
  // }


  personTypes = [
    { value: 'individual', label: 'حقیقی' },
    { value: 'legal', label: 'حقوقی' },
    { value: 'nonIranian', label: 'اتباع' },
    { value: 'civilPartnership', label: 'مشارکت مدنی' }
  ];


  items = [
    { text: 'اطلاعات اولیه مودی', completed: false },
    { text: 'استعلام مودی', completed: false },
    { text: 'اطلاعات تکمیلی مودی', completed: false },
    { text: 'بارگذاری مدارک', completed: false },
    { text: 'سرویس های ارزش افزوده', completed: false },
    { text: 'پیش نویس قرارداد تایید شده', completed: false },
    { text: 'در انتظار تایید مدارک', completed: false },
    { text: 'در انتظار عقد قرارداد', completed: false }
  ];

  selectedItemText: string = this.items[0].text;

  toggleComplete(item: any) {
    const selectedIndex = this.items.indexOf(item);

    this.items.forEach((item, index) => {
      if (index <= selectedIndex) {
        item.completed = true;
      } else {
        item.completed = false;
      }
    }); this.selectedItemText = item.text;
  }


  resetForm() {
    this.isCancelClicked = true;
    this.signUpForm.reset();
    this.signUpForm.markAsPristine();
    this.signUpForm.markAsUntouched();
    this.isFormFilled = false;
    this.isSubmitted = false;
    setTimeout(() => this.isCancelClicked = false, 0);
  }

  // onSubmitIranians(){
  //   if(this.signUpForm.){

  //   }
  // }

  onSubmit() {
    if (this.isCancelClicked) return;
    this.isSubmitted = true;
    if (this.signUpForm) {
      this.router.navigate(['/dashboard']);
      console.log(this.signUpForm)
      this.resetForm()
    } else {
      console.error(Error);

    }
  }


  setPersonType(type: string) {
    this.personType = type;
  }

  setIndividualType(type: string) {
    this.individualType = type;
  }

}
