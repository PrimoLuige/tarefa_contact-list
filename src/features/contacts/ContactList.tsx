import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { removeContact, editContact } from './contactsSlice'
import { Contact } from '../../types/Contact'

const List = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: 1rem auto;
`

const Item = styled.li`
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`

const Button = styled.button`
  margin-right: 10px;
  padding: 0.3rem 0.6rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`

const EditButton = styled(Button)`
  background-color: #3498db;

  &:hover {
    background-color: #2980b9;
  }
`

const Input = styled.input`
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  display: block;
  width: 100%;
`

const ContactList = () => {
  const contacts = useSelector((state: RootState) => state.contacts.list)
  const dispatch = useDispatch()

  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Omit<Contact, 'id'>>({
    name: '',
    email: '',
    phone: '',
  })

  const handleEditClick = (contact: Contact) => {
    setEditId(contact.id)
    setEditData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    })
  }

  const handleSave = () => {
    if (editId) {
      dispatch(editContact({ id: editId, ...editData }))
      setEditId(null)
    }
  }

  return (
    <List>
      {contacts.map((contact) => (
        <Item key={contact.id}>
          {editId === contact.id ? (
            <>
              <Input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
              <Input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
              <Input
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              />
              <EditButton onClick={handleSave}>Salvar</EditButton>
              <Button onClick={() => setEditId(null)}>Cancelar</Button>
            </>
          ) : (
            <>
              <p><strong>Nome:</strong> {contact.name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Telefone:</strong> {contact.phone}</p>
              <EditButton onClick={() => handleEditClick(contact)}>Editar</EditButton>
              <Button onClick={() => dispatch(removeContact(contact.id))}>Remover</Button>
            </>
          )}
        </Item>
      ))}
    </List>
  )
}

export default ContactList
