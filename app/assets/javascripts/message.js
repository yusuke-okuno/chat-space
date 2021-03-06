$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class = "message" data-id = ${message.id}>
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class = upper-message__date>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class = "lower-message">
                    <p class="message--lower__text">
                      ${content}
                    </p>
                      ${image}
                  </div>
                </div>`

    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      $('.form__submit').prop("disabled",false);
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      return false
    })
    .fail(function(){
      alert('error');
      $('.form__submit').prop("disabled",false);
    })
  })

  var reloadMessages = function(){
  if (window.location.href.match(/\/groups\/\d+\/messages/)){

    var last_message_id = $('.message:last').data("id");
    if(last_message_id == undefined){
      last_message_id = 1
    }
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      messages.forEach(function(message){
       var insertHTML = '';
       insertHTML += buildHTML(message);
       $('.messages').append(insertHTML);
       $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
       return false
      })
    })

    .fail(function() {
      alert('error');
    });
    
  }
  };
  $(function(){
  setInterval(reloadMessages, 10000);
  })
})
