const apiKey = "2ZiPvuYPqXKiFUvh0BwHoQnpX_hSYt3SMJv-2HJ_zmEnHDXpf5wko4KHdNXg-i0w56Z5JSdOyR25s9eq_4dpA_BhVP97la4MIgU8hYa6bGK2e0xjQA8AuyqAun-GX3Yx"

const Yelp = {
    search(term,location,sortBy){
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response=>{
            return response.json()
        }).then(jsonResponse=>{
            if(jsonResponse.businesses){
                return jsonResponse.businesses.map(business=>{
                        console.log(business)
                        return {
                            id: business.id,
                            alias: business.alias,
                            image_url: business.image_url,
                            categories: business.categories,
                            coordinates: business.coordinates,
                            display_phone: business.display_phone,
                            distance: business.distance,
                            is_closed: business.is_closed,
                            location: business.location,
                            name: business.name,
                            phone: business.phone,
                            price: business.price,

                            // address: business.address,
                            // city: business.city,
                            // state: business.state,
                            // zipCode: business.zipCode,
                            // category: business.category,
                            rating: business.rating,
                            review_count: business.review_count,
                            url: business.url
                        }
                })
            }
        })
    }
}

export default Yelp