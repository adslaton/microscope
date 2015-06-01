/*
    To var or not to var
    1. using var will limit the variable to the scope of this file.
    2. not using var makes the variable available to the entire app.
*/
Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        /* may only edit the following two fields: */
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    postInsert: function (postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
        return {
            postExists: true,
            _id: postWithSameLink._id
        };
    }

    var user = Meteor.user(),
        post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        }),
        postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});
