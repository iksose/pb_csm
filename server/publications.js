Meteor.publish('posts', function(options) {
		console.log("Jon added to admin")
  return Posts.find();
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});


Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

var callback = function(obj){
	console.log("Connection", obj.id)
}

Meteor.onConnection(callback)

 // Accounts.validateNewUser(function (user) {
 //    var loggedInUser = Meteor.user();

 //    if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
 //      return true;
 //    }

 //    throw new Meteor.Error(403, "Only Jon can create new users");
 //  });


// Authorized users can view secrets
// Meteor.publish("secrets", function () {
//   var user = Meteor.users.findOne({_id:this.userId});

//   if (Roles.userIsInRole(user, ["admin","view-secrets"])) {
//     console.log('publishing secrets', this.userId)
//     return Posts.find();
//   }

//   this.stop();
//   return;
// });

Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})



Meteor.methods({
    test:function(arg) {
        //should print the user details if logged in, undefined otherwise.
        var ghostObject = Meteor.user();
        if(Roles.userIsInRole(ghostObject, 'admin')){
          return "Already admin"
        }else if(Meteor.user().username == "jon"){
          Roles.addUsersToRoles(ghostObject._id, ['admin']);
          return ghostObject;
        }else{
          return "better call saul"
        }
        
    },
    test2:function(arg){
      return Roles.getAllRoles()
    }
});