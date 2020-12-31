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
  const [files] = await storage.bucket(bucketName).getFiles();

  files.forEach(file => {
    console.log(file.name);
  });
}

export default (req, res) => {

  listFiles().catch(console.error);

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ name: 'John Doe' }))

}
