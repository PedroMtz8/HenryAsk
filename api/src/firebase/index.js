var admin = require("firebase-admin");
const env = require("../config");

var serviceAccount = {
    "type": env.FIREBASE_TYPE,
    "project_id": env.FIREBASE_PROJECT_ID,
    "private_key_id": env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": env.FIREBASE_PRIVATE_KEY,
    "client_email": env.FIREBASE_CLIENT_EMAIL,
    "client_id": env.FIREBASE_CLIENT_ID,
    "auth_uri": env.FIREBASE_AUTH_URI,
    "token_uri": env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": env.FIREBASE_AUTH_CERT_URL,
    "client_x509_cert_url": env.FIREBASE_CLIENT_CERT_URL
}


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin
