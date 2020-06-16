class Api::ReviewsController < ApplicationController
  def create
    product = Product.find(params[:product_id])
    render json: product.reviews.create(review_params)
  end

  private

  def review_params
    params.require(:review).permit(:username, :description)
  end
end
