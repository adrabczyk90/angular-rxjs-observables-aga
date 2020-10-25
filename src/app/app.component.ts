import { Component, VERSION } from "@angular/core";
import { of, from } from "rxjs";
import { map, tap, take } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  ngOnInit() {
    of(2, 4, 6, 8).subscribe(console.log);

    from([20, 15, 10, 5])
      .pipe(
        tap(item => console.log(`emitted item .. ${item}`)),
        map(item => item * 2),
        map(item => item - 10),
        map(item => {
          if(item === 0){
            throw new Error('zero detected');
          }
          return item;
        }),
        take(3)

      )
      .subscribe(
        item => console.log(`resulting item .. ${item}`),
        err => console.log(`error occured .. ${err}`),
        () => console.log("complete")
      );
  }
}
