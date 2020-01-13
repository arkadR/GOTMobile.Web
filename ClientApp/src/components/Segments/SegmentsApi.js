import React, { Component } from "react";

class SegmentsApi extends Component {
  getSegments() {
    return fetch("api/segments");
  }

  getSegment(id) {
    return fetch(`api/segments/${id}`);
  }

  saveSegment(segment) {
    fetch(`api/segments/${segment.id}`, { method: "post" }).catch(err =>
      console.log(err)
    );
  }

  deleteSegment(id) {
    return fetch(`api/segments/${id}`, { method: "delete" });
  }
}
const api = new SegmentsApi();
export default api;
