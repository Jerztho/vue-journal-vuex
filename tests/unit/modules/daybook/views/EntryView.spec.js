import { createStore } from 'vuex';
import { shallowMount } from '@vue/test-utils';

import Swal from 'sweetalert2';

import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../mock-data/test-journal-state';
import EntryView from '@/modules/daybook/views/EntryView';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe('Pruebas en el entry view', () => {
  const store = createVuexStore(journalState);
  store.dispatch = jest.fn();

  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: '-N_a3hVkNM4krCAqxq27',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test('debe de sacar al usuario porque el id no existe', () => {
    const wrapper = shallowMount(EntryView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
      props: {
        id: 'Este id no existe en el store',
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });

  test('debe de mostrar la entrada correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test('debe borrar la entrada y salir', async () => {
    await Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));
    await wrapper.find('.btn-danger').trigger('click');
    //expect(mockRouter.push).toHaveBeenCalled();
    setTimeout(() => {
        expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-N_a3hVkNM4krCAqxq27')
      expect(mockRouter.push).toHaveBeenCalled();
      done();
    }, 10);
  });
});
