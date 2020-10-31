import React from 'react'

class Review extends React.Component{
    render(){
        console.log(this.props.review)
        return (
            <div className="Review">
                <img style={{width:"100%"}} src={this.props.review.user.image_url} alt=""></img>
                <p>Rating: {this.props.review.rating} Stars</p>
                <p>"{this.props.review.text}"</p>
                <p>Review Date: {this.props.review.time_created}</p>                
            </div>
        )
    }
}

export default Review