import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mock-data/test-journal-state';
import { updateEntry } from '@/modules/daybook/store/journal/actions';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe('Vuex - Pruebas en el Jorunal Module', () => {
  //basicas
  test('Este es el estado inicia, debe tener este state', () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  //Mutations
  test('mutation: setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit('journal/setEntries', journalState.entries);

    expect(store.state.journal.entries.length).toBe(1);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test('mutation: updateEntry', () => {
    const store = createVuexStore(journalState);
    const updatedEntry = {
      id: '-N_a3hVkNM4krCAqxq27',
      date: 1689634633719,
      picture:
        'https://res.cloudinary.com/dq7jqpwcw/image/upload/v1689738468/ij2wrfuuqzmyok88mnqi.jpg',
      text: 'Captura de prueba xD',
    };

    store.commit('journal/updateEntry', updatedEntry);

    expect(store.state.journal.entries.length).toBe(1);
    expect(store.state.journal.entries[0]).toEqual(updatedEntry);
  });

  test('mutation: addEntry deleteEntry', () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    const newEntry = {
      id: 'ABC-123',
      date: 1689634633719,
      picture:
        '',
      text: 'Captura de pruebas',
    };
    store.commit('journal/addEntry', newEntry);

    let storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(1);
    expect(storeEntries.find(entry => entry.id === newEntry.id)).not.toBe(undefined);

    
    store.commit('journal/deleteEntry', newEntry.id);
    storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(0);
    expect(storeEntries.find(entry => entry.id === newEntry.id)).toBe(undefined);
  });

  //Getters--------------+
  test ('getters: getEntriesByTerm getEntryById', ()=>{
    const store = createVuexStore(journalState);

    const [entry1] = journalState.entries;

    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(1);
    expect(store.getters['journal/getEntriesByTerm']('prueba')).toEqual([entry1]);

    expect(store.getters['journal/getEntryById']('-N_a3hVkNM4krCAqxq27')).toEqual(entry1);
  });

  //Actions================
  test ('actions: loadEntries', async ()=>{
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch('journal/loadEntries')

    expect(store.state.journal.entries.length).toBe(1);
  });

  test ('actions: updateEntry', async ()=>{
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: '-N_a3hVkNM4krCAqxq27',
      date: 1689634633719,
      picture:
        'https://res.cloudinary.com/dq7jqpwcw/image/upload/v1689738468/ij2wrfuuqzmyok88mnqi.jpg',
      text: 'Captura de prueba XD',
    }

    await store.dispatch('journal/updateEntry', updatedEntry);

    expect(store.state.journal.entries.length).toBe(1);
    expect(store.state.journal.entries.find(e=>e.id === updatedEntry.id)).toEqual(updatedEntry);
  });

  test ('actions: createEntry y deleteEntry', async ()=>{
    const store = createVuexStore(journalState);
    const newEntry = {
      date: 1627077227978,
      text: 'Nueva entrada de pruebas'
    }

    const id = await store.dispatch('journal/createEntry', newEntry);

    expect(typeof id).toBe('string');
    expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy();

    await store.dispatch('journal/deleteEntry', id);

    expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy();
  });
});
