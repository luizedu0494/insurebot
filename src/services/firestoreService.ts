import { db } from '../config/firebase';
import { doc, setDoc, collection, getDocs, addDoc } from 'firebase/firestore';

export const salvarDadosUsuario = async (uid: string, nome: string, email: string) => {
  try {
    const usuarioRef = doc(db, 'usuarios', uid);
    await setDoc(usuarioRef, {
      nome: nome,
      email: email,
      criadoEm: new Date().toISOString()
    });
    console.log("Dados do usuário salvos no Firestore com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar dados do usuário:", error);
    throw error;
  }
};

export const criarApoliceTeste = async (uid: string) => {
  try {
    const apolicesRef = collection(db, 'usuarios', uid, 'apolices');
    await addDoc(apolicesRef, {
      numero: `POL-${Math.floor(100000 + Math.random() * 900000)}`,
      tipo: "Seguro Auto Simples",
      status: "Ativo",
      premio: "R$ 1.200,00",
      validade: "25/12/2026"
    });
    console.log("Apólice de teste criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar apólice de teste:", error);
  }
};

export const buscarApolicesUsuario = async (uid: string) => {
  try {
    const apolicesRef = collection(db, 'usuarios', uid, 'apolices');
    const querySnapshot = await getDocs(apolicesRef);
    
    const apolices: any[] = [];
    querySnapshot.forEach((documento) => {
      apolices.push({ id: documento.id, ...documento.data() });
    });
    
    return apolices;
  } catch (error) {
    console.error("Erro ao buscar apólices:", error);
    throw error;
  }
};