import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

declare var $:any

@Injectable()
export class LifeSizeIndexCalcService {
  public globalSelItems = {};
  diagonalDimension;
  aspectWidth;
  aspectHeight;
  isManuallySelected;
  MonitorModel = {
      monitorParams: {},
      getMonitorParams: function(){
          return this.monitorParams;
      },
      setMonitorParams: function(params, imgSize){
          this.monitorParams = params;
          this.updateView(imgSize);
      }
  };

  constructor(@Inject(DOCUMENT) private document: any) { }

  setMonitorParams(params, imgSize) {
    this.MonitorModel.monitorParams = params;
    this.updateView(imgSize);
  }

  MonitorParams(diagonalDimension, aspectWidth, aspectHeight, isManuallySelected){
      this.diagonalDimension = diagonalDimension;
      this.aspectWidth = aspectWidth == 0 ? screen.width : aspectWidth;
      this.aspectHeight = aspectHeight == 0 ? screen.height : aspectHeight;
      this.isManuallySelected = isManuallySelected;
  }

  setItem(key, value) {
      this.globalSelItems[key] = value;
  }

  getItem(key) {
      return this.globalSelItems[key];
  }

  findDimensions() {
      var width = 0, height = 0;
      if(window.innerWidth) {
          width = window.innerWidth;
          height = window.innerHeight;
      } else if (document.body && document.body.clientWidth) {
          width = document.body.clientWidth;
          height = document.body.clientHeight;
      }
      if(document.documentElement && document.documentElement.clientWidth) {
          width = document.documentElement.clientWidth;
          height = document.documentElement.clientHeight;
      }
      return width;
  }

  getDiagonal() {
      return this.getDiagonalPureHtml();
  }

  getDiagonalPureHtml() {
      if(localStorage.getItem('calibratedSize')) {
          return localStorage.getItem('calibratedSize');
      }
      var pixelWidth = this.document.getElementById("inchElement").width;
      var pixelHeight = this.document.getElementById("inchElement").height;
      var screenInchWidth = screen.width / pixelWidth;
      var screenInchHeight = screen.height / pixelHeight;
      var screenDiagonalInches = Math.round(Math.sqrt(screenInchWidth * screenInchWidth + screenInchHeight * screenInchHeight)*10)/10;
      return screenDiagonalInches;
  }

  public updateView(imgSize){
      var monitorParams = this.MonitorModel.getMonitorParams();
      this.resizeVisibleImages(monitorParams.diagonalDimension, monitorParams.aspectHeight, monitorParams.aspectWidth, imgSize);
      this.document.getElementById("aspectWidthField").value = monitorParams.aspectWidth;
      this.document.getElementById("aspectHeightField").value = monitorParams.aspectHeight;
  }

  resizeVisibleImages(diagonal, aspectHeight, aspectWidth, imgSize) {
      $('img[id *= "bigitem"]:visible').each(function(){
          var innerDivId = $(this).attr('id');
          var itemId = innerDivId.substring(0, innerDivId.indexOf("_"));
          var n = innerDivId.lastIndexOf('_');
          var imgIndex = innerDivId.substring(n + 1);
          var item = this.globalSelItems[itemId];
          //var itemDetails = this.getItemDetails(item,imgIndex);
          this.resizeImage(diagonal, aspectHeight, aspectWidth,innerDivId,item.img1Height, item.img1Width, imgSize)
      });
  }

  resizeImage(diagonal, aspectHeight, aspectWidth, imgName, height, width, imgSize,document) {
      var wp = screen.width > screen.height ? screen.width : screen.height;
      var hp = screen.width > screen.height ? screen.height: screen.width;
      var aspectRatio = aspectWidth > aspectHeight ? aspectWidth/aspectHeight : aspectHeight/aspectWidth;
      var pxPerMm = (aspectRatio > 0 ? wp : hp)/(diagonal*aspectRatio/(Math.sqrt(aspectRatio*aspectRatio + 1)))/25.4;
      var windowWidthmm = this.findDimensions() / pxPerMm;
      var lsH = height;
      var lsW = width;
      var imgElem = document.getElementById(imgName);
      imgElem.style.width = lsW  * pxPerMm * imgSize + "px";
      imgElem.style.height = lsH * pxPerMm * imgSize + "px";
      imgElem.width = lsW  * pxPerMm * imgSize + "px";
      imgElem.height = lsH * pxPerMm * imgSize + "px";
      
      //set the parent div width and height
      var parentElem = imgElem.parentNode;
      parentElem.style.width = imgElem.style.width;
      parentElem.style.height = imgElem.style.height;
      
      parentElem.width = imgElem.width;
      parentElem.height = imgElem.height;
  }

  updateSize(itemName, height, width, imgSize) {
      var monitorParams = this.MonitorModel.getMonitorParams();
      this.resizeImage(monitorParams.diagonalDimension, monitorParams.aspectHeight, monitorParams.aspectWidth, itemName, height, width, imgSize,document);
  }
      
  showPopup(){
      document.getElementById("inputPanel").style.display="";
      this.updateControls();
  }

  hidePopup(){
      document.getElementById("inputPanel").style.display="none";
  }

  popupOnclick(imgSize, document){
      document.getElementById("inputPanel").style.display="none";
      var diagonalDimension = document.getElementById("diagonalField").value;
      var aspectHeight = document.getElementById("aspectHeightField").value;
      var aspectWidth = document.getElementById("aspectWidthField").value;
      this.MonitorModel.setMonitorParams({
          diagonalDimension:diagonalDimension,
          aspectHeight:aspectHeight,
          aspectWidth:aspectWidth,
          isManuallySelected:true}, imgSize
      );
  }
      
  updateImage(imgSize) {
      this.updateView(imgSize);
  }

  numberFieldListener(evt){
      var charCode = (evt.which) ? evt.which : event["keyCode"];
      if (charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57))
          return false;
      return true;
  }

  updateControls(){
      var diagonalDimension = this.document.getElementById("diagonalField").value;
      var aspectHeight = this.document.getElementById("aspectHeightField").value;
      var aspectWidth = this.document.getElementById("aspectWidthField").value;
      var isActive = diagonalDimension && aspectHeight && aspectWidth;
      if (isActive)
          this.document.getElementById('createButton').disabled='';
      else
          this.document.getElementById('createButton').disabled='disabled';
  }
      
  init() {
      this.MonitorModel.setMonitorParams(new this.MonitorParams(this.getDiagonal(),screen.width,screen.height,false),1.0);
          this.updateView(1.0);
      }

  resetModel() {
      this.MonitorModel.setMonitorParams(new this.MonitorParams(this.getDiagonal(),screen.width,screen.height,false), 1.0);
  }
}
