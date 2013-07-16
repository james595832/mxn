/*
MAPSTRACTION   v3.0.20   http://www.mapstraction.com

The BSD 3-Clause License (http://www.opensource.org/licenses/BSD-3-Clause)

Copyright (c) 2013 Tom Carden, Steve Coast, Mikel Maron, Andrew Turner, Henri Bergius, Rob Moran, Derek Fowler, Gary Gale
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
mxn.register("ovi",{Mapstraction:{init:function(c,d){var e=this;var a;var f=false;var b={center:false,zoom:false,mapsize:false};if(typeof ovi.mapsapi.map.Display==="undefined"){throw new Error(d+" map script not imported")}a=new ovi.mapsapi.map.Display(c);a.addComponent(new ovi.mapsapi.map.component.InfoBubbles());a.addComponent(new ovi.mapsapi.map.component.Behavior());a.addListener("click",function(g){coords=a.pixelToGeo(g.targetX,g.targetY);e.click.fire({location:new mxn.LatLonPoint(coords.latitude,coords.longitude)})},false);a.addListener("mapviewchangestart",function(g){if(g.data&g.MAPVIEWCHANGE_CENTER){b.center=true}if(g.data&g.MAPVIEWCHANGE_ZOOM){b.zoom=true}if(g.data&g.MAPVIEWCHANGE_SIZE){b.mapsize=true}},false);a.addListener("mapviewchangeupdate",function(g){if(g.data&g.MAPVIEWCHANGE_CENTER){b.center=true}if(g.data&g.MAPVIEWCHANGE_ZOOM){b.zoom=true}if(g.data&g.MAPVIEWCHANGE_SIZE){b.mapsize=true}},false);a.addListener("mapviewchangeend",function(g){if(!f){if(b.center&&b.mapsize){f=true;b.mapsize=false;e.load.fire()}}else{if(b.center){b.center=false;e.moveendHandler(e);e.endPan.fire()}}if(b.zoom){b.zoom=false;e.changeZoom.fire()}},false);this.maps[d]=a;this.loaded[d]=true},applyOptions:function(){var b=this.maps[this.api];if(this.options.enableScrollWheelZoom){b.addComponent(new ovi.mapsapi.map.component.zoom.MouseWheel())}else{var a=b.getComponentById("zoom.MouseWheel");if(a){b.removeComponent(a)}}},resizeTo:function(b,a){this.currentElement.style.width=b;this.currentElement.style.height=a},addControls:function(a){var b=this.maps[this.api];var c=null;if("pan" in a&&a.pan){c=b.getComponentById("Behavior");if(c===null){b.addComponent(new ovi.mapsapi.map.component.Behavior())}}else{c=b.getComponentById("Behavior");if(c!==null){b.removeComponent(c)}}if("zoom" in a){if(a.zoom||a.zoom=="large"||a.zoom=="small"){this.addSmallControls()}}else{c=b.getComponentById("ZoomBar");if(c!==null){b.removeComponent(c)}}if("overview" in a&&a.overview){c=b.getComponentById("Overview");if(c===null){b.addComponent(new ovi.mapsapi.map.component.Overview())}}else{c=b.getComponentById("Overview");if(c!==null){b.removeComponent(c)}}if("scale" in a&&a.scale){c=b.getComponentById("ScaleBar");if(c===null){b.addComponent(new ovi.mapsapi.map.component.ScaleBar())}}else{c=b.getComponentById("ScaleBar");if(c!==null){b.removeComponent(c)}}if("map_type" in a&&a.map_type){this.addMapTypeControls()}else{c=b.getComponentById("TypeSelector");if(c!==null){b.removeComponent(c)}}},addSmallControls:function(){var a=this.maps[this.api];cid=a.getComponentById("ZoomBar");if(cid===null){a.addComponent(new ovi.mapsapi.map.component.ZoomBar())}},addLargeControls:function(){this.addSmallControls()},addMapTypeControls:function(){var a=this.maps[this.api];cid=a.getComponentById("TypeSelector");if(cid===null){a.addComponent(new ovi.mapsapi.map.component.TypeSelector())}},setCenterAndZoom:function(a,b){var d=this.maps[this.api];var c=a.toProprietary(this.api);d.setCenter(c);d.setZoomLevel(b)},addMarker:function(b,a){var c=this.maps[this.api];var d=b.toProprietary(this.api);c.objects.add(d);return d},removeMarker:function(a){var b=this.maps[this.api];b.objects.remove(a.proprietary_marker)},declutterMarkers:function(a){throw new Error("Mapstraction.declutterMarkers is not currently supported by provider "+this.api)},addPolyline:function(b,a){var d=this.maps[this.api];var c=b.toProprietary(this.api);d.objects.add(c);return c},removePolyline:function(a){var b=this.maps[this.api];b.objects.remove(a.proprietary_polyline)},getCenter:function(){var a=this.maps[this.api];return new mxn.LatLonPoint(a.center.latitude,a.center.longitude)},setCenter:function(a,b){var d=this.maps[this.api];var c=a.toProprietary(this.api);d.setCenter(c)},setZoom:function(a){var b=this.maps[this.api];b.setZoomLevel(a)},getZoom:function(){var a=this.maps[this.api];return a.zoomLevel},getZoomLevelForBoundingBox:function(e){var d=this.maps[this.api];var a=e.getSouthWest().toProprietary(this.api);var c=e.getNorthEast().toProprietary(this.api);var b=new ovi.mapsapi.geo.BoundingBox(a,c);return d.getBestZoomLevel(b)},setMapType:function(a){var b=this.maps[this.api];switch(a){case mxn.Mapstraction.ROAD:b.set("baseMapType",b.NORMAL);break;case mxn.Mapstraction.PHYSICAL:b.set("baseMapType",b.TERRAIN);break;case mxn.Mapstraction.HYBRID:b.set("baseMapType",b.SATELLITE);break;case mxn.Mapstraction.SATELLITE:b.set("baseMapType",b.SATELLITE);break;default:b.set("baseMapType",b.NORMAL);break}},getMapType:function(){var b=this.maps[this.api];var a=b.baseMapType;switch(a){case b.NORMAL:return mxn.Mapstraction.ROAD;case b.TERRAIN:return mxn.Mapstraction.PHYSICAL;case b.SATELLITE:return mxn.Mapstraction.SATELLITE;default:return null}},getBounds:function(){var c=this.maps[this.api];var d=c.getViewBounds();var a=d.topLeft;var b=d.bottomRight;return new mxn.BoundingBox(b.latitude,a.longitude,a.latitude,b.longitude)},setBounds:function(e){var h=this.maps[this.api];var a=e.getSouthWest();var g=e.getNorthEast();var c=new mxn.LatLonPoint(g.lat,a.lon).toProprietary(this.api);var f=new mxn.LatLonPoint(a.lat,g.lon).toProprietary(this.api);var b=new ovi.mapsapi.geo.BoundingBox(c,f);var d=false;h.zoomTo(b,d)},addImageOverlay:function(h,g,b,a,e,d,f,c){throw new Error("Mapstraction.addImageOverlay is not currently supported by provider "+this.api)},setImagePosition:function(b,a){throw new Error("Mapstraction.setImagePosition is not currently supported by provider "+this.api)},addOverlay:function(a,b){throw new Error("Mapstraction.addOverlay is not currently supported by provider "+this.api)},addTileLayer:function(h,d,c,b,f,g,e,a){throw new Error("Mapstraction.addTileLayer is not currently supported by provider "+this.api)},toggleTileLayer:function(a){throw new Error("Mapstraction.toggleTileLayer is not currently supported by provider "+this.api)},getPixelRatio:function(){throw new Error("Mapstraction.getPixelRatio is not currently supported by provider "+this.api)},mousePosition:function(a){var c=this.maps[this.api];var d=document.getElementById(a);var b;if(d!==null){c.addListener("mousemove",function(e){b=c.pixelToGeo(e.targetX,e.targetY);d.innerHTML=b.latitude.toFixed(4)+" / "+b.longitude.toFixed(4)},false);d.innerHTML="0.0000 / 0.0000"}}},LatLonPoint:{toProprietary:function(){return new ovi.mapsapi.geo.Coordinate(this.lat,this.lon)},fromProprietary:function(a){this.lat=a.latitude;this.lon=a.longitude;this.lng=this.lon}},Marker:{toProprietary:function(){var d={};var b=this;if(this.iconAnchor){d.anchor=[this.iconAnchor[0],this.iconAnchor[1]]}if(this.iconUrl){d.icon=this.iconUrl}this.proprietary_infobubble=null;var a=new ovi.mapsapi.map.Marker(b.location.toProprietary("ovi"),d);if(this.infoBubble){var c="click";if(this.hover){c="mouseover"}a.addListener(c,function(e){b.openBubble()},false)}if(this.draggable){a.enableDrag();a.addListener("dragstart",function(e){var f=b.map.getComponentById("InfoBubbles");if(f.bubbleExists(b.proprietary_infobubble)){b.closeBubble();a.set("restore_infobubble",true)}},false);a.addListener("dragend",function(e){var f=e.dataTransfer.getData("application/map-drag-object-offset");var h=b.map.pixelToGeo(e.displayX-f.x+a.anchor.x,e.displayY-f.y+a.anchor.y);var g=b.map.getBoundingBox();if(g.contains(h)){b.location.lat=h.latitude;b.location.lon=h.longitude;b.location.lng=b.location.lon}if(a.get("restore_infobubble")){a.set("restore_infobubble",false);b.openBubble()}},false)}a.addListener("click",function(e){a.mapstraction_marker.click.fire(e)},false);return a},openBubble:function(){if(!this.map){throw new Error("Marker.openBubble: This marker must be added to a map in order to manage a Bubble for provider "+this.api)}this.proprietary_infobubble=this.map.getComponentById("InfoBubbles").addBubble(this.infoBubble,this.location.toProprietary("ovi"))},closeBubble:function(){if(!this.map){throw new Error("Marker.closeBubble: This marker must be added to a map in order to manage a Bubble for provider "+this.api)}if(this.map.getComponentById("InfoBubbles").bubbleExists(this.proprietary_infobubble)){this.map.getComponentById("InfoBubbles").removeBubble(this.proprietary_infobubble)}this.proprietary_infobubble=null},hide:function(){this.proprietary_marker.set("visibility",false)},show:function(){this.proprietary_marker.set("visibility",true)},update:function(){throw new Error("Marker.update is not currently supported by provider "+this.api)}},Polyline:{toProprietary:function(){var g=[];for(var b=0,f=this.points.length;b<f;b++){g.push(this.points[b].toProprietary("ovi"))}if(this.closed){if(!(this.points[0].equals(this.points[this.points.length-1]))){g.push(g[0])}}else{if(this.points[0].equals(this.points[this.points.length-1])){this.closed=true}}if(this.closed){var d=new mxn.util.Color();d.setHexColor(this.color);var c="rgba("+d.red+","+d.green+","+d.blue+","+this.opacity+")";var e={visibility:true,fillColor:c,color:this.color,stroke:"solid",width:this.width};this.proprietary_polyline=new ovi.mapsapi.map.Polygon(g,e)}else{var a={visibility:true,color:this.color,stroke:"solid",width:this.width};this.proprietary_polyline=new ovi.mapsapi.map.Polyline(g,a)}return this.proprietary_polyline},show:function(){this.proprietary_polyline.set("visibility",true)},hide:function(){this.proprietary_polyline.set("visibility",false)}}});