import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { addContact, editContact } from './contactsSlice'
import { Contact } from '../../types/Contact'
import { v4 as uuidv4 } from 'uuid'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
  max-width: 400px;
  margin: 1rem auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`

const Button = styled.button`
  padding: 0.5rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`

const ContactForm = () => {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newContact: Contact = {
      id: uuidv4(),
      name: form.name,
      email: form.email,
      phone: form.phone,
    }
    dispatch(addContact(newContact))
    setForm({ name: '', email: '', phone: '' })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Nome completo"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        type="tel"
        name="phone"
        placeholder="Telefone"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <Button type="submit">Adicionar Contato</Button>
    </Form>
  )
}

export default ContactForm
