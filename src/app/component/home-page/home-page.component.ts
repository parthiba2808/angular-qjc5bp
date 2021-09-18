import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { PersistanceService } from '../../persistance.service';
import { Post } from '../../post';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  post: Post[];
  constructor(
    private dataService: DataService,
    private persistanceService: PersistanceService
  ) {}

  ngOnInit() {
    this.dataService.getPosts().subscribe((posts) => {
      this.post = posts;
      this.dataService.postsData = posts;
      var localstorageList = this.persistanceService.get('buildings');
      this.post.map((obj) => {
        let data = localstorageList.filter((item) => {
          if (item.id == obj.id) return true;
        });
        obj.rating = data[0].rating;
        return obj;
      });
    });
  }

  countStar(star, building) {
    this.selectedValue = star;
    let itemIndex = this.post.findIndex((item) => item.id == building.id);
    this.post[itemIndex].rating = star;
    this.persistanceService.set('buildings', this.post);
  }

  onSelectedOption(e) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.dataService.searchOption.length > 0)
      this.post = this.dataService.filteredListOptions();
    else {
      this.post = this.dataService.postsData;
    }
    console.log(this.post);
  }
}
