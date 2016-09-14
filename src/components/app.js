import React, { Component } from 'react';
import Menu from './menu';

class App extends Component {
  constructor() {
    super();
    this.handleClickOnMenuButton = this.handleClickOnMenuButton.bind(this);
    this.state = {
      showMenu: false,
    };
  }
  handleClickOnMenuButton() {
    if (!this.state.showMenu) {
      this.setState(Object.assign({}, this.state, {
        showMenu: true,
      }));
    } else {
      this.setState(Object.assign({}, this.state, {
        showMenu: false,
      }));
    }
  }
  render() {
    return (
      <main className="main-app container">
        <header className="main-jumbotron">jumbotron</header>
        <div className="main-content">
          <Menu gridClass="col-sm-2" />
          <div className="content col-xs-12 col-sm-10">
            {
              this.props.bugList.map((bugData) => (
                <article className="bug-item col-xs-12 col-sm-5">
                  <h3 className="title">{bugData.title}</h3>
                  <footer className="metadata">
                    <span className="organizer">{bugData.organizer}</span>
                    /
                    <span className="project">{bugData.project}</span>
                    <div className="languages">
                    {
                      bugData.languages.map(
                          (language) => <span className="language">{language}</span>
                        )
                      }
                    </div>
                    <address className="sources">
                      <a href={bugData.url} className="issue">Issue source</a>
                      <a href={bugData.projectUrl} className="project">project source</a>
                    </address>
                    <time className="timestamp">{bugData.timestamp}</time>
                  </footer>
                </article>
              ))
            }
          </div>
        </div>
        <Menu hide={!this.state.showMenu} gridClass="col-xs-4" side />
        <button
          className={`menu-button${this.state.showMenu ? ' -hide' : ' -side'}`}
          onClick={this.handleClickOnMenuButton}
        >button</button>
      </main>
    );
  }
}

App.propTypes = {
  bugList: React.PropTypes.arrayOf((propVal, key) => {
    // todo: validator
    if (!propVal.title) {
      return new Error(`Bug lack of title: ${propVal} with key ${key}`);
    }
    return propVal;
  }),
};

export default App;
