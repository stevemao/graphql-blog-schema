import * as _ from 'underscore';

// This is the Dataset in our blog
import PostsList from './data/posts';
import AuthorsList from './data/authors';
// import {CommentList, ReplyList} from './data/comments';

import {
  // These are the basic GraphQL types
  // GraphQLInt,
  // GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // GraphQLEnumType,

  // This is used to create required fields and arguments
  GraphQLNonNull,

  // This is the class we need to create the schema
  GraphQLSchema
} from 'graphql';

/**
  DEFINE YOUR TYPES BELOW
**/

// This is the Root Query
const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: 'Root of the Blog Schema',
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
      resolve: function() {
        return PostsList
      }
    },

  })
});

const Post = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: function(post) {
        return post.title || "Does not exist";
      }
    },
    content: {type: GraphQLString},
    author: {
      type: Author,
      resolve: function(post) {
        return _.find(AuthorsList, a => a._id == post.author);
      }
    }
  })
});

const Author = new GraphQLObjectType({
  name: "Author",
  description: "This represent an author",
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLString}
  })
});

// The Schema
const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
