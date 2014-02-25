Template.tags.helpers({
  tagHelper: function() {
    console.log("THIS", this)
    return this.map(function(post, index, cursor) {
      post._rank = index;
      console.log(post, index, cursor)
      return post;
    });
  }
});
