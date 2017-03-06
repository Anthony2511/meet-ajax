/* hepl-mmi/meet-ajax
 *
 * /js/script.js - Discover AJAX with jQuery
 *
 * coded by leny@flatLand!
 * started at 20/02/2017
 */

let $form,
    $tplErrorMessage,
    $tplBuddy,
    $buddiesContainer;

const fHandlSubmit = function( oEvent ) {
  let $nameInput = $form.find( 'input[name="name"]' ),
      $descriptionTextarea = $form.find( 'textarea[name="description"]' ),
      sName,
      sDescription,
      bHasErrors = false;

  oEvent.preventDefault();

  $form.find( ".has-error" ).removeClass( "has-error" );
  $form.find( ".alert.alert-danger" ).remove();

  // 1. récupérer les infos des champs de form

  sName = ( $nameInput.val() || "" ).trim();
  sDescription = ( $descriptionTextarea.val() || "" ).trim();

  console.log( "name:", sName );
  console.log( "description:", sDescription );

  // 2. les checker

  if ( !sName ) {
    bHasErrors = true;
    $nameInput.parent().addClass( "has-error" );
  }

  if ( !sDescription ) {
    bHasErrors = true;
    $descriptionTextarea.parent().addClass( "has-error" );
  }

  // 3. afficher les errors si il y en a

  if ( bHasErrors ) {
    $form.find( "fieldset" ).prepend( $tplErrorMessage.clone() );
    return console.error( "Form has errors" );
  }

  // 4. préparer requete ajax
  // 5. faire la requete AJAX

  $.ajax( $form.attr( "action" ), {
    "method" : "POST",
    "dataType" : "json",
    "data" : {
      "name" : sName,
      "description" : sDescription,
    },
    "error" : function( oXHR, sStatus, sError )  {
      console.error( sStatus, sError );
    },
    "success" : function( { description, avatar, alt, name } ) {
      let $buddy = $tplBuddy.clone();

      $buddy
        .find( ".thumbnail" )
          .attr( "title", description )
          .find( "img" )
            .attr( "src", avatar )
            .attr( "alt", alt )
            .end()
          .find( "strong" )
            .text( name );

      $buddiesContainer.append( $buddy );

      $form[ 0 ].reset(); // faire un tableau avec 0 , pour que le reset marche sur le DOM
    },
  } );
};

const fHandleCleanBuddies = function( oEvent ) {
  oEvent.preventDefault();
  $.get( $( this ).attr( "href" ) );
  $buddiesContainer.empty();
};

$( function( ) {

    ( $form = $( "form" ) ).on( "submit", fHandlSubmit );
    $tplErrorMessage = $( $( "#form-error-message" ).html() );
    $tplBuddy = $( $( "#buddy-element" ).html() );
    $buddiesContainer = $( "#buddies-container" );
    $( "#clean-buddies" ).on( "click", fHandleCleanBuddies );

} );
