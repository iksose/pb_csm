Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentPostId = this._id;

    var tagString = $(e.target).find('[name=tags]').val()
    var tagArray = tagString.split(',');
    $.each(tagArray, function(a,b){tagArray[a] = $.trim(b)})
    
    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val(),
      tags: tagArray,
      subtitle: $(e.target).find('[name=subtitle]').val()
    }

    console.log(postProperties, currentPostId)
    
    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      // Router.go('postsList');
      Router.go('/')
    }
  }
});

Template.postEdit.helpers({
    fillMsg: function() {
    console.log("THIS USERID", this.userID, "Also", this.message)
    return this.message;
  },
})
