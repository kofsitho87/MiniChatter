<template>
  <main class="flex flex-column">
    <div class="h-screen bg-red-200 flex-1 flex flex-column">
      <div ref="messages" id="messages" class="px-4 flex-1 overflow-scroll">
        <div v-for="message in messages" :key="message.id">
          <div class="flex my-4 items-start" :class="message.owner.id == user.id ? 'justify-end': 'justify-start'">
            <div class="mr-2" v-if="message.owner.id != user.id">
              <!-- <img class="h-8 w-8 rounded-full" src="../assets/img/profile.png"> -->
            </div>
            <div>
              <div class="text-sm"> {{ message.owner.nickName }} </div>
              <div class="bg-red-400 p-2 rounded text-md" v-html="nl2br(message.content)"></div>
              <div class="text-xs">
                {{ message.createdAt | dateFormat }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="input_container" class="">
        <textarea-autosize
          ref="input"
          placeholder="Type something here..."
          :min-height="50"
          :max-height="200"
          @sendMessage="sendMessage"
          :disabled="false"
        />
      </div>
    </div>
  </main>
</template>

<script>
// import Vue from 'vue'
// import VueApollo from 'vue-apollo'



import fetch from 'node-fetch'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

import moment from "moment"
import TextareaAutosize from './TextareaAutosize.vue'
export default {
  props: {
    apiKey: {
      type: String,
      required: true
    },
    channelId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    nickName: {
      type: String,
      required: true
    }
  },
  components: {
    TextareaAutosize
  },
  data(){
    return {
      messages: [],
      token: null,
      user: null,
      connected: false,
      value: null,
      wsLink: null,
    }
  },
  filters: {
    dateFormat(value) {
      if (!value) return ''
      return moment(value).format("LT")
    },
  },
  created(){
    const httpLink = createHttpLink({
      // You should use an absolute URL here
      uri: 'http://localhost:9000/graphql',
      fetch: fetch,
    })

    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:9000/graphql',
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: () => ({
          authorization: this.token,
        }),
      },
    })
    this.wsLink = wsLink
    
    

    // Cache implementation
    const cache = new InMemoryCache()

    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
      },
      wsLink,
      httpLink
    )

    // Create the apollo client
    this.apolloClient = new ApolloClient({
      link: link,
      cache,
    })
  },
  mounted(){
    console.log("mini chatter mounted")
    this.connect()
  },
  methods: {
    nl2br(value){
      return value.replace(/\n/g, "<br>")
    },
    async connect(){
      // let a = await this.wsLink.subscriptionClient.connectionParams()
      // console.log(a)
      
      try {
        let {data: {connect}} = await this.apolloClient.mutate({
          mutation: gql`mutation ($apiKey: String!, $userId: ID!, $nickName: String!) {
            connect(apiKey: $apiKey, userId: $userId, nickName: $nickName) {
              user {
                id
                userId
                nickName
                profileURL
              }
              token
            }
          }`,
          variables: {
            apiKey: this.apiKey,
            userId: this.userId,
            nickName: this.nickName
          },
        })

        this.connected = true
        this.user = connect.user
        this.token = connect.token

        this.getMessages()
      } catch(e){
        this.$toast.error(e.message, {
          duration: 2000
        })
      }
    },
    async getMessages(){
      try {
        let {data: {messages}} = await this.apolloClient.query({
          query: gql`query ($channelId: ID!) {
            messages(channelId: $channelId) {
              id
              owner {
                id
                nickName
                userId
              }
              content
              createdAt
            }
          }`,
          variables: {
            channelId: this.channelId,
          },
          context: {
            headers: {
              authorization: this.token
            }
          }
        })
        this.messages = messages
        this.startSubscriptionMessages()

      } catch (e){
        this.$toast.error(e.message, {
          duration: 2000
        })
      }
    },
    startSubscriptionMessages(){
      const subQuery = gql`subscription messageAdded($channelId: ID!) {
        messageAdded(channelId: $channelId) {
          id
          content
          owner {
            id
            userId
            nickName
          }
        }
      }`

      const observer = this.apolloClient.subscribe({
        query: subQuery,
        variables: {
          channelId: this.channelId,
        },
        context: {
          headers: {
            authorization: this.token
          }
        }
      })

      var self = this
      observer.subscribe({
        next ({data: {messageAdded}}) {
          //console.log(messageAdded)
          self.messages = [...self.messages, messageAdded]
          console.log("scollToBottom")
          self.scollToBottom()
        },
        error (e) {
          console.log(e)
          this.$toast.error(e.message, {
            duration: 2000
          })
        },
      })
    },
    async sendMessage(message){
      if(!message){
        return
      }
      if( this.wsLink.subscriptionClient.status != 1 ){
        this.$toast.error("SOCKET NOT READY", {
          duration: 2000
        })
        return
      }
      try {
        let {data: {sendMessage}} = await this.apolloClient.mutate({
          mutation: gql`mutation ($channelId: ID!, $content: String!) {
            sendMessage(channelId: $channelId, content: $content) {
              id
              content
              owner {
                id
                userId
                nickName
              }
              createdAt
            }
          }`,
          variables: {
            channelId: this.channelId,
            content: message
          },
          context: {
            headers: {
              authorization: this.token
            }
          }
        })
        this.$refs.input.currentValue = null
        
      } catch(e){
        this.$toast.error(e.message, {
          duration: 2000
        })
      }
    },
    scollToBottom() {
      this.$nextTick(() => {
        setTimeout(() => {
          console.log(this.$refs["messages"])
          let scrollHeight = this.$refs["messages"].scrollHeight
          this.$refs["messages"].scrollTo(0, scrollHeight)
          //window.scrollTo(0, scrollHeight)
        }, 100)
      })
    },
  }
}
</script>

<style>

</style>