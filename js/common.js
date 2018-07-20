$(document).ready(function(){
  
    $("input:not(.allow_submit)").on("keypress", function(event){
      return event.which !== 13;
    });
    $('#searchTxt').keypress( function ( e ) {
    	if ( e.which == 13 ) {
		    searchList();
	    }
    });    

    $(".modal").modal();
    $('.collapsible').collapsible();
    $(".button-collapse").sideNav();
    
    $('table tr').click(function() {
      //alert($(this).attr("titleVal"));
      location.href = "/info?id=" + $(this).attr("titleVal");
    });

});
    
$('#titleok').click(function(){
    alert("abc");
});

var searchList = function() {
    $.ajax({
    type: 'GET',
    url: '/search',
    timeout: 10000,
    cache: false,
    data: {
      'searchTxt': $('#searchTxt').val(),
    },
    dataType: 'json',
    beforeSend: function(jqXHR) {
      // falseを返すと処理を中断
      return true;
    }//,
  }).done(function(response, textStatus, jqXHR) {
    $('tr[titleVal]').remove();
    if (response.Comment != null) {
      var obj = response.Comment;
      for (var i=0; i<obj.length; i++) {
        //console.log(obj[i].Comment);
        $('#dataList').append('<tr titleVal="'+ obj[i].TitleId + '"><td colspan=3>' + obj[i].Comment + '</td></tr>');
      }
      
      $('table tr').click(function() {
        location.href = "/info?id=" + $(this).attr("titleVal");
      });

      // もっと見る
      //$('.collection').append('<a href="javascript:commentList();" class="collection-item" id="more">もっと見る</a>');
      
    }

  }).fail(function(jqXHR, textStatus, errorThrown ) {
    // 失敗時処理
  }).always(function(data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {
    // doneまたはfail実行後の共通処理
  });
}
var commentList = function() {
    $.ajax({
    type: 'GET',
    url: '/commentList',
    timeout: 10000,
    cache: false,
    data: {
      'cursorkey': $('#cursorkey').val(),
      'foo': 'データ'
    },
    //data: $("form").serialize(),
    dataType: 'json',
    beforeSend: function(jqXHR) {
      // falseを返すと処理を中断
      return true;
    }//,
  }).done(function(response, textStatus, jqXHR) {
    $('#more').remove();
    console.log(response.CursorKey);
    $('#cursorkey').val(response.CursorKey);
    console.log($('#cursorkey').val());
    
    if (response.Comment != null) {
      var obj = response.Comment;
      for (var i=0; i<obj.length; i++) {
        //console.log(obj[i].Comment);
        $('.collection').append('<a href="#!" class="collection-item"><span class="badge">' + obj[i].Update +'</span><div class="chip">' + obj[i].User + '</div>' + obj[i].Comment +'</a>');
      }
      // もっと見る
      $('.collection').append('<a href="javascript:commentList();" class="collection-item" id="more">もっと見る</a>');
      
    }

  }).fail(function(jqXHR, textStatus, errorThrown ) {
    // 失敗時処理
  }).always(function(data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {
    // doneまたはfail実行後の共通処理
  });
}

var sendComment = function() {
  // exsits bug
  /*var lang = '';
  var match = location.search.match(/(&|\?)id=(.*?)(&|$)/);
  if(match) {
    lang = decodeURIComponent(match[2]);
  }*/
  //alert(lang);
    $.ajax({
    type: 'GET',
    url: '/comment',
    timeout: 10000,
    cache: false,
    // サーバに送信するデータ(name: value)
    /*data: {
      'param1': 'ほげ',
      'foo': 'データ'
    },*/
    data: $("form").serialize(),
    dataType: 'json',
    // Ajax通信前処理
    beforeSend: function(jqXHR) {
      // falseを返すと処理を中断
      return true;
    }//,
    // コールバックにthisで参照させる要素(DOMなど)
    //context: domobject
  }).done(function(response, textStatus, jqXHR) {
    // 成功時処理
    Materialize.toast('done', 3000, 'rounded');
    $("#comment").val("");
  }).fail(function(jqXHR, textStatus, errorThrown ) {
    // 失敗時処理
  }).always(function(data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {
    // doneまたはfail実行後の共通処理
  });
}

var titleCreate = function(){
    appendProgress();
    
    $.ajax({
    // リクエストメソッド(GET,POST,PUT,DELETEなど)
    type: 'GET',
    // リクエストURL
    url: '/titleCreate',
    // タイムアウト(ミリ秒)
    timeout: 10000,
    // キャッシュするかどうか
    cache: false,
    // サーバに送信するデータ(name: value)
    /*data: {
      'param1': 'ほげ',
      'foo': 'データ'
    },*/
    data: $("form").serialize(),
    // レスポンスを受け取る際のMIMEタイプ(html,json,jsonp,text,xml,script)
    // レスポンスが適切なContentTypeを返していれば自動判別します。
    dataType: 'json',
    // Ajax通信前処理
    beforeSend: function(jqXHR) {
      // falseを返すと処理を中断
      return true;
    }//,
    // コールバックにthisで参照させる要素(DOMなど)
    //context: domobject
  }).done(function(response, textStatus, jqXHR) {
    // 成功時処理
    //alert("ok");
    removeProgress();
    //Materialize.toast('Created', 2000, 'rounded')
    location.href = "/info?id=" + response.Id;
    
    //レスポンスデータはパースされた上でresponseに渡される
  }).fail(function(jqXHR, textStatus, errorThrown ) {
    // 失敗時処理
  }).always(function(data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {
    // doneまたはfail実行後の共通処理
  });
};

var appendProgress = function() {
    $('#status').append('<div class="progress" id="progress"><div class="indeterminate"></div></div>');
}

var removeProgress = function() {
    $('#progress').remove();
}