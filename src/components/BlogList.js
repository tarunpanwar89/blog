import React,{Component} from "react";
import {connect} from 'react-redux';
import {fetchBlogsAndUsers} from '../actions';
import UserHeader from "./UserHeader";

class BlogList extends Component  {

    componentDidMount(){
        this.props.fetchBlogsAndUsers();
    }

    renderList(){
        return this.props.blogs.map(blog =>{
            return(
                <div className="item" key={blog.id}>
                    <i className="large middle icon account user"/>
                    <div className="content">
                        <div className="description">
                           <h2>{blog.title}</h2>
                           <p>{blog.body}</p> 
                        </div>
                        <UserHeader userId={blog.userId}></UserHeader>
                    </div>
                </div>
            );
        });   
    }

    render(){
        console.log(this.props.blogs);
        return(
            <div className="ui relaxed divided list"> {this.renderList()} </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return { blogs : state.blogs };
};

export default connect(mapStateToProps,{
    fetchBlogsAndUsers : fetchBlogsAndUsers
})(BlogList);