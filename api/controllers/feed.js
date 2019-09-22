const podcastParser = require('podcast-parser');

module.exports = {


  friendlyName: 'Feed',


  description: 'GET a feed by url.',


  inputs: {
    url: {
      description: 'The URL for the XML feed',
      type: 'string',
      required: true,
      isURL: true,
    }

  },


  exits: {
    wrong_url: {
      description: "Wrong URL",
      statusCode: 400,
    },
    success: {
      description: 'Feed fetched successfully!',
      statusCode: 200
    }

  },


  fn: async function (inputs, exits) {
    var promised_feed = new Promise( (resolve, reject) => {
      podcastParser.execute(
        inputs.url,
        {
          'dateAs': 'date'
          ,'timeAs': 'string'
        },
        function (err, result) {
          
          if (err) {
            reject( err );
          } else {
            resolve( result );
          }    
        }
      );

    });

    return promised_feed.then( (result) => {
      // All done.
      return exits.success(result);
    })
    .catch( (err) => {
      return exits.wrong_url({
        'problems': ['wrong url for xml feed'],
        'message': err.message
      });
    });
  }
};
