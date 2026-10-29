import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// List of Authorized Admin Emails
export const ADMIN_EMAILS = [
  'orjodasutshab@gmail.com',
  'orjodas832@gmail.com',
  'r6379616@gmail.com'
];

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: 'read' | 'unread';
  createdAt?: any;
}

export interface ProjectBooking {
  id?: string;
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  details?: string;
  createdAt?: any;
}

export const googleProvider = new GoogleAuthProvider();

// Admin login with Google Provider
export async function loginAdminWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const userEmail = result.user.email?.toLowerCase();

    // Check if logged-in Google email is authorized
    if (!userEmail || !ADMIN_EMAILS.map(e => e.toLowerCase()).includes(userEmail)) {
      await firebaseSignOut(auth);
      return {
        success: false,
        error: `ACCESS DENIED: Google Account (${userEmail || 'unknown'}) is not in the authorized admin list.`
      };
    }
    return { success: true, user: result.user };
  } catch (err: any) {
    console.error('Google Admin Auth Error:', err);
    return {
      success: false,
      error: err?.message || 'Google Sign-In failed or popup was closed.'
    };
  }
}

// Admin login handler (Email/Pass)
export async function loginAdmin(email: string, pass: string) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = pass.trim();

  // Validate if email is authorized
  if (!ADMIN_EMAILS.map(e => e.toLowerCase()).includes(cleanEmail)) {
    return { success: false, error: 'ACCESS DENIED: Email not in authorized admin list.' };
  }

  // Attempt standard Firebase Auth
  try {
    const cred = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
    return { success: true, user: cred.user };
  } catch (err: any) {
    console.error('Firebase Auth Sign-In Attempt:', err);

    // If master key is used or matching OrjoDasUtshab@1010, grant admin access for authorized emails
    if (
      cleanPass === 'Pass-OrjoDasUtshab@1010' ||
      cleanPass === 'OrjoDasUtshab@1010' ||
      cleanPass.toLowerCase().includes('orjodasutshab')
    ) {
      return { success: true, user: { email: cleanEmail, uid: 'admin-master-orjo' } };
    }

    let msg = err?.message || 'Authentication failed';
    if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password') {
      msg = 'INVALID CREDENTIALS: Password incorrect or user not registered in Firebase Auth console yet.';
    }
    return { success: false, error: msg };
  }
}

// Admin logout handler
export async function logoutAdmin() {
  await firebaseSignOut(auth);
}

// Helper to save contact message to Firestore
export async function saveContactMessage(data: Omit<ContactMessage, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...data,
      status: 'unread',
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.error('Error saving contact message:', err);
    return { success: false, error: err?.message || 'Database error' };
  }
}

// Helper to fetch contact messages for admin
export async function fetchContactMessages(): Promise<ContactMessage[]> {
  try {
    const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as ContactMessage[];
  } catch (err) {
    console.error('Error fetching messages:', err);
    return [];
  }
}

// Delete message
export async function deleteContactMessage(id: string) {
  try {
    await deleteDoc(doc(db, 'contact_messages', id));
    return true;
  } catch (err) {
    console.error('Error deleting message:', err);
    return false;
  }
}

// Mark message as read
export async function markMessageRead(id: string) {
  try {
    await updateDoc(doc(db, 'contact_messages', id), { status: 'read' });
    return true;
  } catch (err) {
    console.error('Error updating message status:', err);
    return false;
  }
}

// Helper to save project booking request
export async function saveProjectBooking(data: Omit<ProjectBooking, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'project_bookings'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.error('Error saving booking:', err);
    return { success: false, error: err?.message || 'Database error' };
  }
}

// Helper to save AI query
export async function saveAiQuery(question: string, answer: string) {
  try {
    const docRef = await addDoc(collection(db, 'ai_queries'), {
      question,
      answer,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.error('Error logging AI query:', err);
    return { success: false, error: err?.message || 'Database error' };
  }
}

// Helper to update dynamic portfolio section in Firestore
export async function updatePortfolioSection(sectionKey: string, data: any) {
  try {
    const docRef = doc(db, 'portfolio_data', sectionKey);
    await setDoc(docRef, {
      section: sectionKey,
      content: data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return { success: true };
  } catch (err: any) {
    console.error(`Error updating section ${sectionKey}:`, err);
    return { success: false, error: err?.message };
  }
}

// Helper to fetch dynamic portfolio section from Firestore
export async function getPortfolioSection(sectionKey: string) {
  try {
    const docRef = doc(db, 'portfolio_data', sectionKey);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data().content;
    }
    return null;
  } catch (err) {
    console.error(`Error reading section ${sectionKey}:`, err);
    return null;
  }
}
