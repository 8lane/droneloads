const { Storage } = require('@google-cloud/storage');

const storage = new Storage({ keyFilename: "key.json" });

async function listBuckets() {
  const [buckets] = await storage.getBuckets();
  console.log('Buckets:');
  buckets.forEach(bucket => {
    console.log(bucket.name);
  });
}

async function listFiles(bucketName = 'droneloads') {
  // Lists files in the bucket

  files.forEach(file => {
    console.log(file.name);
  });
}

export const list = async () => {
  const bucketName = 'droneloads'

  const storage = new Storage({ keyFilename: "key.json" });

  try {
    const [files] = await storage.bucket(bucketName).getFiles({
      directory: 'videos/'
    });

    const output = files.map((file) => {
      return {
        id: file.id,
        name: file.metadata.metadata?.name,
        contentType: file.metadata.contentType,
        size: file.metadata.size,
        mediaLink: file.metadata.mediaLink,
        timeCreated: file.metadata.timeCreated,
        updated: file.metadata.updated,
        location: file.metadata.metadata?.location ?? null
      }
    }).filter((file => file.contentType === 'video/mp4'))

    return output
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default async (req, res) => {
  const bucketName = 'droneloads'

  try {
    const [files] = await storage.bucket(bucketName).getFiles({
      directory: 'videos/'
    });

    const output = files.map((file) => {
      return {
        id: file.id,
        name: file.name,
        contentType: file.metadata.contentType,
        size: file.metadata.size,
        mediaLink: file.metadata.mediaLink,
        timeCreated: file.metadata.timeCreated,
        updated: file.metadata.updated,
        location: file.metadata.metadata?.location ?? null
      }
    }).filter((file => file.contentType === 'video/mp4'))

    res.status(200).json(output)
  } catch (error) {
    console.error(error)
  }

}
