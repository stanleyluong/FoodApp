(this.webpackJsonpfoodapp=this.webpackJsonpfoodapp||[]).push([[0],[,,,,,,,,,,function(e,t,n){e.exports=n(21)},,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),o=n(8),i=n.n(o),r=(n(15),n(6)),c=n.n(r),l=n(9),u=n(2),h=n(3),d=n(1),p=n(5),m=n(4),g=(n(17),n(18),n(19),function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=[this.props.business.location.address1,this.props.business.location.address2,this.props.business.location.address3,this.props.business.location.city,this.props.business.location.state,this.props.business.location.zip_code].filter((function(e){return""!==e})).join(" ").split(" ").join("+");return console.log(this.props.business),s.a.createElement("div",{className:"Business"},s.a.createElement("div",{className:"image-container"},s.a.createElement("a",{href:this.props.business.url,target:"_blank",rel:"noopener noreferrer"},s.a.createElement("img",{src:this.props.business.image_url,alt:"uh oh"}))),s.a.createElement("h2",null,this.props.business.name),s.a.createElement("div",{className:"Business-information"},s.a.createElement("div",{className:"Business-address"},s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"http://maps.google.com/maps?q=".concat(e)},s.a.createElement("p",null,this.props.business.location.address1),s.a.createElement("p",null,this.props.business.location.address2),s.a.createElement("p",null,this.props.business.location.address3),s.a.createElement("p",null,this.props.business.location.city," ",this.props.business.location.state),s.a.createElement("p",null,this.props.business.location.zip_code)),s.a.createElement("p",null,Math.floor(this.props.business.distance)," meters away")),s.a.createElement("div",{className:"Business-reviews"},s.a.createElement("h3",null,this.props.business.categories[0].title),s.a.createElement("h3",{className:"rating"},this.props.business.rating," ",s.a.createElement("img",{style:{width:"2rem"},src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAvVBMVEX////42B8AAAD/3iB0dHSokhX83CC8pBiKeBHixBweHh7nyh0+Pj7cvxv/4CCOjo62nhd9fX3tzx4wMDCCcRDz1B6SfxJLS0vIyMienp7i4uK0tLSlpaXc3Nz09PTJrxmhjBSWlpZWVlbPtRpeUgx6ag8vKQaZhhNUSQuMjZNCRE2wnDF6e4FwcXiwnj/Apxi2t7sMER+hjy81N0BPUVmPgkVwZjmcjDhwYg49OCARDwKBcisnKTFEOwnMzdB/LrixAAADxUlEQVR4nO3d21baQABGYYEagUhEFKtoi0oteMLzWfv+j9W7Mn9WM83MmpDE7n0bkpmP0LWYJsGVlWW11zTbW9q4ywth/UNY/xDWP4T1D2H9Q1j/PqNwQ0yrUWNRtCrbNsqeqmcpYcsQtj6l8POfQ4Q1DCHC6ocQYfVDiLD6IURY/RAirH4IEVY/hAir3+cXnoriUISHsu207Knm7mj966Kz87hjNGiYDcxN8fmZsd/6UdkMS5tyZvqtyKihmZtafdlvs2yGpZQwrcoqQlidECJEWH4IESIsP4QIEZYfQoQIyw8hQoTlhxBh9YUXQYQXhcztS4gu52OzOCew0Yhlv/llkNmkhM0gjRPLlQrrWTRKxmEmU4jwykWVqb0KMxmEXiFEiNAphF4hRIjQqSUIo5aZ4i3bliLsr/klq4mof7K96GQsd32NZZuus2LP0fsOQvmu75CcplZbjmm7c6/dkj19R3cQDnP+k7HmL/RsiBChawgROocQoXMIETrnImwk5jf/CgvNaSb276X7Ztc7Zu3Bv0cqSThoy0yvRbFi60bGj/3WtcULo1iOcmM1ad1aCrsIESJEiBAhQoT/mVB2bA78VhrFCGU1MdCJOggPpNtDo2nuO50KEcZTczK3OlEHoXYns+nl/cwWIYx6st+dt0lbr6xwHSFChAgRIkSIEOGftuSonbz344cSyn38HdlvK5Dw4Mhs3jdataw0ojW5+jER4USuOKxZ3ql41RxwLnPxX03Yupd3cWKZm+d9bamDTGS8+0JM2nFuYZBSwmOECBEiRIgQIUKEucr/vbQIYTHfS3elh23zSYncq0VvYc98MmP7QScTSJheH+ZcFYQiytWmYtaHnmv8QriV+l8MhAgRIkSIECFChAgRIkSIECFChAgRIkSYMbuc91ItRfjNbPT4w2jW8ZxdPOktmuT/fVoVdmbmZB5HMlMHobxRzUFi5gls7cgxdzyfT49kLv7PzAR57iklnMoxpyF+RaHsJ7s0hD4hRIjQLYQ+IUSI8K9jZpakhEn2S6sslD/ErcVP5t/ePnuyvbS6wuS5mZ3+MtW+5ZXPSXWFJ0GEJwgRIkSIECFChAhLE+pTyQdLF343W3n5afSq3/UH2Q3f3rey6qbOYTfzle9vQ8sYMpf41ZzoS0qh6buoVwf0PH1Y3v1fDp+T7H5ZRvhIzUauqOhLrULLb0EnM8v4YZ5h2bWMMLN8ggP92jVChAgRIkSIEGF9hNmrieoKI85h3kZBFL6N8k80tSdChMsKIUKECIsPIUKECIvPXfgbcy4yp3UfO+cAAAAASUVORK5CYII=",alt:"uh oh"})),s.a.createElement("p",null,this.props.business.review_count," Reviews"))))}}]),n}(s.a.Component)),b=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return s.a.createElement("div",{className:"BusinessList",id:"BusinessList"},this.props.businesses.map((function(e){return s.a.createElement(g,{key:e.id,business:e})})))}}]),n}(s.a.Component),f=(n(20),function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={term:"",location:"",sortBy:"best_match",placeholder:"Near..."},a.handleTermChange=a.handleTermChange.bind(Object(d.a)(a)),a.handleLocationChange=a.handleLocationChange.bind(Object(d.a)(a)),a.handleSortByChange=a.handleSortByChange.bind(Object(d.a)(a)),a.handleSearch=a.handleSearch.bind(Object(d.a)(a)),a.sortByOptions={"Best Match":"best_match","Highest Rated":"rating","Most Reviewed":"review_count",Distance:"distance"},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){if("Current Location"===this.props.location){var e=document.getElementById("loc");e.addEventListener("focus",(function(){this.classList.add("placeholderred")})),e.addEventListener("blur",(function(){this.classList.remove("placeholderred")}))}}},{key:"getSortByClass",value:function(e){return this.state.sortBy===e?"active":""}},{key:"handleSortByChange",value:function(e){this.setState({sortBy:e})}},{key:"handleTermChange",value:function(e){this.setState({term:e.target.value})}},{key:"handleLocationChange",value:function(e){this.setState({location:e.target.value})}},{key:"handleSearch",value:function(e){console.log(this.state.term,this.state.location,this.state.sortBy),this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy),e.preventDefault()}},{key:"renderSortByOptions",value:function(){var e=this;return Object.keys(this.sortByOptions).map((function(t){var n=e.sortByOptions[t];return s.a.createElement("li",{onClick:e.handleSortByChange.bind(e,n),className:e.getSortByClass(n),key:n},t)}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"SearchBar",id:"searchbar"},s.a.createElement("div",{className:"SearchBar-sort-options"},s.a.createElement("ul",null,this.renderSortByOptions())),s.a.createElement("div",{className:"SearchBar-fields"},s.a.createElement("form",{onSubmit:this.handleSearch},s.a.createElement("input",{onChange:this.handleTermChange,placeholder:"Find..."}),s.a.createElement("input",{id:"loc",onChange:this.handleLocationChange,placeholder:this.props.placeholder}),s.a.createElement("button",{onClick:this.handleSearch,className:"SearchBar-submit"},"Search"))))}}]),n}(s.a.Component)),v="7R8guCX9uPFAVZ5J4nrHFt8c402C8uWMCIZnyD2MEUKl6tI5nHFGHObPB26_kp3DfmRItpDo2fVyH9uOLX7v9PdKuDsQF9IKufojEO1Wj68hxrcwwIxfXGYrwh2KX3Yx",E={search:function(e,t,n){return fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=".concat(e,"&location=").concat(t,"&sort_by=").concat(n,"&limit=50"),{headers:{Authorization:"Bearer ".concat(v)}}).then((function(e){return e.json()})).then((function(e){if(e.businesses)return e.businesses.map((function(e){return console.log(e),{id:e.id,alias:e.alias,image_url:e.image_url,categories:e.categories,coordinates:e.coordinates,display_phone:e.display_phone,distance:e.distance,is_closed:e.is_closed,location:e.location,name:e.name,phone:e.phone,price:e.price,rating:e.rating,review_count:e.review_count,url:e.url}}))}))},searchGeo:function(e,t,n,a){return fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=".concat(e,"&latitude=").concat(t,"&longitude=").concat(n,"&sort_by=").concat(a,"&limit=50"),{headers:{Authorization:"Bearer ".concat(v)}}).then((function(e){return e.json()})).then((function(e){if(e.businesses)return e.businesses.map((function(e){return{id:e.id,alias:e.alias,image_url:e.image_url,categories:e.categories,coordinates:e.coordinates,display_phone:e.display_phone,distance:e.distance,is_closed:e.is_closed,location:e.location,name:e.name,phone:e.phone,price:e.price,rating:e.rating,review_count:e.review_count,url:e.url}}))}))}},y=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={businesses:[],latitude:0,longitude:0,placeholder:"Near...",location:{},granted:!1},a.searchYelp=a.searchYelp.bind(Object(d.a)(a)),a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){if("geolocation"in navigator){console.log("Available"),this.setState({placeholder:"Loading Location..."});var e=this;navigator.geolocation.getCurrentPosition((function(t){function n(){return(n=Object(l.a)(c.a.mark((function t(){var n,a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=".concat(e.state.latitude,"&longitude=").concat(e.state.longitude,"&localityLanguage=en"));case 2:return n=t.sent,t.next=5,n.json();case 5:return a=t.sent,t.abrupt("return",a);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}console.log("Latitude is :",t.coords.latitude),console.log("Longitude is :",t.coords.longitude),e.setState({latitude:t.coords.latitude,longitude:t.coords.longitude,granted:!0}),function(){return n.apply(this,arguments)}().then((function(t){console.log(t),e.setState({placeholder:"Current Location",location:t})}))}))}else console.log("Not Available")}},{key:"componentDidUpdate",value:function(){document.getElementById("BusinessList").scrollIntoView()}},{key:"searchYelp",value:function(e,t,n){var a=this;""===t&&(this.state.granted?(console.log("searchgeo"),E.searchGeo(e,this.state.latitude,this.state.longitude,n).then((function(e){a.setState({businesses:e})}))):alert("Allow Location or Enter Location")),""!==t&&E.search(e,t,n).then((function(e){a.setState({businesses:e})}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"App",id:"app"},s.a.createElement(f,{searchYelp:this.searchYelp,placeholder:this.state.placeholder}),s.a.createElement(b,{businesses:this.state.businesses}))}}]),n}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.dc8d9bdd.chunk.js.map