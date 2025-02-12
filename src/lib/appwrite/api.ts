import {ID, Query} from 'appwrite';

import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';
import { AArrowDown } from 'lucide-react';

export async function createUserAccount(user: INewUser) {
    try {

        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username,

        );

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.username)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            username: newAccount.username, //mirar bien el uso de name o username
            email: newAccount.email,
            imageUrl: avatarUrl,

        })

        return newAccount;
    }
    catch (error) {
        console.log(error);
        return error;
    }

}

export async function saveUserToDB(user: {

    accountId: string;
    email: string;
    username: string;
    imageUrl: URL;
    
}) {

    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser;

    } catch (error) {

    }
}


export async function signInAccount(user: {email: string;
    password: string;}) {
        try {
            const session = await account.createEmailPasswordSession(
                user.email, user.password);

                return session;
        } catch (error) {
            console.log(error);
        }
    }


export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error; 

        const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        
    }
}


export async function signOutAccount() {
    try {
      const session = await account.deleteSession("current");

      return session;
    } catch (error) {
        console.log(error);
        
    }
}