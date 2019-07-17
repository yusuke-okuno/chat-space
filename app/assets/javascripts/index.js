$(document).on('turbolinks:load', function(){
// $(function() {
  function buildHTML(user){
    var html = `<div class = "chat-group-user clearfix">
                  <p class = "chat-group-user__name">${user.name}</p>
                  <div class = "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`

    return html;
  }
  
  function addHTML(userName,userId){
    var html = `<div class ='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name ='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class ='chat-group-user__name'>${userName}</p>
                  <div class ='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`

    return html;
  }

  $('#user-search-field').on("input", function() {
    var input = $('#user-search-field').val();
    if (input == ""){
      $("#user-search-result").empty();
      return false
    }
    $("#user-search-result").empty();


    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(data){
      data.forEach(function(onedata){
        var html = buildHTML(onedata);
        $('#user-search-result').append(html);
        return false
      }) 
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })

  });

    $("#user-search-result").on('click', ".user-search-add",function() { 
      var userName = $(this).data('user-name');
      var userId = $(this).data('user-id');
      var html = addHTML(userName,userId)
      $("#chat-group-users").append(html);
      $(this).parent().remove();
    })

    $("#chat-group-users").on('click', ".user-search-remove",function() { 
      $(this).parent().remove();
  });

});