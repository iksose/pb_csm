Template.pbaTemplate.rendered = function(){
	var pathname = window.location.pathname
	console.log("Rendered", pathname)
	console.log("THIS", this)
}



Template.pbaTemplate.helpers({
  pbaTags: function() {
    console.log("THIS pbatag", this)
    return this[0].map(function(post, index, cursor) {
      post._rank = index;
      return post;
    });
  },
  pbaHeader: function(){
  	console.log("Really tho", this[1])
  	return this[1]
  },
  // pbaHeader: function(){
  // 	return Posts.findOne({'tags':'top'});
  // }
  ownPost: function() {
  	console.log("Own post?", this)
    return this[1].userId == Meteor.userId();
  }

});
