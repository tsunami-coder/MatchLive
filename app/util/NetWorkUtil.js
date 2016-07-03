'use strict';
import React, {
    Component
} from 'react';
class NetWorkUtil extends Component {
    //----发送post请求------

    /*-----form表单提交-------*/
    static postFrom(url, data, callback) {

        var param = 'msg={"key_id":1,"body":' + data + '}';
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json,text/html',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'msg={"key_id":1,"body":{"date":"","queryType":""}}'
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
               
                responseText = JSON.parse(responseText);
                var result_code = responseText.result_code;
                var result_desc = responseText.result_desc;

                if (result_code == '0') {
                    if (callback) {

                        callback(responseText.body);
                    }

                }

            }).done();
    }

    /*-----json提交-------*/
    static postJson(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //json形式
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
            }).done();
    }

    //----发送get请求------

    static get(url, callback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
            }).done();
    }

    log(obj) {
        var description = "";
        for (var i in obj) {
            var property = obj[i];
            description += i + " = " + property + "\n";
        }
        alert(description);
    }

}

module.exports = NetWorkUtil;
