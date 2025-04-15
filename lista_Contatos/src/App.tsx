import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { GlobalStyle } from './components/GlobalStyle'
import ContactForm from './features/contacts/ContactForm'
import ContactList from './features/contacts/ContactList'

function App() {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <h1 style={{ textAlign: 'center' }}>Lista de Contatos</h1>
            <ContactForm />
            <ContactList />
        </Provider>
    )
}

export default App