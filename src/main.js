// @flow

const { DB_URI, PORT } = require('./config')
const { db, logger } = require('./util')

db.connect(DB_URI)
  .then(() => {
    const app = require('./app')

    app.listen(PORT, () => logger.info(`Server listening on port ${PORT}!`))
  })
  .catch(err => logger.error(err))
