import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import AWS from 'aws-sdk'
const config = require('@/config/config.js')

export default class CognitoSDK {
  constructor() {
    this.poolData = {
      UserPoolId: config.cognito.UserPoolId,
      ClientId: config.cognito.ClientId
    }
    this.userPool = new CognitoUserPool(this.poolData)
    AWS.Config.region = config.region
  }

  getUserSession() {
    this.cognitoUser = this.userPool.getCurrentUser()

    return new Promise((resolve, reject) => {
      if (!this.cognitoUser) {
        reject(new Error('There is not cognito User'))
        return
      }

      this.cognitoUser.getSession(
        (err, session) => {
          if (err) {
            reject(err)
            return
          }
          this.setCredentials(session.getIdToken().jwtToken)
          resolve(session)
        }
      )
    }).then((session) => (this.getUserData().then(email => ({email, token: session.getIdToken().jwtToken}))))
  }

  login(Email, Password) {
    var authenticationData = {
      Email,
      Password
    }

    this.cognitoUser = this.getCognitoUser(Email)
    let authenticationDetails = new AuthenticationDetails(authenticationData)
    return new Promise((resolve, reject) => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.setCredentials(result.getIdToken().jwtToken)
          resolve(result)
        },
        onFailure: (err) => reject(err)
      })
    }).then(() => this.getUserData())
  }

  register(Email, Password) {
    return new Promise((resolve, reject) => {
      this.userPool.signUp(Email, Password, null, null, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    })
  }

  logoutUser(Email) {
    this.cognitoUser = this.getCognitoUser(Email)
    return this.cognitoUser.signOut()
  }

  getUserData() {
    return new Promise((resolve, reject) => {
      this.cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result.find(item => item.Name === 'email').Value)
      })
    })
  }

  setCredentials(token) {
    AWS.config.region = config.region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.cognito.IdentityPoolId,
      Logins: {
        [`cognito-idp.${config.region}.amazonaws.com/${config.cognito.UserPoolId}`]: token
      }
    })
  }

  verificateCode({ Username, code }) {
    this.cognitoUser = this.getCognitoUser(Username)
    return new Promise((resolve, reject) => {
      this.cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    })
  }

  forgotPassword({Username}) {
    this.cognitoUser = this.getCognitoUser(Username)
    return new Promise((resolve, reject) => {
      this.cognitoUser.forgotPassword({
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err)
      })
    })
  }

  confirmPassword({ Username, code, password }) {
    this.cognitoUser = this.getCognitoUser(Username)
    return new Promise((resolve, reject) => {
      this.cognitoUser.confirmPassword(code, password, {
        onSuccess: (result) => resolve(result),
        onFailure: (err) => reject(err)
      })
    })
  }

  getCognitoUser(Username) {
    var userPool = new CognitoUserPool(this.poolData)
    var userData = {
      Username,
      Pool: userPool
    }
    return new CognitoUser(userData)
  }
}
