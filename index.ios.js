/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import NetWorkUtil from './app/util/NetWorkUtil';
import Global      from './app/util/Global';
import MatchLiveObject from './app/model/MatchLiveObject';
import MatchObject from './app/model/Match';

var _navigator;
var MainView = require('./main');

class BookSearch extends Component {
  // ----组件将要被加载方法-----

  componentWillMount(){}

  //设置navigator跳转方式
  configureScence(){

  /*
    Navigator.SceneConfigs.PushFromRight (default)
    Navigator.SceneConfigs.FloatFromRight
    Navigator.SceneConfigs.FloatFromLeft
    Navigator.SceneConfigs.FloatFromBottom
    Navigator.SceneConfigs.FloatFromBottomAndroid
    Navigator.SceneConfigs.FadeAndroid
    Navigator.SceneConfigs.HorizontalSwipeJump
    Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
    Navigator.SceneConfigs.VerticalUpSwipeJump
    Navigator.SceneConfigs.VerticalDownSwipeJump
*/
    return Navigator.SceneConfigs.PushFromRight;
  }

//-----设置navigator的操作逻辑----
renderScene(route,navigator){

  return (
    <MainView navigator={navigator} route={route}/>
  );
}
  render() {
    
    return (
      <Navigator
        initialRoute={{title: 'main', id: 'main'}}
        configureScence = {this.configureScence}
        renderScene={this.renderScene}
      />
    );
  }


  //用了render方法后，组件加载成功并被成功渲染出来以后所执行的hook函数，一般会将网络请求等加载数据的操作，放在这个函数里进行，来保证不会出现UI上的错误
  componentDidMount(){
  }
  //指父元素对组件的props或state进行了修改
  componentWillReceiveProps(){}
  //一般用于优化，可以返回false或true来控制是否进行渲染
  shouldComponentUpdate(){}
 //组件刷新前调用，类似componentWillMount
  componentWillUpdate(){}
  //更新后的hook
 componentDidUpdate(){}
  //销毁期，用于清理一些无用的内容，如：点击事件Listener
 componentWillUnmount(){}


}

AppRegistry.registerComponent('BookSearch', () => BookSearch);
