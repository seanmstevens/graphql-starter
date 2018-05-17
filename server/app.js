const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())

mongoose.connect('mongodb://sean:Password1@ds225840.mlab.com:25840/gql-starter')
mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Server listening on port 4000')
})
