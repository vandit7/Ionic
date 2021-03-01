import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/index';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AtomService {
    
    

    public data: any;
    public mode: string;
    public loginId: string;
    public password: string;
    public reqhashkey: string;
    public prodid: string;
    public reshashkey: string;
    
    constructor(private iab: InAppBrowser) {
        this.mode="prod";
        this.data  = {};
    }
    addData(name:string, value:string){
         this.data[name] = value;   
    }

    setData(data:any) {
        this.data = data;
    }


    process(){
        let atomService = this;
    
        return new Promise( (resolve, reject) => {
            
            let url = "https://payment.atomtech.in/paynetz/epi/fts";
            let ru = "https://payment.atomtech.in/mobilesdk/param";
    
            if(this.mode == 'uat'){
                url = "https://paynetzuat.atomtech.in/paynetz/epi/fts";
                ru = "https://paynetzuat.atomtech.in/mobilesdk/param"
            }
            url += "?login=" + atomService.loginId;
            url += "&pass=" + atomService.password;
            url += "&prodid=" + atomService.prodid;
            url += "&txncurr=" + "INR";
            url += "&txnscamt=" + "0";
            url += "&ttype=" + "NBFundTransfer";
            url += "&ru=" + ru;
            Object.keys(atomService.data).forEach(key => {
                let value = atomService.data[key];
                if(key == "clientcode"){
                    url += "&"+ key + "=" + atomService.base64Enc(value); 
                } else {
                    url += "&"+ key + "=" + value; 
                }
              });
              
            let signatureStr = atomService.loginId+ atomService.password + "NBFundTransfer" + atomService.prodid + atomService.data["txnid"] + atomService.data["amt"] +"INR";
            
            let signature = atomService.generatesignature(signatureStr, atomService.reqhashkey);
            url += "&signature=" + signature;
            let options = "location=no,hidenavigationbuttons=yes,closebuttoncaption=Done,footer=yes,hardwareback=no,footercolor=#1b58c7";
            const browser = this.iab.create(url,'_blank',options);
            browser.on('loadstop').subscribe(event => {
                if(event.url.includes('/mobilesdk/param') && !event.url.includes('/paynetz/epi/fts')){        
                    let jsfunc = "document.getElementsByTagName('h5')[0].innerHTML";            
                    browser.executeScript({code:jsfunc}).then((html)=>{                        
                        let res = atomService.parseResponse(html[0]) ;
                        browser.close();
                        resolve(res);                        
                    });
                }
            });
            
        });
    
       
        //const browser = this.iab.create(url);
        
    }

    parseResponse = function(res:string){
        let response = {};
        let pipeArray = res.split("|");
        pipeArray.forEach(element => {
            if(element && element.includes("=")){
                let paramArray = element.split("=");
                let key = paramArray[0];
                let value = "";
                if(paramArray && paramArray.length > 1){
                    value =  paramArray[1]; 
                }
                response[key] = value;
            }
        });
        console.log(response);
        let resText = response["f_code"];
        if(response["f_code"] == 'success_00'){
            resText = "Ok"
        } else if(response["f_code"] == 'F_05'){
            resText = "F"
        }else if(response["f_code"] == 'C_06'){
            resText = "C"
        }
        let resStr = response["mmp_txn"]+response["mer_txn"]+resText+response["prod"]+response["discriminator"]+response["amt"]+response["bank_txn"];
        console.log(resStr);
        console.log(this.reshashkey);
        console.log(response["signature"]);
        console.log(this.generatesignature(resStr, this.reshashkey));
        if(response["signature"] != this.generatesignature(resStr, this.reshashkey)){
            return false;
        }
        return response;
    }
    base64Enc = function(req:string){
        let wArray = CryptoJS.enc.Utf8.parse(req);
        return CryptoJS.enc.Base64.stringify(wArray);
    }

    generatesignature = function(reqstr:string, key:string){
       let signatureBytes  = CryptoJS.HmacSHA512(reqstr, key);
       return signatureBytes.toString();
    }

}