export const userCreationError = function (errorCode) {
  const errors = {
    'auth/email-already-in-use': 'It appears that this email address is already registered.',
    'auth/invalid-email': 'That doesn\'t look like a valid email address, take another look',
    'auth/operation-not-allowed': 'Sorry but we aren\'t permitting email sign ups at present',
    'auth/weak-password': 'Weak password',
    'default': 'Unknown error, if it persists; please contact support@tradeitcornwall.co.uk'
  }
  return (errors[errorCode] || errors['default'])
}

export const emailLoginError = function (errorCode) {
  const errors = {
    'auth/user-not-found': 'This email address isn\'t registered.',
    'auth/invalid-email': 'That doesn\'t look like a valid email address, take another look',
    'auth/user-disabled': 'This account has been disabled. Please contact support@tradeitcornwall.co.uk for more info.',
    'auth/wrong-password': 'You\'ve entered an incorrect password, or originally logged in using your Facebook account.',
    'default': 'Unknown error, if it persists; please contact support@tradeitcornwall.co.uk'
  }
  return (errors[errorCode] || errors['default'])
}

// TODO: Are there similar errors I can use for the oAuth stuff?
