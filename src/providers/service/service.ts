import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from "@ionic/storage";

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.  
*/

// let apiUrl = 'https://smartcryptosolution.org/JatShadi/AndroidClass';
let apiUrl = 'https://jatshadi.com/AndroidClass';
@Injectable()
export class ServiceProvider {
  token: any;
  // headers = new Headers({ "Content-Type": "application/json" });

  headers = new Headers(
    { "Access-Control-Allow-Origin": "http://localhost:8100" }
    );
  constructor(public http: Http) {
    // console.log('Hello ServiceProvider Provider');
    // storage.get("token").then(token => {
    //   this.token = token;
    //   if (token) {
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:8101');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    this.headers.append('Content-Type', 'application/json');
    // this.headers.append('Content-Type','multipart/form-data');
    //   this.headers.append("Authorization", token);
    // }
  }



  // This api is used for login in application.  
  loginApi(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UserLogin.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  // This api is used for Forgot Password in application. 
  forgotPwdApi(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/ForgotPassword.php', JSON.stringify(data), { headers: headers }) 
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // This api is used for Get All User Information in application.
  getAllUserDetails(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UserDetailByID.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // This api is used for Get Famliy All SelectBox Information in application.
  getAllFamliyInfo(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/FamilyBox.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // This api is used for Get All Information in application.
  getAllInfo(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UserRegisterAPI.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // This api is used for Get Country List in application.
  getCountryList(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/CountryList.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // This api is used for Get State List in application.
  getStateList(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/StateList.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  // This api is used for Get City List in application.
  getCityList(data) {
    return new Promise((resolve, reject) => { 
      let headers = new Headers();
      this.http.post(apiUrl + '/CityList.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // This api is used for sign up in application.
  signupApi(credentials) {
    return new Promise((resolve, reject) => {
      //  let headers = new Headers();
      this.http.post(apiUrl + '/UserRegister.php', JSON.stringify(credentials))
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // This api is used for Verify MobileNo  in application.
  VerifyMobileNoApi(credentials) {
    return new Promise((resolve, reject) => {
      //  let headers = new Headers();
      this.http.post(apiUrl + '/VerifyMobileNo.php', JSON.stringify(credentials))
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

   // This api is used for Resend OTP in application.
   ResendOTPApi(credentials) {
    return new Promise((resolve, reject) => {
      //  let headers = new Headers();
      this.http.post(apiUrl + '/ResendOTP.php', JSON.stringify(credentials))
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  // This api is used for Update User Family Information in application.
  updateFamilyDetails(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UpdateFamilyDetail.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  } 
  // This api is used for Update User Information in application.  
  updateAllUserDetails(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UserEditProfile.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

   // This api is used for Update User Prefernce  in application.
   updatePrefernce(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/ExpectedChoice.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // This api is used for Get User Prefernce  in application.
  getPrefernceDetails(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UserExpectedDetail.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

   // This api is used for Get User Prefernce  in application.
   changePassword(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/ChangePassword.php', JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

   // This api is used for Get User Send Invitation List  in application.
   SendInvitationList(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/SendInvitationList.php', JSON.stringify(data), { headers: headers })   
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // This api is used for Get User Receive Invitation List  in application.
  ReceiveInvitationList(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/ReceiveInvitationList.php', JSON.stringify(data), { headers: headers })           
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err); 
        });
    });
  }

  // This api is used for Get All User  List  in application.
  UserListing(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UserListing.php', JSON.stringify(data), { headers: headers })                 
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err); 
        });
    });
  }

   // This api is used for  User Selecte in application.
   userSelectedId(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UserSelectedId.php', JSON.stringify(data), { headers: headers })                
        .subscribe(res => { 
          resolve(res.json());
        }, (err) => {
          reject(err); 
        });
    });
  }

   // This api is used for Connect User  in application.
   connectNow(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/SendInvitation.php', JSON.stringify(data), { headers: headers })                
        .subscribe(res => { 
          resolve(res.json());
        }, (err) => {
          reject(err); 
        });
    });
  }

  
   // This api is used for cancel Connectetion User  in application.
   UpdateStatus(data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UpdateInvitationStatus.php', JSON.stringify(data), { headers: headers })                
        .subscribe(res => { 
          resolve(res.json());
        }, (err) => {
          reject(err); 
        });
    });
  }


  // This api is used for Get All User  List  in application.
  updateProfileApi(profile,no) {
    //console.log("services")
  //  console.log(JSON.stringify(profile))
    let body:FormData = new FormData();
    body.append("ProfileID", no);
    body.append("RegisterId",  localStorage.getItem("register_id"));
    body.append("ValidData", localStorage.getItem("ValidDataJat"));
    body.append("ProfilePicture", profile);
    body.append("Type", '1');
  //  console.log(JSON.stringify(profile)) 
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl + '/UpdateUserProfile.php', body, { headers: headers })              
        .subscribe(res => { 
          resolve(res.json());
        }, (err) => {
          reject(err); 
        });
    });
  }
  
   // This api is used for Get All User Information in application.
 UserLogout(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/UserLogout.php', JSON.stringify(data), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });
}
// This api is used for Add Account in application.  
addAllUserDetails(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/AddAccount.php', JSON.stringify(data), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });
}

// This api is used for Check Dublicate Value in application.  
CheckDublicateValueApi(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/CheckDublicateValue.php', JSON.stringify(data), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });
}

// This api is used for User Social Login (Gmail) in application.  
UserSocialLogin(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/UserSocialLogin.php', JSON.stringify(data), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });
}

// This api is used for Update Social Deatils (Gmail) in application.  
UpdateSocialDeatils(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/UpdateSocialDeatils.php', JSON.stringify(data), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });
}
// This api is used for Get Chat List in application.  
ChatList(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/ChatList.php', JSON.stringify(data), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });
}

// This api is used for Conversation in application.  
Conversation(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/Conversation.php', JSON.stringify(data), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });
}

// This api is used for Chat Delete in application.  
ChatDelete(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/ChatDelete.php', JSON.stringify(data), { headers: headers })
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });
}
// This api is used for Delete All Chat in application.  
DeleteAllChat(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/DeleteAllChat.php', JSON.stringify(data), { headers: headers })   
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
  });
}
 
// This api is used for Delete All Chat in application.  
UserBlockUnblock(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/UserBlockUnblock.php', JSON.stringify(data), { headers: headers }) 
      .subscribe(res => {
        resolve(res.json());
      }, (err) => { 
        reject(err);
      });
  });
} 


// This api is used for Buy Plan in application.  
BuyPlan(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/BuyPlan.php', JSON.stringify(data), { headers: headers }) 
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err); 
      });
  });
}

// This api is used for Purchase Plan in application.  
PurchasePlan(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/PurchasePlan.php', JSON.stringify(data), { headers: headers }) 
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err); 
      });
  });
}
// This api is used for UpdateContact in application.  
UpdateContact(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/UpdateContact.php', JSON.stringify(data), { headers: headers }) 
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err); 
      });
  });
}

// This api is used for Update Transaction Status in application.   
UpdateTransactionStatus(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/UpdateTransactionStatus.php', JSON.stringify(data), { headers: headers }) 
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err); 
      });
  });
}

// This api is used for Transaction History  in application.  
TransactionHistory(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/TransactionHistory.php', JSON.stringify(data), { headers: headers }) 
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err); 
      });
  });
}

// This api is used for UserLike History  in application.  
UserLikeHistory(data) {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    this.http.post(apiUrl + '/UserLikeHistory.php', JSON.stringify(data), { headers: headers }) 
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err); 
      });
  });
}
}



