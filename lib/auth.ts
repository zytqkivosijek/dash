import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

export interface User {
  uid: string
  username: string
  email: string
}

export async function login(email: string, password: string): Promise<User | null> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user
    
    // Buscar dados adicionais do usuário no Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
    
    if (userDoc.exists()) {
      const userData = userDoc.data()
      return {
        uid: firebaseUser.uid,
        username: userData.username || firebaseUser.email?.split('@')[0] || 'Usuário',
        email: firebaseUser.email || ''
      }
    }
    
    // Se não existe documento do usuário, criar um básico
    const user: User = {
      uid: firebaseUser.uid,
      username: firebaseUser.email?.split('@')[0] || 'Usuário',
      email: firebaseUser.email || ''
    }
    
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      username: user.username,
      email: user.email,
      createdAt: new Date().toISOString()
    })
    
    return user
  } catch (error) {
    console.error('Erro no login:', error)
    return null
  }
}

export async function register(username: string, email: string, password: string): Promise<User | null> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user
    
    const user: User = {
      uid: firebaseUser.uid,
      username,
      email: firebaseUser.email || email
    }
    
    // Salvar dados adicionais do usuário no Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      username,
      email: user.email,
      createdAt: new Date().toISOString()
    })
    
    return user
  } catch (error) {
    console.error('Erro no registro:', error)
    return null
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Erro no logout:', error)
  }
}

export function getCurrentUser(): User | null {
  const firebaseUser = auth.currentUser
  if (!firebaseUser) return null
  
  return {
    uid: firebaseUser.uid,
    username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuário',
    email: firebaseUser.email || ''
  }
}

export function isAuthenticated(): boolean {
  return !!auth.currentUser
}

// Hook para escutar mudanças no estado de autenticação
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // Buscar dados do usuário no Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        callback({
          uid: firebaseUser.uid,
          username: userData.username || firebaseUser.email?.split('@')[0] || 'Usuário',
          email: firebaseUser.email || ''
        })
      } else {
        callback({
          uid: firebaseUser.uid,
          username: firebaseUser.email?.split('@')[0] || 'Usuário',
          email: firebaseUser.email || ''
        })
      }
    } else {
      callback(null)
    }
  })
}