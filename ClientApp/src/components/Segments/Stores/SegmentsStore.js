import { EventEmitter } from "events";
import Dispatcher from "../Components/SegmentsDispatcher";
import ActionTypes from "../Actions/ActionTypes";

let _segments = [];

function createPoint(id, name) {
  return { id, name };
}

const _points = [
  createPoint(1, "Rusinowa Polana"),
  createPoint(2, "Łysa Polana"),
  createPoint(3, "Gęsia Szyja"),
  createPoint(4, "Rówień Waksmundzka"),
  createPoint(5, "Psia Trawka"),
  createPoint(6, "Wodogrzmoty Mickiewicza"),
  createPoint(7, "Schronisko PTTK nad Morskim Okiem")
];

let _selectedSegmentId = -1;

class SegmentsStore extends EventEmitter {
  addChangeListener(callback) {
    this.on("change", callback);
  }

  removeChangeListener(callback) {
    this.removeListener("change", callback);
  }

  emitChange() {
    this.emit("change");
  }

  getSegments() {
    return _segments;
  }

  getSegmentById(id) {
    return _segments.find(segment => segment.id === id) || { id: id };
  }

  getPoints() {
    return _points;
  }

  getPointById(id) {
    return _points.find(point => point.id === id);
  }

  getSelectedSegmentId() {
    return _selectedSegmentId;
  }

  getSelectedSegment() {
    return _selectedSegmentId !== -1
      ? this.getSegmentById(_selectedSegmentId)
      : null;
  }
}

Dispatcher.register(action => {
  switch (action.actionType) {
    case ActionTypes.SAVE_SEGMENT: {
      if (!_segments.find(segment => segment.id === action.segment.id)) {
        _segments.push(action.segment);
      } else {
        _segments = _segments.map(segment =>
          segment.id === action.segment.id ? action.segment : segment
        );
      }
      store.emitChange();
      break;
    }
    case ActionTypes.SEGMENT_SELECTED: {
      _selectedSegmentId = action.id;
      store.emitChange();
      break;
    }
    case ActionTypes.LOAD_SEGMENTS: {
      _segments = action.segments;
      store.emitChange();
      break;
    }
    case ActionTypes.NEW_SEGMENT: {
      _selectedSegmentId = action.newSegmentId;
      store.emitChange();
      break;
    }
    default:
  }
});

const store = new SegmentsStore();
export default store;
