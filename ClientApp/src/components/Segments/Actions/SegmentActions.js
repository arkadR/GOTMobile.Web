import Dispatcher from "../Components/SegmentsDispatcher";
import ActionTypes from "./ActionTypes";

import SegmentsApi from "../SegmentsApi.js";

export function saveSegment(segment) {
  segmentSelected(-1);
  Dispatcher.dispatch({
    actionType: ActionTypes.SAVE_SEGMENT,
    segment: segment
  });
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
      Dispatcher.dispatch({
        actionType: ActionTypes.LOAD_SEGMENTS,
        segments: segments
      });
    });
}

export function deleteSegment(id) {
  debugger;
  SegmentsApi.deleteSegment(id).then(response => {
    debugger;
    loadSegments();
  });
}

export function newSegmentButtonClicked() {
  Dispatcher.dispatch({
    actionType: ActionTypes.NEW_SEGMENT,
    newSegmentId: 1000
  });
}
