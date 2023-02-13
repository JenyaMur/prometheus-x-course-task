import { render, screen, fireEvent } from '@testing-library/react';
import BookPriceData from '../book-price-data/bookPriceData';
import { PurchaseProvider } from '../../hoc/PurchaseProvider';
import userEvent from '@testing-library/user-event';

jest.mock("../../pages/Singlepage", () => () => {
  return <mock-environment data-testid="modal-environment"/>;
});

describe("testing form", () => {
    it('render form', () => {
    render(
        <PurchaseProvider>
            <mock-environment>
                <BookPriceData />
            </mock-environment>
        </PurchaseProvider>
        );
      expect(screen.getByTestId('form-component')).toBeInTheDocument();
    });

    it('check add count +1. Start value is 1, after fireEvent should be 2', () => {
    render(
        <PurchaseProvider>
            <mock-environment>
                <BookPriceData />
            </mock-environment>
        </PurchaseProvider>
        );
    const button = screen.getByTestId('add-book');
    fireEvent.click(button);
    expect(screen.getByText(/2 book/i)).toBeInTheDocument();
    });

    it('check minus count -1. Start value is 1, after fireEvent should be 0', () => {
    render(
        <PurchaseProvider>
            <mock-environment>
                <BookPriceData/>
            </mock-environment>
        </PurchaseProvider>
        );
    const buttonMinus = screen.getByTestId('minus-book')
    fireEvent.click(buttonMinus);
    expect(screen.getByText(/0 book/i)).toBeInTheDocument();
    });

    it('check changing totalPrice. Start price is 5.01, after adding 10 books should be 50.10', () => {
    render(
        <PurchaseProvider>
            <mock-environment>
                <BookPriceData price="5.01"/>
            </mock-environment>
        </PurchaseProvider>
        );
    const input = screen.getByTestId('inputBookValue')
    userEvent.type(input, '{backspace}');
    userEvent.type(input, '10');
    expect(screen.getByText(/50.10 \$/i)).toBeInTheDocument()
    });
});

