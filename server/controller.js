module.exports = {
    getAllProducts: ( req, res ) => {
       req.app.get( 'db' ).getAllProducts()
       .then( products => {
           res.status( 200 ).send( products )
       })
    },
    getSelectedItem: ( req, res ) => {
        req.app.get( 'db' ).getSelectedItem( [req.params.id] )
        .then( product => {
            res.status( 200 ).send( product )
        })
    },
    addToCart: ( req, res ) => {
        // console.log( 'HIT addToCart!' )
        req.app.get( 'db' ).find_active_order( [req.session.passport.user] )
        .then( order => {
            if ( !order[0] ){
                req.app.get( 'db' ).create_order( [req.session.passport.user] )
                .then( createdOrder => {
                    req.app.get( 'db' ).create_cart_item( [createdOrder[0].id, req.params.id, 1] )
                }).catch( err => { console.log( 'CREATE ORDER ERROR', err ) } )
            } else {
                req.app.get( 'db' ).check_cart_for_item( [req.params.id, order[0].id] )
                .then( cartItem => {
                    if( !cartItem ){
                        req.app.get( 'db' ).create_cart_item( [order[0].id, req.params.id] )
                    }
                    else {
                        req.app.get( 'db' ).get_cart_quantity( [req.params.id, order[0].id] )
                        .then( quantity => {
                            var oldQuantity = quantity[0].quantity
                            var newQuantity = ++oldQuantity
                            req.app.get( 'db' ).update_quantity( [newQuantity, req.params.id, order[0].id] )
                        }).catch( err => { console.log('UPDATE CART QUANTITY ERROR', err) } )
                    }
                })
            } 
            res.sendStatus( 200 )
        }).catch( err => { console.log( 'ADD TO CART ERROR', err ) } )
    },
    // getCartItems: ( req, res ) => {
    //     req.app.get( 'db' ).get_cart_items().then( stuff => {
    //         res.status( 200 ).json( stuff )
    //     }).catch( err => { console.log( 'Get Cart Pronblems!!', err ) } );
    // }
}