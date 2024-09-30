import conf from "../conf/conf";
import { Client, Databases, Query } from 'appwrite'

class Database {
  client = new Client();
  databases;


  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)

    this.databases = new Databases(this.client)
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      )
    } catch (error) {
      console.log("Appwrite:: Database:: CreatePost:: error:: ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {

      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,

        }
      )

    } catch (error) {
      console.log("Appwrite:: Database:: UpdatePost:: error:: ", error);

    }
  }

  async deletePost(slug) {
    try {
      const deletedocument = await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )

      if (!deletedocument) return false;

      return true;


    } catch (error) {
      console.log("Appwrite:: Database:: DeletePost:: error:: ", error);
      return false;

    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )

      if (!post) return false;

      return post
    } catch (error) {
      console.log("Appwrite:: Database:: getPost:: error:: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {

      const getAllPosts = this.databases
        .listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          queries
        );

      if (!getAllPosts) return false;
      return getAllPosts;

    } catch (error) {

      console.log("Appwrite:: Database:: getPosts:: error:: ", error);
      return false;

    }
  }
}


const database = new Database();

export default database;
