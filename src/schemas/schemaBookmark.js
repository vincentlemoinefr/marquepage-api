export default function schemaBookmark(joi, schemaId) {
  return joi.object({
    bookmark_id : schemaId,           // Opitonal will be generated
    bookmark_name: joi,               // Required
    bookmark_url: joi,                // Required
    bookmark_description: joi,        // Required
    bookmark_etag : joi,
    bookmark_time_created : joi,      // Will be generated
    bookmark_last_updated : joi,      // Will be generated
    bookmark_last_accessed : joi,     // Will be generated
    bookmark_deleted : joi.boolean(), // On user action
    bookmark_time_deleted : joi,      // Will be generated On user action
    bookmark_folder: joi,
    bookmark_tags: joi
  });
};