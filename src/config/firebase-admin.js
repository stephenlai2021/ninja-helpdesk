// import "server-only"
// import admin from "firebase-admin"

// function formatPrivateKey(key) {
//   return key.replace(/\\n/g, "\n")
// }

// export function createFirebaseAdminApp(params) {
//   const privateKey = formatPrivateKey(params.privateKey)

//   if (admin.app.length > 0) return admin.app()

//   const cert = admin.credential.cert({
//     projectId: params.projectId,
//     clientEmail: params.clientEmail,
//     privateKey
//   })

//   return admin.initializeApp({
//     credential: cert,
//     projectId: params.projectId,
//     storageBucket: params.storageBucket
//   })
// }

// export function initAdmin() {
//   const params = {
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
//     clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_STORAGE_BUCKET,
//     privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY
//   }

//   return createFirebaseAdminApp(params)
// }