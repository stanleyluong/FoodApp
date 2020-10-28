import React from 'react'
import './Business.css'
import Yelp from '../../util/Yelp'
import Reviews from '../Reviews/Reviews'

class Business extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showReviews: false
        }
        this.handleClick  = this.handleClick.bind(this)
    }
    handleClick(){
        // console.log(this.props.business)

        this.setState({
            showReviews: true
        })
    }
    render(){
        let formattedAddress = [this.props.business.location.address1,this.props.business.location.address2,this.props.business.location.address3,this.props.business.location.city,this.props.business.location.state,this.props.business.location.zip_code].filter(address=>{return address!==""}).join(' ').split(' ').join('+')
        // console.log(this.props.business)
        return (
            
            <div className="Business">
                <div className="image-container">
                    <a href={this.props.business.url} target="_blank" rel="noopener noreferrer"><img src={this.props.business.image_url} alt='uh oh'/></a>
                </div>
                <h2>{this.props.business.name}</h2>
                <div className="Business-information">
                    <div className="Business-address">
                        <a target="_blank" rel="noopener noreferrer" href={`http://maps.google.com/maps?q=${formattedAddress}`}>
                            <p>{this.props.business.location.address1}</p>
                            <p>{this.props.business.location.address2}</p>
                            <p>{this.props.business.location.address3}</p>
                            <p>{this.props.business.location.city} {this.props.business.location.state}</p>
                            <p>{this.props.business.location.zip_code}</p>
                        </a>
                            <p>{Math.floor(this.props.business.distance)} meters away</p>
                            <p>{this.props.business.display_phone}</p>
                            <p>{this.props.business.is_closed ? "Closed" : "Open"}</p>
                            <p>{this.props.business.price}</p>
                            {/* <p>{this.props.business.id}</p> */}
                            
                    </div>
                    <div className="Business-reviews">
                        <h3>{this.props.business.categories[0].title}{this.props.business.categories[1] ? " + "+this.props.business.categories[1].title : ""}</h3>
                        {/* <h3>{this.props.business.categories[1] ? this.props.business.categories[1].title : ""}</h3> */}
                        <h3 className="rating">{this.props.business.rating} <img style={{width: "1.5rem"}}src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAvVBMVEX////42B8AAAD/3iB0dHSokhX83CC8pBiKeBHixBweHh7nyh0+Pj7cvxv/4CCOjo62nhd9fX3tzx4wMDCCcRDz1B6SfxJLS0vIyMienp7i4uK0tLSlpaXc3Nz09PTJrxmhjBSWlpZWVlbPtRpeUgx6ag8vKQaZhhNUSQuMjZNCRE2wnDF6e4FwcXiwnj/Apxi2t7sMER+hjy81N0BPUVmPgkVwZjmcjDhwYg49OCARDwKBcisnKTFEOwnMzdB/LrixAAADxUlEQVR4nO3d21baQABGYYEagUhEFKtoi0oteMLzWfv+j9W7Mn9WM83MmpDE7n0bkpmP0LWYJsGVlWW11zTbW9q4ywth/UNY/xDWP4T1D2H9Q1j/PqNwQ0yrUWNRtCrbNsqeqmcpYcsQtj6l8POfQ4Q1DCHC6ocQYfVDiLD6IURY/RAirH4IEVY/hAir3+cXnoriUISHsu207Knm7mj966Kz87hjNGiYDcxN8fmZsd/6UdkMS5tyZvqtyKihmZtafdlvs2yGpZQwrcoqQlidECJEWH4IESIsP4QIEZYfQoQIyw8hQoTlhxBh9YUXQYQXhcztS4gu52OzOCew0Yhlv/llkNmkhM0gjRPLlQrrWTRKxmEmU4jwykWVqb0KMxmEXiFEiNAphF4hRIjQqSUIo5aZ4i3bliLsr/klq4mof7K96GQsd32NZZuus2LP0fsOQvmu75CcplZbjmm7c6/dkj19R3cQDnP+k7HmL/RsiBChawgROocQoXMIETrnImwk5jf/CgvNaSb276X7Ztc7Zu3Bv0cqSThoy0yvRbFi60bGj/3WtcULo1iOcmM1ad1aCrsIESJEiBAhQoT/mVB2bA78VhrFCGU1MdCJOggPpNtDo2nuO50KEcZTczK3OlEHoXYns+nl/cwWIYx6st+dt0lbr6xwHSFChAgRIkSIEOGftuSonbz344cSyn38HdlvK5Dw4Mhs3jdataw0ojW5+jER4USuOKxZ3ql41RxwLnPxX03Yupd3cWKZm+d9bamDTGS8+0JM2nFuYZBSwmOECBEiRIgQIUKEucr/vbQIYTHfS3elh23zSYncq0VvYc98MmP7QScTSJheH+ZcFYQiytWmYtaHnmv8QriV+l8MhAgRIkSIECFChAgRIkSIECFChAgRIkSYMbuc91ItRfjNbPT4w2jW8ZxdPOktmuT/fVoVdmbmZB5HMlMHobxRzUFi5gls7cgxdzyfT49kLv7PzAR57iklnMoxpyF+RaHsJ7s0hD4hRIjQLYQ+IUSI8K9jZpakhEn2S6sslD/ErcVP5t/ePnuyvbS6wuS5mZ3+MtW+5ZXPSXWFJ0GEJwgRIkSIECFChAhLE+pTyQdLF343W3n5afSq3/UH2Q3f3rey6qbOYTfzle9vQ8sYMpf41ZzoS0qh6buoVwf0PH1Y3v1fDp+T7H5ZRvhIzUauqOhLrULLb0EnM8v4YZ5h2bWMMLN8ggP92jVChAgRIkSIEGF9hNmrieoKI85h3kZBFL6N8k80tSdChMsKIUKECIsPIUKECIvPXfgbcy4yp3UfO+cAAAAASUVORK5CYII=" alt="uh oh"></img></h3>
                        {/* <p>{this.props.business.review_count} Reviews</p> */}
                        {/* <ul><Reviews id={this.props.business.id}/></ul> */}
                    </div>
                    
                </div>
                        <button onClick={this.handleClick}>{this.state.showReviews ? <Reviews id={this.props.business.id}/> : this.props.business.review_count + " Reviews"}
                        </button>
            </div>
        )
    }
}



export default Business