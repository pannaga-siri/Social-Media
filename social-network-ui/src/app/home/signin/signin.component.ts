import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import {SharedService} from '../../shared.service';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  readUserArr=[]
  user_image:any;
  constructor(private http: HttpClient,
    private shared : SharedService,
    private router:Router) { 
      this.shared.signInEmail='';
      this.shared.user_image='';
      this.shared.isSignIn=false;
      this.shared.clearAuthUser();
    }

  ngOnInit():void {
  }
  email : string;
  password : string;
  passwordError :string='';
  signIn(){
    if(this.email && this.password)
    {
      // //call the api
      
      //preparing the req body object to api
     let reqobj={
       email : this.email,
       password : this.password,
      }


      this.http.post('http://localhost:3000/api/auth/signin',reqobj)
      .subscribe((res)=>{
        console.log(res);
        if(res['status']==404)
        {
          this.passwordError=res['message']
        }
        if(res['status']==200)
        {
          this.passwordError='';
          this.shared.isSignIn = true;
          this.shared.signInEmail = res['email'];
          this.shared.setAuthUser(res['email']);
          console.log(this.shared.signInEmail);
          this.router.navigate(['home'])
          const params=new HttpParams()
          .set('email',this.shared.signInEmail);
          let link= 'http://localhost:3000/api/auth/'
          this.http.get(link,{params})
          .subscribe((res)=>{
            if(res['status']==200)
            {
              this.readUserArr= res['data'];
              console.log(res);
              console.log(this.readUserArr[0].user_image);
              this.shared.user_image=this.readUserArr[0].user_image;
              this.shared.setUserImage(this.readUserArr[0].user_image);

              console.log("ussser")
              console.log(this.shared.user_image);
              
            }
            
          })
        }
        
        
      })
    }
    else{
      alert("Enter all the fields");
      //inform to user using alert popup
    }

  }

  
}
