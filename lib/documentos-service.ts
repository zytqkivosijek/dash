import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'
import { Documento, Acesso, LogAcesso } from '@/types/documento'

// Coleções do Firestore
const DOCUMENTOS_COLLECTION = 'documentos'
const ACESSOS_COLLECTION = 'acessos'
const LOGS_COLLECTION = 'logs_acesso'

// Serviços para Documentos
export async function createDocumento(documento: Omit<Documento, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, DOCUMENTOS_COLLECTION), {
      ...documento,
      dataUpload: Timestamp.fromDate(new Date(documento.dataUpload)),
      dataModificacao: Timestamp.fromDate(new Date(documento.dataModificacao)),
      createdAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Erro ao criar documento:', error)
    throw error
  }
}

export async function getDocumentos(): Promise<Documento[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, DOCUMENTOS_COLLECTION), orderBy('dataModificacao', 'desc'))
    )
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: parseInt(doc.id),
        ...data,
        dataUpload: data.dataUpload.toDate().toISOString().split('T')[0],
        dataModificacao: data.dataModificacao.toDate().toISOString().split('T')[0]
      } as Documento
    })
  } catch (error) {
    console.error('Erro ao buscar documentos:', error)
    return []
  }
}

export async function updateDocumento(id: string, updates: Partial<Documento>): Promise<void> {
  try {
    const docRef = doc(db, DOCUMENTOS_COLLECTION, id)
    const updateData = { ...updates }
    
    if (updates.dataModificacao) {
      updateData.dataModificacao = Timestamp.fromDate(new Date(updates.dataModificacao))
    }
    
    await updateDoc(docRef, updateData)
  } catch (error) {
    console.error('Erro ao atualizar documento:', error)
    throw error
  }
}

export async function deleteDocumento(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, DOCUMENTOS_COLLECTION, id))
  } catch (error) {
    console.error('Erro ao excluir documento:', error)
    throw error
  }
}

// Serviços para Acessos
export async function createAcesso(acesso: Omit<Acesso, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, ACESSOS_COLLECTION), {
      ...acesso,
      dataAtualizacao: Timestamp.fromDate(new Date(acesso.dataAtualizacao)),
      createdAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Erro ao criar acesso:', error)
    throw error
  }
}

export async function getAcessos(): Promise<Acesso[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, ACESSOS_COLLECTION), orderBy('dataAtualizacao', 'desc'))
    )
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: parseInt(doc.id),
        ...data,
        dataAtualizacao: data.dataAtualizacao.toDate().toISOString().split('T')[0]
      } as Acesso
    })
  } catch (error) {
    console.error('Erro ao buscar acessos:', error)
    return []
  }
}

export async function updateAcesso(id: string, updates: Partial<Acesso>): Promise<void> {
  try {
    const docRef = doc(db, ACESSOS_COLLECTION, id)
    const updateData = { ...updates }
    
    if (updates.dataAtualizacao) {
      updateData.dataAtualizacao = Timestamp.fromDate(new Date(updates.dataAtualizacao))
    }
    
    await updateDoc(docRef, updateData)
  } catch (error) {
    console.error('Erro ao atualizar acesso:', error)
    throw error
  }
}

export async function deleteAcesso(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, ACESSOS_COLLECTION, id))
  } catch (error) {
    console.error('Erro ao excluir acesso:', error)
    throw error
  }
}

// Serviços para Logs de Acesso
export async function createLogAcesso(log: Omit<LogAcesso, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, LOGS_COLLECTION), {
      ...log,
      data: Timestamp.fromDate(new Date(log.data)),
      createdAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Erro ao criar log:', error)
    throw error
  }
}

export async function getLogsAcesso(documentoId?: number): Promise<LogAcesso[]> {
  try {
    let q = query(collection(db, LOGS_COLLECTION), orderBy('data', 'desc'))
    
    if (documentoId) {
      q = query(collection(db, LOGS_COLLECTION), 
        where('documentoId', '==', documentoId), 
        orderBy('data', 'desc')
      )
    }
    
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: parseInt(doc.id),
        ...data,
        data: data.data.toDate().toISOString()
      } as LogAcesso
    })
  } catch (error) {
    console.error('Erro ao buscar logs:', error)
    return []
  }
}