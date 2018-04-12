import React, { Component } from 'react';
// react-apollo 是 Apollo Client 与 React 的整合，可以让你使用名为 graphql 的高阶组件来装饰组件，它将你的 GraphQL 数据导入到组件中。React Apollo 还提供了 ApolloClient，它是 Apollo 的核心，处理所有数据获取，缓存和积极更新
import { graphql, ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag'

import logo from './resources/logo.svg';
import './App.less';

const client = new ApolloClient();

const channelListQuery = gql`
  query ChannelListQuery {
    channels {
      id
      name
    }
  }
`;

const withChannelListQuery = graphql(channelListQuery)

// 当我们的 ChannelsList 组件使用 graphql HOC 包装时，将会收到一个名为 data 的 prop，当它可用时会包含 channels，当有错误时会显示 error。另外 data 还包含一个 loading 属性，当 Apollo Client 在等待数据获取的时候它的值为 true。
const ChannelList = ({ data: { loading, error, channels } }) => {
  if (loading) { return <p>loading...</p> }
  if (error) { return <p>{error.message}</p> }
  return (
    <ul>{ 
      (channels || []).map(ch => <li key={ch.id}>{ch.name}</li>)
    }</ul>
  )
}

// 用 GraphQL 高阶组件来装饰原来的 ChannelsList，该高阶组件接受查询并将数据传递给我们的组件
const ChannelListData = withChannelListQuery(ChannelList)

// 用 ApolloProvider 包裹顶级的应用组件，这会将 Apollo Client 的一个实例放在 UI 上。
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Apollo</h1>
          </header>
          <ChannelListData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
