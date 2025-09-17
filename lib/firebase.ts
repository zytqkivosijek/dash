import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔑 Configurações do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmUWNtoy3jNTCpAxJJxPlXJQxHw4E2sUY",
  authDomain: "balance-54321.firebaseapp.com", 
  projectId: "balance-54321",
  storageBucket: "balance-54321.appspot.com",
  messagingSenderId: "462972747180",
  appId: "1:462972747180:web:XXXXXXXXXXXX"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços que você vai usar no Bolt
export const auth = getAuth(app);         // autenticação (login)
export const db = getFirestore(app);      // banco de dados (Firestore)