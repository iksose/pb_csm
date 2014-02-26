Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().fetch().length === this.limit();
    return {
      posts: this.posts(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

JonsController = RouteController.extend({
  template: 'pbaTemplate'
})

JonsTags = RouteController.extend({
  template: 'tags',
  posts: function() {
    return Posts.find({tags: "jon"});
  }
})


AaronsBlog = RouteController.extend({
  template: 'blog'
})

NewPostsListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
  }
});

BestPostsListController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment})
  }
});

Router.map(function() {
  this.route('home', {
    path: '/',
    controller: NewPostsListController
  });
  
  this.route('newPosts', {
    path: '/new/:postsLimit?',
    controller: NewPostsListController
  });
  
  this.route('bestPosts', {
    path: '/best/:postsLimit?',
    controller: BestPostsListController
  });
  
  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singlePost', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() { 
      return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('tags',{
    path: '/tags/:_id',
    template: 'tags',
    waitOn: function() { 
      return Meteor.subscribe('posts', {tags: this.params._id});
    },
    data: function(){ return Posts.find({tags: this.params._id});}
    // controller: JonsTags
  });
  
  this.route('postSubmit', {
    path: '/submit',
    disableProgress: true
  });

  // this.route('ScriptCard', {
  //   path: '/ScriptCard/:id?',
  //   template: 'pbaTemplate',
  //   waitOn: function() { 
  //     return Meteor.subscribe('posts', {tags: "scriptcard"});
  //   },
  //   data: function(){
  //     return [
  //     Posts.find({tags: "scriptcard"}),
  //     Posts.findOne({ $and: [ { tags: 'top' }, { 'tags' : 'scriptcard' } ] } )
  //     ];
  //     }
  //   });


  this.route('ScriptCard', {
  path: '/ScriptCard/:id?',
  template: 'pbaTemplate',
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', {tags: "scriptcard"});
  },
  posts: function() {
    return Posts.find({tags: "scriptcard"}, {'limit':10});
  },
  data: function() {
    var hasMore = Posts.find({tags: "scriptcard"}).fetch().length === 5;
    return {
      posts: Posts.find({tags: "scriptcard"}, {'limit':5}).fetch(),
      nextPath: hasMore ? this.nextPath() : null,
      links: Posts.find({ $and: [ { tags: 'links' }, { 'tags' : 'scriptcard' } ] } ).fetch(),
      topPost: Posts.findOne({ $and: [ { tags: 'top' }, { 'tags' : 'scriptcard' } ] } )
    };
  }
});



  this.route('EnsurePay', {
    path: '/EnsurePay',
    template: 'pbaTemplate',
    waitOn: function() { 
      return Meteor.subscribe('posts', {tags: "ensurepay"});
    },
    data: function(){
    return {
      posts: Posts.find({tags: "ensurepay"}, {'limit':5}).fetch(),
      links: Posts.find({ $and: [ { tags: 'links' }, { 'tags' : 'ensurepay' } ] } ).fetch(),
      topPost: Posts.findOne({ $and: [ { tags: 'top' }, { 'tags' : 'ensurepay' } ] } )
    }
      }
    });

  this.route('TriNet', {
    path: '/TriNet',
    template: 'pbaTemplate',
    waitOn: function() { 
      return Meteor.subscribe('posts', {tags: "trinet"});
    },
    data: function(){
      return [
      Posts.find({tags: "trinet"}),
      Posts.findOne({ $and: [ { tags: 'top' }, { 'tags' : 'trinet' } ] } )
      ];
      }
    });

    this.route('Blog', {
    path: '/Blog',
    controller: AaronsBlog
  });

});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    this.stop();
  }
}

Router.before(requireLogin, {only: 'postSubmit'})
Router.before(function() { clearErrors() });
