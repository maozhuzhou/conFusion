import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { baseURL } from '../shared/baseurl';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { visibility, flyInOut,expand } from '../animations/app.animation';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('1s ease-in-out'))
    ])
  ]

})
export class DishdetailComponent implements OnInit {
  //@Input() dish: Dish;
  dishIds: string[];
  dish: Dish;
  prev: string;
  next: string;
  faLessThan = faLessThan;
  faGreaterThan = faGreaterThan;
  baseURL = baseURL;//"http://localhost:3000/images/";
  errMess: string;
  visibility = 'shown';
  commentForm: FormGroup;
  dishcopy: Dish;
  @ViewChild('fform') commentFormDirective;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author is required.',
      'minlength': 'Author must be at least 2 characters long.',
      'maxlength': 'cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'The Comment is required.'
    }
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { this.createForm(); }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds,
        errMess => this.errMess = errMess);

    this.route.params
    .pipe(switchMap((params: Params) => { 
        this.visibility = 'hidden';
        return this.dishservice.getDish(params['id']); }))
    .subscribe(dish => { 
        this.dish = dish; 
        this.dishcopy = dish; 
        this.setPrevNext(); 
        this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess);
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: ['5', Validators.required],
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      date: ''

    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    this.commentForm.value.date = (new Date()).toISOString();
    this.dish.comments.push(this.commentForm.value);
    this.dishservice.putDish(this.dish)
      .subscribe(dish => {
        this.dish = dish;
      },
        errmess => { this.dish = null; this.errMess = <any>errmess; });
    this.commentFormDirective.resetForm();
  }
  setPrevNext() {
    const index = this.dishIds.indexOf(this.dish.id);
    this.prev = this.dishIds[(index + this.dishIds.length - 1) % this.dishIds.length];
    this.next = this.dishIds[(index + this.dishIds.length + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
