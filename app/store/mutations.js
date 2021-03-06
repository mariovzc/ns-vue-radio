export const SET_PLAYER = (state, player) => {
  state.player = player
}

export const PLAY_URL = (state, url) => {
  const playerOptions = {
    audioFile: url,
    loop: false,
    errorCallback: err => {
      console.log(err)
      alert({
        title: 'Error',
        message: 'Hubo un problema reproduciendo la transmisión',
        okButtonText: 'Entendido'
      })
    }
  }

  state.playPromise = state.player.playFromUrl(playerOptions)
}

export const PAUSE = state => {
  state.player.pause()
}

export const SET_PLAY_PROMISE = (state, promise) => {
  state.playPromise = promise
}

export const SET_PLAYER_SCREEN = (state, playerScreen) => {
  state.playerScreen = playerScreen
}

export const SET_CURRENT_TAB = (state, newTab) => {
  state.currentTab = newTab
}

export const SET_FOREGROUND = (state, value) => {
  state.foreground = value
}

export const SET_LAST_MESSAGE_ID = (state, value) => {
  state.lastMessageId = value
}

export const FIREBASE_INIT = (state, store) => {
  state.firebase
    .init({
      onMessageReceivedCallback: function (message) {
        const tabName = getTabName(message)
        if (message.foreground) {
          alert({
            title: message.title,
            message: message.body,
            okButtonText: 'OK'
          }).then(() => {
            console.log('Alert dialog closed')
            store.commit('SET_FOREGROUND', true)
            changeTab(tabName)
          })
        } else {
          store.commit('SET_FOREGROUND', false)
          // cuando la aplicacion vuelve de a de background, si recibio con anterioridad
          // un mensaje en ese estado se ejecuta siempre onMessageReceivedCallback
          if (message.data['google.message_id'] !== store.getters.getLastMessageId) {
            changeTab(tabName)
            store.commit('SET_LAST_MESSAGE_ID', message.data['google.message_id'])
          }
        }
      }
    })
    .then(
      () => {
        console.log('Firebase is ready')
        state.firebase.subscribeToTopic('general').then(() => console.log('Subscribed to topic general'))
        state.firebase.subscribeToTopic('vivo').then(() => console.log('Subscribed to topic vivo'))
        state.firebase.subscribeToTopic('programacion').then(() => console.log('Subscribed to topic programacion'))
        state.firebase.subscribeToTopic('escribinos').then(() => console.log('Subscribed to topic escribinos'))
        state.firebase.subscribeToTopic('podcasts').then(() => console.log('Subscribed to topic podcasts'))
        state.firebase.subscribeToTopic('redes').then(() => console.log('Subscribed to topic redes'))
      },
      error => {
        console.log('firebase.init error: ' + error)
      }
    )

  function getTabName (message) {
    // data.topic is priority
    let topic
    if (message.from !== undefined) {
      topic = message.from.slice(8)
    } else {
      topic = 'default'
    }
    const tabName = message.data.topic || topic
    return tabName
  }

  function changeTab (tabName) {
    switch (tabName) {
    case 'programacion':
      store.commit('SET_CURRENT_TAB', 1)
      break
    case 'escribinos':
      store.commit('SET_CURRENT_TAB', 2)
      break
    case 'podcasts':
      store.commit('SET_CURRENT_TAB', 3)
      break
    case 'redes':
      store.commit('SET_CURRENT_TAB', 4)
      break
    default:
      store.commit('SET_CURRENT_TAB', 0)
      break
    }
  }
}

export const SET_CONEXION = (state, conexion) => {
  state.conexion = conexion
}

export const SET_LANGUAGE = (state, language) => {
  state.language = language
}

export const SUCCESS_LANGUAGE_FETCH = (state, language) => {
  state.loadedLanguages.push(language)
}
