import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

class Bucket {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)

    this.bucket = new Storage(this.client);
    if (!this.bucket) {
      console.log("Appwrite:: Bucket:: error:: Storage is Not created!");
    }
  }

  async uploadFile(file) {
    try {
      const uploadData = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
      if (!uploadData) return false;
      return uploadData;
    } catch (error) {
      console.log("Appwrite:: Bucket:: UploadFile:: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      const deleteData = await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      if (!deleteData) return false;
      return true;
    } catch (error) {
      console.log("Appwrite:: Bucket:: DeleteFile:: error", error);
      return false;
    }
  }


  async getFilePreview(fileId) {
    try {
      const getPreview = await this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      )
      if (!getPreview) return false;
      return getPreview;
    } catch (error) {
      console.log("Appwrite:: Bucket:: getFilePreview:: error", error);
      return false;
    }
  }


}

const bucketService = new Bucket();

export default bucketService;