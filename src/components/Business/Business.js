import React from 'react'
import './Business.css'
class Business extends React.Component {
    render(){
        return (
            <div className="Business">
                <div className="image-container">
                    <img src={this.props.business.image_url} alt=''/>
                </div>
                <h2>{this.props.business.name}</h2>
                <div className="Business-information">
                    <div className="Business-address">
                        <p>{this.props.business.location.address1}</p>
                        <p>{this.props.business.location.address2}</p>
                        <p>{this.props.business.location.address3}</p>
                        <p>{this.props.business.location.city} {this.props.business.location.state}</p>
                        <p>{this.props.business.location.zip_code}</p>
                        <p>{Math.floor(this.props.business.distance)} meters away</p>
                    </div>
                    <div className="Business-reviews">
                        <h3>{this.props.business.categories[0].title}</h3>
                        <h3 className="rating">{this.props.business.rating} Stars</h3>
                        <p>{this.props.business.review_count} Reviews</p>
                    </div>
                </div>
            </div>
        )
    }
}



export default Business