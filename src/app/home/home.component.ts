import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  baseURL = baseURL;
  dishErrMess: string;
  leader:Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish()
        .subscribe((dishes) => this.dish = dishes,
        errMess => this.dishErrMess = errMess );

    this.promotionservice.getFeaturedPromotion()
        .subscribe((promotion => this.promotion = promotion ));

        this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
      dishErrMess => this.dishErrMess = <any>dishErrMess);
  }

}
