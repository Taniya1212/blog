import React from 'react';
import './menu-item.styles.scss';
import {withRouter} from 'react-router-dom';
const MenuItem = ({title, imageUrl,history, linkUrl, match}) => (
            <div className= {` menu-item`}
            onClick = {() => history.push(`/blog/${linkUrl}`)}
            >
                <div className = 'background-image' style = {{backgroundImage: `url(${imageUrl})`}}></div>
                <div className="content">
                    <h1 className="title">{title.toUpperCase()}</h1>
                    <span className="sub-title">EXPLORE</span>
                </div>
            </div>
            
);

export default withRouter(MenuItem);