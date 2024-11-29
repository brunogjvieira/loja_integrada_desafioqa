// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-plugin-api'
import './apiCommands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora erros específicos que envolvem sendMetrics e carregarMinicart
  if (err.message.includes('sendMetrics is not defined') || err.message.includes('carregarMinicart is not defined')) {
      return false; 
  }
  return true; 
});
