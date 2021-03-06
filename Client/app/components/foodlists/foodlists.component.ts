import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodList } from '../../models/FoodList';

@Component({
    selector: 'foodlists-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    template: require('./foodlists.component.html')
})

export class FoodListComponent implements OnInit {

    allLists: FoodList[];
    errorMessage: string;

    constructor(private _foodListDataService: FoodListDataService) {
        _foodListDataService.foodListAdded.subscribe((foodList: FoodList) => {
            this.getAllLists();
        });
    }

    public ngOnInit() {
        this.getAllLists();
    }

    private getAllLists() {
        this._foodListDataService
            .GetAllLists()
            .subscribe((response: FoodList[]) => {
                this.allLists = response;
                console.log(response.length);
            }, error => {
                this.errorMessage = error;
            });
    }
}