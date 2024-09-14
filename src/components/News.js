import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProptypes = {
    regions: 'US',
    pageSize: '20',
    categories: 'game'
  }
  static propTypes = {
    regions: PropTypes.string,
    pageSize: PropTypes.number,
    categories: PropTypes.string,
  }
 capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
   // console.log("hello i am constructor from nes componenet");
    this.state = {
      //articles:this.articles,
      articles: [],
      loding: false,
      page_number: 1
    };
    //console.log(this.state);
    document.title=`${this.capitalizeFirstLetter(this.props.categories)} -News`;
  }
  //componentdidmout is life cycle method 
  //componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). 
  //Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint,
  // this is a good place to instantiate the network request

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=6-rHbGdIBmgdjS6-de7YKGXt6-gAVCUO1OF9MT4xigChZQl5&page_number=${this.state.page_number}&page_size=${this.props.pageSize}&country=${this.props.regions}&category=${this.props.categories}`;
    this.setState({ loding: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(50);
    //console.log(parseData);
    //  this.setState({articles:parseData.news,totalpage:parseData.totalpage});
    this.setState({ articles: parseData.news, loding: false });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // //  let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ab8beb9d11be4c0497fa912a83e4dfd0&page=1";
    // let url=`https://api.currentsapi.services/v1/latest-news?language=en&apiKey=6-rHbGdIBmgdjS6-de7YKGXt6-gAVCUO1OF9MT4xigChZQl5&page_number=1&page_size=${this.props.pageSize}&country=${this.props.regions}&category=${this.props.categories}`;
    // this.setState({loding:true})
    // let data= await fetch(url);
    //  let parseData= await data.json();
    //  //console.log(parseData);
    // //  this.setState({articles:parseData.news,totalpage:parseData.totalpage});
    //  this.setState({articles:parseData.news,loding:false});

    this.updateNews();

  }


  handlePrevclick = async () => {
    //console.log("previousclick");
    //  let url=`https://api.currentsapi.services/v1/latest-news?language=en&apiKey=6-rHbGdIBmgdjS6-de7YKGXt6-gAVCUO1OF9MT4xigChZQl5&page_number=${this.state.page_number - 1}&page_size=${this.props.pageSize}&country=${this.props.regions}&category=${this.props.categories}`;
    //  this.setState({loding:true})
    //  let data= await fetch(url);
    //  let parseData= await data.json();
    //  this.setState({
    //   page_number:this.state.page_number - 1,
    //    articles:parseData.news,
    //    loding:false
    //  })
    this.setState({
      page_number: this.state.page_number - 1,
    })
    this.updateNews()
  }

  handleNextclick = async () => {

    //console.log("Next click");
    if (!(this.state.page + 1 > Math.ceil(5400 / this.props.pageSize))) {
      // let url=`https://api.currentsapi.services/v1/latest-news?language=en&apiKey=6-rHbGdIBmgdjS6-de7YKGXt6-gAVCUO1OF9MT4xigChZQl5&page_number=${this.state.page_number + 1}&page_size=${this.props.pageSize}&country=${this.props.regions}&category=${this.props.categories}`;
      // this.setState({loding:true})
      // let data= await fetch(url);
      // let parseData= await data.json();
      // this.setState({
      //   page_number:this.state.page_number + 1,
      //   articles:parseData.news,
      //   loding:false
      // })
      this.setState({
        page_number: this.state.page_number + 1,
      })
      this.updateNews()
    }

  }

  fetchMoreData = async() => {
    this.setState({
      page_number: this.state.page_number + 1,
    })
    const url = `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=6-rHbGdIBmgdjS6-de7YKGXt6-gAVCUO1OF9MT4xigChZQl5&page_number=${this.state.page_number}&page_size=${this.props.pageSize}&country=${this.props.regions}&category=${this.props.categories}`;
    // this.setState({ loding: true })
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ 
      articles: this.state.articles.concat(parseData.news), 
      // loding: false 
    });
  };
  render() {
    let dftImg = "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iq2d.i2FXFl4/v0/1200x800.jpg";
    // console.log(this.state.articles);
    return (
      /*<div className='container my-3'>
        <h1 className="text-center my-3">
          News Top {this.capitalizeFirstLetter(this.props.categories)} Headline
        </h1>
        {this.state.loding && <Spiner />}
        <div className="row">
          {!this.state.loding && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.id ? element.id : ""} >
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.image && element.image !== 'None' ? element.image : dftImg} newsUrl={element.url} publishedDt={element.published} author={element.author} catG={element.category} />
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page_number <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(5400 / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next&rarr;</button>

        </div>

      </div>*/
     /**infinite scroll**/
      <>
        <h1 className="text-center my-3">
        Top {this.capitalizeFirstLetter(this.props.categories)} News Headline from the US
         
        </h1>
     
       
        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length < 5400} loader= {this.state.loding && <Spiner />}>
        <div className='container my-3'>
        <div className="row">
          {this.state.articles.map((element,i) => {
            return <div className="col-md-4" key={element.id ? element.id : ""} >
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.image && element.image !== 'None' ? element.image : dftImg} newsUrl={element.url} publishedDt={element.published} author={element.author} catG={element.category} />
            </div>
            
          })}
             </div>
        </div>
     
          </InfiniteScroll>
     
       

      </>

    )
  }
}

export default News
