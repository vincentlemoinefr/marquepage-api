const joi = require('joi');
const Joi = require('joi');

const request = joi.object({
  params: joi.string().required(),
  body: joi.string().required(),
  headers: joi.string().required()
});

const bookmark = joi.object({
  name: joi.string().required(),
  url: joi.string().required(),
  comment: joi.string().required()
});

const binder = joi.object({
  identifier: joi.string().required(),
  jwt: joi.string().required(),
  scopes: joi.array().items(bookmark).required()
});

const user = joi.object({
  name: joi.string().required(),
  bookmarks: joi.array().items(bookmark).required()
});

// https://stackoverflow.com/questions/57248745/how-to-extend-a-joi-schema


class Bookmark extends Injector {
  constructor(data) {
    super(['joi']);


  }

  validate(data) {
    return this.schema.validate(data);
  }
}


// How do I want it to work ?
// recieve req.body and req.params.id

// const bookmark = new Bookmark(req.params.id, req.body)
// const {value, error} = bookmark.validate();
// if (error)
//   console.log(error);
// else
//   bookmark

const bookmark1 = new Bookmark() {

}
// loadign each time is annoying
bookmark1.load({joi: joi})


class Test extends Joi {
  constructor(toto) {
    console.log('test', toto);
  }
}

const test1 = new Test('ezaezaeza')



const interfaceBookmarkInteractor = {
  readAllBookmark(user) {},
  readBookmark(id, user) {},
  createBookmark(id, user, bookmark) {},
  updateBookmark(id, user, bookmark) {},
  deleteBookmark(id, user) {}
}

console.log(interfaceBookmarkInteractor)

class Injector {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.operational = false;
  };

  loadDependencies() {
    // load some stuff
    checkOperational();
  };

  unloadDependencies() {
    // unload some stuff
    checkOperational();
  };

  checkOperational() {
    // Check this against dependencies
    if (this.dependencies === 'ok') {
      this.operational = true;
      return true;
    } else {
      this.operational = false;
      return false;
    };
  };
};

// This implement interfaceBookmarkInteractor (not available in normal javascript)
class BookmarkInteractor extends Injector {
  constructor(dependencies) {
    super();
  }
  readAllBookmark(user) {
    console.log('Not implemented yet');
  };
  readBookmark(id, user) {
    console.log('Not implemented yet');

  };
  createBookmark(id, user, bookmark) {
    console.log('Not implemented yet');

  };
  updateBookmark(id, user, bookmark) {
    console.log('Not implemented yet');

  };
  deleteBookmark(id, user) {
    console.log('Not implemented yet');
  };
}