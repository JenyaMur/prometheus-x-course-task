import { render, screen } from '@testing-library/react';
import BookPriceData from '../book-price-data/BookPriceData';
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

    it('check add count +1. Start value is 1, after userEvent should be 2', () => {
    render(
        <PurchaseProvider>
            <mock-environment>
                <BookPriceData />
            </mock-environment>
        </PurchaseProvider>
        );
    const button = screen.getByTestId('add-book');
    userEvent.click(button);
    expect(screen.getByDisplayValue(/2/i)).toBeInTheDocument();
    });

    it('check minus count -1. Start value is 1, after userEvent should be 0', () => {
    render(
        <PurchaseProvider>
            <mock-environment>
                <BookPriceData/>
            </mock-environment>
        </PurchaseProvider>
        );
    const buttonMinus = screen.getByTestId('minus-book')
    userEvent.click(buttonMinus);
    expect(screen.getByDisplayValue(/0/i)).toBeInTheDocument();
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

