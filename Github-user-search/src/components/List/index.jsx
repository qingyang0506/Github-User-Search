import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {


    state = {
        users: [],
        isFirst: true,
        isLoading: false,
        err: '',
    }

    componentDidMount(){
        this.token=PubSub.subscribe('atguigu',(msg,data)=>{
            this.setState(data);
        })
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token);
    }

    render() {

        const { users, isFirst, isLoading, err } = this.state;
        return (
            <div className="row">
                {
                    isFirst ? <h2 className='title'>Welcome! Enter the key word and press the button</h2> :
                        isLoading ? <h2>loading.......</h2> :
                            err ? <h2 style={{ color: 'red' }}>{err}</h2> :
                                users.map(item => {
                                    return (
                                        <div key={item.id} className="card">
                                            <a rel="noreferrer" href={item.html_url} target="_blank">
                                                <img alt="avatar" src={item.avatar_url} style={{ width: '100px' }} />
                                            </a>
                                            <p className="card-text">{item.login}</p>
                                        </div>
                                    )
                                })

                }
            </div>
        )
    }
}
