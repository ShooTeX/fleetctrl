import { action } from "@ladle/react";
import { FaAd } from "react-icons/fa";
import { Button } from ".";

export default {
  title: "Components",
};
export const Story = () => (
  <div className="space-y-1">
    <Button onClick={action("onClick")}>click me</Button>
    <Button onClick={action("onClick")} Icon={FaAd}>
      click me
    </Button>
  </div>
);
Story.storyName = "Button";
