import React from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList'
import SearchBar from '../SearchBar/SearchBar'
import Yelp from '../../util/Yelp'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      businesses: [],
      latitude: 0,
      longitude: 0,
      placeholder: "Near...",
      location: {},
      granted: false
    }
    this.searchYelp = this.searchYelp.bind(this)
  }
  componentDidMount() {
    if ("geolocation" in navigator) {
      console.log("Available");
      this.setState({
        placeholder: "Loading Location..."
      })
      const self = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        self.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          granted: true
        })
        async function fetchLocation(){
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${self.state.latitude}&longitude=${self.state.longitude}&localityLanguage=en`)
          const location = await response.json()
          return location
        }
        fetchLocation().then(location=>{
          console.log(location)
          self.setState({
            placeholder: "Current Location",
            location: location
          })
        })
      });
    } else {
      console.log("Not Available");
    }
  }

  componentDidUpdate(){
    document.getElementById('BusinessList').scrollIntoView({behavior: "smooth"})
  }

  searchYelp(term,location,sortBy){
    
    if(location===""){
      if(this.state.granted){
        console.log('searchgeo')
        Yelp.searchGeo(term,this.state.latitude, this.state.longitude, sortBy).then(businesses=>{
          this.setState({
            businesses:businesses
          })
        })
      } else {
        alert('Allow Location or Enter Location')
      }
    }
    if(location!==""){
      Yelp.search(term,location,sortBy).then(businesses=>{
        this.setState({
          businesses:businesses
        })
      })
    }
    
    
  }
  render(){
    return(
      <div className="App" id="app">
        
        <SearchBar searchYelp={this.searchYelp} placeholder={this.state.placeholder}/>
        <BusinessList businesses={this.state.businesses}/>
       
      </div>
    )
  }
}

export default App;