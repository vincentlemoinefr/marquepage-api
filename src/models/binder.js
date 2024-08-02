'use strict';
const binder = {
    binderUuid : '',         // Mongo will handle that
    version : '',           // we need this for concurrency
    time_created : '',       // When was it created
    last_updated : '',      // When was it accessed last
    last_accessed : '',      // When was it accessed last
    bookmarks_totla : 5000,  // Number of bookmarks in that binder
    bookmarks : []           // Bookmarks array
}