const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${api}/contacts`, { headers })
    .then(res => res.json())
    .then(data => data.contacts)

export const remove = (contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact)

export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const getAllLocal = () => {
  const promise = new Promise(resolve =>{
    let contacts = localStorage.contacts || '[]';
    resolve(JSON.parse(contacts));
  });
  return promise;
}
export const removeLocal = (contact) => {
  const promise = new Promise(resolve => {
    let contacts = JSON.parse(localStorage.contacts || '[]');
    if(contacts) {
      contacts = contacts.filter(c=>c.id!==contact.id);
      localStorage.contacts = JSON.stringify(contacts);
    }
    resolve(contact);
  });
  return promise;
}
export const createLocal = (body) => {
  const promise = new Promise(resolve => {
    const contacts = JSON.parse(localStorage.contacts || '[]');
    let newContact={};
    if(contacts) {
      newContact = {
        id: Math.random().toString(36).substr(-8),
        name: body.name,
        avatarURL: body.avatarURL,
        email: body.email
      };

      contacts.push(newContact);
      localStorage.contacts = JSON.stringify(contacts);
    }
    resolve(newContact);
  });
  return promise;
}
