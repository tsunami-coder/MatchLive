
'use strict';//使用严格语法
import React, { Component } from 'react';
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';



var Dimensions = require('Dimensions');
var fiveLeague = new Array();
var initSelectLeagues = new Array();
class LeagueName extends Component {
  constructor(props) {
    super(props);
    fiveLeague =  new Array();
    fiveLeague.push('英超');
    fiveLeague.push('西甲');
    fiveLeague.push('德甲');
    fiveLeague.push('意甲');
    fiveLeague.push('法甲');

    initSelectLeagues = new Array();
    this.state = {
      animatedOpacity: new Animated.Value(0),
      toastVisiable:false
    };

   var matchCount = 0;
    var nameidMap = this.props.dataSource.nameidMap;
    var matchNameObjects = this.props.dataSource.matchNameObjects;
    matchNameObjects.forEach(function(matchObject) {

      this.state[matchObject.leagueName] = matchObject.selectState;
      if(matchObject.selectState){
        initSelectLeagues.push(matchObject.leagueName);
      var matchids = nameidMap[matchObject.leagueName];

      if (matchids) matchCount += matchids.length;

      }
      
    }, this);

console.log('initSelectLeagues'+initSelectLeagues);
    this.state['matchCount'] = matchCount;
  
    this.onPressSelectAll  = this.onPressSelectAll.bind(this);
    this.onPressReverse    = this.onPressReverse.bind(this);
    this.onPressFiveLeague = this.onPressFiveLeague.bind(this);
    this.onPressLeagueName = this.onPressLeagueName.bind(this);
    this.onPressConfirm    = this.onPressConfirm.bind(this);
    this.onPressCancle    = this.onPressCancle.bind(this);

  }



  //---全选---
  onPressSelectAll() {

var object = new Object();
 var matchNameObjects = this.props.dataSource.matchNameObjects;
  var nameidMap = this.props.dataSource.nameidMap;
 
 var tmpmatchCount  = 0;

    matchNameObjects.forEach(function(matchObject) {



   matchObject.selectState = true;
    var matchids = nameidMap[matchObject.leagueName];
   var flag = matchObject.selectState;
   
   if(flag){
    tmpmatchCount +=matchids.length;
   
   }else{
    tmpmatchCount -=matchids.length;

   }
  object[matchObject.leagueName] = matchObject.selectState;
      
      
    }, this);
    this.setState({'matchCount':tmpmatchCount});
    this.setState(object);


  }

  //---反选---
  onPressReverse() {

var object = new Object();
var matchNameObjects = this.props.dataSource.matchNameObjects;
 var nameidMap = this.props.dataSource.nameidMap;
var tmpmatchCount  = this.state.matchCount;
    matchNameObjects.forEach(function(matchObject) {



     matchObject.selectState = !matchObject.selectState;


    var matchids = nameidMap[matchObject.leagueName];
   var flag = matchObject.selectState;
   if(flag){
    tmpmatchCount +=matchids.length;
   
   }else{
    tmpmatchCount -=matchids.length;

   }


      object[matchObject.leagueName] = matchObject.selectState;
      
    }, this);

  this.setState({'matchCount':tmpmatchCount});
    this.setState(object);

  }


  //---五大联赛
  onPressFiveLeague() {

var object = new Object();
var matchNameObjects = this.props.dataSource.matchNameObjects;
 var nameidMap = this.props.dataSource.nameidMap;
var tmpmatchCount  = 0;
    matchNameObjects.forEach(function(matchObject) {
    
    

    if(fiveLeague.indexOf(matchObject.leagueName) > -1){
        matchObject.selectState = true;

    }else{

      matchObject.selectState = false;

    }

    var matchids = nameidMap[matchObject.leagueName];
   var flag = matchObject.selectState;
   if(flag){
    tmpmatchCount +=matchids.length;
   
   }
      object[matchObject.leagueName] = matchObject.selectState;
      
    }, this);
this.setState({'matchCount':tmpmatchCount});

  
    this.setState(object);




  }


  //---取消----
  onPressCancle() {

    //----点击取消需要将操作的还原到最初状态---

 var matchNameObjects = this.props.dataSource.matchNameObjects;
    matchNameObjects.forEach(function(matchObject) {



    if(!matchObject.selectState){
      
         if(initSelectLeagues.indexOf(matchObject.leagueName) >-1){
          matchObject.selectState = true;
        }   

      }else{

          if(initSelectLeagues.indexOf(matchObject.leagueName) <0){
            matchObject.selectState = false;
        } 

     }
      

      
      
    }, this);

if(this.props.cancleCallBack){

          this.props.cancleCallBack();

      }
    
   }
  //---确定-----
  onPressConfirm() {

   if(this.state.matchCount >0){


    if(this.props.confirmCallBack){

          this.props.confirmCallBack();

      }
   }else{
    this.setState({
            toastVisiable: true
        });
        var that = this;
    setTimeout(
      function () { that.setState({
            toastVisiable: false
        }); },
      1000
    );

   }
 }

