import Dispatcher from "../SegmentsDispatcher";
import ActionTypes from "./ActionTypes";

import SegmentsApi from "../SegmentsApi.js";

let newSegmentId = 1000;

export function saveSegment(segment) {
  segmentSelected(-1);
  SegmentsApi.saveSegment(segment).then(() => loadSegments());
}

export function segmentSelected(id) {
  Dispatcher.dispatch({
    actionType: ActionTypes.SEGMENT_SELECTED,
    id: id
  });
}

export function loadSegments() {
  SegmentsApi.getSegments()
    .then(response => response.json())
    .then(segments => {
      newSegmentId = Math.max(...segments.map(seg => seg.id)) + 1;
      Dispatcher.dispatch({
        actionType: ActionTypes.LOAD_SEGMENTS,
        segments: segments
      });
    });
}

export function loadSegments() {
  SegmentsApi.getPoints()
    .then(response => response.json())
    .then(points => {
      Dispatcher.dispatch({
        actionType: ActionTypes.LOAD_POINTS,
        points: points
      });
    });
}

export function deleteSegment(id) {
  SegmentsApi.deleteSegment(id).then(response => {
    segmentSelected(-1);
    loadSegments();
  });
}

export function newSegmentButtonClicked() {
  Dispatcher.dispatch({
    actionType: ActionTypes.NEW_SEGMENT,
    newSegmentId: newSegmentId
  });
}
