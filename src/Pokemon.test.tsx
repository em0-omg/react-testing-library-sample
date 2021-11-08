import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Pokemon from './Pokemon';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('aaa', () => {
  test('bbb', async () => {
    const abilities = [
      {
        ability: {
          name: 'test',
          url: 'https://test/1',
        },
      },
      {
        ability: {
          name: 'testr2',
          url: 'https://test/2',
        },
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: { abilities } });
    render(<Pokemon />);

    userEvent.type(screen.getByRole('textbox'), 'ditto');
    userEvent.click(screen.getByRole('button'));
    const returnedAbilities = await screen.findAllByRole('listitem');
    expect(returnedAbilities).toHaveLength(2);
  });
});

describe('ivalid pokemon name', () => {
  test('error ...', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error());
    render(<Pokemon />);
    userEvent.type(screen.getByRole('textbox'), 'aaabbb');
    userEvent.click(screen.getByRole('button'));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
});
