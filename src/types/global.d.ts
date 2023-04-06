// module global {
//   declare 'react-router-dom'
// }
declare module "styled-components";
declare module "leaflet" {
  function animatedMarker(any, any): any;
  class AnimatedMarker {
    constructor(latlng: any, options?: any);
  }
  class Marker {
    initialize: (any, any) => any;
  }
}
// declare module "redux";

export {};
