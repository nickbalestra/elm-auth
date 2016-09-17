module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


model =
    { foo = "fooBar" }


main =
    let
        elmAuthHeader =
            header []
                [ h1 [] [ text "Elm Auth" ]
                , span [ class "tagline" ] [ text "Auth like a pro" ]
                ]
    in
        div [ class "content" ]
            [ elmAuthHeader
            , div [ class "content" ]
                [ text model.foo ]
            ]
