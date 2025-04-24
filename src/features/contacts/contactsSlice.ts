import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Contact } from '../../types/Contact'

interface ContactState {
  list: Contact[]
}

const initialState: ContactState = {
  list: []
}

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.list.push(action.payload)
    },
    removeContact(state, action: PayloadAction<string>) {
      state.list = state.list.filter(contact => contact.id !== action.payload)
    },
    editContact(state, action: PayloadAction<Contact>) {
      const index = state.list.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    }
  }
})

export const { addContact, removeContact, editContact } = contactSlice.actions
export default contactSlice.reducer
