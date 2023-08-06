import { createStore } from 'vuex';
import { shallowMount } from '@vue/test-utils';

import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../mock-data/test-journal-state';

import EntryList from '@/modules/daybook/components/EntryList';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe('Pruebas en el EntryList', () => {
  // const journalMockModule = {
  //     namespaced: true,
  //     getters:{
  //         //getEntriesByTerm: () => (id) => []
  //         getEntriesByTerm,
  //     },
  //     state: () => ({
  //         isLoading: false,
  //         entries: journalState.entries
  //     })
  // }

  // const store = createStore({
  //     modules:{
  //         journal: {...journalMockModule}
  //     }
  // })

  const store = createVuexStore(journalState);
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test('Debe de llamar el getEntriesByTerm sin termino y mostrar una entrada', () => {
    expect(wrapper.findAll('entry-stub').length).toBe(1);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('debe llamar el getEntriesByTerm y filtrar las entradas', async () => {
    const input = wrapper.find('input');
    await input.setValue('prueba');
    expect(wrapper.findAll('entry-stub').length).toBe(1);
  });

  test('El botón nuevo debe redireccioonar a new', () => {
    wrapper.find('button').trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: { id: 'new' },
    });
  });
});
