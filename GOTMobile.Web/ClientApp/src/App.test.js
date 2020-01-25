import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { create, act } from "react-test-renderer";

import DeleteSegmentDialog from "./Segments/Components/DeleteSegmentDialog";
import SegmentsPage from "./Segments/Components/SegmentsPage";
import SegmentsForm from "./Segments/Components/SegmentForm";
import { Button, TableRow } from "@material-ui/core";

const noSegmentSelected = -1;

it("renders without crashing", async () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
    div
  );
  await new Promise(resolve => setTimeout(resolve, 1000));
});

describe("DeleteSegmentDialog component", () => {
  test("Matches the snapshot", () => {
    const dialog = create(<DeleteSegmentDialog />);
    expect(dialog.toJSON()).toMatchSnapshot();
  });
});

describe("Add segment button clicked", () => {
  test.only("Selecting same segment twice", async () => {
    const page = create(<SegmentsPage />);
    const instance = page.root;
    const button = instance.findByType(Button);
    act(() => button.props.onClick());
    // const form = instance.findByType(SegmentsForm);

    // expect(form.props.selectedSegment).not.toBe(-1);
  });

  test("Selecting same segment twice", async () => {
    //Arrange
    const page = create(<SegmentsPage />);
    const instance = page.root;
    const tableRow = instance.find(
      node => (node.id = "enhanced-table-checkbox-2")
    );
    const form = instance.findByType(SegmentsForm);

    //Act, Assert
    act(() => ReactTestUtils.Simulate.click(tableRow));
    expect(form.props.selectedSegment).not.toBe(noSegmentSelected);

    act(() => ReactTestUtils.Simulate.click(tableRow));
    await waitForDomChange();
    expect(form.props.selectedSegment).toBe(noSegmentSelected);
  });
});
