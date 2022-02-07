import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SummaryComponent } from './summary/summary.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private snackbar:MatSnackBar,private dialog:MatDialog){}
  options=['rock','paper','scissors']
  title = 'rock-paper-scissors';
  user_choice='rock'
  computer_choice='rock'
  number_of_rounds:number=1;
  user_wins:number=0;
  computer_wins:number=0;
  tied_rounds:number=0;
  number_of_rounds_played:number=0;
  summary(){
    let dialogRef = this.dialog.open(SummaryComponent,{
      width: '1000px',
      height: '520px',
      data: {number_of_rounds:this.number_of_rounds_played,computer_wins:this.computer_wins,user_wins:this.user_wins,tied_rounds:this.tied_rounds}
  
    });
    dialogRef.afterClosed().subscribe(result => {
      this.number_of_rounds=1;
      this.user_choice='rock'
      this.computer_choice='rock'
      this.computer_wins=0;
      this.user_wins=0;
      this.tied_rounds=0;
      this.number_of_rounds_played=0;
    });
  
  }

  
  change_user_choice(option: string)
  {
    this.user_choice=option
    this.computer_choice='null'
    setTimeout(() => {
    // console.log(option)
    this.number_of_rounds=this.number_of_rounds+1
    this.number_of_rounds_played+=1;
    let randomNumber = Math.floor(Math.random()*this.options.length);
    this.computer_choice=this.options[randomNumber];
    console.log(this.computer_choice)
    if(this.user_choice==this.computer_choice)
    {
      this.snackbar.open('Match Tied')._dismissAfter(3000);
      this.tied_rounds+=1
    }
    else if(this.user_choice=="rock" && this.computer_choice=="scissors")
    {
      this.snackbar.open('You won')._dismissAfter(3000);
      this.user_wins+=1;
    }
    else if(this.user_choice=="paper" && this.computer_choice=="rock")
    {
      this.snackbar.open('You won')._dismissAfter(3000);
      this.user_wins+=1;
    }
    else if(this.user_choice=="scissors" && this.computer_choice=="paper")
    {
      this.snackbar.open('You won')._dismissAfter(3000);
      this.user_wins+=1;
    }
    else{
      this.snackbar.open('Computer won')._dismissAfter(3000);
      this.computer_wins+=1;
    }
  },1000)
}
}
