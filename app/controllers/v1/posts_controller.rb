module V1
  class PostsController < ApplicationController
    before_action :set_post, only: %i[show edit update destroy]

    def index
      @posts = Post.includes(:comments).order(created_at: :desc)
    end

    def show
    end

    def new
      @post = Post.new
      3.times { @post.comments.build }
    end

    def create
      @post = Post.new(post_params)
      if @post.save
        redirect_to v1_post_path(@post), notice: "Article créé avec succès."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit
      @post.comments.build if @post.comments.empty?
    end

    def update
      if @post.update(post_params)
        redirect_to v1_post_path(@post), notice: "Article mis à jour avec succès."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @post.destroy
      redirect_to v1_posts_path, notice: "Article supprimé."
    end

    private

    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(
        :title, :description, :status, :published_at,
        comments_attributes: [:id, :author, :content, :_destroy]
      )
    end
  end
end
