// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: 'AIzaSyBK2jyO9PF5Z7TRdxebGPw_JZFSczp0iqc',
    authDomain: 'organic-acronym-384819.firebaseapp.com',
    projectId: 'organic-acronym-384819',
    storageBucket: 'organic-acronym-384819.appspot.com',
    messagingSenderId: '293302642408',
    appId: '1:293302642408:web:1a3b078203ff8100c9cb5d',
    measurementId: 'G-K5P28E7BS1',
};

firebase.initializeApp(firebaseConfig);

console.log(firebase.apps.length);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    const user = localStorage.getItem('user');

    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Desde Firebase' + payload.notification?.title ?? '';
    const notificationOptions = {
        body: payload.notification?.body,
        icon: '/img/128x128.png',
    };
    if (payload.data?.owner == user)
        self.registration.showNotification(notificationTitle, notificationOptions);
});
