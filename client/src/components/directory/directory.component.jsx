import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { directorySelectorSection } from '../../redux/directory/directory.selector';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const  Directory =({sections})=> {
  
    return (
      <div className='directory-menu'>
        {sections.map(({ title, imageUrl, id, size }) => (
          <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
        ))}
      </div>
    );
  
}

const mapStateToProps = createStructuredSelector({
  sections : directorySelectorSection
})
export default connect(mapStateToProps)(Directory);
