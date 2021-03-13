import { firebase, FieldValue } from '../lib/firebase';
import { collection } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { user } from 'rxfire/auth';

export const doesUserExists = (username: string) => {
  const db = firebase.firestore();
  const userCollectionRef = db
    .collection('users')
    .where('username', '==', username);

  return collection(userCollectionRef).pipe(
    map((user) => (user.length > 0 ? true : false))
  );
};

export const getUserById = async (userId: string) => {
  const db = firebase.firestore();
  const result = await db
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const [user] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

export const getSuggestedProfiles = async (userId: string, following: []) => {
  const db = firebase.firestore();
  const result = await db.collection('users').limit(10).get();

  // filter out your profile and profiles that are already being followed from result
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        // @ts-ignore
        profile.userId !== userId && !following.includes(profile.userId)
    );
};

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
