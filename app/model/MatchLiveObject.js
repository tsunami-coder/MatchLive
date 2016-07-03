'use strict';

import React,{ Component } from 'react';

var MatchLiveObject =  function  (){

   var object = new Object;
   object.dateArray = new Array();//存放有序日期的数组
   object.matchMap=  new Object();//存放日期对应的赛事信息
   return object;
}

var MatchMap = function (){

  var object = new Object;
  object.matchNameArray = new Array(),//存放当前日期下所有的联赛名称数组（筛选数据源按照顺序筛选）
  object.matchNameMap = new Object(),//存放联赛名称对应的赛事id数组
  object.matchObject = new Object()//存放联赛id对应的赛事对象
  return object;
}

module.exports  = MatchLiveObject;
