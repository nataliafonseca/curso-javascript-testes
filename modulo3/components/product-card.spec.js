import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./product-card";

const product = {
  title: "Relógio bonito",
  price: "22.00",
  image:
    "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
};

const addToCart = jest.fn();

describe("ProductCard", () => {
  it("should render the component", () => {
    render(<ProductCard product={product} addToCart={addToCart} />);

    expect(screen.getByTestId("product-card")).toBeInTheDocument();
  });

  it("should display the proper content", () => {
    render(<ProductCard product={product} addToCart={addToCart} />);

    expect(
      screen.getByText(new RegExp(product.title, "i"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, "i"))
    ).toBeInTheDocument();
    expect(screen.getByTestId("image")).toHaveStyle({
      backgroundImage: product.image,
    });
  });

  it("should call props.addToCart on button click", () => {
    render(<ProductCard product={product} addToCart={addToCart} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});