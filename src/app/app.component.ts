import { Component, VERSION, OnInit } from "@angular/core";
import { AccountModel, Balances } from "./account.model";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  // Start all global declarations
  name = "Angular " + VERSION.major;
  addedNewCol = false;
  searchText: string;
  isDesc = false;
  changeColor: boolean;
  column = "acctNum";
  show = 3;
  records: Array<AccountModel> = [
    { categoryID: 1, acctNum: "AAA - 1234", user: "Alice" },
    { categoryID: 2, acctNum: "AAA - 5231", user: "Bob" },
    { categoryID: 3, acctNum: "AAA - 9921", user: "Alice" },
    { categoryID: 4, acctNum: "AAA - 8191", user: "Alice" }
  ];
  balances: Array<Balances> = [
    {
      acctNum: "AAA - 1234",
      balance: 4593.22,
      percent: -0.08,
      totalAmount: 8916.66
    },
    { acctNum: "AAA - 9921", balance: 0.0, percent: 0.0, totalAmount: 0.0 },
    {
      acctNum: "AAA - 5231",
      balance: 232142.5,
      percent: 0.21,
      totalAmount: 21230886.11
    },
    {
      acctNum: "AAA - 8191",
      balance: 4344,
      percent: 0.08,
      totalAmount: 25896.02
    }
  ];
  // end all global declarations

  constructor() {}

  // initialize any default values
  ngOnInit() {
    
    this.filter("Bob");
    this.filter("Charlie");
    this.sort(this.column);
    this.filter("Alice");
    //this.sort("A");
  }

  // display balance based on the account number
  getKeyValuePair(key: string): string {
    // loop throught array
    let result = "";
    for (let i = 0; i < this.balances.length; i++) {
      if (this.balances[i].acctNum === key) {
        result = this.records[i].user;
      }
    }
    return result ;
  }

  //filter option
  filter(searchText: string) {
    var filteredResult = this.records.filter(
      item => item.user.toLowerCase() === searchText.toLowerCase()
    );
    if(filteredResult.length > 0) {
      var filteredBalanceResult = this.balances.filter(
        item => item.acctNum.toLowerCase() === filteredResult[0].acctNum.toLowerCase()
      ); 
    }
    let mergeArrays = {...filteredResult, ...filteredBalanceResult};
    console.log(
      "Filtered by " + searchText + ":" + JSON.stringify(mergeArrays)
    );
  }
  // sort any columns by custom sort function
  sort(sortColumn) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = sortColumn;
    let direction = this.isDesc ? 1 : -1;

    this.balances.sort(function(a, b) {
      if (a[sortColumn] < b[sortColumn]) {
        return -1 * direction;
      } else if (a[sortColumn] > b[sortColumn]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });    
    console.log("Sorted by Account No:" + JSON.stringify(this.balances));
  }

  // event to call on click to add or remove dynamic column
  displayNewColumn() {
    if (!this.addedNewCol) {
      this.addedNewCol = true;
    } else {
      this.addedNewCol = false;
    }
  }
}
