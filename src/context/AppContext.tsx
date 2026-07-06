import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc, collection, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { UserProfile, Bookmark, DownloadHistory } from "../types";

interface AppContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  bookmarks: Bookmark[];
  addBookmark: (itemId: string, itemType: Bookmark['itemType'], itemTitle: string, itemSubtitle?: string) => Promise<void>;
  removeBookmark: (bookmarkId: string) => Promise<void>;
  isBookmarked: (itemId: string, itemType: Bookmark['itemType']) => boolean;
  downloads: DownloadHistory[];
  recordDownload: (itemId: string, itemType: DownloadHistory['itemType'], itemTitle: string) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved !== null) {
      return saved === "dark";
    }
    return true; // Default to dark mode (luxury black theme)
  });
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [downloads, setDownloads] = useState<DownloadHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync isDarkMode with DOM class list and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Dark Mode Toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Firebase Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch or create Firestore user profile
        const userRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // Create default profile
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.email?.split("@")[0] || "Law Student",
              premiumStatus: "free",
              role: user.email === "vijaytiwari4554@gmail.com" ? "admin" : "student", // Set the requested user email as admin!
              createdAt: new Date().toISOString()
            };
            await setDoc(userRef, newProfile);
            setUserProfile(newProfile);
          }
          // Fetch bookmarks
          await fetchUserBookmarks(user.uid);
          // Fetch downloads
          await fetchUserDownloads(user.uid);
        } catch (error) {
          console.error("Error managing user profile:", error);
        }
      } else {
        setUserProfile(null);
        setBookmarks([]);
        setDownloads([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Fetch Bookmarks from Firestore
  const fetchUserBookmarks = async (uid: string) => {
    try {
      const q = query(collection(db, "bookmarks"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const bmarks: Bookmark[] = [];
      querySnapshot.forEach((doc) => {
        bmarks.push({ id: doc.id, ...doc.data() } as Bookmark);
      });
      setBookmarks(bmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  // Fetch Downloads from Firestore
  const fetchUserDownloads = async (uid: string) => {
    try {
      const q = query(collection(db, "downloads"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const dls: DownloadHistory[] = [];
      querySnapshot.forEach((doc) => {
        dls.push({ id: doc.id, ...doc.data() } as DownloadHistory);
      });
      setDownloads(dls);
    } catch (error) {
      console.error("Error fetching downloads:", error);
    }
  };

  // Add Bookmark
  const addBookmark = async (itemId: string, itemType: Bookmark['itemType'], itemTitle: string, itemSubtitle?: string) => {
    if (!currentUser) return;
    try {
      const newBookmark = {
        userId: currentUser.uid,
        itemId,
        itemType,
        itemTitle,
        itemSubtitle: itemSubtitle || "",
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, "bookmarks"), newBookmark);
      setBookmarks((prev) => [...prev, { id: docRef.id, ...newBookmark }]);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  // Remove Bookmark
  const removeBookmark = async (bookmarkId: string) => {
    try {
      await deleteDoc(doc(db, "bookmarks", bookmarkId));
      setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  // Check if item is bookmarked
  const isBookmarked = (itemId: string, itemType: Bookmark['itemType']) => {
    return bookmarks.some((b) => b.itemId === itemId && b.itemType === itemType);
  };

  // Record Download
  const recordDownload = async (itemId: string, itemType: DownloadHistory['itemType'], itemTitle: string) => {
    if (!currentUser) return;
    try {
      const newDownload = {
        userId: currentUser.uid,
        itemId,
        itemType,
        itemTitle,
        downloadedAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, "downloads"), newDownload);
      setDownloads((prev) => [...prev, { id: docRef.id, ...newDownload }]);
    } catch (error) {
      console.error("Error recording download:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        userProfile,
        isDarkMode,
        toggleDarkMode,
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        downloads,
        recordDownload,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
