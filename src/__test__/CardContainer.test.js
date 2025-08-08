import {cleanup, render, screen} from '@testing-library/react';
import CardContainer from '../Components/CardContainer/CardContainer';

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [{id: 1, name: 'Rick Sanchez', image: 'img-url'}],
        }),
    })
  );
});

afterEach(() => {
  cleanup();
});

const mockProps = {
  error: null,
  shuffleCards: [],
  fetchedData: [],
  setClickedCards: jest.fn(),
  clickedCards: [],
  setGameOver: jest.fn(),
  setFetchedDataState: jest.fn(),
  setShuffleCardsState: jest.fn(),
  setErrorState: jest.fn(),
};

describe('CardContainer.js', () => {
  test('renders loading message when shuffleCards is empty and no error', () => {
    render(<CardContainer {...mockProps} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error message when error is present', () => {
    const errorProps = {
      ...mockProps,
      error: {message: 'API failed'},
    };
    render(<CardContainer {...errorProps} />);
    expect(screen.getByText(/Error: API failed/i)).toBeInTheDocument();
  });

  test('calls setFetchedDataState after fetch resolves', async () => {
    const mockSetFetched = jest.fn();
    render(<CardContainer {...mockProps} setFetchedDataState={mockSetFetched} />);
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();

    // Wait for promise to resolve (simulate lifecycle finishing)
    await new Promise(r => setTimeout(r, 0));

    expect(mockSetFetched).toHaveBeenCalled();
  });

  test('does not call setFetchedDataState if component unmounts before fetch resolves', async () => {
    const mockSetFetched = jest.fn();

    let resolveFetch;
    global.fetch = jest.fn(
      () =>
        new Promise(res => {
          resolveFetch = res;
        })
    );

    const {unmount} = render(<CardContainer {...mockProps} setFetchedDataState={mockSetFetched} />);

    unmount();

    resolveFetch({
      json: () =>
        Promise.resolve({
          results: [{id: 1, name: 'Rick', image: 'img-url'}],
        }),
    });

    // Wait for any microtasks (if any handlers queued up)
    await new Promise(r => setTimeout(r, 0));

    expect(mockSetFetched).not.toHaveBeenCalled();
  });

  test('renders character cards when shuffleCards has data', () => {
    const cardsProps = {
      ...mockProps,
      shuffleCards: [
        {id: 1, name: 'Rick', image: 'rick.png'},
        {id: 2, name: 'Morty', image: 'morty.png'},
      ],
    };

    render(<CardContainer {...cardsProps} />);
    expect(screen.getByText('Rick')).toBeInTheDocument();
    expect(screen.getByText('Morty')).toBeInTheDocument();
  });

  test('shuffleFetchedValue shuffles and sets shuffled array', () => {
    const mockSetShuffle = jest.fn();
    const dummyFetchedData = [
      {id: 1, name: 'A'},
      {id: 2, name: 'B'},
      {id: 3, name: 'C'},
    ];

    const instance = new CardContainer({
      ...mockProps,
      fetchedData: dummyFetchedData,
      setShuffleCardsState: mockSetShuffle,
    });

    instance.shuffleFetchedValue();

    // Should call setShuffleCardsState once
    expect(mockSetShuffle).toHaveBeenCalledTimes(1);

    const shuffled = mockSetShuffle.mock.calls[0][0];
    expect(shuffled).toHaveLength(3);
    expect(shuffled).toEqual(expect.arrayContaining(dummyFetchedData));
  });
});
