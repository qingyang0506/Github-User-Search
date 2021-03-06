import React, { Component } from 'react'
import './index.css'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input onKeyUp={this.handleKeyUp} ref={c => this.input1 = c} type="text" placeholder="enter the name you search" />&nbsp;
                    <button onClick={this.search} >Search</button>
                </div>
            </section>
        )
    }

    search = async () => {
        const { input1: { value: keyWord } } = this;
        PubSub.publish('atguigu', { isLoading: true, isFirst: false })
        axios.get(`http://localhost:3000/api1/search/users?q=${keyWord}`).then(value=>{
            PubSub.publish('atguigu',{isLoading:false,users:value.data.items})
        },error=>{
            PubSub.publish('atguigu',{isLoading:false,err:error.message})
        })
    }

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.search();
        } else {
            return;
        }
    }
}