  //---联赛button选中----
  onPressLeagueName(index){

    
   
    var matchNameObjects = this.props.dataSource.matchNameObjects;
    var matchNameObject =  matchNameObjects[index];

   var nameidMap = this.props.dataSource.nameidMap;
   

   var tmpmatchCount  = this.state.matchCount;
   
  
   var matchids = nameidMap[matchNameObject.leagueName];
   var flag = matchNameObject.selectState;
   if(flag){
    tmpmatchCount -=matchids.length;
   
   }else{
    tmpmatchCount +=matchids.length;

   }
  
  this.setState({'matchCount':tmpmatchCount});

    matchNameObject.selectState = !matchNameObject.selectState;


    //this.state[matchNameObject.leagueName].setValue(matchNameObject.selectState);
     var object = new Object();
      
    matchNameObjects.forEach(function(matchObject) {

  
     object[matchObject.leagueName] = matchObject.selectState;

     
    }, this);
    
    

    this.setState(object);
 }


  render() {
    var windowWidth = Dimensions.get('window').width;
    var windowHeight = Dimensions.get('window').height;
    //------弹框总宽度-----
    var alertViewWidth = 280;

    //---弹框顶部title区域高度
    var alertTitleViewHeight = 40;
    //--弹框底部取消和确认区域高度
    var alertBottomViewHeight = 44;

    //---中间区域选择按钮区域高度
    var alertCenterTopViewHeight = 50;
    //---中间区域赛事场数视图高度
    var alertCenterBottomViewHeight = 30;

    //-----原始弹框中部区域高度，默认高度（当实际计算的高度小于这个高度使用这个高度)
    var centerViewHeight = 179;

    var alertViewHeight = centerViewHeight + alertTitleViewHeight + alertBottomViewHeight;

    var cancleButtonWidth = alertViewWidth / 2 - 0.5;

    //--按钮左侧间距（相对距离）
    var centerTopButtonMarginLeft = 15;
    var buttonHeight = 30,
      buttonWidth = 75;
    var centerTopViewButtonSpace = (alertViewWidth - centerTopButtonMarginLeft * 2 - buttonWidth * 3) / 2;

    //----页面数据源对象----
    var matchNameObjects = this.props.dataSource.matchNameObjects;

    

    
    //---中间button列表（联赛名称视图区域）

    var rowHeight = 42.5;//每行buttonview的高度是42.5
    var buttonIndex = 0; //button索引
    var initTop = 12.5; //button左右和上下的间距
    var buttonListMarginLeft = 15;
    var buttonListViewMarginTop = initTop;

   var that = this;
    var buttonList = matchNameObjects.map(
      function (matchObject) {
        var rowIndex = buttonIndex / 3;
        if (buttonIndex % 3 == 0) {

          buttonListMarginLeft = 15;
          buttonListViewMarginTop = rowIndex * rowHeight + initTop;

        } else {

          buttonListMarginLeft += 75 + 12.5;
        }

        var key =  buttonIndex;
        buttonIndex++;

        return (
          <Text style  = {[styles.leagueNameButton, { top: buttonListViewMarginTop, left: buttonListMarginLeft},that.state[matchObject.leagueName]?{borderWidth: 0, borderColor: '#FD5453', color: '#FFFFFF', backgroundColor: '#FD5453'}:{borderWidth: 1, borderColor: '#F1F1F1', color: '#333333', backgroundColor: '#FFFFFF'}]}
                key    = {key}
               onPress = {() => { that.onPressLeagueName(key)}}>{matchObject.leagueName}</Text>
        );

      })

    var rowCount = parseInt(matchNameObjects.length / 3);

    rowCount = matchNameObjects.length % 3 == 0 ? rowCount : rowCount + 1;



    var centerButtonListViewHeight = rowCount * rowHeight + initTop;



    var tmpCenterViewHeight = centerButtonListViewHeight + alertCenterTopViewHeight + alertCenterBottomViewHeight;


    if (tmpCenterViewHeight > centerViewHeight) {

      centerViewHeight = tmpCenterViewHeight;

    }

    //--中间区域centerheight
    var centerButtonListViewContentHeight = centerViewHeight - alertCenterTopViewHeight - alertCenterBottomViewHeight;

    var alertViewHeight = centerViewHeight + alertTitleViewHeight + alertBottomViewHeight;


    var top = (windowHeight - alertViewHeight) / 2;
    var left = (windowWidth - alertViewWidth) / 2;

    var scrollEnabled = false;

    if (alertViewHeight > windowHeight - 120) {
      scrollEnabled = true;
      top = 60;
      alertViewHeight = windowHeight - 120;
      centerViewHeight = alertViewHeight - alertTitleViewHeight - alertBottomViewHeight;
      centerButtonListViewHeight = centerViewHeight - alertCenterTopViewHeight - alertCenterBottomViewHeight;
    }


    return (
      <Animated.View style = {[styles.mainView, { width: windowWidth, height: windowHeight }]}>

        <View style = {[styles.background, { width: windowWidth, height: windowHeight }]} ></View>
        
        <View style = {[styles.alertView, { top: top, left: left, width: alertViewWidth, height: alertViewHeight }]} >


          <Text style = {[styles.titleView]} > 赛事过滤</Text>
          <View style = {[styles.centerView, { height: centerViewHeight }]} >

            <View style = {[styles.centerTopButton, { height: alertCenterTopViewHeight }]}>
              
              <Text style = {[styles.button, { marginLeft: centerTopButtonMarginLeft }]} onPress={this.onPressSelectAll}> 全部 </Text>
              <Text style = {[styles.button, { marginLeft: centerTopViewButtonSpace }]} onPress={this.onPressReverse}> 反选 </Text>
              <Text style = {[styles.button, { marginLeft: centerTopViewButtonSpace }]} onPress={this.onPressFiveLeague} > 五大联赛 </Text>

            </View>

            <View style = {[styles.centerline, { width: alertViewWidth - 40, marginLeft: 20 }]}></View>
            <ScrollView style = {[styles.centerbuttonList, { height: centerButtonListViewHeight }]}
              scrollEnabled = {scrollEnabled}
              >

              <View style = {[{ height: centerButtonListViewContentHeight }]}>{buttonList}</View>

            </ScrollView>
            <View style = {[styles.centerline, { width: alertViewWidth - centerTopButtonMarginLeft * 2, marginLeft: centerTopButtonMarginLeft }]}></View>
            <Text style = {[styles.centerBottomCount, { height: alertCenterBottomViewHeight, padding: (alertCenterBottomViewHeight - 15) / 2 }]}>共{this.state.matchCount}场比赛</Text>

          </View>
          <View style = {[styles.vline, { width: alertViewWidth }]} ></View>
          <View style = {[styles.bottomButtonView]} >
            <Text style = {[styles.bottomButton, { width: cancleButtonWidth }]} onPress={this.onPressCancle}> 取消</Text>
            <View style = {[styles.hline, { height: 43 }]} ></View>
            <Text style = {[styles.bottomButton, { width: cancleButtonWidth }]}  onPress={this.onPressConfirm}> 确定</Text>
          </View>
           {this.state.toastVisiable?<View style = {[styles.toastView,{width:alertViewWidth -40,height:30,top:(alertViewHeight  - 30)/2,left:20}]}><View style = {styles.toastBackView}><Text style = {styles.toastConentView}>您已经选择0场比赛,请选择比赛场次</Text></View></View>:null}

        </View>

      </Animated.View>);

  }

