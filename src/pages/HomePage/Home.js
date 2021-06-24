import "./Home.css"
import Tile from "../../components/Tile/Tile";
import React from "react";
import { useState, useEffect } from "react";
import firebase from "../../data/Firebase"

const db = firebase.firestore()

function Home () {

    const [ user, setUser ] = useState()
    const [ loading, setLoading ] = useState( true )
    const [ clientId, setClientID] = useState()
    const [ clientSecret, setClientSecret ] = useState()

    // Listen to the user state
    useEffect( f => {

        // Listen to user
        console.log( 'Add user listener' )
        firebase.auth().onAuthStateChanged( user => {
            console.log( 'User changed to ', user )
            setUser( user )
            setLoading( false )
        } )


    }, [] )

    useEffect( () => {

        // No user? Exit
        if( !user ) return

        // User logged in? Get data
        return db.collection( 'StravaUserTokens' ).doc( user.email ).onSnapshot( doc => {


            const data = doc.data()

            if (!data) return

            setClientID ( data.clientId )
            setClientSecret ( data.clientSecret )
        } )

    }, [ user ] )

    async function onSubmit(e) {

        // Prevent page reload
        e.preventDefault()
        console.log(`client id : ${clientId} requested and client secret :${clientSecret}`)

        // Do the actual registration
        try {
            await db.collection( 'StravaUserTokens' ).doc( user.email ).set( {
                clientSecret: clientSecret,
                clientId: clientId
            } )


        } catch (e) {
            console.error('Firebase fail: ', e)
        }


    }

    return (
      <>
          <div className="container">
              <Tile>
                  <h3>Welcome "User"!</h3>
                  <div className="user-photo">
                      <i className="far fa-user"/>
                  </div>
                  <div className="home-text">
                      <p>View the leaderboards to plan you next trip or training!</p>
                  </div>
                  {/*client id evt op password zetten*/}
                  <form onSubmit={onSubmit}>
                      {(user) ? <h1>Hello { user.email }</h1> : "" }
                      <input onChange={e => setClientSecret(e.target.value)} placeholder='Insert client secret' type='text'
                             name='clientSecret' value={clientSecret}/>
                      <input onChange={e => setClientID(e.target.value)} placeholder='Client id please' type='text'
                             name='clientId' value={clientId}/>
                      <input type='submit' value="save"/>


                  </form>
              </Tile>
          </div>
      </>
    )
}

export default Home