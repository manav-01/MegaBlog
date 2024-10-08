import conf from "../conf/conf";
import { Client, Account, ID } from 'appwrite'

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {

    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (!userAccount) return console.log("Appwrite Service:: Authentication:: createAccount:: error:: Account is not created");

      return this.login({ email, password });// direct login

    } catch (error) {
      console.log("Appwrite Service:: Authentication:: createAccount:: error:: ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);

    } catch (error) {
      console.log("Appwrite Service:: Authentication:: login:: error::  ", error)
    }
  }

  async getCurrentUser() {
    try {
      const getUser = await this.account.get();
      if (!getUser) return;
      return getUser
    } catch (error) {
      console.log("Appwrite Service:: Authentication:: getCurrentUser:: error::  ", error)
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log("Appwrite Service:: Authentication:: logout:: error::  ", error)

    }
  }



}


const authService = new AuthService();

export default authService;