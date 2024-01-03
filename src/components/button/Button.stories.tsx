import { Button } from "./Button"
import { Meta, StoryObj } from "@storybook/react"

export default {
    title: "Components/Button",
    component: Button
} as Meta<Button>

export const Test: StoryObj<Button> = {
    args:{
        children: "teste"
    }
}