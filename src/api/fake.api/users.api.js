export const professions = {
  doctor: { _id: '67rdca3eeb7f6fgeed471818', name: 'Doctor' },
  waiter: { _id: '67rdca3eeb7f6fgeed471820', name: 'Waiter' },
  physicist: { _id: '67rdca3eeb7f6fgeed471814', name: 'Physicist' },
  engineer: { _id: '67rdca3eeb7f6fgeed471822', name: 'Engineer' },
  actor: { _id: '67rdca3eeb7f6fgeed471824', name: 'Actor' },
  cook: { _id: '67rdca3eeb7f6fgeed471829', name: 'Cook' }
}

export const qualities = {
  tedious: {
    _id: '67rdca3eeb7f6fgeed471198',
    name: 'Tedious',
    color: 'primary'
  },
  strange: {
    _id: '67rdca3eeb7f6fgeed471100',
    name: 'Strange',
    color: 'secondary'
  },
  troll: { _id: '67rdca3eeb7f6fgeed4711012', name: 'Troll', color: 'success' },
  alcoholic: {
    _id: '67rdca3eeb7f6fgeed471101',
    name: 'Alcoholic',
    color: 'danger'
  },
  handsome: {
    _id: '67rdca3eeb7f6fgeed471102',
    name: 'Handsome',
    color: 'info'
  },
  uncertain: {
    _id: '67rdca3eeb7f6fgeed471103',
    name: 'Uncertain',
    color: 'dark'
  }
}

const users = [
  {
    _id: '67rdca3eeb7f6fgeed471815',
    name: 'John Dorian',
    profession: professions.doctor,
    qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471816',
    name: 'Coke',
    profession: professions.doctor,
    qualities: [qualities.troll, qualities.handsome, qualities.alcoholic],
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471817',
    name: 'Bob Kelsy',
    profession: professions.doctor,
    qualities: [qualities.troll],
    completedMeetings: 247,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471818',
    name: 'Rachel Green',
    profession: professions.waiter,
    qualities: [qualities.uncertain],
    completedMeetings: 148,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471819',
    name: 'Sheldon Cooper',
    profession: professions.physicist,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 37,
    rate: 4.6,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471820',
    name: 'Leonard Hofstadter',
    profession: professions.physicist,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 147,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471821',
    name: 'Howard Lobkowitz',
    profession: professions.engineer,
    qualities: [qualities.strange, qualities.tedious],
    completedMeetings: 72,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471822',
    name: 'Nikola Tesla',
    profession: professions.engineer,
    qualities: [qualities.handsome],
    completedMeetings: 72,
    rate: 5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471823',
    name: 'Monica Geller',
    profession: professions.cook,
    qualities: [qualities.strange, qualities.uncertain],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed471824',
    name: 'Ratatouille',
    profession: professions.cook,
    qualities: [qualities.handsome, qualities.troll],
    completedMeetings: 17,
    rate: 4.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed47181f',
    name: 'Joey Tribesman',
    profession: professions.actor,
    qualities: [qualities.uncertain, qualities.strange],
    completedMeetings: 434,
    rate: 3.5,
    bookmark: false
  },
  {
    _id: '67rdca3eeb7f6fgeed47181r',
    name: 'Brad Pitt',
    profession: professions.actor,
    qualities: [qualities.handsome],
    completedMeetings: 434,
    rate: 5,
    bookmark: false
  }
]

const fetchAll = () => {
  return users
}

export default {
  fetchAll
}
