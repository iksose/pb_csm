Template.postsList.helpers({
  postsWithRank: function() {
    return this.posts.map(function(post, index, cursor) {
      post._rank = index;
      console.log(post)
      return post;
    });
  },

  //each post returns no body message. Does not effect original array.
  postsNoDetails: function(){
  	console.log("MAP ACCESS", this, "also", this.userId)
  	return this.posts.map(function(post, index, cursor) {
      post.message = "";
      console.log(post, index, cursor)
      return post;
    });
  }
});
