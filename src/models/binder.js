'use strict';
const binder = {
    binderUuid : '',         // Mongo will handle that
    schema_version : '',           // we need this for concurrency
    time_created : '',       // When was it created
    last_updated : '',      // When was it updated last
    last_accessed : '',      // When was it accessed last
    bookmarks_total : 5000,  // Number of bookmarks in that binder
    bookmarks : []           // Bookmarks array
}