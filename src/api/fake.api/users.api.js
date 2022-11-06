import { professionsObject as professions } from './professions.api'
import { qualities } from './qualities.api'

const users = [
  {
    _id: '67rdca3eeb7f6fgeed471815',
    name: 'John Dorian',
    email: 'Jony7351@tw.com',
    sex: 'male',
    profession: professions.doctor,
    qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471816',
    name: 'Coke',
    email: 'white4571@twipet.com',
    sex: 'male',
    profession: professions.doctor,
    qualities: [qualities.troll, qualities.handsome, qualities.alcoholic],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471817',
    name: 'Bob Kelsy',
    email: 'bob007@tw.com',
    sex: 'male',
    profession: professions.doctor,
    qualities: [qualities.troll],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471818',
    name: 'Rachel Green',
    email: 'green7311@fam.biz',
    sex: 'female',
    profession: professions.waiter,
    qualities: [qualities.uncertain],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471819',
    name: 'Sheldon Cooper',
    email: 'mindgames6878@phis.tech',
    sex: 'male',
    profession: professions.physicist,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471820',
    name: 'Leonard Hofstadter',
    email: 'mindes000@phis.tech',
    sex: 'male',
    profession: professions.physicist,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471821',
    name: 'Howard Lobkowitz',
    email: 'gov1903@phis.tech',
    sex: 'male',
    profession: professions.engineer,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471822',
    name: 'Nikola Tesla',
    email: 'electro@underground.tech',
    sex: 'male',
    profession: professions.engineer,
    qualities: [qualities.handsome],
    completedMeetings: 72,
    rate: 5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471823',
    name: 'Monica Geller',
    email: 'mono@super.com',
    sex: 'female',
    profession: professions.cook,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471824',
    name: 'Ratatouille',
    email: 'ratatatata@underground.com',
    sex: 'male',
    profession: professions.cook,
    qualities: [qualities.handsome, qualities.troll],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed47181f',
    name: 'Joey Tribesman',
    email: 'joe@trib.com',
    sex: 'male',
    profession: professions.actor,
    qualities: [qualities.uncertain, qualities.strange],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed47181r',
    name: 'Brad Pitt',
    email: 'superstar@star.com',
    sex: 'male',
    profession: professions.actor,
    qualities: [qualities.handsome],
    completedMeetings: 434,
    rate: 5,
    bookmark: false
  }
]

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users))
}

const fetchAll = () =>
  new Promise((resolve) => {
    // window.setTimeout(function () {
    resolve(JSON.parse(localStorage.getItem('users')))
    // }, 2000)
  })

const update = (id, data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem('users'))
    const userIndex = users.findIndex((u) => u._id === id)
    users[userIndex] = { ...users[userIndex], ...data }
    localStorage.setItem('users', JSON.stringify(users))
    resolve(users[userIndex])
  })

const getById = (id) =>
  new Promise((resolve) => {
    // window.setTimeout(function () {
    resolve(
      JSON.parse(localStorage.getItem('users')).find((user) => user._id === id)
    )
    // }, 1000)
  })

export default {
  fetchAll,
  getById,
  update
}
