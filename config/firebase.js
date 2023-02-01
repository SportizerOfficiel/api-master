import admin from "firebase-admin"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "dotenv/config"
export class FirebaseService {

  static townHallsNode = "townhalls"
  static clubsNode = "clubs"
  static playersNode = "players"
  static matchsNode = "matchs"
  static presentPlayersNode = "presentPlayers"
  static disciplinesNode = "disciplines"
  static categoriesNode = "categories"

  constructor(){

    const {
      TYPE,
      PROJECT_ID,
      PRIVATE_KEY_ID,
      PRIVATE_KEY,
      CLIENT_EMAIL,
      CLIENT_ID,
      AUTH_URI,
      TOKEN_URI,
      AUTH_PROVIDER_X509_CERT_URL,
      CLIENT_X509_CERT_URL
    } = process.env;
    
    const firebaseConfig = {
      type: TYPE,
      project_id: PROJECT_ID,
      private_key_id: PRIVATE_KEY_ID,
      private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: CLIENT_EMAIL,
      client_id: CLIENT_ID,
      auth_uri: AUTH_URI,
      token_uri: TOKEN_URI,
      auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: CLIENT_X509_CERT_URL
    };

    const firebaseClientConfig = {
      apiKey: "AIzaSyCiCt47trhr-rkdAoD6X-7QX1KiSU17sHE",
      authDomain: "sportizer-605f7.firebaseapp.com",
      projectId: "sportizer-605f7",
      storageBucket: "sportizer-605f7.appspot.com",
      messagingSenderId: "177989134915",
      appId: "1:177989134915:web:6c86999639a452dab902f6"
    }

    if (admin.apps.length === 0){
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig)
      });
    }

    if (firebase.apps.length === 0){
      firebase.initializeApp(firebaseClientConfig)
    }

    this.db = admin.firestore()
    this.auth = firebase.auth()

    console.log("Created new instance of FirestoreService");
  }

}