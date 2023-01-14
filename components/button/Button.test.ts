import { fireEvent, render, screen } from "@testing-library/svelte";
import Button from "./Button.svelte";

describe("Button", () => {
  it("renders correctly with defaults", () => {
    render(Button);
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("count increases on click", async () => {
    render(Button);
    const button = screen.getByRole("button");
    await fireEvent.click(button);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
