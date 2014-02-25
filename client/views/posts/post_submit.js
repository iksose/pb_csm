Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var tagString = $(e.target).find('[name=tags]').val()
    var tagArray = tagString.split(',');
    $.each(tagArray, function(a,b){tagArray[a] = $.trim(b)})
    
    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val(),
      tags: tagArray
    }
    
    Meteor.call('post', post, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        if (error.error === 302)
          Router.go('postPage', {_id: error.details})
      } else {
        Router.go('postPage', {_id: id});
      }
    });
  }
});