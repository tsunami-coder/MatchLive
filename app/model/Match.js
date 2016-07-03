'use strict';
import React,{ Component } from 'react';

 var MatchObject = function  (){

  var object = new Object;
   object.id = '';         //赛事编号，日期_周数_场次
   object.leagueName='';//联赛名称
   object.gameTime='';   //比赛时间
   object.teamInfo='';   //主队名称:客队名称
   object.handicap='';   //让球数，不让球为空，+1，+2，-1，-2
   object.status='';    //比赛状态, 0未开赛，1进行中 2中场休息 3已结束 4比赛推迟 5比赛取消 6赛事暂停
   object.score='';      //即时比分或终场比分
   object.halfScore='';  //半场比分
   object.minute='';      //比赛进行时长，1，20，45+，60，90

   return object;
}

module.exports  = MatchObject;
