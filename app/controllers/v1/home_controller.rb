module V1
  class HomeController < ApplicationController
    def index
      flash.now[:notice] = "Bienvenue sur notre application de sondage !"
      flash.now[:alert] = "Bienvenue sur notre application de sondage !"
      @country_options = [
        [ "France", "fr" ],
        [ "Belgique", "be" ],
        [ "Suisse", "ch" ],
        [ "Canada", "ca" ],
        [ "Maroc", "ma" ],
        [ "Côte d'Ivoire", "ci" ],
        [ "Sénégal", "sn" ]
      ]

      @occupation_options = [
        [ "Développeur·se", "developer" ],
        [ "Designer", "designer" ],
        [ "Chef de projet", "pm" ],
        [ "Marketing", "marketing" ],
        [ "Finance", "finance" ],
        [ "Autre", "other" ]
      ]
    end

    def results
      @values = params.permit(:selected_option, :selected_date, :range_start, :range_end, :remarks)
    end
  end
end
