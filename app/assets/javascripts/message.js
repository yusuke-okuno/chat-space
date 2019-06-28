$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class = "message">
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
    console.log(formData);
    console.log(url);
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      console.log(data);
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.form__submit').removeAttr("disabled");
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
      return false
    })
    .fail(function(){
      alert('error');
    })
  })
})