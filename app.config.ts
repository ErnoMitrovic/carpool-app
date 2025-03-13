export default {
  "expo": {
    "name": "carpool-app",
    "slug": "carpool-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.ernomitrovic.carpoolapp",
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        }
      }, 
      usesCleartextTraffic: true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ],
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "f0216cf9-38e0-4429-850e-eb5ff73179a5"
      },
      "here": {
        "apiKey": process.env.HERE_API_KEY,
        "autosuggestUrl": "https://autosuggest.search.hereapi.com/v1/autosuggest"
      },
      // {@link https://firebase.google.com/docs/web/setup#config-object | Learn about the Firebase config object}.
      firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        apiKey: process.env.FIREBASE_API_KEY,
      }
    }
  }
}
