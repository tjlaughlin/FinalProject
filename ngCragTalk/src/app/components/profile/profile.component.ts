
import { AuthService } from 'src/app/services/auth.service';
import { ClimbingArea } from './../../models/climbing-area';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Gear } from 'src/app/models/gear';
import { ClimbType } from 'src/app/models/climb-type';
import { UserClimbType } from 'src/app/models/user-climb-type';
import { DatePipe } from '@angular/common';
import { Message } from 'src/app/models/message';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
     private datePipe: DatePipe,
      private auth: AuthService,
      ) { }
  selectedUser: User = null;
  gearList: Gear[] = [];
  userClimbTypes: UserClimbType[] = [];
  favoriteClimbingAreas: ClimbingArea [] = [];
  favoriteUsers: User [] = [];
  messages: Message[] = [];
  today: Date = new Date();
  updateUserProfile: User;
  editGear: boolean = false;
  editClimbType: boolean = false;
  managedGear: Gear;
  managedUserClimbType: UserClimbType;
  isFavorited: boolean = false;
  showMessageTextBox: boolean = false;
  newMessage: Message = new Message();
  loggedInUser: User = new User();
  checkUsersList: boolean = null;
  // will need to add an array for a users gear list and use the controller path and the method to get a users gear list
  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('userId');
    // const id = this.auth.getCurrentUserId();

      if (idStr) {

        const id: number = Number.parseInt(idStr, 10);
        if (!isNaN(id)) {
          this.userService.show(id).subscribe(
            (data) => {
              console.log('profile retrieved');
              this.selectedUser = data;
              this.gearList = data.gearList;
              this.userClimbTypes = data.userClimbTypes;
              this.favoriteClimbingAreas = data.favoriteAreaList;
              this.favoriteUsers = data.myListOfFavoriteUsers;
              console.log(this.favoriteUsers);
              this.messages = data.myListOfReceivedMessages;
              console.log(this.messages);
            },
            (err) => {
              console.log('User ' + id + ' not found.');
              this.router.navigateByUrl('notFound');
            }
            );
          }
          else {
            this.router.navigateByUrl('invalidId');
        }
      }
      else {
        this.router.navigateByUrl('notFound');
      }
  }
  updateProfile(user: User): void {
    this.userService.update(user.id, user).subscribe(
      data=>{
        user = data;
        console.log('retrieved');
        this.router.navigateByUrl('update/' + user.id);
        // this.reload();
      },
      err=>{
      console.error('retrieved failed')
      console.error(err);
      }
    );
    // window.location.reload();
  }
  setUpdateUser() {
    this.updateUserProfile = Object.assign({}, this.selectedUser);
  }
  age(user: User): number {
    const birthYear = user.birthdate.toString().substring(0,5);
    const currentYear = this.today.getFullYear();
    const age = currentYear - parseInt(birthYear);
    return age;
  }
  showProfile(userId: number) {
          this.userService.show(userId).subscribe(
            (data) => {
              console.log('profile retrieved');
              this.selectedUser = data;
              this.gearList = data.gearList;
              this.userClimbTypes = data.userClimbTypes;
              this.favoriteClimbingAreas = data.favoriteAreaList;
              this.favoriteUsers = data.myListOfFavoriteUsers;
            },
            (err) => {
              console.log('User ' + userId + ' not found.');
              this.router.navigateByUrl('notFound');
            }
            );
          }
  getLoggedinUserObject(userId: number) {
          this.userService.show(userId).subscribe(
            (data) => {
              console.log('user retrieved');
              this.loggedInUser = data;
              console.log(this.loggedInUser);


            },
            (err) => {
              console.log('User ' + userId + ' not found.');
              this.router.navigateByUrl('notFound');

            }
            );

          }

          checkIfCurrentUser(username: string): boolean {
            return this.auth.checkIfCurrentUser(username);
          }

          editGearList(gear: Gear): void {
            this.editGear = !this.editGear;
            this.userService.updateGear(gear.id, gear).subscribe(
              data => {
                gear = data;
                this.editGear = false;
              },
              err =>{
                console.error('attempt to update gear list failed')
                console.error(err);
              }
              );
            }
            updateUser(user: User): void {
              this.userService.update(user.id, user).subscribe(
                data=>{
                  user = data;
                  console.log('retrieved');
                  // this.router.navigateByUrl('user/' + user.id);
                },
                err=>{
                  console.error('retrieved failed')
                  console.error(err);
                }
                );

                window.location.reload();
              }
              displayGear(gear: Gear) {
                this.editGear = true
                this.managedGear = gear;
              }
              editClimbTypeList(climb: UserClimbType): void {
                this.editClimbType = !this.editClimbTypeList;
                this.userService.updateUserClimbType(climb.id, climb).subscribe(
                  data => {
                    climb = data;
                    this.editClimbType = false;
                  }
                  );
                }
                displayClimbType(climb: UserClimbType) {
                  this.editClimbType = true;
                  this.managedUserClimbType = climb;
                }


                disableUser(user: User) {
                  user.enabled = false;
                  this.userService.disableUser(user.id, user).subscribe(
                    data=>{
                      user = data;
                    },
                    err=>{
                      console.error('retrieved failed')
                      console.error(err);
                    }
                    );
                    this.auth.logout();
                    window.location.reload();
                  }


          toggleUserToFavorites(user: User, isFavorited: boolean) {
            // isFavorited: boolean = false;
            // this.isFavorited = isFavorited;
            console.log(isFavorited);
            this.userService.addUserToFavorites(user, isFavorited).subscribe(
              data=>{
                console.log('succesfully added user to favorites list');
                // this.favoriteUsers = data.myListOfFavoriteUsers;

                // window.location.reload();
              },
              err=>{
              console.error('retrieved failed')
              console.error(err);
              }
            );
            this.router.navigateByUrl('user/' + user.id);
          }

          setIsFavoritedValue(user: User) {
            this.isFavorited = !this.isFavorited;
            this.toggleUserToFavorites(user, this.isFavorited);

          }

          // checkFavoriteUsersList(user: User): boolean {
          //   for(var i =0; i < this.favoriteUsers.length; i++) {
          //         if(this.favoriteUsers[i].username == user.username){
          //           this.isFavorited = true;
          //           return true;

          //         }
          //         else {
          //           return false;
          //         }
          //       }
          // }

          showMessageBox() {
          this.showMessageTextBox = !this.showMessageTextBox;
          this.getLoggedinUserObject(parseInt(localStorage.getItem('userId')));
          }

          sendMessage(message: Message) {
            console.log(this.loggedInUser);
            message.receiver = this.selectedUser;
            message.sender = this.loggedInUser;
            console.log(message);

            this.userService.createMessage(message, message.receiver.id).subscribe(
              (data) => {
                console.log('message sent succesfully');

              },
              (err) => {
                console.log('message reply failed');

              }

            );
            this.router.navigateByUrl('message');
          }



}
