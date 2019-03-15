import twit from 'twit'
import rp from 'minimal-request-promise'
import config from './data/config'

const lambdaFunction = async (event, context) => {
  console.log('---- Begin request ----')
  // Get chucknorris joke
  let chuckNorrisResult = await rp.get('https://api.chucknorris.io/jokes/random')
  let chuckNorrisResultBody = JSON.parse(chuckNorrisResult.body)

  if (chuckNorrisResultBody && chuckNorrisResultBody.value) {
    console.log('---- Chuck Norris API result ----')
    console.log(chuckNorrisResultBody)
    // Tweet chuck norris joke
    let Twitter = new twit(config)
    let result = await Twitter.post('statuses/update', { status: chuckNorrisResultBody.value })
    if (result && result.data) {
      console.log('---- Twitter result ----')
      console.log(result.data)
    } else {
      console.log('Something is woring with twitter api :(...')
    }
  } else {
    console.log('Something is woring with chuck norris api :(...')
    console.log(result)
  }

  console.log('---- End request ----')
}

exports.handler = lambdaFunction
