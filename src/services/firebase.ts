import { firebase, FieldValue } from '../lib/firebase';
import { collection } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { IPhoto, IUser } from './types';

// Check if user exists in firebase firestore and return boolean value
export const doesUserExists = (username: string) => {
  const db = firebase.firestore();
  const userCollectionRef = db
    .collection('users')
    .where('username', '==', username);

  return collection(userCollectionRef).pipe(
    map((user) => (user.length > 0 ? true : false))
  );
};
// Check if user exists in firebase firestore and return user document
export const getUserByUsername = async (username: string) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  const user = result.docs.map((item) => ({
    ...(item.data() as IUser),
    docId: item.id,
  }));

  return user;
};

export const getUserById = async (userId: string) => {
  const db = firebase.firestore();
  const result = await db
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const [user] = result.docs.map((item) => ({
    ...(item.data() as IUser),
    docId: item.id,
  }));

  return user;
};

export const getSuggestedProfiles = async (
  userId: string,
  following: [string]
) => {
  const db = firebase.firestore();
  const result = await db.collection('users').limit(10).get();

  // filter out your profile and profiles that are already being followed from result
  return result.docs
    .map((user) => ({ ...(user.data() as IUser), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId &&
        !following.includes(profile.userId as never)
    );
};

// --------------------------------------------------
// FOLLOWERS SECTION

// When follow requested, two steps should be taken:
// 1. Update the "following" array of current logged in user
// 2. Update the "followers" array of user that is requested to be followed

// Executes action described in step 1
export const updateLoggedInUserFollowing = async (
  loggedInUserDocId: string, // currently logged in user document id
  profileId: string, // the user that currently logged in user requested to follow
  isFollowingProfile: boolean // am currently logged user is following requested user
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
};

// Executes action described in step 2
export const updateFollowedUserFollowers = async (
  targetedUserDocId: string,
  loggedInUserId: string,
  isFollowingProfile: boolean
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(targetedUserDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId),
    });
};

export const isUserFollowingProfile = async (
  userId: string,
  profileUserId: string
) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .where('following', 'array-contains', profileUserId)
    .get();

  const userDoc = result.docs.map((doc) => ({
    ...(doc.data() as IUser),
    docId: doc.id,
  }));

  return userDoc.length > 0;
};

export async function toggleFollow(
  isFollowingProfile: boolean,
  activeUserDocId: string,
  profileDocId: string,
  profileUserId: string,
  followingUserId: string
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}

// --------------------------------------------------
// PHOTOS SECTION

// Get photos of users which currently logged in user is following
export const getPhotos = async (userId: string, following: [string]) => {
  // Return all photos, where userId in photo document is in array of "following" of the current logged in user
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();
  // Map response from firebase into array of object
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...(photo.data() as IPhoto),
    docId: photo.id,
  }));

  // Populate array of photos with information whether current logged in user (LUI) liked the photo
  const photosWithUserDetails = await Promise.all(
    // Map through all photos
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      // Check if LUI has liked the photo
      if (photo.likes.includes(userId as never)) {
        userLikedPhoto = true;
      }
      // User that posted the photo
      const user = await getUserById(photo.userId);
      const { username } = user;
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
};

export const getUserPhotosByUserId = async (userId: string) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

  return result.docs.map((photo) => ({
    ...(photo.data() as IPhoto),
    docId: photo.id,
  }));
};
