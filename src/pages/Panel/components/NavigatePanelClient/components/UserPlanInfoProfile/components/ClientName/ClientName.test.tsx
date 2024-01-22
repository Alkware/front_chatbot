import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, test } from "vitest"
import { ClientName } from "./ClientName";


describe("TEST: <ClientName />", () => {

    beforeEach(() => {
        render(<ClientName />)
    })

    test("if the overlay is on the screen.", () => {
        const overlay = screen.getByTestId("test-display")
        expect(overlay).toBeInTheDocument();
    });

    test("if its possible to make 2 clicks and the overlay disappears from the screen.", async () => {
        // Encontra o elemento overlay na tela
        const overlay = screen.getByTestId("test-display")

        // Dispara 2 cliques no elemento overlay
        fireEvent.doubleClick(overlay)

        // Aguarda até que o overlay não esteje mais visivel.
        await waitFor(() => {
            expect(overlay).toHaveClass("data-[overlay=false]:hidden")
            expect(overlay).toHaveAttribute("data-overlay", "false")
        });
    });
})