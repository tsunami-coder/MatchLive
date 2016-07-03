import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView
} from 'react-native';

import NetWorkUtil from './app/util/NetWorkUtil';
import Global      from './app/util/Global';
import MatchLiveObject from './app/model/MatchLiveObject';
import MatchObject from './app/model/Match';

//----赛事筛选列表展开视图---
var LeagueName = require('./app/js/leagueName');

var Dimensions = require('Dimensions');
var matchLiveObject;
var currentDateID;
class MainView extends Component {


  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      dateSelect: null,
      matchSelectView: null,
      all:true,
      noFinish:false,
      finish:false,
      headerViewLineleft:0,
    };
    this.onPressMatchSelect = this.onPressMatchSelect.bind(this);
    this.cancleCallBack = this.cancleCallBack.bind(this);
    this.confirmCallBack = this.confirmCallBack.bind(this);
    this.switchDate = this.switchDate.bind(this);
    this.selectAllMatchs = this.selectAllMatchs.bind(this);
    this.selectNoFinishMatchs = this.selectNoFinishMatchs.bind(this);
    this.selectFinishMatchs = this.selectFinishMatchs.bind(this);
    //this.renderSectionHeaderItem = this.renderSectionHeaderItem.bind(this);
    
  }


   selectAllMatchs(){
    
    this.setState({all:true,noFinish:false,finish:false,headerViewLineleft:0});

     var currentObject = matchLiveObject.matchMap[currentDateID];

  
    this.setState({
          dataSource: this.state.dataSource.cloneWithRows(currentObject.matchIds)});


          
    
   }
   selectNoFinishMatchs(){

      var lineWidth = Dimensions.get('window').width / 3;
      this.setState({all:false,noFinish:true,finish:false,headerViewLineleft:lineWidth});


      var currentObject = matchLiveObject.matchMap[currentDateID];

     var newMatchIds = new Array();
    currentObject.matchIds.forEach(function(matchId) {
     
      var match = currentObject.idObjectMap[matchId];
       var matchState = match.status;
    if(matchState !=3 ){
      newMatchIds.push(matchId);
    }

    }, this);

    this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newMatchIds)});

      
   }
   selectFinishMatchs(){
     var lineWidth = Dimensions.get('window').width / 3;
     this.setState({all:false,noFinish:false,finish:true,headerViewLineleft:lineWidth *2});

      var currentObject = matchLiveObject.matchMap[currentDateID];

     var newMatchIds = new Array();
    currentObject.matchIds.forEach(function(matchId) {
     
      var match = currentObject.idObjectMap[matchId];
       var matchState = match.status;
    if(matchState ==3 ){

      newMatchIds.push(matchId);
    }

    }, this);
    
    this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newMatchIds)});
     

   }
   cancleCallBack(){

      this.setState({matchSelectView:null});
   }

   confirmCallBack(){
    
    this.setState({matchSelectView:null});
     
     this.setState({all:true,noFinish:false,finish:false,headerViewLineleft:0});


     var currentMatchObject  =  matchLiveObject.matchMap[currentDateID];
     var newMatchIds = new Array();

    var nameidMap = currentMatchObject.nameidMap;
    var matchNameObjects = currentMatchObject.matchNameObjects;
    matchNameObjects.forEach(function(matchObject) {

      if(matchObject.selectState){
      var matchids = nameidMap[matchObject.leagueName];
          

          matchids.forEach(function(element) {
            newMatchIds.push(element);
          }, this);
      }


    }, this);

     this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newMatchIds)});

   }


  switchDate(newDate){
    
    
    if(currentDateID == newDate) {
      
      return;
    }
    //先将上一次的选择还原---
   var currentMatchObject  =  matchLiveObject.matchMap[currentDateID];
   var nameidMap = currentMatchObject.nameidMap;
    var matchNameObjects = currentMatchObject.matchNameObjects;
    matchNameObjects.forEach(function(matchObject) {

      if(!matchObject.selectState) matchObject.selectState = !matchObject.selectState;


    }, this);

    
   this.state[currentDateID]  = false;
      
   currentDateID =  newDate;
   
   this.state[currentDateID]  = true;
    
   console.log(this.state);
  
   
var currentMatchObject  =  matchLiveObject.matchMap[currentDateID];
var that = this;

var matchSelectWidth = 84;
    var dateViewWidth = Dimensions.get('window').width - matchSelectWidth;
var count = matchLiveObject.dateArray.length;
        var width = dateViewWidth / count;
this.setState({
          dateSelect: null});

         var index = 0; 
         this.setState({all:true,noFinish:false,finish:false,headerViewLineleft:0});

    this.setState({
          dataSource: this.state.dataSource.cloneWithRows(currentMatchObject.matchIds),
          dateSelect: matchLiveObject.dateArray.map(
            function (date) {
              left = index*width; 
             
             index++;
              var dateName = date.split('_')[1];
              switch (dateName) {
                case '1':
                  dateName = '周一';
                  break;
                case '2':
                  dateName = '周二';
                  break;
                case '3':
                  dateName = '周三';
                  break;
                case '4':
                  dateName = '周四';
                  break;
                case '5':
                  dateName = '周五';
                  break;
                case '6':
                  dateName = '周六';
                  break;
                case '7':
                  dateName = '周日';
                  break;

                default:
                  break;
              }

var currentDate = new Date();
        var month = currentDate.getMonth() + 1;

        if (month < 10) {

          month = '0' + month;

        }

        currentDate = currentDate.getFullYear() + month + currentDate.getDate()
              if (currentDate == date.split('_')[0]) {

                dateName = '今天';

              }
              var gameTime = date.substring(0, 4) + '.' + date.substring(4, 6) + '.' + date.substring(6, 8);
              
              return (
                <TouchableOpacity  style = {{ width: width}}
                  key={date}
                  onPress = {() => { that.switchDate(date)}}>
                  <Text style = {[styles.topDateSubView, { color: that.state[date]  ?'#FD5453':'#333333'}]}>{dateName}</Text>
                  <Text style = {[styles.topDateSubView, { color: that.state[date] ?'#FD5453':'#333333' }]} >{gameTime}</Text>
                </TouchableOpacity>);
            }


          ),
        });    

  }

  //-----点击赛事筛选按钮----
  onPressMatchSelect() {

    var currentMatchObject  =  matchLiveObject.matchMap[currentDateID];
   
   var that = this;
    
   // this.state.matchSelectView =   ;
    var array  = new Array();
      array.push(currentMatchObject);
    
      this.setState({
          matchSelectView: array.map(
            function (param) {
              
              return (
                <LeagueName key = 'leaguename' dataSource = {param} cancleCallBack = {that.cancleCallBack} confirmCallBack = {that.confirmCallBack}> </LeagueName>
                );
            }


          ),
        });
       
  }

  render() {

  
    // var count = matchLiveObject.dateArray.length;
    var matchSelectWidth = 84;
    var dateViewWidth = Dimensions.get('window').width - matchSelectWidth;
    var listHeight = Dimensions.get('window').height - 64-50-33;
    var lineWidth = Dimensions.get('window').width / 3;
    return (
      <View style={styles.container}>

        <View>
          <View style={styles.navigator}>
            <Text style={styles.title}>
              赛事直播
            </Text>
          </View>

          <View style={styles.topSelectedDate}>
            <View style={styles.topDate}>

              <View style={[styles.matchDate, { width: dateViewWidth }]}>


                {this.state.dateSelect}

              </View>


              <View style={[styles.matchSelect, { width: matchSelectWidth, }]}>
                <Text style={styles.matchSelectName}
                  onPress={this.onPressMatchSelect}>
                  赛事筛选
                </Text>
              </View>

            </View>
            <View style={styles.headerBottomLine}>
            </View>
          </View>
          <View style = {styles.sectionHeaderItem}>
        
        <View style={styles.headerButtonView} >

          <Text style={[styles.matchStateButton, { color: this.state.all?'#FD5453':'#333333', width: lineWidth }]}
                onPress = {this.selectAllMatchs}>
            全部
          </Text>
          <Text style={[styles.matchStateButton, {color: this.state.noFinish?'#FD5453':'#333333', width: lineWidth }]}
          onPress = {this.selectNoFinishMatchs}>
            未结束
          </Text>
          <Text style={[styles.matchStateButton, { color: this.state.finish?'#FD5453':'#333333',width: lineWidth }]}
          onPress = {this.selectFinishMatchs}>
            已结束
          </Text>

        </View>
        <View style={styles.headerBottomLine} >
          <View style={[styles.headerBottomLine1, {left:this.state.headerViewLineleft, width: lineWidth }]} ></View>
        </View>
      </View>

          <ListView
            dataSource={this.state.dataSource}
            
            renderRow={this.renderItem}
            style = {[styles.list,{height:listHeight}]}
            enableEmptySections = {true}
            >
               
            </ListView>
        </View>
        {this.state.matchSelectView}
      </View>
    );
  }

  

  renderItem(rowData, sectionID, rowID, highlightRow) {

   
    var currentObject = matchLiveObject.matchMap[currentDateID];

     
    var match = currentObject.idObjectMap[rowData];

    var dateName = currentDateID.split('_')[1];
    switch (dateName) {
      case '1':
        dateName = '周一';
        break;
      case '2':
        dateName = '周二';
        break;
      case '3':
        dateName = '周三';
        break;
      case '4':
        dateName = '周四';
        break;
      case '5':
        dateName = '周五';
        break;
      case '6':
        dateName = '周六';
        break;
      case '7':
        dateName = '周日';
        break;

      default:
        break;
    }

    var dateTitle = dateName + ' ' + rowData;

    var gameTime = match.gameTime.substring(4, 6) + '-' + match.gameTime.substring(6, 8) + ' ' + match.gameTime.substring(8, 10) + ':' + match.gameTime.substring(10, 12);
    var hostMatchName = match.teamInfo.split(':')[0];
    var visitMatchName = match.teamInfo.split(':')[1];

    //比赛状态, 0未开赛，1进行中 2中场休息 3已结束 4比赛推迟 5比赛取消 6赛事暂停"
    var content = '';
    var colorStr = '';
    var borderColorStr = '';
    var borderFlag = '0';
    var fontColor = '#ffffff';
    var matchState = match.status;
    switch (matchState) {
      case '0':
        {

          content = '即将于:' + gameTime + '开赛';
          colorStr = '#FFFFFF';
          borderColorStr = '#F1F1F1';
          borderFlag = '1';
          fontColor = '#333333';



        }
        break;

      case '1':
        {
          content = '进行中' + '(' + match.score + ')';
          colorStr = '#62BA29';
        }
        break;

      case '2':
        {
          content = '中场休息' + '(' + match.halfScore + ')';
          colorStr = '#45A3E6';
        }
        break;

      case '3':
        {
          content = '已结束' + '(' + match.score + ')';
          colorStr = '#F5A623';
        }
        break;
      case '4':
        {
          content = '比赛推迟';
          colorStr = '#FD5453';
        }
        break;
      case '5':
        {
          content = '比赛取消';
          colorStr = '#FD5453';
        }
        break;
      case '6':
        {
          content = '赛事暂停';
          colorStr = '#FD5453';
        }
        break;

      default:
        break;
    }

    var leagueColor = match.leagueColor;
    if (leagueColor.length == 0) {

      leagueColor = '#333333';

    }
    return (
      //--整体布局左右固定，中间动态------
      <View style = {styles.rowContainer}>

        <View style = {styles.rowContentContainer} >

          <View style = {styles.rowLeft} >

            <Text style = {styles.dateTitle}>{dateTitle}</Text>
            <Text style = {[styles.matchName, { color: leagueColor }]}>{match.leagueName}</Text>

          </View>

          <View style = {styles.rowMiddle} >

            <View style = {styles.rowMiddleTop}>

              <Text style = {styles.hostMatchName} >{hostMatchName}</Text>
              <Text style = {styles.vs}>vs</Text>
              <Text style = {styles.visitMatchName}>{visitMatchName}</Text>

            </View>
            <View style = {styles.rowMiddleBottom}>
              <Text style = {[styles.content, { backgroundColor: colorStr, color: fontColor }, borderFlag == '1' ? { borderColor: borderColorStr, borderWidth: 1 } : null]}>{content}</Text>
            </View>

          </View>

          <View style = {styles.rowRight} >

          </View>

        </View>

        <View style={styles.separator} ></View>

      </View>
    );

  }

