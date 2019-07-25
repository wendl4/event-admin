import React from 'react'
import app from 'firebase/app'
import 'firebase/database'
import { firebaseConfig } from '../config/firebaseConfig'

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.db = app.database()
  }

    // *** User API ***
    event = uid => this.db.ref(`events/${uid}`)
    events = () => this.db.ref('events')

}

const FirebaseContext = React.createContext(null)

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export default Firebase

export { FirebaseContext }