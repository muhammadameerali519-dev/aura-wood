import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { Inquiry } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyBije2eb6dRZaobTNqGN8G4VS4awWtwaug",
  authDomain: "glassy-actor-0txfk.firebaseapp.com",
  projectId: "glassy-actor-0txfk",
  storageBucket: "glassy-actor-0txfk.firebasestorage.app",
  messagingSenderId: "618399771552",
  appId: "1:618399771552:web:f52b7b1a1e4013488fd2c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the specific database ID provisioned for this applet
export const db = getFirestore(app, "ai-studio-ea54cff5-f09e-47e4-8123-e364df2b2616");

const INQUIRIES_COLLECTION = 'inquiries';

/**
 * Saves a new quote inquiry securely to Firestore
 */
export async function submitInquiry(inquiryData: Omit<Inquiry, 'id' | 'timestamp' | 'status'>): Promise<string> {
  try {
    const colRef = collection(db, INQUIRIES_COLLECTION);
    const newDoc = await addDoc(colRef, {
      ...inquiryData,
      status: 'New',
      timestamp: new Date().toISOString(),
      createdAt: serverTimestamp() // For accurate server-side sorting
    });
    return newDoc.id;
  } catch (error) {
    console.error("Error submitting inquiry to Firestore: ", error);
    // Fallback to localStorage so the app functions even in offline situations
    const fallbackInquiries = JSON.parse(localStorage.getItem('fallback_inquiries') || '[]');
    const localId = 'local_' + Math.random().toString(36).substring(2, 11);
    fallbackInquiries.push({
      id: localId,
      ...inquiryData,
      status: 'New',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('fallback_inquiries', JSON.stringify(fallbackInquiries));
    return localId;
  }
}

/**
 * Retrieves all inquiries from Firestore for the store owner dashboard
 */
export async function fetchInquiries(): Promise<Inquiry[]> {
  try {
    const colRef = collection(db, INQUIRIES_COLLECTION);
    // Sort by server timestamp descending
    const q = query(colRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const firebaseInquiries: Inquiry[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      firebaseInquiries.push({
        id: docSnap.id,
        fullName: data.fullName || '',
        phoneNumber: data.phoneNumber || '',
        city: data.city || '',
        productName: data.productName || '',
        quantity: data.quantity || '',
        budget: data.budget || '',
        message: data.message || '',
        timestamp: data.timestamp || new Date().toISOString(),
        status: data.status || 'New'
      });
    });

    // Merge with any offline submissions to guarantee they appear
    const localInquiries = JSON.parse(localStorage.getItem('fallback_inquiries') || '[]');
    return [...localInquiries, ...firebaseInquiries];
  } catch (error) {
    console.error("Error fetching inquiries from Firestore: ", error);
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('fallback_inquiries') || '[]');
  }
}

/**
 * Updates the workflow status of an inquiry
 */
export async function updateInquiryStatus(id: string, status: Inquiry['status']): Promise<void> {
  if (id.startsWith('local_')) {
    const localInquiries = JSON.parse(localStorage.getItem('fallback_inquiries') || '[]');
    const updated = localInquiries.map((inq: Inquiry) => 
      inq.id === id ? { ...inq, status } : inq
    );
    localStorage.setItem('fallback_inquiries', JSON.stringify(updated));
    return;
  }

  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error(`Error updating inquiry status for ${id}: `, error);
    throw error;
  }
}

/**
 * Permanently deletes an inquiry from the database
 */
export async function deleteInquiry(id: string): Promise<void> {
  if (id.startsWith('local_')) {
    const localInquiries = JSON.parse(localStorage.getItem('fallback_inquiries') || '[]');
    const filtered = localInquiries.filter((inq: Inquiry) => inq.id !== id);
    localStorage.setItem('fallback_inquiries', JSON.stringify(filtered));
    return;
  }

  try {
    const docRef = doc(db, INQUIRIES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting inquiry ${id}: `, error);
    throw error;
  }
}
