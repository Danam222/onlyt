import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDDHetrAhcXGGCy7Q_YQL_7XL5YmlX5kV8",
    authDomain: "onlyt-3a068.firebaseapp.com",
    projectId: "onlyt-3a068",
    storageBucket: "onlyt-3a068.firebasestorage.app",
    messagingSenderId: "557320002910",
    appId: "1:557320002910:web:279b47a6598b418e1183cf"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  function updateVisitorUI(daily, total) {
    let dailyElements = document.querySelectorAll("#daily");
    let totalElements = document.querySelectorAll("#total");
    dailyElements.forEach((element, index) => {
        element.innerText = daily.toString().trim();
        element.style.display = "inline-block";
        element.style.visibility = "visible";
        element.style.color = "black";
    });
    totalElements.forEach((element, index) => {
        element.innerText = total.toString().trim();
        element.style.display = "inline-block";
        element.style.visibility = "visible";
        element.style.color = "black";
    });
}
async function updateVisitorCount() {
    const now = new Date().getTime(); 
    const lastVisit = localStorage.getItem("lastVisit");
    if (lastVisit && now - parseInt(lastVisit) < 10 * 60 * 1000) {
        return;
    }
    localStorage.setItem("lastVisit", now);
    const koreaTime = new Date(now + 9 * 60 * 60 * 1000); 
    const today = koreaTime.toISOString().split("T")[0];
    const visitorRef = doc(db, "visitors", "count");
    const visitorSnap = await getDoc(visitorRef);
    if (!visitorSnap.exists()) {
        await setDoc(visitorRef, { daily: 1, total: 1, lastVisit: today });
    } else {
        const data = visitorSnap.data();
        let daily = data.daily ?? 0;
        let total = data.total ?? 0;
        if (data.lastVisit !== today) {
            daily = 1; 
        } else {
            daily += 1;
        }
        total += 1;
        await updateDoc(visitorRef, { daily, total, lastVisit: today });
    }
    displayVisitorCount();
}
async function displayVisitorCount() {
    const visitorRef = doc(db, "visitors", "count");
    const visitorSnap = await getDoc(visitorRef);
    if (visitorSnap.exists()) {
        const data = visitorSnap.data();
        updateVisitorUI(data.daily ?? 0, data.total ?? 0);
    } else {
        console.warn("⚠ Firestore에서 데이터 없음");
    }
}
updateVisitorCount();
displayVisitorCount(); 