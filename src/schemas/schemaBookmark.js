export default function prepareSchemaBookmark(joi) {
  return joi.object({
    bookmark_id : joi.string(),           // Opitonal will be generated
    bookmark_name: joi.string(),               // Required
    bookmark_url: joi.string(),                // Required
    bookmark_description: joi.string(),        // Required
    bookmark_etag : joi.string(),
    bookmark_time_created : joi.string(),      // Will be generated
    bookmark_last_updated : joi.string(),      // Will be generated
    bookmark_last_accessed : joi.string(),     // Will be generated
    bookmark_deleted : joi.boolean(), // On user action
    bookmark_time_deleted : joi.string(),      // Will be generated On user action
    bookmark_folder: joi.string(),
    bookmark_tags: joi.string()
  });
};