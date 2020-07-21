import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {  OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { Storage } from '@ionic/storage';

import { Gaussian} from 'ts-gaussian';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  // Array of different segments in chart
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Before' },
    { data: [], label: 'After' }
  ];

  //Labels shown on the x-axis
  lineChartLabels: Label[] = ['+0','+1','+2','+3','+4','+5','+6','+7','+8','+9','+10','+11','+12','+13','+14','+15','+16','+17','+18','+19','+20','+21'];

  // Define colors of chart segments
  lineChartColors: Color[] = [

    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];

  // Set true to show legends
  lineChartLegend = true;

  // Define type of chart
  lineChartType = 'line';

  lineChartPlugins = [];

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  updateGender(newObj) {
    this.gender = newObj.detail.value;
    console.log(this.gender);
    this.storage.set('gender',this.gender);
  }
  updateRace(newObj) {
    this.race = newObj.detail.value;
    console.log(this.race);
    this.storage.set('race',this.race);
  }
  updateRegion(newObj) {
    this.region = newObj;
    console.log(newObj);
    this.storage.set('region',this.region);
  }
  updateWeight(newObj) {
    this.weight = newObj.detail.value;
    console.log(newObj);
    this.storage.set('weight',this.weight);
  }
  updateAge(newObj) {
    this.age = newObj.detail.value;
    console.log(newObj);
    this.storage.set('age',this.age);

  }
  updateHeight(newObj) {
    this.height = newObj.detail.value;
    console.log(newObj);
    this.storage.set('height',this.height);

  }
  updateCancer(newObj) {
    this.isCancer = newObj.detail.checked;
    console.log(newObj);
    this.storage.set('isCancer',this.isCancer);
  }
  updateCOPD(newObj) {
    this.isCOPD = newObj.detail.checked;
    console.log(newObj);
    this.storage.set('isCOPD',this.isCOPD);
  }
  updateKidney(newObj) {
    this.isKidney = newObj.detail.checked;
    console.log(newObj);
    this.storage.set('isKidney',this.isKidney);
  }
  updateImmuno(newObj) {
    this.isImmuno = newObj.detail.checked;
    console.log(newObj);
    this.storage.set('isImmuno',this.isImmuno);
  }
  updateObese(newObj) {
    this.isObese = newObj.detail.checked;
    console.log(newObj);
    this.storage.set('isObese',this.isObese);
  }
  updateDiabetes(newObj) {
    this.isDiab = newObj.detail.checked;
    console.log(newObj);
    this.storage.set('isDiab',this.isDiab);
  }
  updateSickle(newObj) {
    this.isSickle = newObj.detail.checked;
    console.log(newObj);
    this.storage.set('isSickle',newObj.detail.checked);
  }
  updateHeart(newObj) {
    this.isHeart = newObj.detail.checked;
    console.log(newObj);
    this.storage.set('isHeart',newObj.detail.checked);
  }
  updateMaskUsed(newObj) {
    this.isMaskUsed = newObj;
    console.log(newObj);
    this.storage.set('isMU',newObj);
  }
  updateSDF(newObj) {
    this.isSDF = newObj;
    console.log(newObj);
    this.storage.set('isSDF',newObj);
  }
  updateWH(newObj) {
    this.isWH = newObj;
    console.log(newObj);
    this.storage.set('isWH',newObj);
  }
  updateActivity(newObj){
    this.activity = newObj;
    console.log(newObj);
    this.storage.set('activity',newObj);
  }

  previewEvent(newObj)
  {
      let yearLength = 365;

      var t = +(Date.now() - +(new Date("2020-01-01T12:01:04.753Z")));
      var daysSince = +((t/1000/60/60/24).toFixed(0));
      console.log(daysSince);
      //8 days is peak as of now s where we pllace the peak of our distri
      let localProbs: number[] = [];
      let preProbs: number[] = [];
      let postProbs: number[] = [];

      var peak_mu = daysSince + 8;
      console.log(peak_mu);
      //sigma for now (the variance in the curve) is 2 days fixed
      var sigma = 2;
      var dis = new Gaussian(peak_mu,sigma);
      //print out the prob overall of the year for individual year
      for(let i = 0;i<yearLength;i++)
      {
        localProbs[i] = this.GetOverallRatio()*(dis.pdf(i));
        preProbs[i] = this.PreviousProbs[i];
        postProbs[i] = localProbs[i] + preProbs[i];
      }
      //show graphically what that loks like
      var range = 22;
      this.lineChartData[0].data = preProbs.slice( daysSince,daysSince+range );
      this.lineChartData[1].data = postProbs.slice( daysSince,daysSince+range );

  }

  logEvent(newObj){
      let yearLength = 365;

      var t = +(Date.now() - +(new Date("2020-01-01T12:01:04.753Z")));
      var daysSince = +((t/1000/60/60/24).toFixed(0));
      console.log(daysSince);
      //8 days is peak as of now s where we pllace the peak of our distri
      let localProbs: number[] = [];
      let preProbs: number[] = [];
      let postProbs: number[] = [];

      var peak_mu = daysSince + 12;
      console.log(peak_mu);
      //sigma for now (the variance in the curve) is 2 days fixed
      var sigma = 2;
      var dis = new Gaussian(peak_mu,sigma);
      //print out the prob overall of the year for individual year
      for(let i = 0;i<yearLength;i++)
      {
        localProbs[i] = this.GetOverallRatio()*(dis.pdf(i));
        preProbs[i] = this.PreviousProbs[i];
        postProbs[i] = localProbs[i] + preProbs[i];
      }

      //show graphically what that loks like
      var range = 22;
      this.lineChartData[0].data = postProbs.slice( daysSince,daysSince+range );
      this.lineChartData[1].data = [];

      this.storage.set('PrevProb',JSON.stringify(postProbs));
      this.PreviousProbs = postProbs;
  }
  GetOverallRatio(){
    var oR = this.getGenderR()*this.getRaAP()*this.getActivityR()*this.getPrecautionR()*this.getSeverityR();
    console.log(oR);
    return oR;
  }
  getGenderR(){
    var ratio = 0;
    if(this.gender=='male'){
      ratio = this.Men;
    }
    else if(this.gender=='female'){
      ratio = this.Women;
    }
    else{
      ratio = .5;
    }
    return ratio;
  }
  getRaAP(){
    var ratio = 0;
    if(this.age < 17 && this.race == 'hispanic'){
        ratio = this.hisRateUnder17;
    }
    else if(this.age>17 && this.age<50 && this.race == 'hispanic'){
        ratio = this.hisRate18to49;
    }
    else if(this.age>51 && this.age<65 && this.race == 'hispanic'){
        ratio = this.hisRate50to64;
    }
    else if(this.age>65 && this.race == 'hispanic'){
        ratio = this.hisRate64;
    }

    if(this.age < 17 && this.race == 'white'){
        ratio = this.whiteRateUnder17;
    }
    else if(this.age>17 && this.age<50 && this.race == 'white'){
        ratio = this.whiteRate18to49;
    }
    else if(this.age>51 && this.age<65 && this.race == 'white'){
        ratio = this.whiteRate50to64;
    }
    else if(this.age>65 && this.race == 'white'){
        ratio = this.whiteRate64;
    }

    if(this.age < 17 && this.race == 'black'){
        ratio = this.blRateUnder17;
    }
    else if(this.age>17 && this.age<50 && this.race == 'black'){
        ratio = this.blRate18to49;
    }
    else if(this.age>51 && this.age<65 && this.race == 'black'){
        ratio = this.blRate50to64;
    }
    else if(this.age>65 && this.race == 'black'){
        ratio = this.blRate64;
    }

    if(this.age < 17 && this.race == 'asian'){
        ratio = this.asRateUnder17;
    }
    else if(this.age>17 && this.age<50 && this.race == 'asian'){
        ratio = this.asRate18to49;
    }
    else if(this.age>51 && this.age<65 && this.race == 'asian'){
        ratio = this.asRate50to64;
    }
    else if(this.age>65 && this.race == 'asian'){
        ratio = this.asRate64;
    }
    return ratio;
  }
  getActivityR(){
    //this line amplifies the probability based on the severity of tasks ( a task being 9 amplifies the probablity 9x)
    var maxSeverity = 1;
    return this.activity/maxSeverity;
  }
  getPrecautionR(){
    var ratio = 0.5;
    var incr = .5/(1-ratio);
    if(this.isMaskUsed=='false' || this.isMaskUsed == null) {
      ratio = ratio + incr;
    }
    if(this.isWH=='false' || this.isWH == null){
      ratio = ratio + incr;
    }
    if(this.isSDF=='false' || this.isSDF == null){
      ratio = ratio + incr;
    }
    return ratio;
  }
  getSeverityR(){
    var ratio = 0.5;
    var pc = 9/(1-ratio);
    if(this.isCancer==true){
      ratio = ratio + pc;
    }
    if(this.isCancer==true){
      ratio = ratio + pc;
    }if(this.isCOPD==true){
      ratio = ratio + pc;
    }if(this.isKidney==true){
      ratio = ratio + pc;
    }if(this.isImmuno==true){
      ratio = ratio + pc;
    }if(this.isObese==true){
      ratio = ratio + pc;
    }if(this.isHeart==true){
      ratio = ratio + pc;
    }if(this.isDiab==true){
      ratio = ratio + pc;
    }if(this.isSickle==true){
      ratio = ratio + pc;
    }
    return ratio;
  }
  deleteLogs(newObj){
      let yearLength = 365;

      var t = +(Date.now() - +(new Date("2020-01-01T12:01:04.753Z")));
      var daysSince = +((t/1000/60/60/24).toFixed(0));
      console.log(daysSince);
      //8 days is peak as of now s where we pllace the peak of our distri
      let preProbs: number[] = [];
      //print out the prob overall of the year for individual year
      for(let i = 0;i<yearLength;i++)
      {
        preProbs[i] = 0;
      }
      this.PreviousProbs = preProbs;

      //show graphically what that loks like
      var range = 21;
      this.lineChartData[0].data = preProbs.slice( daysSince,daysSince+range );
      this.lineChartData[1].data = preProbs.slice( daysSince,daysSince+range );

      let probs: Array<number> = [];
      for(let i = 0;i<yearLength;i++)
      {
        probs.push(0);
      }
      this.storage.set('PrevProb',JSON.stringify(probs));
  }
  /** constants for infection rates based on data from varied sites **/
  hisRateUnder17 = 13.8/100000;
  hisRate18to49 = 177.7/100000;
  hisRate50to64 = 387.4/100000;
  hisRate64 = 474.6/100000;

  blRateUnder17 = 8.2/100000;
  blRate18to49 = 107.7/100000;
  blRate50to64 = 353.8/100000;
  blRate64 = 743.1/100000;

  asRateUnder17 = 3.6/100000;
  asRate18to49 = 31.9/100000;
  asRate50to64 = 102.8/100000;
  asRate64 = 196.1/100000;

  whiteRateUnder17 = 7.8/100000;
  whiteRate18to49 = 201/100000;
  whiteRate50to64 = 491.8/100000;
  whiteRate64 = 593/100000;
  /** CDC rates for hospitalization **/
  /** from CDC as well **/
  HeartHops = .315;
  LungHops = .191;
  ImmuneHops = .089;
  ObeHops = .499;
  KidHops = .152;
  DiabHops = .071;
  SickHops = .5;
  CancHops = .5;
  /** from **/
  Men = 2.4/3.4;
  Women = 1/3.4;
  /** from https://www.frontiersin.org/articles/10.3389/fpubh.2020.00152/full **/
  isCancer = true;
  isCOPD = true;
  isKidney = true;
  isImmuno = true;
  isObese = true;
  isHeart = true;
  isDiab = true;
  isSickle = true;

  isMaskUsed = 'false';
  isSDF = 'false';
  isWH = 'false';
  age = 29;
  weight = 75;
  gender = 'female';
  height = 175;
  race = 'black';
  region = 'midwest';
  activity = 0;

  PreviousProbs: Array<number> = [];

  constructor(private storage: Storage)
  {
      storage.get('isWH').then((val) => {
        this.isWH = val;
      });
      storage.get('isSDF').then((val) => {
        this.isSDF = val;
      });
      storage.get('isMU').then((val) => {
        this.isMaskUsed = val;
      });
      storage.get('age').then((val) => {
        this.age = val;
      });
      storage.get('weight').then((val) => {
        this.weight = val;
      });
      storage.get('gender').then((val) => {
        this.gender = val;
      });
      storage.get('height').then((val) => {
        this.height = val;
      });
      storage.get('race').then((val) => {
        this.race = val;
      });

      storage.get('isCancer').then((val) => {
        this.isCancer = val;
      });
      storage.get('isCOPD').then((val) => {
        this.isCOPD = val;
      });
      storage.get('isObese').then((val) => {
        this.isObese = val;
      });
      storage.get('isSickle').then((val) => {
        this.isSickle = val;
      });
      storage.get('isHeart').then((val) => {
        this.isHeart = val;
      });
      storage.get('isKidney').then((val) => {
        this.isKidney = val;
      });
      storage.get('isImmuno').then((val) => {
        this.isImmuno = val;
      });
      storage.get('isDiab').then((val) => {
        this.isDiab = val;
      });

      //
      storage.get('PrevProb').then((val) => {
        var pp = val;
        console.log(val);
        if (val == null) {
              let yearLength = 365;
              let probs: Array<number> = [];
              for(let i = 0;i<yearLength;i++)
              {
                probs.push(0);
              }
              this.storage.set('PrevProb',JSON.stringify(probs));
        }
        storage.get('PrevProb').then((val) => {
          this.PreviousProbs = JSON.parse(val);
          console.log('Prev Prob');
          console.log(this.PreviousProbs);
          let yearLength = 365;

          let t = +(Date.now() - +(new Date("2020-01-01T12:01:04.753Z")));
          let daysSince = +((t/1000/60/60/24).toFixed(0));

          //show graphically what that loks like
          var range = 22;
          this.lineChartData[0].data = this.PreviousProbs.slice( daysSince,daysSince+range );
          this.lineChartData[1].data = this.PreviousProbs.slice( daysSince,daysSince+range );

        });
      });

  }
  getCurrentDate(){
    var date = new Date();
    var dates = date.toDateString();
  }
}