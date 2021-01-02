const nconf = require('nconf');
const { Storage } = require('@google-cloud/storage');

nconf.argv().env()

nconf.file({ file: `./config/env/${nconf.get('NODE_ENV')}.json` })

const env = nconf.get()

export const getVideos = async () => {
  const storage = new Storage({
    credentials: {
      project_id: env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
      private_key_id: env.GOOGLE_CLOUD_STORAGE_PRIVATE_KEY_ID,
      private_key: env.GOOGLE_CLOUD_STORAGE_PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n"),
      client_email: env.GOOGLE_CLOUD_STORAGE_EMAIL,
      client_id: env.GOOGLE_CLOUD_STORAGE_ID,
    }
  });

  try {
    const [files] = await storage.bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME).getFiles({
      directory: 'videos/'
    });

    const output = files.map((file) => {
      return {
        id: file.id,
        fileName: file.name,
        name: file.metadata.metadata?.name ?? '',
        contentType: file.metadata.contentType,
        size: file.metadata.size,
        timeCreated: file.metadata.customTime ?? file.metadata.timeCreated,
        updated: file.metadata.updated,
        location: file.metadata.metadata?.location ?? 'Unknown'
      }
    }).filter((file => file.contentType.includes('video')))

    return output
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default async (req, res) => {
  res.status(200).json({})
}
