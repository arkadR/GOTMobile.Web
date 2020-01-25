import React, { Component } from "react";

class SegmentsApi extends Component {
  getSegments() {
    return fetch("api/segments");
  }

  getSegment(id) {
    return fetch(`api/segments/${id}`);
  }

  saveSegment(segment) {
    segment.points = parseInt(segment.points);
    segment.pointsBack = parseInt(segment.pointsBack);
    segment.length = parseInt(segment.length);
    return fetch(`api/segments`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(segment)
    }).catch(err => console.log(err));
  }

  deleteSegment(id) {
    return fetch(`api/segments/${id}`, { method: "delete" });
  }

  getPoints() {
    return fetch(`api/points`);
  }
}
const api = new SegmentsApi();
export default api;