  //用了render方法后，组件加载成功并被成功渲染出来以后所执行的hook函数，一般会将网络请求等加载数据的操作，放在这个函数里进行，来保证不会出现UI上的错误
  componentDidMount() {

    this.state.animatedOpacity.setValue(1.5);

    Animated.spring(this.state.animatedOpacity, { toValue: 0.8, friction: 1 }).start();

    




  }
  //指父元素对组件的props或state进行了修改
  componentWillReceiveProps() { }
  //一般用于优化，可以返回false或true来控制是否进行渲染
  shouldComponentUpdate() {
    return true;
  }
  //组件刷新前调用，类似componentWillMount
  componentWillUpdate() { }
  //更新后的hook
  componentDidUpdate() { }
  //销毁期，用于清理一些无用的内容，如：点击事件Listener
  componentWillUnmount() { }



}

const styles = StyleSheet.create({

  mainView: {
    position: 'absolute',
    top: 0,
    left: 0,
  },


  background: {
    opacity: .3,
    backgroundColor: '#000000',
  },
  alertView: {
    overflow: 'hidden',
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    flexDirection: 'column',
  },

  titleView: {
    textAlign: 'center',
    paddingTop: 12,
    fontSize: 17,
    height: 40,
    lineHeight: 17,
    backgroundColor: '#F7F7F7',
  },

  centerView: {
    height: 179,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },


  centerTopButton: {

    flexDirection: 'row',

  },

  centerline: {

    height: 1,
    backgroundColor: '#F1F1F1',

  },

  leagueNameButton: {
    overflow: 'hidden',
    position: 'absolute',
    fontSize: 15,
    lineHeight: 15,
    paddingTop: 7,
    textAlign: 'center',
    width: 75,
    height: 30,
    borderRadius: 4,
  },

  button: {
    overflow: 'hidden',
    marginTop: 10,
    fontSize: 15,
    lineHeight: 15,
    paddingTop: 9,
    textAlign: 'center',
    width: 75,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },

  centerbuttonList: {


  },

  centerBottomCount: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 15,
    color: '#4A90E2',

  },

  bottomButtonView: {
    height: 43,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },

  vline: {

    height: 1,
    backgroundColor: '#F7F7F7',
  },

  hline: {
    width: 1,
    backgroundColor: '#F7F7F7',
  },


  bottomButton: {
    textAlign: 'center',
    color: '#FD5453',
    paddingTop: 13,
    fontSize: 17,
    lineHeight: 17,
    height: 43,
  },

  toastView:{

      borderRadius:5,
      overflow:'hidden',
      position: 'absolute', 
  },
toastBackView:{
height:40,
backgroundColor:'#000000',
opacity:0.5,
},
toastConentView:{
   color:'#FFFFFF',
   textAlign:'center',
   marginTop:8,
   fontSize:13,
   height:14,
   lineHeight:14,
}

});

module.exports = LeagueName;
