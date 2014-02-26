Template.pbaTemplate.rendered = function(){
	var pathname = window.location.pathname
	console.log("Rendered", pathname)
	console.log("THIS", this)
}



Template.pbaTemplate.helpers({
  pbaTags: function() {
    return this.posts.map(function(post, index, cursor) {
      post._rank = index;
      return post;
    });
  },
  // pbaHeader: function(){
  // 	console.log("Really tho, from pba", this[1])
  // 	return this[1]
  // },
            // pbaHeader: function(){
            // 	return Posts.findOne({'tags':'top'});
            // }
  ownPost: function() {
    console.log("pba temp", this)
    return this.topPost.userId == Meteor.userId();
  },

  pbaTags: function(){
    console.log("this pba tag", this)
  }

});
