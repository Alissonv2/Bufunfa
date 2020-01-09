import firebase from 'firebase';

let Config = {
        apiKey: "SUA_CHAVE_FIREBASE",
        authDomain: "SEU_DOMINIO",
        databaseURL: "SUA_URL",
        projectId: "ID_DO_PROJETO_NO_FIREBASE",
        storageBucket: "SUA_STORAGE",
        messagingSenderId: "SUAS_CONFIGURAÇÕES",
        appId: "SUA_APPID",
        measurementId: "SUAS_CONFIGURAÇÕES_FIREBASE"
  };
  firebase.initializeApp(Config);
  
export default firebase;
