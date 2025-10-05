import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
  DocumentData,
  
} from "firebase/firestore";
import { auth, db } from "./firebase";

export interface Task {
  id?: string;
  uid: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  attachment?:{
    url:string,
    public_id:string
  };
  createdAt?: string;
}

export async function addTask(
  uid: string,
  title: string,
  description: string,
  priority: string,
  status: string,
  attachment: {
        url: string;
        public_id: string;
      }
): Promise<void> {
  await addDoc(collection(db, "tasks"), {
    uid,
    title,
    description,
    priority,
    status,
    attachment,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToTasks(
  callback: (tasks: Task[]) => void
): () => void {
  const uid = auth?.currentUser?.uid;
  if (!uid) {
    throw new Error("User is not authenticated");
  }
  const q = query(
    collection(db, "tasks"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
    const tasks: Task[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toLocaleDateString("en-GB"),
      } as Task;
    });
    callback(tasks);
  });
}

export async function updateTask({
  id,
  title,
  description,
  priority,
  status,
  attachment,
}: Task): Promise<void> {
  if (!id) {
    throw new Error("Task id is required for update");
  }
  await updateDoc(
    doc(db, "tasks", id),
    {
      title,
      description,
      priority,
      status,
      attachment,
    }
  );
}

export async function deleteTask(id: string): Promise<void> {
  await deleteDoc(doc(db, "tasks", id));
}
