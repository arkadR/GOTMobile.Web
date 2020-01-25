import React, { useState, useEffect } from "react";
import SegmentsTable from "./SegmentsTable";
import SegmentForm from "./SegmentForm";
import SegmentsStore from "../Stores/SegmentsStore";
import { loadSegments } from "../Actions/SegmentActions";

export default function SegmentsPage(props) {
  const [segments, setSegments] = useState(SegmentsStore.getSegments());
  const [points, setPoints] = useState(SegmentsStore.getPoints());
  const [selectedSegment, setSelectedSegment] = useState(
    SegmentsStore.getSelectedSegment()
  );

  useEffect(() => {
    SegmentsStore.addChangeListener(() => {
      setSegments(SegmentsStore.getSegments());
      setPoints(SegmentsStore.getPoints());
      setSelectedSegment(SegmentsStore.getSelectedSegment());
    });
    if (SegmentsStore.getSegments().length === 0) {
      loadSegments();
    }
  });

  return (
    <>
      <SegmentsTable
        segments={segments}
        points={points}
        selectedSegmentId={selectedSegment ? selectedSegment.id : -1}
      />
      {selectedSegment && (
        <SegmentForm points={points} selectedSegment={selectedSegment} />
      )}
    </>
  );
}
