# REACT NOTE APP

A note app made with `react` with a custom rich text editor made with `slate js` and `firebase`.

## Firebase🔥

Google Firebase is a Google-backed application development software that enables developers to develop iOS, Android and Web apps.Here our app **afternotes** which is a web app, depends on firebase for the following features.

- **Firebase Auth 🦸**
  Every app requires an authentication system,firebase provides us with basic `email and password` signin and along with all the major OAuth providers like `facebook`,`google` and many others .
  For this project we are mainly using above cited providers only.

- **Cloud firestore 🧮**
  Cloud firestore is the database of our project .The cloud firestore is a `NoSql` database similar to `monogdb`.The data is being stored in the cloud firestore approximately like the `graph `shown below.

  ```mermaid
  stateDiagram
  Users --> User1
  Users --> User2
  User1 --> Credentials1
  User1 --> Notes
  Notes --> Note1
  Note1 --> Heading
  Note1 --> Tags
  Note1 --> ActualNote
  User2 --> Credentials2
  Credentials2 --> photoURL
  Credentials2 --> createdAt
  Credentials2 --> updatedAt
  ```

- **Cloud Storage🏪**
  As we have authenticated the user ,we need to make a profile page which ➡️ leads to the use cloud storage.`cloud storage` is simply a storage bucket to store the files.
  ```mermaid
  stateDiagram
  user --> picture1
  user --> picture2
  credentials --> picture2
  ```
  The last saved or added image is used as the user image
- **Hosting🌏**
  Being a web project, thus taking advantage of firebase hosting and following the [instruction](https://firebase.google.com/docs/hosting/quickstart).The project can be easity hosted.[URL](https://notify-b3141.web.app/)

## Slate js 🖋️

[Slate](https://docs.slatejs.org/v/v0.47/) is a completely customizable framework for building rich text editors.

> 🤖 Slate is currently in beta. Its core API is usable now, Some of its APIs are not "finalized" and will (breaking) change over time as we find better solutions.

## Problems 💢

This version 0.1.1 seems better than the previous one but still it's isn't complete . the notes can't be updated yet due to some problem with slate js. Thus there is no reason for update notes ,yet delete can be performed.

> 👽 Project is not finished

## Conclusion ✋

The project is done properly ,but not good for usage , thus it can be said it's a hobby project, I am ending this project here ,feel free to contribute and let's make afternotes a proper notes app which it's supposed to be .
