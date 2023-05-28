// // Scripts for firebase and firebase messaging
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js'
)

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyAI-o8RGRE9H2-U_zhRksZZP-x7oKyb5vQ',
  authDomain: 'monget-c1663.firebaseapp.com',
  databaseURL: 'https://monget-c1663.firebaseio.com',
  projectId: 'monget-c1663',
  storageBucket: 'monget-c1663.appspot.com',
  messagingSenderId: '895070246342',
  appId: '1:895070246342:web:f55448fc63a11f1849cec7',
  measurementId: 'G-0VG2E9XT62',
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)
  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
