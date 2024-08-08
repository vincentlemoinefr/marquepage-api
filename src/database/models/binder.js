'use strict';

// Access rights : 
// Read
// Modify
// Change rights 


// Business logic :
// Get all the binders you have access to
// 
// Create a binder
// Delete a binder by id
// Update a binder by id :
//   - Name
//   - Access list
// Create a binder's folder structure (./subfolderA/subfolderB/subfolderC)
// Delete a binder's folder

// Create a bookmark
// Get a bookmark by id
// Delete a bookmark by id
// Update a bookmark by id :
//   - Name
//   - Description
//   - Url
//   - Tags
//   - Change folder


// uuid -> binder (mongo _id)
// uuid -> bookmark (mongo _id)

const joi = require('joi');
const validator_id = joi.object({
  uuid: joi
    .string().hex().length(24)
    .required()
    .description('A MongoDB _id in string format')
});



// What about users and authorizations ? ?
const user = {
  user_something : ''         // idklol
}

// Also, Etags, If-Match, If-None-Match
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag

const binder = {
  binder_uuid : '',           // Mongo will handle that
  binder_version : '',        // we need this for concurrency
  binder_time_created : '',   // When was it created
  binder_last_updated : '',   // When was it updated last
  binder_last_accessed : '',  // When was it accessed last
  binder_deleted : false,     // We want to store this state and delete at a later date
  binder_time_deleted : '',   // Time of deleting
  bookmarks_amount : 5000,    // Number of bookmarks in that binder
  bookmarks_list : [],        // Bookmarks array
  binder_folders_list : []
}

const bookmark = {
  bookmark_uuid : '',
  bookmark_verion : '',
  bookmark_time_created : '',
  bookmark_last_updated : '',
  bookmark_last_accessed : '',
  bookmark_deleted : '',
  bookmark_time_deleted : '',
  bookmark_name: '',
  bookmark_url: '',
  bookmark_description: '',
  bookmark_subfolder: '',
  bookmark_tags: ''
}