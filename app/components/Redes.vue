<template>
  <FlexboxLayout flexDirection="column"  class="backgroundColorApp">
    <StackLayout>
      <StackLayout
        @tap="shareUrl()"
        orientation="horizontal"
        class="text-left panelBackgroundColorApp"
        margin="30 10"
        padding="10"
        borderRadius="2"
        borderWidth="1px"
        width="200">

        <Label class="sci primaryTextColorApp" :text="'\ue072'" fontSize="30" verticalAlignment="center"></Label>
        <Label fontSize="12" class="bold secondaryTextColorApp" opacity="0.7" paddingLeft="10" width="150" verticalAlignment="center">Compartir página</Label>
      </StackLayout>
      <Label class="secondaryTextColorApp" style="text-align:center; font-weight:bold" opacity="0.5" marginBottom="20">Visitanos en nuestras redes sociales:</Label>
      <ListView for="socialNetwork in socialNetworks">
        <v-template>
          <Button class="sci" @tap="openSocialNetwork(socialNetwork.link2App, socialNetwork.link2Page)" :text="socialNetwork.iconId" fontSize="50" borderRadius="2" margin="5" :backgroundColor="socialNetwork.background" :backgroundImage="socialNetwork.backgroundImage" :color="socialNetwork.iconColor" style="backgroundSize: cover"/>
        </v-template>
      </ListView>
    </StackLayout>
  </FlexboxLayout>
</template>
<script>
import { openApp } from 'nativescript-open-app'
import { openUrl } from 'tns-core-modules/utils/utils'
import config from '../config.js'

const appAvailability = require('nativescript-appavailability')
const SocialShare = require('nativescript-social-share')

export default {
  data: () => {
    return {
      socialNetworks: config.socialNetworks
    }
  },
  methods: {
    shareUrl () {
      SocialShare.shareUrl('http://your.playstore.link/', 'Your Playstore Link')
    },
    openSocialNetwork (app, url) {
      appAvailability.available(app).then(function (avail) {
        if (avail) {
          openApp(app)
        } else {
          openUrl(url)
        }
      })
    }
  }
}
</script>
