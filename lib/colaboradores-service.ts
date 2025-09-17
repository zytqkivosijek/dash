import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'
import { Colaborador, HistoricoAlteracao } from '@/types/colaborador'

// Coleções do Firestore
const COLABORADORES_COLLECTION = 'colaboradores'
const HISTORICO_COLLECTION = 'historico_alteracoes'

// Serviços para Colaboradores
export async function createColaborador(colaborador: Omit<Colaborador, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLABORADORES_COLLECTION), {
      ...colaborador,
      dataNascimento: Timestamp.fromDate(new Date(colaborador.dataNascimento)),
      dataAdmissao: Timestamp.fromDate(new Date(colaborador.dataAdmissao)),
      dataDesligamento: colaborador.dataDesligamento ? Timestamp.fromDate(new Date(colaborador.dataDesligamento)) : null,
      createdAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Erro ao criar colaborador:', error)
    throw error
  }
}

export async function getColaboradores(): Promise<Colaborador[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, COLABORADORES_COLLECTION), orderBy('nome'))
    )
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: parseInt(doc.id),
        ...data,
        dataNascimento: data.dataNascimento.toDate().toISOString().split('T')[0],
        dataAdmissao: data.dataAdmissao.toDate().toISOString().split('T')[0],
        dataDesligamento: data.dataDesligamento ? data.dataDesligamento.toDate().toISOString().split('T')[0] : undefined
      } as Colaborador
    })
  } catch (error) {
    console.error('Erro ao buscar colaboradores:', error)
    return []
  }
}

export async function updateColaborador(id: string, updates: Partial<Colaborador>): Promise<void> {
  try {
    const docRef = doc(db, COLABORADORES_COLLECTION, id)
    const updateData = { ...updates }
    
    if (updates.dataNascimento) {
      updateData.dataNascimento = Timestamp.fromDate(new Date(updates.dataNascimento))
    }
    if (updates.dataAdmissao) {
      updateData.dataAdmissao = Timestamp.fromDate(new Date(updates.dataAdmissao))
    }
    if (updates.dataDesligamento) {
      updateData.dataDesligamento = Timestamp.fromDate(new Date(updates.dataDesligamento))
    }
    
    await updateDoc(docRef, updateData)
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error)
    throw error
  }
}

export async function deleteColaborador(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLABORADORES_COLLECTION, id))
  } catch (error) {
    console.error('Erro ao excluir colaborador:', error)
    throw error
  }
}

// Serviços para Histórico de Alterações
export async function createHistoricoAlteracao(historico: Omit<HistoricoAlteracao, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, HISTORICO_COLLECTION), {
      ...historico,
      data: Timestamp.fromDate(new Date(historico.data)),
      createdAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Erro ao criar histórico:', error)
    throw error
  }
}

export async function getHistoricoColaborador(colaboradorId: number): Promise<HistoricoAlteracao[]> {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, HISTORICO_COLLECTION), 
        orderBy('data', 'desc')
      )
    )
    
    return querySnapshot.docs
      .map(doc => {
        const data = doc.data()
        return {
          id: parseInt(doc.id),
          ...data,
          data: data.data.toDate().toISOString().split('T')[0]
        } as HistoricoAlteracao
      })
      .filter(h => h.colaboradorId === colaboradorId)
  } catch (error) {
    console.error('Erro ao buscar histórico:', error)
    return []
  }
}