import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "./cart-item";

const product = {
  title: "Relógio bonito",
  price: "22.00",
  image:
    "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
};

describe("CartItem", () => {
  it("should render the component", () => {
    render(<CartItem product={product} />);

    expect(screen.getByTestId("cart-item")).toBeInTheDocument();
  });

  it("should display the proper content", () => {
    render(<CartItem product={product} />);

    expect(
      screen.getByText(new RegExp(product.title, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, "i"))
    ).toBeInTheDocument();
    expect(screen.getByTestId("image")).toHaveProperty("src", product.image);
    expect(screen.getByTestId("image")).toHaveProperty("alt", product.title);
  });

  it("should display 1 as initial quantity", () => {
    render(<CartItem product={product} />);

    expect(screen.getByTestId("quantity").textContent).toBe("1");
  });

  it("should increase quantity by 1 when plus button is clicked", () => {
    render(<CartItem product={product} />);

    const [, plusButton] = screen.getAllByRole("button");

    const quantity = screen.getByTestId("quantity");
    expect(quantity.textContent).toBe("1");
    fireEvent.click(plusButton);
    expect(quantity.textContent).toBe("2");
    fireEvent.click(plusButton);
    expect(quantity.textContent).toBe("3");
  });

  it("should decrease quantity by 1 when minus button is clicked", () => {
    render(<CartItem product={product} />);

    const quantity = screen.getByTestId("quantity");
    expect(quantity.textContent).toBe("1");

    const [minusButton, plusButton] = screen.getAllByRole("button");

    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(quantity.textContent).toBe("3");
    fireEvent.click(minusButton);
    expect(quantity.textContent).toBe("2");
    fireEvent.click(minusButton);
    expect(quantity.textContent).toBe("1");
    fireEvent.click(minusButton);
    expect(quantity.textContent).toBe("0");
  });

  it("should not go bellow 0 when minus button is repeatedly clicked", () => {
    render(<CartItem product={product} />);

    const quantity = screen.getByTestId("quantity");
    expect(quantity.textContent).toBe("1");

    const [minusButton] = screen.getAllByRole("button");

    expect(quantity.textContent).toBe("1");
    fireEvent.click(minusButton);
    expect(quantity.textContent).toBe("0");
    fireEvent.click(minusButton);
    expect(quantity.textContent).toBe("0");
    fireEvent.click(minusButton);
    expect(quantity.textContent).toBe("0");
  });
});
