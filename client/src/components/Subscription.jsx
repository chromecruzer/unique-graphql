import React, { useEffect } from 'react';
import { createClient } from 'graphql-ws';

const SubscriptionComponent = () => {
  useEffect(() => {
    const client = createClient({
      //url: 'ws://localhost:4000/graphql',
      url: '/graphql',
      webSocketImpl: WebSocket, // Use the browser's native WebSocket implementation
    });

    const onNext = ({ data }) => {
      console.log('Received data:', data);
    };

    const onError = (error) => {
      console.error('Subscription error:', error); 
    };

    const unsubscribe = client.subscribe(
      {
        query: `subscription {
          userDeleted {
            id
            name
            email
          }
        }`,
      },
      {
        next: onNext,
        error: onError,
        complete: () => console.log('Subscription completed'),
      }
    );

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  return <div>Check the console for subscription updates.</div>;
};

export default SubscriptionComponent;
