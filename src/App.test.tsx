import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { getUser } from './get-user';
import { mocked } from 'ts-jest/utils';

jest.mock('./get-user');
const mockGetUser = mocked(getUser, true);

describe('When everything is OK', () => {
  beforeEach(async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
  });

  test('render the App without crashing', () => {
    screen.debug();
  });

  test('should select the children that is being passed to the CustomInput component', () => {
    screen.getAllByText(/Input/);
    let error;
    try {
      screen.getAllByText('Input');
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  test('role, input element', () => {
    screen.getAllByRole('textbox');
    expect(screen.getAllByRole('textbox').length).toBe(1);
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument();
  });

  test('placeholder text', () => {
    screen.getAllByPlaceholderText('Example');
  });

  test('query by role', () => {
    expect(screen.queryAllByRole('textbox')).not.toBeNull();
  });
});

describe('get user successfully', () => {
  beforeEach(() => {
    mockGetUser.mockClear();
  });

  test('call getUser once', async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  });

  test('should render the username passed', async () => {
    const name = 'John';
    // mockGetUser.mockImplementationOnce(() =>
    //   Promise.resolve({ id: '1', name })
    // );
    mockGetUser.mockResolvedValueOnce({ id: '1', name });
    render(<App />);
    expect(screen.queryByAltText(/Username/)).toBeNull();
    expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument();
  });
});

describe('user enters some text in the input element', () => {
  test('should display the text in the screen', async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());

    const name = 'David';

    expect(screen.getByText(/You typed: .../)).toBeInTheDocument();

    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: name },
    // });

    userEvent.type(screen.getByRole('textbox'), 'David');

    expect(await screen.findByText(`You typed: ${name}`)).toBeInTheDocument();
  });
});
