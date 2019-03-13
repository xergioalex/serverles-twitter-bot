import twit from 'twit'
import rp from 'minimal-request-promise'
import config from './data/config'

const lambdaFunction = async (event, context) => {
  // Get chucknorris joke
  let chuckNorrisResult = await rp.get('https://api.chucknorris.io/jokes/random')
  let chuckNorrisResultBody = JSON.parse(chuckNorrisResult.body)

  if (chuckNorrisResultBody && chuckNorrisResultBody.value) {
    // Tweet chuck norris joke
    let Twitter = new twit(config)
    Twitter.post('statuses/update', { status: chuckNorrisResultBody.value }, function(err, data, response) {
      if (err) {
        console.log('Something is wrong with Twitter api :(...')
        console.log(err)
      }
    })
  } else {
    console.log('Something is woring with chuck norris api :(...')
    console.log(result)
  }
}

exports.handler = lambdaFunction
