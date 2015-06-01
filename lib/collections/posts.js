/*
    To var or not to var
    1. using var will limit the variable to the scope of this file.
    2. not using var makes the variable available to the entire app.
*/
Posts = new Mongo.Collection('posts');

Posts.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    }
});
