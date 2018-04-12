import React, { Component } from 'react';
// react-apollo 是 Apollo Client 与 React 的整合，可以让你使用名为 graphql 的高阶组件来装饰组件，它将你的 GraphQL 数据导入到组件中。React Apollo 还提供了 ApolloClient，它是 Apollo 的核心，处理所有数据获取，缓存和积极更新

// ApolloProvider : connect Apollo Client to React
// Query : A React component that uses the render prop pattern to share GraphQL data with your UI
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
// parse query string into a query document
import gql from 'graphql-tag'

import logo from './resources/logo.svg';
import './App.less';

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

// client.query()
client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `
  })
  .then(data => console.warn({ data }));

// Apollo Client tracks error and loading state for you, which will be reflected in the loading and error properties. Once the result of your query comes back, it will be attached to the data property.
const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error : {error.message}</p>;

      return ( <ul className='item-list'>{
        data.rates.map(({ currency, rate }) => (
          <li key={currency}>{`${currency}: ${rate}`}</li>
        ))
      }</ul> )
    }}
  </Query>
);

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
          <ExchangeRates />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
