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
mxn.register("google",{Mapstraction:{init:function(a,b){var c=this;if(typeof GMap2==="undefined"){throw new Error(b+" map script not imported")}if(!GBrowserIsCompatible()){throw new Error("This browser is not compatible with Google Maps")}this.controls={pan:null,zoom:null,overview:null,scale:null,map_type:null};this.maps[b]=new GMap2(a);GEvent.addListener(this.maps[b],"click",function(f,e){if(f&&f.mapstraction_marker){f.mapstraction_marker.click.fire()}else{if(e){c.click.fire({location:new mxn.LatLonPoint(e.y,e.x)})}}if(e){c.clickHandler(e.y,e.x,e,c)}});GEvent.addListener(this.maps[b],"moveend",function(){c.moveendHandler(c);c.endPan.fire()});GEvent.addListener(this.maps[b],"zoomend",function(){c.changeZoom.fire()});var d=GEvent.addListener(this.maps[b],"tilesloaded",function(){c.load.fire();GEvent.removeListener(d)});this.loaded[b]=true;c.load.fire()},applyOptions:function(){var a=this.maps[this.api];if(this.options.enableScrollWheelZoom){a.enableContinuousZoom();a.enableScrollWheelZoom()}if(this.options.enableDragging){a.enableDragging()}else{a.disableDragging()}},resizeTo:function(b,a){this.currentElement.style.width=b;this.currentElement.style.height=a;this.maps[this.api].checkResize()},addControls:function(a){var b=this.maps[this.api];if("zoom" in a||("pan" in a&&a.pan)){if(a.pan||a.zoom=="small"){this.addSmallControls()}else{if(a.zoom=="large"){this.addLargeControls()}}}else{if(this.controls.zoom!==null){b.removeControl(this.controls.zoom);this.controls.zoom=null}}if("overview" in a&&a.overview){if(this.controls.overview===null){this.controls.overview=new GOverviewMapControl();b.addControl(this.controls.overview)}}else{if(this.controls.overview!==null){b.removeControl(this.controls.overview);this.controls.overview=null}}if("scale" in a&&a.scale){if(this.controls.scale===null){this.controls.scale=new GScaleControl();b.addControl(this.controls.scale)}}else{if(this.controls.scale!==null){b.removeControl(this.controls.scale);this.controls.scale=null}}if("map_type" in a&&a.map_type){this.addMapTypeControls()}else{if(this.controls.map_type!==null){b.removeControl(this.controls.map_type);this.controls.map_type=null}}},addSmallControls:function(){var a=this.maps[this.api];if(this.controls.zoom!==null){a.removeControl(this.controls.zoom)}this.controls.zoom=new GSmallMapControl();a.addControl(this.controls.zoom)},addLargeControls:function(){var a=this.maps[this.api];if(this.controls.zoom!==null){a.removeControl(this.controls.zoom)}this.controls.zoom=new GLargeMapControl();a.addControl(this.controls.zoom)},addMapTypeControls:function(){var a=this.maps[this.api];if(this.controls.map_type===null){this.controls.map_type=new GMapTypeControl();a.addControl(this.controls.map_type)}},setCenterAndZoom:function(a,b){var d=this.maps[this.api];var c=a.toProprietary(this.api);d.setCenter(c,b)},addMarker:function(b,a){var d=this.maps[this.api];var c=b.toProprietary(this.api);d.addOverlay(c);GEvent.addListener(c,"infowindowopen",function(){b.openInfoBubble.fire()});GEvent.addListener(c,"infowindowclose",function(){b.closeInfoBubble.fire()});return c},removeMarker:function(a){var b=this.maps[this.api];b.removeOverlay(a.proprietary_marker)},declutterMarkers:function(a){throw new Error("Mapstraction.declutterMarkers is not currently supported by provider "+this.api)},addPolyline:function(b,a){var c=this.maps[this.api];gpolyline=b.toProprietary(this.api);c.addOverlay(gpolyline);return gpolyline},removePolyline:function(a){var b=this.maps[this.api];b.removeOverlay(a.proprietary_polyline)},getCenter:function(){var c=this.maps[this.api];var b=c.getCenter();var a=new mxn.LatLonPoint(b.lat(),b.lng());return a},setCenter:function(a,b){var d=this.maps[this.api];var c=a.toProprietary(this.api);if(b&&b.pan){d.panTo(c)}else{d.setCenter(c)}},setZoom:function(a){var b=this.maps[this.api];b.setZoom(a)},getZoom:function(){var a=this.maps[this.api];return a.getZoom()},getZoomLevelForBoundingBox:function(f){var e=this.maps[this.api];var d=f.getNorthEast();var a=f.getSouthWest();var b=new GLatLngBounds(a.toProprietary(this.api),d.toProprietary(this.api));var c=e.getBoundsZoomLevel(b);return c},setMapType:function(a){var b=this.maps[this.api];switch(a){case mxn.Mapstraction.ROAD:b.setMapType(G_NORMAL_MAP);break;case mxn.Mapstraction.SATELLITE:b.setMapType(G_SATELLITE_MAP);break;case mxn.Mapstraction.HYBRID:b.setMapType(G_HYBRID_MAP);break;case mxn.Mapstraction.PHYSICAL:b.setMapType(G_PHYSICAL_MAP);break;default:b.setMapType(a||G_NORMAL_MAP)}},getMapType:function(){var b=this.maps[this.api];var a=b.getCurrentMapType();switch(a){case G_NORMAL_MAP:return mxn.Mapstraction.ROAD;case G_SATELLITE_MAP:return mxn.Mapstraction.SATELLITE;case G_HYBRID_MAP:return mxn.Mapstraction.HYBRID;case G_PHYSICAL_MAP:return mxn.Mapstraction.PHYSICAL;default:return null}},getBounds:function(){var f=this.maps[this.api];var e,a,b,d;var c=f.getBounds();a=c.getSouthWest();e=c.getNorthEast();return new mxn.BoundingBox(a.lat(),a.lng(),e.lat(),e.lng())},setBounds:function(b){var d=this.maps[this.api];var a=b.getSouthWest();var c=b.getNorthEast();var e=new GLatLngBounds(new GLatLng(a.lat,a.lon),new GLatLng(c.lat,c.lon));d.setCenter(e.getCenter(),d.getBoundsZoomLevel(e))},addImageOverlay:function(c,a,e,i,f,g,d,h){var b=this.maps[this.api];b.getPane(G_MAP_MAP_PANE).appendChild(h.imgElm);this.setImageOpacity(c,e);this.setImagePosition(c);GEvent.bind(b,"zoomend",this,function(){this.setImagePosition(c)});GEvent.bind(b,"moveend",this,function(){this.setImagePosition(c)})},setImagePosition:function(e,b){var d=this.maps[this.api];var c;var a;c=d.fromLatLngToDivPixel(new GLatLng(b.latLng.top,b.latLng.left));a=d.fromLatLngToDivPixel(new GLatLng(b.latLng.bottom,b.latLng.right));b.pixels.top=c.y;b.pixels.left=c.x;b.pixels.bottom=a.y;b.pixels.right=a.x},addOverlay:function(a,b){var d=this.maps[this.api];var c=new GGeoXml(a);if(b){GEvent.addListener(c,"load",function(){c.gotoDefaultViewport(d)})}d.addOverlay(c)},addTileLayer:function(i,c,g,j,h,e,k,b){var d=new GCopyright(1,new GLatLngBounds(new GLatLng(-90,-180),new GLatLng(90,180)),0,g);var f=new GCopyrightCollection(j);f.addCopyright(d);var a=new GTileLayer(f,h,e);a.isPng=function(){return true};a.getOpacity=function(){return c};a.getTileUrl=function(n,m){var o=mxn.util.sanitizeTileURL(i);if(typeof b!=="undefined"){o=mxn.util.getSubdomainTileURL(o,b)}o=o.replace(/\{Z\}/gi,m);o=o.replace(/\{X\}/gi,n.x);o=o.replace(/\{Y\}/gi,n.y);return o};if(k){var l=new GMapType(this.tilelayers,new GMercatorProjection(19),g,{errorMessage:"More "+g+" tiles coming soon"});this.maps[this.api].addMapType(l)}else{l=new GTileLayerOverlay(a);this.maps[this.api].addOverlay(l)}this.tileLayers.push([i,l,true]);return l},toggleTileLayer:function(b){for(var a=0;a<this.tileLayers.length;a++){if(this.tileLayers[a][0]==b){if(this.tileLayers[a][2]){this.maps[this.api].removeOverlay(this.tileLayers[a][1]);this.tileLayers[a][2]=false}else{this.maps[this.api].addOverlay(this.tileLayers[a][1]);this.tileLayers[a][2]=true}}}},getPixelRatio:function(){var e=this.maps[this.api];var b=G_NORMAL_MAP.getProjection();var f=e.getCenter();var d=e.getZoom();var c=b.fromLatLngToPixel(f,d);var a=b.fromPixelToLatLng(new GPoint(c.x+3,c.y+4),d);return 10000/a.distanceFrom(f)},mousePosition:function(a){var c=document.getElementById(a);if(c!==null){var b=this.maps[this.api];GEvent.addListener(b,"mousemove",function(d){var e=d.lat().toFixed(4)+" / "+d.lng().toFixed(4);c.innerHTML=e});c.innerHTML="0.0000 / 0.0000"}}},LatLonPoint:{toProprietary:function(){return new GLatLng(this.lat,this.lon)},fromProprietary:function(a){this.lat=a.lat();this.lon=a.lng()}},Marker:{toProprietary:function(){var e=this;var d,f,h,a;var i={};if(this.labelText){i.title=this.labelText}if(this.iconUrl){var g=new GIcon(G_DEFAULT_ICON,this.iconUrl);g.printImage=g.mozPrintImage=g.image;if(this.iconSize){g.iconSize=new GSize(this.iconSize[0],this.iconSize[1]);var c;if(this.iconAnchor){c=new GPoint(this.iconAnchor[0],this.iconAnchor[1])}else{c=new GPoint(this.iconSize[0]/2,this.iconSize[1]/2)}g.iconAnchor=c}if(typeof(this.iconShadowUrl)!="undefined"){g.shadow=this.iconShadowUrl;if(this.iconShadowSize){g.shadowSize=new GSize(this.iconShadowSize[0],this.iconShadowSize[1])}}else{g.shadow="";g.shadowSize=""}if(this.transparent){g.transparent=this.transparent}if(this.imageMap){g.imageMap=this.imageMap}i.icon=g}if(this.draggable){i.draggable=this.draggable}var b=new GMarker(this.location.toProprietary("google"),i);if(this.infoBubble){if(this.hover){f="mouseover"}else{f="click"}GEvent.addListener(b,f,function(){b.openInfoWindowHtml(e.infoBubble,{maxWidth:100})})}if(this.hoverIconUrl){GEvent.addListener(b,"mouseover",function(){b.setImage(e.hoverIconUrl)});GEvent.addListener(b,"mouseout",function(){b.setImage(e.iconUrl)})}if(this.infoDiv){if(this.hover){f="mouseover"}else{f="click"}GEvent.addListener(b,f,function(){document.getElementById(e.div).innerHTML=e.infoDiv})}return b},openBubble:function(){var a=this.proprietary_marker;a.openInfoWindowHtml(this.infoBubble)},closeBubble:function(){var a=this.proprietary_marker;a.closeInfoWindow()},hide:function(){this.proprietary_marker.hide()},show:function(){this.proprietary_marker.show()},update:function(){point=new mxn.LatLonPoint();point.fromProprietary("google",this.proprietary_marker.getPoint());this.location=point}},Polyline:{toProprietary:function(){var c=[];for(var a=0,b=this.points.length;a<b;a++){c.push(this.points[a].toProprietary("google"))}if(this.closed){if(!(this.points[0].equals(this.points[this.points.length-1]))){c.push(c[0])}}else{if(this.points[0].equals(this.points[this.points.length-1])){this.closed=true}}if(this.closed){this.proprietary_polyline=new GPolygon(c,this.color,this.width,this.opacity,this.fillColor,this.opacity)}else{this.proprietary_polyline=new GPolyline(c,this.color,this.width,this.opacity)}return this.proprietary_polyline},show:function(){this.proprietary_polyline.show()},hide:function(){this.proprietary_polyline.hide()}}});