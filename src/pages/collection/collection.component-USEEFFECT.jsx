import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';
import './collection.styles.scss';
import { firestore } from '../../firebase/firebase.utils';


const CollectionPage = ({ collection }) => {
  // DEMO: useEffect as ComponentWillunmount  
  useEffect(() => {
    console.log('i am subscribing');
    const unsubscribeFromCollections = firestore
      .collection('collections')
      .onSnapshot(snapshot => console.log(snapshot));

    // Return a cleaning up function to be executed when componnent will unmount
    return () => {
      console.log('I am unsubscribing');
      unsubscribeFromCollections()
    }
  }, []);
  
  const { title, items } = collection;
  return(
    <div className='collection-page'>
      <h2 className='title'>{ title }</h2>
      <div className='items'>
        {
          items.map(item => (
            <CollectionItem 
              className='collection-item' 
              key={ item.id } 
              item={ item } 
            /> 
          ))
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);