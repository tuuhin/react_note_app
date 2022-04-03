# REACT NOTE APP

A note app made with `react` with a custom rich text editor made with `slate js` and `firebase`.

## Firebase🔥

Google Firebase is a Google-backed application development software that enables developers to develop iOS, Android and Web apps.Here our app **afternotes** which is a web app, depends on firebase for the following features.

- **Firebase Auth 🦸**
  Every app requires an authentication system,firebase provides us with basic `email and password` signin and along with all the major OAuth providers like `facebook`,`google` and many others .
  For this project we are mainly using above cited providers only.

- **Cloud firestore 🧮**
  Cloud firestore is the database of our project .The cloud firestore is a `NoSql` database similar to `monogdb`.The data is being stored in the cloud firestore appoximately like the `graph `shown below.

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
  As we have authenticated the user ,we needmake a profile page which ➡️ leads to the use cloud storage.`cloud storage` is simply a storage bucket to store the files.
  ```mermaid
  stateDiagram
  user --> picture1
  user --> picture2
  credentails --> picture2
  ```
  The last saved or added image is used as the user image
- **Hosting🌏**
  Being a web project, thus taking advantage of firebase hosting and following the [instruction](https://firebase.google.com/docs/hosting/quickstart).The project can be easity hosted.[URL](https://notify-b3141.web.app/)

## Slate js 🖋️

[Slate](https://docs.slatejs.org/v/v0.47/) is a completely customizable framework for building rich text editors.

> 🤖 Slate is currently in beta. Its core API is usable now, Some of its APIs are not "finalized" and will (breaking) change over time as we find better solutions.

### Conclusion

It's under construction 🏗️
