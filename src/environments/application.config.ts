export const appConfig = {
    serverBaseUrl: 'http://localhost:5000',
    authConfig : {
        "linkedin":{
          "endpoint": "http://localhost:5000/auth/linkedin",
          "clientId":"811ndwh6m8gkpy",
          "redirectURI" : "http://localhost:5000/admin"
        },
        "facebook":{
          "endpoint": "http://localhost:5000/auth/facebook",
          "clientId":"929055083862567",
          "redirectURI" : "http://localhost:5000/admin"
        },
        "google":{
          "endpoint": "http://localhost:5000/auth/google",
          "clientId":"900187499637-ljude85eeghejtu3rl1c1j14lpgmgf2t.apps.googleusercontent.com",
          "redirectURI" : "http://localhost:5000/admin"
        }
    }
};