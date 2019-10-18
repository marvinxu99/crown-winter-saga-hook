import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import PageNotFound from '../page-not-found/page-not-found.component';

class ShopPage extends React.Component { 
  
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;

    if (process.env.NODE_ENV === 'development') console.log(match);

    return(
      <div>
        <Switch>
          <Route 
            exact path={`${match.path}`} 
            component={ CollectionsOverviewContainer } 
          />
          <Route 
            path={`${match.path}/:collectionId`} 
            component={ CollectionPageContainer } 
          />
          <Route component={PageNotFound} /> 
        </Switch>
      </div>
    );
  };
} 

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
