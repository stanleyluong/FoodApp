import React from 'react'

class Review extends React.Component{
    render(){
        console.log(this.props.review)
        return (
            <div className="Review">
                {/* <h4>{this.props.review}</h4> */}
                <img style={{width:"100%"}} src={this.props.review.user.image_url} alt="oops"></img>
                {/* <p>ID: {this.props.review.id}</p> */}
                <p>Rating: {this.props.review.rating} Stars</p>
                <p>Review: {this.props.review.text}</p>
                <p>Time: {this.props.review.time_created}</p>
                {/* <p>User: {this.props.review.user.id}</p> */}
                
                
            </div>
        )
    }
}

export default Review