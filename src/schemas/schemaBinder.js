export default function prepareSchemaBinder(joi) {
  return joi;
};

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
