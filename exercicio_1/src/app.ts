import express, { Application } from 'express'
import routes from './routes'

const app: Application = express()
app.use(express.json())
app.use(routes)

app.listen(5000, () => console.log('server on'))