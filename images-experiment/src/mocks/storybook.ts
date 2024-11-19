import { handlers } from './handlers'

const PREFIX = 'src/mocks' // Adjust this based on your file structure

export const parameters = {
  msw: {
    handlers
  },
}

// Only initialize MSW browser in non-Node environments
if (typeof global.process === 'undefined') {
  const { worker } = require('./browser')
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  })
}