componentWillReceiveProps(){

  console.log('2132');
}
  //用了render方法后，组件加载成功并被成功渲染出来以后所执行的hook函数，一般会将网络请求等加载数据的操作，放在这个函数里进行，来保证不会出现UI上的错误



 sortNumber(a,b){
    return a - b;
}
  componentDidMount() {


   
    var that = this;
    NetWorkUtil.postFrom(
      Global.JJC_1103,
      '{"date":"","queryType":""}',
      function (param) {
        //-----拿到数据之后进行解析------
 
        var vsInfos = JSON.parse(param).vsInfos;
        console.log(vsInfos);
        matchLiveObject = MatchLiveObject();
        var matchMap = matchLiveObject.matchMap;


        for (var i = 0; i < vsInfos.length; i++) {

          var object = vsInfos[i];
          var macthObject = MatchObject();

          macthObject.id = object.id;
          macthObject.leagueName = object.leagueName;
          macthObject.gameTime = object.gameTime;
          macthObject.teamInfo = object.teamInfo;
          macthObject.handicap = object.handicap;
          macthObject.status = object.status;
          macthObject.score = object.score;
          macthObject.halfScore = object.halfScore;
          macthObject.minute = object.minute;
          macthObject.leagueColor = object.leagueColor;

          var date = object.id.split('_')[0] + '_' + object.id.split('_')[1];
          if (matchLiveObject.dateArray.indexOf(date) == -1) {

            matchLiveObject.dateArray.push(date);
          }
          if (!matchMap[date]) {

            var tmpMatchMap = new Object();
            matchMap[date] = tmpMatchMap;

            var matchNames = new Array();
            matchNames.push(macthObject.leagueName);
            tmpMatchMap['matchNames'] = matchNames;

            var matchNameObjects = new Array();
            var matchNameObject = new Object();
             matchNameObject.leagueName  =  macthObject.leagueName;
             matchNameObject.selectState = true;
            matchNameObjects.push(matchNameObject);
           tmpMatchMap['matchNameObjects'] = matchNameObjects;


            var matchIds = new Array();
            matchIds.push(macthObject.id.split('_')[2]);
            tmpMatchMap['matchIds'] = matchIds;


            var idObjectMap = new Object();
            idObjectMap[macthObject.id.split('_')[2]] = macthObject;
            tmpMatchMap['idObjectMap'] = idObjectMap;

            var nameidMap = new Object();
            var ids = new Array();
            ids.push(macthObject.id.split('_')[2]);
            nameidMap[macthObject.leagueName] = ids;
            tmpMatchMap['nameidMap'] = nameidMap;

          } else {

            var tmpMatchMap = matchMap[date];
            var matchNames = tmpMatchMap['matchNames'];
            
            if (matchNames.indexOf(macthObject.leagueName) == -1) {
              matchNames.push(macthObject.leagueName);
              
              var matchNameObjects  =  tmpMatchMap['matchNameObjects'];
              var matchNameObject = new Object();
                  matchNameObject.leagueName  =  macthObject.leagueName;
                  matchNameObject.selectState = true;
                  matchNameObjects.push(matchNameObject);
            }

            var matchIds = tmpMatchMap['matchIds'];;
            matchIds.push(macthObject.id.split('_')[2]);
            tmpMatchMap['matchIds'] = matchIds;


            var idObjectMap = tmpMatchMap['idObjectMap'];
            idObjectMap[macthObject.id.split('_')[2]] = macthObject;


            var nameidMap = tmpMatchMap['nameidMap'];
            var ids = nameidMap[macthObject.leagueName];
            if (!ids) {
              ids = new Array();
            }
            ids.push(macthObject.id.split('_')[2]);
            nameidMap[macthObject.leagueName] = ids;
          }
        }

    

       
        var reverseDates = matchLiveObject.dateArray;
        var currentDate = matchLiveObject.dateArray[0];
        

         reverseDates.forEach(function(element) {
           var currentObject = matchLiveObject.matchMap[element];
           currentObject.matchIds.sort(this.sortNumber);
         }, this);

        currentDateID =  currentDate;
        newDate =  currentDate;
        var currentObject = matchLiveObject.matchMap[currentDate];

        var matchSelectWidth = 84;
        var dateViewWidth = Dimensions.get('window').width - matchSelectWidth;
        var count = matchLiveObject.dateArray.length;
        var width = dateViewWidth / count;

        var currentDate = new Date();
        var month = currentDate.getMonth() + 1;

        if (month < 10) {

          month = '0' + month;

        }

        currentDate = currentDate.getFullYear() + month + currentDate.getDate()

        var index = 0;

     

      var left = width;
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(currentObject.matchIds),
          dateSelect: reverseDates.map(
            function (date) {
              left = index*width; 
              if(index == 0){
              
              that.state[date] =true;

              }else{

              that.state[date] =false;
            
              }
             
             
              var dateName = date.split('_')[1];
              switch (dateName) {
                case '1':
                  dateName = '周一';
                  break;
                case '2':
                  dateName = '周二';
                  break;
                case '3':
                  dateName = '周三';
                  break;
                case '4':
                  dateName = '周四';
                  break;
                case '5':
                  dateName = '周五';
                  break;
                case '6':
                  dateName = '周六';
                  break;
                case '7':
                  dateName = '周日';
                  break;

                default:
                  break;
              }

             index++;

              if (currentDate == date.split('_')[0]) {

                dateName = '今天';

              }
              var gameTime = date.substring(0, 4) + '.' + date.substring(4, 6) + '.' + date.substring(6, 8);
              
              return (
                <TouchableOpacity  style = {{ width: width}}
                  key={date}
                  onPress = {() => { that.switchDate(date)}}>
                  <Text style = {[styles.topDateSubView, { color: that.state[date]  ?'#FD5453':'#333333'}]}>{dateName}</Text>
                  <Text style = {[styles.topDateSubView, { color: that.state[date] ?'#FD5453':'#333333' }]} >{gameTime}</Text>
                </TouchableOpacity>);
            }


          ),
        });
      });

  }

}

