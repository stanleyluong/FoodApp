(this.webpackJsonpfoodapp=this.webpackJsonpfoodapp||[]).push([[0],[,,,,,,,,,,function(e,t,n){e.exports=n(21)},,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),o=n(8),i=n.n(o),r=(n(15),n(6)),c=n.n(r),l=n(9),u=n(2),h=n(3),p=n(1),d=n(5),m=n(4),g=(n(17),n(18),n(19),function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=[this.props.business.location.address1,this.props.business.location.address2,this.props.business.location.address3,this.props.business.location.city,this.props.business.location.state,this.props.business.location.zip_code].filter((function(e){return""!==e})).join(" ").split(" ").join("+");return console.log(e,"formatted"),s.a.createElement("div",{className:"Business"},s.a.createElement("div",{className:"image-container"},s.a.createElement("img",{src:this.props.business.image_url,alt:""})),s.a.createElement("h2",null,this.props.business.name),s.a.createElement("div",{className:"Business-information"},s.a.createElement("div",{className:"Business-address"},s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"http://maps.google.com/maps?q=".concat(e)},s.a.createElement("p",null,this.props.business.location.address1),s.a.createElement("p",null,this.props.business.location.address2),s.a.createElement("p",null,this.props.business.location.address3),s.a.createElement("p",null,this.props.business.location.city," ",this.props.business.location.state),s.a.createElement("p",null,this.props.business.location.zip_code)),s.a.createElement("p",null,Math.floor(this.props.business.distance)," meters away")),s.a.createElement("div",{className:"Business-reviews"},s.a.createElement("h3",null,this.props.business.categories[0].title),s.a.createElement("h3",{className:"rating"},this.props.business.rating," Stars"),s.a.createElement("p",null,this.props.business.review_count," Reviews"))))}}]),n}(s.a.Component)),b=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return s.a.createElement("div",{className:"BusinessList"},this.props.businesses.map((function(e){return s.a.createElement(g,{key:e.id,business:e})})))}}]),n}(s.a.Component),f=(n(20),function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={term:"",location:"",sortBy:"best_match",placeholder:"Near..."},a.handleTermChange=a.handleTermChange.bind(Object(p.a)(a)),a.handleLocationChange=a.handleLocationChange.bind(Object(p.a)(a)),a.handleSortByChange=a.handleSortByChange.bind(Object(p.a)(a)),a.handleSearch=a.handleSearch.bind(Object(p.a)(a)),a.sortByOptions={"Best Match":"best_match","Highest Rated":"rating","Most Reviewed":"review_count",Distance:"distance"},a}return Object(h.a)(n,[{key:"getSortByClass",value:function(e){return this.state.sortBy===e?"active":""}},{key:"handleSortByChange",value:function(e){this.setState({sortBy:e})}},{key:"handleTermChange",value:function(e){this.setState({term:e.target.value})}},{key:"handleLocationChange",value:function(e){this.setState({location:e.target.value})}},{key:"handleSearch",value:function(e){console.log(this.state.term,this.state.location,this.state.sortBy),this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy),e.preventDefault()}},{key:"renderSortByOptions",value:function(){var e=this;return Object.keys(this.sortByOptions).map((function(t){var n=e.sortByOptions[t];return s.a.createElement("li",{onClick:e.handleSortByChange.bind(e,n),className:e.getSortByClass(n),key:n},t)}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"SearchBar"},s.a.createElement("div",{className:"SearchBar-sort-options"},s.a.createElement("ul",null,this.renderSortByOptions())),s.a.createElement("div",{className:"SearchBar-fields"},s.a.createElement("form",{onSubmit:this.handleSearch},s.a.createElement("input",{onChange:this.handleTermChange,placeholder:"Find..."}),s.a.createElement("input",{onChange:this.handleLocationChange,placeholder:this.props.placeholder}),s.a.createElement("button",{onClick:this.handleSearch,className:"SearchBar-submit"},"Let's Go"))))}}]),n}(s.a.Component)),v="7R8guCX9uPFAVZ5J4nrHFt8c402C8uWMCIZnyD2MEUKl6tI5nHFGHObPB26_kp3DfmRItpDo2fVyH9uOLX7v9PdKuDsQF9IKufojEO1Wj68hxrcwwIxfXGYrwh2KX3Yx",y={search:function(e,t,n){return fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=".concat(e,"&location=").concat(t,"&sort_by=").concat(n,"&limit=50"),{headers:{Authorization:"Bearer ".concat(v)}}).then((function(e){return e.json()})).then((function(e){if(e.businesses)return e.businesses.map((function(e){return console.log(e),{id:e.id,alias:e.alias,image_url:e.image_url,categories:e.categories,coordinates:e.coordinates,display_phone:e.display_phone,distance:e.distance,is_closed:e.is_closed,location:e.location,name:e.name,phone:e.phone,price:e.price,rating:e.rating,review_count:e.review_count,url:e.url}}))}))},searchGeo:function(e,t,n,a){return fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=".concat(e,"&latitude=").concat(t,"&longitude=").concat(n,"&sort_by=").concat(a,"&limit=50"),{headers:{Authorization:"Bearer ".concat(v)}}).then((function(e){return e.json()})).then((function(e){if(e.businesses)return e.businesses.map((function(e){return{id:e.id,alias:e.alias,image_url:e.image_url,categories:e.categories,coordinates:e.coordinates,display_phone:e.display_phone,distance:e.distance,is_closed:e.is_closed,location:e.location,name:e.name,phone:e.phone,price:e.price,rating:e.rating,review_count:e.review_count,url:e.url}}))}))}},E=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={businesses:[],latitude:0,longitude:0,placeholder:"Near...",location:{},granted:!1},a.searchYelp=a.searchYelp.bind(Object(p.a)(a)),a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){if("geolocation"in navigator){console.log("Available");var e=this;navigator.geolocation.getCurrentPosition((function(t){function n(){return(n=Object(l.a)(c.a.mark((function t(){var n,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=".concat(e.state.latitude,"&longitude=").concat(e.state.longitude,"&localityLanguage=en"));case 2:return n=t.sent,t.next=5,n.json();case 5:return a=t.sent,t.abrupt("return",a);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}console.log("Latitude is :",t.coords.latitude),console.log("Longitude is :",t.coords.longitude),e.setState({latitude:t.coords.latitude,longitude:t.coords.longitude,granted:!0}),function(){return n.apply(this,arguments)}().then((function(t){console.log(t),e.setState({placeholder:"Current Location",location:t})}))}))}else console.log("Not Available")}},{key:"searchYelp",value:function(e,t,n){var a=this;""===t&&(this.state.granted?(console.log("searchgeo"),y.searchGeo(e,this.state.latitude,this.state.longitude,n).then((function(e){a.setState({businesses:e})}))):alert("Allow Location or Enter Location")),""!==t&&y.search(e,t,n).then((function(e){a.setState({businesses:e})}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement("h1",null,"FoodApp"),s.a.createElement(f,{searchYelp:this.searchYelp,placeholder:this.state.placeholder}),s.a.createElement(b,{businesses:this.state.businesses}))}}]),n}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.2ed2944e.chunk.js.map