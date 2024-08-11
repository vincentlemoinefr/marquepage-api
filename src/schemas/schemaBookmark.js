class Bookmark {
  constructor(data) {
    this.data = data;
  };

  echo () {
    console.log(this.data);
  };
};

export class BookmarkBuilder {
  constructor(joi) {
    this.schema = joi
      .object({
        id: joi
          .string()
          .hex()
          .length(24)
          .required()
      });
  };

  build(data) {
    const bookmark = this.schemaBookmark.validate(data);
    if (bookmark.error) {
      console.log('error');
      return false;
    } else {
      return new Bookmark(bookmark.value);
    };
  };
};