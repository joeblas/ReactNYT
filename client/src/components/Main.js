import React, {Component} from "react";

import Search from './children/Search';
import Saved from './children/Saved';

import helpers from '../utils/API';

class Main extends Component {

constructor(props) {
    super(props);

    this.state = {
        searchTerm: "",
        results: [],
        resultToSave: {},
        saved: []
    };

    this.setTerm = this
        .setTerm
        .bind(this);
    this.setArticleToSave = this
        .setArticleToSave
        .bind(this);
    this.removeArticle = this
        .removeArticle
        .bind(this);

}

componentDidMount() {
    helpers
        .getSavedArticles()
        .then(res => {
            console.log(`Here are the saved articles: ${res}`)

            if (res !== this.state.saved) {
                console.log(`Saved articles: ${res.data}`)
                this.setState({saved: res.data});
            }
        })    
    }

componentDidUpdate(prevProps, prevState) {

    if (prevState.searchTerm !== this.state.searchTerm) {
        console.log(`The search term was updated`);

        helpers
            .runQuery(this.state.searchTerm)
            .then((data) => {
                if (data !== this.state.results) {
                    console.log(`Here's the data ${data[0].headline.main}`);

                    this.setState({results: data});

                }

            });
    }
}

setTerm(term) {
    this.setState({searchTerm: term});
}

setArticleToSave(index, article) {
    const newState = this.state.resultToSave;
    newState.title = article.title;
    newState.date = article.date;
    newState.url = article.url;

    this.setState({resultToSave: newState});

    helpers
        .saveArticle(this.state.resultToSave.title, this.state.resultToSave.date, this.state.resultToSave.url)
        .then((data) => {

            this.setState(previousState => ({
                saved: [
                    ...previousState.saved,
                    this.state.resultToSave
                ],
                results: [
                    ...previousState
                        .results
                        .slice(0, index),
                    ...previousState
                        .results
                        .slice(index + 1)
                ]
            }));
        });
}

removeArticle(articleID, index){
    
    helpers.removeArticle(articleID).then(() => {
        this.setState((prevState) => ({
            saved: [...prevState.saved.slice(0, index), ...prevState.saved.slice(index+1)]
        }));
    })
}

render() {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1>
                    NYT React Style
                </h1>
                <p>
                    A place to search. A place to save.</p>
            </div>
            <div className="row">
                <Search
                    setTerm={this.setTerm}
                    setArticleToSave={this.setArticleToSave}
                    saved={this.state.saved}
                    results={this.state.results}
                    resultToSave={this.state.resultToSave}/>
            </div>
            <div className="row">
                <Saved saved={this.state.saved} removeArticle={this.removeArticle}/>
            </div>
        </div>
    )
}

}

export default Main;