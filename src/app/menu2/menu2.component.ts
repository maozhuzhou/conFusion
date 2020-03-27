import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl'

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.css']
})
export class Menu2Component implements OnInit {
  //baseURL = "http://localhost:3000/";
  baseURL = baseURL ;
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  dishes: Dish[];
  errMess: string;
  //selectedDish : Dish;

 constructor(private dishService: DishService) { }

 ngOnInit(): void {
   this.dishService.getDishes()
       .subscribe((dishes) => this.dishes = dishes,
       errmess => this.errMess = <any>errmess );
   //this.selectedDish = this.dishes[0];
   console.log('here:');
   console.log(baseURL);
 }

 onSelect(dish: Dish){
   //this.selectedDish = dish;
 }


}
