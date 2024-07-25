// const { createClient } = require('graphql-ws');
// const WebSocket = require('ws');

// const client = createClient({
//   url: 'ws://localhost:4000/graphql',
//   webSocketImpl: WebSocket,
// });

// (async () => {
//   const onNext = ({ data }) => {
//     console.log('Received data:', data);
//   };

//   await new Promise((resolve, reject) => {
//     client.subscribe(
//       {
//         query: `subscription {
//             userDeleted {
//               id
//               success
//               message
//             }
//           }`,
//       },
//       {
//         next: onNext,
//         error: reject,
//         complete: resolve,
//       }
//     );
//   });
// })();


// const { createClient } = require('graphql-ws');
// const WebSocket = require('ws');

// const client = createClient({
//   url: 'ws://localhost:4000/graphql',
//   webSocketImpl: WebSocket,
// });

// (async () => {
//   const onNext = ({ data }) => {
//     console.log('Received data:', data);
//   };

//   const onError = (error) => {
//     console.error('Subscription error:', error);
//   };

//   await new Promise((resolve, reject) => {
//     client.subscribe(
//       {
//         query: `subscription {
//           userDeleted {
//             id
//             success
//             message
//           }
//         }`,
//       },
//       {
//         next: onNext,
//         error: onError,
//         complete: resolve,
//       }
//     );
//   }).catch((error) => {
//     console.error('Promise rejected:', error);
//   });
// })();



const { createClient } = require('graphql-ws');
const WebSocket = require('ws');

const client = createClient({
  url: 'ws://localhost:3000/graphql',
  webSocketImpl: WebSocket,
});

(async () => {
  const onNext = ({ data }) => {
    console.log('Received data:', data);
  };

  const onError = (error) => {
    console.error('Subscription error:', error);
  };

  await new Promise((resolve, reject) => {
    client.subscribe(
      {
        query: `subscription{
  hello
}`,
      },
      {
        next: onNext,
        error: onError,
        complete: resolve,
      }
    );
  }).catch((error) => {
    console.error('Promise rejected:', error);
  });
})();

