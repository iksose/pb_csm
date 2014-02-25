Template.pbaTemplate.rendered = function(){
	var pathname = window.location.pathname
	console.log("Rendered", pathname)
	console.log("THIS", this)
}



Template.pbaTemplate.helpers({
  pbaTags: function() {
    console.log("THIS", this)
    return this.map(function(post, index, cursor) {
      post._rank = index;
      console.log(post, index, cursor)
      return post;
    });
  }
});