const styles = StyleSheet.create({
  navigator: {
    marginTop: 0,
    height: 64,
    alignItems: 'center',
    backgroundColor: '#FE5353',

  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {

    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    margin: 33,
  },




  topSelectedDate: {
    height: 50,

  },

  topDate: {
    height: 47,
    flexDirection: 'row',
  },
  topDateSubView: {
    fontSize: 15,
    height: 17,
    textAlign: 'center',
    color: '#333333',
    lineHeight: 17,
    marginTop: 4,
  },

  matchSelect: {
    height: 47,
    borderLeftWidth: 3,
    borderLeftColor: '#F1F1F1',
  },

  matchDate: {
    height: 47,
    flexDirection: 'row',
  },

  matchSelectName: {
    textAlign: 'center',
    marginTop: 5,
    color: '#333333',
    fontSize: 15,
    lineHeight: 21,
    height: 21,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  list: {
    marginTop: 0,
    flexWrap: 'wrap'
  },

  rowContainer: {
    height: 75,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },

  rowContentContainer: {

    height: 74,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },

  separator: {
    marginLeft: 10,
    marginRight: 10,
    height: 1,
    backgroundColor: '#F1F1F1',
  },

  rowLeft: {
    marginTop: 13.5,
    flexDirection: 'column',
    width: 70,
    height: 50,
  },


  dateTitle: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 17,
    color: '#5C5C5C',
    height: 25,
  },

  matchName: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 17,
    color: '#5C5C5C',
    height: 25,

  },



  rowMiddle: {
    flex: 1,
    flexDirection: 'column',
  },

  rowMiddleTop: {
    marginTop: 10,
    height: 25,
    flexDirection: 'row',
  },

  hostMatchName: {

    textAlign: 'left',
    fontSize: 15,
    lineHeight: 17,
    color: '#333333',
    height: 17,
  },

  vs: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 17,
    color: '#FD5453',
    height: 17,

  },
  visitMatchName: {
    textAlign: 'right',
    marginRight: 0,
    fontSize: 15,
    lineHeight: 17,
    color: '#333333',
    height: 17,
  },

  rowMiddleBottom: {

    marginBottom: 10,

    height: 30,
  },


  content: {
    paddingTop: 7,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 18,
    color: '#FFFFFF',
    height: 30,
  },

  rowRight: {
    width: 40,

  },

  sectionHeaderItem: {
    height: 36,
    backgroundColor: '#ffffff',
  },
  headerBottomLine: {
    height: 3,
    backgroundColor: '#F1F1F1',
  },
  headerBottomLine1: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#FD5453',
  },

  headerButtonView: {
    height: 33,
    flexDirection: 'row',
  },
  matchStateButton: {
    color: '#333333',
    height: 30,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 7,

  }

});

module.exports = MainView;
