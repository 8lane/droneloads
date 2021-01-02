const nconf = require('nconf');
const { Storage } = require('@google-cloud/storage');

nconf.argv().env()

nconf.file({ file: `./config/env/${nconf.get('NODE_ENV')}.json` })

const env = nconf.get()

export default async (req, res) => {
  if (!req.query.file) {
    return res.status(400).end('Missing file name')
  }

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
    const saveAsFileName = `droneloads-${req.query.file.replace('videos/', '')}.mp4`
    const options = {
      version: 'v2', // defaults to 'v2' if missing.
      action: 'read',
      promptSaveAs: saveAsFileName,
      responseDisposition: `attachment; filename*=utf-8\'\'${saveAsFileName}`,
      expires: Date.now() + 1000 * 60 * 60, // one hour
    };

    const [url] = await storage.bucket(env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME).file(req.query.file).getSignedUrl(options);

    return res.status(200).json({ url })
  } catch (error) {
    console.error(error)
    return res.status(500).end('Nope :(')
  }
}
