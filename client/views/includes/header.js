Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current().route.name === name
    });
    
    return active && 'active';
  }
});


Template.header.events({
	'click .services': function(e) {
    e.preventDefault();

    var dest = e.target.href;
    var hash = dest.split('/services/')[1]
    console.log("Click sending", hash)
    Router.go('/'+hash, {_id: hash});
	}
})