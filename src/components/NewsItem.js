import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
    let {title, description,imageurl,newsUrl,publishedDt,author,catG} =this.props;
    return (
      <div>
        <div className="my-3">
        <div className="card">
          <div style={{display:'flex',justifyContent:'center',position:'absolute',right:'0'}}><span className="badge rounded-pill bg-danger">{catG}</span></div>
          <img src={imageurl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ?"Unknown":author} On {new Date(publishedDt).toGMTString()}</small></p>
            <a href={newsUrl}  target="_blank"rel="noreferrer"  className="btn btn-sm btn-dark">Read more</a>
          </div>
       </div>
        </div>
       
      </div>
    )
  }
}

export default NewsItem
