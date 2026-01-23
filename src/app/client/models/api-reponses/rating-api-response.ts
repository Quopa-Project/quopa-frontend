import {RatingDto} from "../rating.dto";

export interface RatingApiResponse {
  ratings: RatingDto[];
  rating: RatingDto;
}
