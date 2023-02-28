import { Component } from 'react';
import { FormContacts } from './FormContacts';
import { Contacts } from './Contacts';
import { Filter } from './Filter';

import { GlobalStyle } from './GlobalStyles';
import { Container } from './Container';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  addContact = newContact => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  onDeleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  searchContacts = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;

    return (
      <Container>
        <GlobalStyle />
        <h1>Phonebook</h1>
        <FormContacts onSave={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.searchContacts} />
        <Contacts
          contacts={this.getFilteredContacts()}
          onDelete={this.onDeleteContact}
        />
      </Container>
    );
  }
}
